import { connection } from "next/server";
import { buildSystemPrompt } from "@/lib/assistant/knowledge";
import { completeChat, getProviderConfig, type ProviderMessage } from "@/lib/assistant/provider";
import { assistantLimits, type AssistantResponse, type AssistantStatus } from "@/lib/assistant/types";
import { clientKey, rateLimit } from "@/lib/rate-limit";

/**
 * Reports whether a real AI provider is configured, so the UI can label its mode honestly.
 */
export async function GET() {
  await connection();
  const config = getProviderConfig();
  const status: AssistantStatus = config ? { mode: "ai", provider: config.providerName } : { mode: "offline" };
  return Response.json(status, { headers: { "Cache-Control": "no-store" } });
}

/**
 * Validates the visitor's conversation and keeps only well-formed, size-limited messages.
 */
function sanitizeMessages(input: unknown): ProviderMessage[] | null {
  if (typeof input !== "object" || input === null) return null;
  const messages = (input as { messages?: unknown }).messages;
  if (!Array.isArray(messages) || messages.length === 0) return null;

  const cleaned: ProviderMessage[] = [];
  for (const message of messages.slice(-assistantLimits.historyMax)) {
    if (typeof message !== "object" || message === null) return null;
    const { role, content } = message as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const trimmed = content.trim();
    if (!trimmed) continue;
    if (role === "user" && trimmed.length > assistantLimits.messageMax) return null;
    cleaned.push({ role, content: trimmed.slice(0, 2000) });
  }

  if (cleaned.length === 0 || cleaned[cleaned.length - 1].role !== "user") return null;
  return cleaned;
}

/**
 * Sends a grounded conversation to the configured AI provider.
 * Message content is never logged.
 */
export async function POST(request: Request) {
  const config = getProviderConfig();
  if (!config) {
    return Response.json({ ok: false, code: "not_configured" } satisfies AssistantResponse, { status: 503 });
  }

  const limit = rateLimit("assistant", clientKey(request), 20, 10 * 60 * 1000);
  if (!limit.allowed) {
    return Response.json({ ok: false, code: "rate_limited" } satisfies AssistantResponse, {
      status: 429,
      headers: { "Retry-After": String(limit.retryAfter) },
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, code: "invalid" } satisfies AssistantResponse, { status: 400 });
  }

  const messages = sanitizeMessages(body);
  if (!messages) {
    return Response.json({ ok: false, code: "invalid" } satisfies AssistantResponse, { status: 400 });
  }

  try {
    const reply = await completeChat(config, [{ role: "system", content: buildSystemPrompt() }, ...messages]);
    return Response.json({ ok: true, reply } satisfies AssistantResponse);
  } catch (error) {
    console.error(`[assistant] provider request failed: ${error instanceof Error ? error.message : "unknown error"}`);
    return Response.json({ ok: false, code: "provider_error" } satisfies AssistantResponse, { status: 502 });
  }
}

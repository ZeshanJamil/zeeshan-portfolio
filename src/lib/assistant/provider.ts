import type { AssistantRole } from "./types";

export interface ProviderMessage {
  role: AssistantRole | "system";
  content: string;
}

export interface ProviderConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
  providerName: string;
}

/**
 * Reads the AI provider configuration from server-only environment variables.
 * Returns null when the assistant should run in offline mode.
 */
export function getProviderConfig(): ProviderConfig | null {
  const apiKey = process.env.AI_API_KEY?.trim();
  const model = process.env.AI_MODEL?.trim();
  if (!apiKey || !model) return null;

  const baseUrl = (process.env.AI_BASE_URL?.trim() || "https://api.openai.com/v1").replace(/\/$/, "");
  return {
    apiKey,
    model,
    baseUrl,
    providerName: process.env.AI_PROVIDER_NAME?.trim() || new URL(baseUrl).hostname.replace(/^api\./, ""),
  };
}

/**
 * Calls any OpenAI-compatible Chat Completions endpoint and returns the reply text.
 */
export async function completeChat(config: ProviderConfig, messages: ProviderMessage[]): Promise<string> {
  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      messages,
      temperature: 0.3,
      max_tokens: 400,
    }),
    signal: AbortSignal.timeout(20_000),
  });

  if (!response.ok) {
    throw new Error(`Provider responded with status ${response.status}`);
  }

  const data = (await response.json()) as { choices?: { message?: { content?: string } }[] };
  const reply = toPlainText(data.choices?.[0]?.message?.content ?? "");
  if (!reply) throw new Error("Provider returned an empty reply");
  return reply;
}

/**
 * Removes Markdown emphasis, headings, inline code and invisible characters so replies
 * render cleanly in the plain-text chat panel.
 */
function toPlainText(text: string): string {
  return text
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[*•]\s+/gm, "- ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

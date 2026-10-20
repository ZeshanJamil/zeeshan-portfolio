import { profile } from "@/content/profile";
import {
  budgetOptions,
  inquiryOptions,
  normalizeContact,
  optionLabel,
  validateContact,
  type ContactResponse,
} from "@/lib/contact";
import { clientKey, rateLimit } from "@/lib/rate-limit";

/**
 * Sends a JSON response with the shared contact response shape.
 */
function reply(body: ContactResponse, status: number, headers?: HeadersInit) {
  return Response.json(body, { status, headers });
}

/**
 * Accepts contact form submissions, validates them and delivers them by email through Resend.
 */
export async function POST(request: Request) {
  const limit = rateLimit("contact", clientKey(request), 5, 10 * 60 * 1000);
  if (!limit.allowed) {
    return reply({ ok: false, code: "rate_limited" }, 429, { "Retry-After": String(limit.retryAfter) });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return reply({ ok: false, code: "invalid" }, 400);
  }

  const payload = normalizeContact(raw);

  if (payload.website) {
    return reply({ ok: true }, 200);
  }

  const errors = validateContact(payload);
  if (Object.keys(errors).length > 0) {
    return reply({ ok: false, code: "invalid", errors }, 422);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || profile.email;

  if (!apiKey || !from) {
    return reply({ ok: false, code: "not_configured" }, 503);
  }

  const inquiry = optionLabel(inquiryOptions, payload.inquiry);
  const budget = payload.budget ? optionLabel(budgetOptions, payload.budget) : "Not specified";
  const text = [
    `Name: ${payload.name.trim()}`,
    `Email: ${payload.email.trim()}`,
    `Topic: ${inquiry}`,
    `Budget: ${budget}`,
    "",
    payload.message.trim(),
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.email.trim(),
        subject: `Portfolio enquiry — ${inquiry} — ${payload.name.trim()}`,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error(`[contact] delivery failed with status ${response.status}`);
      return reply({ ok: false, code: "delivery_failed" }, 502);
    }
  } catch {
    console.error("[contact] delivery request failed");
    return reply({ ok: false, code: "delivery_failed" }, 502);
  }

  return reply({ ok: true }, 200);
}

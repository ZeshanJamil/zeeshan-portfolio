export const inquiryOptions = [
  { value: "role", label: "Hiring for a role" },
  { value: "project", label: "Freelance or contract project" },
  { value: "improve", label: "Improving an existing application" },
  { value: "other", label: "Something else" },
] as const;

export const budgetOptions = [
  { value: "", label: "Prefer not to say" },
  { value: "unsure", label: "Not sure yet" },
  { value: "under-2k", label: "Under $2,000" },
  { value: "2k-5k", label: "$2,000 – $5,000" },
  { value: "5k-15k", label: "$5,000 – $15,000" },
  { value: "15k-plus", label: "$15,000+" },
] as const;

export type InquiryType = (typeof inquiryOptions)[number]["value"];
export type BudgetRange = (typeof budgetOptions)[number]["value"];

export interface ContactPayload {
  name: string;
  email: string;
  inquiry: InquiryType | "";
  budget: BudgetRange;
  message: string;
  website?: string;
}

export type ContactField = "name" | "email" | "inquiry" | "message";
export type ContactErrors = Partial<Record<ContactField, string>>;

export const contactLimits = {
  nameMax: 100,
  emailMax: 200,
  messageMin: 20,
  messageMax: 4000,
};

export type ContactErrorCode = "invalid" | "not_configured" | "rate_limited" | "delivery_failed";

export type ContactResponse = { ok: true } | { ok: false; code: ContactErrorCode; errors?: ContactErrors };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validates a contact submission and returns per-field error messages.
 */
export function validateContact(payload: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};
  const name = payload.name.trim();
  const email = payload.email.trim();
  const message = payload.message.trim();

  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > contactLimits.nameMax) errors.name = `Please keep your name under ${contactLimits.nameMax} characters.`;

  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > contactLimits.emailMax || !emailPattern.test(email))
    errors.email = "Please enter a valid email address, like name@company.com.";

  if (!inquiryOptions.some((option) => option.value === payload.inquiry))
    errors.inquiry = "Please choose what you'd like to talk about.";

  if (message.length < contactLimits.messageMin)
    errors.message = `Please share a little more detail (at least ${contactLimits.messageMin} characters).`;
  else if (message.length > contactLimits.messageMax)
    errors.message = `Please keep your message under ${contactLimits.messageMax} characters.`;

  return errors;
}

/**
 * Converts a loosely-typed request body into a contact payload with safe string fields.
 */
export function normalizeContact(input: unknown): ContactPayload {
  const source = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  const text = (key: string) => (typeof source[key] === "string" ? (source[key] as string) : "");
  const budget = text("budget");

  return {
    name: text("name"),
    email: text("email"),
    inquiry: text("inquiry") as ContactPayload["inquiry"],
    budget: (budgetOptions.some((option) => option.value === budget) ? budget : "") as BudgetRange,
    message: text("message"),
    website: text("website"),
  };
}

/**
 * Looks up the human-readable label for an option value.
 */
export function optionLabel(options: readonly { value: string; label: string }[], value: string): string {
  return options.find((option) => option.value === value)?.label ?? "Not specified";
}

/**
 * Builds a pre-filled mailto link so visitors can still reach out when the form cannot send.
 */
export function buildMailtoHref(to: string, payload?: Partial<ContactPayload>): string {
  const subject = payload?.inquiry
    ? `Portfolio enquiry: ${optionLabel(inquiryOptions, payload.inquiry)}`
    : "Portfolio enquiry";
  const lines = [
    payload?.message?.trim() ?? "",
    "",
    payload?.name ? `— ${payload.name.trim()}` : "",
    payload?.budget ? `Budget: ${optionLabel(budgetOptions, payload.budget)}` : "",
  ].filter((line, index) => index < 2 || line);

  const params = new URLSearchParams({ subject, body: lines.join("\n").trim() });
  return `mailto:${to}?${params.toString().replace(/\+/g, "%20")}`;
}

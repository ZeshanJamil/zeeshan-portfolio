export type AssistantRole = "user" | "assistant";

export interface AssistantLink {
  label: string;
  href: string;
}

export interface AssistantMessage {
  id: string;
  role: AssistantRole;
  content: string;
  links?: AssistantLink[];
  source?: "ai" | "offline";
}

export type AssistantMode = "ai" | "offline";

export interface AssistantStatus {
  mode: AssistantMode;
  provider?: string;
}

export type AssistantErrorCode = "invalid" | "not_configured" | "rate_limited" | "provider_error";

export type AssistantResponse =
  | { ok: true; reply: string }
  | { ok: false; code: AssistantErrorCode };

export const assistantLimits = {
  messageMax: 500,
  historyMax: 10,
};

export const suggestedPrompts = [
  "Tell me about MyDriverBook",
  "What React and Node.js work do you do?",
  "Which project is most relevant for a senior frontend role?",
  "How can we work together?",
];

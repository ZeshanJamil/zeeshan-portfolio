"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { answerOffline } from "@/lib/assistant/offline";
import {
  assistantLimits,
  suggestedPrompts,
  type AssistantLink,
  type AssistantMessage,
  type AssistantResponse,
  type AssistantStatus,
} from "@/lib/assistant/types";
import { CloseIcon, SendIcon, SparkleIcon } from "@/components/ui/icons";

type ModeState = { state: "checking" } | ({ state: "ready" } & AssistantStatus);

const intro: AssistantMessage = {
  id: "intro",
  role: "assistant",
  content:
    "Hi — I'm the assistant for Zeeshan's portfolio (not Zeeshan himself). Ask about his projects, skills, experience or how to work together. If I don't know something, I'll say so.",
};

/**
 * Creates a reasonably unique id for a chat message.
 */
function messageId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Renders a suggested link inside an assistant reply using the right element for its destination.
 */
function ReplyLink({ link, onNavigate }: { link: AssistantLink; onNavigate: () => void }) {
  const className =
    "border-line-strong text-ink hover:border-accent-text/60 hover:text-accent-text inline-flex items-center rounded-full border px-3 py-1 text-xs transition-colors";

  if (link.href.startsWith("/")) {
    return (
      <Link href={link.href} onClick={onNavigate} className={className}>
        {link.label}
      </Link>
    );
  }

  const external = link.href.startsWith("http");
  return (
    <a
      href={link.href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {link.label}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}

/**
 * Portfolio assistant dialog. Uses a real AI provider when the server reports one is configured,
 * otherwise answers locally from pre-written portfolio content and says so.
 */
export function AssistantPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<AssistantMessage[]>([intro]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [mode, setMode] = useState<ModeState>({ state: "checking" });
  const titleId = useId();
  const noteId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/assistant", { cache: "no-store" })
      .then((response) => (response.ok ? (response.json() as Promise<AssistantStatus>) : { mode: "offline" as const }))
      .catch(() => ({ mode: "offline" as const }))
      .then((status) => {
        if (!cancelled) setMode({ state: "ready", ...status });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  /**
   * Adds an offline answer to the conversation, optionally prefixed with a fallback notice.
   */
  function replyOffline(question: string, notice?: string) {
    const answer = answerOffline(question);
    setMessages((current) => [
      ...current,
      {
        id: messageId(),
        role: "assistant",
        content: notice ? `${notice}\n\n${answer.content}` : answer.content,
        links: answer.links,
        source: "offline",
      },
    ]);
  }

  /**
   * Sends a question to the AI endpoint, falling back to offline answers when it is unavailable.
   */
  async function ask(question: string) {
    const text = question.trim().slice(0, assistantLimits.messageMax);
    if (!text || pending) return;

    const userMessage: AssistantMessage = { id: messageId(), role: "user", content: text };
    const history = [...messages.filter((message) => message.id !== intro.id), userMessage];
    setMessages((current) => [...current, userMessage]);
    setDraft("");

    if (mode.state !== "ready" || mode.mode !== "ai") {
      replyOffline(text);
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.slice(-assistantLimits.historyMax).map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = (await response.json().catch(() => null)) as AssistantResponse | null;

      if (data?.ok) {
        setMessages((current) => [...current, { id: messageId(), role: "assistant", content: data.reply, source: "ai" }]);
      } else if (data?.code === "rate_limited") {
        replyOffline(text, "You've sent a lot of questions in a short time, so the AI is paused for a few minutes. Here's what the portfolio content says:");
      } else {
        replyOffline(text, "The AI service couldn't respond just now. Here's an answer from the pre-written portfolio content:");
      }
    } catch {
      replyOffline(text, "I couldn't reach the AI service. Here's an answer from the pre-written portfolio content:");
    } finally {
      setPending(false);
    }
  }

  /**
   * Submits the current draft.
   */
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(draft);
  }

  /**
   * Sends on Enter and inserts a newline on Shift+Enter.
   */
  function onDraftKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      void ask(draft);
    }
  }

  const isAi = mode.state === "ready" && mode.mode === "ai";
  const showSuggestions = messages.length <= 1;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={noteId}
      onClose={onClose}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className="bg-bg-elevated text-ink fixed inset-auto right-0 bottom-0 m-0 h-dvh max-h-none w-full max-w-none flex-col overflow-hidden border-line-strong p-0 shadow-3 backdrop:bg-black/50 backdrop:backdrop-blur-[2px] open:flex not-open:hidden sm:right-6 sm:bottom-6 sm:h-[min(42rem,calc(100dvh-3rem))] sm:w-104 sm:rounded-3xl sm:border"
    >
      <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="bg-accent text-accent-contrast inline-flex size-9 items-center justify-center rounded-full">
            <SparkleIcon size={17} />
          </span>
          <div>
            <h2 id={titleId} className="text-[0.9375rem] font-medium">
              Portfolio assistant
            </h2>
            <p className="text-subtle font-mono text-[0.6875rem]">
              {mode.state === "checking"
                ? "Checking mode…"
                : isAi
                  ? `AI mode · ${mode.state === "ready" && mode.provider ? mode.provider : "AI provider"}`
                  : "Offline guide · no AI connected"}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close assistant"
          className="text-muted hover:text-ink hover:bg-surface-2 inline-flex size-9 items-center justify-center rounded-full transition-colors"
        >
          <CloseIcon />
        </button>
      </header>

      <p id={noteId} className="text-subtle bg-surface/60 border-b border-line px-5 py-2.5 text-[0.75rem] leading-relaxed">
        {isAi
          ? "Your questions are sent to a third-party AI provider to generate answers, grounded in this portfolio's content. Please don't share sensitive information."
          : "Answers come from pre-written portfolio content in your browser — nothing you type is sent anywhere."}
      </p>

      <div ref={logRef} role="log" aria-live="polite" aria-relevant="additions" className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
        {messages.map((message) => (
          <div key={message.id} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                message.role === "user" ? "bg-accent text-accent-contrast rounded-br-md" : "bg-surface border border-line rounded-bl-md"
              }`}
            >
              <span className="sr-only">{message.role === "user" ? "You said:" : "Assistant:"}</span>
              <p className="whitespace-pre-wrap">{message.content}</p>
              {message.links?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {message.links.map((link) => (
                    <ReplyLink key={link.href + link.label} link={link} onNavigate={onClose} />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
        {pending ? (
          <div className="flex justify-start" aria-label="Assistant is typing">
            <div className="bg-surface flex gap-1 rounded-2xl rounded-bl-md border border-line px-4 py-3.5">
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="bg-muted size-1.5 animate-[pulse-dot_1s_ease-in-out_infinite] rounded-full"
                  style={{ animationDelay: `${dot * 150}ms` }}
                />
              ))}
            </div>
          </div>
        ) : null}
        {showSuggestions ? (
          <div className="pt-2">
            <p className="text-subtle mb-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase">Try asking</p>
            <ul className="flex flex-col items-start gap-2">
              {suggestedPrompts.map((prompt) => (
                <li key={prompt}>
                  <button
                    type="button"
                    onClick={() => void ask(prompt)}
                    className="border-line-strong text-ink hover:border-accent-text/60 hover:bg-surface rounded-full border px-3.5 py-1.5 text-left text-sm transition-colors"
                  >
                    {prompt}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <form onSubmit={onSubmit} className="border-t border-line p-3">
        <div className="bg-bg focus-within:border-accent-text flex items-end gap-2 rounded-2xl border border-line-strong p-2 transition-colors">
          <label htmlFor={`${titleId}-input`} className="sr-only">
            Ask a question about Zeeshan&apos;s work
          </label>
          <textarea
            ref={inputRef}
            id={`${titleId}-input`}
            rows={1}
            value={draft}
            maxLength={assistantLimits.messageMax}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={onDraftKeyDown}
            placeholder="Ask about projects, skills or working together…"
            className="placeholder:text-subtle max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none"
          />
          <button
            type="submit"
            disabled={!draft.trim() || pending}
            aria-label="Send question"
            className="bg-accent text-accent-contrast hover:bg-accent-hover inline-flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors disabled:opacity-40"
          >
            <SendIcon size={16} />
          </button>
        </div>
        <p className="text-subtle mt-2 px-1 text-[0.6875rem]">
          {draft.length}/{assistantLimits.messageMax} · Enter to send, Shift+Enter for a new line
        </p>
      </form>
    </dialog>
  );
}

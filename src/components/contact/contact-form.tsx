"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import {
  budgetOptions,
  buildMailtoHref,
  contactLimits,
  inquiryOptions,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactPayload,
  type ContactResponse,
} from "@/lib/contact";
import { buttonClass } from "@/components/ui/button";
import { AlertIcon, CheckIcon, MailIcon, SendIcon } from "@/components/ui/icons";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; email: string }
  | { state: "error"; message: string };

const emptyForm: ContactPayload = { name: "", email: "", inquiry: "", budget: "", message: "", website: "" };

const fieldOrder: ContactField[] = ["name", "email", "inquiry", "message"];

/**
 * Maps a failed API response to a clear, honest message for the visitor.
 */
function describeFailure(code: string | undefined): string {
  switch (code) {
    case "not_configured":
      return "The contact form isn't connected to email delivery yet, so your message was not sent.";
    case "rate_limited":
      return "Too many messages were sent from your connection recently. Please wait a few minutes and try again.";
    case "invalid":
      return "Some details need attention before the message can be sent.";
    default:
      return "Something went wrong while sending, and your message was not delivered.";
  }
}

/**
 * Accessible contact form with client and server validation, loading, success and failure states.
 */
export function ContactForm({ email }: { email: string }) {
  const [form, setForm] = useState<ContactPayload>(emptyForm);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  /**
   * Updates a single field and clears its error once the visitor edits it.
   */
  function update<K extends keyof ContactPayload>(key: K, value: ContactPayload[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    if (key in errors) setErrors((current) => ({ ...current, [key]: undefined }));
  }

  /**
   * Moves focus to the first invalid field so keyboard and screen reader users land on the problem.
   */
  function focusFirstError(nextErrors: ContactErrors) {
    const first = fieldOrder.find((field) => nextErrors[field]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  /**
   * Validates, submits to the contact API and reflects the real delivery result.
   */
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.state === "submitting") return;

    const nextErrors = validateContact(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors);
      return;
    }

    setStatus({ state: "submitting" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json().catch(() => null)) as ContactResponse | null;

      if (response.ok && data?.ok) {
        setStatus({ state: "success", email: form.email.trim() });
        setForm(emptyForm);
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }

      const code = data && !data.ok ? data.code : undefined;
      if (data && !data.ok && data.errors) {
        setErrors(data.errors);
        focusFirstError(data.errors);
      }
      setStatus({ state: "error", message: describeFailure(code) });
    } catch {
      setStatus({ state: "error", message: "We couldn't reach the server. Check your connection, or email me directly." });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const ids = {
    name: `${baseId}-name`,
    email: `${baseId}-email`,
    inquiry: `${baseId}-inquiry`,
    budget: `${baseId}-budget`,
    message: `${baseId}-message`,
  };

  if (status.state === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="card flex flex-col items-start gap-5 rounded-[1.75rem] p-8 outline-none sm:p-10"
      >
        <span className="bg-accent-soft text-accent-text inline-flex size-12 items-center justify-center rounded-full">
          <CheckIcon size={22} />
        </span>
        <h3 className="display text-4xl">Message sent.</h3>
        <p className="text-muted leading-relaxed">
          Thanks for reaching out. Your message was delivered, and I&apos;ll reply to{" "}
          <span className="text-ink">{status.email}</span> as soon as I can.
        </p>
        <button type="button" onClick={() => setStatus({ state: "idle" })} className={buttonClass("secondary", "md")}>
          Send another message
        </button>
      </div>
    );
  }

  const submitting = status.state === "submitting";
  const fieldClass = (field?: ContactField) =>
    `bg-bg text-ink placeholder:text-subtle w-full rounded-xl border px-4 py-3 text-[0.9375rem] transition-[border-color,box-shadow] outline-none focus:border-accent-text focus:shadow-[0_0_0_3px_var(--accent-soft)] ${
      field && errors[field] ? "border-danger" : "border-line-strong"
    }`;

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-describedby={`${baseId}-intro`}
      className="card relative rounded-[1.75rem] p-6 sm:p-9"
    >
      <p id={`${baseId}-intro`} className="text-subtle text-sm">
        All fields are required unless marked optional.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={ids.name} className="text-ink text-sm font-medium">
            Name
          </label>
          <input
            id={ids.name}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={contactLimits.nameMax}
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${ids.name}-error` : undefined}
            className={`${fieldClass("name")} mt-2`}
          />
          {errors.name ? (
            <p id={`${ids.name}-error`} className="text-danger mt-2 text-sm">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={ids.email} className="text-ink text-sm font-medium">
            Email
          </label>
          <input
            id={ids.email}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={contactLimits.emailMax}
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${ids.email}-error` : undefined}
            className={`${fieldClass("email")} mt-2`}
          />
          {errors.email ? (
            <p id={`${ids.email}-error`} className="text-danger mt-2 text-sm">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={ids.inquiry} className="text-ink text-sm font-medium">
            What&apos;s this about?
          </label>
          <select
            id={ids.inquiry}
            name="inquiry"
            required
            value={form.inquiry}
            onChange={(event) => update("inquiry", event.target.value as ContactPayload["inquiry"])}
            aria-invalid={Boolean(errors.inquiry)}
            aria-describedby={errors.inquiry ? `${ids.inquiry}-error` : undefined}
            className={`${fieldClass("inquiry")} mt-2 appearance-none bg-[url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'><path d='m6 9 6 6 6-6'/></svg>")] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`}
          >
            <option value="" disabled>
              Choose a topic
            </option>
            {inquiryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.inquiry ? (
            <p id={`${ids.inquiry}-error`} className="text-danger mt-2 text-sm">
              {errors.inquiry}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={ids.budget} className="text-ink text-sm font-medium">
            Budget <span className="text-subtle font-normal">(optional)</span>
          </label>
          <select
            id={ids.budget}
            name="budget"
            value={form.budget}
            onChange={(event) => update("budget", event.target.value as ContactPayload["budget"])}
            className={`${fieldClass()} mt-2 appearance-none bg-[url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'><path d='m6 9 6 6 6-6'/></svg>")] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`}
          >
            {budgetOptions.map((option) => (
              <option key={option.value || "none"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor={ids.message} className="text-ink text-sm font-medium">
              Message
            </label>
            <span className="text-subtle font-mono text-xs" aria-hidden="true">
              {form.message.length}/{contactLimits.messageMax}
            </span>
          </div>
          <textarea
            id={ids.message}
            name="message"
            required
            rows={6}
            maxLength={contactLimits.messageMax}
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
            placeholder="A few lines about the role, product or problem you're working on."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={`${ids.message}-hint${errors.message ? ` ${ids.message}-error` : ""}`}
            className={`${fieldClass("message")} mt-2 resize-y`}
          />
          <p id={`${ids.message}-hint`} className="sr-only">
            Between {contactLimits.messageMin} and {contactLimits.messageMax} characters.
          </p>
          {errors.message ? (
            <p id={`${ids.message}-error`} className="text-danger mt-2 text-sm">
              {errors.message}
            </p>
          ) : null}
        </div>

        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={`${baseId}-website`}>Leave this field empty</label>
          <input
            id={`${baseId}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(event) => update("website", event.target.value)}
          />
        </div>
      </div>

      <div ref={statusRef} tabIndex={-1} className="outline-none" aria-live="polite">
        {status.state === "error" ? (
          <div role="alert" className="border-danger/40 bg-danger/10 mt-6 flex gap-3 rounded-xl border p-4 text-sm">
            <AlertIcon className="text-danger mt-0.5 shrink-0" />
            <div>
              <p className="text-ink">{status.message}</p>
              <a
                href={buildMailtoHref(email, form)}
                className="text-accent-text mt-2 inline-flex items-center gap-1.5 font-medium underline-offset-4 hover:underline"
              >
                <MailIcon size={15} />
                Send it by email instead
              </a>
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-7 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-subtle text-xs leading-relaxed">
          Your details are only used to reply to you.
        </p>
        <button type="submit" disabled={submitting} aria-disabled={submitting} className={buttonClass("primary", "lg")}>
          {submitting ? (
            <>
              <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <SendIcon size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

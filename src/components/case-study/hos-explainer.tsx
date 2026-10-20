"use client";

import { useId, useState } from "react";

type LimitState = "ok" | "alert" | "exceeded";

interface Limit {
  id: string;
  label: string;
  rule: string;
  hours: number;
}

const limits: Limit[] = [
  { id: "break", label: "30-minute break", rule: "Required after 8 cumulative hours of driving", hours: 8 },
  { id: "driving", label: "11-hour driving limit", rule: "Maximum driving after 10 consecutive hours off duty", hours: 11 },
  { id: "window", label: "14-hour duty window", rule: "No driving beyond the 14th hour after coming on duty", hours: 14 },
];

const alertWindowHours = 1;

/**
 * Formats decimal hours as `Hh MMm`.
 */
function formatHours(value: number): string {
  const totalMinutes = Math.round(value * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${String(minutes).padStart(2, "0")}m`;
}

/**
 * Classifies how close the driver is to a limit.
 */
function stateFor(remaining: number): LimitState {
  if (remaining <= 0) return "exceeded";
  if (remaining <= alertWindowHours) return "alert";
  return "ok";
}

const stateStyles: Record<LimitState, { bar: string; text: string; label: string }> = {
  ok: { bar: "var(--accent-text)", text: "text-accent-text", label: "Within limit" },
  alert: { bar: "var(--warn)", text: "text-warn", label: "Advance alert" },
  exceeded: { bar: "var(--danger)", text: "text-danger", label: "Limit reached" },
};

/**
 * Conceptual, simplified explainer of how FMCSA Hours of Service limits interact during a shift.
 * It illustrates the domain only and does not reproduce any product's UI or calculation logic.
 */
export function HosExplainer() {
  const [hours, setHours] = useState(6.5);
  const sliderId = useId();

  const evaluated = limits.map((limit) => {
    const remaining = limit.hours - hours;
    return { ...limit, remaining, state: stateFor(remaining), progress: Math.min(hours / limit.hours, 1) };
  });

  const firstIssue = evaluated.find((limit) => limit.state !== "ok");
  const summary = firstIssue
    ? firstIssue.state === "exceeded"
      ? `${firstIssue.label} reached — the driver would need to stop or take a break.`
      : `${formatHours(firstIssue.remaining)} until the ${firstIssue.label.toLowerCase()} — the moment an early warning helps most.`
    : "All limits have more than an hour of headroom.";

  return (
    <figure className="card overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-2)]">
      <div className="border-b border-line p-7 sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-accent-text font-mono text-xs tracking-[0.14em] uppercase">Conceptual explainer</p>
          <span className="chip">Not product UI</span>
        </div>
        <h3 className="display mt-4 text-2xl sm:text-3xl">How Hours of Service limits stack up in one shift</h3>
        <p className="text-muted mt-3 max-w-2xl text-[0.9375rem] leading-relaxed">
          Drag through a simplified shift where a driver drives continuously from the moment they come on duty. Several
          limits run at the same time — which is why alerting before a limit, not after, matters.
        </p>

        <div className="mt-8">
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor={sliderId} className="text-ink text-sm font-medium">
              Time since coming on duty
            </label>
            <output htmlFor={sliderId} className="display text-3xl tabular-nums">
              {formatHours(hours)}
            </output>
          </div>
          <input
            id={sliderId}
            type="range"
            min={0}
            max={15}
            step={0.25}
            value={hours}
            onChange={(event) => setHours(Number(event.target.value))}
            aria-valuetext={`${formatHours(hours)} since coming on duty`}
            className="accent-[var(--accent)] mt-4 h-2 w-full cursor-pointer"
          />
          <div className="text-subtle mt-2 flex justify-between font-mono text-[0.6875rem]" aria-hidden="true">
            <span>0h</span>
            <span>5h</span>
            <span>10h</span>
            <span>15h</span>
          </div>
        </div>
      </div>

      <ul className="divide-y divide-line">
        {evaluated.map((limit) => {
          const style = stateStyles[limit.state];
          return (
            <li key={limit.id} className="grid gap-3 px-7 py-5 sm:grid-cols-12 sm:items-center sm:px-9">
              <div className="sm:col-span-5">
                <p className="text-ink font-medium">{limit.label}</p>
                <p className="text-subtle text-xs">{limit.rule}</p>
              </div>
              <div className="sm:col-span-4">
                <div className="bg-surface-3 h-1.5 overflow-hidden rounded-full">
                  <div
                    className="h-full origin-left rounded-full transition-[transform,background-color] duration-300"
                    style={{ transform: `scaleX(${limit.progress})`, background: style.bar }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 sm:col-span-3 sm:justify-end">
                <span className={`font-mono text-xs ${style.text}`}>{style.label}</span>
                <span className="text-ink font-mono text-sm tabular-nums">
                  {limit.remaining > 0 ? formatHours(limit.remaining) : "0h 00m"}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="bg-surface-2 border-t border-line px-7 py-5 sm:px-9">
        <p className="text-ink text-sm" aria-live="polite">
          {summary}
        </p>
      </div>
      <figcaption className="text-subtle border-t border-line px-7 py-4 text-xs leading-relaxed sm:px-9">
        Simplified illustration of FMCSA property-carrying limits; the one-hour warning window is illustrative. Real HOS
        rules include additional provisions (such as the 60/70-hour cycle, sleeper-berth splits and exceptions). This is
        not MyDriverBook&apos;s interface or calculation logic.
      </figcaption>
    </figure>
  );
}

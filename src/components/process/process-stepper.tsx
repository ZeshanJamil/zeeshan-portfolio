"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { ProcessStep } from "@/content/types";
import { CheckIcon } from "@/components/ui/icons";

/**
 * Interactive "how I build products" sequence implemented as an accessible tablist.
 */
export function ProcessStepper({ steps }: { steps: ProcessStep[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = steps[activeIndex];

  /**
   * Moves focus and selection between tabs with arrow, Home and End keys.
   */
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const last = steps.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = activeIndex === last ? 0 : activeIndex + 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = activeIndex === 0 ? last : activeIndex - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  }

  const progress = steps.length > 1 ? activeIndex / (steps.length - 1) : 1;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="relative lg:col-span-5">
        <div aria-hidden="true" className="absolute top-6 bottom-6 left-[1.4rem] w-px bg-line">
          <div
            className="bg-accent-text w-px origin-top transition-transform duration-700 ease-[var(--ease-out-expo)]"
            style={{ height: "100%", transform: `scaleY(${progress})` }}
          />
        </div>
        <div role="tablist" aria-label="How I build products" aria-orientation="vertical" className="relative flex flex-col gap-2">
          {steps.map((step, index) => {
            const selected = index === activeIndex;
            const done = index < activeIndex;
            return (
              <button
                key={step.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`process-tab-${step.id}`}
                aria-selected={selected}
                aria-controls={`process-panel-${step.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={onKeyDown}
                className={`group/tab flex w-full items-start gap-5 rounded-2xl p-3 text-left transition-colors ${
                  selected ? "bg-surface" : "hover:bg-surface/60"
                }`}
              >
                <span
                  className={`relative z-10 inline-flex size-[2.05rem] shrink-0 items-center justify-center rounded-full border font-mono text-xs transition-colors duration-300 ${
                    selected
                      ? "border-accent-text bg-accent text-accent-contrast"
                      : done
                        ? "border-accent-text/60 bg-bg text-accent-text"
                        : "border-line-strong bg-bg text-subtle"
                  }`}
                >
                  {done ? <CheckIcon size={14} /> : String(index + 1).padStart(2, "0")}
                </span>
                <span className="pt-1">
                  <span className={`block text-lg font-medium ${selected ? "text-ink" : "text-muted group-hover/tab:text-ink"}`}>
                    {step.title}
                  </span>
                  <span className="text-subtle mt-0.5 block text-sm">{step.summary}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-7">
        {steps.map((step, index) => (
          <div
            key={step.id}
            role="tabpanel"
            id={`process-panel-${step.id}`}
            aria-labelledby={`process-tab-${step.id}`}
            hidden={index !== activeIndex}
            tabIndex={0}
            className="card relative h-full overflow-hidden rounded-[1.75rem] p-8 shadow-[var(--shadow-2)] sm:p-10"
          >
            <div aria-hidden="true" className="hairline-grid absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
            <div key={active.id} className="animate-fade-rise relative">
              <p className="text-accent-text font-mono text-xs tracking-[0.14em] uppercase">
                Step {String(index + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
              </p>
              <h3 className="display mt-5 text-3xl sm:text-4xl">{step.title}</h3>
              <p className="text-ink mt-4 text-xl leading-snug">{step.summary}</p>
              <ul className="mt-8 space-y-4">
                {step.details.map((detail) => (
                  <li key={detail} className="text-muted flex gap-3 leading-relaxed">
                    <span aria-hidden="true" className="bg-accent-text mt-[0.6rem] size-1.5 shrink-0 rounded-full" />
                    {detail}
                  </li>
                ))}
              </ul>
              <div className="mt-10 border-t border-line pt-6">
                <p className="text-subtle font-mono text-[0.6875rem] tracking-[0.14em] uppercase">In practice</p>
                <p className="text-ink mt-2 text-[0.9375rem]">{step.evidence}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { quickFacts } from "@/content/profile";

/**
 * Strip of verified credibility facts shown directly under the hero.
 */
export function QuickFacts() {
  return (
    <section aria-label="Quick facts" className="border-y border-line bg-bg-elevated">
      <dl className="container-page grid grid-cols-2 lg:grid-cols-4">
        {quickFacts.map((fact, index) => (
          <div
            key={fact.label}
            data-reveal
            style={{ ["--reveal-index" as string]: index }}
            className={`py-8 pr-4 sm:py-10 ${index % 2 === 1 ? "border-l border-line pl-5 sm:pl-8" : ""} ${
              index > 0 ? "lg:border-l lg:border-line lg:pl-8" : ""
            } ${index > 1 ? "border-t border-line lg:border-t-0" : ""}`}
          >
            <dt className="text-subtle font-mono text-[0.6875rem] tracking-[0.14em] uppercase">{fact.label}</dt>
            <dd className="mt-3">
              <span className="display block text-[clamp(1.6rem,3vw,2.25rem)]">{fact.value}</span>
              <span className="text-muted mt-2 block text-sm leading-relaxed">{fact.detail}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

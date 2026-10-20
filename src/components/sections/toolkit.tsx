import { SectionHeading } from "@/components/ui/section-heading";
import { skillGroups } from "@/content/capabilities";

/**
 * Technical toolkit grouped by area, shown as clean labels without skill-rating bars.
 */
export function Toolkit() {
  return (
    <section aria-labelledby="toolkit-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="toolkit-title"
          eyebrow="Technical toolkit"
          title="The tools I use to ship."
          lead="Grouped by where they sit in a product — no rating bars, just the technologies and domain knowledge I work with."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <section
              key={group.title}
              aria-labelledby={`skills-${index}`}
              data-reveal
              style={{ ["--reveal-index" as string]: index % 2 }}
              className="card rounded-[1.5rem] p-7 sm:p-9"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 id={`skills-${index}`} className="display text-3xl">
                  {group.title}
                </h3>
                <span className="text-subtle font-mono text-xs">{String(group.items.length).padStart(2, "0")}</span>
              </div>
              <p className="text-muted mt-2 text-sm">{group.description}</p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-ink bg-surface-2 rounded-lg border border-line px-3 py-1.5 text-sm transition-colors hover:border-accent-text/50"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

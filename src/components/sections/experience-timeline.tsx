import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/content/profile";

/**
 * Editorial experience timeline built from the CV.
 */
export function ExperienceTimeline() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-20 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="experience-title" eyebrow="Experience" title="Where I've done the work." />

        <ol className="mt-16 border-t border-line">
          {experience.map((item, index) => (
            <li
              key={item.company}
              data-reveal
              style={{ ["--reveal-index" as string]: index }}
              className="grid gap-6 border-b border-line py-10 md:grid-cols-12 md:gap-10 md:py-14"
            >
              <div className="md:col-span-4">
                <p className="text-accent-text font-mono text-xs tracking-wide">
                  <time dateTime={item.start}>{item.periodLabel.split(" – ")[0]}</time>
                  {" – "}
                  {item.end ? <time dateTime={item.end}>{item.periodLabel.split(" – ")[1]}</time> : "Present"}
                </p>
                <h3 className="display mt-4 text-4xl">{item.company}</h3>
                <p className="text-ink mt-2">{item.role}</p>
                <p className="text-subtle mt-1 text-sm">{item.location}</p>
                {item.end === null ? (
                  <span className="chip text-accent-text mt-5 border-accent-text/40">Current role</span>
                ) : null}
              </div>
              <div className="md:col-span-8">
                <ul className="space-y-4">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="text-muted flex gap-4 leading-relaxed">
                      <span aria-hidden="true" className="bg-line-strong mt-[0.7rem] h-px w-4 shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-2">
                  <span className="text-subtle mr-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase">Projects</span>
                  {item.projects.map((project) => (
                    <span key={project} className="chip">
                      {project}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

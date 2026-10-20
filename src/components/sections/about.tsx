import { about, profile } from "@/content/profile";

/**
 * Short, CV-based bio with working principles, education and languages.
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20 border-t border-line bg-bg-elevated py-24 sm:py-32">
      <div className="container-page grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7" data-reveal>
          <p className="eyebrow">About</p>
          <h2 id="about-title" className="display mt-5 text-[clamp(1.9rem,3.6vw,2.75rem)]">
            {about.title}
          </h2>
          <div className="text-muted mt-8 space-y-5 text-[1.0625rem] leading-relaxed">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <dl className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
            <div>
              <dt className="text-subtle font-mono text-[0.6875rem] tracking-[0.14em] uppercase">Education</dt>
              <dd className="mt-3 space-y-3">
                {profile.education.map((item) => (
                  <div key={item.title}>
                    <p className="text-ink">{item.title}</p>
                    <p className="text-muted text-sm">
                      {item.institution} · {item.period}
                    </p>
                  </div>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-subtle font-mono text-[0.6875rem] tracking-[0.14em] uppercase">Languages</dt>
              <dd className="text-ink mt-3">{profile.languages.join(" · ")}</dd>
              <dt className="text-subtle mt-6 font-mono text-[0.6875rem] tracking-[0.14em] uppercase">Location</dt>
              <dd className="text-ink mt-3">{profile.location}</dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-5 lg:pt-16">
          <ol className="flex flex-col gap-4">
            {about.principles.map((principle, index) => (
              <li
                key={principle.title}
                data-reveal
                style={{ ["--reveal-index" as string]: index }}
                className="card rounded-[1.5rem] p-7"
              >
                <div className="flex items-center gap-4">
                  <span className="text-accent-text font-mono text-xs">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="text-lg font-medium">{principle.title}</h3>
                </div>
                <p className="text-muted mt-3 leading-relaxed">{principle.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

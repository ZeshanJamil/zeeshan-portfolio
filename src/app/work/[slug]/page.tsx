import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseGallery } from "@/components/case-study/case-gallery";
import { HosExplainer } from "@/components/case-study/hos-explainer";
import { PendingConfirmation } from "@/components/case-study/pending-confirmation";
import { VideoPreview } from "@/components/case-study/video-preview";
import { buttonClass } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { ProjectLink } from "@/components/work/project-link";
import { experience } from "@/content/profile";
import { getCaseStudyProjects, getProjectBySlug } from "@/content/projects";
import type { CaseStudySection } from "@/content/types";
import { site } from "@/lib/site";

/**
 * Prerenders a page for every project that has a case study.
 */
export function generateStaticParams() {
  return getCaseStudyProjects().map((project) => ({ slug: project.slug }));
}

export const ensureStatic = "navigation";

/**
 * Builds per-case-study metadata from the project content.
 */
export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project?.caseStudy) return {};

  const title = `${project.name} case study`;
  return {
    title,
    description: project.summary,
    alternates: site.hasProductionUrl ? { canonical: `/work/${project.slug}` } : undefined,
    openGraph: { type: "article", title: `${title} · Zeeshan Jamil`, description: project.summary, url: `/work/${project.slug}` },
    twitter: { card: "summary_large_image", title: `${title} · Zeeshan Jamil`, description: project.summary },
  };
}

/**
 * Renders a text-based case study section with optional body copy and bullet points.
 */
function StudySection({ id, index, section }: { id: string; index: number; section: CaseStudySection }) {
  return (
    <section aria-labelledby={id} className="grid gap-8 border-t border-line py-14 md:grid-cols-12 md:gap-10 md:py-20" data-reveal>
      <div className="md:col-span-4">
        <p className="text-accent-text font-mono text-xs">{String(index).padStart(2, "0")}</p>
        <h2 id={id} className="display mt-3 text-3xl sm:text-4xl">
          {section.title}
        </h2>
      </div>
      <div className="md:col-span-8">
        {section.body?.map((paragraph) => (
          <p key={paragraph} className="text-muted mb-5 text-[1.0625rem] leading-relaxed last:mb-0">
            {paragraph}
          </p>
        ))}
        {section.points?.length ? (
          <ul className={`grid gap-3 ${section.body?.length ? "mt-8" : ""}`}>
            {section.points.map((point, pointIndex) => {
              const [lead, ...rest] = point.split(" — ");
              return (
                <li key={point} className="card flex gap-5 rounded-2xl p-5">
                  <span className="text-subtle font-mono text-xs pt-1">{String(pointIndex + 1).padStart(2, "0")}</span>
                  <p className="text-muted leading-relaxed">
                    {rest.length ? (
                      <>
                        <span className="text-ink font-medium">{lead}</span> — {rest.join(" — ")}
                      </>
                    ) : (
                      point
                    )}
                  </p>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

/**
 * Case study page for a featured project.
 */
export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project?.caseStudy) notFound();

  const study = project.caseStudy;
  const role = experience.find((item) => item.company === project.employer);
  const caseStudies = getCaseStudyProjects();
  const next = caseStudies[(caseStudies.findIndex((item) => item.slug === project.slug) + 1) % caseStudies.length];
  const sections: { id: string; section: CaseStudySection }[] = [
    { id: "problem", section: study.problemSpace },
    { id: "challenges", section: study.domainChallenges },
    { id: "contributions", section: study.contributions },
    ...(study.technicalApproach ? [{ id: "approach", section: study.technicalApproach }] : []),
    ...(study.outcome ? [{ id: "outcome", section: study.outcome }] : []),
  ];

  return (
    <article aria-labelledby="case-title">
      <header className="grain relative isolate overflow-hidden pt-32 pb-16 sm:pt-40">
        <div
          aria-hidden="true"
          className="hairline-grid absolute inset-0 -z-10 mask-[radial-gradient(ellipse_at_60%_0%,black,transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="absolute -top-48 left-1/2 -z-10 size-192 -translate-x-1/2 rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
        />
        <div className="container-page">
          <nav aria-label="Breadcrumb">
            <ol className="text-subtle flex items-center gap-2 font-mono text-xs">
              <li>
                <Link href="/#work" className="hover:text-ink transition-colors">
                  Work
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">
                {project.name}
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow animate-rise">
                Case study · {project.category}
              </p>
              <h1 id="case-title" className="display animate-rise mt-6 text-[clamp(2.75rem,7vw,5rem)] [animation-delay:60ms]">
                {project.name}
              </h1>
              <p className="text-ink animate-rise mt-6 max-w-2xl text-2xl leading-snug [animation-delay:120ms]">
                {project.tagline}
              </p>
              <p className="text-muted animate-rise mt-5 max-w-2xl text-[1.0625rem] leading-relaxed [animation-delay:160ms]">
                {study.intro}
              </p>
            </div>
            <div className="animate-rise flex flex-wrap gap-3 lg:col-span-4 lg:justify-end [animation-delay:200ms]">
              <ProjectLink link={project.link} projectName={project.name} variant="primary" />
              <Link href="/#contact" className={buttonClass("secondary", "lg")}>
                Discuss a similar product
              </Link>
            </div>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {[
              { label: "Role", value: role ? `${role.role}, ${role.company}` : "Contributor" },
              { label: "Period", value: project.periodLabel },
              { label: "Domain", value: project.category },
              { label: "Focus", value: project.tags.slice(0, 2).join(" · ") },
            ].map((item) => (
              <div key={item.label} className="bg-bg p-5">
                <dt className="text-subtle font-mono text-[0.6875rem] tracking-[0.14em] uppercase">{item.label}</dt>
                <dd className="text-ink mt-2 text-sm">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {project.cover ? (
        <div className="container-page">
          <figure className="card relative overflow-hidden rounded-4xl shadow-3">
            <div aria-hidden="true" className="hairline-grid absolute inset-0 opacity-60" />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse at 50% 0%, var(--glow), transparent 65%)" }}
            />
            <div className="relative mx-auto max-w-5xl px-4 pt-10 pb-4 sm:px-10 sm:pt-14">
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                width={project.cover.width}
                height={project.cover.height}
                sizes="(min-width: 1280px) 1024px, 92vw"
                preload
                className="h-auto w-full"
              />
            </div>
            <figcaption className="text-subtle relative border-t border-line px-6 py-4 font-mono text-[0.6875rem] tracking-wide">
              {project.cover.caption} Source: {project.cover.source}.
            </figcaption>
          </figure>
        </div>
      ) : null}

      <div className="container-page mt-16 sm:mt-24">
        <PendingConfirmation items={study.pendingConfirmation} file="src/content/projects.ts" />

        {sections.map(({ id, section }, index) => (
          <StudySection key={id} id={id} index={index + 1} section={section} />
        ))}

        {project.slug === "mydriverbook" ? (
          <section aria-label="Hours of Service explainer" className="border-t border-line py-14 md:py-20" data-reveal>
            <HosExplainer />
          </section>
        ) : null}

        <section aria-labelledby="gallery-title" className="border-t border-line py-14 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4" data-reveal>
            <h2 id="gallery-title" className="display text-3xl sm:text-4xl">
              Product views
            </h2>
            <p className="text-subtle max-w-sm text-sm">
              Imagery published on {project.link.url ? new URL(project.link.url).hostname.replace(/^www\./, "") : "the product site"}.
            </p>
          </div>
          <div className="mt-10">
            <CaseGallery images={study.gallery} />
          </div>
        </section>

        {study.video ? (
          <section aria-label="Product video" className="border-t border-line py-14 md:py-20" data-reveal>
            <VideoPreview video={study.video} sourceUrl={project.link.url} />
          </section>
        ) : null}
      </div>

      <section aria-labelledby="case-cta" className="border-t border-line bg-bg-elevated">
        <div className="container-page grid gap-10 py-20 md:grid-cols-12 md:items-center md:py-28">
          <div className="md:col-span-7" data-reveal>
            <p className="eyebrow">Working on something similar?</p>
            <h2 id="case-cta" className="display mt-5 text-[clamp(2rem,4vw,3rem)]">
              Let&apos;s talk about your <em className="text-accent-text">product</em>.
            </h2>
            <p className="text-muted mt-5 max-w-xl leading-relaxed">
              Compliance-heavy workflows, data-dense dashboards or a React and Node.js product that needs a senior
              engineer — I&apos;m happy to hear about it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#contact" className={buttonClass("primary", "lg")}>
                Contact me
                <ArrowRightIcon />
              </Link>
              <ProjectLink link={project.link} projectName={project.name} variant="secondary" />
            </div>
          </div>
          {next && next.slug !== project.slug ? (
            <Link
              href={`/work/${next.slug}`}
              className="group/next card relative overflow-hidden rounded-[1.75rem] p-8 transition-colors hover:border-accent-text/50 md:col-span-5"
              data-reveal
            >
              <span className="text-subtle font-mono text-xs tracking-[0.14em] uppercase">Next case study</span>
              <span className="display mt-4 block text-4xl">{next.name}</span>
              <span className="text-muted mt-3 block">{next.tagline}</span>
              <span className="text-accent-text mt-8 inline-flex items-center gap-2 text-sm font-medium">
                Read case study
                <ArrowRightIcon className="transition-transform group-hover/next:translate-x-1" />
              </span>
            </Link>
          ) : null}
        </div>
      </section>
    </article>
  );
}

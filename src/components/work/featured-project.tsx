import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";
import { buttonClass } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { ProjectLink } from "./project-link";

interface FeaturedProjectProps {
  project: Project;
  index: number;
  flagship?: boolean;
  reverse?: boolean;
}

/**
 * Large project card with real product imagery, used for MyDriverBook and LogELD.
 */
export function FeaturedProject({ project, index, flagship = false, reverse = false }: FeaturedProjectProps) {
  const gallery = project.caseStudy?.gallery ?? [];
  const phone = gallery.find((image) => image.height > image.width);
  const titleId = `project-${project.slug}`;

  return (
    <article
      aria-labelledby={titleId}
      data-reveal
      className="group/card card relative overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-2)]"
    >
      <div className={`grid lg:grid-cols-12 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div className="flex flex-col justify-between gap-10 p-7 sm:p-10 lg:col-span-5 lg:p-12">
          <div>
            <div className="text-subtle flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs tracking-wide">
              <span className="text-accent-text">{String(index).padStart(2, "0")}</span>
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>{project.periodLabel}</span>
              {flagship ? (
                <span className="border-accent-text/40 text-accent-text rounded-full border px-2 py-0.5 text-[0.625rem] tracking-[0.14em] uppercase">
                  Flagship
                </span>
              ) : null}
            </div>
            <h3 id={titleId} className="display mt-6 text-[clamp(2rem,3.8vw,3rem)]">
              {project.name}
            </h3>
            {project.aliases?.length ? (
              <p className="text-subtle mt-1 text-sm">Also known as {project.aliases.join(", ")}</p>
            ) : null}
            <p className="text-ink mt-6 text-xl leading-snug">{project.tagline}</p>
            <p className="text-muted mt-4 leading-relaxed">{project.summary}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.name} focus areas`}>
              {project.tags.map((tag) => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            {project.caseStudy ? (
              <Link href={`/work/${project.slug}`} className={buttonClass("primary", "lg")}>
                Read case study
                <ArrowRightIcon className="transition-transform group-hover/button:translate-x-0.5" />
                <span className="sr-only">: {project.name}</span>
              </Link>
            ) : null}
            <ProjectLink link={project.link} projectName={project.name} />
          </div>
        </div>

        {project.cover ? (
          <div className="relative min-h-[20rem] overflow-hidden border-t border-line lg:col-span-7 lg:border-t-0 lg:border-l">
            <div aria-hidden="true" className="hairline-grid absolute inset-0 opacity-70" />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 20%, var(--glow), transparent 60%), linear-gradient(to bottom, transparent, var(--surface-2))",
              }}
            />
            <figure className="relative flex h-full flex-col justify-center px-6 pt-10 pb-6 sm:px-10">
              <div className="relative">
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  width={project.cover.width}
                  height={project.cover.height}
                  sizes="(min-width: 1280px) 680px, (min-width: 1024px) 55vw, 92vw"
                  className={`relative w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/card:-translate-y-1.5 ${
                    flagship && phone ? "pr-[16%]" : ""
                  }`}
                />
                {flagship && phone ? (
                  <Image
                    src={phone.src}
                    alt={phone.alt}
                    width={phone.width}
                    height={phone.height}
                    sizes="(min-width: 1024px) 180px, 28vw"
                    className="absolute right-0 bottom-[-6%] w-[27%] drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/card:-translate-y-4"
                  />
                ) : null}
              </div>
              <figcaption className="text-subtle mt-8 font-mono text-[0.6875rem] tracking-wide">
                {project.cover.caption} <span className="opacity-80">Source: {project.cover.source}.</span>
              </figcaption>
            </figure>
          </div>
        ) : null}
      </div>
    </article>
  );
}

import type { Project } from "@/content/types";
import { ProjectLink } from "./project-link";

/**
 * Editorial list of additional projects with period, category and an honest link state.
 */
export function ProjectIndex({ projects, startIndex }: { projects: Project[]; startIndex: number }) {
  return (
    <ol className="border-t border-line">
      {projects.map((project, offset) => (
        <li
          key={project.slug}
          data-reveal
          style={{ ["--reveal-index" as string]: offset }}
          className="group/row relative border-b border-line"
        >
          <article
            aria-labelledby={`project-${project.slug}`}
            className="grid gap-4 py-8 transition-colors md:grid-cols-12 md:gap-6 md:py-10"
          >
            <div className="text-subtle font-mono text-xs md:col-span-1 md:pt-2">
              {String(startIndex + offset).padStart(2, "0")}
            </div>
            <div className="md:col-span-4">
              <h3
                id={`project-${project.slug}`}
                className="display text-3xl transition-colors group-hover/row:text-accent-text sm:text-4xl"
              >
                {project.name}
              </h3>
              <p className="text-subtle mt-2 font-mono text-xs tracking-wide">
                {project.category} · {project.periodLabel}
              </p>
            </div>
            <div className="md:col-span-5">
              <p className="text-ink leading-snug">{project.tagline}</p>
              <p className="text-muted mt-2 text-[0.9375rem] leading-relaxed">{project.summary}</p>
            </div>
            <div className="md:col-span-2 md:pt-1.5 md:text-right">
              <ProjectLink link={project.link} projectName={project.name} />
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}

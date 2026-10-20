import { SectionHeading } from "@/components/ui/section-heading";
import { FeaturedProject } from "@/components/work/featured-project";
import { ProjectIndex } from "@/components/work/project-index";
import { projects } from "@/content/projects";

/**
 * Selected work: MyDriverBook as the flagship, LogELD second, then the remaining projects.
 */
export function SelectedWork() {
  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);

  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-20 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          align="split"
          title={
            <>
              Products where the details <em className="text-accent-text">matter</em>.
            </>
          }
          lead="Most of my recent work is in trucking compliance software, where an interface has to be accurate, fast to read and trustworthy under real working conditions."
        />

        <div className="mt-16 flex flex-col gap-8 sm:mt-20">
          {featured.map((project, index) => (
            <FeaturedProject
              key={project.slug}
              project={project}
              index={index + 1}
              flagship={index === 0}
              reverse={index % 2 === 1}
            />
          ))}
        </div>

        <div className="mt-24">
          <div className="flex items-end justify-between gap-6" data-reveal>
            <h3 className="display text-2xl sm:text-3xl">More projects</h3>
            <p className="text-subtle hidden font-mono text-xs sm:block">2020 — 2024</p>
          </div>
          <div className="mt-8">
            <ProjectIndex projects={others} startIndex={featured.length + 1} />
          </div>
        </div>
      </div>
    </section>
  );
}

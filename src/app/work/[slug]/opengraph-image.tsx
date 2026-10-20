import { getCaseStudyProjects, getProjectBySlug } from "@/content/projects";
import { ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Case study by Zeeshan Jamil, Senior Full-Stack Software Engineer.";

/**
 * Prerenders a social image for every case study.
 */
export function generateStaticParams() {
  return getCaseStudyProjects().map((project) => ({ slug: project.slug }));
}

/**
 * Generates a case-study specific social preview image.
 */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return renderOgImage({
    eyebrow: "Case study",
    title: project ? `${project.name} —` : "Case study",
    accent: project?.tagline,
    subtitle: project?.summary ?? "",
    footer: project ? `${project.category} · ${project.periodLabel}` : "Zeeshan Jamil",
  });
}

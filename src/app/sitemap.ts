import type { MetadataRoute } from "next";
import { getCaseStudyProjects } from "@/content/projects";
import { absoluteUrl } from "@/lib/site";

/**
 * Lists the home page and every case study for search engines.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    ...getCaseStudyProjects().map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

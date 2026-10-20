import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/**
 * Allows crawling of public pages and points crawlers to the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}

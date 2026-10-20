import { profile } from "@/content/profile";

/**
 * Resolves the public site URL from an explicit setting, falling back to the
 * production domain Vercel exposes at build time.
 */
function resolveSiteUrl(): string | undefined {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelHost) return `https://${vercelHost.replace(/\/$/, "")}`;
  return undefined;
}

const configuredSiteUrl = resolveSiteUrl();

export const site = {
  url: configuredSiteUrl ?? "http://localhost:3000",
  hasProductionUrl: Boolean(configuredSiteUrl),
  title: `${profile.name} — Senior Full-Stack Engineer (React & Node.js)`,
  shortTitle: profile.name,
  description:
    "Zeeshan Jamil is a Senior Full-Stack Software Engineer in Lahore, Pakistan, building reliable web products with React, Node.js and TypeScript — including trucking compliance software such as MyDriverBook and LogELD.",
  locale: "en_US",
};

/**
 * Builds an absolute URL for the given path using the configured site URL.
 */
export function absoluteUrl(path = "/"): string {
  return new URL(path, `${site.url}/`).toString();
}

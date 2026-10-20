import Link from "next/link";
import { navigation, profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Wordmark } from "./wordmark";

/**
 * Returns the current year; cached so the footer stays part of the static shell.
 */
async function getCopyrightYear(): Promise<number> {
  "use cache";
  return new Date().getFullYear();
}

/**
 * Site footer with contact details, navigation and live project links.
 */
export async function SiteFooter() {
  const year = await getCopyrightYear();
  const liveProjects = projects.filter((project) => project.link.status === "live" && project.link.url);

  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Wordmark />
          <p className="text-muted mt-5 max-w-sm text-sm leading-relaxed">
            {profile.headline}. Based in {profile.location}.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="link-underline text-ink mt-6 inline-block text-lg"
          >
            {profile.email}
          </a>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
          <div>
            <h2 className="text-subtle font-mono text-xs tracking-[0.14em] uppercase">Site</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted hover:text-ink transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#contact" className="text-muted hover:text-ink transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-subtle font-mono text-xs tracking-[0.14em] uppercase">Projects</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {liveProjects.map((project) => (
                <li key={project.slug}>
                  <a
                    href={project.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-ink inline-flex items-center gap-1 transition-colors"
                  >
                    {project.name}
                    <ArrowUpRightIcon size={13} />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-subtle font-mono text-xs tracking-[0.14em] uppercase">Elsewhere</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-ink inline-flex items-center gap-1 transition-colors"
                >
                  LinkedIn
                  <ArrowUpRightIcon size={13} />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
              {profile.github ? (
                <li>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-ink inline-flex items-center gap-1 transition-colors"
                  >
                    GitHub
                    <ArrowUpRightIcon size={13} />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ) : null}
              {profile.cvPath ? (
                <li>
                  <a href={profile.cvPath} download className="text-muted hover:text-ink transition-colors">
                    Download CV
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="container-page text-subtle flex flex-col gap-2 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p>Product names and imagery belong to their respective owners.</p>
        </div>
      </div>
    </footer>
  );
}

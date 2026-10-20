import type { ProjectLink as ProjectLinkData } from "@/content/types";
import { buttonClass, type ButtonVariant } from "@/components/ui/button";
import { ArrowUpRightIcon, LockIcon } from "@/components/ui/icons";

interface ProjectLinkProps {
  link: ProjectLinkData;
  projectName: string;
  variant?: ButtonVariant | "inline";
}

/**
 * Renders a project's link in a safe state: a real external link when live, otherwise an honest note.
 */
export function ProjectLink({ link, projectName, variant = "inline" }: ProjectLinkProps) {
  if (link.status === "live" && link.url) {
    const label = link.label ?? `Visit ${projectName}`;
    const className =
      variant === "inline"
        ? "text-ink hover:text-accent-text inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
        : buttonClass(variant, "lg");

    return (
      <a href={link.url} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
        <ArrowUpRightIcon size={15} className="transition-transform group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
        <span className="sr-only">(opens {projectName} in a new tab)</span>
      </a>
    );
  }

  const text =
    link.note ?? (link.status === "private" ? "Private project — details on request." : "Details available on request.");

  return (
    <span className="text-subtle inline-flex items-center gap-1.5 text-sm">
      {link.status === "private" ? <LockIcon size={14} /> : null}
      {text}
    </span>
  );
}

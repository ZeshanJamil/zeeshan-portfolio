import type { ReactNode } from "react";

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "split";
}

/**
 * Renders the shared eyebrow, heading and lead used at the top of each section.
 */
export function SectionHeading({ id, eyebrow, title, lead, align = "left" }: SectionHeadingProps) {
  if (align === "split") {
    return (
      <div className="grid gap-6 md:grid-cols-12 md:items-end" data-reveal>
        <div className="md:col-span-7">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={id} className="display mt-5 text-[clamp(2.25rem,5vw,3.75rem)]">
            {title}
          </h2>
        </div>
        {lead ? (
          <p className="text-muted max-w-md text-[1.0625rem] leading-relaxed md:col-span-5 md:justify-self-end">
            {lead}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="max-w-3xl" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="display mt-5 text-[clamp(2.25rem,5vw,3.75rem)]">
        {title}
      </h2>
      {lead ? <p className="text-muted mt-5 max-w-2xl text-[1.0625rem] leading-relaxed">{lead}</p> : null}
    </div>
  );
}

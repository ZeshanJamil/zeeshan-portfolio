import Link from "next/link";
import { buttonClass } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/content/capabilities";

/**
 * Ways I can help, each grounded in skills and experience from the CV.
 */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-20 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="services-title"
          eyebrow="Ways I can help"
          align="split"
          title={
            <>
              For teams hiring and <em className="text-accent-text">founders</em> building.
            </>
          }
          lead="Whether you need a senior engineer on your team or someone to build, improve or maintain a web application, these are the areas where I can contribute from day one."
        />

        <ul className="mt-16 grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <li
              key={service.title}
              data-reveal
              style={{ ["--reveal-index" as string]: index % 3 }}
              className="group/service bg-bg relative flex flex-col p-8 transition-colors hover:bg-surface sm:p-9"
            >
              <span className="text-subtle font-mono text-xs">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-8 text-xl font-medium tracking-tight">{service.title}</h3>
              <p className="text-muted mt-3 flex-1 leading-relaxed">{service.description}</p>
              <p className="text-accent-text mt-8 font-mono text-[0.6875rem] tracking-wide">{service.evidence}</p>
              <span
                aria-hidden="true"
                className="bg-accent-text absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover/service:scale-x-100"
              />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-[1.75rem] border border-line p-8 sm:flex-row sm:items-center" data-reveal>
          <p className="text-ink max-w-xl text-lg leading-snug">
            Not sure which of these fits? Describe the product or the role — I&apos;ll tell you honestly whether I&apos;m a good match.
          </p>
          <Link href="/#contact" className={buttonClass("primary", "lg")}>
            Start a conversation
            <ArrowRightIcon className="transition-transform group-hover/button:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

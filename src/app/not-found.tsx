import Link from "next/link";
import { buttonClass } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * Friendly 404 page that routes visitors back to the work and contact sections.
 */
export default function NotFound() {
  return (
    <section className="grain relative isolate flex min-h-[80dvh] items-center overflow-hidden pt-28 pb-20">
      <div aria-hidden="true" className="hairline-grid absolute inset-0 -z-10 mask-[radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="container-page">
        <p className="eyebrow">404</p>
        <h1 className="display mt-6 text-[clamp(2.5rem,6vw,4.5rem)]">This page doesn&apos;t exist.</h1>
        <p className="text-muted mt-5 max-w-lg text-lg">
          The link may be outdated. The work and contact details are only a click away.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/#work" className={buttonClass("primary", "lg")}>
            See my work
            <ArrowRightIcon />
          </Link>
          <Link href="/#contact" className={buttonClass("secondary", "lg")}>
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}

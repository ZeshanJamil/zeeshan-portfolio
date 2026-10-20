import Link from "next/link";
import { SystemMap } from "@/components/hero/system-map";
import { buttonClass } from "@/components/ui/button";
import { ArrowRightIcon, DownloadIcon } from "@/components/ui/icons";
import { experience, hero, profile } from "@/content/profile";

/**
 * Opening section: positioning statement, primary calls to action and the system-map illustration.
 */
export function Hero() {
  const current = experience.find((item) => item.end === null);

  return (
    <section
      aria-labelledby="hero-title"
      data-parallax-host
      className="grain relative isolate overflow-hidden pt-32 pb-20 sm:pt-36 lg:pt-40 lg:pb-28"
    >
      <div
        aria-hidden="true"
        className="hairline-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_20%,black_10%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 right-[-10%] -z-10 size-[42rem] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
      />

      <div className="container-page grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="eyebrow animate-rise">{hero.eyebrow}</p>
          <h1
            id="hero-title"
            className="display animate-rise mt-7 text-[clamp(2.75rem,7vw,5.5rem)] [animation-delay:60ms]"
          >
            I build <em className="text-accent-text">reliable</em> web products, from complex interfaces to
            full-stack systems.
          </h1>
          <p className="text-muted animate-rise mt-7 max-w-xl text-lg leading-relaxed [animation-delay:120ms]">
            {hero.lead}
          </p>

          <div className="animate-rise mt-10 flex flex-wrap items-center gap-3 [animation-delay:180ms]">
            <Link href="/#work" className={buttonClass("primary", "lg")}>
              Explore my work
              <ArrowRightIcon className="transition-transform group-hover/button:translate-x-0.5" />
            </Link>
            <Link href="/#contact" className={buttonClass("secondary", "lg")}>
              Contact me
            </Link>
            {profile.cvPath ? (
              <a href={profile.cvPath} download className={buttonClass("ghost", "lg")}>
                <DownloadIcon />
                Download CV
                <span className="sr-only">(PDF)</span>
              </a>
            ) : null}
          </div>

          {current ? (
            <dl className="animate-rise text-muted mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 text-sm [animation-delay:240ms]">
              <div className="flex gap-2">
                <dt className="text-subtle">Currently</dt>
                <dd className="text-ink">
                  {current.role}, {current.company}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-subtle">Based in</dt>
                <dd className="text-ink">{profile.location}</dd>
              </div>
            </dl>
          ) : null}
        </div>

        <div className="lg:col-span-5">
          <SystemMap />
        </div>
      </div>
    </section>
  );
}

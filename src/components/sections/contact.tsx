import { ContactForm } from "@/components/contact/contact-form";
import { ArrowUpRightIcon, DownloadIcon, LinkedInIcon, MailIcon } from "@/components/ui/icons";
import { profile } from "@/content/profile";

/**
 * Closing call to action with direct contact routes and the contact form.
 */
export function Contact() {
  const channels = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: MailIcon, external: false },
    { label: "LinkedIn", value: "zeeshan-jamil", href: profile.linkedin, icon: LinkedInIcon, external: true },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="grain relative isolate scroll-mt-20 overflow-hidden border-t border-line py-24 sm:py-32"
    >
      <div aria-hidden="true" className="hairline-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_20%_30%,black,transparent_65%)]" />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-40 -z-10 size-[36rem] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
      />

      <div className="container-page grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5" data-reveal>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="display mt-5 text-[clamp(2.1rem,4.4vw,3.4rem)]">
            Have a product to build or a role to <em className="text-accent-text">fill</em>?
          </h2>
          <p className="text-muted mt-6 max-w-md text-[1.0625rem] leading-relaxed">
            Tell me about the team, the product or the problem. I read every message and reply personally.
          </p>

          <ul className="mt-10 flex flex-col gap-3">
            {channels.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group/channel bg-surface/70 hover:border-accent-text/50 flex items-center gap-4 rounded-2xl border border-line p-4 transition-colors"
                >
                  <span className="bg-surface-2 text-accent-text inline-flex size-11 items-center justify-center rounded-xl">
                    <channel.icon />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="text-subtle block font-mono text-[0.6875rem] tracking-[0.14em] uppercase">
                      {channel.label}
                    </span>
                    <span className="text-ink block truncate">{channel.value}</span>
                  </span>
                  <ArrowUpRightIcon className="text-subtle transition-transform group-hover/channel:-translate-y-0.5 group-hover/channel:translate-x-0.5" />
                  {channel.external ? <span className="sr-only">(opens in a new tab)</span> : null}
                </a>
              </li>
            ))}
            {profile.cvPath ? (
              <li>
                <a
                  href={profile.cvPath}
                  download
                  className="text-muted hover:text-ink mt-2 inline-flex items-center gap-2 text-sm transition-colors"
                >
                  <DownloadIcon size={16} />
                  Download my CV (PDF)
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <div className="lg:col-span-7" data-reveal>
          <ContactForm email={profile.email} />
        </div>
      </div>
    </section>
  );
}

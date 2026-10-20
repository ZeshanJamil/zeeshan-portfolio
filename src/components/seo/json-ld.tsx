import { experience, profile } from "@/content/profile";
import { absoluteUrl, site } from "@/lib/site";

/**
 * Emits Person and WebSite structured data built only from verified profile content.
 */
export function JsonLd() {
  const current = experience.find((item) => item.end === null);
  const sameAs = [profile.linkedin, profile.github].filter((url): url is string => Boolean(url));

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": absoluteUrl("/#person"),
        name: profile.name,
        jobTitle: profile.role,
        description: profile.summary,
        email: `mailto:${profile.email}`,
        url: absoluteUrl("/"),
        sameAs,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lahore",
          addressCountry: "PK",
        },
        worksFor: current ? { "@type": "Organization", name: current.company } : undefined,
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Lahore Garrison University",
        },
        knowsLanguage: ["English", "Urdu"],
        knowsAbout: [
          "React",
          "Node.js",
          "TypeScript",
          "Next.js",
          "NestJS",
          "MongoDB",
          "Electronic Logging Devices",
          "Hours of Service",
          "FMCSA compliance",
        ],
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: site.shortTitle,
        description: site.description,
        inLanguage: "en",
        author: { "@id": absoluteUrl("/#person") },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}

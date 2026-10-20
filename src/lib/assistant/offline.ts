import { services, skillGroups } from "@/content/capabilities";
import { experience, profile } from "@/content/profile";
import { projects } from "@/content/projects";
import type { Project } from "@/content/types";
import type { AssistantLink } from "./types";

export interface OfflineAnswer {
  content: string;
  links?: AssistantLink[];
}

interface Intent {
  keywords: string[];
  answer: () => OfflineAnswer;
}

const contactLinks: AssistantLink[] = [
  { label: "Contact form", href: "/#contact" },
  { label: "Email Zeeshan", href: `mailto:${profile.email}` },
];

/**
 * Builds a short answer describing a single project with its safe links.
 */
function projectAnswer(project: Project): OfflineAnswer {
  const links: AssistantLink[] = [];
  if (project.caseStudy) links.push({ label: `${project.name} case study`, href: `/work/${project.slug}` });
  if (project.link.status === "live" && project.link.url) links.push({ label: project.link.label ?? `Visit ${project.name}`, href: project.link.url });

  const linkNote = project.link.status === "live" ? "" : ` ${project.link.note ?? "Details are available on request."}`;
  const role = project.employer ? ` Zeeshan worked on it at ${project.employer}.` : "";
  return {
    content: `${project.name} (${project.periodLabel}) — ${project.summary}${role}${linkNote}`,
    links: links.length ? links : contactLinks,
  };
}

/**
 * Finds a project by name or alias.
 */
function findProject(name: string): Project {
  const project = projects.find((item) => item.slug === name);
  if (!project) throw new Error(`Unknown project ${name}`);
  return project;
}

const intents: Intent[] = [
  {
    keywords: ["mydriverbook", "driverbook", "driver book", "hos", "hours of service", "flagship", "violation", "fmcsa"],
    answer: () => {
      const base = projectAnswer(findProject("mydriverbook"));
      return {
        ...base,
        content: `${base.content} It's his flagship project: his engineering focus is HOS and driver-compliance functionality, alongside architecture, stakeholder coordination and code reviews. Specific stack details and metrics for the project aren't published — ask him directly for more.`,
      };
    },
  },
  {
    keywords: ["logeld", "log eld", "eld", "electronic logging"],
    answer: () => projectAnswer(findProject("logeld")),
  },
  {
    keywords: ["hrms", "human resource", "hr system"],
    answer: () => projectAnswer(findProject("hrms")),
  },
  {
    keywords: ["q-holding", "qholding", "q holding", "investment", "uae"],
    answer: () => projectAnswer(findProject("q-holding")),
  },
  {
    keywords: ["emformance", "task management", "goals"],
    answer: () => projectAnswer(findProject("emformance")),
  },
  {
    keywords: ["vision collab", "visioncollab", "agile", "workload"],
    answer: () => projectAnswer(findProject("vision-collab")),
  },
  {
    keywords: ["health", "medilink", "healthcare", "hospital"],
    answer: () => projectAnswer(findProject("health-care-system")),
  },
  {
    keywords: ["recruit", "senior frontend", "frontend role", "hiring", "role", "position", "job", "relevant", "fit"],
    answer: () => ({
      content:
        "For a senior React, frontend or full-stack role, the most relevant evidence is his current position as Senior Software Engineer at TekHQS (Mar 2022 – present): technical leadership, code reviews and mentoring, architecting React and Node.js solutions, and work on Driverbook and LogELD with a focus on HOS and driver-compliance functionality. Start with the MyDriverBook case study, then LogELD.",
      links: [
        { label: "MyDriverBook case study", href: "/work/mydriverbook" },
        { label: "Experience", href: "/#experience" },
        { label: "Download CV", href: profile.cvPath ?? "/#contact" },
      ],
    }),
  },
  {
    keywords: ["work together", "hire", "freelance", "contract", "client", "build", "budget", "cost", "price", "rate", "help", "service", "project for"],
    answer: () => ({
      content: `Zeeshan offers: ${services.map((service) => service.title).join("; ")}. To start, share a few lines about the product, the problem and your timeline through the contact form or by email — rates and availability aren't published, so he'll reply personally.`,
      links: [{ label: "Services", href: "/#services" }, ...contactLinks],
    }),
  },
  {
    keywords: ["skill", "stack", "react", "node", "typescript", "next", "nest", "express", "mongo", "tech", "tools", "javascript", "redux"],
    answer: () => ({
      content: `He works with React and Node.js day to day. ${skillGroups
        .map((group) => `${group.title}: ${group.items.join(", ")}.`)
        .join(" ")}`,
      links: [{ label: "Toolkit & services", href: "/#services" }],
    }),
  },
  {
    keywords: ["experience", "tekhqs", "xeven", "career", "background", "years", "history", "lead", "mentor"],
    answer: () => ({
      content: `${profile.yearsOfExperience} years of experience. ${experience
        .map((item) => `${item.role} at ${item.company} (${item.periodLabel})`)
        .join("; ")}. At TekHQS he provides technical leadership, code reviews and mentoring, and participates in hiring and onboarding.`,
      links: [{ label: "Experience timeline", href: "/#experience" }],
    }),
  },
  {
    keywords: ["project", "portfolio", "work", "built", "products"],
    answer: () => ({
      content: `Projects: ${projects.map((project) => `${project.name} (${project.periodLabel})`).join(", ")}. MyDriverBook and LogELD have full case studies.`,
      links: [
        { label: "Selected work", href: "/#work" },
        { label: "MyDriverBook case study", href: "/work/mydriverbook" },
        { label: "LogELD case study", href: "/work/logeld" },
      ],
    }),
  },
  {
    keywords: ["education", "degree", "university", "study", "studied", "training"],
    answer: () => ({
      content: profile.education.map((item) => `${item.title} — ${item.institution} (${item.period})`).join(". ") + ".",
    }),
  },
  {
    keywords: ["contact", "email", "reach", "linkedin", "available", "availability", "talk", "call", "cv", "resume"],
    answer: () => ({
      content: `You can reach Zeeshan at ${profile.email}, on LinkedIn, or through the contact form. Availability isn't published, so it's best to ask him directly.`,
      links: [...contactLinks, { label: "LinkedIn", href: profile.linkedin }],
    }),
  },
  {
    keywords: ["where", "location", "based", "lahore", "pakistan", "timezone", "time zone", "language"],
    answer: () => ({
      content: `He's based in ${profile.location} and speaks ${profile.languages.join(" and ")}. For questions about working hours or arrangements, please ask him directly.`,
      links: contactLinks,
    }),
  },
];

/**
 * Checks whether the keyword appears at the start of a word, so "hos" does not match "those".
 */
function matchesWordStart(text: string, keyword: string): boolean {
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9])${escaped}`).test(text);
}

/**
 * Answers a question from pre-written portfolio content without calling any AI service.
 */
export function answerOffline(question: string): OfflineAnswer {
  const normalized = question.toLowerCase();
  let best: { intent: Intent; score: number } | null = null;

  for (const intent of intents) {
    const score = intent.keywords.reduce(
      (total, keyword) => (matchesWordStart(normalized, keyword) ? total + keyword.length : total),
      0,
    );
    if (score > 0 && (!best || score > best.score)) best = { intent, score };
  }

  if (best) return best.intent.answer();

  return {
    content:
      "I don't have that detail in the portfolio content. I can tell you about Zeeshan's projects (like MyDriverBook and LogELD), his skills, experience or how to work together — or you can ask him directly.",
    links: contactLinks,
  };
}

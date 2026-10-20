import type { ProcessStep, Service, SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    description: "Interfaces that stay clear as products and data grow.",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Redux",
      "React Query",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Material UI",
      "Ant Design",
      "Bootstrap",
    ],
  },
  {
    title: "Backend",
    description: "Services and APIs behind the product.",
    items: ["Node.js", "Express.js", "NestJS", "REST API development", "Third-party API integration"],
  },
  {
    title: "Data & Integrations",
    description: "Storage, tooling and the data people need to see.",
    items: ["MongoDB", "Git", "Google Maps integration", "Charting & data visualization"],
  },
  {
    title: "Product & Domain",
    description: "Industry context that shapes better decisions.",
    items: [
      "Trucking & logistics applications",
      "ELD",
      "Hours of Service (HOS)",
      "Driver-compliance workflows",
      "FMCSA regulations",
    ],
  },
];

export const services: Service[] = [
  {
    title: "React & TypeScript frontends",
    description:
      "Component-driven interfaces with React, Next.js and TypeScript — built to be readable, accessible and easy for the next developer to extend.",
    evidence: "React.js · Next.js · TypeScript · Redux · React Query",
  },
  {
    title: "Full-stack web applications",
    description:
      "End-to-end features with a React frontend and a Node.js backend using Express or NestJS, designed around the product's real requirements.",
    evidence: "Node.js · Express.js · NestJS · MongoDB",
  },
  {
    title: "SaaS dashboards & admin portals",
    description:
      "Data-dense dashboards and back-office tools where clarity, filtering and dependable state management matter more than decoration.",
    evidence: "Experience across ELD, HRMS and task-management products",
  },
  {
    title: "API integrations & data-heavy interfaces",
    description:
      "Connecting third-party APIs and presenting the results in interfaces that people can scan and act on quickly.",
    evidence: "REST API development · third-party API integration",
  },
  {
    title: "Maps, tracking & operational views",
    description:
      "Map-based views, charts and operational screens for products where location and time-sensitive information drive decisions.",
    evidence: "Google Maps integration · charting & data visualization",
  },
  {
    title: "Improving existing applications",
    description:
      "Code reviews, refactoring toward maintainability, reliability fixes across devices and steady performance work on products already in use.",
    evidence: "Code reviews · mentoring · debugging and reliability work",
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: "understand",
    title: "Understand",
    summary: "Start from the workflow, not the ticket.",
    details: [
      "Work with stakeholders to research requirements and identify the features that matter.",
      "Clarify constraints early — compliance rules, data sources, users and edge cases.",
    ],
    evidence: "Stakeholder research on HRMS; HOS and compliance requirements on Driverbook and LogELD.",
  },
  {
    id: "architect",
    title: "Architect",
    summary: "Shape a solution the team can maintain.",
    details: [
      "Design React and Node.js structures that fit the product's business requirements.",
      "Agree on implementation priorities so the most important work ships first.",
    ],
    evidence: "Architecting maintainable React and Node.js solutions at TekHQS.",
  },
  {
    id: "build",
    title: "Build & review",
    summary: "Deliver features with consistent engineering practices.",
    details: [
      "Build complex features, integrate APIs and test across devices and platforms.",
      "Review code and mentor developers so quality holds across the team.",
    ],
    evidence: "Technical leadership, code reviews and mentoring for a full-stack team.",
  },
  {
    id: "ship",
    title: "Ship & support",
    summary: "Keep delivery visible and issues moving.",
    details: [
      "Keep stakeholders updated on delivery progress and work through issue resolution together.",
      "Feed what users say back into product improvements.",
    ],
    evidence: "Incorporating stakeholder feedback into product improvements.",
  },
];

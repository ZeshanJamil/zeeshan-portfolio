import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "mydriverbook",
    name: "MyDriverBook",
    aliases: ["Driverbook"],
    period: { start: "2024-04", end: null },
    periodLabel: "Apr 2024 – Present",
    category: "Trucking & Logistics",
    employer: "TekHQS",
    featured: true,
    tagline: "Hours of Service, made visible before it becomes a violation.",
    summary:
      "Driver-facing trucking application supporting Hours of Service (HOS) calculations and advance alerts for potential violations, helping drivers follow applicable FMCSA rules.",
    link: { status: "live", url: "https://mydriverbook.com", label: "Visit mydriverbook.com" },
    tags: ["HOS calculations", "Violation alerts", "FMCSA compliance", "Driver-facing"],
    cover: {
      src: "/work/mydriverbook/fleet-compliance.webp",
      alt: "MyDriverBook Fleet Compliance screen showing a driver's break, driving, shift and cycle clocks, a duty-status log timeline, violation flags, a vehicle map and a fuel-level panel.",
      width: 942,
      height: 677,
      caption: "Fleet Compliance view: HOS clocks, duty-status timeline and violation flags.",
      source: "Product imagery published on mydriverbook.com",
    },
    caseStudy: {
      intro:
        "MyDriverBook (Driverbook) is a driver-facing trucking application that supports Hours of Service calculations and gives advance alerts for potential violations, helping drivers follow applicable FMCSA rules. It is the product I have worked on most recently at TekHQS.",
      problemSpace: {
        title: "The problem space",
        body: [
          "Commercial truck drivers in the United States operate under FMCSA Hours of Service rules — limits on how long they can drive, how long their duty window lasts, when breaks are required and how many hours they can work across a rolling cycle.",
          "Those limits interact with each other and change minute by minute as a driver moves between duty statuses. A driver-facing product has to turn that complexity into something a person can understand at a glance, and warn them before a limit is crossed rather than after.",
        ],
      },
      domainChallenges: {
        title: "Why this is a hard product domain",
        points: [
          "Accuracy — several HOS limits run at once, so calculations have to be correct and explainable to the people relying on them.",
          "Time sensitivity — an alert is only useful if it arrives early enough for the driver to act on it.",
          "Data-heavy interfaces — duty-status logs, timelines, vehicles and locations all need to stay readable.",
          "Integrations — fleet, location and map data come together from multiple sources.",
          "Operational users — drivers and fleet staff use the product during real work, so clarity beats decoration.",
        ],
      },
      contributions: {
        title: "My contributions",
        body: [
          "I work on Driverbook as part of TekHQS's trucking and transportation products, with my engineering focus on HOS and driver-compliance functionality.",
        ],
        points: [
          "Architecting and developing maintainable React and Node.js solutions for complex application features aligned with product and business requirements.",
          "Coordinating with stakeholders on technical requirements, implementation priorities, delivery progress and issue resolution.",
          "Providing technical leadership to the full-stack team through code reviews, mentoring and consistent engineering practices.",
        ],
      },
      gallery: [
        {
          src: "/work/mydriverbook/fleet-compliance.webp",
          alt: "MyDriverBook Fleet Compliance screen with HOS clocks for break, driving, shift and cycle, a duty-status log grid, violation flags for the 14-hour shift limit, 30-minute break and 11-hour driving limit, a map of vehicles and a vehicle info card.",
          width: 942,
          height: 677,
          caption: "Fleet Compliance — HOS clocks, duty-status timeline and violation flags in one view.",
          source: "mydriverbook.com",
          frame: "none",
        },
        {
          src: "/work/mydriverbook/fleet-app-maps.webp",
          alt: "MyDriverBook fleet mobile app on a phone showing a map of the United States with vehicle markers, a vehicle search field and tabs for Maps, Logs, Safety and Alerts.",
          width: 720,
          height: 1383,
          caption: "Fleet mobile app — live vehicle map with Logs, Safety and Alerts tabs.",
          source: "mydriverbook.com",
          frame: "none",
        },
      ],
      video: {
        src: "https://mydriverbook.com/wp-content/uploads/2026/09/My_DriverBook_FleetApp-1.mp4",
        poster: "/work/mydriverbook/video-poster.webp",
        title: "MyDriverBook Fleet app introduction",
        caption: "Official product video for the MyDriverBook Fleet app.",
        source: "mydriverbook.com",
      },
      pendingConfirmation: [
        "Technical approach: which parts of the stack (React, Next.js, Node.js, NestJS, MongoDB, maps, charts) you can publicly confirm for Driverbook.",
        "Specific features you personally built or led (e.g. HOS calculation logic, alerting, logs UI, fleet dashboard).",
        "A public outcome statement you are comfortable sharing — no numbers unless you can verify them.",
        "Confirm the product imagery from mydriverbook.com is approved for use in your portfolio.",
      ],
    },
  },
  {
    slug: "logeld",
    name: "LogELD",
    period: { start: "2022-03", end: "2023-02" },
    periodLabel: "Mar 2022 – Feb 2023",
    category: "Trucking & Logistics",
    employer: "TekHQS",
    featured: true,
    tagline: "Electronic logging for compliant transportation operations.",
    summary:
      "Electronic Logging Device (ELD) solution for transportation operations, supporting automated HOS recording and driver compliance workflows.",
    link: { status: "live", url: "https://www.logeld.com", label: "Visit logeld.com" },
    tags: ["ELD", "Automated HOS recording", "Driver compliance", "Fleet operations"],
    cover: {
      src: "/work/logeld/dashboard.webp",
      alt: "LogELD web dashboard on a laptop showing a fleet map with truck markers across the United States, a driver events chart and tables of driver events and units.",
      width: 960,
      height: 594,
      caption: "LogELD dashboard: fleet view, driver events and unit tables.",
      source: "Product imagery published on logeld.com",
    },
    caseStudy: {
      intro:
        "LogELD is an Electronic Logging Device (ELD) solution for transportation operations, supporting automated HOS recording and driver compliance workflows. It was the first trucking product I worked on after joining TekHQS.",
      problemSpace: {
        title: "The problem space",
        body: [
          "FMCSA's ELD rule requires most commercial drivers who keep Records of Duty Status to record their Hours of Service electronically. Fleets need those records captured automatically, reviewed by office staff and kept in a compliant form.",
          "An ELD product sits between the vehicle, the driver and the back office — so the web application has to present logs, violations, form-and-manner errors and inspection reports clearly enough for operations teams to act on them.",
        ],
      },
      domainChallenges: {
        title: "Why this is a hard product domain",
        points: [
          "Compliance-grade records — logs have to reflect what actually happened and remain reviewable.",
          "Many moving parts — drivers, units, events and locations change constantly across a fleet.",
          "Exception handling — violations, missing signatures and inspection defects need to stand out from normal records.",
          "Operational dashboards — maps, charts and tables have to stay fast and legible as data grows.",
        ],
      },
      contributions: {
        title: "My contributions",
        body: [
          "I worked on LogELD as part of TekHQS's trucking and transportation products, with a focus on HOS and driver-compliance functionality.",
        ],
        points: [
          "Developing React and Node.js features aligned with product and business requirements.",
          "Coordinating with stakeholders on requirements, priorities and issue resolution.",
        ],
      },
      gallery: [
        {
          src: "/work/logeld/dashboard.webp",
          alt: "LogELD dashboard on a laptop with a fleet map, a driver events pie chart and tables listing driver events and units.",
          width: 960,
          height: 594,
          caption: "Dashboard — fleet view, driver events and unit activity.",
          source: "logeld.com",
          frame: "none",
        },
        {
          src: "/work/logeld/hos-logs.webp",
          alt: "LogELD logs table with columns for date, driver, hours worked, distance, Hours of Service, form and manner and inspection report, highlighting a 70-hour cycle limit violation, a missing driver signature and an inspection defect.",
          width: 1400,
          height: 771,
          caption: "Logs — HOS violations, form-and-manner errors and inspection defects surfaced per driver.",
          source: "logeld.com",
          frame: "browser",
        },
      ],
      pendingConfirmation: [
        "Technical approach and stack you can publicly confirm for LogELD.",
        "Specific modules you built (e.g. logs, dashboard, driver management, reports).",
        "Any public outcome you are comfortable sharing.",
        "Confirm the product imagery from logeld.com is approved for use in your portfolio.",
      ],
    },
  },
  {
    slug: "hrms",
    name: "HRMS",
    period: { start: "2023-12", end: "2024-04" },
    periodLabel: "Dec 2023 – Apr 2024",
    category: "HR & Operations",
    employer: "TekHQS",
    tagline: "Human resource management, shaped with stakeholders.",
    summary:
      "Human resource management solution. Worked with stakeholders to research requirements, identify key system features and incorporate feedback into product improvements.",
    link: {
      status: "private",
      url: "https://admin.hrm.tekhqs.net/",
      note: "Internal admin portal — details available on request.",
    },
    tags: ["Requirements research", "Stakeholder feedback", "Admin portal"],
  },
  {
    slug: "q-holding",
    name: "Q-Holding",
    period: { start: "2023-03", end: "2023-12" },
    periodLabel: "Mar 2023 – Dec 2023",
    category: "Corporate",
    tagline: "A web presence for a diversified investment group.",
    summary:
      "Project for a UAE investment group with interests in real estate, hospitality and diversified investments.",
    link: {
      status: "unavailable",
      url: "https://qholding.com",
      note: "The original site is no longer online — details available on request.",
    },
    tags: ["Corporate website", "UAE", "Real estate & hospitality"],
  },
  {
    slug: "emformance",
    name: "EMFormance",
    period: { start: "2021-07", end: "2022-03" },
    periodLabel: "Jul 2021 – Mar 2022",
    category: "Productivity",
    employer: "XevenSolutions",
    tagline: "Tasks, goals and feedback in one workspace.",
    summary:
      "Task and project management platform supporting task lifecycles, goals, progress tracking and employee feedback.",
    link: {
      status: "live",
      url: "https://www.emformance.com/",
      label: "Visit current product site",
      note: "The live product has evolved since my involvement.",
    },
    tags: ["Task lifecycles", "Goals & progress", "Employee feedback"],
  },
  {
    slug: "vision-collab",
    name: "Vision Collab",
    period: { start: "2021-01", end: "2021-07" },
    periodLabel: "Jan 2021 – Jul 2021",
    category: "Productivity",
    employer: "XevenSolutions",
    tagline: "Agile planning and workload management for teams.",
    summary:
      "Planning and agile collaboration solution with workload management, day planning, HR and project management features.",
    link: {
      status: "unavailable",
      url: "https://visioncollab.com",
      note: "The original product site is no longer online — details available on request.",
    },
    tags: ["Agile planning", "Workload management", "Day planning"],
  },
  {
    slug: "health-care-system",
    name: "Health Care System",
    aliases: ["Medilink"],
    period: { start: "2020-11", end: "2021-01" },
    periodLabel: "Nov 2020 – Jan 2021",
    category: "Healthcare",
    employer: "XevenSolutions",
    tagline: "Healthcare workflows backed by real data.",
    summary:
      "Healthcare web application with frontend interface development and database-backed workflows.",
    link: { status: "live", url: "http://medilink.com.pk/medilink/", label: "Visit Medilink" },
    tags: ["Frontend interfaces", "Database-backed workflows"],
  },
];

/**
 * Returns the projects that have a full case study page.
 */
export function getCaseStudyProjects(): Project[] {
  return projects.filter((project) => Boolean(project.caseStudy));
}

/**
 * Finds a project by its URL slug.
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

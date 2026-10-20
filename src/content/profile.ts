import type { Experience, NavItem, Profile } from "./types";

export const profile: Profile = {
  name: "Zeeshan Jamil",
  shortName: "Zeeshan",
  headline: "Senior Full-Stack Software Engineer | React & Node.js",
  role: "Senior Full-Stack Software Engineer",
  location: "Lahore, Pakistan",
  email: "zeshanjamil47@gmail.com",
  linkedin: "https://www.linkedin.com/in/zeeshan-jamil-6929b3135",
  github: null,
  cvPath: "/Zeeshan_Jamil_CV.pdf",
  yearsOfExperience: "5+",
  summary:
    "Senior Full-Stack Software Engineer with 5+ years of experience building web applications using React, Node.js, JavaScript and TypeScript. Specialized experience in trucking and transportation technology, including Electronic Logging Device (ELD) products, Hours of Service (HOS) workflows and FMCSA-related compliance features.",
  languages: ["English", "Urdu (native)"],
  education: [
    {
      title: "BS Computer Science",
      institution: "Lahore Garrison University",
      period: "2016 – 2020",
    },
    {
      title: "MERN Stack Training",
      institution: "EVS",
      period: "Apr 2020 – Jul 2020",
    },
  ],
};

export const hero = {
  eyebrow: "Senior Full-Stack Engineer · React & Node.js",
  title: "I build reliable web products, from complex interfaces to full-stack systems.",
  lead: "5+ years of product engineering with React, Node.js and TypeScript — most recently leading work on trucking compliance software where accuracy, clarity and time-sensitive workflows matter.",
};

export const quickFacts = [
  {
    label: "Experience",
    value: "5+ years",
    detail: "Building production web applications since 2020.",
  },
  {
    label: "Core stack",
    value: "React · Node.js",
    detail: "TypeScript, Next.js, NestJS, Express and MongoDB.",
  },
  {
    label: "Domain",
    value: "Trucking & logistics",
    detail: "ELD, Hours of Service and driver-compliance workflows.",
  },
  {
    label: "Leadership",
    value: "Team lead",
    detail: "Code reviews, mentoring, hiring and onboarding.",
  },
];

export const about = {
  title: "Engineering that respects the product, the team and the people using it.",
  paragraphs: [
    "I'm a full-stack engineer based in Lahore, Pakistan. Since 2020 I've built web applications with React, Node.js, JavaScript and TypeScript — first at XevenSolutions on task management, team collaboration and healthcare products, and since 2022 at TekHQS, where I work on trucking and transportation software including Driverbook and LogELD.",
    "Day to day, that means turning product and business requirements into maintainable React and Node.js solutions, reviewing code, mentoring developers and keeping stakeholders aligned on priorities, progress and issue resolution.",
  ],
  principles: [
    {
      title: "Requirements first",
      body: "Work with stakeholders to understand the real workflow before choosing an implementation.",
    },
    {
      title: "Maintainable by default",
      body: "Consistent engineering practices, reviewed code and architecture the next developer can follow.",
    },
    {
      title: "Teams that grow",
      body: "Mentoring, code reviews, hiring and onboarding to strengthen the people around the code.",
    },
  ],
};

export const experience: Experience[] = [
  {
    company: "TekHQS",
    role: "Senior Software Engineer",
    periodLabel: "Mar 2022 – Present",
    start: "2022-03",
    end: null,
    location: "Lahore, Pakistan",
    highlights: [
      "Provide technical leadership to a full-stack development team, including code reviews, mentoring and promoting consistent engineering practices.",
      "Architect and develop maintainable React and Node.js solutions, delivering complex application features aligned with product and business requirements.",
      "Work on trucking and transportation software products, including Driverbook and LogELD, with a focus on HOS and driver-compliance functionality.",
      "Coordinate with stakeholders on technical requirements, implementation priorities, delivery progress and issue resolution.",
      "Participate in hiring and onboarding developers to strengthen team capabilities.",
    ],
    projects: ["Driverbook", "LogELD", "HRMS"],
  },
  {
    company: "XevenSolutions",
    role: "Software Engineer",
    periodLabel: "Nov 2020 – Mar 2022",
    start: "2020-11",
    end: "2022-03",
    location: "Lahore, Pakistan",
    highlights: [
      "Developed application interfaces in collaboration with UI/UX designers and integrated third-party APIs to support business workflows.",
      "Tested, debugged and improved application reliability across devices and platforms; collaborated with stakeholders on requirements and delivery.",
      "Contributed to applications for task management, team collaboration and healthcare.",
    ],
    projects: ["EMFormance", "Vision Collab", "Health Care System"],
  },
];

export const navigation: NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
];

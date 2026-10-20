export type LinkStatus = "live" | "private" | "unavailable";

export interface ProjectLink {
  status: LinkStatus;
  url?: string;
  label?: string;
  note?: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  source: string;
  frame?: "none" | "browser" | "phone";
}

export interface ProjectVideo {
  src: string;
  poster: string;
  title: string;
  caption: string;
  source: string;
}

export interface CaseStudySection {
  title: string;
  body?: string[];
  points?: string[];
}

export interface CaseStudy {
  intro: string;
  problemSpace: CaseStudySection;
  domainChallenges: CaseStudySection;
  contributions: CaseStudySection;
  technicalApproach?: CaseStudySection;
  outcome?: CaseStudySection;
  gallery: ProjectImage[];
  video?: ProjectVideo;
  pendingConfirmation: string[];
}

export type ProjectCategory =
  | "Trucking & Logistics"
  | "HR & Operations"
  | "Corporate"
  | "Productivity"
  | "Healthcare";

export interface Project {
  slug: string;
  name: string;
  aliases?: string[];
  period: { start: string; end: string | null };
  periodLabel: string;
  category: ProjectCategory;
  employer?: string;
  tagline: string;
  summary: string;
  link: ProjectLink;
  tags: string[];
  cover?: ProjectImage;
  featured?: boolean;
  caseStudy?: CaseStudy;
}

export interface Experience {
  company: string;
  role: string;
  periodLabel: string;
  start: string;
  end: string | null;
  location: string;
  highlights: string[];
  projects: string[];
}

export interface SkillGroup {
  title: string;
  description: string;
  items: string[];
}

export interface Service {
  title: string;
  description: string;
  evidence: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  summary: string;
  details: string[];
  evidence: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  shortName: string;
  headline: string;
  role: string;
  location: string;
  email: string;
  linkedin: string;
  github: string | null;
  cvPath: string | null;
  yearsOfExperience: string;
  summary: string;
  languages: string[];
  education: { title: string; institution: string; period: string }[];
}

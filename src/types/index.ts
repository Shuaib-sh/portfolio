export interface CareerRole {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  technologies: string[];
  keyContributions: {
    title: string;
    description: string;
    technicalHighlights: string[];
  }[];
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    context?: string;
  }[];
}

export interface FormatXSpec {
  name: string;
  title: string;
  tagline: string;
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  features: {
    title: string;
    description: string;
    badge: string;
  }[];
  architectureLayers: {
    layer: string;
    tech: string;
    description: string;
    role: string;
  }[];
  authFlow: {
    step: string;
    detail: string;
  }[];
  technicalDecisions: {
    decision: string;
    rationale: string;
  }[];
}

export interface EngineeringLabItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  summary: string;
  whyItMatters: string;
  technicalMechanism: string;
  codeSnippet?: {
    language: string;
    code: string;
    title: string;
  };
  usedIn: string;
}

export interface EducationItem {
  institution: string;
  location: string;
  degree: string;
  period: string;
  highlights?: string[];
}

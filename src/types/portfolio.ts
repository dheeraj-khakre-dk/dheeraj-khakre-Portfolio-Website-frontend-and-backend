export interface ProjectSpec {
  databaseOptimization: string;
  securityStrategy: string;
  verificationTesting: string;
  keyHighlights: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  repoName: string;
  repoUrl: string;
  categoryTag: string;
  categoryClass: string;
  description: string;
  challenge: string;
  solution: string;
  techStack: string[];
  specs: ProjectSpec;
  diagramType: 'pipeline' | 'identity' | 'threat' | 'fintech';
  metrics: {
    label: string;
    value: string;
    sublabel?: string;
    subvalue?: string;
  };
}

export interface SkillCategory {
  title: string;
  badge: string;
  icon: string;
  skills: {
    name: string;
    tested: boolean; // true = Project Tested, false = Active Exploration
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  employmentType: string;
  isCurrent: boolean;
  highlights: string[];
  techBadges: string[];
}

export interface EducationItem {
  degree: string;
  specialization: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  honors: string;
  coreFoundations: string[];
}

export interface TrajectoryItem {
  id: string;
  title: string;
  status: 'BUILDING' | 'LEARNING' | 'EXPLORING' | 'PLANNED';
  statusColor: string;
  icon: string;
  description: string;
  target: string;
}

export interface ContactChannel {
  label: string;
  value: string;
  href: string;
  icon: string;
  copyable?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

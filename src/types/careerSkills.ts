export type SkillState = 'LOCKED' | 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED' | 'MASTERED';

export type SkillCategory =
  | 'Networking'
  | 'Linux'
  | 'Python'
  | 'Web Security'
  | 'Cryptography'
  | 'Authentication'
  | 'Cloud Security'
  | 'SOC'
  | 'Digital Forensics'
  | 'Incident Response'
  | 'Threat Intelligence'
  | 'Security Engineering';

export interface OfficialSource {
  id: string;
  name: string;
  url: string;
  description: string;
  category: 'OWASP' | 'NIST' | 'MITRE' | 'CISA' | 'CWE' | 'Python' | 'Linux';
}

export interface CareerModule {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  topics: string[];
  officialSourceIds: string[];
}

export interface CareerCourse {
  id: string;
  title: string;
  duration: string;
  description: string;
  officialSourceId?: string;
}

export interface CareerLab {
  id: string;
  title: string;
  type: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface CareerQuiz {
  id: string;
  title: string;
  questionCount: number;
}

export interface CareerProject {
  id: string;
  title: string;
  summary: string;
}

export interface CareerCTF {
  id: string;
  title: string;
  category: string;
  points: number;
}

export interface FinalAssessment {
  title: string;
  description: string;
  passingScore: number;
}

export interface CareerPath {
  id: string;
  title: string;
  role: string;
  overview: string;
  beginnerRequirements: string[];
  skillsRequired: string[];
  beginnerModules: CareerModule[];
  intermediateModules: CareerModule[];
  advancedModules: CareerModule[];
  courses: CareerCourse[];
  labs: CareerLab[];
  quizzes: CareerQuiz[];
  projects: CareerProject[];
  ctfChallenges: CareerCTF[];
  finalAssessment: FinalAssessment;
  estimatedHours: string;
  difficulty: string;
  officialSourceIds: string[];
}

export interface SkillNode {
  id: string;
  title: string;
  category: SkillCategory;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites: string[]; // Skill IDs that must be completed/mastered
  relatedCourses: string[];
  relatedLabs: string[];
  relatedProjects: string[];
  relatedCtfs: string[];
  completionPercentage: number;
  officialSourceIds: string[];
}

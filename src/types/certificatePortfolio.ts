export interface VerifiedCertificate {
  certificateId: string;
  studentName: string;
  issueDate: string;
  title: 'Certificate of Completion';
  issuer: 'CyberShield Security Awareness Platform';
  readinessScore: number;
  totalXp: number;
  completedModules: string[];
  verifiedHash: string;
  status: 'VERIFIED & AUTHENTIC' | 'REVOKED' | 'INVALID';
}

export interface CyberBadge {
  id: string;
  title: string;
  category: string;
  description: string;
  earnedAt: string;
}

export interface CyberPortfolioProfile {
  username: string;
  studentName: string;
  avatarUrl: string;
  college: string;
  state: string;
  targetCareerPath: string;
  memberSince: string;
  readinessScore: number;
  readinessTier: 'Enterprise Ready' | 'Advanced Specialist' | 'Developing Practitioner';
  totalXp: number;
  ctfPoints: number;
  socScore: number;
  masteredSkillsCount: number;
  completedCoursesCount: number;
  completedLabsCount: number;
  solvedCtfsCount: number;
  completedIncidentsCount: number;
  completedProjectsCount: number;
  badges: CyberBadge[];
  certificateId: string;
}

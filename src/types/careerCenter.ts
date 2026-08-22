export type CareerRole =
  | 'SOC Analyst'
  | 'Pentester (Red Team)'
  | 'Web Application Security'
  | 'Cloud Security Engineer'
  | 'Blue Team / Incident Responder'
  | 'Digital Forensics Analyst';

export interface CareerRoadmapStep {
  stepNumber: number;
  title: string;
  duration: string;
  topics: string[];
  recommendedLabs: string[];
  recommendedProjects: string[];
  certsToTarget: string[];
}

export interface CareerRoadmap {
  role: CareerRole;
  description: string;
  demandRating: 'High' | 'Very High' | 'Critical';
  steps: CareerRoadmapStep[];
  coreSkills: string[];
}

export interface InterviewQuestionItem {
  id: string;
  role: CareerRole;
  category: string;
  difficulty: 'Junior' | 'Mid' | 'Senior';
  question: string;
  modelAnswer: string;
  technicalReference: string;
}

export interface JobReadinessPillar {
  pillarName: string;
  score: number;
  maxScore: number;
  status: 'Mastered' | 'Developing' | 'Needs Work';
}

export interface JobReadinessResult {
  overallScore: number;
  readinessTier: 'Enterprise Ready' | 'Junior Role Ready' | 'Internship Ready' | 'Developing Candidate' | 'Not Ready';
  pillarMetrics: JobReadinessPillar[];
  recommendedNextSteps: string[];
}

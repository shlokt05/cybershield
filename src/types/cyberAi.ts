export type ProgressiveHintTier = 1 | 2 | 3 | 4;

export interface AdaptiveRecommendation {
  id: string;
  title: string;
  type: 'Course' | 'Lab' | 'CTF' | 'Project' | 'SOC';
  category: string;
  difficulty: string;
  reason: string;
  linkTab: string;
  linkId?: string;
}

export interface StudyPlanDay {
  day: number;
  topic: string;
  objective: string;
  activity: string;
  activityType: 'Module' | 'Lab' | 'CTF' | 'SOC' | 'Project';
  officialRef: string;
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'cyberai';
  text: string;
  timestamp: string;
  hints?: {
    tier1: string; // Concept
    tier2: string; // Methodology
    tier3: string; // Payload / Command Syntax
    explanation: string; // Full Explanation
  };
  officialSourceIds?: string[];
  recommendations?: AdaptiveRecommendation[];
  studyPlan?: StudyPlanDay[];
}

export interface WeakTopicAnalysis {
  domain: string;
  scorePercent: number;
  status: 'Needs Practice' | 'Developing' | 'Proficient' | 'Mastered';
  recommendedAction: string;
}

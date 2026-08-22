export type LabCategory =
  | 'Networking'
  | 'Linux'
  | 'Web Security'
  | 'Authentication'
  | 'Cryptography'
  | 'SOC'
  | 'Digital Forensics'
  | 'OSINT'
  | 'Python Security'
  | 'Cloud Security';

export type LabDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert';

export interface LabHint {
  id: string;
  hintText: string;
}

export interface LabTask {
  id: string;
  instructions: string;
  type: 'flag' | 'text' | 'choice' | 'command';
  expectedAnswer: string;
  acceptedAnswers?: string[];
  options?: string[];
  syntheticData?: string;
}

export interface InteractiveLab {
  id: string;
  title: string;
  category: LabCategory;
  difficulty: LabDifficulty;
  estimatedMinutes: number;
  xpReward: number;
  learningObjectives: string[];
  scenario: string;
  theory: string;
  tasks: LabTask[];
  hints: LabHint[];
  explanation: string;
  defense: string;
  officialSourceIds: string[];
}

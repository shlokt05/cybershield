export type CtfCategory =
  | 'Web'
  | 'Crypto'
  | 'Forensics'
  | 'OSINT'
  | 'Linux'
  | 'Networking'
  | 'Python'
  | 'Blue Team';

export type CtfDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Insane';

export interface CtfHint {
  id: string;
  hintText: string;
}

export interface CtfChallenge {
  id: string;
  title: string;
  category: CtfCategory;
  difficulty: CtfDifficulty;
  points: number;
  xpReward: number;
  description: string;
  objectives: string[];
  syntheticTarget: string;
  expectedFlag: string;
  acceptedFlags?: string[];
  hints: CtfHint[];
  explanation: string;
  officialSourceIds: string[];
}

export interface CtfLeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  solvedCount: number;
  totalPoints: number;
  xp: number;
  badge: string;
  isCurrentUser?: boolean;
}

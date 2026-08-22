export interface ChallengeItem {
  id: string;
  title: string;
  xpReward: number;
  category: 'Module' | 'Lab' | 'CTF' | 'SOC' | 'Streak';
  isCompleted: boolean;
  requirementCount: number;
  currentCount: number;
}

export interface LeaderboardEntry {
  rank: number;
  studentName: string;
  college: string;
  totalXp: number;
  level: number;
  levelTitle: string;
  avatarUrl: string;
  streakDays: number;
}

export interface ForumComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  upvotes: number;
  isReported: boolean;
}

export interface ForumPost {
  id: string;
  title: string;
  category: 'Web Security' | 'Linux' | 'CTF Help' | 'SOC Incident' | 'General';
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  upvotes: number;
  comments: ForumComment[];
  isReported: boolean;
  reportReason?: string;
}

export interface ProjectShowcaseItem {
  id: string;
  title: string;
  authorName: string;
  authorAvatar: string;
  description: string;
  repoUrl: string;
  tags: string[];
  upvotes: number;
  isReported: boolean;
}

export interface CtfTeamItem {
  id: string;
  teamName: string;
  captainName: string;
  members: string[];
  maxMembers: number;
  totalScore: number;
  solvedFlagsCount: number;
  avatarUrl: string;
}

export interface ModerationReportItem {
  id: string;
  targetId: string;
  targetType: 'Post' | 'Comment' | 'Project' | 'User';
  reportedBy: string;
  reason: string;
  timestamp: string;
  status: 'Pending Review' | 'Approved' | 'Deleted';
}

import {
  ChallengeItem,
  LeaderboardEntry,
  ForumPost,
  ProjectShowcaseItem,
  CtfTeamItem,
  ModerationReportItem
} from '../types/gamificationCommunity';

export function calculateUserLevel(totalXp: number): { level: number; title: string; nextLevelXp: number } {
  if (totalXp >= 8000) return { level: 20, title: 'Elite Security Architect', nextLevelXp: 10000 };
  if (totalXp >= 6000) return { level: 15, title: 'Senior Threat Hunter', nextLevelXp: 8000 };
  if (totalXp >= 4000) return { level: 10, title: 'Cyber Specialist', nextLevelXp: 6000 };
  if (totalXp >= 2000) return { level: 5, title: 'SOC Tier-1 Analyst', nextLevelXp: 4000 };
  if (totalXp >= 1000) return { level: 3, title: 'Security Apprentice', nextLevelXp: 2000 };
  return { level: 1, title: 'Cyber Cadet', nextLevelXp: 1000 };
}

export const INITIAL_DAILY_CHALLENGES: ChallengeItem[] = [
  {
    id: 'dc-1',
    title: 'Complete 1 Interactive Lab',
    xpReward: 150,
    category: 'Lab',
    isCompleted: true,
    requirementCount: 1,
    currentCount: 1
  },
  {
    id: 'dc-2',
    title: 'Triage 1 Incident in SOC Simulator',
    xpReward: 200,
    category: 'SOC',
    isCompleted: false,
    requirementCount: 1,
    currentCount: 0
  },
  {
    id: 'dc-3',
    title: 'Solve 1 CTF Flag Challenge',
    xpReward: 100,
    category: 'CTF',
    isCompleted: false,
    requirementCount: 1,
    currentCount: 0
  }
];

export const INITIAL_WEEKLY_CHALLENGES: ChallengeItem[] = [
  {
    id: 'wc-1',
    title: 'Maintain a 5-Day Active Learning Streak',
    xpReward: 500,
    category: 'Streak',
    isCompleted: true,
    requirementCount: 5,
    currentCount: 5
  },
  {
    id: 'wc-2',
    title: 'Achieve >85% Accuracy on 3 SOC Incidents',
    xpReward: 600,
    category: 'SOC',
    isCompleted: false,
    requirementCount: 3,
    currentCount: 1
  }
];

export const GLOBAL_LEADERBOARD_ENTRIES: LeaderboardEntry[] = [
  {
    rank: 1,
    studentName: 'Shlok Tripathi',
    college: 'IIT BHU Varanasi',
    totalXp: 2850,
    level: 6,
    levelTitle: 'SOC Tier-1 Analyst',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    streakDays: 7
  },
  {
    rank: 2,
    studentName: 'Ananya Sharma',
    college: 'BITS Pilani',
    totalXp: 2600,
    level: 5,
    levelTitle: 'SOC Tier-1 Analyst',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    streakDays: 12
  },
  {
    rank: 3,
    studentName: 'Rohan Verma',
    college: 'NIT Trichy',
    totalXp: 2350,
    level: 5,
    levelTitle: 'SOC Tier-1 Analyst',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    streakDays: 5
  },
  {
    rank: 4,
    studentName: 'Priya Nair',
    college: 'IIIT Hyderabad',
    totalXp: 1950,
    level: 4,
    levelTitle: 'Security Apprentice',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
    streakDays: 3
  }
];

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'post-1',
    title: 'How to bypass JWT signature check when alg=none is rejected by server?',
    category: 'Web Security',
    authorName: 'Ananya Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    content: 'In the CTF challenge, if the server explicitly validates algorithm type, try switching to a key confusion attack (HS256 with server public RSA key). Has anyone tested this payload?',
    createdAt: '2 hours ago',
    upvotes: 14,
    isReported: false,
    comments: [
      {
        id: 'c-1',
        authorName: 'Shlok Tripathi',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        content: 'Yes! Convert the public key to PEM format and sign the token using HMAC-SHA256.',
        createdAt: '1 hour ago',
        upvotes: 8,
        isReported: false
      }
    ]
  },
  {
    id: 'post-2',
    title: 'Analyzing Obfuscated PowerShell Base64 Payloads in SOC Telemetry',
    category: 'SOC Incident',
    authorName: 'Rohan Verma',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    content: 'When analyzing PowerShell -EncodedCommand payloads, always look out for internal `IEX` (Invoke-Expression) calls or Gzip compression headers (`H4sIA...`).',
    createdAt: '5 hours ago',
    upvotes: 22,
    isReported: false,
    comments: []
  }
];

export const INITIAL_PROJECT_SHOWCASE: ProjectShowcaseItem[] = [
  {
    id: 'proj-1',
    title: 'PyAuditor: Automated OWASP Header Scanner',
    authorName: 'Shlok Tripathi',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    description: 'Python CLI utility that audits HTTP response headers for missing Content-Security-Policy, HSTS, and X-Frame-Options.',
    repoUrl: 'https://github.com/cybershield/pyauditor',
    tags: ['Python', 'Web Security', 'OWASP'],
    upvotes: 35,
    isReported: false
  },
  {
    id: 'proj-[#2]',
    title: 'Argon2 Vault: Local Zero-Knowledge Password Keeper',
    authorName: 'Priya Nair',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
    description: 'Offline password manager built using React and Argon2id WebAssembly hashing.',
    repoUrl: 'https://github.com/cybershield/argon2-vault',
    tags: ['Cryptography', 'React', 'Argon2'],
    upvotes: 28,
    isReported: false
  }
];

export const INITIAL_CTF_TEAMS: CtfTeamItem[] = [
  {
    id: 'team-1',
    teamName: 'ZeroDay Defenders',
    captainName: 'Shlok Tripathi',
    members: ['Shlok Tripathi', 'Ananya Sharma', 'Rohan Verma', 'Priya Nair'],
    maxMembers: 4,
    totalScore: 1850,
    solvedFlagsCount: 18,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
  },
  {
    id: 'team-2',
    teamName: 'Kernel Panic Squad',
    captainName: 'Vikram Patel',
    members: ['Vikram Patel', 'Siddharth Rao', 'Neha Gupta'],
    maxMembers: 4,
    totalScore: 1400,
    solvedFlagsCount: 14,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
  }
];

export const INITIAL_MODERATION_REPORTS: ModerationReportItem[] = [
  {
    id: 'mod-1',
    targetId: 'post-99',
    targetType: 'Post',
    reportedBy: 'Student_Guard',
    reason: 'Possible CTF flag leak attempt in post title',
    timestamp: '2026-08-22 21:00',
    status: 'Pending Review'
  }
];

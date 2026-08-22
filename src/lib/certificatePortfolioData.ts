import { VerifiedCertificate, CyberPortfolioProfile } from '../types/certificatePortfolio';

export const DEMO_VERIFIED_CERTIFICATES: Record<string, VerifiedCertificate> = {
  'CS-2026-8F9B2C-VERIFIED': {
    certificateId: 'CS-2026-8F9B2C-VERIFIED',
    studentName: 'Shlok Tripathi',
    issueDate: '2026-08-22',
    title: 'Certificate of Completion',
    issuer: 'CyberShield Security Awareness Platform',
    readinessScore: 88,
    totalXp: 1850,
    completedModules: [
      'Web Application Vulnerabilities (OWASP Top 10)',
      'Phishing Defense & Social Engineering',
      'Password Entropy & Hash Cracking Mechanics',
      'Network Security & Protocol Analysis',
      'Threat Intelligence & Incident Response'
    ],
    verifiedHash: 'sha256:7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a',
    status: 'VERIFIED & AUTHENTIC'
  }
};

export function getVerifiedCertificateById(certId: string): VerifiedCertificate {
  if (DEMO_VERIFIED_CERTIFICATES[certId]) {
    return DEMO_VERIFIED_CERTIFICATES[certId];
  }

  // Fallback dynamic generator for any valid ID format
  return {
    certificateId: certId.toUpperCase(),
    studentName: 'Student Practitioner',
    issueDate: new Date().toISOString().split('T')[0],
    title: 'Certificate of Completion',
    issuer: 'CyberShield Security Awareness Platform',
    readinessScore: 85,
    totalXp: 1500,
    completedModules: [
      'Web Application Vulnerabilities (OWASP Top 10)',
      'Phishing Defense & Social Engineering',
      'Network Security & Protocol Analysis'
    ],
    verifiedHash: `sha256:${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`,
    status: 'VERIFIED & AUTHENTIC'
  };
}

export function getPublicPortfolioByUsername(username: string): CyberPortfolioProfile {
  return {
    username: username || 'shlok-tripathi',
    studentName: 'Shlok Tripathi',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
    college: 'Indian Institute of Technology (IIT)',
    state: 'Delhi',
    targetCareerPath: 'SOC Analyst / Red Team Specialist',
    memberSince: 'August 2026',
    readinessScore: 88,
    readinessTier: 'Enterprise Ready',
    totalXp: 1850,
    ctfPoints: 450,
    socScore: 380,
    masteredSkillsCount: 12,
    completedCoursesCount: 5,
    completedLabsCount: 8,
    solvedCtfsCount: 6,
    completedIncidentsCount: 4,
    completedProjectsCount: 3,
    badges: [
      {
        id: 'b-1',
        title: 'SOC Defender Elite',
        category: 'SOC Incident Response',
        description: 'Triaged 4+ Critical SIEM Alerts with >80% accuracy.',
        earnedAt: '2026-08-22'
      },
      {
        id: 'b-2',
        title: 'CTF Flag Hunter',
        category: 'CTF Arena',
        description: 'Solved Web, Crypto, and Linux CTF challenges.',
        earnedAt: '2026-08-22'
      },
      {
        id: 'b-3',
        title: 'OWASP Top 10 Master',
        category: 'Web Security',
        description: 'Completed Web Security module & SQLi lab.',
        earnedAt: '2026-08-21'
      },
      {
        id: 'b-4',
        title: 'Linux Sysadmin Security',
        category: 'Linux',
        description: 'Audited SUID binaries and environment variables.',
        earnedAt: '2026-08-21'
      }
    ],
    certificateId: 'CS-2026-8F9B2C-VERIFIED'
  };
}

export type SocSeverity = 'Low' | 'Medium' | 'High' | 'Critical';

export type SocCategory =
  | 'Phishing'
  | 'Brute Force'
  | 'Suspicious Login'
  | 'Account Compromise'
  | 'Malware Alert'
  | 'Data Exfiltration'
  | 'Web Attack'
  | 'PowerShell Activity';

export interface SocLogEvent {
  id: string;
  timestamp: string;
  logType: 'SYSMON' | 'AUTH' | 'DNS' | 'FIREWALL' | 'WEB_ACCESS';
  sourceIp?: string;
  destinationIp?: string;
  process?: string;
  commandLine?: string;
  fileHash?: string;
  message: string;
}

export interface SocTriageAnswer {
  attackType: string;
  initialAccess: string;
  affectedAccount: string;
  affectedSystem: string;
  timeline: string;
  ioc: string;
  recommendedResponse: string;
}

export interface SocIncidentCase {
  id: string;
  title: string;
  category: SocCategory;
  severity: SocSeverity;
  mitreId: string;
  summary: string;
  detectedAt: string;
  logs: SocLogEvent[];
  options: {
    attackTypes: string[];
    initialAccessVectors: string[];
    affectedAccounts: string[];
    affectedSystems: string[];
    timelines: string[];
    iocs: string[];
    recommendedResponses: string[];
  };
  correctAnswers: SocTriageAnswer;
  nistRemediation: string;
  officialSourceIds: string[];
  points: number;
  xpReward: number;
}

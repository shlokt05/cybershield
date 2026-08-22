import {
  CareerRoadmap,
  InterviewQuestionItem,
  JobReadinessResult,
  JobReadinessPillar
} from '../types/careerCenter';

export function calculateJobReadiness(
  learningProgress: number,
  completedModuleIds: string[],
  completedLabIds: string[],
  solvedCtfIds: string[],
  completedIncidentIds: string[],
  quizScore: number
): JobReadinessResult {
  // 6 Skill Pillars Calculation
  const pillars: JobReadinessPillar[] = [
    {
      pillarName: 'SOC Telemetry & SIEM Triage',
      score: Math.min(100, (completedIncidentIds.length * 25) + (learningProgress >= 80 ? 20 : 0)),
      maxScore: 100,
      status: completedIncidentIds.length >= 3 ? 'Mastered' : completedIncidentIds.length >= 1 ? 'Developing' : 'Needs Work'
    },
    {
      pillarName: 'Web App Security (OWASP Top 10)',
      score: completedModuleIds.includes('web-security') ? 90 : 30,
      maxScore: 100,
      status: completedModuleIds.includes('web-security') ? 'Mastered' : 'Needs Work'
    },
    {
      pillarName: 'Linux & Network Analysis',
      score: Math.min(100, (completedLabIds.length * 15) + (completedModuleIds.includes('network-security') ? 40 : 0)),
      maxScore: 100,
      status: completedLabIds.length >= 4 ? 'Mastered' : 'Developing'
    },
    {
      pillarName: 'Cryptography & Hash Entropy',
      score: completedModuleIds.includes('password-entropy') ? 85 : 40,
      maxScore: 100,
      status: completedModuleIds.includes('password-entropy') ? 'Mastered' : 'Needs Work'
    },
    {
      pillarName: 'CTF Flag Hunting & Exploitation',
      score: Math.min(100, solvedCtfIds.length * 20),
      maxScore: 100,
      status: solvedCtfIds.length >= 4 ? 'Mastered' : solvedCtfIds.length >= 1 ? 'Developing' : 'Needs Work'
    },
    {
      pillarName: 'Incident Response & Assessment',
      score: Math.min(100, (quizScore * 0.5) + (completedIncidentIds.length * 15)),
      maxScore: 100,
      status: quizScore >= 80 ? 'Mastered' : 'Developing'
    }
  ];

  const overallScore = Math.round(
    pillars.reduce((acc, p) => acc + p.score, 0) / pillars.length
  );

  let readinessTier: JobReadinessResult['readinessTier'] = 'Not Ready';
  if (overallScore >= 85) readinessTier = 'Enterprise Ready';
  else if (overallScore >= 70) readinessTier = 'Junior Role Ready';
  else if (overallScore >= 50) readinessTier = 'Internship Ready';
  else if (overallScore >= 30) readinessTier = 'Developing Candidate';

  const nextSteps: string[] = [];
  if (completedIncidentIds.length < 3) nextSteps.push('Triage at least 3 SOC Simulator alerts in NIST SP 800-61 workbench.');
  if (solvedCtfIds.length < 4) nextSteps.push('Capture 4+ flags in the CTF Arena across Web, Crypto, and Linux categories.');
  if (!completedModuleIds.includes('web-security')) nextSteps.push('Complete the OWASP Web Security module & SQLi vulnerability lab.');

  return {
    overallScore,
    readinessTier,
    pillarMetrics: pillars,
    recommendedNextSteps: nextSteps.length > 0 ? nextSteps : ['Complete advanced mock technical interviews and optimize your resume!']
  };
}

export const CAREER_ROADMAPS: CareerRoadmap[] = [
  {
    role: 'SOC Analyst',
    description: 'Monitor SIEM alerts, triage security events, investigate phishing & brute force attacks, and initiate incident response playbooks.',
    demandRating: 'Critical',
    coreSkills: ['SIEM Log Triage (Splunk/Elastic)', 'NIST SP 800-61 Playbooks', 'Email Header Analysis', 'Packet Inspection (Wireshark)'],
    steps: [
      {
        stepNumber: 1,
        title: 'Networking & OS Telemetry Fundamentals',
        duration: 'Weeks 1-3',
        topics: ['TCP/IP 3-Way Handshake', 'DNS Record Analysis', 'Linux syslog & Windows Event IDs (4624, 4625)'],
        recommendedLabs: ['Linux File Permissions & SUID Audit', 'Network Packet Analysis'],
        recommendedProjects: ['Build a Syslog Alert Inspector in Python'],
        certsToTarget: ['CompTIA Security+', 'Cisco CyberOps Associate']
      },
      {
        stepNumber: 2,
        title: 'SIEM Investigation & Alert Triage',
        duration: 'Weeks 4-6',
        topics: ['Brute Force Detection', 'Suspicious PowerShell Execution (-EncodedCommand)', 'Malware Hash Lookup (VirusTotal)'],
        recommendedLabs: ['SOC Simulator - Phishing & Brute Force Scenarios'],
        recommendedProjects: ['Automated Threat Intel Enricher Script'],
        certsToTarget: ['CompTIA CySA+']
      }
    ]
  },
  {
    role: 'Pentester (Red Team)',
    description: 'Simulate real-world adversary attacks to identify security flaws in web apps, networks, and internal systems before malicious hackers do.',
    demandRating: 'High',
    coreSkills: ['Nmap Network Recon', 'Burp Suite Web Exploitation', 'Metasploit Framework', 'Privilege Escalation'],
    steps: [
      {
        stepNumber: 1,
        title: 'Reconnaissance & Vulnerability Scanning',
        duration: 'Weeks 1-4',
        topics: ['Nmap Port Scanning Switches', 'Subdomain Enumeration', 'CVE Research & Exploit DB'],
        recommendedLabs: ['CTF Arena - Linux SUID Privilege Escalation'],
        recommendedProjects: ['Custom Port & Service Banner Scanner'],
        certsToTarget: ['eJPT (eLearnSecurity Junior Penetration Tester)']
      },
      {
        stepNumber: 2,
        title: 'Web Application & Infrastructure Exploitation',
        duration: 'Weeks 5-8',
        topics: ['SQL Injection Payloads', 'Stored & Reflected XSS', 'Local File Inclusion (LFI)'],
        recommendedLabs: ['Interactive SQLi Vulnerability Fix Lab'],
        recommendedProjects: ['Burp Suite Extension for Header Audit'],
        certsToTarget: ['OSCP (Offensive Security Certified Professional)']
      }
    ]
  },
  {
    role: 'Web Application Security',
    description: 'Audit web applications for OWASP Top 10 vulnerabilities, review source code, and implement secure software development practices.',
    demandRating: 'Very High',
    coreSkills: ['OWASP Top 10 (2021)', 'Parameterized Queries & ORM', 'DOMPurify & CSP Headers', 'OAuth 2.0 / JWT Security'],
    steps: [
      {
        stepNumber: 1,
        title: 'OWASP Top 10 Vulnerability Remediation',
        duration: 'Weeks 1-3',
        topics: ['SQL Injection Prevention', 'Cross-Site Scripting (XSS) Sanitization', 'Insecure Direct Object References (IDOR)'],
        recommendedLabs: ['Web Security Module', 'DOMPurify XSS Prevention Lab'],
        recommendedProjects: ['PyAuditor HTTP Header Scanner'],
        certsToTarget: ['Certified Web App Penetration Tester (CWAPT)']
      }
    ]
  },
  {
    role: 'Cloud Security Engineer',
    description: 'Secure AWS, Azure, and Google Cloud environments, configure IAM policies, enforce zero-trust network rules, and audit cloud storage buckets.',
    demandRating: 'Critical',
    coreSkills: ['AWS IAM Policies', 'Kubernetes RBAC', 'Terraform Security Scanning', 'Zero-Trust Architecture'],
    steps: [
      {
        stepNumber: 1,
        title: 'Cloud IAM & Storage Misconfigurations',
        duration: 'Weeks 1-4',
        topics: ['Public S3 Bucket Auditing', 'Least Privilege IAM Policies', 'CloudTrail Audit Logs'],
        recommendedLabs: ['Interactive Cloud Security Module'],
        recommendedProjects: ['Terraform Misconfiguration Scanner'],
        certsToTarget: ['AWS Certified Security - Specialty']
      }
    ]
  },
  {
    role: 'Blue Team / Incident Responder',
    description: 'Detect, contain, and eradicate cyber attacks in enterprise environments while creating automated threat detection rules.',
    demandRating: 'High',
    coreSkills: ['YARA Rule Writing', 'Sigma Rule Detection', 'Memory Forensics (Volatility)', 'NIST SP 800-61'],
    steps: [
      {
        stepNumber: 1,
        title: 'Threat Detection & Rule Creation',
        duration: 'Weeks 1-4',
        topics: ['Sigma Rule Conversion to Splunk/Elastic', 'YARA Malware Signature Writing'],
        recommendedLabs: ['SOC Incident Response Simulator'],
        recommendedProjects: ['Custom YARA Signature Scanner'],
        certsToTarget: ['GIAC Certified Incident Handler (GCIH)']
      }
    ]
  },
  {
    role: 'Digital Forensics Analyst',
    description: 'Extract and analyze digital evidence from disk images, memory dumps, and network captures for criminal or corporate investigations.',
    demandRating: 'High',
    coreSkills: ['Autopsy & FTK Imager', 'Memory Dump Analysis', 'Registry Artifact Analysis', 'Chain of Custody Documentation'],
    steps: [
      {
        stepNumber: 1,
        title: 'Disk Imaging & Artifact Extraction',
        duration: 'Weeks 1-4',
        topics: ['Master Boot Record & File Systems (NTFS/ext4)', 'Windows Registry Forensics', 'Browser History & Prefetch Files'],
        recommendedLabs: ['Forensics CTF Challenge'],
        recommendedProjects: ['Python Registry Timeline Parser'],
        certsToTarget: ['GCFA (GIAC Certified Forensic Analyst)']
      }
    ]
  }
];

export const TECHNICAL_INTERVIEW_QUESTIONS: InterviewQuestionItem[] = [
  {
    id: 'iq-1',
    role: 'SOC Analyst',
    category: 'Network & Telemetry',
    difficulty: 'Junior',
    question: 'What is the difference between TCP and UDP, and how do you analyze them in Wireshark?',
    modelAnswer: 'TCP is a connection-oriented protocol requiring a 3-way handshake (SYN, SYN-ACK, ACK) guaranteeing packet delivery, whereas UDP is connectionless and stateless. In Wireshark, TCP streams can be followed right-click -> Follow -> TCP Stream to reconstruct payload sessions.',
    technicalReference: 'NIST SP 800-94 / RFC 793'
  },
  {
    id: 'iq-2',
    role: 'SOC Analyst',
    category: 'Incident Response',
    difficulty: 'Junior',
    question: 'How do you investigate Windows Event ID 4625 (Failed Logon)?',
    modelAnswer: 'Filter event logs by ID 4625. Inspect the TargetUserName, WorkstationName, IpAddress, and LogonType. Type 3 indicates network logon (possible SMB/WinRM brute force), while Type 10 indicates RDP login attempt.',
    technicalReference: 'MITRE ATT&CK T1110 (Brute Force)'
  },
  {
    id: 'iq-3',
    role: 'Web Application Security',
    category: 'OWASP Top 10',
    difficulty: 'Mid',
    question: 'Explain parameterized SQL queries and why string concatenation causes SQL Injection.',
    modelAnswer: 'String concatenation inserts user input directly into the SQL query parser, allowing attackers to inject SQL syntax commands (e.g. OR 1=1). Parameterized queries separate query logic from data by binding variables as typed parameters, preventing input from altering the query structure.',
    technicalReference: 'OWASP A03:2021 - Injection'
  },
  {
    id: 'iq-4',
    role: 'Pentester (Red Team)',
    category: 'Privilege Escalation',
    difficulty: 'Mid',
    question: 'What is a SUID binary in Linux, and how can it lead to root privilege escalation?',
    modelAnswer: 'A SUID (Set User ID) binary executes with the permissions of the file owner (e.g., root) rather than the executing user. If a binary with SUID set allows command execution or file reading (e.g. find, nmap, vim), an attacker can abuse it to execute arbitrary commands as root.',
    technicalReference: 'GTFOBins / CWE-250'
  },
  {
    id: 'iq-5',
    role: 'Cloud Security Engineer',
    category: 'IAM & Cloud Sec',
    difficulty: 'Senior',
    question: 'What is the Principle of Least Privilege in Cloud IAM, and how do you audit wildcard permissions?',
    modelAnswer: 'Least Privilege dictates granting only the minimal permissions required for a service or user to perform its function. Wildcard permissions ("Action": "*") grant unrestricted administrative capabilities. Auditing involves scanning policy JSON files for wildcard actions and enforcing granular IAM roles.',
    technicalReference: 'CIS AWS Foundations Benchmark'
  }
];

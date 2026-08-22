import { AdaptiveRecommendation, StudyPlanDay, WeakTopicAnalysis, AiChatMessage } from '../types/cyberAi';

export function analyzeWeakTopics(completedModuleCount: number, labCount: number, ctfCount: number, socCount: number): WeakTopicAnalysis[] {
  const domains: WeakTopicAnalysis[] = [
    {
      domain: 'Web Application Security',
      scorePercent: completedModuleCount >= 2 ? 85 : 40,
      status: completedModuleCount >= 2 ? 'Proficient' : 'Needs Practice',
      recommendedAction: 'Complete OWASP Top 10 Module & XSS/SQLi Interactive Labs'
    },
    {
      domain: 'Network Analysis & PCAP',
      scorePercent: labCount >= 2 ? 75 : 45,
      status: labCount >= 2 ? 'Developing' : 'Needs Practice',
      recommendedAction: 'Practice Wireshark PCAP Bearer Token Extraction CTF'
    },
    {
      domain: 'Applied Cryptography',
      scorePercent: ctfCount >= 2 ? 80 : 30,
      status: ctfCount >= 2 ? 'Proficient' : 'Needs Practice',
      recommendedAction: 'Solve Base64 XOR Cipher Decryption Challenge'
    },
    {
      domain: 'Linux PrivEsc & Environment',
      scorePercent: labCount >= 3 ? 90 : 50,
      status: labCount >= 3 ? 'Mastered' : 'Developing',
      recommendedAction: 'Execute Linux Environment Variable Privilege Escalation Lab'
    },
    {
      domain: 'SOC Incident Response',
      scorePercent: socCount >= 2 ? 88 : 35,
      status: socCount >= 2 ? 'Proficient' : 'Needs Practice',
      recommendedAction: 'Triage Ransomware Execution & Encoded PowerShell Alerts'
    }
  ];

  return domains;
}

export function generateAdaptiveRecommendations(weakTopics: WeakTopicAnalysis[]): AdaptiveRecommendation[] {
  const needsPractice = weakTopics.filter(w => w.status === 'Needs Practice' || w.status === 'Developing');

  const allRecs: AdaptiveRecommendation[] = [
    {
      id: 'rec-web-1',
      title: 'OWASP Web Vulnerabilities Module',
      type: 'Course',
      category: 'Web Security',
      difficulty: 'Beginner',
      reason: 'Strengthen core web security fundamentals against SQLi and XSS vulnerabilities.',
      linkTab: 'modules',
      linkId: 'web-security'
    },
    {
      id: 'rec-lab-1',
      title: 'Linux PrivEsc Interactive Lab',
      type: 'Lab',
      category: 'Linux',
      difficulty: 'Intermediate',
      reason: 'Practice SUID binary exploitation and environment variable manipulation.',
      linkTab: 'interactive-labs',
      linkId: 'lab-lin-1'
    },
    {
      id: 'rec-ctf-1',
      title: 'JWT Alg None Signature Attack',
      type: 'CTF',
      category: 'Web',
      difficulty: 'Hard',
      reason: 'Hands-on practice forging unverified JSON Web Tokens.',
      linkTab: 'ctf-arena',
      linkId: 'ctf-web-2'
    },
    {
      id: 'rec-soc-1',
      title: 'Encoded PowerShell Incident Triage',
      type: 'SOC',
      category: 'PowerShell Activity',
      difficulty: 'Critical',
      reason: 'Analyze obfuscated command lines and AMSI memory injection telemetry.',
      linkTab: 'soc-simulator',
      linkId: 'inc-powershell-1'
    }
  ];

  if (needsPractice.length === 0) return allRecs.slice(0, 2);
  return allRecs;
}

export function generate7DayStudyPlan(): StudyPlanDay[] {
  return [
    {
      day: 1,
      topic: 'Web Security & OWASP Top 10',
      objective: 'Master SQL Injection and Reflected XSS vulnerability mechanics.',
      activity: 'Complete Web Vulnerability Module & SQL Injection Interactive Lab',
      activityType: 'Lab',
      officialRef: 'OWASP Top 10:2021 A03 Injection'
    },
    {
      day: 2,
      topic: 'Linux Security & Sysadmin Baseline',
      objective: 'Audit SUID permissions and inspect system auth logs (/var/log/auth.log).',
      activity: 'Execute Linux Environment Variable PrivEsc Lab',
      activityType: 'Lab',
      officialRef: 'Linux Kernel Documentation / Sysadmin Guide'
    },
    {
      day: 3,
      topic: 'Applied Cryptography & Hashing',
      objective: 'Understand symmetric ciphers, SHA-256 collision resistance, and XOR payloads.',
      activity: 'Solve Base64 XOR Cipher CTF Challenge',
      activityType: 'CTF',
      officialRef: 'NIST SP 800-175B Cryptographic Recommendations'
    },
    {
      day: 4,
      topic: 'Network Packet Analysis & Protocols',
      objective: 'Inspect TCP handshakes, HTTP Bearer headers, and ARP spoofing telemetry.',
      activity: 'Run PCAP Bearer Authorization Extraction CTF',
      activityType: 'CTF',
      officialRef: 'CISA Security Tip ST04-015 Understanding Firewalls & PCAP'
    },
    {
      day: 5,
      topic: 'SOC Incident Response & SIEM Triage',
      objective: 'Triage brute force SSH attacks and Ransomware binary execution alerts.',
      activity: 'Triage 3 Incidents in SOC & Incident Response Simulator',
      activityType: 'SOC',
      officialRef: 'NIST SP 800-61 Rev 2 Computer Security Incident Handling'
    },
    {
      day: 6,
      topic: 'OSINT & Digital Reconnaissance',
      objective: 'Recover exposed API keys in git commit history and public web assets.',
      activity: 'Solve Exposed Git Repository CTF Challenge',
      activityType: 'CTF',
      officialRef: 'MITRE ATT&CK T1593 Search Open Technical Databases'
    },
    {
      day: 7,
      topic: 'Capstone Assessment & Certification',
      objective: 'Validate cybersecurity hygiene score and generate verified PDF certificate.',
      activity: 'Complete CyberShield Final Quiz & Generate Certificate',
      activityType: 'Module',
      officialRef: 'NIST Cybersecurity Framework (CSF 2.0)'
    }
  ];
}

export function queryCyberAiEngine(prompt: string): AiChatMessage {
  const lower = prompt.toLowerCase();
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // 1. Progressive Hint Intent
  if (lower.includes('hint') || lower.includes('stuck') || lower.includes('ctf') || lower.includes('flag')) {
    return {
      id: `ai-msg-${Date.now()}`,
      sender: 'cyberai',
      text: 'Here is your progressive 3-tier hint breakdown. I will never reveal direct flags immediately, so you can learn the underlying security mechanics!',
      timestamp,
      hints: {
        tier1: '💡 Tier 1 (Core Concept): Inspect the HTTP authorization header or binary metadata for encoding patterns like Base64 (starts with `ey...` or ends with `=`).',
        tier2: '🔍 Tier 2 (Methodology): Use `jwt.io` or `base64 -d` in terminal to decode the header payload and check the `alg` parameter.',
        tier3: '⚡ Tier 3 (Payload/Syntax): Change `"alg": "HS256"` to `"alg": "none"`, remove the signature portion after the second period, and submit the modified token.',
        explanation: '📖 Full Official Solution: This vulnerability exploits unverified JWT token parsing where server logic accepts the unsigned "none" algorithm (CWE-347 / OWASP A02:2021).'
      },
      officialSourceIds: ['owasp_top10', 'cwe', 'nist_csf']
    };
  }

  // 2. Study Plan Intent
  if (lower.includes('plan') || lower.includes('schedule') || lower.includes('roadmap') || lower.includes('7 day')) {
    return {
      id: `ai-msg-${Date.now()}`,
      sender: 'cyberai',
      text: 'I have generated a customized 7-Day Cybersecurity Study Plan tailored to your progress across CyberShield Courses, Labs, CTFs, and SOC Incidents!',
      timestamp,
      studyPlan: generate7DayStudyPlan(),
      officialSourceIds: ['nist_csf', 'mitre_attack', 'cisa']
    };
  }

  // 3. Mistake / Question Intent
  if (lower.includes('mistake') || lower.includes('wrong') || lower.includes('why')) {
    return {
      id: `ai-msg-${Date.now()}`,
      sender: 'cyberai',
      text: 'Common mistake analysis: In web vulnerability triage, mixing up Reflected XSS with Stored XSS occurs frequently. Reflected XSS requires the victim to click a crafted link containing the script in URL parameters, whereas Stored XSS persists in database records and executes for all visitors automatically.',
      timestamp,
      officialSourceIds: ['owasp_top10', 'cwe']
    };
  }

  // General Educational Explanation
  return {
    id: `ai-msg-${Date.now()}`,
    sender: 'cyberai',
    text: `Great question! In cybersecurity, defense-in-depth requires combining preventative controls (firewalls, MFA) with active detection controls (SIEM, EDR). According to NIST CSF 2.0, effective security posture covers Identify, Protect, Detect, Respond, and Recover.

How would you like to proceed?
- Ask for a **3-Tier Progressive Hint** on your current CTF/Lab
- Generate a customized **7-Day Study Plan**
- Analyze your **Weak Topics & Adaptive Recommendations**`,
    timestamp,
    officialSourceIds: ['nist_csf', 'mitre_attack', 'cisa']
  };
}

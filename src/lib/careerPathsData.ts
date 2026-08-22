import { CareerPath } from '../types/careerSkills';

export const CAREER_PATHS_FULL: CareerPath[] = [
  {
    id: 'cybersecurity-fundamentals',
    title: 'Cybersecurity Fundamentals',
    role: 'Cybersecurity Analyst (Entry-Level)',
    overview: 'Build an essential foundation in computer networks, operating system architecture, security principles, CIA Triad, risk management, and digital hygiene based on NIST and CISA standards.',
    beginnerRequirements: [
      'Basic understanding of operating system navigation (Windows / Linux)',
      'Familiarity with standard web browsing and internet protocols',
      'No prior security experience required'
    ],
    skillsRequired: ['CIA Triad', 'Network Basics', 'Linux Shell', 'Access Control', 'Basic Cryptography'],
    beginnerModules: [
      {
        id: 'fund-b1',
        title: 'Introduction to Security Concepts & CIA Triad',
        description: 'Explore Confidentiality, Integrity, Availability, and Risk Management frameworks based on NIST CSF.',
        level: 'Beginner',
        estimatedMinutes: 45,
        topics: ['CIA Triad', 'Threat vs Risk', 'Least Privilege', 'Defense in Depth'],
        officialSourceIds: ['nist_csf', 'cisa']
      },
      {
        id: 'fund-b2',
        title: 'OS Essentials & Command Line Foundations',
        description: 'Master core Linux and Windows CLI navigation, user permissions, and basic scripting.',
        level: 'Beginner',
        estimatedMinutes: 60,
        topics: ['Linux Filesystem', 'User Rights', 'File Permissions', 'Process Management'],
        officialSourceIds: ['linux_docs']
      }
    ],
    intermediateModules: [
      {
        id: 'fund-i1',
        title: 'Network Communication & Protocol Security',
        description: 'Deep dive into OSI Model, TCP/IP, DNS, HTTP/HTTPS, and Wireshark traffic inspection.',
        level: 'Intermediate',
        estimatedMinutes: 75,
        topics: ['TCP/IP Stack', 'DNS Resolution', 'TLS Encryption', 'Packet Analysis'],
        officialSourceIds: ['nist_csf']
      }
    ],
    advancedModules: [
      {
        id: 'fund-a1',
        title: 'Security Compliance, Frameworks & Governance',
        description: 'Understand CISA directives, ISO 27001 control domains, and incident handling procedures.',
        level: 'Advanced',
        estimatedMinutes: 90,
        topics: ['NIST CSF 2.0', 'CISA Directives', 'Security Auditing', 'Governance'],
        officialSourceIds: ['nist_csf', 'cisa']
      }
    ],
    courses: [
      { id: 'c-fund-1', title: 'Cybersecurity Foundations & Governance', duration: '4 Hours', description: 'Comprehensive introduction to enterprise security policies, governance, and threat landscapes.', officialSourceId: 'nist_csf' },
      { id: 'c-fund-2', title: 'Linux & Command Line Fundamentals', duration: '3 Hours', description: 'Practical command-line skills for security operations and automation.', officialSourceId: 'linux_docs' }
    ],
    labs: [
      { id: 'l-fund-1', title: 'Linux Permission Auditing Lab', type: 'Hands-on CLI', difficulty: 'Beginner' },
      { id: 'l-fund-2', title: 'Wireshark Network Traffic Inspection', type: 'Packet Analysis', difficulty: 'Intermediate' }
    ],
    quizzes: [
      { id: 'q-fund-1', title: 'Security Principles & CIA Triad Assessment', questionCount: 10 },
      { id: 'q-fund-2', title: 'Networking & OS Basics Quiz', questionCount: 10 }
    ],
    projects: [
      { id: 'p-fund-1', title: 'Hardened Linux Workstation Configuration', summary: 'Apply baseline security configurations, disable unused services, and enforce UFW firewall rules.' }
    ],
    ctfChallenges: [
      { id: 'ctf-fund-1', title: 'Basic Linux Recon Flag', category: 'Linux Forensics', points: 100 },
      { id: 'ctf-fund-2', title: 'Packet PCAP Inspection', category: 'Network Analysis', points: 150 }
    ],
    finalAssessment: {
      title: 'Cybersecurity Fundamentals Comprehensive Exam',
      description: 'Validate your understanding of CIA triad, basic networking, CLI commands, and security frameworks.',
      passingScore: 80
    },
    estimatedHours: '14 Hours',
    difficulty: 'Beginner',
    officialSourceIds: ['nist_csf', 'cisa', 'linux_docs']
  },
  {
    id: 'soc-analyst',
    title: 'SOC Analyst',
    role: 'Tier 1 / Tier 2 Security Operations Analyst',
    overview: 'Master real-world Threat Detection, SIEM Log Analysis, Phishing Triage, Malware Sandbox Inspection, and Incident Response according to NIST SP 800-61 guidelines.',
    beginnerRequirements: [
      'Completion of Cybersecurity Fundamentals or equivalent networking knowledge',
      'Basic understanding of HTTP headers and email protocols (SMTP/IMAP)'
    ],
    skillsRequired: ['SIEM Log Analysis', 'Phishing Triage', 'Splunk / ELK Querying', 'EDR Alerts', 'Incident Response'],
    beginnerModules: [
      {
        id: 'soc-b1',
        title: 'Security Operations & Phishing Analysis',
        description: 'Analyze malicious email headers, SPF/DKIM/DMARC records, and smishing payloads.',
        level: 'Beginner',
        estimatedMinutes: 50,
        topics: ['Email Headers', 'SPF/DKIM/DMARC', 'Suspicious URLs', 'Phishing Triage'],
        officialSourceIds: ['cisa', 'mitre_attack']
      }
    ],
    intermediateModules: [
      {
        id: 'soc-i1',
        title: 'SIEM Architecture & Log Aggregation',
        description: 'Learn to query Windows Event Logs, Syslog, and web server access logs in SIEM platforms.',
        level: 'Intermediate',
        estimatedMinutes: 80,
        topics: ['Event Code 4624/4625', 'KQL / SPL Search', 'Log Parsing', 'Correlations'],
        officialSourceIds: ['mitre_attack', 'cisa']
      }
    ],
    advancedModules: [
      {
        id: 'soc-a1',
        title: 'Incident Containment & MITRE ATT&CK Mapping',
        description: 'Map observed alert signatures to MITRE ATT&CK techniques and execute host containment procedures.',
        level: 'Advanced',
        estimatedMinutes: 100,
        topics: ['TTP Mapping', 'Host Isolation', 'Ransomware Containment', 'Post-Mortem Reports'],
        officialSourceIds: ['mitre_attack', 'nist_csf']
      }
    ],
    courses: [
      { id: 'c-soc-1', title: 'SOC Operations & Incident Handling', duration: '5 Hours', description: 'Learn how modern Security Operations Centers triage alerts, manage tickets, and isolate threats.', officialSourceId: 'mitre_attack' }
    ],
    labs: [
      { id: 'l-soc-1', title: 'Phishing Email Header Triage Lab', type: 'Email Forensics', difficulty: 'Beginner' },
      { id: 'l-soc-2', title: 'SIEM Brute Force Detection Challenge', type: 'Log Analysis', difficulty: 'Intermediate' }
    ],
    quizzes: [
      { id: 'q-soc-1', title: 'Phishing & Email Security Quiz', questionCount: 10 },
      { id: 'q-soc-2', title: 'SIEM & Event Log Analysis Quiz', questionCount: 12 }
    ],
    projects: [
      { id: 'p-soc-1', title: 'WAF & SIEM Alert Rule Blueprint', summary: 'Construct custom detection rules for SQL injection attempts and anomalous login activity.' }
    ],
    ctfChallenges: [
      { id: 'ctf-soc-1', title: 'Suspicious PowerShell Execution Log', category: 'Log Analysis', points: 200 }
    ],
    finalAssessment: {
      title: 'SOC Analyst Incident Handling Certification Exam',
      description: 'Simulate a live SOC alert queue, investigate compromise indicators, and issue containment recommendations.',
      passingScore: 85
    },
    estimatedHours: '18 Hours',
    difficulty: 'Beginner → Intermediate',
    officialSourceIds: ['mitre_attack', 'cisa', 'nist_csf']
  },
  {
    id: 'penetration-testing',
    title: 'Penetration Testing',
    role: 'Offensive Security Practitioner / Ethical Hacker',
    overview: 'Learn ethical hacking methodology, network reconnaissance, service exploitation, privilege escalation, and vulnerability reporting adhering to PTES and OWASP testing standards.',
    beginnerRequirements: [
      'Strong command line proficiency (Linux & Bash)',
      'Understanding of TCP/IP networking, port scanning, and routing'
    ],
    skillsRequired: ['Nmap Recon', 'Metasploit', 'Privilege Escalation', 'Exploit Payload Delivery', 'Report Writing'],
    beginnerModules: [
      {
        id: 'pen-b1',
        title: 'Reconnaissance & Passive Intelligence Gathering',
        description: 'Perform active network scanning with Nmap and passive OSINT collection.',
        level: 'Beginner',
        estimatedMinutes: 60,
        topics: ['Nmap Scanning', 'Port Identification', 'OSINT', 'DNS Enumeration'],
        officialSourceIds: ['mitre_attack']
      }
    ],
    intermediateModules: [
      {
        id: 'pen-i1',
        title: 'Vulnerability Exploitation & Service Misconfigurations',
        description: 'Exploit known CVE vulnerabilities in HTTP, SSH, FTP, and SMB services safely.',
        level: 'Intermediate',
        estimatedMinutes: 90,
        topics: ['CVE Analysis', 'Metasploit Basics', 'Buffer Overflow Concepts', 'SMB Exploits'],
        officialSourceIds: ['cwe', 'mitre_attack']
      }
    ],
    advancedModules: [
      {
        id: 'pen-a1',
        title: 'Linux & Windows Privilege Escalation',
        description: 'Elevate privileges from limited user to Root/SYSTEM using SUID binaries, misconfigured services, and kernel exploits.',
        level: 'Advanced',
        estimatedMinutes: 110,
        topics: ['SUID Exploitation', 'Cron Job Vulnerabilities', 'Token Impersonation', 'Path Hijacking'],
        officialSourceIds: ['mitre_attack', 'cwe']
      }
    ],
    courses: [
      { id: 'c-pen-1', title: 'Ethical Hacking & Network Reconnaissance', duration: '6 Hours', description: 'Comprehensive guide to ethical hacking methodologies and scanning tools.', officialSourceId: 'mitre_attack' }
    ],
    labs: [
      { id: 'l-pen-1', title: 'Nmap Port & Service Scanning Lab', type: 'Network Lab', difficulty: 'Beginner' },
      { id: 'l-pen-2', title: 'Linux SUID Privilege Escalation Lab', type: 'PrivEsc Lab', difficulty: 'Advanced' }
    ],
    quizzes: [
      { id: 'q-pen-1', title: 'Network Recon & Port Scanning Quiz', questionCount: 10 },
      { id: 'q-pen-2', title: 'Privilege Escalation Concepts Quiz', questionCount: 10 }
    ],
    projects: [
      { id: 'p-pen-1', title: 'Comprehensive Vulnerability Assessment Report', summary: 'Write a professional penetration testing report detailing findings, risk severity ratings, and remediation steps.' }
    ],
    ctfChallenges: [
      { id: 'ctf-pen-1', title: 'Root Flag: Vulnerable Service Hijack', category: 'Exploitation', points: 300 }
    ],
    finalAssessment: {
      title: 'Practical Penetration Tester Assessment',
      description: 'Perform end-to-end vulnerability scanning and exploitation on a target subnet and produce a final report.',
      passingScore: 80
    },
    estimatedHours: '22 Hours',
    difficulty: 'Intermediate → Advanced',
    officialSourceIds: ['mitre_attack', 'cwe', 'owasp']
  },
  {
    id: 'web-application-security',
    title: 'Web Application Security',
    role: 'AppSec Engineer / Web Security Auditor',
    overview: 'Master the OWASP Top 10 vulnerabilities, secure coding practices, HTTP header security, parameter binding, XSS prevention, and CSRF mitigation.',
    beginnerRequirements: [
      'Basic knowledge of HTML, CSS, JavaScript, and HTTP requests',
      'Understanding of client-server architecture'
    ],
    skillsRequired: ['OWASP Top 10', 'SQLi Prevention', 'XSS Mitigation', 'CSP Headers', 'JWT Security', 'Burp Suite'],
    beginnerModules: [
      {
        id: 'web-b1',
        title: 'OWASP Top 10 Fundamentals & Injection Flaws',
        description: 'Understand SQLi, Command Injection, and how prepared statements eliminate injection vectors.',
        level: 'Beginner',
        estimatedMinutes: 60,
        topics: ['SQL Injection', 'Parameterized Queries', 'Command Injection', 'ORMs'],
        officialSourceIds: ['owasp_top10', 'cwe']
      }
    ],
    intermediateModules: [
      {
        id: 'web-i1',
        title: 'Cross-Site Scripting (XSS) & Broken Access Control',
        description: 'Learn Stored, Reflected, DOM XSS, DOMPurify, and IDOR access control checks.',
        level: 'Intermediate',
        estimatedMinutes: 85,
        topics: ['Stored XSS', 'DOM Purify', 'IDOR', 'Role-Based Access Control'],
        officialSourceIds: ['owasp_top10', 'owasp']
      }
    ],
    advancedModules: [
      {
        id: 'web-a1',
        title: 'Modern Web Security Headers & API Token Security',
        description: 'Implement Content Security Policy (CSP), HSTS, CORS rules, and secure JWT verification.',
        level: 'Advanced',
        estimatedMinutes: 100,
        topics: ['Content Security Policy', 'CORS Misconfig', 'JWT Signing Flaws', 'CSRF Tokens'],
        officialSourceIds: ['owasp_top10', 'owasp']
      }
    ],
    courses: [
      { id: 'c-web-1', title: 'OWASP Top 10 Vulnerabilities & Secure Development', duration: '6 Hours', description: 'Deep dive into web application security flaws and code-level remediations.', officialSourceId: 'owasp_top10' }
    ],
    labs: [
      { id: 'l-web-1', title: 'SQL Injection Defense & Parameter Binding', type: 'Code Review', difficulty: 'Beginner' },
      { id: 'l-web-2', title: 'XSS Sanitization & CSP Configuration', type: 'Frontend Security', difficulty: 'Intermediate' }
    ],
    quizzes: [
      { id: 'q-web-1', title: 'OWASP Top 10 Vulnerability Quiz', questionCount: 12 },
      { id: 'q-web-2', title: 'Web Security Headers & Tokens Quiz', questionCount: 10 }
    ],
    projects: [
      { id: 'p-web-1', title: 'Full-Stack Secure Authentication Module', summary: 'Build a Node/Express/Python authentication service using Bcrypt, JWTs, rate-limiting, and CSP headers.' }
    ],
    ctfChallenges: [
      { id: 'ctf-web-1', title: 'Bypass Weak Access Control Flag', category: 'Web AppSec', points: 250 }
    ],
    finalAssessment: {
      title: 'Web Application Security Auditor Assessment',
      description: 'Audit vulnerable source code snippets, identify OWASP flaws, and write secure code replacements.',
      passingScore: 85
    },
    estimatedHours: '20 Hours',
    difficulty: 'Intermediate → Advanced',
    officialSourceIds: ['owasp_top10', 'owasp', 'cwe']
  },
  {
    id: 'network-security',
    title: 'Network Security',
    role: 'Network Security Engineer / Firewall Administrator',
    overview: 'Master network architecture design, stateful firewall rules, VPN Tunnels (IPsec/WireGuard), Intrusion Prevention Systems (IPS), and TLS/SSL protocol inspection.',
    beginnerRequirements: [
      'Understanding of basic computer networking (IP addresses, subnets, MAC addresses)',
      'Familiarity with standard ports (80, 443, 22, 53)'
    ],
    skillsRequired: ['Subnetting', 'Firewall Rules', 'Wireshark Packet Analysis', 'VPN Protocols', 'IDS/IPS (Snort/Suricata)'],
    beginnerModules: [
      {
        id: 'net-b1',
        title: 'TCP/IP Architecture & Network Segmentation',
        description: 'Understand VLANs, subnets, NAT, and network perimeter boundaries.',
        level: 'Beginner',
        estimatedMinutes: 55,
        topics: ['Subnetting CIDR', 'VLAN Segmentation', 'NAT/PAT', 'DMZ Architecture'],
        officialSourceIds: ['nist_csf']
      }
    ],
    intermediateModules: [
      {
        id: 'net-i1',
        title: 'Firewall Policy Design & Deep Packet Inspection',
        description: 'Configure iptables/ufw, stateful inspection, and Snort IDS signatures.',
        level: 'Intermediate',
        estimatedMinutes: 80,
        topics: ['iptables Rules', 'Snort Rules', 'Deep Packet Inspection', 'MitM Detection'],
        officialSourceIds: ['nist_csf', 'cisa']
      }
    ],
    advancedModules: [
      {
        id: 'net-a1',
        title: 'Zero Trust Network Architecture & Site-to-Site VPNs',
        description: 'Design Zero Trust Network Access (ZTNA) policies, IPsec IKEv2 tunnels, and TLS 1.3 inspection.',
        level: 'Advanced',
        estimatedMinutes: 95,
        topics: ['Zero Trust Architecture', 'IPsec Tunnels', 'TLS 1.3 Handshake', 'BGP Security'],
        officialSourceIds: ['nist_csf', 'cisa']
      }
    ],
    courses: [
      { id: 'c-net-1', title: 'Network Defense & Infrastructure Hardening', duration: '5 Hours', description: 'Learn perimeter defense, VLAN isolation, and firewall management.', officialSourceId: 'nist_csf' }
    ],
    labs: [
      { id: 'l-net-1', title: 'Linux UFW & iptables Firewall Lab', type: 'CLI Network Lab', difficulty: 'Beginner' },
      { id: 'l-net-2', title: 'Snort Rule Writing & Intrusion Detection', type: 'IDS Lab', difficulty: 'Intermediate' }
    ],
    quizzes: [
      { id: 'q-net-1', title: 'Networking Fundamentals & Subnetting Quiz', questionCount: 10 },
      { id: 'q-net-2', title: 'Firewall Rules & IDS Signatures Quiz', questionCount: 10 }
    ],
    projects: [
      { id: 'p-net-1', title: 'Enterprise Network Architecture Topology Design', summary: 'Design a multi-tiered network layout featuring DMZ, Internal Workstations, Database Subnet, and WAF.' }
    ],
    ctfChallenges: [
      { id: 'ctf-net-1', title: 'Exfiltrated Data PCAP Analysis', category: 'Network Forensics', points: 200 }
    ],
    finalAssessment: {
      title: 'Network Security Engineer Certification Exam',
      description: 'Diagnose network security gaps, create packet filters, and configure secure VPN policies.',
      passingScore: 80
    },
    estimatedHours: '16 Hours',
    difficulty: 'Beginner → Intermediate',
    officialSourceIds: ['nist_csf', 'cisa']
  },
  {
    id: 'digital-forensics',
    title: 'Digital Forensics',
    role: 'Digital Forensics & Incident Response (DFIR) Specialist',
    overview: 'Learn evidence collection, memory artifact extraction, filesystem forensics (NTFS/ext4), timeline reconstruction, and legal chain of custody protocols.',
    beginnerRequirements: [
      'Basic familiarity with Windows/Linux operating system structures',
      'Understanding of file extensions and storage media basics'
    ],
    skillsRequired: ['Disk Imaging', 'Memory Forensics (Volatility)', 'Timeline Analysis', 'Registry Artifacts', 'Chain of Custody'],
    beginnerModules: [
      {
        id: 'df-b1',
        title: 'Forensic Principles & Evidence Preservation',
        description: 'Understand hash verification (SHA-256), write blockers, and evidence handling.',
        level: 'Beginner',
        estimatedMinutes: 50,
        topics: ['Chain of Custody', 'SHA-256 Hashing', 'Write Blockers', 'Order of Volatility'],
        officialSourceIds: ['nist_csf', 'cisa']
      }
    ],
    intermediateModules: [
      {
        id: 'df-i1',
        title: 'Windows Artifact & Registry Analysis',
        description: 'Extract MFT records, Prefetch files, Shimcache, and Windows Registry keys.',
        level: 'Intermediate',
        estimatedMinutes: 85,
        topics: ['Windows Registry', 'Prefetch Files', 'MFT Parsing', 'LNK File Analysis'],
        officialSourceIds: ['cisa', 'mitre_attack']
      }
    ],
    advancedModules: [
      {
        id: 'df-a1',
        title: 'RAM Memory Dump Forensics with Volatility',
        description: 'Inspect process trees, injected DLLs, and malware artifacts in memory dumps.',
        level: 'Advanced',
        estimatedMinutes: 105,
        topics: ['RAM Acquisition', 'Volatility Framework', 'Process Injection Detection', 'Rootkits'],
        officialSourceIds: ['mitre_attack', 'cisa']
      }
    ],
    courses: [
      { id: 'c-df-1', title: 'Digital Forensics & Evidence Analysis', duration: '5 Hours', description: 'Comprehensive introduction to digital evidence extraction and analysis.', officialSourceId: 'nist_csf' }
    ],
    labs: [
      { id: 'l-df-1', title: 'Windows Registry Artifact Analysis Lab', type: 'Artifact Extraction', difficulty: 'Intermediate' },
      { id: 'l-df-2', title: 'Volatility Memory Dump Investigation', type: 'RAM Analysis', difficulty: 'Advanced' }
    ],
    quizzes: [
      { id: 'q-df-1', title: 'Chain of Custody & Evidence Basics Quiz', questionCount: 10 },
      { id: 'q-df-2', title: 'Memory Forensics & Artifacts Quiz', questionCount: 10 }
    ],
    projects: [
      { id: 'p-df-1', title: 'Breach Investigation Timeline & Report', summary: 'Construct an evidence-backed incident timeline detailing initial breach vector, persistence mechanisms, and compromised accounts.' }
    ],
    ctfChallenges: [
      { id: 'ctf-df-1', title: 'Hidden Key in Memory Dump', category: 'Memory Forensics', points: 250 }
    ],
    finalAssessment: {
      title: 'Digital Forensics Practical Examination',
      description: 'Analyze raw disk and memory images to reconstruct attacker actions and recover hidden flags.',
      passingScore: 80
    },
    estimatedHours: '17 Hours',
    difficulty: 'Intermediate → Advanced',
    officialSourceIds: ['nist_csf', 'cisa', 'mitre_attack']
  },
  {
    id: 'cloud-security',
    title: 'Cloud Security',
    role: 'Cloud Security Architect / DevSecOps Engineer',
    overview: 'Master cloud security architecture across AWS/Azure/GCP, IAM policies, container security (Docker/Kubernetes), infrastructure as code (Terraform), and cloud compliance.',
    beginnerRequirements: [
      'Basic understanding of web architecture and virtualization concepts',
      'Familiarity with JSON/YAML file structures'
    ],
    skillsRequired: ['Cloud IAM Policies', 'S3 Bucket Hardening', 'Container Security (Docker)', 'Kubernetes RBAC', 'CloudTrail Audit'],
    beginnerModules: [
      {
        id: 'cloud-b1',
        title: 'Shared Responsibility Model & Cloud IAM',
        description: 'Understand CSP vs Customer responsibilities and Least Privilege IAM role policies.',
        level: 'Beginner',
        estimatedMinutes: 50,
        topics: ['Shared Responsibility', 'IAM Policies', 'Multi-Factor for Cloud', 'Cloud Root User Security'],
        officialSourceIds: ['cisa', 'nist_csf']
      }
    ],
    intermediateModules: [
      {
        id: 'cloud-i1',
        title: 'Cloud Storage Hardening & Audit Logging',
        description: 'Secure cloud object stores (S3), enable server-side encryption, and analyze CloudTrail logs.',
        level: 'Intermediate',
        estimatedMinutes: 80,
        topics: ['Public S3 Bucket Detection', 'KMS Encryption', 'CloudTrail Logs', 'Security Hub'],
        officialSourceIds: ['cisa', 'owasp']
      }
    ],
    advancedModules: [
      {
        id: 'cloud-a1',
        title: 'Container & Kubernetes Security Hardening',
        description: 'Audit Docker container images, enforce non-root users, and configure Kubernetes Network Policies.',
        level: 'Advanced',
        estimatedMinutes: 100,
        topics: ['Docker Vulnerability Scanning', 'Kubernetes RBAC', 'Pod Security Admission', 'Secrets Management'],
        officialSourceIds: ['cisa', 'cwe']
      }
    ],
    courses: [
      { id: 'c-cloud-1', title: 'Cloud Infrastructure & IAM Security', duration: '5 Hours', description: 'Learn cloud security principles, IAM policy design, and container hardening.', officialSourceId: 'cisa' }
    ],
    labs: [
      { id: 'l-cloud-1', title: 'IAM Policy Least-Privilege Audit Lab', type: 'Policy Review', difficulty: 'Beginner' },
      { id: 'l-cloud-2', title: 'Docker Image Vulnerability Scanning Lab', type: 'Container Security', difficulty: 'Intermediate' }
    ],
    quizzes: [
      { id: 'q-cloud-1', title: 'Cloud Shared Responsibility & IAM Quiz', questionCount: 10 },
      { id: 'q-cloud-2', title: 'Container & Kubernetes Security Quiz', questionCount: 10 }
    ],
    projects: [
      { id: 'p-cloud-1', title: 'Hardened Kubernetes Deployment Manifest', summary: 'Create secure Kubernetes manifests with non-root security contexts, read-only root filesystems, and strict network policies.' }
    ],
    ctfChallenges: [
      { id: 'ctf-cloud-1', title: 'Exposed Cloud Access Key Flag', category: 'Cloud Security', points: 200 }
    ],
    finalAssessment: {
      title: 'Cloud Security Engineer Assessment',
      description: 'Audit misconfigured cloud infrastructure files, fix IAM policy over-privileging, and remediate container flaws.',
      passingScore: 85
    },
    estimatedHours: '18 Hours',
    difficulty: 'Intermediate → Advanced',
    officialSourceIds: ['cisa', 'nist_csf', 'owasp']
  },
  {
    id: 'blue-team',
    title: 'Blue Team (Defensive Security)',
    role: 'Defensive Security Specialist / Blue Teamer',
    overview: 'Master defensive security operations, enterprise threat hunting, YARA rules, Endpoint Detection & Response (EDR), and active adversary tracking.',
    beginnerRequirements: [
      'Completion of Cybersecurity Fundamentals or SOC Analyst track',
      'Familiarity with common Windows/Linux system logs'
    ],
    skillsRequired: ['Threat Hunting', 'YARA Rule Writing', 'EDR Alerts', 'Hardening Controls', 'Adversary Tracking'],
    beginnerModules: [
      {
        id: 'blue-b1',
        title: 'Defensive Security Posture & Hardening Baselines',
        description: 'Implement CIS benchmarks, disable legacy protocols, and configure host firewalls.',
        level: 'Beginner',
        estimatedMinutes: 50,
        topics: ['CIS Benchmarks', 'Disabling SMBv1', 'Host Hardening', 'Group Policy Objects'],
        officialSourceIds: ['cisa', 'nist_csf']
      }
    ],
    intermediateModules: [
      {
        id: 'blue-i1',
        title: 'YARA Rule Creation & Malware Signature Detection',
        description: 'Write YARA rules to detect suspicious binaries, webshells, and obfuscated scripts.',
        level: 'Intermediate',
        estimatedMinutes: 80,
        topics: ['YARA Syntax', 'Webshell Signatures', 'Hex Patterns', 'String Matching'],
        officialSourceIds: ['cisa', 'mitre_attack']
      }
    ],
    advancedModules: [
      {
        id: 'blue-a1',
        title: 'Proactive Enterprise Threat Hunting',
        description: 'Conduct hypothesis-driven threat hunting across EDR telemetry to discover stealthy persistence mechanisms.',
        level: 'Advanced',
        estimatedMinutes: 105,
        topics: ['Hypothesis-Driven Hunting', 'EDR Telemetry Analysis', 'Persistence Mechanism Detection', 'Active Defense'],
        officialSourceIds: ['mitre_attack', 'cisa']
      }
    ],
    courses: [
      { id: 'c-blue-1', title: 'Blue Team Engineering & Threat Hunting', duration: '5 Hours', description: 'Proactive defensive strategies, EDR telemetry, and signature creation.', officialSourceId: 'mitre_attack' }
    ],
    labs: [
      { id: 'l-blue-1', title: 'YARA Signature Writing Lab', type: 'Signature Lab', difficulty: 'Intermediate' },
      { id: 'l-blue-2', title: 'Threat Hunting for Scheduled Task Persistence', type: 'Telemetry Lab', difficulty: 'Advanced' }
    ],
    quizzes: [
      { id: 'q-blue-1', title: 'System Hardening & CIS Benchmarks Quiz', questionCount: 10 },
      { id: 'q-blue-2', title: 'Threat Hunting & YARA Quiz', questionCount: 10 }
    ],
    projects: [
      { id: 'p-blue-1', title: 'Enterprise Threat Hunting Playbook', summary: 'Develop a step-by-step threat hunting guide for detecting Process Injection and Pass-the-Hash attacks.' }
    ],
    ctfChallenges: [
      { id: 'ctf-blue-1', title: 'Catch the Persistence Mechanism', category: 'Blue Team', points: 250 }
    ],
    finalAssessment: {
      title: 'Blue Team Operations Certification Exam',
      description: 'Analyze telemetry logs, author custom YARA detection rules, and eliminate adversary persistence.',
      passingScore: 85
    },
    estimatedHours: '17 Hours',
    difficulty: 'Intermediate → Advanced',
    officialSourceIds: ['mitre_attack', 'cisa', 'nist_csf']
  },
  {
    id: 'red-team',
    title: 'Red Team (Adversary Emulation)',
    role: 'Red Team Operator / Adversary Emulation Specialist',
    overview: 'Learn real-world adversary TTPs, Command & Control (C2) infrastructure setup, evasion techniques, credential dumping, and lateral movement based on MITRE ATT&CK.',
    beginnerRequirements: [
      'Solid command of Penetration Testing methodologies',
      'Comfortable with script writing in Python or PowerShell'
    ],
    skillsRequired: ['Adversary Emulation', 'C2 Infrastructure', 'AV/EDR Evasion', 'Credential Dumping', 'Lateral Movement'],
    beginnerModules: [
      {
        id: 'red-b1',
        title: 'Adversary Emulation Framework & MITRE TTPs',
        description: 'Understand the difference between pentesting and full adversary emulation operations.',
        level: 'Beginner',
        estimatedMinutes: 55,
        topics: ['Red Team vs Pentest', 'MITRE ATT&CK Mapping', 'Operational Security (OpSec)', 'Rules of Engagement'],
        officialSourceIds: ['mitre_attack']
      }
    ],
    intermediateModules: [
      {
        id: 'red-i1',
        title: 'Command & Control (C2) Architecture & Payloads',
        description: 'Set up redirectors, C2 listeners, and custom HTTPS beaconing channels.',
        level: 'Intermediate',
        estimatedMinutes: 85,
        topics: ['C2 Architecture', 'Domain Fronting', 'Malleable C2 Profiles', 'Stager vs Stageless'],
        officialSourceIds: ['mitre_attack', 'cwe']
      }
    ],
    advancedModules: [
      {
        id: 'red-a1',
        title: 'Credential Dumping & Lateral Movement Techniques',
        description: 'Dump LSASS memory, execute Pass-the-Hash/Kerberoasting, and move laterally across Active Directory domains.',
        level: 'Advanced',
        estimatedMinutes: 110,
        topics: ['Kerberoasting', 'Pass-the-Hash', 'LSASS Dumping', 'Token Manipulation'],
        officialSourceIds: ['mitre_attack', 'cwe']
      }
    ],
    courses: [
      { id: 'c-red-1', title: 'Red Team Operations & Adversary Simulation', duration: '6 Hours', description: 'Advanced adversary techniques, C2 deployment, and domain compromise.', officialSourceId: 'mitre_attack' }
    ],
    labs: [
      { id: 'l-red-1', title: 'Malleable C2 Profile Customization Lab', type: 'C2 Infrastructure', difficulty: 'Intermediate' },
      { id: 'l-red-2', title: 'Kerberoasting & Offline Hash Cracking Lab', type: 'Active Directory', difficulty: 'Advanced' }
    ],
    quizzes: [
      { id: 'q-red-1', title: 'Red Team Methodology & OpSec Quiz', questionCount: 10 },
      { id: 'q-red-2', title: 'C2 Channels & Active Directory Attacks Quiz', questionCount: 10 }
    ],
    projects: [
      { id: 'p-red-1', title: 'Adversary Emulation Operation Plan', summary: 'Construct a complete red team operational plan emulating APT threat groups targeting enterprise infrastructure.' }
    ],
    ctfChallenges: [
      { id: 'ctf-red-1', title: 'Domain Admin Ticket Extraction Flag', category: 'Red Team', points: 300 }
    ],
    finalAssessment: {
      title: 'Red Team Operator Final Assessment',
      description: 'Execute stealthy initial access, establish C2, perform Kerberoasting, and capture the Domain Controller flag.',
      passingScore: 80
    },
    estimatedHours: '21 Hours',
    difficulty: 'Advanced',
    officialSourceIds: ['mitre_attack', 'cwe']
  },
  {
    id: 'security-engineering',
    title: 'Security Engineering',
    role: 'Security Engineer / Software Security Architect',
    overview: 'Master secure system architecture design, cryptographic engineering, identity & key management, automated AppSec CI/CD pipelines, and threat modeling (STRIDE).',
    beginnerRequirements: [
      'Strong programming proficiency in Python, TypeScript, or Go',
      'Solid grasp of software architecture and database design'
    ],
    skillsRequired: ['Threat Modeling (STRIDE)', 'Cryptographic Design', 'CI/CD DevSecOps Pipeline', 'OAuth 2.0 / OIDC', 'Key Management (KMS)'],
    beginnerModules: [
      {
        id: 'eng-b1',
        title: 'Threat Modeling Methodology & STRIDE Framework',
        description: 'Identify security boundaries, data flow diagrams, and STRIDE threat categories in system design.',
        level: 'Beginner',
        estimatedMinutes: 60,
        topics: ['STRIDE Framework', 'Data Flow Diagrams', 'Trust Boundaries', 'Mitigation Mapping'],
        officialSourceIds: ['owasp', 'cwe']
      }
    ],
    intermediateModules: [
      {
        id: 'eng-i1',
        title: 'Cryptographic Engineering & Key Management',
        description: 'Implement AES-256-GCM, Bcrypt, RSA/ECC signatures, and Vault/KMS secrets management.',
        level: 'Intermediate',
        estimatedMinutes: 85,
        topics: ['Symmetric vs Asymmetric', 'Bcrypt / Argon2', 'KMS Vault', 'TLS Certificate Rotation'],
        officialSourceIds: ['owasp', 'cwe']
      }
    ],
    advancedModules: [
      {
        id: 'eng-a1',
        title: 'DevSecOps & Automated Security Pipeline Engineering',
        description: 'Integrate SAST (SonarQube), DAST (OWASP ZAP), and dependency scanning into automated CI/CD workflows.',
        level: 'Advanced',
        estimatedMinutes: 105,
        topics: ['SAST / DAST Automation', 'Software Bill of Materials (SBOM)', 'Pipeline Hardening', 'Zero Trust API'],
        officialSourceIds: ['owasp', 'cisa', 'cwe']
      }
    ],
    courses: [
      { id: 'c-eng-1', title: 'Security Engineering & DevSecOps Architecture', duration: '6 Hours', description: 'Design resilient systems, cryptographic pipelines, and automated security scanning.', officialSourceId: 'owasp' }
    ],
    labs: [
      { id: 'l-eng-1', title: 'STRIDE Threat Modeling Lab', type: 'Architecture Review', difficulty: 'Beginner' },
      { id: 'l-eng-2', title: 'Automated SAST/DAST Pipeline Integration', type: 'DevSecOps Lab', difficulty: 'Advanced' }
    ],
    quizzes: [
      { id: 'q-eng-1', title: 'Threat Modeling & STRIDE Quiz', questionCount: 10 },
      { id: 'q-eng-2', title: 'Cryptographic Design & DevSecOps Quiz', questionCount: 10 }
    ],
    projects: [
      { id: 'p-eng-1', title: 'Zero Trust Microservice Architecture Blueprint', summary: 'Architect a secure microservices backend featuring Mutual TLS (mTLS), HashiCorp Vault secrets injection, and OAuth 2.0 JWT authorization.' }
    ],
    ctfChallenges: [
      { id: 'ctf-eng-1', title: 'Cryptographic Implementation Flaw Flag', category: 'Crypto Security', points: 300 }
    ],
    finalAssessment: {
      title: 'Senior Security Engineer Architecture Exam',
      description: 'Review complex system architecture diagrams, spot design flaws, and design secure cryptographic systems.',
      passingScore: 85
    },
    estimatedHours: '22 Hours',
    difficulty: 'Intermediate → Advanced',
    officialSourceIds: ['owasp', 'cwe', 'cisa', 'nist_csf']
  }
];

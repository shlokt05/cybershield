import { SkillNode } from '../types/careerSkills';

export const SKILL_NODES_FULL: SkillNode[] = [
  // NETWORKING
  {
    id: 'sk-net-1',
    title: 'OSI Model & TCP/IP Stack',
    category: 'Networking',
    description: 'Understand 7-layer OSI model, packet encapsulation, IP addressing, TCP handshakes, and UDP.',
    difficulty: 'Beginner',
    prerequisites: [],
    relatedCourses: ['Cybersecurity Foundations & Governance'],
    relatedLabs: ['Wireshark Network Traffic Inspection'],
    relatedProjects: ['Enterprise Network Architecture Topology Design'],
    relatedCtfs: ['Packet PCAP Inspection'],
    completionPercentage: 100,
    officialSourceIds: ['nist_csf']
  },
  {
    id: 'sk-net-2',
    title: 'Subnetting & Network Segmentation',
    category: 'Networking',
    description: 'Calculate CIDR subnets, design VLAN isolation, DMZ zones, and private IP addressing (RFC 1918).',
    difficulty: 'Intermediate',
    prerequisites: ['sk-net-1'],
    relatedCourses: ['Network Defense & Infrastructure Hardening'],
    relatedLabs: ['Linux UFW & iptables Firewall Lab'],
    relatedProjects: ['Enterprise Network Architecture Topology Design'],
    relatedCtfs: ['Exfiltrated Data PCAP Analysis'],
    completionPercentage: 75,
    officialSourceIds: ['nist_csf']
  },
  {
    id: 'sk-net-3',
    title: 'Firewalls, IDS/IPS & Snort Rules',
    category: 'Networking',
    description: 'Design stateful packet inspection rules, WAF parameters, and custom Snort IDS detection signatures.',
    difficulty: 'Advanced',
    prerequisites: ['sk-net-2'],
    relatedCourses: ['Network Defense & Infrastructure Hardening'],
    relatedLabs: ['Snort Rule Writing & Intrusion Detection'],
    relatedProjects: ['WAF & SIEM Alert Rule Blueprint'],
    relatedCtfs: ['Exfiltrated Data PCAP Analysis'],
    completionPercentage: 30,
    officialSourceIds: ['cisa', 'nist_csf']
  },

  // LINUX
  {
    id: 'sk-lin-1',
    title: 'Linux CLI & Filesystem Architecture',
    category: 'Linux',
    description: 'Master bash navigation, pipe redirection, file permissions (chmod/chown), and system logging.',
    difficulty: 'Beginner',
    prerequisites: [],
    relatedCourses: ['Linux & Command Line Fundamentals'],
    relatedLabs: ['Linux Permission Auditing Lab'],
    relatedProjects: ['Hardened Linux Workstation Configuration'],
    relatedCtfs: ['Basic Linux Recon Flag'],
    completionPercentage: 100,
    officialSourceIds: ['linux_docs']
  },
  {
    id: 'sk-lin-2',
    title: 'Linux User Privileges & SUID Auditing',
    category: 'Linux',
    description: 'Inspect sudoers configurations, SUID/SGID executable permissions, and capabilities auditing.',
    difficulty: 'Intermediate',
    prerequisites: ['sk-lin-1'],
    relatedCourses: ['Ethical Hacking & Network Reconnaissance'],
    relatedLabs: ['Linux SUID Privilege Escalation Lab'],
    relatedProjects: ['Hardened Linux Workstation Configuration'],
    relatedCtfs: ['Root Flag: Vulnerable Service Hijack'],
    completionPercentage: 80,
    officialSourceIds: ['linux_docs', 'cwe']
  },

  // PYTHON
  {
    id: 'sk-py-1',
    title: 'Python Scripting for Security Automation',
    category: 'Python',
    description: 'Write scripts using requests, socket, argparse, and re libraries to automate security tasks.',
    difficulty: 'Beginner',
    prerequisites: [],
    relatedCourses: ['Cybersecurity Foundations & Governance'],
    relatedLabs: ['SQL Injection Defense & Parameter Binding'],
    relatedProjects: ['Full-Stack Secure Authentication Module'],
    relatedCtfs: ['Bypass Weak Access Control Flag'],
    completionPercentage: 90,
    officialSourceIds: ['python_docs']
  },
  {
    id: 'sk-py-2',
    title: 'Offensive & Defensive Tool Development in Python',
    category: 'Python',
    description: 'Build custom port scanners, banner grabbers, web scrapers, and log parsing engines.',
    difficulty: 'Intermediate',
    prerequisites: ['sk-py-1', 'sk-net-1'],
    relatedCourses: ['Ethical Hacking & Network Reconnaissance'],
    relatedLabs: ['Nmap Port & Service Scanning Lab'],
    relatedProjects: ['WAF & SIEM Alert Rule Blueprint'],
    relatedCtfs: ['Suspicious PowerShell Execution Log'],
    completionPercentage: 50,
    officialSourceIds: ['python_docs']
  },

  // WEB SECURITY
  {
    id: 'sk-web-1',
    title: 'OWASP Top 10 & Injection Mitigation',
    category: 'Web Security',
    description: 'Identify and remediate SQL Injection, OS Command Injection, and ORM parameterization.',
    difficulty: 'Beginner',
    prerequisites: ['sk-py-1'],
    relatedCourses: ['OWASP Top 10 Vulnerabilities & Secure Development'],
    relatedLabs: ['SQL Injection Defense & Parameter Binding'],
    relatedProjects: ['Full-Stack Secure Authentication Module'],
    relatedCtfs: ['Bypass Weak Access Control Flag'],
    completionPercentage: 100,
    officialSourceIds: ['owasp_top10', 'cwe']
  },
  {
    id: 'sk-web-2',
    title: 'XSS, CSRF & Content Security Policy (CSP)',
    category: 'Web Security',
    description: 'Prevent Cross-Site Scripting via context-aware output encoding, DOMPurify, and strict CSP headers.',
    difficulty: 'Intermediate',
    prerequisites: ['sk-web-1'],
    relatedCourses: ['OWASP Top 10 Vulnerabilities & Secure Development'],
    relatedLabs: ['XSS Sanitization & CSP Configuration'],
    relatedProjects: ['Full-Stack Secure Authentication Module'],
    relatedCtfs: ['Bypass Weak Access Control Flag'],
    completionPercentage: 70,
    officialSourceIds: ['owasp', 'owasp_top10']
  },

  // CRYPTOGRAPHY
  {
    id: 'sk-crypto-1',
    title: 'Symmetric & Asymmetric Encryption Essentials',
    category: 'Cryptography',
    description: 'Understand AES-256-GCM, RSA, ECC, Diffie-Hellman key exchange, and digital signatures.',
    difficulty: 'Beginner',
    prerequisites: [],
    relatedCourses: ['Security Engineering & DevSecOps Architecture'],
    relatedLabs: ['STRIDE Threat Modeling Lab'],
    relatedProjects: ['Zero Trust Microservice Architecture Blueprint'],
    relatedCtfs: ['Cryptographic Implementation Flaw Flag'],
    completionPercentage: 85,
    officialSourceIds: ['cwe', 'owasp']
  },
  {
    id: 'sk-crypto-2',
    title: 'Password Hashing & Key Derivation (Bcrypt/Argon2)',
    category: 'Cryptography',
    description: 'Implement salted password hashing using Bcrypt, Argon2id, PBKDF2, and entropy metrics.',
    difficulty: 'Intermediate',
    prerequisites: ['sk-crypto-1'],
    relatedCourses: ['Security Engineering & DevSecOps Architecture'],
    relatedLabs: ['SQL Injection Defense & Parameter Binding'],
    relatedProjects: ['Full-Stack Secure Authentication Module'],
    relatedCtfs: ['Cryptographic Implementation Flaw Flag'],
    completionPercentage: 100,
    officialSourceIds: ['owasp', 'cwe']
  },

  // AUTHENTICATION
  {
    id: 'sk-auth-1',
    title: 'Multi-Factor Authentication (MFA) & TOTP',
    category: 'Authentication',
    description: 'Master RFC 6238 Time-based One-Time Password (TOTP) protocols and authenticator integrations.',
    difficulty: 'Beginner',
    prerequisites: ['sk-crypto-2'],
    relatedCourses: ['Cloud Infrastructure & IAM Security'],
    relatedLabs: ['IAM Policy Least-Privilege Audit Lab'],
    relatedProjects: ['Full-Stack Secure Authentication Module'],
    relatedCtfs: ['Bypass Weak Access Control Flag'],
    completionPercentage: 90,
    officialSourceIds: ['cisa', 'owasp']
  },
  {
    id: 'sk-auth-2',
    title: 'OAuth 2.0, OpenID Connect & JWT Tokens',
    category: 'Authentication',
    description: 'Audit OAuth 2.0 authorization flows, bearer tokens, state parameter CSRF, and JWT signing verification.',
    difficulty: 'Intermediate',
    prerequisites: ['sk-auth-1'],
    relatedCourses: ['Security Engineering & DevSecOps Architecture'],
    relatedLabs: ['XSS Sanitization & CSP Configuration'],
    relatedProjects: ['Zero Trust Microservice Architecture Blueprint'],
    relatedCtfs: ['Domain Admin Ticket Extraction Flag'],
    completionPercentage: 60,
    officialSourceIds: ['owasp', 'cwe']
  },

  // CLOUD SECURITY
  {
    id: 'sk-cloud-1',
    title: 'Cloud IAM Policy Design & Least Privilege',
    category: 'Cloud Security',
    description: 'Architect fine-grained AWS/Azure IAM role policies, condition keys, and prevent over-privileging.',
    difficulty: 'Beginner',
    prerequisites: ['sk-net-1', 'sk-auth-1'],
    relatedCourses: ['Cloud Infrastructure & IAM Security'],
    relatedLabs: ['IAM Policy Least-Privilege Audit Lab'],
    relatedProjects: ['Hardened Kubernetes Deployment Manifest'],
    relatedCtfs: ['Exposed Cloud Access Key Flag'],
    completionPercentage: 75,
    officialSourceIds: ['cisa', 'nist_csf']
  },
  {
    id: 'sk-cloud-2',
    title: 'Container & Kubernetes Hardening',
    category: 'Cloud Security',
    description: 'Audit Dockerfiles, restrict root privileges, configure Pod Security Admissions and Network Policies.',
    difficulty: 'Advanced',
    prerequisites: ['sk-cloud-1', 'sk-lin-1'],
    relatedCourses: ['Cloud Infrastructure & IAM Security'],
    relatedLabs: ['Docker Image Vulnerability Scanning Lab'],
    relatedProjects: ['Hardened Kubernetes Deployment Manifest'],
    relatedCtfs: ['Exposed Cloud Access Key Flag'],
    completionPercentage: 40,
    officialSourceIds: ['cisa', 'cwe']
  },

  // SOC
  {
    id: 'sk-soc-1',
    title: 'Phishing Email Triage & Header Analysis',
    category: 'SOC',
    description: 'Inspect raw SMTP headers, verify SPF/DKIM/DMARC alignment, and identify deceptive phishing URLs.',
    difficulty: 'Beginner',
    prerequisites: ['sk-net-1'],
    relatedCourses: ['SOC Operations & Incident Handling'],
    relatedLabs: ['Phishing Email Header Triage Lab'],
    relatedProjects: ['WAF & SIEM Alert Rule Blueprint'],
    relatedCtfs: ['Suspicious PowerShell Execution Log'],
    completionPercentage: 100,
    officialSourceIds: ['cisa', 'mitre_attack']
  },
  {
    id: 'sk-soc-2',
    title: 'SIEM Querying & Event Log Analysis',
    category: 'SOC',
    description: 'Query Windows Event Logs (4624, 4625, 4688), Syslog, and Apache/Nginx access logs in SIEM engines.',
    difficulty: 'Intermediate',
    prerequisites: ['sk-soc-1', 'sk-lin-1'],
    relatedCourses: ['SOC Operations & Incident Handling'],
    relatedLabs: ['SIEM Brute Force Detection Challenge'],
    relatedProjects: ['WAF & SIEM Alert Rule Blueprint'],
    relatedCtfs: ['Suspicious PowerShell Execution Log'],
    completionPercentage: 80,
    officialSourceIds: ['mitre_attack', 'cisa']
  },

  // DIGITAL FORENSICS
  {
    id: 'sk-df-1',
    title: 'Evidence Preservation & Hash Verification',
    category: 'Digital Forensics',
    description: 'Enforce legal chain of custody, hardware write-blockers, disk imaging, and SHA-256 integrity verification.',
    difficulty: 'Beginner',
    prerequisites: ['sk-lin-1'],
    relatedCourses: ['Digital Forensics & Evidence Analysis'],
    relatedLabs: ['Windows Registry Artifact Analysis Lab'],
    relatedProjects: ['Breach Investigation Timeline & Report'],
    relatedCtfs: ['Hidden Key in Memory Dump'],
    completionPercentage: 85,
    officialSourceIds: ['nist_csf', 'cisa']
  },
  {
    id: 'sk-df-2',
    title: 'Memory Dump Analysis with Volatility',
    category: 'Digital Forensics',
    description: 'Extract active process trees, injected DLLs, unlinked VAD nodes, and network connections from RAM dumps.',
    difficulty: 'Advanced',
    prerequisites: ['sk-df-1'],
    relatedCourses: ['Digital Forensics & Evidence Analysis'],
    relatedLabs: ['Volatility Memory Dump Investigation'],
    relatedProjects: ['Breach Investigation Timeline & Report'],
    relatedCtfs: ['Hidden Key in Memory Dump'],
    completionPercentage: 45,
    officialSourceIds: ['mitre_attack', 'cisa']
  },

  // INCIDENT RESPONSE
  {
    id: 'sk-ir-1',
    title: 'NIST SP 800-61 Incident Handling Workflow',
    category: 'Incident Response',
    description: 'Master Preparation, Detection & Analysis, Containment, Eradication, Recovery, and Post-Incident lessons.',
    difficulty: 'Intermediate',
    prerequisites: ['sk-soc-2'],
    relatedCourses: ['SOC Operations & Incident Handling'],
    relatedLabs: ['SIEM Brute Force Detection Challenge'],
    relatedProjects: ['Breach Investigation Timeline & Report'],
    relatedCtfs: ['Catch the Persistence Mechanism'],
    completionPercentage: 70,
    officialSourceIds: ['nist_csf', 'cisa']
  },

  // THREAT INTELLIGENCE
  {
    id: 'sk-ti-1',
    title: 'MITRE ATT&CK Matrix & Threat Mapping',
    category: 'Threat Intelligence',
    description: 'Map observed attack vectors, tactics, techniques, and procedures (TTPs) to the MITRE ATT&CK framework.',
    difficulty: 'Intermediate',
    prerequisites: ['sk-net-1', 'sk-soc-1'],
    relatedCourses: ['Blue Team Engineering & Threat Hunting'],
    relatedLabs: ['Threat Hunting for Scheduled Task Persistence'],
    relatedProjects: ['Enterprise Threat Hunting Playbook'],
    relatedCtfs: ['Catch the Persistence Mechanism'],
    completionPercentage: 85,
    officialSourceIds: ['mitre_attack']
  },

  // SECURITY ENGINEERING
  {
    id: 'sk-eng-1',
    title: 'Threat Modeling with STRIDE Framework',
    category: 'Security Engineering',
    description: 'Perform systematic threat modeling over system architecture diagrams using Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege.',
    difficulty: 'Intermediate',
    prerequisites: ['sk-web-2', 'sk-crypto-2'],
    relatedCourses: ['Security Engineering & DevSecOps Architecture'],
    relatedLabs: ['STRIDE Threat Modeling Lab'],
    relatedProjects: ['Zero Trust Microservice Architecture Blueprint'],
    relatedCtfs: ['Cryptographic Implementation Flaw Flag'],
    completionPercentage: 60,
    officialSourceIds: ['owasp', 'cwe']
  },
  {
    id: 'sk-eng-2',
    title: 'DevSecOps & SAST/DAST Pipeline Automation',
    category: 'Security Engineering',
    description: 'Embed automated SonarQube, OWASP ZAP, and dependency vulnerability scans into CI/CD build pipelines.',
    difficulty: 'Advanced',
    prerequisites: ['sk-eng-1', 'sk-py-2'],
    relatedCourses: ['Security Engineering & DevSecOps Architecture'],
    relatedLabs: ['Automated SAST/DAST Pipeline Integration'],
    relatedProjects: ['Zero Trust Microservice Architecture Blueprint'],
    relatedCtfs: ['Cryptographic Implementation Flaw Flag'],
    completionPercentage: 40,
    officialSourceIds: ['owasp', 'cisa', 'cwe']
  }
];

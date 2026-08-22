import { InteractiveLab } from '../types/interactiveLabs';

export const INTERACTIVE_LABS_FULL: InteractiveLab[] = [
  // 1. NETWORKING
  {
    id: 'lab-net-1',
    title: 'Synthetic Packet Analysis & HTTP Inspection',
    category: 'Networking',
    difficulty: 'Easy',
    estimatedMinutes: 20,
    xpReward: 150,
    learningObjectives: [
      'Inspect cleartext HTTP request headers vs encrypted HTTPS traffic',
      'Identify unencrypted sensitive basic auth headers in network captures',
      'Understand TLS Transport Encryption defenses based on NIST CSF guidelines'
    ],
    scenario: 'A SOC analyst captured synthetic Wireshark PCAP packets from a legacy internal web app. Inspect the HTTP POST payload to find the compromised cleartext password flag.',
    theory: `HTTP transfers data over port 80 in plain unencrypted text. Anyone sniffing network packets between client and server can inspect authorization headers. TLS (HTTPS) encrypts communication at OSI Layer 6 (Presentation), guaranteeing confidentiality and integrity.`,
    tasks: [
      {
        id: 't-net-1',
        instructions: 'Analyze the captured HTTP request payload below. Decode the base64 Authorization header or submit the extracted cleartext credential flag format: CS{password_here}',
        type: 'flag',
        expectedAnswer: 'CS{admin_secure_2026!}',
        acceptedAnswers: ['CS{admin_secure_2026!}', 'admin_secure_2026!'],
        syntheticData: `POST /api/v1/login HTTP/1.1
Host: internal-portal.local
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Authorization: Basic YWRtaW46YWRtaW5fc2VjdXJlXzIwMjYh
Content-Type: application/x-www-form-urlencoded
Content-Length: 32

username=admin&action=authenticate`
      }
    ],
    hints: [
      { id: 'h1', hintText: 'The header "Authorization: Basic YWRtaW46YWRtaW5fc2VjdXJlXzIwMjYh" uses Base64 encoding. Base64 string "YWRtaW46YWRtaW5fc2VjdXJlXzIwMjYh" decodes to "admin:admin_secure_2026!". The flag is CS{admin_secure_2026!}' }
    ],
    explanation: 'Basic Auth headers transmit base64-encoded strings `username:password` over HTTP without encryption, allowing network eavesdroppers to easily decode credentials.',
    defense: 'Enforce HTTPS (TLS 1.3) across all endpoints with HSTS (HTTP Strict Transport Security) to force encrypted transport layer communication.',
    officialSourceIds: ['nist_csf', 'cisa']
  },

  // 2. LINUX
  {
    id: 'lab-lin-1',
    title: 'Linux SUID Binary Audit & Security Hardening',
    category: 'Linux',
    difficulty: 'Medium',
    estimatedMinutes: 25,
    xpReward: 200,
    learningObjectives: [
      'Understand Linux file permission bits (rwxrwxrwx) and SUID special bits',
      'Identify misconfigured SUID binaries that allow unprivileged command execution',
      'Remediate privilege escalation vectors using chmod'
    ],
    scenario: 'A Linux server audit discovered an unusual SUID bit enabled on a custom backup binary `/usr/local/bin/custom_backup`. Inspect the file permissions output and enter the flag.',
    theory: `The SUID (Set User ID) bit allows an executable file to run with the permissions of the file owner (e.g. root) rather than the user executing it. If an unprivileged user can execute a SUID binary that calls system commands unsafely, privilege escalation occurs (CWE-250).`,
    tasks: [
      {
        id: 't-lin-1',
        instructions: 'Review the terminal permission output below. Identify the SUID permission representation bit string for root-owned files (e.g. -rwsr-xr-x) and submit the flag: CS{suid_perm_string}',
        type: 'flag',
        expectedAnswer: 'CS{-rwsr-xr-x}',
        acceptedAnswers: ['CS{-rwsr-xr-x}', '-rwsr-xr-x'],
        syntheticData: `student@cybershield-box:~$ find / -perm -4000 -type f 2>/dev/null
-rwsr-xr-x 1 root root 64424 Jan 15 10:22 /usr/bin/passwd
-rwsr-xr-x 1 root root 88312 Feb 02 14:05 /usr/bin/sudo
-rwsr-xr-x 1 root root 45210 Mar 10 11:18 /usr/local/bin/custom_backup`
      }
    ],
    hints: [
      { id: 'h2', hintText: 'The SUID bit replaces the executable "x" bit with an "s" in the owner permissions: -rwsr-xr-x. Flag is CS{-rwsr-xr-x}' }
    ],
    explanation: 'The letter "s" in `-rwsr-xr-x` indicates the SUID bit is set, executing the binary with root privileges whenever invoked by any user.',
    defense: 'Regularly audit SUID binaries using `find / -perm -4000`, remove SUID flags from non-essential binaries using `chmod u-s <file>`, and follow Principle of Least Privilege.',
    officialSourceIds: ['linux_docs', 'cwe']
  },

  // 3. WEB SECURITY
  {
    id: 'lab-web-1',
    title: 'SQL Injection Defense & Parameter Binding',
    category: 'Web Security',
    difficulty: 'Easy',
    estimatedMinutes: 20,
    xpReward: 150,
    learningObjectives: [
      'Understand how direct string concatenation creates SQL Injection vulnerabilities (CWE-89)',
      'Learn how Parameterized Queries (Prepared Statements) isolate user input from SQL commands',
      'Identify secure SQL query patterns across Node.js/Python DB-API'
    ],
    scenario: 'An AppSec audit identified a vulnerable backend login route. Analyze the raw SQL string concatenation payload and submit the parameterized placeholder flag.',
    theory: `OWASP Top 10 A03:2021 - Injection. When untrusted input is concatenated directly into raw SQL strings, attackers can manipulate query logic (e.g. ' OR '1'='1). Parameterized queries send query structure and parameter values separately to the database engine.`,
    tasks: [
      {
        id: 't-web-1',
        instructions: 'Inspect the code snippet below. Submit the secure SQL parameterized query parameter placeholder symbol used in PostgreSQL / Python DB-API (e.g. %s or $1). Flag format: CS{placeholder}',
        type: 'flag',
        expectedAnswer: 'CS{%s}',
        acceptedAnswers: ['CS{%s}', '%s', 'CS{$1}', '$1'],
        syntheticData: `// VULNERABLE CODE:
// query = "SELECT * FROM users WHERE email = '" + userEmail + "'";

// SECURE PARAMETERIZED QUERY:
const query = "SELECT * FROM users WHERE email = %s AND status = %s";
cursor.execute(query, [userEmail, 'active']);`
      }
    ],
    hints: [
      { id: 'h3', hintText: 'The placeholder used in standard Python DB-API and PostgreSQL parameterized statements is "%s" (or "$1"). Flag is CS{%s}' }
    ],
    explanation: 'Parameterized queries use placeholders like `%s` or `$1` so database drivers treat user inputs strictly as literal scalar values rather than executable SQL logic.',
    defense: 'Use Object-Relational Mappers (ORMs like Prisma, Hibernate, SQLAlchemy) or enforce mandatory prepared statement parameter binding across all database queries.',
    officialSourceIds: ['owasp_top10', 'cwe']
  },

  // 4. AUTHENTICATION
  {
    id: 'lab-auth-1',
    title: 'Multi-Factor Authentication (MFA) TOTP Flaw Audit',
    category: 'Authentication',
    difficulty: 'Medium',
    estimatedMinutes: 25,
    xpReward: 200,
    learningObjectives: [
      'Understand RFC 6238 Time-Based One-Time Password (TOTP) algorithms',
      'Identify replay attack vulnerabilities when TOTP tokens are not invalidated after use',
      'Enforce atomic single-use OTP token verification'
    ],
    scenario: 'An authentication auditor discovered a REST API endpoint that allows reusing the same 6-digit TOTP passcode within a 30-second window. Analyze the server response log and submit the flag.',
    theory: `OWASP Top 10 A07:2021 - Identification and Authentication Failures. TOTP passcodes generated by authenticator apps (Google Authenticator / Duo) must be marked as used in server cache/redis upon first validation to prevent Replay Attacks (CWE-294).`,
    tasks: [
      {
        id: 't-auth-1',
        instructions: 'Inspect the authentication telemetry below. Find the TOTP token string reused across multiple POST requests and submit flag: CS{totp_code}',
        type: 'flag',
        expectedAnswer: 'CS{849201}',
        acceptedAnswers: ['CS{849201}', '849201'],
        syntheticData: `[TIMESTAMP 10:14:02] POST /api/mfa/verify -> {"userId": "usr_99", "totp": "849201"} -> 200 OK (Session Granted)
[TIMESTAMP 10:14:15] POST /api/mfa/verify -> {"userId": "usr_99", "totp": "849201"} -> 200 OK (REPLAY SUCCESS - VULNERABILITY DETECTED!)`
      }
    ],
    hints: [
      { id: 'h4', hintText: 'Look for the 6-digit TOTP number submitted twice with HTTP 200 OK: "849201". Flag is CS{849201}' }
    ],
    explanation: 'Reusing a TOTP token allows an attacker sniffing network requests or session telemetry to replay the 6-digit code before the 30-second timestamp window expires.',
    defense: 'Store consumed TOTP tokens in a fast cache (e.g. Redis) with a 30-second TTL and reject any token that has already been verified.',
    officialSourceIds: ['cisa', 'owasp']
  },

  // 5. CRYPTOGRAPHY
  {
    id: 'lab-crypto-1',
    title: 'Cryptographic Hash Identification & SHA-256',
    category: 'Cryptography',
    difficulty: 'Easy',
    estimatedMinutes: 15,
    xpReward: 150,
    learningObjectives: [
      'Differentiate between fast unsalted hashes (MD5/SHA1) vs secure salted key derivation (Bcrypt)',
      'Inspect hex hash string lengths to identify hash algorithm candidates',
      'Understand collision vulnerabilities in legacy MD5 hashing (CWE-327)'
    ],
    scenario: 'A cryptographic security audit discovered password hashes stored in an old database backup. Identify the hash algorithm used for a 32-character hex hash string.',
    theory: `MD5 produces 128-bit (32 hex character) outputs and is cryptographically broken due to fast collision attacks. SHA-256 produces 256-bit (64 hex character) outputs. Slow salted key derivation functions like Bcrypt ($2b$12$...) are required for password storage.`,
    tasks: [
      {
        id: 't-crypto-1',
        instructions: 'Analyze the hash string below. Identify the 32-character weak hashing algorithm (e.g. MD5 or SHA256) and submit flag: CS{algorithm_name}',
        type: 'flag',
        expectedAnswer: 'CS{MD5}',
        acceptedAnswers: ['CS{MD5}', 'MD5', 'md5'],
        syntheticData: `Database Record #104:
Username: jsmith
Password_Hash: 5e884898da28047151d0e56f8dc62927 (Length: 32 hex characters)
Algorithm: UNKNOWN_LEGACY_HASH`
      }
    ],
    hints: [
      { id: 'h5', hintText: 'A 32-character hexadecimal string represents 128 bits, which is characteristic of MD5. Flag is CS{MD5}' }
    ],
    explanation: '32 hex characters correspond to 16 bytes (128 bits), which matches the output size of MD5.',
    defense: 'Upgrade legacy MD5 password hashes to Bcrypt, Argon2id, or PBKDF2 with unique per-user salts and a minimum cost factor of 12.',
    officialSourceIds: ['cwe', 'owasp']
  },

  // 6. SOC
  {
    id: 'lab-soc-1',
    title: 'SIEM Brute-Force Event Log Triage (Event 4625)',
    category: 'SOC',
    difficulty: 'Medium',
    estimatedMinutes: 30,
    xpReward: 250,
    learningObjectives: [
      'Query Windows Security Event Logs for Failed Logon events (Event ID 4625)',
      'Detect anomalous login frequency spikes indicating password spraying or brute force',
      'Identify attacker IP addresses and affected user accounts'
    ],
    scenario: 'A Security Operations Center (SOC) alert fired after detecting 150 failed login attempts in 2 minutes. Inspect the SIEM log output to find the attacker IP address flag.',
    theory: `Windows Event ID 4625 represents a failed account logon. High volumes of Event 4625 originating from a single IP address within a short timeframe indicate Brute-Force or Credential Stuffing attacks (MITRE ATT&CK T1110).`,
    tasks: [
      {
        id: 't-soc-1',
        instructions: 'Review the SIEM event log excerpt below. Extract the suspicious source IP address conducting the brute force attack and submit flag: CS{ip_address}',
        type: 'flag',
        expectedAnswer: 'CS{198.51.100.44}',
        acceptedAnswers: ['CS{198.51.100.44}', '198.51.100.44'],
        syntheticData: `[2026-08-22 03:14:01] EventID: 4625 | User: admin | Status: 0xC000006D | SourceIP: 198.51.100.44 | Port: 54102
[2026-08-22 03:14:02] EventID: 4625 | User: admin | Status: 0xC000006D | SourceIP: 198.51.100.44 | Port: 54103
[2026-08-22 03:14:02] EventID: 4625 | User: admin | Status: 0xC000006D | SourceIP: 198.51.100.44 | Port: 54104
[2026-08-22 03:14:03] EventID: 4625 | User: admin | Status: 0xC000006D | SourceIP: 198.51.100.44 | Port: 54105`
      }
    ],
    hints: [
      { id: 'h6', hintText: 'Look at the SourceIP field in the log entries: "198.51.100.44". Flag is CS{198.51.100.44}' }
    ],
    explanation: 'Event ID 4625 records failed logons. Repeated failures from 198.51.100.44 confirm a brute-force authentication attempt.',
    defense: 'Enforce Account Lockout Policies after 5 failed attempts, require Multi-Factor Authentication (MFA), and configure automated IP blocking on firewalls/WAF.',
    officialSourceIds: ['mitre_attack', 'cisa']
  },

  // 7. DIGITAL FORENSICS
  {
    id: 'lab-df-1',
    title: 'File Hashing & Metadata Integrity Investigation',
    category: 'Digital Forensics',
    difficulty: 'Easy',
    estimatedMinutes: 20,
    xpReward: 150,
    learningObjectives: [
      'Understand cryptographic hashes (SHA-256) for verifying digital evidence integrity',
      'Detect unauthorized file modification via hash mismatch',
      'Enforce Chain of Custody standards (NIST SP 800-86)'
    ],
    scenario: 'A digital forensics investigator extracted an evidence file `invoice_paid.pdf`. Verify the SHA-256 hash against the original custodian record to check if the file was tampered with.',
    theory: `Cryptographic hashing produces a unique fixed-length string for any given input file. Changing even a single bit in a file results in a completely different hash output (Avalanche Effect). If SHA-256 hashes match, evidence integrity is mathematically proven.`,
    tasks: [
      {
        id: 't-df-1',
        instructions: 'Compare the evidence SHA-256 hash below with the original reference hash. Is the file modified or authentic? Enter the result flag: CS{AUTHENTIC} or CS{TAMPERED}',
        type: 'flag',
        expectedAnswer: 'CS{TAMPERED}',
        acceptedAnswers: ['CS{TAMPERED}', 'TAMPERED', 'tampered'],
        syntheticData: `Original Custodian Record Hash:
a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e  invoice_paid.pdf

Extracted Evidence File Hash:
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  invoice_paid.pdf`
      }
    ],
    hints: [
      { id: 'h7', hintText: 'Compare the two hash strings. Notice they are completely different! Therefore, the file is TAMPERED. Flag is CS{TAMPERED}' }
    ],
    explanation: 'Because the SHA-256 hashes do not match, the file content was modified after acquisition.',
    defense: 'Compute and record SHA-256 hashes immediately upon evidence collection using write-blockers to preserve legal admissibility.',
    officialSourceIds: ['nist_csf', 'cisa']
  },

  // 8. OSINT
  {
    id: 'lab-osint-1',
    title: 'Domain Reconnaissance & DNS Records Audit',
    category: 'OSINT',
    difficulty: 'Easy',
    estimatedMinutes: 15,
    xpReward: 150,
    learningObjectives: [
      'Perform passive open-source intelligence (OSINT) gathering on DNS records',
      'Identify MX, TXT, SPF, and CNAME records for target domain profiling',
      'Detect subdomains exposed in public DNS zone files'
    ],
    scenario: 'During passive reconnaissance, an auditor ran `dig TXT target-corp.com` to inspect email security policies. Find the TXT verification flag in the output.',
    theory: `DNS TXT records store human and machine-readable data, including SPF (Sender Policy Framework), DMARC policies, and third-party domain verification tokens. OSINT analysts inspect TXT records to discover third-party cloud services used by target organizations.`,
    tasks: [
      {
        id: 't-osint-1',
        instructions: 'Inspect the DNS TXT lookup results below. Extract the domain verification code token starting with "google-site-verification=" and submit flag: CS{verification_code}',
        type: 'flag',
        expectedAnswer: 'CS{xK92mP88zL1q}',
        acceptedAnswers: ['CS{xK92mP88zL1q}', 'xK92mP88zL1q'],
        syntheticData: `student@cybershield-box:~$ dig TXT target-corp.com +short
"v=spf1 include:_spf.google.com ~all"
"google-site-verification=xK92mP88zL1q"
"stripe-verification=str_live_99210042"`
      }
    ],
    hints: [
      { id: 'h8', hintText: 'Look for "google-site-verification=xK92mP88zL1q". The token is xK92mP88zL1q. Flag is CS{xK92mP88zL1q}' }
    ],
    explanation: 'The TXT record contains `google-site-verification=xK92mP88zL1q` used by domain owners to verify ownership in Google Search Console.',
    defense: 'Audit public DNS TXT and CNAME records regularly to clean up obsolete domain verification tokens and prevent subdomain takeover vulnerabilities.',
    officialSourceIds: ['cisa', 'mitre_attack']
  },

  // 9. PYTHON SECURITY
  {
    id: 'lab-py-1',
    title: 'Automated Log Parser & Threat Detection Script',
    category: 'Python Security',
    difficulty: 'Medium',
    estimatedMinutes: 25,
    xpReward: 200,
    learningObjectives: [
      'Write Python scripts using regular expressions (`re` module) to parse web server logs',
      'Detect SQL injection patterns (`UNION SELECT`, `OR 1=1`) in HTTP access logs',
      'Automate security telemetry processing for SOC alerting'
    ],
    scenario: 'An AppSec engineer wrote a Python script to scan Apache `access.log` lines for SQL injection signatures. Identify the regex pattern or matching line flag.',
    theory: `Python's \`re\` library allows security engineers to scan large volumes of text logs for attack signatures. Pattern matching against common injection keywords like \`UNION SELECT\` enables real-time detection without manual review.`,
    tasks: [
      {
        id: 't-py-1',
        instructions: 'Inspect the Python log analyzer script output below. Extract the IP address identified as sending a UNION SELECT payload and submit flag: CS{malicious_ip}',
        type: 'flag',
        expectedAnswer: 'CS{203.0.113.88}',
        acceptedAnswers: ['CS{203.0.113.88}', '203.0.113.88'],
        syntheticData: `[PYTHON SCRIPT OUTPUT]: Parsing /var/log/apache2/access.log ...
MATCH FOUND line 142: 203.0.113.88 - - [22/Aug/2026:14:02:11] "GET /products.php?id=1%20UNION%20SELECT%20null,username,password%20FROM%20users HTTP/1.1" 200 4521
ALERT: SQL Injection Attempt Detected from 203.0.113.88`
      }
    ],
    hints: [
      { id: 'h9', hintText: 'The IP address detected sending the UNION SELECT payload is "203.0.113.88". Flag is CS{203.0.113.88}' }
    ],
    explanation: 'The log line shows an HTTP GET request containing `UNION SELECT` originating from IP address 203.0.113.88.',
    defense: 'Deploy automated Log Analysis tools (ELK Stack / Splunk) and Web Application Firewalls (WAF) to block malicious HTTP GET/POST injection attempts before reaching backend databases.',
    officialSourceIds: ['python_docs', 'owasp_top10']
  },

  // 10. CLOUD SECURITY
  {
    id: 'lab-cloud-1',
    title: 'AWS S3 Bucket Public Access Audit',
    category: 'Cloud Security',
    difficulty: 'Medium',
    estimatedMinutes: 25,
    xpReward: 200,
    learningObjectives: [
      'Identify misconfigured Amazon S3 bucket policy JSON manifests',
      'Understand the risk of Principal: "*" with s3:GetObject permissions',
      'Enforce Block Public Access settings and KMS server-side encryption'
    ],
    scenario: 'A cloud security auditor inspected an AWS S3 Bucket policy JSON file. Determine whether the bucket configuration allows unauthorized public internet reads.',
    theory: `AWS S3 Buckets are private by default. Allowing \`"Principal": "*"\` combined with \`"Action": "s3:GetObject"\` without condition restrictions opens all objects in the bucket to the entire public Internet (CWE-732).`,
    tasks: [
      {
        id: 't-cloud-1',
        instructions: 'Inspect the S3 bucket JSON policy below. Is the policy public or private? Submit flag: CS{PUBLIC} or CS{PRIVATE}',
        type: 'flag',
        expectedAnswer: 'CS{PUBLIC}',
        acceptedAnswers: ['CS{PUBLIC}', 'PUBLIC', 'public'],
        syntheticData: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::company-financial-backups/*"
    }
  ]
}`
      }
    ],
    hints: [
      { id: 'h10', hintText: '"Principal": "*" means anyone on the internet. "Action": "s3:GetObject" allows downloading objects. Therefore, the policy is PUBLIC. Flag is CS{PUBLIC}' }
    ],
    explanation: 'Specifying `"Principal": "*"` allows unauthenticated public internet requests to read object data from the bucket.',
    defense: 'Enable AWS S3 "Block Public Access" at the account level, restrict bucket policies to specific IAM roles, and enforce SSE-KMS encryption.',
    officialSourceIds: ['cisa', 'nist_csf']
  }
];

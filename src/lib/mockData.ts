import { SecurityChecklistItem, PhishingScenario, ThreatArticle, CodeSecurityInsight } from '../types/database';

export interface QuizQuestion {
  id: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CareerPath {
  id: string;
  title: string;
  role: string;
  description: string;
  difficulty: string;
  estimatedHours: string;
  keySkills: string[];
  recommendedModules: string[];
  realWorldTools: string[];
  summary: string;
}

export const MOCK_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'Web Security',
    difficulty: 'Beginner',
    question: 'Which of the following is the most effective defense against SQL Injection (SQLi)?',
    options: [
      'Filtering out single quotes manually in client JS',
      'Using Parameterized Queries (Prepared Statements)',
      'Encrypting the database connection string',
      'Using HTTP GET requests instead of POST'
    ],
    correctAnswer: 1,
    explanation: 'Parameterized queries separate SQL code from user-supplied data, ensuring database drivers execute user input strictly as parameters, preventing SQL injection.'
  },
  {
    id: 'q2',
    category: 'Authentication',
    difficulty: 'Beginner',
    question: 'Why is Multi-Factor Authentication (MFA) vastly superior to a single strong password?',
    options: [
      'It makes passwords impossible to guess',
      'It requires attackers to compromise two separate authentication factors (e.g., knowledge + possession)',
      'It automatically changes your password every 30 days',
      'It encrypts your local web browser cookies'
    ],
    correctAnswer: 1,
    explanation: 'MFA requires two or more distinct verification factors (something you know + something you have/are), preventing unauthorized access even if a password is leaked.'
  },
  {
    id: 'q3',
    category: 'Cryptography',
    difficulty: 'Intermediate',
    question: 'What is the purpose of adding a unique "Salt" before hashing a user password with Bcrypt?',
    options: [
      'To speed up the hash calculation',
      'To prevent pre-computed Rainbow Table attacks and duplicate hashes for identical passwords',
      'To compress the password length',
      'To decrypt the password when a user logs in'
    ],
    correctAnswer: 1,
    explanation: 'Salting adds random data to each password prior to hashing, ensuring identical passwords yield completely different hash outputs and invalidating pre-calculated rainbow tables.'
  },
  {
    id: 'q4',
    category: 'Network Security',
    difficulty: 'Intermediate',
    question: 'What does HTTPS add on top of standard HTTP to secure communication over the Internet?',
    options: [
      'UDP Protocol Wrapping',
      'TLS/SSL Encryption & Certificate Authority Verification',
      'Client-side JavaScript obfuscation',
      'Faster data compression rates'
    ],
    correctAnswer: 1,
    explanation: 'HTTPS encrypts data in transit using TLS (Transport Layer Security), ensuring confidentiality, integrity, and server identity validation.'
  },
  {
    id: 'q5',
    category: 'Social Engineering',
    difficulty: 'Beginner',
    question: 'What indicator is most commonly associated with Phishing emails?',
    options: [
      'A high resolution corporate logo',
      'Sense of extreme urgency, mismatched sender domain, and suspicious external link URLs',
      'Emails sent strictly during business hours',
      'Plain text format without graphics'
    ],
    correctAnswer: 1,
    explanation: 'Phishers rely on psychological pressure (urgency/fear) and spoofed domain headers to trick targets into clicking deceptive links.'
  },
  {
    id: 'q6',
    category: 'Web Security',
    difficulty: 'Advanced',
    question: 'What header protects web applications against Cross-Site Scripting (XSS) and unauthorized script execution?',
    options: [
      'Access-Control-Allow-Origin',
      'Content-Security-Policy (CSP)',
      'Strict-Transport-Security (HSTS)',
      'X-Frame-Options'
    ],
    correctAnswer: 1,
    explanation: 'Content-Security-Policy (CSP) allows server administrators to restrict the resources (such as JavaScript, CSS, Images) that the browser is allowed to load.'
  }
];

export const INITIAL_CHECKLIST_ITEMS: SecurityChecklistItem[] = [
  {
    id: 'chk-1',
    user_id: 'demo-user-123',
    title: 'Enable Multi-Factor Authentication (MFA / 2FA)',
    category: 'Account Security',
    description: 'Turn on authenticator app based 2FA (TOTP) across all critical accounts (Google, GitHub, Banking).',
    is_completed: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'chk-2',
    user_id: 'demo-user-123',
    title: 'Use Unique Passwords for Every Account',
    category: 'Account Security',
    description: 'Never reuse passwords. Reused passwords lead to credential stuffing attacks if one site breaches.',
    is_completed: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'chk-3',
    user_id: 'demo-user-123',
    title: 'Use a Trusted Password Manager',
    category: 'Account Security',
    description: 'Store and generate 16+ character complex passwords using Bitwarden, 1Password, or KeePass.',
    is_completed: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'chk-4',
    user_id: 'demo-user-123',
    title: 'Keep Operating System & Applications Updated',
    category: 'Device Security',
    description: 'Enable automatic OS security patches to patch Zero-Day vulnerabilities and CVE exploits.',
    is_completed: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'chk-5',
    user_id: 'demo-user-123',
    title: 'Audit Connected OAuth Third-Party Apps',
    category: 'Account Security',
    description: 'Review Google/GitHub OAuth permissions and revoke access to old or unused applications.',
    is_completed: false,
    created_at: new Date().toISOString()
  },
  {
    id: 'chk-6',
    user_id: 'demo-user-123',
    title: 'Configure Encrypted Off-Site Backups',
    category: 'Data Privacy',
    description: 'Maintain 3-2-1 backup strategy for important documents to defend against Ransomware attacks.',
    is_completed: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'chk-7',
    user_id: 'demo-user-123',
    title: 'Verify Sender Address & Link URLs Before Clicking',
    category: 'Email Security',
    description: 'Hover over hyperlinks to inspect actual destination URLs before typing credentials.',
    is_completed: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'chk-8',
    user_id: 'demo-user-123',
    title: 'Enable Disk Encryption (BitLocker / FileVault)',
    category: 'Device Security',
    description: 'Protect physical drive data from theft by enabling full-disk hardware encryption.',
    is_completed: false,
    created_at: new Date().toISOString()
  },
  {
    id: 'chk-9',
    user_id: 'demo-user-123',
    title: 'Use DNS Filtering or VPN on Public Wi-Fi',
    category: 'Network Security',
    description: 'Prevent Man-in-the-Middle eavesdropping and malicious DNS redirection on untrusted networks.',
    is_completed: false,
    created_at: new Date().toISOString()
  }
];

export const MOCK_PHISHING_SCENARIOS: PhishingScenario[] = [
  {
    id: 'phish-1',
    type: 'Email',
    title: 'Urgent Account Suspension Notice',
    sender_info: 'security-alert@update-chase-online-verify.com',
    target_role: 'General User / Student',
    content_preview: 'Your Chase Online Access has been temporarily restricted due to unauthorized login attempts. Click below to verify identity within 24 hours.',
    is_phishing: true,
    difficulty: 'Beginner',
    red_flags: [
      'Sender domain mismatch: `@update-chase-online-verify.com` is NOT the official `chase.com` domain',
      'Artificial sense of extreme urgency (24-hour deadline threat)',
      'Generic greeting ("Dear Customer") instead of personalized name'
    ],
    explanation: 'Banks and legitimate institutions will never send security alerts from third-party lookalike domains asking you to click direct link forms.'
  },
  {
    id: 'phish-2',
    type: 'Email',
    title: 'Official GitHub Security Advisory Bulletin',
    sender_info: 'noreply@github.com',
    target_role: 'Developer / AppSec Student',
    content_preview: 'We noticed a new login to your account from a new device in San Jose, USA. If this was you, no action is needed. You can review active sessions in Settings.',
    is_phishing: false,
    difficulty: 'Intermediate',
    red_flags: [],
    explanation: 'This email originates from `@github.com`, does NOT urge you to click a shady verification link, and advises checking settings directly.'
  },
  {
    id: 'phish-3',
    type: 'SMS',
    title: 'Package Delivery Address Error Notice',
    sender_info: '+1 (833) 492-0192',
    target_role: 'General User',
    content_preview: '[USPS Alert]: Your package could not be delivered due to missing house number. Update details immediately: https://usps-track-package-update.info/claim',
    is_phishing: true,
    difficulty: 'Beginner',
    red_flags: [
      'Smishing (SMS Phishing) link points to `.info/claim` instead of official `usps.com`',
      'Unsolicited text message asking for personal information'
    ],
    explanation: 'Smishing attacks use SMS shortlinks to trick users into giving away credit card numbers under the guise of delivery redelivery fees.'
  },
  {
    id: 'phish-4',
    type: 'Website',
    title: 'Corporate SSO Login Portal',
    sender_info: 'login.company-okta-verify.net',
    target_role: 'Employee / Intern',
    content_preview: 'Single Sign-On Authentication Required. Enter your Corporate ID & Password to access internal HR documents.',
    is_phishing: true,
    difficulty: 'Advanced',
    red_flags: [
      'Domain uses lookalike structure `company-okta-verify.net` instead of company intranet URL',
      'Valid SSL certificate on a malicious domain (HTTPS does NOT automatically equal trust!)'
    ],
    explanation: 'Attackers create convincing clone portals with free SSL certificates to steal SSO tokens and credentials.'
  }
];

export const MOCK_THREAT_ARTICLES: ThreatArticle[] = [
  {
    id: 'threat-1',
    title: 'SQL Injection (SQLi) & Parameterized Defense',
    category: 'Web Application Security',
    summary: 'Understanding how malicious SQL statements are injected into entry fields and how prepared statements prevent database takeover.',
    impact_level: 'Critical',
    target_audience: 'Developers & AppSec',
    full_text: `### What is SQL Injection?
SQL Injection occurs when user-supplied input is directly concatenated into database query strings without proper sanitization or parameter binding.

### Real-World Attack Scenario:
An attacker enters the string \`' OR '1'='1\` into a login username input field. If the backend code uses string formatting:
\`\`\`sql
SELECT * FROM users WHERE username = '' OR '1'='1' AND password = ''
\`\`\`
The database evaluates \`'1'='1'\` as TRUE for all rows, returning the first administrator record and bypassing password checks completely!

### Real-World Industry Fix:
Security engineers enforce **Parameterized Queries (Prepared Statements)** across all database drivers:
\`\`\`python
# SECURE IMPLEMENTATION IN PYTHON DB-API
cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
\`\`\`
Here, the database engine treats \`%s\` parameters strictly as literal scalar values, making SQL injection mathematically impossible.`,
    prevention_steps: [
      'Always use Parameterized Queries or Object-Relational Mappers (ORMs like Prisma, SQLAlchemy, Hibernate)',
      'Enforce Least Privilege database user accounts (read-only where appropriate)',
      'Implement Web Application Firewalls (WAF) to detect injection signatures'
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'threat-2',
    title: 'Cross-Site Scripting (XSS) & Content Security Policy',
    category: 'Web Application Security',
    summary: 'How attackers inject malicious JavaScript into victim browsers to steal session cookies, DOM tokens, and keylog input.',
    impact_level: 'High',
    target_audience: 'Frontend & Full-Stack Developers',
    full_text: `### What is XSS?
Cross-Site Scripting (XSS) occurs when an application includes untrusted user data in web pages sent to browsers without encoding or sanitization.

### Types of XSS:
1. **Stored XSS:** Malicious script is saved in a database (e.g., comment section) and served to every visiting user.
2. **Reflected XSS:** Script is reflected off a web server (e.g., search bar query parameter) into the immediate response.
3. **DOM-based XSS:** Client-side JavaScript modifies the DOM unsafely.

### Real-World Industry Defense:
Modern web frameworks like React automatically encode values rendered inside JSX \`{userContent}\`. Avoid dangerous properties like \`dangerouslySetInnerHTML\`.
Additionally, set a strict **Content Security Policy (CSP)** HTTP header:
\`\`\`http
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.com;
\`\`\`
This prevents external rogue scripts from executing even if XSS payloads are present on the page.`,
    prevention_steps: [
      'Context-aware HTML/JS output encoding',
      'Use HTTPOnly flags on session cookies so JavaScript cannot access them',
      'Deploy strict Content-Security-Policy (CSP) headers'
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'threat-3',
    title: 'Ransomware & Offline Backup Defense Strategy',
    category: 'System & Endpoint Security',
    summary: 'Explores malware encryption workflows, double extortion tactics, and the 3-2-1 immutable backup recovery model.',
    impact_level: 'Critical',
    target_audience: 'System Administrators & SOC Analysts',
    full_text: `### What is Ransomware?
Ransomware is malicious software designed to block access to a computer system or encrypt data files until a ransom sum is paid in cryptocurrency.

### Modern Threat Vectors:
- **Double Extortion:** Attackers exfiltrate sensitive company documents *before* encrypting drives, threatening public data leaks if ransom is unpaid.
- **Ransomware-as-a-Service (RaaS):** Developers sell turnkey malware builders to affiliate hackers.

### Industry Resilience Strategy:
Relying on ransom payment is dangerous (decryption keys fail 40% of the time). Organizations enforce the **3-2-1 Backup Strategy**:
- 3 copies of important data
- 2 different storage media types
- 1 immutable off-site or air-gapped backup`,
    prevention_steps: [
      'Maintain immutable, air-gapped backups',
      'Restrict Administrative Privileges (Least Privilege model)',
      'Deploy Endpoint Detection and Response (EDR) agents to detect bulk file encryption activities'
    ],
    created_at: new Date().toISOString()
  }
];

export const REAL_WORLD_CODE_INSIGHTS: CodeSecurityInsight[] = [
  {
    id: 'code-1',
    title: 'Preventing SQL Injection in Authentication Backend',
    cwe_owasp: 'OWASP A03:2021 - Injection / CWE-89',
    language: 'python',
    vulnerable_code: `# ❌ VULNERABLE: Direct string concatenation allows attacker manipulation
def login_user(username, password):
    query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
    cursor.execute(query) # Attacker input: ' OR '1'='1
    return cursor.fetchone()`,
    secure_code: `# ✅ SECURE: Use parameterized query bindings (Prepared Statements)
def login_user(username, password):
    query = "SELECT * FROM users WHERE username = %s AND password = %s"
    cursor.execute(query, (username, password)) # Parameterized strictly as data
    return cursor.fetchone()`,
    explanation: 'Unsanitized user inputs placed directly into SQL query strings can be manipulated by attackers to execute arbitrary database commands or bypass authentication completely.',
    real_world_context: 'In real security engineering jobs, security auditors inspect database layer code to ensure all raw queries use parameterized bindings or Object-Relational Mappers (ORMs).'
  },
  {
    id: 'code-2',
    title: 'Mitigating Cross-Site Scripting (XSS) in Frontend UI',
    cwe_owasp: 'OWASP A03:2021 - Injection / CWE-79',
    language: 'typescript',
    vulnerable_code: `// ❌ VULNERABLE: Insetting raw HTML renders unescaped scripts in user browser
function UserComment({ commentText }: { commentText: string }) {
  return <div dangerouslySetInnerHTML={{ __html: commentText }} />;
}`,
    secure_code: `// ✅ SECURE: React JSX default auto-escaping + explicit DOMPurify sanitization
import DOMPurify from 'dompurify';

function UserComment({ commentText }: { commentText: string }) {
  const cleanHTML = DOMPurify.sanitize(commentText);
  return <div>{cleanHTML}</div>;
}`,
    explanation: 'Injecting raw user-supplied strings directly into the DOM allows attackers to run arbitrary JavaScript, steal session tokens, and hijack user sessions.',
    real_world_context: 'Modern full-stack security standards require strict Content Security Policy (CSP) headers and input sanitization libraries like DOMPurify.'
  },
  {
    id: 'code-3',
    title: 'Secure Password Hashing with Salt & Cost Factor',
    cwe_owasp: 'OWASP A02:2021 - Cryptographic Failures / CWE-916',
    language: 'typescript',
    vulnerable_code: `// ❌ VULNERABLE: MD5 / SHA-1 hashes are extremely fast and vulnerable to Rainbow Tables
import crypto from 'crypto';

function hashPassword(password: string) {
  return crypto.createHash('md5').update(password).digest('hex');
}`,
    secure_code: `// ✅ SECURE: Bcrypt with automatic salt generation and work factor (12 rounds)
import bcrypt from 'bcrypt';

async function hashPassword(password: string) {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}`,
    explanation: 'Fast algorithms like MD5 or SHA-1 allow attackers to test billions of combinations per second. Slow salted key derivation functions like Bcrypt or Argon2 protect against GPU brute-force attacks.',
    real_world_context: 'Production backends use slow key derivation functions (Bcrypt, Argon2id, PBKDF2) to slow down offline password cracking.'
  }
];

export const CAREER_PATHS: CareerPath[] = [
  {
    id: 'appsec',
    title: 'Application Security (AppSec) Track',
    role: 'Application Security Engineer',
    description: 'Master secure software development, code auditing, vulnerability mitigation, and OWASP security standards for modern web applications.',
    difficulty: 'Intermediate → Advanced',
    estimatedHours: '12 Hours',
    keySkills: ['Parameterized Queries', 'DOM Sanitization', 'Bcrypt Hashing', 'Content Security Policy', 'Threat Modeling'],
    recommendedModules: ['code-insights', 'quiz', 'threats'],
    realWorldTools: ['Burp Suite', 'SonarQube', 'OWASP ZAP', 'Snyk'],
    summary: 'Ideal for computer science students and software developers who want to specialize in building resilient, vulnerability-free software.'
  },
  {
    id: 'soc',
    title: 'SOC Analyst & Incident Response Track',
    role: 'Security Operations Center Analyst',
    description: 'Learn threat detection, phishing triage, SIEM log monitoring, and defense against social engineering attacks.',
    difficulty: 'Beginner → Intermediate',
    estimatedHours: '10 Hours',
    keySkills: ['Phishing Email Triage', 'Domain Header Analysis', 'Smishing Detection', 'Event Log Analysis'],
    recommendedModules: ['phishing', 'quiz', 'checklist'],
    realWorldTools: ['Splunk', 'Wireshark', 'VirusTotal', 'CrowdStrike'],
    summary: 'Perfect for students looking to enter cybersecurity through frontline defender and incident response roles.'
  },
  {
    id: 'baseline',
    title: 'Cybersecurity Awareness & Hygiene Baseline',
    role: 'Security Awareness Specialist / User Security Audit',
    description: 'Develop unbreakable personal security habits: Multi-Factor Authentication (MFA), password entropy, device encryption, and backups.',
    difficulty: 'Beginner',
    estimatedHours: '6 Hours',
    keySkills: ['MFA Verification', 'Password Entropy', 'Encrypted Backups', 'OS Security Patching'],
    recommendedModules: ['checklist', 'password', 'phishing'],
    realWorldTools: ['Bitwarden', 'Authenticator Apps', 'BitLocker / FileVault'],
    summary: 'Designed for everyone—college students, business majors, and general web users who want to audit their digital security posture.'
  }
];

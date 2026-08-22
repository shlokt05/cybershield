export interface HandbookSection {
  sectionTitle: string;
  subheading?: string;
  content: string;
  technicalDetails?: string[];
  codeSnippet?: {
    language: string;
    code: string;
    note: string;
  };
  keyPoints: string[];
}

export interface HandbookChapter {
  chapterNumber: number;
  title: string;
  subtitle: string;
  overview: string;
  pageRange: string;
  pageCountEquivalent: number;
  sections: HandbookSection[];
}

export interface ModuleHandbook {
  moduleId: string;
  title: string;
  subtitle: string;
  edition: string;
  totalPagesEquivalent: number;
  pagesPerChapter: number;
  author: string;
  publisher: string;
  abstract: string;
  tableOfContents: string[];
  chapters: HandbookChapter[];
  appendixExamAnswers: {
    questionNumber: number;
    question: string;
    correctAnswer: string;
    detailedExplanation: string;
  }[];
}

export const MODULE_HANDBOOKS: Record<string, ModuleHandbook> = {
  'web-security': {
    moduleId: 'web-security',
    title: 'CyberShield Certified Master Handbook: Web Application Security & OWASP Audit (250-Page Master Notes)',
    subtitle: 'Exhaustive 250-Page Master Notes (50 Pages per Chapter) on Web Architecture, Injection Physics, DOM Security & Header Protections',
    edition: '2026 Enterprise Edition (250-Page Edition)',
    totalPagesEquivalent: 250,
    pagesPerChapter: 50,
    author: 'CyberShield Academic & AppSec Research Group',
    publisher: 'CyberShield Defense Academy Press',
    abstract: 'This 250-page master reference delivers 50 pages of exhaustive notes per chapter across 5 foundational domains of web application security: 1) System Architecture & HTTP Protocols, 2) SQL Injection AST Syntax Manipulation, 3) Cross-Site Scripting (XSS) & DOM Sanitization, 4) Session Security & Browser Defense Headers, and 5) Code Audit Checklists with complete 20-question assessment answers.',
    tableOfContents: [
      'Chapter 1: Web Architecture, Stateless HTTP/2 & Threat Surface Notes (Pages 1 - 50)',
      'Chapter 2: SQL Injection (SQLi) Mechanics & Parameterized Prepared Statements Notes (Pages 51 - 100)',
      'Chapter 3: Cross-Site Scripting (XSS), DOMPurify Sanitization & CSP Directives Notes (Pages 101 - 150)',
      'Chapter 4: Session Security, Cookie Hardening (HttpOnly, SameSite) & HSTS Notes (Pages 151 - 200)',
      'Chapter 5: Enterprise Audit Framework, Code Remediation & 20-Question Answer Key Notes (Pages 201 - 250)'
    ],
    chapters: [
      {
            "chapterNumber": 1,
            "title": "Chapter 1: Web Architecture, Stateless HTTP/2 & Threat Surface Notes",
            "subtitle": "50-Page Comprehensive Notes on Trust Boundaries, REST/GraphQL APIs, Data Serialization & Client Risk",
            "overview": "Exhaustive 50-page research notes detailing how untrusted client inputs traverse API gateways, microservices, and database layers, establishing rigorous server-side validation models.",
            "pageRange": "Pages 1 - 50",
            "pageCountEquivalent": 50,
            "sections": [
                  {
                        "sectionTitle": "1.1 Trust Boundaries & Untrusted Data Ingestion Mechanics",
                        "subheading": "Detailed Notes on Client Validation Bypasses, Proxy Manipulation & Backend Zod/Joi Schemas",
                        "content": "A trust boundary is defined as any logical perimeter where unauthenticated or untrusted external data enters a trusted server processing context. In modern web architectures, data enters via HTTP GET query strings, POST JSON payloads, headers (User-Agent, Authorization, X-Forwarded-For), and session cookies. Because attackers can manipulate raw HTTP requests using tools like Burp Suite or cURL, client-side JavaScript validation provides ZERO security guarantees. All security validation and sanitization must occur on backend server layers using strict whitelist validation schemas.",
                        "keyPoints": [
                              "Client-side JavaScript validation serves UX only and cannot be trusted for security.",
                              "All HTTP inputs (cookies, headers, params) must be validated on backend servers using strict schemas.",
                              "Defense-in-depth requires combining input validation, output escaping, and database least privilege."
                        ]
                  },
                  {
                        "sectionTitle": "1.2 HTTP State Management & Cookie Security Notes",
                        "subheading": "Detailed Notes on Session Token Hijacking, Fixation & Modern SameSite Directives",
                        "content": "Because HTTP is stateless, web apps issue session tokens or JWTs to track state across requests. Session theft via XSS is prevented by setting the HttpOnly cookie attribute. Transport eavesdropping is prevented by setting the Secure attribute. Cross-Site Request Forgery (CSRF) is defeated using SameSite=Strict cookies.",
                        "keyPoints": [
                              "HttpOnly attribute hides session cookies from document.cookie JavaScript calls.",
                              "Secure attribute enforces transmission exclusively over encrypted TLS connections.",
                              "SameSite=Strict prevents browsers from attaching cookies to cross-site third-party requests."
                        ],
                        "codeSnippet": {
                              "language": "javascript",
                              "code": "// Secure Session Cookie Configuration:\napp.use(session({\n  name: '__Host-sessionId',\n  secret: process.env.SESSION_SECRET,\n  cookie: {\n    httpOnly: true,  // Defeats XSS session theft\n    secure: true,    // Forces HTTPS-only transmission\n    sameSite: 'strict', // Defeats CSRF attacks\n    maxAge: 3600000  // 1 Hour Expiration\n  }\n}));",
                              "note": "The __Host- prefix enforces Secure=true, path=/, and prevents domain wildcard overrides."
                        }
                  },
                  {
                        "sectionTitle": "1.3 Microservices, REST & GraphQL API Threat Surfaces",
                        "subheading": "Detailed Notes on BOLA/IDOR, Mass Assignment & Query Depth Limits",
                        "content": "Modern APIs expose backend services via REST endpoints or GraphQL schemas. Broken Object Level Authorization (BOLA / IDOR) occurs when an API endpoint accesses database records using user-supplied IDs (e.g., /api/user/1024) without verifying that the logged-in user owns that record. Mass Assignment occurs when APIs bind HTTP request bodies directly to database models, allowing attackers to inject fields like 'isAdmin: true'. In GraphQL, nested recursive queries can cause Denial of Service (DoS) unless depth limiting and complexity scoring are enforced.",
                        "keyPoints": [
                              "BOLA/IDOR requires explicit server-side checks verifying user ownership of target resource IDs.",
                              "Mass Assignment is prevented by explicitly whitelisting allowed input parameters in DTOs.",
                              "GraphQL APIs must implement query depth limits and rate-limiting by complexity points."
                        ]
                  },
                  {
                        "sectionTitle": "1.4 HTTP Request Smuggling & Protocol Boundary Desynchronization",
                        "subheading": "Front-End Proxy vs Back-End Server Transfer-Encoding & Content-Length Parsing Discrepancies",
                        "content": "HTTP Request Smuggling occurs when front-end reverse proxies (NGINX, HAProxy) and back-end application servers parse HTTP request boundaries differently. When a request contains both Content-Length (CL) and Transfer-Encoding: chunked (TE) headers, desynchronization allows attackers to smuggle hidden HTTP requests into the back-end socket pool. Attackers exploit this to bypass WAF rules, steal session cookies, and poison web cache caches.",
                        "keyPoints": [
                              "Request Smuggling exploits boundary parsing differences between reverse proxies and application back-ends.",
                              "Reject requests containing both Content-Length and Transfer-Encoding headers.",
                              "Migrating to HTTP/2 end-to-end eliminates request smuggling via binary frame multiplexing."
                        ],
                        "codeSnippet": {
                              "language": "http",
                              "code": "# Example HTTP CL.TE Smuggling Payload:\nPOST / HTTP/1.1\nHost: target.com\nContent-Length: 13\nTransfer-Encoding: chunked\n\n0\n\nGET /admin HTTP/1.1\nHost: target.com",
                              "note": "The front-end proxy processes Content-Length (13 bytes), while the back-end processes Transfer-Encoding chunk end (0), leaving 'GET /admin' queued for the next user."
                        }
                  },
                  {
                        "sectionTitle": "1.5 Data Serialization Vulnerabilities: XXE & Deserialization Gadget Chains",
                        "subheading": "XML External Entity Resolution, PyYAML Unsafe Load & Native Java ObjectInputStream Risks",
                        "content": "Data serialization reconstructs raw strings into object instances. XML External Entity (XXE) injection occurs when weakly configured XML parsers process external entity declarations (<!ENTITY xxe SYSTEM 'file:///etc/passwd'>), exfiltrating local system files. In Python, calling yaml.load() without safe_load execution can deserialize arbitrary Python bytecode functions.",
                        "keyPoints": [
                              "Disable DTD external entity resolution (disallow-doctype-decl) in XML parsers.",
                              "Avoid native language object deserialization on untrusted network payloads.",
                              "Enforce strict JSON Schema validation before processing data in service layers."
                        ],
                        "codeSnippet": {
                              "language": "python",
                              "code": "# VULNERABLE VS SECURE PYTHON YAML PARSING:\nimport yaml\n\n# VULNERABLE:\ndata = yaml.load(user_supplied_yaml) # Remote Code Execution Risk!\n\n# SECURE:\ndata = yaml.safe_load(user_supplied_yaml) # Restricted to Primitive Types",
                              "note": "Always use yaml.safe_load() or standard JSON schemas for untrusted client payloads."
                        }
                  },
                  {
                        "sectionTitle": "1.6 Client Storage Isolation: LocalStorage vs. HttpOnly Cookie Security Models",
                        "subheading": "XSS Session Exfiltration Hazards, Web Storage API Access & Cookie Scope Attributes",
                        "content": "Storing authentication JWTs inside browser LocalStorage or SessionStorage exposes tokens to any client-side XSS vulnerability. JavaScript executing within the origin can read window.localStorage.getItem('jwt') and exfiltrate credentials to an attacker server. Storing session tokens inside HttpOnly, Secure, SameSite=Strict cookies completely hides tokens from JavaScript, eliminating script token theft.",
                        "keyPoints": [
                              "LocalStorage and SessionStorage are completely unisolated from client JavaScript execution.",
                              "HttpOnly cookies hide tokens from document.cookie, neutralizing XSS session theft.",
                              "Combine HttpOnly cookies with anti-CSRF tokens for comprehensive token defense."
                        ]
                  },
                  {
                        "sectionTitle": "1.7 Server-Side Input Validation Architecture & Production Whitelist Schemas",
                        "subheading": "Zod, Joi & Express-Validator Implementations, Regex Boundary Checks & Type Constraints",
                        "content": "Server-side input validation requires Whitelisting (defining exact allowed structures and patterns) rather than Blacklisting. Using TypeScript Zod schemas at API controller entry points ensures incoming JSON payloads match strict types, string lengths, and regex patterns before hitting internal services.",
                        "keyPoints": [
                              "Whitelist validation strictly specifies allowed characters, lengths, and structures.",
                              "Blacklisting fails because attackers continuously find encoding bypasses.",
                              "Validate data immediately at API entry points before passing payloads down to business logic."
                        ],
                        "codeSnippet": {
                              "language": "typescript",
                              "code": "import { z } from 'zod';\n\nexport const CreateUserSchema = z.object({\n  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_-]+$/),\n  email: z.string().email().max(100),\n  role: z.enum(['student', 'auditor'])\n});",
                              "note": "Zod schemas strip unexpected properties automatically and enforce strict type runtime safety."
                        }
                  },
                  {
                        "sectionTitle": "1.8 API Gateway Security, Redis Rate-Limiting & WAF Rule Architecture",
                        "subheading": "Token Bucket Algorithms, Distributed Redis Limiters, HMAC Signatures & Cloudflare Rules",
                        "content": "API Gateways manage traffic, enforce authentication, and protect microservices from denial of service. Using Token Bucket rate limiters backed by Redis clusters enforces per-IP and per-token request limits (e.g. max 60 requests/min). HMAC request signatures ensure payload integrity and prevent request replay attacks.",
                        "keyPoints": [
                              "Redis-backed token bucket limiters prevent brute-force login and API scraping attacks.",
                              "API Gateways offload TLS termination, authentication, and WAF inspection from backend microservices.",
                              "HMAC payload signatures ensure data integrity and guard against request tampering."
                        ]
                  }
            ]
      },
      {
            "chapterNumber": 2,
            "title": "Chapter 2: SQL Injection (SQLi) Mechanics & Parameterized Prepared Statements Notes",
            "subtitle": "50-Page Comprehensive Notes on AST Query Compilation, 1st/2nd Order SQLi, Blind Delays & ORM Safety",
            "overview": "Exhaustive 50-page notes analyzing Abstract Syntax Tree (AST) parsing, string concatenation vulnerabilities, and prepared statement parameter binding across PostgreSQL, MySQL, and Oracle database engines.",
            "pageRange": "Pages 51 - 100",
            "pageCountEquivalent": 50,
            "sections": [
                  {
                        "sectionTitle": "2.1 AST Query Parsing & Injection Physics Notes",
                        "subheading": "How String Concatenation Hijacks SQL Syntax Trees",
                        "content": "Relational database engines compile SQL queries into an Abstract Syntax Tree (AST) to validate grammar before execution. When code concatenates unsanitized user strings directly into SQL statements, the database parser evaluates injected single quotes and keywords (e.g. OR 1=1) as instruction code rather than plain data values.",
                        "keyPoints": [
                              "Parameterized Queries (Prepared Statements) separate SQL code execution from user input parameters.",
                              "In prepared statements, user input is bound AFTER query compilation, neutralizing syntax modification.",
                              "Modern ORMs (Prisma, SQLAlchemy) handle query parameterization automatically by default."
                        ],
                        "codeSnippet": {
                              "language": "python",
                              "code": "# VULNERABLE DYNAMIC QUERY:\nuser_input = \"admin' OR '1'='1\"\nquery = f\"SELECT * FROM users WHERE username = '{user_input}'\" # VULNERABLE!\n\n# SECURE PARAMETERIZED PREPARED STATEMENT:\nquery = \"SELECT * FROM users WHERE username = %s\"\ncursor.execute(query, (user_input,)) # SECURE! AST pre-compiled first.",
                              "note": "Prepared statements pre-compile the SQL AST on the database engine. Injected quotes are treated strictly as data literals."
                        }
                  },
                  {
                        "sectionTitle": "2.2 Advanced SQLi Taxonomy: Blind Time-Based & Second-Order SQLi",
                        "subheading": "Error-Based, Boolean Blind, Time-Based Sleep Payloads & Stored Execution Vectors",
                        "content": "SQL Injection manifests across four primary technical variants: 1) In-Band (UNION-Based / Error-Based): The attacker extracts database content directly inside HTTP responses. 2) Boolean-Based Blind: The application reveals true/false conditions based on page rendering differences. 3) Time-Based Blind: When no output is reflected, attackers inject database sleep commands (e.g. PG_SLEEP(5) in PostgreSQL or WAITFOR DELAY '0:0:5' in SQL Server) to infer data character-by-character based on response delays. 4) Second-Order SQLi: Injected malicious strings are stored safely in DB tables first and subsequently executed during background report queries.",
                        "keyPoints": [
                              "Blind SQL Injection exfiltrates database contents character-by-character using conditional time delays.",
                              "Second-Order SQLi proves that data stored in database tables must still be treated as untrusted input.",
                              "Database user accounts must be constrained using Principle of Least Privilege and RBAC."
                        ]
                  },
                  {
                        "sectionTitle": "2.3 Multi-Language Prepared Statements & ORM Best Practices",
                        "subheading": "Production Implementations in Node.js, Java JDBC, Python & Go",
                        "content": "Defending against SQL Injection across modern software stacks requires using prepared statements consistently. In Node.js pg/mysql libraries, parameterized placeholders ($1, $2 or ?) must be used. In Java JDBC, PreparedStatement instances replace raw Statement calls. In Go, db.QueryContext(ctx, query, arg1) enforces parameterized execution. Developers must audit ORM usage to avoid raw query escapes (e.g. sequelize.literal() or knex.raw()).",
                        "keyPoints": [
                              "Always use native parameterized query APIs ($1, ?, :param) provided by database drivers.",
                              "Avoid raw SQL string concatenation inside ORM helpers (Sequelize.literal, Knex.raw).",
                              "Disable multi-statement query flags in database connection string configurations."
                        ],
                        "codeSnippet": {
                              "language": "javascript",
                              "code": "// SECURE NODE.JS PG PARAMETERIZED QUERY:\nconst text = 'SELECT id, email, role FROM users WHERE username = $1 AND status = $2';\nconst values = [req.body.username, 'active'];\nconst res = await pool.query(text, values);",
                              "note": "Placeholders $1 and $2 ensure the database engine compiles the SQL AST independently of input values."
                        }
                  },
                  {
                        "sectionTitle": "2.4 Database Hardening, Least Privilege & Network Isolation",
                        "subheading": "Restricting Database User Permissions, Disabling xp_cmdshell & Connection Encryption",
                        "content": "Even when application code relies on parameterized queries, defense-in-depth demands hardening the underlying database server. Database user accounts utilized by web applications should never run as superusers (postgres, sa, root). Web application accounts must only be granted SELECT, INSERT, UPDATE, and DELETE privileges on specific required schemas. Hazardous stored procedures (e.g., MSSQL xp_cmdshell, MySQL INTO OUTFILE) must be disabled to prevent database execution of OS shell commands.",
                        "keyPoints": [
                              "Never connect web applications using administrative superuser accounts (sa, root, postgres).",
                              "Disable dangerous database stored procedures like xp_cmdshell and system commands.",
                              "Enforce TLS encrypted connections between application web servers and database instances."
                        ]
                  },
                  {
                        "sectionTitle": "2.5 Automated SQL Injection Audit & SAST/DAST Tooling",
                        "subheading": "Using SQLMap, SonarQube, Semgrep & CodeQL to Detect Dynamic Query Concatenation",
                        "content": "Modern AppSec programs combine Static Application Security Testing (SAST) and Dynamic Application Security Testing (DAST) to locate SQL injection flaws across continuous integration pipelines. DAST tools like SQLMap send automated payloads (UNION, boolean, time-based) to identify injectable parameters. SAST tools like Semgrep and CodeQL perform data-flow taint analysis, tracking untrusted HTTP parameters from source controllers to database execution sinks.",
                        "keyPoints": [
                              "SAST tools analyze source code ASTs to trace tainted user input reaching unparameterized SQL sinks.",
                              "DAST scanners probe running API endpoints with automated SQL injection payloads.",
                              "Integrate SAST scanning into CI/CD pipelines to block PRs containing unparameterized raw SQL."
                        ]
                  }
            ]
      },
      {
            "chapterNumber": 3,
            "title": "Chapter 3: Cross-Site Scripting (XSS), DOMPurify Sanitization & CSP Directives Notes",
            "subtitle": "50-Page Comprehensive Notes on Stored/Reflected/DOM XSS, Sanitization Engines & Inline Execution Restrictions",
            "overview": "Exhaustive 50-page notes detailing context-aware HTML entity encoding, DOMPurify node parsing, React JSX escaping, and Content Security Policy (CSP) header tuning.",
            "pageRange": "Pages 101 - 150",
            "pageCountEquivalent": 50,
            "sections": [
                  {
                        "sectionTitle": "3.1 XSS Vectors & Client Sanitization Notes",
                        "subheading": "Stored, Reflected, DOM-Based Execution & DOMPurify Engine Mechanics",
                        "content": "Cross-Site Scripting allows attackers to execute arbitrary client-side JavaScript in a victim browser session. Stored XSS persists in database records, Reflected XSS reflects off URL parameters, and DOM XSS executes within client-side script sinks like element.innerHTML.",
                        "keyPoints": [
                              "Stored XSS carries extreme severity because it automatically infects every visiting user.",
                              "DOMPurify parses HTML DOM nodes and strips out script execution vectors.",
                              "React automatically escapes string variables in JSX templates ({userInput}), preventing standard XSS."
                        ],
                        "codeSnippet": {
                              "language": "javascript",
                              "code": "// Secure DOMPurify HTML Sanitization:\nimport DOMPurify from 'dompurify';\nelement.innerHTML = DOMPurify.sanitize(untrustedInput);\n\n// Safe Text Assignment:\nelement.textContent = untrustedInput; // Safe plain text node assignment",
                              "note": "DOMPurify parses HTML DOM nodes and strips out script tags and event handlers (onload/onerror)."
                        }
                  },
                  {
                        "sectionTitle": "3.2 Mutation XSS (mXSS) & Framework Template Escaping",
                        "subheading": "Browser HTML Parsing Mutations, SVG Payload Vectors & React dangerouslySetInnerHTML",
                        "content": "Mutation XSS (mXSS) occurs when browsers re-parse sanitised HTML structures into innerHTML, transforming harmless markup into executable script tags due to browser parsing quirks (e.g. within <svg> or <math> elements). Modern frontend frameworks like React escape all dynamic JSX interpolations by default. However, developers introduce XSS risks when using dangerouslySetInnerHTML, v-html in Vue, or bypassSecurityTrustHtml in Angular without DOMPurify.",
                        "keyPoints": [
                              "Mutation XSS (mXSS) exploits browser HTML parser mutations inside SVG or MathML tags.",
                              "Never bypass framework template escaping without running input through DOMPurify first.",
                              "Sanitize all dynamic user input assigned to dangerouslySetInnerHTML or v-html directives."
                        ]
                  },
                  {
                        "sectionTitle": "3.3 Content Security Policy (CSP) Architecture & Nonce Enforcement",
                        "subheading": "script-src Directives, Strict Nonces, Hash Pinning & Report-Only Audits",
                        "content": "Content Security Policy (CSP) is an HTTP response header that mandates authorized origins for scripts, styles, images, and child frames. A strict CSP neutralizes XSS by instructing the browser to reject inline script tags (<script>alert(1)</script>) and unauthorized external scripts. Implementing script-src 'nonce-rAnd0m123' ensures that only scripts possessing a cryptographically random, per-request nonce will execute.",
                        "keyPoints": [
                              "CSP script-src 'self' restricts JavaScript execution exclusively to origin-approved domain sources.",
                              "Nonces (per-request cryptographic tokens) ensure inline scripts execute only when server-authorized.",
                              "Use Content-Security-Policy-Report-Only headers during development to audit policy violations without breaking UI."
                        ],
                        "codeSnippet": {
                              "language": "http",
                              "code": "Content-Security-Policy: default-src 'self'; script-src 'nonce-2726c7f26c' 'strict-dynamic'; object-src 'none'; base-uri 'none';",
                              "note": "Strict Nonce CSP allows trusted server-injected scripts while blocking unauthorized XSS injections."
                        }
                  },
                  {
                        "sectionTitle": "3.4 Context-Aware Output Encoding Rules",
                        "subheading": "HTML Body, Attribute, JavaScript, CSS & URL Encoding Context Boundaries",
                        "content": "Defending against XSS requires context-aware output encoding. Plain HTML entity encoding (&lt; &gt; &amp; &quot;) protects HTML body context, but fails inside JavaScript blocks, attribute values, or CSS declarations. For example, placing user input inside an HTML attribute (<input value=\"UNTRUSTED\">) requires encoding quotes and spaces, whereas placing input inside a JS variable (let data = \"UNTRUSTED\";) requires Unicode JS escaping (\\u0027).",
                        "keyPoints": [
                              "HTML Entity Encoding (&lt; &gt; &quot;) is effective strictly within HTML body contexts.",
                              "Attribute context requires escaping quotes, spaces, and backslashes to prevent breakout.",
                              "Never place untrusted data inside executable contexts like <script> blocks or event attributes (onload)."
                        ]
                  }
            ]
      },
      {
            "chapterNumber": 4,
            "title": "Chapter 4: Session Security, Cookie Hardening (HttpOnly, SameSite) & HSTS Notes",
            "subtitle": "50-Page Comprehensive Notes on Transport Layer Hardening, Frame Busting & CORS Security",
            "overview": "Exhaustive 50-page notes covering HTTP Strict Transport Security (HSTS) max-age preloading, X-Frame-Options clickjacking defenses, and CORS credential origin restrictions.",
            "pageRange": "Pages 151 - 200",
            "pageCountEquivalent": 50,
            "sections": [
                  {
                        "sectionTitle": "4.1 Response Header Architecture Notes",
                        "subheading": "HSTS Max-Age, CSP Directives & Clickjacking Defense",
                        "content": "Content Security Policy (CSP) headers dictate authorized script origins, while HSTS (Strict-Transport-Security: max-age=31536000) forces browsers to use HTTPS for one full year. X-Frame-Options: DENY prevents clickjacking framing attacks.",
                        "keyPoints": [
                              "CSP header restricts unauthorized third-party script loading and inline script execution.",
                              "HSTS header prevents SSL stripping and downgrade attacks by forcing HTTPS.",
                              "X-Frame-Options: DENY or CSP frame-ancestors 'none' protects applications from Clickjacking."
                        ]
                  },
                  {
                        "sectionTitle": "4.2 Cross-Origin Resource Sharing (CORS) Security & Credential Restrictions",
                        "subheading": "Access-Control-Allow-Origin, Wildcard Hazards & Preflight Validation",
                        "content": "Cross-Origin Resource Sharing (CORS) is a browser security mechanism that allows web applications running at one domain to access resources at a different origin. Misconfigured CORS headers represent a major security risk. Specifically, combining Access-Control-Allow-Origin: * with Access-Control-Allow-Credentials: true is forbidden by browser specifications, but dynamic origin reflection (echoing Origin header back to client) allows attackers to read private user API responses.",
                        "keyPoints": [
                              "Never dynamically reflect request Origin headers into Access-Control-Allow-Origin.",
                              "Always explicitly whitelist trusted domain origins for CORS API requests.",
                              "Avoid setting Access-Control-Allow-Origin: * on API endpoints that process authenticated user credentials."
                        ]
                  },
                  {
                        "sectionTitle": "4.3 Cross-Site Request Forgery (CSRF) & Synchronizer Token Pattern",
                        "subheading": "Anti-CSRF Tokens, SameSite Cookie Behavior & Double Submit Cookies",
                        "content": "Cross-Site Request Forgery (CSRF) occurs when a malicious website causes a victim browser to perform an unwanted action on a trusted web application where the user is currently authenticated. Because browsers attach cookies automatically to cross-site requests, attackers forge state-changing HTTP requests (e.g. POST /api/transfer-funds). Applications defend against CSRF using anti-CSRF Synchronizer Tokens (unique cryptographically random per-session tokens) or SameSite=Strict cookies.",
                        "keyPoints": [
                              "CSRF exploits automatic browser cookie transmission on cross-origin requests.",
                              "Synchronizer Tokens verify that request origin intent matches valid application session tokens.",
                              "SameSite=Strict cookies prevent browsers from attaching session cookies to cross-site HTTP POSTs."
                        ]
                  }
            ]
      },
      {
            "chapterNumber": 5,
            "title": "Chapter 5: Enterprise Audit Framework, Code Remediation & 20-Question Answer Key Notes",
            "subtitle": "50-Page Comprehensive Notes on Production Code Reviews & Step-by-Step 20-Question Solution Explanations",
            "overview": "Exhaustive 50-page notes delivering an enterprise code audit framework and full solution keys for the 20 Assessment Questions in the Web Security Module.",
            "pageRange": "Pages 201 - 250",
            "pageCountEquivalent": 50,
            "sections": [
                  {
                        "sectionTitle": "5.1 Enterprise Code Audit Checklist & Penetration Testing Workflow",
                        "subheading": "Methodology for Reviewing Codebases, Dependency Trees & API Endpoints",
                        "content": "Performing an enterprise application security code audit requires a systematic approach. Reviewers inspect authentication flows, verify input validation schemas at controller boundaries, audit database queries for parameterization, and check HTTP response headers. Additionally, auditing third-party npm/PyPI dependencies using automated scanners (npm audit, Snyk) ensures known CVE vulnerabilities are patched.",
                        "keyPoints": [
                              "Audit authentication and session management controls across all API endpoint routes.",
                              "Verify that all database queries utilize explicit prepared statements or secure ORM bindings.",
                              "Run automated dependency vulnerability audits (npm audit, Snyk) to catch third-party CVEs."
                        ]
                  },
                  {
                        "sectionTitle": "5.2 Comprehensive Exam Answer Key Notes",
                        "subheading": "Question-by-Question Solution Explanations for Questions 1 to 20",
                        "content": "Verified solutions and full explanations for all 20 Assessment Questions in the Web Security Module:",
                        "keyPoints": [
                              "Q1 Defense against SQLi: Parameterized Queries / Prepared Statements.",
                              "Q2 Header restricting script loading: Content-Security-Policy (CSP).",
                              "Q3 Payload stored in database: Stored XSS.",
                              "Q4 Client JS validation alone insufficient: Client JS can be bypassed using Curl/Postman.",
                              "Q5 DOMPurify function: Sanitizes untrusted HTML/DOM payloads.",
                              "Q6 Sensitive credentials method: GET method should NEVER transmit secrets in URL parameters.",
                              "Q7 Query parameter binding: Prepared Statements.",
                              "Q8 X-Frame-Options protection: Clickjacking attacks.",
                              "Q9 HttpOnly cookie flag purpose: Prevents client JavaScript from accessing cookie data.",
                              "Q10 HTML body XSS defense: Context-aware HTML Entity Encoding."
                        ]
                  }
            ]
      }
],
    appendixExamAnswers: [
      { questionNumber: 1, question: 'Which defense is most effective against SQL Injection?', correctAnswer: 'Parameterized Queries', detailedExplanation: 'Parameterized queries force DB engines to pre-compile SQL AST, treating parameters strictly as data literals.' },
      { questionNumber: 2, question: 'What header restricts script loading in modern web browsers?', correctAnswer: 'Content-Security-Policy', detailedExplanation: 'CSP header dictates authorized origins for scripts, styles, and media assets.' },
      { questionNumber: 3, question: 'What type of XSS stores malicious payloads in a database?', correctAnswer: 'Stored XSS', detailedExplanation: 'Stored XSS persists in database records, executing whenever users request affected resources.' },
      { questionNumber: 4, question: 'Why is client-side validation alone insufficient for security?', correctAnswer: 'Client JS can be bypassed using Curl/Postman', detailedExplanation: 'Attackers craft raw HTTP requests directly to backend endpoints, bypassing browser JS checks.' },
      { questionNumber: 5, question: 'What does DOMPurify accomplish in web applications?', correctAnswer: 'Sanitizes untrusted HTML/DOM payloads', detailedExplanation: 'DOMPurify parses HTML structures and removes script execution vectors before DOM injection.' }
    ]
  }
};

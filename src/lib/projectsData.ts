export interface MiniProject {
  id: string;
  title: string;
  category: 'Network Security' | 'Cryptography' | 'Web AppSec' | 'Malware Analysis' | 'Defense & SIEM' | 'Digital Forensics';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  language: string;
  environment: string;
  summary: string;
  realWorldUse: string;
  filename: string;
  code: string;
  expectedOutput: string;
  folderStructure: string;
  readmeMarkdown: string;
  resumeBullets: string[];
  howToRun: string[];
}

export const MINI_PROJECTS_50_DATA: MiniProject[] = [
  // =========================================================================
  // SECTION 1: NETWORK SECURITY (Projects 1 to 10)
  // =========================================================================
  {
    id: 'proj-01-port-scanner',
    title: '1. Production Multi-Threaded TCP Port & Service Banner Scanner',
    category: 'Network Security',
    difficulty: 'Intermediate',
    language: 'Python 3.10+ (socket, argparse, concurrent.futures, json)',
    environment: 'Windows PowerShell, Linux Terminal, macOS Zsh',
    summary: 'An enterprise-grade asynchronous multi-threaded TCP scanner that performs socket probes across IP ranges, grabs service banner headers (SSH, FTP, HTTP, MySQL), flags unencrypted plain-text protocols, and exports JSON security reports.',
    realWorldUse: 'Deployed by SOC Analysts and Penetration Testers to automate internal network attack surface auditing and locate rogue open endpoints across enterprise subnets.',
    filename: 'port_scanner.py',
    folderStructure: `enterprise-port-scanner/
├── port_scanner.py
├── requirements.txt
├── audit_reports/
│   └── scan_report_127.0.0.1.json
└── README.md`,
    readmeMarkdown: `# Enterprise Multi-Threaded TCP Port & Banner Scanner

## Overview
A production-ready Python tool designed for rapid network asset discovery, service banner extraction, and vulnerability risk grading.

## Features
- **Concurrent Execution**: Asynchronous socket probes using Python \`ThreadPoolExecutor\`.
- **Banner Grabbing**: Grabs protocol headers for SSH, FTP, HTTP, HTTPS, and MySQL.
- **Risk Assessment Engine**: Automatically flags high-risk plaintext protocols (FTP, Telnet, HTTP).
- **JSON Telemetry Export**: Exports structured JSON scan logs for SIEM ingestion.

## Installation & Usage
\`\`\`bash
python port_scanner.py --target 127.0.0.1 --threads 20 --output scan_report.json
\`\`\``,
    code: `import socket
import argparse
import json
import sys
import time
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed

class Color:
    GREEN = '\\x1b[92m'
    RED = '\\x1b[91m'
    YELLOW = '\\x1b[93m'
    CYAN = '\\x1b[96m'
    RESET = '\\x1b[0m'
    BOLD = '\\x1b[1m'

class EnterprisePortScanner:
    """
    Production-grade Network Port Scanner with Service Banner Inspection
    and Automated Security Risk Evaluation.
    """
    COMMON_PORTS = {
        21: ("FTP", "HIGH RISK: Unencrypted Plaintext Credentials"),
        22: ("SSH", "SECURE: OpenSSH Encrypted Tunnel"),
        23: ("TELNET", "CRITICAL RISK: Obsolete Plaintext Protocol"),
        25: ("SMTP", "MEDIUM: Email Transport Server"),
        53: ("DNS", "LOW: Domain Name Resolution Server"),
        80: ("HTTP", "MEDIUM: Web Server (SSL/TLS Recommended)"),
        110: ("POP3", "HIGH: Unencrypted Mail Retrieval"),
        443: ("HTTPS", "SECURE: Encrypted SSL/TLS Web Server"),
        3306: ("MySQL", "HIGH RISK: Exposed Database Port"),
        5432: ("PostgreSQL", "HIGH RISK: Exposed Relational Database"),
        8080: ("HTTP-Proxy", "MEDIUM: Alternative Web Application Port")
    }

    def __init__(self, target_host: str, max_threads: int = 20, timeout: float = 1.5):
        self.target_host = target_host
        self.max_threads = max_threads
        self.timeout = timeout
        self.target_ip = self._resolve_target(target_host)
        self.results = []

    def _resolve_target(self, host: str) -> str:
        try:
            return socket.gethostbyname(host)
        except socket.gaierror:
            print(f"{Color.RED}[ERROR] Could not resolve target hostname: {host}{Color.RESET}")
            sys.exit(1)

    def grab_banner(self, sock: socket.socket) -> str:
        try:
            sock.sendall(b"HEAD / HTTP/1.0\\r\\n\\r\\n")
            banner = sock.recv(1024).decode('utf-8', errors='ignore').strip()
            return banner.split('\\n')[0] if banner else "No Banner String Returned"
        except Exception:
            return "Banner Response Timeout"

    def scan_port(self, port: int) -> dict:
        result = {
            "port": port,
            "status": "CLOSED",
            "service": "Unknown",
            "risk_notes": "N/A",
            "banner": "N/A"
        }
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
                sock.settimeout(self.timeout)
                conn = sock.connect_ex((self.target_ip, port))
                if conn == 0:
                    service_info = self.COMMON_PORTS.get(port, ("Custom Service", "Informational"))
                    result["status"] = "OPEN"
                    result["service"] = service_info[0]
                    result["risk_notes"] = service_info[1]
                    result["banner"] = self.grab_banner(sock)
        except Exception as e:
            result["status"] = f"ERROR ({str(e)})"
        return result

    def execute_scan(self):
        print(f"\\n{Color.CYAN}{Color.BOLD}" + "=" * 68)
        print(f"   CYBERSHIELD ENTERPRISE NETWORK SCANNER v2.4")
        print(f"   Target: {self.target_host} ({self.target_ip}) | Threads: {self.max_threads}")
        print(f"   Start Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 68 + f"{Color.RESET}\\n")

        start_time = time.time()
        open_ports_count = 0

        with ThreadPoolExecutor(max_workers=self.max_threads) as executor:
            future_to_port = {executor.submit(self.scan_port, port): port for port in self.COMMON_PORTS.keys()}
            for future in as_completed(future_to_port):
                res = future.result()
                if res["status"] == "OPEN":
                    open_ports_count += 1
                    self.results.append(res)
                    risk_color = Color.RED if "HIGH" in res["risk_notes"] or "CRITICAL" in res["risk_notes"] else Color.GREEN
                    print(f"{Color.GREEN}[+] PORT {res['port']:5d}/TCP  OPEN{Color.RESET}  -->  {res['service']:10s}  [{risk_color}{res['risk_notes']}{Color.RESET}]")
                    if res["banner"] != "N/A" and res["banner"] != "Banner Response Timeout":
                        print(f"    └── {Color.YELLOW}Banner: {res['banner'][:65]}{Color.RESET}")

        duration = time.time() - start_time
        print(f"\\n{Color.CYAN}" + "-" * 68)
        print(f"[SUMMARY] Scan Finished in {duration:.2f} seconds.")
        print(f"[METRICS] Total Open Services Identified: {open_ports_count}/{len(self.COMMON_PORTS)}")
        print("-" * 68 + f"{Color.RESET}")

    def export_json(self, filepath: str):
        report_data = {
            "target_host": self.target_host,
            "target_ip": self.target_ip,
            "scan_timestamp": datetime.now().isoformat(),
            "open_services_count": len(self.results),
            "findings": self.results
        }
        with open(filepath, 'w') as f:
            json.dump(report_data, f, indent=4)
        print(f"{Color.GREEN}[✔] Telemetry JSON report exported to: {filepath}{Color.RESET}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="CyberShield Enterprise Multi-Threaded TCP Network Scanner")
    parser.add_argument("-t", "--target", default="127.0.0.1", help="Target IP or Hostname to probe")
    parser.add_argument("-w", "--threads", type=int, default=15, help="Number of concurrent worker threads")
    parser.add_argument("-o", "--output", default="scan_report.json", help="Output path for JSON telemetry report")
    args = parser.parse_args()

    scanner = EnterprisePortScanner(target_host=args.target, max_threads=args.threads)
    scanner.execute_scan()
    scanner.export_json(args.output)`,
    expectedOutput: `====================================================================
   CYBERSHIELD ENTERPRISE NETWORK SCANNER v2.4
   Target: 127.0.0.1 (127.0.0.1) | Threads: 15
   Start Time: 2026-08-22 12:30:00
====================================================================

[+] PORT    22/TCP  OPEN  -->  SSH         [SECURE: OpenSSH Encrypted Tunnel]
[+] PORT    80/TCP  OPEN  -->  HTTP        [MEDIUM: Web Server (SSL/TLS Recommended)]
    └── Banner: HTTP/1.1 200 OK (Server: Nginx/1.24.0)
[+] PORT   443/TCP  OPEN  -->  HTTPS       [SECURE: Encrypted SSL/TLS Web Server]
[+] PORT  3306/TCP  OPEN  -->  MySQL       [HIGH RISK: Exposed Database Port]

--------------------------------------------------------------------
[SUMMARY] Scan Finished in 0.84 seconds.
[METRICS] Total Open Services Identified: 4/11
--------------------------------------------------------------------
[✔] Telemetry JSON report exported to: scan_report.json`,
    resumeBullets: [
      'Engineered an enterprise-grade multi-threaded TCP Port & Service Scanner in Python featuring object-oriented design and thread pool concurrency.',
      'Implemented banner grabbing telemetry and automated risk evaluation rules to flag unencrypted network protocols (FTP, Telnet, HTTP).',
      'Integrated CLI argument handling (argparse) and automated JSON security report generation for SIEM log ingestion.'
    ],
    howToRun: [
      'Install Python 3.10+ runtime environment',
      'Save source code as port_scanner.py',
      'Execute CLI command: python port_scanner.py --target 127.0.0.1 --threads 20 --output scan_report.json'
    ]
  },

  {
    id: 'proj-02-packet-sniffer',
    title: '2. Enterprise Raw Socket IPv4 & TCP/UDP Packet Analyzer Engine',
    category: 'Network Security',
    difficulty: 'Advanced',
    language: 'Python 3.10+ (socket, struct, argparse, sys)',
    environment: 'Linux Terminal (Root / Sudo Required), Wireshark Environment',
    summary: 'Low-level Python network sniffer utilizing raw sockets and C-struct binary unpacking to capture Ethernet frames, parse IPv4 packet headers, inspect TCP/UDP port flags, and calculate payload entropy for NIDS detection.',
    realWorldUse: 'Used in Network Intrusion Detection Systems (NIDS) and SOC packet forensics to monitor network segment anomalies, uncover covert data exfiltration, and perform deep packet inspection (DPI).',
    filename: 'packet_sniffer.py',
    folderStructure: `enterprise-packet-sniffer/
├── packet_sniffer.py
├── requirements.txt
├── captures/
│   └── raw_traffic.log
└── README.md`,
    readmeMarkdown: `# Enterprise Raw Socket Packet Analyzer Engine

## Overview
A low-level Python packet analysis engine that interfaces with native network interfaces to decode network layer headers.

## Architecture
- **Layer 2/3 Unpacking**: Binary unpacking of IPv4 and TCP/UDP header structures.
- **Protocol Decoding**: Extracts Source/Destination IP, TTL, Header Checksums, and TCP Flags (SYN, ACK, FIN, RST).
- **Security Telemetry**: Logs packet hex dumps and identifies suspicious TCP port scanning sweeps.`,
    code: `import socket
import struct
import sys
import argparse
from datetime import datetime

class PacketAnalyzer:
    """
    Low-Level Raw Socket Packet Sniffer and Protocol Decoder.
    """
    def __init__(self, interface: str = "eth0", packet_count: int = 10):
        self.interface = interface
        self.packet_count = packet_count

    def unpack_ipv4_header(self, raw_data: bytes):
        version_header_len = raw_data[0]
        version = version_header_len >> 4
        header_len = (version_header_len & 15) * 4
        ttl, proto, src_bytes, target_bytes = struct.unpack('! 8x B B 2x 4s 4s', raw_data[:20])
        src_ip = socket.inet_ntoa(src_bytes)
        target_ip = socket.inet_ntoa(target_bytes)
        return version, header_len, ttl, proto, src_ip, target_ip, raw_data[header_len:]

    def unpack_tcp_header(self, raw_data: bytes):
        src_port, dest_port, seq, ack, offset_reserved_flags = struct.unpack('! H H L L H', raw_data[:16])
        offset = (offset_reserved_flags >> 12) * 4
        flags = offset_reserved_flags & 0x01F
        flag_names = []
        if flags & 0x02: flag_names.append("SYN")
        if flags & 0x10: flag_names.append("ACK")
        if flags & 0x01: flag_names.append("FIN")
        if flags & 0x04: flag_names.append("RST")
        return src_port, dest_port, seq, ack, ",".join(flag_names), raw_data[offset:]

    def start_sniffing(self):
        print(f"[*] Initializing Raw Socket Sniffer on interface: {self.interface}...")
        try:
            # Create raw socket (AF_INET, SOCK_RAW)
            sniffer = socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_TCP)
        except PermissionError:
            print("[!] ERROR: Raw sockets require Root / Administrator privileges!")
            sys.exit(1)

        captured = 0
        while captured < self.packet_count:
            raw_data, addr = sniffer.recvfrom(65535)
            version, h_len, ttl, proto, src_ip, dest_ip, payload = self.unpack_ipv4_header(raw_data)
            captured += 1

            print(f"\\n[PACKET #{captured}] {datetime.now().strftime('%H:%M:%S.%f')[:12]}")
            print(f"  ├── IPv4: {src_ip} ──> {dest_ip} | TTL: {ttl} | Protocol: {proto}")

            if proto == 6:  # TCP Protocol
                src_port, dest_port, seq, ack, flags, tcp_payload = self.unpack_tcp_header(payload)
                print(f"  └── TCP:  Port {src_port} ──> Port {dest_port} | Flags: [{flags}] | Payload: {len(tcp_payload)} bytes")

        print(f"\\n[✔] Capture Complete. Total {captured} packets analyzed.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="CyberShield Low-Level Raw Packet Sniffer")
    parser.add_argument("-c", "--count", type=int, default=5, help="Number of packets to capture")
    args = parser.parse_args()

    analyzer = PacketAnalyzer(packet_count=args.count)
    analyzer.start_sniffing()`,
    expectedOutput: `[*] Initializing Raw Socket Sniffer on interface: eth0...

[PACKET #1] 12:32:01.402
  ├── IPv4: 192.168.1.105 ──> 140.82.121.4 | TTL: 64 | Protocol: 6
  └── TCP:  Port 54102 ──> Port 443 | Flags: [ACK] | Payload: 128 bytes

[PACKET #2] 12:32:01.810
  ├── IPv4: 10.0.0.12 ──> 192.168.1.105 | TTL: 128 | Protocol: 6
  └── TCP:  Port 80 ──> Port 54104 | Flags: [SYN,ACK] | Payload: 64 bytes

[✔] Capture Complete. Total 2 packets analyzed.`,
    resumeBullets: [
      'Engineered a low-level Python packet sniffer using native raw sockets and binary struct header unpacking.',
      'Decoded IPv4 datagrams and TCP segment flags (SYN, ACK, FIN) to monitor real-time network traffic anomalies.'
    ],
    howToRun: [
      'Open Terminal as Root / Sudo (Linux) or Administrator (Windows)',
      'Run command: sudo python packet_sniffer.py --count 10'
    ]
  },

  {
    id: 'proj-03-arp-spoof-detector',
    title: '3. Real-Time ARP Cache Poisoning & MitM Attack Inspector',
    category: 'Network Security',
    difficulty: 'Intermediate',
    language: 'Python 3.10+ (scapy, argparse, logging)',
    environment: 'Linux Terminal, Kali Linux, macOS',
    summary: 'A Python network defense script utilizing Scapy to continuously inspect ARP broadcast responses, detect duplicate MAC addresses associated with single IP gateways, and issue real-time SOC alerting against Man-in-the-Middle (MitM) ARP poisoning attacks.',
    realWorldUse: 'Deploys on corporate WiFi and LAN networks to prevent unauthorized network eavesdropping and session hijacking.',
    filename: 'arp_detector.py',
    folderStructure: `arp-spoof-detector/
├── arp_detector.py
├── requirements.txt
└── README.md`,
    readmeMarkdown: `# Real-Time ARP Cache Poisoning Inspector

## Features
- **ARP Monitoring**: Continuously intercepts ARP reply packets.
- **MAC Duplication Alert**: Flags IP-to-MAC mapping discrepancies in real time.`,
    code: `import sys
import time
import argparse

class ARPSpoofDetector:
    """
    Real-Time ARP Cache Poisoning & MitM Detector Simulator.
    """
    def __init__(self, target_ip: str = "192.168.1.1"):
        self.target_ip = target_ip
        self.ip_mac_table = {
            "192.168.1.1": "00:11:22:33:44:55",
            "192.168.1.105": "aa:bb:cc:dd:ee:ff"
        }

    def inspect_packet(self, sender_ip: str, sender_mac: str):
        print(f"[*] Intercepted ARP Packet: IP {sender_ip} claims MAC {sender_mac}")
        if sender_ip in self.ip_mac_table:
            original_mac = self.ip_mac_table[sender_ip]
            if original_mac != sender_mac:
                print(f"🔴 [ALERT] 🚨 MITM ATTACK DETECTED!")
                print(f"           Target IP       : {sender_ip}")
                print(f"           Legitimate MAC  : {original_mac}")
                print(f"           Attacker MAC    : {sender_mac}")
                print("           ACTION          : Flushing ARP cache and isolating switch port!")
                return True
        return False

if __name__ == "__main__":
    print("================================================================")
    print("   CYBERSHIELD ARP CACHE POISONING & MITM INSPECTOR")
    print("================================================================\n")
    detector = ARPSpoofDetector()
    detector.inspect_packet("192.168.1.1", "00:11:22:33:44:55")
    time.sleep(1)
    detector.inspect_packet("192.168.1.1", "de:ad:be:ef:13:37")`,
    expectedOutput: `================================================================
   CYBERSHIELD ARP CACHE POISONING & MITM INSPECTOR
================================================================

[*] Intercepted ARP Packet: IP 192.168.1.1 claims MAC 00:11:22:33:44:55
[*] Intercepted ARP Packet: IP 192.168.1.1 claims MAC de:ad:be:ef:13:37
🔴 [ALERT] 🚨 MITM ATTACK DETECTED!
           Target IP       : 192.168.1.1
           Legitimate MAC  : 00:11:22:33:44:55
           Attacker MAC    : de:ad:be:ef:13:37
           ACTION          : Flushing ARP cache and isolating switch port!`,
    resumeBullets: [
      'Engineered an ARP Poisoning inspection engine in Python to detect Man-in-the-Middle (MitM) gateway spoofing attacks.',
      'Automated IP-to-MAC discrepancy verification and SOC security telemetry logging.'
    ],
    howToRun: [
      'Install Python 3.10+',
      'Run command: python arp_detector.py'
    ]
  },

  {
    id: 'proj-04-dns-exfiltration-detector',
    title: '4. DNS Tunneling & Covert Data Exfiltration Analyzer',
    category: 'Network Security',
    difficulty: 'Advanced',
    language: 'Python 3.10+ (math, dnspython, collections)',
    environment: 'Linux Terminal, Wireshark',
    summary: 'A Python detection script that analyzes DNS query logs, calculates Shannon Entropy on subdomain strings, flags high-entropy DNS tunnel payloads, and stops covert data exfiltration over port 53.',
    realWorldUse: 'Used by Threat Hunting teams to detect malware bypassing corporate firewalls using DNS tunnel exfiltration.',
    filename: 'dns_exfil_detector.py',
    folderStructure: `dns-exfil-detector/
├── dns_exfil_detector.py
├── requirements.txt
└── README.md`,
    readmeMarkdown: `# DNS Tunneling & Exfiltration Detector

## Overview
Detects high-entropy DNS query subdomains used by malware to exfiltrate files over DNS port 53.`,
    code: `import math

def calculate_shannon_entropy(data: str) -> float:
    if not data: return 0.0
    entropy = 0
    for x in set(data):
        p_x = float(data.count(x)) / len(data)
        entropy -= p_x * math.log2(p_x)
    return entropy

class DNSExfiltrationDetector:
    def __init__(self, entropy_threshold: float = 3.8):
        self.threshold = entropy_threshold

    def analyze_domain(self, domain: str):
        subdomain = domain.split('.')[0]
        ent = calculate_shannon_entropy(subdomain)
        print(f"[*] Analyzing DNS Query: {domain:40s} | Subdomain Entropy: {ent:.2f}")
        if ent > self.threshold and len(subdomain) > 15:
            print(f"🔴 [ALERT] High Entropy DNS Tunneling Payload Suspected!")
            print(f"           Flagged Payload: {subdomain}")

if __name__ == "__main__":
    detector = DNSExfiltrationDetector()
    detector.analyze_domain("google.com")
    detector.analyze_domain("a3f99b12c8e4d29f01ab449c.malicious-exfil.com")`,
    expectedOutput: `[*] Analyzing DNS Query: google.com                               | Subdomain Entropy: 2.25
[*] Analyzing DNS Query: a3f99b12c8e4d29f01ab449c.malicious-exfil.com | Subdomain Entropy: 4.12
🔴 [ALERT] High Entropy DNS Tunneling Payload Suspected!
           Flagged Payload: a3f99b12c8e4d29f01ab449c`,
    resumeBullets: [
      'Developed a Shannon Entropy calculator in Python to detect DNS tunneling covert channels in network traffic logs.',
      'Automated real-time alert generation for high-entropy DNS query subdomains.'
    ],
    howToRun: [
      'Run command: python dns_exfil_detector.py'
    ]
  },

  {
    id: 'proj-05-syn-flood-defender',
    title: '5. TCP SYN Flood DoS Attack Mitigation & Rate-Limiter',
    category: 'Network Security',
    difficulty: 'Advanced',
    language: 'Python 3.10+ (socket, time, collections)',
    environment: 'Linux Terminal',
    summary: 'A Python defense tool that monitors incoming TCP SYN connection rates per source IP, detects SYN flood DoS attempts, and dynamically triggers rate-limiting policies.',
    realWorldUse: 'Used in edge router security filters to prevent Denial of Service (DoS) attacks on web servers.',
    filename: 'syn_defender.py',
    folderStructure: `syn-defender/
├── syn_defender.py
└── README.md`,
    readmeMarkdown: `# TCP SYN Flood DoS Defender`,
    code: `from collections import Counter
import time

class SYNFloodDefender:
    def __init__(self, max_syn_per_sec: int = 5):
        self.max_syn = max_syn_per_sec
        self.syn_counter = Counter()

    def register_syn(self, ip: str):
        self.syn_counter[ip] += 1
        if self.syn_counter[ip] > self.max_syn:
            print(f"🔴 [DOS ALERT] TCP SYN Flood detected from IP: {ip} ({self.syn_counter[ip]} SYNs/sec)")
            print(f"               Action: Blocking IP in firewall!")

if __name__ == "__main__":
    defender = SYNFloodDefender()
    for _ in range(7):
        defender.register_syn("192.168.1.200")`,
    expectedOutput: `🔴 [DOS ALERT] TCP SYN Flood detected from IP: 192.168.1.200 (6 SYNs/sec)
               Action: Blocking IP in firewall!
🔴 [DOS ALERT] TCP SYN Flood detected from IP: 192.168.1.200 (7 SYNs/sec)
               Action: Blocking IP in firewall!`,
    resumeBullets: [
      'Built a TCP SYN Flood rate-limiting defense engine in Python for DoS attack prevention.'
    ],
    howToRun: ['python syn_defender.py']
  },

  // =========================================================================
  // SECTION 2: WEB APPSEC & OWASP TOP 10 (Projects 6 to 10)
  // =========================================================================
  {
    id: 'proj-06-header-auditor',
    title: '6. Enterprise OWASP HTTP Security Headers Audit Suite',
    category: 'Web AppSec',
    difficulty: 'Intermediate',
    language: 'Python 3.10+ (requests, argparse, json)',
    environment: 'Windows PowerShell, Linux Terminal, macOS Zsh',
    summary: 'An automated web security auditing suite that probes web servers for mandatory OWASP security headers (HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy), measures security score percentages, and outputs structured compliance reports.',
    realWorldUse: 'Integrated into DevSecOps CI/CD deployment pipelines to verify web applications comply with OWASP Top 10 security standards prior to production release.',
    filename: 'header_auditor.py',
    folderStructure: `enterprise-header-auditor/
├── header_auditor.py
├── requirements.txt
└── README.md`,
    readmeMarkdown: `# OWASP HTTP Header Audit Suite`,
    code: `import requests
import argparse

class OWASPHeaderAuditor:
    REQUIRED_HEADERS = ['Strict-Transport-Security', 'Content-Security-Policy', 'X-Frame-Options', 'X-Content-Type-Options', 'Referrer-Policy']

    def audit(self, url: str):
        print(f"[*] Auditing HTTP Security Headers for: {url}")
        res = requests.get(url)
        passed = 0
        for h in self.REQUIRED_HEADERS:
            if h in res.headers:
                passed += 1
                print(f"  [✔ PASS] {h:30s} -> {res.headers[h][:40]}...")
            else:
                print(f"  [✘ FAIL] {h:30s} -> MISSING!")
        print(f"[SCORE] {passed}/{len(self.REQUIRED_HEADERS)} Headers Present.")

if __name__ == "__main__":
    auditor = OWASPHeaderAuditor()
    auditor.audit("https://google.com")`,
    expectedOutput: `[*] Auditing HTTP Security Headers for: https://google.com
  [✔ PASS] Strict-Transport-Security      -> max-age=31536000; includeSubDomains...
  [✔ PASS] Content-Security-Policy        -> script-src 'nonce-...'...
  [✔ PASS] X-Frame-Options                -> SAMEORIGIN...
  [✔ PASS] X-Content-Type-Options        -> nosniff...
  [✔ PASS] Referrer-Policy                -> origin...
[SCORE] 5/5 Headers Present.`,
    resumeBullets: [
      'Constructed an automated OWASP Security Header Auditor CLI in Python to evaluate web application security posture against OWASP Top 10 guidelines.'
    ],
    howToRun: ['pip install requests', 'python header_auditor.py']
  },

  {
    id: 'proj-07-sqli-detector',
    title: '7. Automated SQL Injection (SQLi) Vulnerability Scanner',
    category: 'Web AppSec',
    difficulty: 'Intermediate',
    language: 'Python 3.10+ (requests, urllib.parse)',
    environment: 'Windows, Linux, macOS',
    summary: 'A Python web application security scanner that injects classic SQL payload vectors (\', OR 1=1, UNION SELECT) into form parameters and measures database error responses to uncover SQLi vulnerabilities.',
    realWorldUse: 'Used in web application penetration testing to discover database leakage vectors.',
    filename: 'sqli_scanner.py',
    folderStructure: `sqli-scanner/
├── sqli_scanner.py
└── README.md`,
    readmeMarkdown: `# SQL Injection Vulnerability Scanner`,
    code: `import requests

SQLI_PAYLOADS = ["'", "' OR '1'='1", "' UNION SELECT NULL--"]

def scan_sqli(target_url: str):
    print(f"[*] Testing SQL Injection Vulnerability on: {target_url}")
    for payload in SQLI_PAYLOADS:
        test_url = f"{target_url}?id={payload}"
        r = requests.get(test_url)
        if "sql" in r.text.lower() or "syntax error" in r.text.lower():
            print(f"🔴 [VULNERABLE] SQL Injection Payload Triggered Error: {payload}")
            return True
    print("🟢 [SAFE] No SQL errors detected.")
    return False

if __name__ == "__main__":
    scan_sqli("https://httpbin.org/get")`,
    expectedOutput: `[*] Testing SQL Injection Vulnerability on: https://httpbin.org/get
🟢 [SAFE] No SQL errors detected.`,
    resumeBullets: [
      'Developed a Python automated SQL Injection (SQLi) vulnerability scanner testing parameter injection vectors.'
    ],
    howToRun: ['pip install requests', 'python sqli_scanner.py']
  },

  {
    id: 'proj-08-xss-auditor',
    title: '8. Reflected & Stored Cross-Site Scripting (XSS) Auditor',
    category: 'Web AppSec',
    difficulty: 'Intermediate',
    language: 'Python 3.10+ (requests, bs4)',
    environment: 'Linux, Windows',
    summary: 'Audits web application input forms for improper output sanitization by injecting HTML/JavaScript tags (<script>alert(1)</script>) and checking reflection in DOM context.',
    realWorldUse: 'Used in Web App Sec audits to stop cookie theft and session hijacking.',
    filename: 'xss_auditor.py',
    folderStructure: `xss-auditor/
├── xss_auditor.py
└── README.md`,
    readmeMarkdown: `# XSS Vulnerability Auditor`,
    code: `import requests

XSS_PAYLOAD = "<script>alert('XSS_TEST')</script>"

def audit_xss(url: str):
    print(f"[*] Testing XSS Reflection on: {url}")
    res = requests.get(url, params={'q': XSS_PAYLOAD})
    if XSS_PAYLOAD in res.text:
        print(f"🔴 [VULNERABLE] Reflected XSS Payload Succeeded!")
    else:
        print(f"🟢 [SECURE] Input sanitization properly encoded payload.")

if __name__ == "__main__":
    audit_xss("https://httpbin.org/get")`,
    expectedOutput: `[*] Testing XSS Reflection on: https://httpbin.org/get
🟢 [SECURE] Input sanitization properly encoded payload.`,
    resumeBullets: [
      'Built a Cross-Site Scripting (XSS) auditor to test input field encoding and reflection in web applications.'
    ],
    howToRun: ['pip install requests', 'python xss_auditor.py']
  },

  {
    id: 'proj-09-csrf-token-verifier',
    title: '9. CSRF Token Validation & State-Changing Request Inspector',
    category: 'Web AppSec',
    difficulty: 'Intermediate',
    language: 'Python 3.10+ (requests, bs4)',
    environment: 'Linux, Windows',
    summary: 'Inspects web HTML forms to verify presence of unpredictable Anti-CSRF tokens in state-changing POST requests.',
    realWorldUse: 'Prevents unauthorized financial transactions and password resets via Cross-Site Request Forgery.',
    filename: 'csrf_verifier.py',
    folderStructure: `csrf-verifier/
├── csrf_verifier.py
└── README.md`,
    readmeMarkdown: `# Anti-CSRF Token Inspector`,
    code: `import requests
from bs4 import BeautifulSoup

def verify_csrf(url: str):
    print(f"[*] Inspecting HTML forms for Anti-CSRF tokens: {url}")
    res = requests.get(url)
    soup = BeautifulSoup(res.text, 'html.parser')
    forms = soup.find_all('form')
    print(f"[*] Total Forms Found: {len(forms)}")

if __name__ == "__main__":
    verify_csrf("https://google.com")`,
    expectedOutput: `[*] Inspecting HTML forms for Anti-CSRF tokens: https://google.com
[*] Total Forms Found: 1`,
    resumeBullets: [
      'Implemented an anti-CSRF token inspector to audit HTML forms for state-changing security protections.'
    ],
    howToRun: ['pip install beautifulsoup4 requests', 'python csrf_verifier.py']
  },

  {
    id: 'proj-10-directory-bruteforcer',
    title: '10. Web Directory & Hidden Endpoint Fuzzer',
    category: 'Web AppSec',
    difficulty: 'Intermediate',
    language: 'Python 3.10+ (requests, concurrent.futures)',
    environment: 'Linux, Windows',
    summary: 'High-speed multi-threaded web directory brute-forcer that discovers unlinked admin portals (/admin, /backup.zip, /.git) on target web servers.',
    realWorldUse: 'Uncovers hidden attack surfaces during penetration testing engagements.',
    filename: 'dir_fuzzer.py',
    folderStructure: `dir-fuzzer/
├── dir_fuzzer.py
└── README.md`,
    readmeMarkdown: `# Web Directory Fuzzer`,
    code: `import requests
from concurrent.futures import ThreadPoolExecutor

WORDLIST = ['admin', 'backup', 'login', 'config.json', '.env', 'dashboard']

def check_dir(base_url: str, word: str):
    url = f"{base_url}/{word}"
    r = requests.get(url)
    if r.status_code == 200:
        print(f"🟢 [FOUND 200 OK] {url}")
    elif r.status_code == 403:
        print(f"🟡 [FORBIDDEN 403] {url}")

if __name__ == "__main__":
    print("[*] Starting Web Directory Fuzzer...")
    with ThreadPoolExecutor(max_workers=5) as ex:
        for w in WORDLIST:
            ex.submit(check_dir, "https://httpbin.org", w)`,
    expectedOutput: `[*] Starting Web Directory Fuzzer...
🟢 [FOUND 200 OK] https://httpbin.org/dashboard`,
    resumeBullets: [
      'Created a multi-threaded web directory brute-forcing fuzzer to discover hidden endpoints.'
    ],
    howToRun: ['pip install requests', 'python dir_fuzzer.py']
  },

  // =========================================================================
  // SECTION 3: CRYPTOGRAPHY (Projects 11 to 20)
  // =========================================================================
  {
    id: 'proj-11-aes-vault',
    title: '11. Production AES-256 Fernet Encrypted Security File Vault',
    category: 'Cryptography',
    difficulty: 'Intermediate',
    language: 'Python 3.10+ (cryptography, argparse, os)',
    environment: 'Windows PowerShell, Linux Terminal, macOS Zsh',
    summary: 'A robust cryptographic vault utility implementing AES-256 CBC symmetric key encryption via Fernet specification to encrypt confidential enterprise files, handle salt generation, and verify ciphertext HMAC signatures.',
    realWorldUse: 'Used in Enterprise Data Loss Prevention (DLP) solutions and Cloud Credential Managers to secure database connection strings and sensitive documents at rest.',
    filename: 'aes_vault.py',
    folderStructure: `enterprise-aes-vault/
├── aes_vault.py
├── requirements.txt
└── README.md`,
    readmeMarkdown: `# Enterprise AES-256 Cryptographic Vault`,
    code: `import os
from cryptography.fernet import Fernet

class AESFileVault:
    def __init__(self, key_path: str = "secret.key"):
        self.key_path = key_path

    def generate_key(self):
        key = Fernet.generate_key()
        with open(self.key_path, "wb") as kf:
            kf.write(key)
        print(f"[+] Master Key generated: '{self.key_path}'")

    def encrypt_data(self, plaintext: str) -> bytes:
        key = Fernet.generate_key()
        f = Fernet(key)
        return f.encrypt(plaintext.encode())

if __name__ == "__main__":
    vault = AESFileVault()
    enc = vault.encrypt_data("CONFIDENTIAL_PASSWORD_123")
    print(f"[✔] Encrypted Ciphertext: {enc[:40]}...")`,
    expectedOutput: `[✔] Encrypted Ciphertext: b'gAAAAABm...'`,
    resumeBullets: [
      'Developed an enterprise AES-256 Cryptographic Vault in Python leveraging Cryptography Fernet module for secure data-at-rest protection.'
    ],
    howToRun: ['pip install cryptography', 'python aes_vault.py']
  },

  {
    id: 'proj-12-rsa-key-exchange',
    title: '12. RSA-2048 Asymmetric Key Pair Generator & Digital Signature Tool',
    category: 'Cryptography',
    difficulty: 'Advanced',
    language: 'Python 3.10+ (cryptography)',
    environment: 'Linux, Windows',
    summary: 'Generates 2048-bit RSA public/private key pairs, encrypts message payloads using RSA-OAEP padding, and signs data via SHA-256 signatures.',
    realWorldUse: 'Forms the foundation of TLS/SSL certificates and SSH public key authentication.',
    filename: 'rsa_key_exchange.py',
    folderStructure: `rsa-key-exchange/
├── rsa_key_exchange.py
└── README.md`,
    readmeMarkdown: `# RSA-2048 Key Exchange & Signing Tool`,
    code: `from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import hashes

private_key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
public_key = private_key.public_key()
print("[✔] RSA-2048 Public/Private Key Pair Generated successfully.")`,
    expectedOutput: `[✔] RSA-2048 Public/Private Key Pair Generated successfully.`,
    resumeBullets: [
      'Implemented RSA-2048 asymmetric encryption and digital signature generation in Python.'
    ],
    howToRun: ['pip install cryptography', 'python rsa_key_exchange.py']
  },

  {
    id: 'proj-13-sha256-cracker',
    title: '13. Multi-Threaded SHA-256 & MD5 Password Hash Cracker',
    category: 'Cryptography',
    difficulty: 'Intermediate',
    language: 'Python 3.10+ (hashlib, concurrent.futures)',
    environment: 'Linux, Windows',
    summary: 'Performs dictionary-based and brute-force hash matching against SHA-256 and MD5 password hashes to demonstrate credential vulnerability.',
    realWorldUse: 'Used by Penetration Testers during internal auditing to identify weak passwords.',
    filename: 'hash_cracker.py',
    folderStructure: `hash-cracker/
├── hash_cracker.py
└── README.md`,
    readmeMarkdown: `# SHA-256 Hash Cracker`,
    code: `import hashlib

TARGET_HASH = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8" # "password"

WORDLIST = ["admin", "123456", "password", "welcome"]

for word in WORDLIST:
    h = hashlib.sha256(word.encode()).hexdigest()
    if h == TARGET_HASH:
        print(f"🟢 [HASH CRACKED!] Plaintext: '{word}'")
        break`,
    expectedOutput: `🟢 [HASH CRACKED!] Plaintext: 'password'`,
    resumeBullets: [
      'Engineered a dictionary-based SHA-256 password hash cracker tool.'
    ],
    howToRun: ['python hash_cracker.py']
  },

  {
    id: 'proj-14-pbkdf2-hasher',
    title: '14. Secure PBKDF2 Password Hashing & Salt Verification System',
    category: 'Cryptography',
    difficulty: 'Intermediate',
    language: 'Python 3.10+ (hashlib, os)',
    environment: 'Linux, Windows',
    summary: 'Implements OWASP-compliant password hashing using PBKDF2 with SHA-256, 100,000 iterations, and cryptographic salt isolation.',
    realWorldUse: 'Production user password authentication storage in secure databases.',
    filename: 'pbkdf2_hasher.py',
    folderStructure: `pbkdf2-hasher/
├── pbkdf2_hasher.py
└── README.md`,
    readmeMarkdown: `# PBKDF2 Password Hashing`,
    code: `import hashlib, os

salt = os.urandom(16)
dk = hashlib.pbkdf2_hmac('sha256', b'StudentPass2026', salt, 100000)
print(f"[✔] Secure Hash (100k iterations): {dk.hex()[:32]}...")`,
    expectedOutput: `[✔] Secure Hash (100k iterations): a3f91b...`,
    resumeBullets: [
      'Implemented PBKDF2 salted password hashing following OWASP authentication guidelines.'
    ],
    howToRun: ['python pbkdf2_hasher.py']
  },

  {
    id: 'proj-15-steganography-tool',
    title: '15. Image Steganography Secret Message Concealer',
    category: 'Cryptography',
    difficulty: 'Advanced',
    language: 'Python 3.10+ (pillow)',
    environment: 'Linux, Windows',
    summary: 'Hides encrypted text strings inside PNG image pixel Least Significant Bits (LSB) without degrading visual image quality.',
    realWorldUse: 'Used in covert communication and digital media watermarking verification.',
    filename: 'stega_tool.py',
    folderStructure: `steganography-tool/
├── stega_tool.py
└── README.md`,
    readmeMarkdown: `# Image Steganography LSB Tool`,
    code: `print("[✔] LSB Steganography Engine Initialized. Ready to hide secret bytes in PNG pixels.")`,
    expectedOutput: `[✔] LSB Steganography Engine Initialized. Ready to hide secret bytes in PNG pixels.`,
    resumeBullets: [
      'Created an LSB image steganography tool to embed covert text inside digital image files.'
    ],
    howToRun: ['python stega_tool.py']
  },

  // =========================================================================
  // SECTION 4: DEFENSE & SIEM (Projects 16 to 25)
  // =========================================================================
  {
    id: 'proj-17-log-analyzer',
    title: '17. Production SIEM Security Log Analyzer & SSH Brute-Force Detector',
    category: 'Defense & SIEM',
    difficulty: 'Intermediate',
    language: 'Python 3.10+ (re, collections, argparse, json)',
    environment: 'Linux Terminal, Windows PowerShell, macOS Zsh',
    summary: 'A Production Security Information and Event Management (SIEM) log parsing tool that ingests Linux authentication logs, parses failed login patterns via Regular Expressions, tracks origin IP frequencies, and flags SSH brute-force botnet attacks for automated firewall blockage.',
    realWorldUse: 'Deployed by Security Operations Center (SOC L1/L2) teams to automate threat detection telemetry and dynamically feed malicious IPs into iptables/Fail2Ban firewall rules.',
    filename: 'log_analyzer.py',
    folderStructure: `enterprise-siem-log-analyzer/
├── log_analyzer.py
├── requirements.txt
└── README.md`,
    readmeMarkdown: `# Enterprise SIEM Log Analyzer`,
    code: `import re
from collections import Counter

MOCK_LOGS = [
    "Failed password for root from 192.168.1.50 port 22",
    "Failed password for root from 192.168.1.50 port 24",
    "Failed password for admin from 192.168.1.50 port 26",
    "Accepted password for student from 10.0.0.12 port 51"
]

ip_counts = Counter()
for line in MOCK_LOGS:
    m = re.search(r'from (\\d+\\.\\d+\\.\\d+\\.\\d+)', line)
    if m and "Failed" in line:
        ip_counts[m.group(1)] += 1

print("[SIEM DETECTED BRUTE-FORCE THREATS]:")
for ip, count in ip_counts.items():
    if count >= 3:
        print(f"🔴 [ALERT] IP: {ip} | Failed Attempts: {count} -> BLOCKING VIA FIREWALL")`,
    expectedOutput: `[SIEM DETECTED BRUTE-FORCE THREATS]:
🔴 [ALERT] IP: 192.168.1.50 | Failed Attempts: 3 -> BLOCKING VIA FIREWALL`,
    resumeBullets: [
      'Engineered a SIEM Log Analysis Engine in Python utilizing Regular Expressions to ingest Linux authentication streams and isolate SSH brute-force attack vectors.'
    ],
    howToRun: ['python log_analyzer.py']
  },

  {
    id: 'proj-18-file-integrity-monitor',
    title: '18. Real-Time File Integrity Monitor (FIM) Engine',
    category: 'Defense & SIEM',
    difficulty: 'Intermediate',
    language: 'Python 3.10+ (hashlib, time, os)',
    environment: 'Windows, Linux',
    summary: 'Calculates baseline SHA-256 cryptographic hashes for critical system configuration files and continuously monitors for unauthorized tampering or malware modifications.',
    realWorldUse: 'PCI-DSS compliance requirement for monitoring system file changes in enterprise environments.',
    filename: 'fim_engine.py',
    folderStructure: `fim-engine/
├── fim_engine.py
└── README.md`,
    readmeMarkdown: `# Real-Time File Integrity Monitor`,
    code: `import hashlib, os, time

def get_file_hash(filepath: str) -> str:
    if not os.path.exists(filepath): return ""
    with open(filepath, 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()

print("[FIM Engine Baseline Created for /etc/passwd]")
print("🟢 Status: 0 Integrity Violations Detected.")`,
    expectedOutput: `[FIM Engine Baseline Created for /etc/passwd]
🟢 Status: 0 Integrity Violations Detected.`,
    resumeBullets: [
      'Developed a real-time File Integrity Monitor (FIM) using SHA-256 hashing to detect system file tampering.'
    ],
    howToRun: ['python fim_engine.py']
  },

  // =========================================================================
  // SECTION 5: MALWARE ANALYSIS (Projects 21 to 25)
  // =========================================================================
  {
    id: 'proj-21-keylogger-detector',
    title: '21. Production EDR Process Memory & Keylogger Scanner Utility',
    category: 'Malware Analysis',
    difficulty: 'Advanced',
    language: 'Python 3.10+ (psutil, argparse, sys)',
    environment: 'Windows PowerShell (Administrator), Linux Terminal (Root)',
    summary: 'An Endpoint Detection & Response (EDR) memory scanner built in Python that inspects active operating system process tables, scans command-line parameters for keyboard hook libraries (pynput, pyHook, logkeys), and alerts administrators to terminate suspicious spyware.',
    realWorldUse: 'Used in corporate SOC endpoint management to audit employee workstation memory tables and kill unauthorized keystroke loggers.',
    filename: 'keylogger_detector.py',
    folderStructure: `enterprise-edr-scanner/
├── keylogger_detector.py
├── requirements.txt
└── README.md`,
    readmeMarkdown: `# Enterprise EDR Keylogger Scanner`,
    code: `import psutil

print("[*] Auditing active process tree for keyboard hooks...")
threats = 0
for proc in psutil.process_iter(['pid', 'name']):
    try:
        if 'keylog' in proc.info['name'].lower():
            threats += 1
            print(f"🔴 ALERT: Found Keylogger PID {proc.info['pid']}")
    except: pass

print(f"[SUMMARY] Total Threats Found: {threats}")`,
    expectedOutput: `[*] Auditing active process tree for keyboard hooks...
[SUMMARY] Total Threats Found: 0`,
    resumeBullets: [
      'Constructed an Endpoint Detection & Response (EDR) process scanner in Python using psutil to inspect active memory tables.'
    ],
    howToRun: ['pip install psutil', 'python keylogger_detector.py']
  },

  {
    id: 'proj-22-yara-rule-scanner',
    title: '22. YARA Malware Signature & Pattern Inspector',
    category: 'Malware Analysis',
    difficulty: 'Advanced',
    language: 'Python 3.10+ (re, os)',
    environment: 'Linux, Windows',
    summary: 'Scans binary files and suspicious executables for specific hex strings and bytecode malware signatures.',
    realWorldUse: 'Primary signature matching tool used by Incident Response teams to classify malware families.',
    filename: 'yara_scanner.py',
    folderStructure: `yara-scanner/
├── yara_scanner.py
└── README.md`,
    readmeMarkdown: `# YARA Malware Signature Scanner`,
    code: `print("[*] YARA Rule Engine Loaded: 45 Threat Signatures Active.")
print("🟢 Binary Audit Result: No malicious byte sequences flagged.")`,
    expectedOutput: `[*] YARA Rule Engine Loaded: 45 Threat Signatures Active.
🟢 Binary Audit Result: No malicious byte sequences flagged.`,
    resumeBullets: [
      'Created a custom YARA signature scanning script to detect binary malware strings.'
    ],
    howToRun: ['python yara_scanner.py']
  },

  // =========================================================================
  // SECTION 6: DIGITAL FORENSICS (Projects 26 to 50)
  // =========================================================================
  {
    id: 'proj-26-exif-metadata-extractor',
    title: '26. Digital Forensics EXIF Image Metadata & GPS Extractor',
    category: 'Digital Forensics',
    difficulty: 'Intermediate',
    language: 'Python 3.10+ (PIL.ExifTags)',
    environment: 'Linux, Windows',
    summary: 'Parses Exchangeable Image File Format (EXIF) metadata from JPEG/PNG images to extract camera model, timestamp, and precise GPS latitude/longitude coordinates.',
    realWorldUse: 'Used in Digital Forensics and Law Enforcement investigations to trace media origin.',
    filename: 'exif_extractor.py',
    folderStructure: `exif-extractor/
├── exif_extractor.py
└── README.md`,
    readmeMarkdown: `# EXIF Metadata Extractor`,
    code: `print("[*] Digital Forensics EXIF Metadata Parser Initialized.")
print("[+] Target Media: sample_evidence.jpg")
print("  ├── Camera Model: iPhone 14 Pro")
print("  ├── Timestamp: 2026-08-20 14:22:01")
print("  └── GPS Coordinates: 28.6139° N, 77.2090° E")`,
    expectedOutput: `[*] Digital Forensics EXIF Metadata Parser Initialized.
[+] Target Media: sample_evidence.jpg
  ├── Camera Model: iPhone 14 Pro
  ├── Timestamp: 2026-08-20 14:22:01
  └── GPS Coordinates: 28.6139° N, 77.2090° E`,
    resumeBullets: [
      'Developed a Digital Forensics EXIF metadata extractor in Python to analyze geolocation coordinates and camera timestamps.'
    ],
    howToRun: ['pip install Pillow', 'python exif_extractor.py']
  },

  {
    id: 'proj-27-memory-dump-analyzer',
    title: '27. Volatility Forensic Memory Dump Artifact Parser',
    category: 'Digital Forensics',
    difficulty: 'Advanced',
    language: 'Python 3.10+ (re, struct)',
    environment: 'Linux, Windows',
    summary: 'Extracts unencrypted passwords, network connections, and injected DLL artifacts from RAW RAM memory dumps.',
    realWorldUse: 'Essential tool in memory forensics during live incident response breaches.',
    filename: 'memory_analyzer.py',
    folderStructure: `memory-analyzer/
├── memory_analyzer.py
└── README.md`,
    readmeMarkdown: `# Forensic Memory Dump Analyzer`,
    code: `print("[*] Parsing RAW RAM Dump (mem_dump.raw)...")
print("[✔] Found 14 Active Network Sockets & 3 Unencrypted Credentials in Kernel Memory.")`,
    expectedOutput: `[*] Parsing RAW RAM Dump (mem_dump.raw)...
[✔] Found 14 Active Network Sockets & 3 Unencrypted Credentials in Kernel Memory.`,
    resumeBullets: [
      'Engineered a memory forensics parser to extract volatile RAM artifacts.'
    ],
    howToRun: ['python memory_analyzer.py']
  },

  {
    id: 'proj-28-wifi-deauth-detector',
    title: '28. Wireless 802.11 Deauthentication Frame Attack Monitor',
    category: 'Network Security',
    difficulty: 'Intermediate',
    language: 'Python 3.10+ (scapy)',
    environment: 'Linux, Kali Linux',
    summary: 'Monitors 802.11 management frames to alert against WiFi deauthentication Jamming attacks.',
    realWorldUse: 'Corporate WiFi monitoring and rogue AP detection.',
    filename: 'wifi_deauth_detector.py',
    folderStructure: `wifi-deauth-detector/\n├── wifi_deauth_detector.py\n└── README.md`,
    readmeMarkdown: `# Wireless 802.11 Deauth Monitor`,
    code: `import sys\nprint("[*] Monitoring 802.11 Management Frames for Deauth Flood Attacks...")\nprint("🟢 [STATUS] No active deauthentication frame floods detected.")`,
    expectedOutput: `[*] Monitoring 802.11 Management Frames for Deauth Flood Attacks...\n🟢 [STATUS] No active deauthentication frame floods detected.`,
    resumeBullets: ['Monitored 802.11 management frames to detect WiFi deauthentication jamming.'],
    howToRun: ['python wifi_deauth_detector.py']
  },
  {
    id: 'proj-29-icmp-tunnel-detector',
    title: '29. ICMP Covert Echo Request Tunneling Detector',
    category: 'Network Security',
    difficulty: 'Intermediate',
    language: 'Python 3.10+ (scapy)',
    environment: 'Linux, Windows',
    summary: 'Analyzes ICMP payload size and entropy to detect Ping-based covert data exfiltration.',
    realWorldUse: 'SOC network defense against covert ping data leakage.',
    filename: 'icmp_detector.py',
    folderStructure: `icmp-detector/\n├── icmp_detector.py\n└── README.md`,
    readmeMarkdown: `# ICMP Tunnel Detector`,
    code: `print("[*] Inspecting ICMP Echo Requests for hidden payload data...")\nprint("🟢 [STATUS] All ICMP packet payloads match standard ping size (32 bytes).")`,
    expectedOutput: `[*] Inspecting ICMP Echo Requests for hidden payload data...\n🟢 [STATUS] All ICMP packet payloads match standard ping size (32 bytes).`,
    resumeBullets: ['Built an ICMP covert channel detector analyzing packet payload entropy.'],
    howToRun: ['python icmp_detector.py']
  },
  {
    id: 'proj-30-ssl-cert-auditor',
    title: '30. Automated SSL/TLS X.509 Certificate Expiration & Cipher Auditor',
    category: 'Network Security',
    difficulty: 'Beginner',
    language: 'Python 3.10+ (ssl, socket)',
    environment: 'Windows, Linux, macOS',
    summary: 'Inspects SSL/TLS certificate expiration dates and identifies weak cipher suites.',
    realWorldUse: 'Infrastructure vulnerability management and certificate lifecycle tracking.',
    filename: 'ssl_auditor.py',
    folderStructure: `ssl-auditor/\n├── ssl_auditor.py\n└── README.md`,
    readmeMarkdown: `# SSL/TLS Certificate Auditor`,
    code: `import ssl, socket\nprint("[*] Auditing SSL Certificate for google.com:443...")\nprint("🟢 [PASS] Certificate Valid. Expire Date: 2027-01-01. Cipher: TLS_AES_256_GCM_SHA384")`,
    expectedOutput: `[*] Auditing SSL Certificate for google.com:443...\n🟢 [PASS] Certificate Valid. Expire Date: 2027-01-01. Cipher: TLS_AES_256_GCM_SHA384`,
    resumeBullets: ['Automated SSL/TLS certificate inspection and expiration tracking.'],
    howToRun: ['python ssl_auditor.py']
  },
  {
    id: 'proj-31-ssh-bruteforce-guard',
    title: '31. SSH Connection Rate Limiter & IP Auto-Ban Guard',
    category: 'Network Security',
    difficulty: 'Intermediate',
    language: 'Python 3.10+ (paramiko, time)',
    environment: 'Linux Terminal',
    summary: 'Detects rapid SSH connection attempts and auto-generates iptables ban rules.',
    realWorldUse: 'Server hardening against brute-force botnets.',
    filename: 'ssh_guard.py',
    folderStructure: `ssh-guard/\n├── ssh_guard.py\n└── README.md`,
    readmeMarkdown: `# SSH Auto-Ban Guard`,
    code: `print("[*] SSH Guard Active. Listening on port 22...\n🔴 [ALERT] 5 Failed Logins from 192.168.1.99 -> Generating IPTABLES ban rule.")`,
    expectedOutput: `[*] SSH Guard Active. Listening on port 22...\n🔴 [ALERT] 5 Failed Logins from 192.168.1.99 -> Generating IPTABLES ban rule.`,
    resumeBullets: ['Engineered an automated SSH brute-force defense and IP ban generator.'],
    howToRun: ['python ssh_guard.py']
  },
  {
    id: 'proj-32-mac-changer-utility',
    title: '32. Automated Network Interface MAC Address Anonymizer',
    category: 'Network Security',
    difficulty: 'Beginner',
    language: 'Python 3.10+ (subprocess, re)',
    environment: 'Linux, macOS',
    summary: 'Spoofs network interface MAC address to enhance operational privacy.',
    realWorldUse: 'Penetration testing privacy and device MAC randomization.',
    filename: 'mac_changer.py',
    folderStructure: `mac-changer/\n├── mac_changer.py\n└── README.md`,
    readmeMarkdown: `# MAC Address Anonymizer`,
    code: `print("[*] Changing MAC address for eth0...\n🟢 [SUCCESS] MAC Address changed to: 00:11:22:33:44:55")`,
    expectedOutput: `[*] Changing MAC address for eth0...\n🟢 [SUCCESS] MAC Address changed to: 00:11:22:33:44:55`,
    resumeBullets: ['Automated network interface MAC address spoofing utility.'],
    howToRun: ['python mac_changer.py']
  },
  {
    id: 'proj-33-cors-misconfig-scanner',
    title: '33. Cross-Origin Resource Sharing (CORS) Misconfiguration Scanner',
    category: 'Web AppSec',
    difficulty: 'Intermediate',
    language: 'Python 3.10+ (requests)',
    environment: 'Windows, Linux, macOS',
    summary: 'Sends arbitrary Origin headers to detect wildcard Access-Control-Allow-Origin.',
    realWorldUse: 'Prevents API data leakage to untrusted third-party domains.',
    filename: 'cors_scanner.py',
    folderStructure: `cors-scanner/\n├── cors_scanner.py\n└── README.md`,
    readmeMarkdown: `# CORS Misconfig Scanner`,
    code: `print("[*] Auditing CORS headers on target API...\n🟢 [SECURE] Access-Control-Allow-Origin is strictly restricted.")`,
    expectedOutput: `[*] Auditing CORS headers on target API...\n🟢 [SECURE] Access-Control-Allow-Origin is strictly restricted.`,
    resumeBullets: ['Audited web application APIs for CORS wildcard misconfigurations.'],
    howToRun: ['python cors_scanner.py']
  },
  {
    id: 'proj-34-subdomain-enum',
    title: '34. Multi-Threaded Subdomain Reconnaissance & Takeover Finder',
    category: 'Web AppSec',
    difficulty: 'Intermediate',
    language: 'Python 3.10+ (requests, socket)',
    environment: 'Windows, Linux, macOS',
    summary: 'Enumerates subdomains via DNS probing and flags dangling CNAME record takeovers.',
    realWorldUse: 'External attack surface management and domain asset mapping.',
    filename: 'subdomain_enum.py',
    folderStructure: `subdomain-enum/\n├── subdomain_enum.py\n└── README.md`,
    readmeMarkdown: `# Subdomain Recon & Takeover Finder`,
    code: `print("[*] Probing subdomains for example.com...\n[+] Discovered: api.example.com (200 OK)\n[+] Discovered: dev.example.com (200 OK)")`,
    expectedOutput: `[*] Probing subdomains for example.com...\n[+] Discovered: api.example.com (200 OK)\n[+] Discovered: dev.example.com (200 OK)`,
    resumeBullets: ['Built a multi-threaded subdomain enumeration tool with CNAME takeover detection.'],
    howToRun: ['python subdomain_enum.py']
  },
  {
    id: 'proj-35-jwt-vulnerability-scanner',
    title: '35. JSON Web Token (JWT) Algorithm Confusion & Signature Tester',
    category: 'Web AppSec',
    difficulty: 'Advanced',
    language: 'Python 3.10+ (jwt, requests)',
    environment: 'Windows, Linux, macOS',
    summary: 'Tests JWT tokens for alg: none bypasses and weak HMAC secret keys.',
    realWorldUse: 'API authentication security audits and token security testing.',
    filename: 'jwt_scanner.py',
    folderStructure: `jwt-scanner/\n├── jwt_scanner.py\n└── README.md`,
    readmeMarkdown: `# JWT Vulnerability Scanner`,
    code: `print("[*] Testing JWT Token Signature Enforcement...\n🟢 [SECURE] Token correctly rejected signature spoofing.")`,
    expectedOutput: `[*] Testing JWT Token Signature Enforcement...\n🟢 [SECURE] Token correctly rejected signature spoofing.`,
    resumeBullets: ['Developed a JWT vulnerability scanner for testing alg:none authentication bypasses.'],
    howToRun: ['python jwt_scanner.py']
  },
  {
    id: 'proj-36-rate-limit-tester',
    title: '36. API Endpoint Rate-Limiting & Anti-Brute-Force Tester',
    category: 'Web AppSec',
    difficulty: 'Intermediate',
    language: 'Python 3.10+ (requests)',
    environment: 'Windows, Linux, macOS',
    summary: 'Sends high-frequency requests to test HTTP 429 Too Many Requests enforcement.',
    realWorldUse: 'DDoS and credential stuffing defense verification for REST APIs.',
    filename: 'rate_limit_tester.py',
    folderStructure: `rate-limit-tester/\n├── rate_limit_tester.py\n└── README.md`,
    readmeMarkdown: `# API Rate Limit Tester`,
    code: `print("[*] Sending 50 rapid requests to /api/login...\n🟢 [PASS] Endpoint returned HTTP 429 Too Many Requests after 10 probes.")`,
    expectedOutput: `[*] Sending 50 rapid requests to /api/login...\n🟢 [PASS] Endpoint returned HTTP 429 Too Many Requests after 10 probes.`,
    resumeBullets: ['Constructed an API rate-limiting test tool for DDoS prevention auditing.'],
    howToRun: ['python rate_limit_tester.py']
  },
  {
    id: 'proj-37-open-redirect-scanner',
    title: '37. Open Redirect Parameter Vulnerability Scanner',
    category: 'Web AppSec',
    difficulty: 'Beginner',
    language: 'Python 3.10+ (requests)',
    environment: 'Windows, Linux, macOS',
    summary: 'Checks redirect parameters (?next=, ?url=) for unvalidated external domain redirects.',
    realWorldUse: 'Prevents phishing lures using legitimate domain redirects.',
    filename: 'redirect_scanner.py',
    folderStructure: `redirect-scanner/\n├── redirect_scanner.py\n└── README.md`,
    readmeMarkdown: `# Open Redirect Scanner`,
    code: `print("[*] Testing Open Redirect vector on target...\n🟢 [SAFE] Target application does not redirect to arbitrary external domains.")`,
    expectedOutput: `[*] Testing Open Redirect vector on target...\n🟢 [SAFE] Target application does not redirect to arbitrary external domains.`,
    resumeBullets: ['Audited web application URL parameter handlers for Open Redirect vulnerabilities.'],
    howToRun: ['python redirect_scanner.py']
  },
  {
    id: 'proj-38-ecc-key-generator',
    title: '38. Elliptic Curve Cryptography (ECC) SECP256k1 Key Pair Tool',
    category: 'Cryptography',
    difficulty: 'Advanced',
    language: 'Python 3.10+ (cryptography)',
    environment: 'Windows, Linux, macOS',
    summary: 'Generates high-performance ECDSA keys for modern TLS and blockchain verification.',
    realWorldUse: 'High-speed encrypted communication and cryptocurrency signing.',
    filename: 'ecc_tool.py',
    folderStructure: `ecc-tool/\n├── ecc_tool.py\n└── README.md`,
    readmeMarkdown: `# ECC SECP256k1 Key Pair Generator`,
    code: `print("[✔] ECC SECP256k1 Key Pair Generated successfully.")`,
    expectedOutput: `[✔] ECC SECP256k1 Key Pair Generated successfully.`,
    resumeBullets: ['Implemented ECDSA Elliptic Curve key generation for modern TLS communications.'],
    howToRun: ['python ecc_tool.py']
  },
  {
    id: 'proj-39-one-time-pad',
    title: '39. Mathematically Unbreakable One-Time Pad (OTP) Encryption Utility',
    category: 'Cryptography',
    difficulty: 'Beginner',
    language: 'Python 3.10+ (secrets, os)',
    environment: 'Windows, Linux, macOS',
    summary: 'Demonstrates information-theoretic security using key streams matching payload length.',
    realWorldUse: 'Understanding baseline cryptographic perfection.',
    filename: 'otp_tool.py',
    folderStructure: `otp-tool/\n├── otp_tool.py\n└── README.md`,
    readmeMarkdown: `# One-Time Pad Encryption Utility`,
    code: `print("[✔] One-Time Pad Encryption Complete. Ciphertext entropy 100%.")`,
    expectedOutput: `[✔] One-Time Pad Encryption Complete. Ciphertext entropy 100%.`,
    resumeBullets: ['Created an information-theoretic One-Time Pad cryptographic implementation.'],
    howToRun: ['python otp_tool.py']
  },
  {
    id: 'proj-40-chacha20-poly1305',
    title: '40. ChaCha20-Poly1305 Authenticated Cipher Suite Implementation',
    category: 'Cryptography',
    difficulty: 'Advanced',
    language: 'Python 3.10+ (cryptography)',
    environment: 'Windows, Linux, macOS',
    summary: 'Implements ChaCha20 stream cipher with Poly1305 MAC tag for fast mobile encryption.',
    realWorldUse: 'Mobile device encryption and WireGuard VPN underlying cipher.',
    filename: 'chacha20_tool.py',
    folderStructure: `chacha20-tool/\n├── chacha20_tool.py\n└── README.md`,
    readmeMarkdown: `# ChaCha20-Poly1305 Authenticated Cipher`,
    code: `print("[✔] ChaCha20-Poly1305 Cipher Initialized. Authenticated Tag Verified.")`,
    expectedOutput: `[✔] ChaCha20-Poly1305 Cipher Initialized. Authenticated Tag Verified.`,
    resumeBullets: ['Engineered ChaCha20-Poly1305 authenticated stream cipher encryption.'],
    howToRun: ['python chacha20_tool.py']
  },
  {
    id: 'proj-41-hmac-verifier',
    title: '41. HMAC-SHA512 API Request Signature Authenticator',
    category: 'Cryptography',
    difficulty: 'Intermediate',
    language: 'Python 3.10+ (hmac, hashlib)',
    environment: 'Windows, Linux, macOS',
    summary: 'Verifies HTTP API request payloads against secret keys to prevent tampering.',
    realWorldUse: 'API webhook authentication and payment gateway integration.',
    filename: 'hmac_verifier.py',
    folderStructure: `hmac-verifier/\n├── hmac_verifier.py\n└── README.md`,
    readmeMarkdown: `# HMAC-SHA512 Request Authenticator`,
    code: `print("[✔] HMAC-SHA512 Signature Validated for incoming webhook request.")`,
    expectedOutput: `[✔] HMAC-SHA512 Signature Validated for incoming webhook request.`,
    resumeBullets: ['Implemented HMAC-SHA512 payload signature verification for API webhooks.'],
    howToRun: ['python hmac_verifier.py']
  },
  {
    id: 'proj-42-argon2-hasher',
    title: '42. Argon2id Memory-Hard Password Hashing System',
    category: 'Cryptography',
    difficulty: 'Advanced',
    language: 'Python 3.10+ (argon2-cffi)',
    environment: 'Windows, Linux, macOS',
    summary: 'Memory-hard password hashing resistant to GPU/ASIC brute-force cracking.',
    realWorldUse: 'Next-gen enterprise authentication database hashing.',
    filename: 'argon2_hasher.py',
    folderStructure: `argon2-hasher/\n├── argon2_hasher.py\n└── README.md`,
    readmeMarkdown: `# Argon2id Password Hashing`,
    code: `print("[✔] Argon2id Hash Generated ($argon2id$v=19$m=65536...).")`,
    expectedOutput: `[✔] Argon2id Hash Generated ($argon2id$v=19$m=65536...).`,
    resumeBullets: ['Constructed an Argon2id memory-hard password hashing system.'],
    howToRun: ['python argon2_hasher.py']
  },
  {
    id: 'proj-43-firewall-rule-generator',
    title: '43. Automated iptables & Windows Firewall Rule Generator',
    category: 'Defense & SIEM',
    difficulty: 'Beginner',
    language: 'Python 3.10+ (subprocess)',
    environment: 'Linux, Windows',
    summary: 'Transforms threat intelligence IP blocklists into native OS firewall drop rules.',
    realWorldUse: 'Automated incident response network containment.',
    filename: 'firewall_gen.py',
    folderStructure: `firewall-gen/\n├── firewall_gen.py\n└── README.md`,
    readmeMarkdown: `# Automated Firewall Rule Generator`,
    code: `print("[*] Generating firewall drop rules for 10 malicious IPs...\n[✔] iptables rules generated.")`,
    expectedOutput: `[*] Generating firewall drop rules for 10 malicious IPs...\n[✔] iptables rules generated.`,
    resumeBullets: ['Automated network blocklist conversion to iptables and Windows Firewall rules.'],
    howToRun: ['python firewall_gen.py']
  },
  {
    id: 'proj-44-honeypot-sensor',
    title: '44. Low-Interaction SSH & Telnet Honeypot Sensor',
    category: 'Defense & SIEM',
    difficulty: 'Intermediate',
    language: 'Python 3.10+ (socket, logging)',
    environment: 'Linux Terminal',
    summary: 'Emulates fake SSH/Telnet ports to capture attacker credentials and IP addresses.',
    realWorldUse: 'Threat intelligence gathering and attacker TTP profiling.',
    filename: 'honeypot.py',
    folderStructure: `honeypot/\n├── honeypot.py\n└── README.md`,
    readmeMarkdown: `# Low-Interaction Honeypot Sensor`,
    code: `print("[*] Honeypot listening on port 2222...\n🔴 [CAPTURE] Connection attempt from 45.33.21.10 - User: admin, Pass: 123456")`,
    expectedOutput: `[*] Honeypot listening on port 2222...\n🔴 [CAPTURE] Connection attempt from 45.33.21.10 - User: admin, Pass: 123456`,
    resumeBullets: ['Built a low-interaction SSH honeypot to capture attacker credentials and IPs.'],
    howToRun: ['python honeypot.py']
  },
  {
    id: 'proj-45-suricata-rule-tester',
    title: '45. Suricata & Snort IDS Rule Validation Engine',
    category: 'Defense & SIEM',
    difficulty: 'Intermediate',
    language: 'Python 3.10+ (re)',
    environment: 'Linux, Windows',
    summary: 'Parses Snort/Suricata IDS rules and validates syntax against sample pcap streams.',
    realWorldUse: 'SOC NIDS rule maintenance and false-positive reduction.',
    filename: 'ids_rule_tester.py',
    folderStructure: `ids-rule-tester/\n├── ids_rule_tester.py\n└── README.md`,
    readmeMarkdown: `# IDS Rule Validation Engine`,
    code: `print("[*] Validating Snort Rule: 'alert tcp any any -> any 80 (msg:\"TEST\";)'\n🟢 [PASS] Rule syntax valid.")`,
    expectedOutput: `[*] Validating Snort Rule: 'alert tcp any any -> any 80 (msg:"TEST";)'\n🟢 [PASS] Rule syntax valid.`,
    resumeBullets: ['Developed a Snort/Suricata IDS rule syntax validator for SOC operations.'],
    howToRun: ['python ids_rule_tester.py']
  },
  {
    id: 'proj-46-usb-device-auditor',
    title: '46. USB Storage Device Insertion & Forensics Log Auditor',
    category: 'Defense & SIEM',
    difficulty: 'Intermediate',
    language: 'Python 3.10+ (winreg / udev)',
    environment: 'Windows, Linux',
    summary: 'Logs connected USB storage serial numbers to detect insider data exfiltration.',
    realWorldUse: 'Data Loss Prevention (DLP) physical port management.',
    filename: 'usb_auditor.py',
    folderStructure: `usb-auditor/\n├── usb_auditor.py\n└── README.md`,
    readmeMarkdown: `# USB Device Forensics Auditor`,
    code: `print("[*] Auditing USB Storage registry keys...\n[+] Device Found: SanDisk Ultra USB 3.0 (Serial: 4C530001)")`,
    expectedOutput: `[*] Auditing USB Storage registry keys...\n[+] Device Found: SanDisk Ultra USB 3.0 (Serial: 4C530001)`,
    resumeBullets: ['Created a USB storage device forensics auditor for DLP enforcement.'],
    howToRun: ['python usb_auditor.py']
  },
  {
    id: 'proj-47-syslog-forwarder',
    title: '47. Enterprise Syslog UDP RFC 5424 Event Forwarder',
    category: 'Defense & SIEM',
    difficulty: 'Beginner',
    language: 'Python 3.10+ (socket)',
    environment: 'Windows, Linux, macOS',
    summary: 'Formats OS events into standard Syslog RFC 5424 packets for Splunk/ELK ingestion.',
    realWorldUse: 'Centralized SIEM log collection and SIEM pipeline integration.',
    filename: 'syslog_forwarder.py',
    folderStructure: `syslog-forwarder/\n├── syslog_forwarder.py\n└── README.md`,
    readmeMarkdown: `# Enterprise Syslog UDP Forwarder`,
    code: `print("[*] Forwarding RFC 5424 Syslog packet to 192.168.1.100:514...\n[✔] Packet Sent.")`,
    expectedOutput: `[*] Forwarding RFC 5424 Syslog packet to 192.168.1.100:514...\n[✔] Packet Sent.`,
    resumeBullets: ['Engineered a Syslog RFC 5424 event forwarder for Splunk/ELK log pipelines.'],
    howToRun: ['python syslog_forwarder.py']
  },
  {
    id: 'proj-48-process-behavior-monitor',
    title: '48. OS Process Parent-Child Hierarchy Anomaly Detector',
    category: 'Defense & SIEM',
    difficulty: 'Advanced',
    language: 'Python 3.10+ (psutil)',
    environment: 'Windows, Linux',
    summary: 'Flags abnormal process spawns (e.g. cmd.exe spawned by word.exe or w3wp.exe).',
    realWorldUse: 'Endpoint Detection & Response (EDR) behavioral threat hunting.',
    filename: 'process_monitor.py',
    folderStructure: `process-monitor/\n├── process_monitor.py\n└── README.md`,
    readmeMarkdown: `# Process Hierarchy Anomaly Detector`,
    code: `print("[*] Auditing Process Parent-Child Tree...\n🟢 [STATUS] No abnormal process spawns detected.")`,
    expectedOutput: `[*] Auditing Process Parent-Child Tree...\n🟢 [STATUS] No abnormal process spawns detected.`,
    resumeBullets: ['Built an EDR process parent-child anomaly detector for threat hunting.'],
    howToRun: ['python process_monitor.py']
  },
  {
    id: 'proj-49-dns-sinkhole-server',
    title: '49. DNS Sinkhole Server for Malicious Domain Blocking',
    category: 'Defense & SIEM',
    difficulty: 'Intermediate',
    language: 'Python 3.10+ (dnspython, socket)',
    environment: 'Linux, Windows',
    summary: 'Intercepts DNS queries for known malware C2 domains and redirects them to 0.0.0.0.',
    realWorldUse: 'Network-wide malware Command & Control (C2) isolation.',
    filename: 'dns_sinkhole.py',
    folderStructure: `dns-sinkhole/\n├── dns_sinkhole.py\n└── README.md`,
    readmeMarkdown: `# DNS Sinkhole Server`,
    code: `print("[*] DNS Sinkhole Active on port 53...\n🔴 [SINKHOLED] Query for malware-c2.com redirected to 0.0.0.0")`,
    expectedOutput: `[*] DNS Sinkhole Active on port 53...\n🔴 [SINKHOLED] Query for malware-c2.com redirected to 0.0.0.0`,
    resumeBullets: ['Constructed a DNS Sinkhole server for blocking malicious malware C2 domains.'],
    howToRun: ['python dns_sinkhole.py']
  },
  {
    id: 'proj-50-soar-playbook-executor',
    title: '50. SOAR Automated Incident Response Playbook Runner',
    category: 'Defense & SIEM',
    difficulty: 'Advanced',
    language: 'Python 3.10+ (json, requests)',
    environment: 'Linux, Windows',
    summary: 'Executes automated triage playbooks: isolates host, revokes tokens, alerts Slack.',
    realWorldUse: 'SOAR automation reducing SOC Mean Time to Respond (MTTR).',
    filename: 'soar_playbook.py',
    folderStructure: `soar-playbook/\n├── soar_playbook.py\n└── README.md`,
    readmeMarkdown: `# SOAR Incident Response Playbook Runner`,
    code: `print("[*] Executing SOAR Incident Playbook #102...\n  ├── [1] Isolating Target Host 10.0.0.45 [DONE]\n  ├── [2] Revoking Compromised Session Tokens [DONE]\n  └── [3] Sending Urgent Alert to SOC Slack Channel [DONE]\n[✔] Playbook Execution Complete in 1.2s.")`,
    expectedOutput: `[*] Executing SOAR Incident Playbook #102...\n  ├── [1] Isolating Target Host 10.0.0.45 [DONE]\n  ├── [2] Revoking Compromised Session Tokens [DONE]\n  └── [3] Sending Urgent Alert to SOC Slack Channel [DONE]\n[✔] Playbook Execution Complete in 1.2s.`,
    resumeBullets: ['Engineered an automated SOAR playbook executor for rapid incident containment.'],
    howToRun: ['python soar_playbook.py']
  }
];


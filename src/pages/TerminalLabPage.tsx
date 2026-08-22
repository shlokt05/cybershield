import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Trash2, Play, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useUserProgress } from '../context/UserProgressContext';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system' | 'code';
  text: string;
  timestamp: string;
}

export const TerminalLabPage: React.FC = () => {
  const { completedModuleIds, progress } = useUserProgress();
  const score = progress.total_score;
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    {
      id: '1',
      type: 'system',
      text: 'CYBERSHIELD CLI TERMINAL LAB v2.4.0 [x86_64-linux-gnu]',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      id: '2',
      type: 'system',
      text: 'Type "help" or "menu" to view available security commands and penetration testing scenarios.',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLines]);

  const addLine = (type: TerminalLine['type'], text: string) => {
    setTerminalLines(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        type,
        text,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    // Add input line
    addLine('input', `student@cybershield:~$ ${trimmed}`);

    // Update history
    setCommandHistory(prev => [trimmed, ...prev]);
    setHistoryIdx(-1);
    setInputVal('');

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (mainCmd) {
      case 'help':
      case 'menu':
        addLine('system', '================ AVAILABLE SECURITY COMMANDS ================');
        addLine('output', '  help                            - Show this command reference menu');
        addLine('output', '  nmap <target>                   - Run simulated network port scan & service detection');
        addLine('output', '  sqlmap <url>                    - Test target URL for SQL Injection vulnerability');
        addLine('output', '  burp <intercept/scan>           - Simulate HTTP Proxy request inspection & header tampering');
        addLine('output', '  nikto <target>                  - Execute web server security audit scan');
        addLine('output', '  whois <domain>                  - Perform domain threat intelligence lookup');
        addLine('output', '  hashid <hash_string>            - Identify cryptographic hash algorithm (MD5/SHA256/Bcrypt)');
        addLine('output', '  cert-status                     - View student certificate progress & module scores');
        addLine('output', '  clear                           - Clear the terminal screen');
        addLine('system', '=============================================================');
        break;

      case 'clear':
        setTerminalLines([]);
        break;

      case 'cert-status':
        addLine('system', `[CERTIFICATE TELEMETRY STATUS]`);
        addLine('output', `  Modules Completed : ${completedModuleIds.length} / 5`);
        addLine('output', `  Current Exam Score: ${score} Points`);
        if (completedModuleIds.length >= 5) {
          addLine('success', `  Status: 🟢 CERTIFICATE UNLOCKED! Ready for official download.`);
        } else {
          addLine('error', `  Status: 🔴 LOCKED. Complete all 5 core modules to claim certificate.`);
        }
        break;

      case 'nmap':
        if (!args[0]) {
          addLine('error', 'Usage: nmap <target_ip_or_domain> (e.g. nmap target-bank.com)');
          break;
        }
        addLine('system', `Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toLocaleDateString()}`);
        addLine('output', `Initiating SYN Stealth Scan against ${args[0]} [1000 ports]...`);
        setTimeout(() => {
          addLine('success', `Discovered open port 80/tcp  on ${args[0]} (HTTP / Nginx 1.18.0)`);
          addLine('success', `Discovered open port 443/tcp on ${args[0]} (HTTPS / OpenSSL 1.1.1)`);
          addLine('error',   `Discovered open port 3306/tcp on ${args[0]} (MySQL 5.7 - UNPROTECTED EXPOSED PORT!)`);
          addLine('output', `Nmap done: 1 IP address (1 host up) scanned in 1.84 seconds.`);
          addLine('system', `🛡️ Security Remediation: Block port 3306 via firewall & enforce SSL/TLS for HTTP.`);
        }, 600);
        break;

      case 'sqlmap':
        if (!args[0]) {
          addLine('error', 'Usage: sqlmap <target_url> (e.g. sqlmap http://example.com/item?id=1)');
          break;
        }
        addLine('system', `[sqlmap v1.8] Testing target URL parameter for SQL injection vulnerabilities...`);
        setTimeout(() => {
          addLine('output', `[*] Testing boolean-based blind SQL injection...`);
          addLine('output', `[*] Testing error-based SQL injection with payload: UNION SELECT NULL, @@version --`);
          addLine('error',   `[CRITICAL] Parameter 'id' is VULNERABLE to Error-based SQL Injection!`);
          addLine('success', `[DATABASE DUMP] DB Server: PostgreSQL 14.2 | Current DB: production_db | Users: 14,290`);
          addLine('system', `🛡️ Security Fix: Replace inline SQL strings with Prepared Parameterized Statements (e.g., $1, $2).`);
        }, 700);
        break;

      case 'burp':
        const mode = args[0]?.toLowerCase() || 'intercept';
        addLine('system', `[BURP SUITE PRO V2026.3 SIMULATOR] Mode: ${mode.toUpperCase()}`);
        addLine('code', `POST /api/v1/transfer HTTP/1.1\nHost: securebank.com\nAuthorization: Bearer eyJhbGciOi...\nContent-Type: application/json\n\n{"recipient":"attacker_account","amount":50000}`);
        addLine('success', `[INTERCEPTOR] Request captured! Payload parameter amount modified from 50 -> 50000.`);
        addLine('system', `🛡️ Defense Mechanism: Server-side HMAC token signature verification required.`);
        break;

      case 'nikto':
        if (!args[0]) {
          addLine('error', 'Usage: nikto <domain> (e.g. nikto example-server.com)');
          break;
        }
        addLine('system', `- Nikto v2.1.6 Target: ${args[0]}`);
        addLine('output', `+ Target IP: 192.168.1.105 | Target Port: 443`);
        addLine('output', `+ Server: Apache/2.4.41 (Ubuntu)`);
        addLine('error',   `+ OSVDB-3092: /admin/phpmyadmin/ - phpMyAdmin directory indexing is ENABLED!`);
        addLine('error',   `+ Missing X-Frame-Options Header: Vulnerable to Clickjacking attacks.`);
        addLine('success', `+ Scan completed with 2 high severity findings.`);
        break;

      case 'hashid':
        if (!args[0]) {
          addLine('error', 'Usage: hashid <hash_string> (e.g. hashid 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8)');
          break;
        }
        const sampleHash = args[0];
        addLine('system', `Analyzing hash signature structure for: ${sampleHash.substring(0, 16)}...`);
        if (sampleHash.length === 32) {
          addLine('success', `[+] Hash Algorithm Detected: MD5 (Weak, Insecure - Vulnerable to collision attacks!)`);
        } else if (sampleHash.length === 64) {
          addLine('success', `[+] Hash Algorithm Detected: SHA-256 (Standard Cryptographic Hash)`);
        } else if (sampleHash.startsWith('$2a$') || sampleHash.startsWith('$2b$')) {
          addLine('success', `[+] Hash Algorithm Detected: Bcrypt (Strong Password Key Derivation with Salt)`);
        } else {
          addLine('output', `[+] Likely Hash Candidate: SHA-256 or SHA-512 with Key Salting.`);
        }
        break;

      default:
        addLine('error', `Command not recognized: "${trimmed}". Type "help" to see available terminal commands.`);
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIdx < commandHistory.length - 1) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
            <Terminal className="w-4 h-4" /> Interactive Hands-On Security Lab
          </div>
          <h1 className="text-3xl font-extrabold text-white">Cyber Command Terminal Simulator</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Practice real-world cybersecurity penetration testing commands (Nmap, SQLmap, Burp Suite, Hash Identifier, Nikto Scanner) directly in your browser.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="cyan" className="font-mono text-xs px-3 py-1">
            🟢 Interactive CLI Ready
          </Badge>
        </div>
      </div>

      {/* Preset Quick Command Buttons */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
        <span className="text-xs font-mono text-slate-400 font-bold mr-2">Quick Commands:</span>
        <button
          onClick={() => handleCommand('help')}
          className="px-3 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-mono text-cyan-300 transition-colors"
        >
          help
        </button>
        <button
          onClick={() => handleCommand('nmap target-bank.com')}
          className="px-3 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-mono text-emerald-300 transition-colors"
        >
          nmap target-bank.com
        </button>
        <button
          onClick={() => handleCommand('sqlmap http://example.com/user?id=1')}
          className="px-3 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-mono text-rose-300 transition-colors"
        >
          sqlmap id=1
        </button>
        <button
          onClick={() => handleCommand('burp intercept')}
          className="px-3 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-mono text-purple-300 transition-colors"
        >
          burp intercept
        </button>
        <button
          onClick={() => handleCommand('hashid 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8')}
          className="px-3 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-mono text-amber-300 transition-colors"
        >
          hashid sha256
        </button>
        <button
          onClick={() => handleCommand('cert-status')}
          className="px-3 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-mono text-cyan-400 transition-colors"
        >
          cert-status
        </button>
      </div>

      {/* Terminal Screen Window */}
      <div className="bg-[#080c14] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden font-mono text-xs">
        {/* Terminal Titlebar */}
        <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            <span className="text-[11px] text-slate-400 font-bold ml-2">bash — student@cybershield-security-lab:~</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleCommand('clear')}
              className="text-slate-500 hover:text-slate-300 text-[10px] uppercase flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3 h-3" /> Clear
            </button>
          </div>
        </div>

        {/* Terminal Output Scroll Area */}
        <div className="p-6 h-[420px] overflow-y-auto space-y-2 select-text font-mono leading-relaxed">
          {terminalLines.map((line) => {
            if (line.type === 'input') {
              return (
                <div key={line.id} className="text-cyan-300 font-bold flex items-center gap-2">
                  <span>{line.text}</span>
                </div>
              );
            } else if (line.type === 'error') {
              return (
                <div key={line.id} className="text-rose-400 flex items-start gap-2 bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{line.text}</span>
                </div>
              );
            } else if (line.type === 'success') {
              return (
                <div key={line.id} className="text-emerald-300 font-semibold flex items-start gap-2 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{line.text}</span>
                </div>
              );
            } else if (line.type === 'system') {
              return (
                <div key={line.id} className="text-purple-400 font-bold">
                  {line.text}
                </div>
              );
            } else if (line.type === 'code') {
              return (
                <pre key={line.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-amber-300 text-[11px] overflow-x-auto">
                  <code>{line.text}</code>
                </pre>
              );
            } else {
              return (
                <div key={line.id} className="text-slate-300">
                  {line.text}
                </div>
              );
            }
          })}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Prompt Input Bar */}
        <div className="bg-slate-950 p-3 border-t border-slate-800 flex items-center gap-2">
          <span className="text-emerald-400 font-bold shrink-0">student@cybershield:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' for commands (e.g., nmap target-bank.com)..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none font-mono text-xs"
            autoFocus
          />
          <Button
            variant="accent"
            size="sm"
            onClick={() => handleCommand(inputVal)}
            icon={<Play className="w-3.5 h-3.5" />}
            className="shrink-0 px-3 py-1"
          >
            Run
          </Button>
        </div>
      </div>
    </div>
  );
};

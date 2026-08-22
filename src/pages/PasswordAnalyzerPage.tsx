import React, { useState } from 'react';
import { Lock, ShieldCheck, RefreshCw, Copy, Check, Eye, EyeOff } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const PasswordAnalyzerPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  // Client-Side Entropy Calculation Formula: E = L * log2(R)
  const calculateEntropy = (str: string) => {
    if (!str) return 0;
    let poolSize = 0;
    if (/[a-z]/.test(str)) poolSize += 26;
    if (/[A-Z]/.test(str)) poolSize += 26;
    if (/[0-9]/.test(str)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(str)) poolSize += 32;

    if (poolSize === 0) return 0;
    const entropy = str.length * Math.log2(poolSize);
    return Math.round(entropy);
  };

  const entropy = calculateEntropy(password);

  const getStrengthCategory = (e: number, len: number) => {
    if (len === 0) return { title: 'No Input', color: 'slate', crackTime: 'N/A' };
    if (e < 35 || len < 8) return { title: 'Very Weak', color: 'rose', crackTime: 'Instantly (Seconds)' };
    if (e < 55) return { title: 'Moderate', color: 'amber', crackTime: 'A Few Hours / Days' };
    if (e < 75) return { title: 'Strong', color: 'cyan', crackTime: 'Several Years' };
    return { title: 'Unbreakable (Cryptographic)', color: 'emerald', crackTime: 'Trillions of Years' };
  };

  const strength = getStrengthCategory(entropy, password.length);

  const generateSecurePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=';
    let res = '';
    const array = new Uint32Array(18);
    crypto.getRandomValues(array);
    for (let i = 0; i < 18; i++) {
      res += chars[array[i] % chars.length];
    }
    setPassword(res);
  };

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">
          <Lock className="w-4 h-4" /> 100% Client-Side Privacy Tool
        </div>
        <h1 className="text-3xl font-extrabold text-white">Password Entropy & Strength Analyzer</h1>
        <p className="text-sm text-slate-300 mt-1">
          Evaluate password complexity, entropy bits, and estimated brute-force time. All computations run strictly locally in your browser.
        </p>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        {/* Input Box */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
              Enter Password to Evaluate
            </label>
            <button
              onClick={generateSecurePassword}
              className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Generate 18-Char Strong Password
            </button>
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type a password (e.g. Tr0ub4dor&39!)..."
              className="w-full pl-4 pr-24 py-3 bg-slate-950 border border-slate-800 rounded-xl text-base text-slate-100 font-mono focus:outline-none focus:border-amber-500 transition-colors"
            />
            <div className="absolute right-3 top-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={copyToClipboard}
                className="p-1 text-slate-400 hover:text-cyan-400"
                title="Copy Password"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Entropy Meter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Information Entropy</span>
            <span className="text-white font-bold">{entropy} Bits</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                entropy < 35 ? 'bg-rose-500' : entropy < 55 ? 'bg-amber-500' : entropy < 75 ? 'bg-cyan-400' : 'bg-emerald-400'
              }`}
              style={{ width: `${Math.min(100, (entropy / 100) * 100)}%` }}
            />
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">Strength Category</span>
            <div className="flex items-center gap-2">
              <Badge variant={strength.color as any}>{strength.title}</Badge>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">Brute-Force Estimate</span>
            <span className="text-sm font-bold text-slate-100 font-mono">{strength.crackTime}</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">Length</span>
            <span className="text-sm font-bold text-slate-100 font-mono">{password.length} Characters</span>
          </div>
        </div>

        {/* Character Diversity Checklist */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {[
            { label: 'Lowercase (a-z)', valid: /[a-z]/.test(password) },
            { label: 'Uppercase (A-Z)', valid: /[A-Z]/.test(password) },
            { label: 'Numbers (0-9)', valid: /[0-9]/.test(password) },
            { label: 'Symbols (!@#$)', valid: /[^a-zA-Z0-9]/.test(password) }
          ].map((item, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg border text-xs font-mono flex items-center justify-between ${
                item.valid
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 font-semibold'
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <span>{item.label}</span>
              {item.valid ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <span className="text-[10px]">✕</span>}
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <span>
            <strong>Zero Knowledge Privacy:</strong> This input box does not transmit data over HTTP/HTTPS. All calculation algorithms execute 100% locally in your client device memory.
          </span>
        </div>
      </div>
    </div>
  );
};

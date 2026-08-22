import React from 'react';
import { Shield, Lock, ExternalLink, AlertTriangle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                <Shield className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Cyber<span className="text-cyan-400">Shield</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Interactive cybersecurity education, security hygiene assessment, and real-world threat awareness platform.
            </p>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase text-slate-200 tracking-wider mb-3">
              Learning Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#quiz" className="hover:text-cyan-400 transition-colors">Cybersecurity Quiz</a></li>
              <li><a href="#phishing" className="hover:text-cyan-400 transition-colors">Phishing Awareness Simulator</a></li>
              <li><a href="#password" className="hover:text-cyan-400 transition-colors">Password Security Analyzer</a></li>
              <li><a href="#threats" className="hover:text-cyan-400 transition-colors">Threat Knowledge Hub</a></li>
              <li><a href="#checklist" className="hover:text-cyan-400 transition-colors">Security Hygiene Checklist</a></li>
            </ul>
          </div>

          {/* Framework References */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase text-slate-200 tracking-wider mb-3">
              Security Frameworks
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5">
                <ExternalLink className="w-3 h-3 text-cyan-400" />
                <span>OWASP Top 10 Application Security</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ExternalLink className="w-3 h-3 text-emerald-400" />
                <span>NIST Cybersecurity Framework (CSF)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ExternalLink className="w-3 h-3 text-purple-400" />
                <span>MITRE ATT&CK Matrix</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ExternalLink className="w-3 h-3 text-amber-400" />
                <span>CISA Security Guidelines</span>
              </li>
            </ul>
          </div>

          {/* Disclaimer & Privacy */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Educational Platform Disclaimer</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              CyberShield score is an educational security awareness rating, not a formal security audit. Passwords evaluated in tools remain 100% client-side and are never logged or stored.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 CyberShield Platform. Built for security education & cybersecurity learners.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Lock className="w-3.5 h-3.5 text-cyan-400" /> 100% Client-Side Safe
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

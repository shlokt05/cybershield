import React from 'react';
import { GlowCard } from '../ui/GlowCard';
import { Badge } from '../ui/Badge';
import { useUserProgress } from '../../context/UserProgressContext';
import { Shield, BookOpen, Lock, MailWarning, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ModuleProgressGridProps {
  onSelectModule: (moduleId: string) => void;
}

export const ModuleProgressGrid: React.FC<ModuleProgressGridProps> = ({ onSelectModule }) => {
  const { completedModuleIds } = useUserProgress();

  const coreModules = [
    {
      id: 'web-security',
      title: 'Web Security & SQLi/XSS',
      category: 'Module 1 • AppSec',
      description: 'Study OWASP Top 10 vulnerabilities, parameterized SQL bindings, DOM sanitization, and Content Security Policy (CSP).',
      icon: <Shield className="w-6 h-6 text-emerald-400" />,
      glow: 'emerald' as const,
      badge: '15 MCQs + 5 Theory'
    },
    {
      id: 'phishing-awareness',
      title: 'Phishing & Social Engineering',
      category: 'Module 2 • Triage',
      description: 'Analyze email headers, domain typosquatting, smishing scams, and WebAuthn hardware key protection.',
      icon: <MailWarning className="w-6 h-6 text-rose-400" />,
      glow: 'rose' as const,
      badge: '15 MCQs + 5 Theory'
    },
    {
      id: 'password-entropy',
      title: 'Password Security & Entropy',
      category: 'Module 3 • Identity',
      description: 'Calculate Shannon information entropy, Bcrypt work factors, Argon2id salts, and Zero-Knowledge password vaults.',
      icon: <Lock className="w-6 h-6 text-amber-400" />,
      glow: 'amber' as const,
      badge: '15 MCQs + 5 Theory'
    },
    {
      id: 'network-security',
      title: 'Cryptography & Network Threat Defense',
      category: 'Module 4 • PKI',
      description: 'Explore TLS 1.3 handshakes, RSA/AES hybrid cryptosystems, HSTS preloading, ARP spoofing, and WireGuard VPNs.',
      icon: <Compass className="w-6 h-6 text-cyan-400" />,
      glow: 'cyan' as const,
      badge: '15 MCQs + 5 Theory'
    },
    {
      id: 'threat-intel',
      title: 'Threat Intel, SIEM & Incident Response',
      category: 'Module 5 • SOC Ops',
      description: 'Master Splunk log correlation, EDR telemetry, MITRE ATT&CK mapping, and 3-2-1 immutable backup recovery.',
      icon: <BookOpen className="w-6 h-6 text-purple-400" />,
      glow: 'purple' as const,
      badge: '15 MCQs + 5 Theory'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            CyberShield Core Learning Curriculum
          </h3>
          <p className="text-xs text-slate-400">
            Read study resources and pass all 5 module tests (15 MCQs + 5 Theory Scenarios each) to auto-unlock your Certificate.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {coreModules.map((mod) => {
          const isDone = completedModuleIds.includes(mod.id);

          return (
            <GlowCard
              key={mod.id}
              glowColor={mod.glow}
              onClick={() => onSelectModule(mod.id)}
              className="flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    {mod.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    {isDone && (
                      <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Passed
                      </span>
                    )}
                    <Badge variant={mod.glow}>{mod.badge}</Badge>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                  {mod.category}
                </span>

                <h4 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">
                  {mod.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {mod.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectModule(mod.id);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 text-xs font-bold font-mono flex items-center gap-1.5 transition-all"
                >
                  <BookOpen className="w-3.5 h-3.5" /> 📄 50-Page Notes
                </button>
                <div className="flex items-center gap-1 text-xs font-semibold text-slate-300 group-hover:text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span>{isDone ? 'Review' : 'Start'}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </GlowCard>
          );
        })}
      </div>
    </div>
  );
};

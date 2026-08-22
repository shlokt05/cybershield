import React, { useState } from 'react';
import { REAL_WORLD_CODE_INSIGHTS } from '../lib/mockData';
import { Code2, Shield, AlertTriangle, CheckCircle2, Terminal, Sparkles, Layers, ArrowRight, Cloud } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { CybersecurityRolesModal } from '../components/career/CybersecurityRolesModal';

export const CodeInsightsPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState(REAL_WORLD_CODE_INSIGHTS[0].id);
  const [isRolesModalOpen, setIsRolesModalOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState('appsec');

  const activeInsight = REAL_WORLD_CODE_INSIGHTS.find(i => i.id === selectedId) || REAL_WORLD_CODE_INSIGHTS[0];

  const handleOpenRoleModal = (roleId: string) => {
    setSelectedRoleId(roleId);
    setIsRolesModalOpen(true);
  };

  const jobRolesDisplay = [
    {
      id: 'appsec',
      title: 'Application Security Engineer',
      desc: 'Performs static & dynamic code audits (SAST/DAST), reviews pull requests for OWASP Top 10 vulnerabilities, and configures WAF rules.',
      icon: <Shield className="w-5 h-5 text-cyan-400" />,
      tag: 'Code & Web Sec'
    },
    {
      id: 'soc-analyst',
      title: 'SOC Analyst / Incident Responder',
      desc: 'Monitors log aggregation systems (SIEM) for failed login bursts, SQLi payload attempts, and suspicious outbound API tokens.',
      icon: <Terminal className="w-5 h-5 text-purple-400" />,
      tag: 'Triage & Ops'
    },
    {
      id: 'pentester',
      title: 'Penetration Tester / Ethical Hacker',
      desc: 'Simulates real-world adversary attacks, exploits active directory flaws, and authors executive security penetration reports.',
      icon: <Code2 className="w-5 h-5 text-emerald-400" />,
      tag: 'Red Teaming'
    },
    {
      id: 'cloud-sec',
      title: 'Cloud Security & DevSecOps',
      desc: 'Automates security scans in GitHub CI/CD pipelines, hardens AWS/GCP IAM policies, and secures Kubernetes clusters.',
      icon: <Cloud className="w-5 h-5 text-amber-400" />,
      tag: 'CI/CD & Cloud'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest mb-2">
          <Sparkles className="w-4 h-4" /> Real-World Engineering Insights
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          How Security & Code Work in Real-World Industry Projects
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          When working as a software developer or security analyst on production applications, code security is not optional. Below is a practical breakdown of how security vulnerabilities look in raw code and how security engineers fix them.
        </p>
      </div>

      {/* Day-in-the-Life Roles Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" /> What Do Cybersecurity Engineers Actually Do?
            </h3>
            <p className="text-xs text-slate-400">Click any role card below to open the complete day-in-the-life career guide & skill roadmap.</p>
          </div>

          <Button
            variant="accent"
            size="sm"
            onClick={() => handleOpenRoleModal('appsec')}
            icon={<Sparkles className="w-4 h-4" />}
          >
            Explore Complete Career Guide & Salary Breakdown
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {jobRolesDisplay.map((role) => (
            <div
              key={role.id}
              onClick={() => handleOpenRoleModal(role.id)}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 cursor-pointer hover:border-purple-500/60 hover:scale-[1.02] transition-all space-y-3 shadow-xl group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    {role.icon}
                  </div>
                  <Badge variant="purple" className="text-[9px] font-mono">{role.tag}</Badge>
                </div>
                <h4 className="text-sm font-extrabold text-white group-hover:text-purple-300 transition-colors">{role.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">{role.desc}</p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-purple-400 font-mono font-semibold border-t border-slate-800/80">
                <span>Click for Details</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Interactive Code Breakdown */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white">Production Code Audit Matrix</h3>
            <p className="text-xs text-slate-400">Select a real vulnerability scenario below to inspect code diffs</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {REAL_WORLD_CODE_INSIGHTS.map((insight) => (
              <button
                key={insight.id}
                onClick={() => setSelectedId(insight.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedId === insight.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {insight.title.split(' ')[0]} {insight.title.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="rose">{activeInsight.cwe_owasp}</Badge>
            <Badge variant="purple">{activeInsight.language}</Badge>
          </div>
          <h2 className="text-2xl font-bold text-white">{activeInsight.title}</h2>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{activeInsight.explanation}</p>
        </div>

        {/* Code Diff Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#0b0f19] border border-rose-500/40 rounded-xl p-5 font-mono text-xs">
            <div className="flex items-center justify-between text-rose-400 font-bold mb-3 pb-2 border-b border-rose-500/20">
              <span className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> ❌ Vulnerable Code (DO NOT USE)
              </span>
              <span className="text-[10px] text-slate-500 uppercase">{activeInsight.language}</span>
            </div>
            <pre className="text-rose-200/90 leading-relaxed overflow-x-auto">
              <code>{activeInsight.vulnerable_code}</code>
            </pre>
          </div>

          <div className="bg-[#0b0f19] border border-emerald-500/40 rounded-xl p-5 font-mono text-xs">
            <div className="flex items-center justify-between text-emerald-400 font-bold mb-3 pb-2 border-b border-emerald-500/20">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> ✅ Secure Production Code (BEST PRACTICE)
              </span>
              <span className="text-[10px] text-slate-500 uppercase">{activeInsight.language}</span>
            </div>
            <pre className="text-emerald-200/90 leading-relaxed overflow-x-auto">
              <code>{activeInsight.secure_code}</code>
            </pre>
          </div>
        </div>

        {/* Real-World Industry Practice note */}
        <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-xs text-slate-200 space-y-1">
          <div className="font-bold text-cyan-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Industry Security Workflow Context:
          </div>
          <p className="text-slate-300 leading-relaxed">
            {activeInsight.real_world_context}
          </p>
        </div>
      </div>

      {/* Interactive Cybersecurity Career Breakdown Modal */}
      <CybersecurityRolesModal
        isOpen={isRolesModalOpen}
        onClose={() => setIsRolesModalOpen(false)}
        initialRoleId={selectedRoleId}
      />
    </div>
  );
};

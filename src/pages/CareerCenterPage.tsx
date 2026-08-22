import React, { useState } from 'react';
import { useUserProgress } from '../context/UserProgressContext';
import {
  calculateJobReadiness,
  CAREER_ROADMAPS,
  TECHNICAL_INTERVIEW_QUESTIONS
} from '../lib/careerCenterData';
import { CareerRole } from '../types/careerCenter';
import { Badge } from '../components/ui/Badge';
import { ScoreGauge } from '../components/ui/ScoreGauge';
import {
  Compass,
  HelpCircle,
  FileText,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const CareerCenterPage: React.FC = () => {
  const { progress, completedModuleIds, completedLabIds, solvedCtfIds, completedIncidentIds } = useUserProgress();
  const [activeTab, setActiveTab] = useState<'readiness' | 'roadmaps' | 'interviews' | 'resume' | 'projects'>('readiness');

  // Job Readiness calculation based on actual student activity
  const readinessResult = calculateJobReadiness(
    progress.learning_progress,
    completedModuleIds,
    completedLabIds,
    solvedCtfIds,
    completedIncidentIds,
    progress.quiz_score
  );

  // Selected Career Roadmap Role
  const [selectedRole, setSelectedRole] = useState<CareerRole>('SOC Analyst');
  const activeRoadmap = CAREER_ROADMAPS.find(r => r.role === selectedRole) || CAREER_ROADMAPS[0];

  // Interview Questions state
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('iq-1');

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/30">
            <Compass className="w-3.5 h-3.5" /> Cybersecurity Career & Readiness Center
          </div>
          <h1 className="text-3xl font-extrabold text-white">Career Preparation & Job Readiness</h1>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Explore 6 specialized cybersecurity career roadmaps, test technical interview questions, optimize your resume, and calculate your real-time Job Readiness score based on actual platform execution.
          </p>
        </div>

        {/* Readiness Badge Widget */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-4 text-center sm:text-left shrink-0">
          <ScoreGauge score={readinessResult.overallScore} rating={readinessResult.readinessTier as any} size="sm" />
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">Job Readiness Score</span>
            <span className="text-xl font-extrabold text-white font-mono">{readinessResult.overallScore}%</span>
            <Badge variant="emerald" className="block mt-0.5">{readinessResult.readinessTier}</Badge>
          </div>
        </div>
      </div>

      {/* Non-Guarantee Disclaimer Notice */}
      <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-[10px] text-slate-400 leading-relaxed font-mono flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          <strong>Educational Notice:</strong> CyberShield's "Am I Job Ready?" Score is an algorithmic self-assessment calculated directly from your platform labs, CTF solves, and SOC incident triage accuracy. It does not make false guarantees regarding job placement, hiring outcomes, or salaries.
        </span>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('readiness')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
            activeTab === 'readiness'
              ? 'bg-cyan-500/10 border border-cyan-500/40 text-cyan-400'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> "Am I Job Ready?" Score
        </button>

        <button
          onClick={() => setActiveTab('roadmaps')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
            activeTab === 'roadmaps'
              ? 'bg-purple-500/10 border border-purple-500/40 text-purple-400'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Compass className="w-4 h-4" /> 6 Career Roadmaps
        </button>

        <button
          onClick={() => setActiveTab('interviews')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
            activeTab === 'interviews'
              ? 'bg-amber-500/10 border border-amber-500/40 text-amber-400'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <HelpCircle className="w-4 h-4" /> Interview Q&A Bank
        </button>

        <button
          onClick={() => setActiveTab('resume')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
            activeTab === 'resume'
              ? 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-400'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" /> Resume & Internship Prep
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
            activeTab === 'projects'
              ? 'bg-rose-500/10 border border-rose-500/40 text-rose-400'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4" /> Resume Projects & Checklist
        </button>
      </div>

      {/* Tab 1: "Am I Job Ready?" Engine */}
      {activeTab === 'readiness' && (
        <div className="space-y-8">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-6">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-widest">
                  Platform Activity Algorithmic Evaluation
                </span>
                <h3 className="text-2xl font-extrabold text-white">Your Algorithmic Job Readiness Rating</h3>
                <p className="text-xs text-slate-300">Calculated directly from your completed courses, interactive terminal labs, CTF solves, and SOC triage accuracy.</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center min-w-[200px]">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Overall Readiness</span>
                <span className="text-3xl font-black text-emerald-400 font-mono">{readinessResult.overallScore}%</span>
                <Badge variant="emerald" className="mt-1">{readinessResult.readinessTier}</Badge>
              </div>
            </div>

            {/* 6 Skill Pillars Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">Skill Pillar Readiness Breakdown:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {readinessResult.pillarMetrics.map(p => (
                  <div key={p.pillarName} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="font-bold text-slate-200">{p.pillarName}</span>
                      <span className={`font-bold ${p.score >= 80 ? 'text-emerald-400' : p.score >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                        {p.score}% ({p.status})
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${p.score >= 80 ? 'bg-emerald-400' : p.score >= 50 ? 'bg-amber-400' : 'bg-rose-400'}`}
                        style={{ width: `${p.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Action Steps to Boost Score */}
            <div className="p-5 bg-slate-950 rounded-xl border border-cyan-500/30 space-y-3 font-mono text-xs">
              <h4 className="text-cyan-400 font-bold uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" /> Actionable Next Steps to Increase Job Readiness:
              </h4>
              <ul className="space-y-2 text-slate-200">
                {readinessResult.recommendedNextSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 6 Career Roadmaps */}
      {activeTab === 'roadmaps' && (
        <div className="space-y-6">
          {/* Role Selector Buttons */}
          <div className="flex flex-wrap gap-2">
            {CAREER_ROADMAPS.map(r => (
              <button
                key={r.role}
                onClick={() => setSelectedRole(r.role)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedRole === r.role
                    ? 'bg-purple-500/10 border border-purple-500/40 text-purple-300'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {r.role}
              </button>
            ))}
          </div>

          {/* Active Roadmap Detail */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase font-bold tracking-wider">
                  Specialized Learning Roadmap
                </span>
                <h3 className="text-2xl font-extrabold text-white">{activeRoadmap.role}</h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">{activeRoadmap.description}</p>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-slate-400">Industry Demand:</span>
                <Badge variant="purple">{activeRoadmap.demandRating}</Badge>
              </div>
            </div>

            {/* Core Skills Chips */}
            <div className="space-y-2 font-mono text-xs">
              <span className="text-slate-400 uppercase font-bold text-[10px]">Essential Target Skills:</span>
              <div className="flex flex-wrap gap-2">
                {activeRoadmap.coreSkills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-semibold">
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Step-by-Step Milestones */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold text-white font-mono uppercase">Structured Execution Phases:</h4>
              {activeRoadmap.steps.map(step => (
                <div key={step.stepNumber} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-purple-300 font-bold border-b border-slate-800/80 pb-2">
                    <span>Phase {step.stepNumber}: {step.title}</span>
                    <span className="text-slate-400 text-[10px]">{step.duration}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-300">
                    <div>
                      <strong className="text-slate-400 block mb-1 text-[10px] uppercase">Topics Covered:</strong>
                      <ul className="space-y-1 text-[11px]">
                        {step.topics.map(t => <li key={t}>• {t}</li>)}
                      </ul>
                    </div>
                    <div>
                      <strong className="text-slate-400 block mb-1 text-[10px] uppercase">Recommended Platform Labs:</strong>
                      <ul className="space-y-1 text-[11px] text-cyan-400">
                        {step.recommendedLabs.map(l => <li key={l}>• {l}</li>)}
                      </ul>
                    </div>
                    <div>
                      <strong className="text-slate-400 block mb-1 text-[10px] uppercase">Target Certifications:</strong>
                      <ul className="space-y-1 text-[11px] text-amber-400">
                        {step.certsToTarget.map(c => <li key={c}>🏆 {c}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Technical Interview Q&A Bank */}
      {activeTab === 'interviews' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400" /> Cybersecurity Technical Interview Q&A Bank
            </h3>
            <p className="text-xs text-slate-300">Master real technical interview questions asked by security engineering hiring managers with structured model answers and official NIST/OWASP references.</p>

            <div className="space-y-3 font-mono text-xs pt-2">
              {TECHNICAL_INTERVIEW_QUESTIONS.map(q => {
                const isExpanded = expandedFaqId === q.id;
                return (
                  <div key={q.id} className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                    <button
                      onClick={() => setExpandedFaqId(isExpanded ? null : q.id)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-900/60 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="cyan">{q.role}</Badge>
                          <Badge variant="purple">{q.category}</Badge>
                          <span className="text-[10px] text-slate-400">[{q.difficulty}]</span>
                        </div>
                        <h4 className="text-xs font-bold text-white">{q.question}</h4>
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>

                    {isExpanded && (
                      <div className="p-4 border-t border-slate-800 bg-slate-900/40 space-y-3 text-slate-200 text-xs">
                        <div className="space-y-1">
                          <strong className="text-emerald-400 block font-bold">Model Technical Answer:</strong>
                          <p className="leading-relaxed font-sans text-slate-300">{q.modelAnswer}</p>
                        </div>
                        <div className="text-[10px] text-cyan-400 font-mono">
                          Official Technical Reference: <strong>{q.technicalReference}</strong>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Resume & Internship Prep */}
      {activeTab === 'resume' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 font-mono text-xs">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" /> Cybersecurity Resume & Internship Preparation
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Learn how to structure your cybersecurity resume to pass automated Applicant Tracking Systems (ATS) and showcase practical CyberShield lab execution.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-emerald-400 font-bold uppercase border-b border-slate-800 pb-2">
                  1. Essential Resume Sections to Include:
                </h4>
                <ul className="space-y-2 text-slate-300 text-[11px]">
                  <li>• <strong>Technical Skills:</strong> SIEM (Splunk/Elastic), Linux Sysadmin, Wireshark, OWASP Top 10, Python, Argon2.</li>
                  <li>• <strong>Verified Credentials:</strong> CyberShield Certificate of Completion (Verification ID: CS-2026-8F9B2C).</li>
                  <li>• <strong>Practical Experience:</strong> CyberShield SOC Incident Response Simulator & CTF Arena flags solved.</li>
                  <li>• <strong>GitHub Repositories:</strong> Python HTTP Header Scanner or Passphrase Generator scripts.</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-cyan-400 font-bold uppercase border-b border-slate-800 pb-2">
                  2. Internship Interview Preparation Checklist:
                </h4>
                <ul className="space-y-2 text-slate-300 text-[11px]">
                  <li>• Be ready to explain the <strong>TCP 3-Way Handshake</strong> and DNS query flow step-by-step.</li>
                  <li>• Practice explaining how you triaged a phishing email or brute force alert in CyberShield SOC Simulator.</li>
                  <li>• Review SQL Injection remediation: demonstrate parameterized prepared statements.</li>
                  <li>• Be prepared to talk through your CyberShield CTF flag solutions and methodology.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Resume Projects & Checklist */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 font-mono text-xs">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-rose-400" /> Resume-Boosting Practical Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-cyan-400 font-bold">1. Python Automated Vulnerability Scanner</h4>
                <p className="text-[11px] text-slate-300 font-sans">Build a CLI script using Python sockets to audit target web servers for missing Security Headers (CSP, HSTS, X-Content-Type-Options).</p>
                <Badge variant="cyan">Web Sec & Python</Badge>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-amber-400 font-bold">2. Local Argon2 Password Manager Vault</h4>
                <p className="text-[11px] text-slate-300 font-sans">Develop an offline client-side password vault that utilizes Argon2id key derivation and AES-256 GCM encryption.</p>
                <Badge variant="amber">Cryptography</Badge>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-rose-400 font-bold">3. SIEM Syslog Alert Parser & Enricher</h4>
                <p className="text-[11px] text-slate-300 font-sans">Write a Python script that ingests Linux auth.log or Windows event logs, parses failed logins, and queries VirusTotal API for IP reputation.</p>
                <Badge variant="rose">SOC & Threat Intel</Badge>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-emerald-400 font-bold">4. Custom YARA Signature Rulepack</h4>
                <p className="text-[11px] text-slate-300 font-sans">Create a set of YARA rules to detect webshells, obfuscated PowerShell strings, and reverse shell payloads.</p>
                <Badge variant="emerald">Blue Team</Badge>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

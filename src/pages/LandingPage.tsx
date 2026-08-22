import React from 'react';
import { Shield, Lock, Terminal, CheckCircle2, ArrowRight, Award, Sparkles, Code2, Users, Cpu, School, MapPin, Download } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GlowCard } from '../components/ui/GlowCard';
import { Badge } from '../components/ui/Badge';
import { ScoreGauge } from '../components/ui/ScoreGauge';
import { REAL_WORLD_CODE_INSIGHTS } from '../lib/mockData';
import { useAuth } from '../context/AuthContext';
import { AdBanner } from '../components/ads/AdBanner';
import { GuestMonetizationBanner } from '../components/monetization/GuestMonetizationBanner';

interface LandingPageProps {
  onNavigateToDashboard: () => void;
  openAuthModal: (mode: 'login' | 'register') => void;
  onNavigateToCodeInsights: () => void;
  onOpenDownloadModal?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigateToDashboard,
  openAuthModal,
  onNavigateToCodeInsights,
  onOpenDownloadModal
}) => {
  const { studentDirectory, user } = useAuth();
  const realStudentCount = studentDirectory.length;

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden">
        {/* Background Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* STUDENT COUNTER BANNER - SHOWN ONLY WHEN LOGGED IN / REGISTERED */}
          {user ? (
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs font-mono mb-6 shadow-lg shadow-emerald-500/10 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>🔥 <strong className="text-white font-extrabold">{realStudentCount} Student{realStudentCount === 1 ? '' : 's'} Active & Logged In</strong> | All 28 Indian States & 8 UTs</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-6 shadow-lg shadow-cyan-500/10">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>🛡️ CyberShield Platform • Covering All 28 Indian States & 8 Union Territories</span>
            </div>
          )}

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
            Learn Cybersecurity.<br />
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
              Test Awareness. Build Habits.
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-xl text-slate-300 mt-6 leading-relaxed">
            An interactive platform combining practical threat simulations, local password entropy analysis, cybersecurity quizzes, and real-world code security audits.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={onNavigateToDashboard}
              icon={<Terminal className="w-5 h-5" />}
            >
              Explore CyberShield Platform
            </Button>
            <Button
              variant="accent"
              size="lg"
              onClick={onOpenDownloadModal}
              icon={<Download className="w-5 h-5 animate-pulse" />}
            >
              Download App (~10MB)
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => openAuthModal('register')}
              icon={<ArrowRight className="w-5 h-5 text-cyan-400" />}
            >
              Create Student Account
            </Button>
          </div>

          {/* Public College & State Presence Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 max-w-4xl mx-auto">
            <span className="flex items-center gap-1.5 text-slate-200 font-bold">
              <School className="w-4 h-4 text-cyan-400" /> IIT BHU • DU • VJTI • BITS Pilani • AKTU • Anna Univ • NITs
            </span>
            <span className="flex items-center gap-1.5 text-slate-200 font-bold">
              <MapPin className="w-4 h-4 text-amber-400" /> All 28 States & 8 UTs (UP, Maharashtra, Delhi, TN, Karnataka, WB, Gujarat & More)
            </span>
          </div>

          {/* Interactive Hero Score Teaser */}
          <div className="mt-10 max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="flex flex-col items-center border-b md:border-b-0 md:border-r border-slate-800 pb-6 md:pb-0">
                <ScoreGauge score={82} rating="Strong" size="md" />
                <Badge variant="emerald" className="mt-2">Strong Score (81-100)</Badge>
              </div>

              <div className="col-span-2 text-left space-y-3">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> CyberShield 5-Step Learning Method
                </span>
                <h3 className="text-xl font-bold text-white">
                  LEARN → TEST → PRACTICE → SCORE → IMPROVE
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Instead of reading dry articles, complete interactive phishing identification scenarios, check password strength client-side, and inspect vulnerable vs secure production code.
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-2">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> 100% Client-Side Safe
                  </span>
                  <span className="flex items-center gap-1 text-cyan-400">
                    <Lock className="w-4 h-4" /> Zero Password Storage
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPONSORED MONETIZATION AD BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GuestMonetizationBanner />
        <AdBanner type="leaderboard" />
      </section>

      {/* Core Differentiator: The 5-Step Cycle */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="cyan" className="mb-2">Methodology</Badge>
          <h2 className="text-3xl font-extrabold text-white">The CyberShield Learning Journey</h2>
          <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
            Designed for college students, beginners, and security enthusiasts preparing for certifications and real jobs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { step: '01', title: 'LEARN', desc: 'Explore threat knowledge hub covering OWASP Top 10, ransomware & SQLi.', color: 'text-cyan-400' },
            { step: '02', title: 'TEST', desc: 'Take beginner to advanced quizzes across networking & cryptography.', color: 'text-purple-400' },
            { step: '03', title: 'PRACTICE', desc: 'Identify phishing emails, fake login prompts, & dangerous SMS.', color: 'text-rose-400' },
            { step: '04', title: 'SCORE', desc: 'Get a weighted CyberShield Score reflecting your overall security hygiene.', color: 'text-emerald-400' },
            { step: '05', title: 'IMPROVE', desc: 'Follow recommended next steps to elevate your rating to Strong.', color: 'text-amber-400' },
          ].map((s) => (
            <div key={s.step} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
              <span className={`text-2xl font-extrabold font-mono ${s.color} block mb-2`}>{s.step}</span>
              <h4 className="text-base font-bold text-white mb-1">{s.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Real-World Industry Code Section Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-2">
                <Code2 className="w-3.5 h-3.5" /> Real-World Job & Code Insights
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                How Security Engineers Write & Audit Production Code
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                Learn what actually happens when working on real-world projects: SQL Injection fixes, XSS escaping in React, and Bcrypt password hashing.
              </p>
            </div>

            <Button
              variant="accent"
              onClick={onNavigateToCodeInsights}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              View All Code Audits
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0b0f19] border border-rose-500/30 rounded-xl p-4 font-mono text-xs">
              <span className="text-rose-400 font-bold block mb-2">❌ VULNERABLE SQL QUERY (OWASP A03)</span>
              <code className="text-rose-200/80 block leading-relaxed">
                {REAL_WORLD_CODE_INSIGHTS[0].vulnerable_code}
              </code>
            </div>
            <div className="bg-[#0b0f19] border border-emerald-500/30 rounded-xl p-4 font-mono text-xs">
              <span className="text-emerald-400 font-bold block mb-2">✅ SECURE PREPARED STATEMENT FIX</span>
              <code className="text-emerald-200/80 block leading-relaxed">
                {REAL_WORLD_CODE_INSIGHTS[0].secure_code}
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* 50 MINI PROJECTS & FREE CODE SHOWCASE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-8 backdrop-blur-md space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 50 Production Cybersecurity Mini-Projects
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Build Your Resume & GitHub Portfolio with 50 Real Projects
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                All 50 project source codes, GitHub README templates, folder structures, and execution blueprints are <strong className="text-emerald-400">100% FREE after Student Login!</strong>
              </p>
            </div>

            <Button
              variant="accent"
              onClick={() => openAuthModal('login')}
              icon={<Lock className="w-4 h-4" />}
            >
              Login to Unlock All 50 Free Codes
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: '1', title: 'Multi-Threaded Port Scanner', category: 'Network Security', lang: 'Python 3.8+' },
              { id: '2', title: 'SQL Injection Test Engine', category: 'Web AppSec', lang: 'Python / requests' },
              { id: '3', title: 'AES-256 Encrypted Vault', category: 'Cryptography', lang: 'Python cryptography' },
              { id: '4', title: 'SIEM Auth Log Analyzer', category: 'Defense & SIEM', lang: 'Python / re' },
            ].map((p) => (
              <div key={p.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 relative overflow-hidden group">
                <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 font-bold">
                  <span>{p.category}</span>
                  <span className="text-slate-500">{p.lang}</span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">{p.title}</h4>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-amber-400" /> Source Code Locked
                  </span>
                  <span className="text-emerald-400 font-bold">Free After Login →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge variant="purple" className="mb-2">Target Audience</Badge>
          <h2 className="text-3xl font-extrabold text-white">Built for Security Learners & Students</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <GlowCard glowColor="cyan" hoverEffect={false}>
            <Users className="w-8 h-8 text-cyan-400 mb-3" />
            <h4 className="text-base font-bold text-white mb-1">College Students</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Reinforce computer science and networking courses with hands-on security activities.
            </p>
          </GlowCard>

          <GlowCard glowColor="emerald" hoverEffect={false}>
            <Cpu className="w-8 h-8 text-emerald-400 mb-3" />
            <h4 className="text-base font-bold text-white mb-1">Cyber Beginners</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Start from square one with clear explanations of phishing, malware, and password strength.
            </p>
          </GlowCard>

          <GlowCard glowColor="amber" hoverEffect={false}>
            <Award className="w-8 h-8 text-amber-400 mb-3" />
            <h4 className="text-base font-bold text-white mb-1">Cert & Hackathon Prep</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Prepare for CompTIA Security+, CEH, and security quizzes with realistic practice questions.
            </p>
          </GlowCard>

          <GlowCard glowColor="purple" hoverEffect={false}>
            <Shield className="w-8 h-8 text-purple-400 mb-3" />
            <h4 className="text-base font-bold text-white mb-1">Everyday Web Users</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Audit personal security hygiene, MFA adoption, and password habits safely.
            </p>
          </GlowCard>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/30 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Evaluate Your Cybersecurity Score?
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 mt-3">
            Start exploring CyberShield modules today. Free, interactive, and 100% client-side privacy focused.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="primary" size="lg" onClick={onNavigateToDashboard}>
              Launch CyberShield Dashboard
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUserProgress } from '../context/UserProgressContext';
import { getPublicPortfolioByUsername } from '../lib/certificatePortfolioData';
import { ScoreGauge } from '../components/ui/ScoreGauge';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
  Award,
  Calendar,
  School,
  MapPin,
  Share2,
  Terminal,
  Trophy,
  CheckCircle2,
  ShieldAlert,
  FolderGit2,
  Sparkles
} from 'lucide-react';

interface ProfilePageProps {
  onNavigateToTab?: (tab: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigateToTab }) => {
  const { user } = useAuth();
  const { progress, completedModuleIds, completedLabIds, solvedCtfIds, completedIncidentIds, socScore } = useUserProgress();
  const [copiedLink, setCopiedLink] = useState(false);

  const portfolio = getPublicPortfolioByUsername(user?.name || 'Shlok Tripathi');

  const handleSharePortfolio = () => {
    navigator.clipboard.writeText(window.location.origin + `/#/profile/${portfolio.username}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Profile Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <img
              src={user?.avatar || portfolio.avatarUrl}
              alt={user?.name || portfolio.studentName}
              className="w-24 h-24 rounded-2xl border-2 border-cyan-400 object-cover shadow-xl shadow-cyan-500/20"
            />
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-extrabold text-white">{user?.name || portfolio.studentName}</h1>
                <Badge variant="cyan">{portfolio.readinessTier}</Badge>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs font-mono text-slate-300 mt-2">
                <span className="flex items-center gap-1"><School className="w-3.5 h-3.5 text-cyan-400" /> {user?.college_name || portfolio.college}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-rose-400" /> {user?.state || portfolio.state}</span>
              </div>

              <p className="text-xs text-amber-300 font-mono mt-1 flex items-center justify-center sm:justify-start gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Target Career: {portfolio.targetCareerPath}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <ScoreGauge score={progress.total_score} rating={progress.rating_category} size="sm" />
            <div className="text-center sm:text-left space-y-1">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Cyber Readiness Rating</span>
              <span className="text-xl font-extrabold text-white font-mono">{progress.total_score} / 100</span>
              <Badge variant="emerald" className="block">{progress.rating_category}</Badge>
            </div>
          </div>
        </div>

        {/* Share & Actions Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Member Since: {portfolio.memberSince}
          </div>

          <div className="flex items-center gap-3">
            {onNavigateToTab && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onNavigateToTab('certificate')}
                icon={<Award className="w-4 h-4 text-amber-400" />}
              >
                View Verified Certificate
              </Button>
            )}

            <Button
              variant="primary"
              size="sm"
              onClick={handleSharePortfolio}
              icon={<Share2 className="w-4 h-4" />}
            >
              {copiedLink ? 'Copied Share Link!' : 'Share Public Cyber Portfolio'}
            </Button>
          </div>
        </div>
      </div>

      {/* Cyber Performance Stat Matrix */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4 font-mono flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" /> Practical Skills & Mastery Statistics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Total Earned XP"
            value={`${portfolio.totalXp + (solvedCtfIds.length * 100)} XP`}
            subtitle="Platform Experience Points"
            icon={<Award className="w-5 h-5 text-cyan-400" />}
            color="cyan"
          />
          <StatCard
            title="CTF Arena Score"
            value={`${solvedCtfIds.length * 100} pts`}
            subtitle={`${solvedCtfIds.length} CTF flags captured`}
            icon={<Trophy className="w-5 h-5 text-amber-400" />}
            color="amber"
          />
          <StatCard
            title="SOC Simulator Score"
            value={`${socScore} pts`}
            subtitle={`${completedIncidentIds.length} incidents triaged`}
            icon={<ShieldAlert className="w-5 h-5 text-rose-400" />}
            color="rose"
          />
          <StatCard
            title="Interactive Labs"
            value={`${completedLabIds.length} / 8`}
            subtitle="Sandboxed terminal labs"
            icon={<Terminal className="w-5 h-5 text-emerald-400" />}
            color="emerald"
          />
        </div>
      </div>

      {/* Portfolio Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Completed Modules & Labs */}
        <div className="space-y-6">
          {/* Completed Courses / Modules */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Completed Core Courses ({completedModuleIds.length}/5)
            </h3>
            <div className="space-y-2.5 font-mono text-xs">
              {completedModuleIds.length > 0 ? (
                completedModuleIds.map((id, idx) => (
                  <div key={id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-slate-200">
                    <span className="font-semibold">Module 0{idx + 1}: {id.replace('-', ' ').toUpperCase()}</span>
                    <Badge variant="emerald">Verified</Badge>
                  </div>
                ))
              ) : (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-400">
                  Web Security, Phishing Defense, and Password Entropy Modules in progress.
                </div>
              )}
            </div>
          </div>

          {/* Solved CTFs & SOC Incidents */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" /> Solved CTF Challenges & SOC Incidents
            </h3>
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-1">
                <span className="text-[10px] text-slate-400 block uppercase">CTF Flags Solved</span>
                <span className="text-xl font-bold text-amber-400">{solvedCtfIds.length} Flags</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-1">
                <span className="text-[10px] text-slate-400 block uppercase">SOC Cases Triaged</span>
                <span className="text-xl font-bold text-rose-400">{completedIncidentIds.length} Cases</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Mini Projects & Cyber Badges */}
        <div className="space-y-6">
          {/* Mini-Projects Showcase */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-purple-400" /> Built Mini-Projects Showcase
            </h3>
            <div className="space-y-2.5 font-mono text-xs">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-cyan-300 font-bold">
                  <span>Python Vulnerability Scanner</span>
                  <Badge variant="cyan">Completed</Badge>
                </div>
                <p className="text-[11px] text-slate-400 font-sans">Automated OWASP header auditor built with Python socket library.</p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-purple-300 font-bold">
                  <span>Argon2 Password Hash Vault</span>
                  <Badge variant="purple">Completed</Badge>
                </div>
                <p className="text-[11px] text-slate-400 font-sans">Secure offline password vault utilizing Argon2id hashing algorithms.</p>
              </div>
            </div>
          </div>

          {/* Badges Earned */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-400" /> Earned CyberShield Badges
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {portfolio.badges.map((b) => (
                <div key={b.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
                  <div className="w-8 h-8 mx-auto rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-extrabold text-sm">
                    🛡️
                  </div>
                  <h4 className="text-xs font-bold text-white">{b.title}</h4>
                  <p className="text-[10px] text-slate-400 font-sans">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


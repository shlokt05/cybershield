import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useUserProgress } from '../context/UserProgressContext';
import { ScoreGauge } from '../components/ui/ScoreGauge';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { Award, ShieldCheck, HelpCircle, MailWarning, Calendar, Mail } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { progress } = useUserProgress();

  if (!user) return null;

  return (
    <div className="space-y-8 pb-16">
      {/* Profile Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt={user.name}
            className="w-20 h-20 rounded-full border-2 border-cyan-400 object-cover shadow-lg shadow-cyan-500/20"
          />
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <Badge variant="cyan">{user.role || 'Student'}</Badge>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1 flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="w-3.5 h-3.5" /> {user.email}
            </p>
            <p className="text-[11px] text-slate-500 font-mono mt-1 flex items-center justify-center sm:justify-start gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Joined CyberShield: August 2026
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
          <ScoreGauge score={progress.total_score} rating={progress.rating_category} size="sm" />
          <div>
            <span className="text-xs font-mono text-slate-400 block uppercase">CyberShield Score</span>
            <span className="text-lg font-bold text-white">{progress.total_score} / 100</span>
            <Badge variant="emerald" className="mt-1">{progress.rating_category}</Badge>
          </div>
        </div>
      </div>

      {/* Statistics Matrix */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Learning Statistics & Completed Milestones</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Quiz Score"
            value={`${progress.quiz_score}%`}
            subtitle={`${progress.quizzes_completed} quizzes completed`}
            icon={<HelpCircle className="w-5 h-5 text-cyan-400" />}
            color="cyan"
          />
          <StatCard
            title="Phishing Accuracy"
            value={`${progress.phishing_score}%`}
            subtitle={`${progress.phishing_completed} scenarios analyzed`}
            icon={<MailWarning className="w-5 h-5 text-rose-400" />}
            color="rose"
          />
          <StatCard
            title="Hygiene Score"
            value={`${progress.security_hygiene_score}%`}
            subtitle={`${progress.checklist_items_completed} items verified`}
            icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />}
            color="emerald"
          />
          <StatCard
            title="Modules Done"
            value={`${progress.learning_progress}%`}
            subtitle="Overall V1 curriculum"
            icon={<Award className="w-5 h-5 text-purple-400" />}
            color="purple"
          />
        </div>
      </div>

      {/* Badges Earned */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-cyan-400" /> Earned CyberShield Badges
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-extrabold">
              🛡️
            </div>
            <h4 className="text-xs font-bold text-white">Shield Defender</h4>
            <p className="text-[10px] text-slate-400">First score assessment completed</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-extrabold">
              🔑
            </div>
            <h4 className="text-xs font-bold text-white">Hygiene Champion</h4>
            <p className="text-[10px] text-slate-400">MFA & password manager enabled</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/30 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400 font-extrabold">
              🎣
            </div>
            <h4 className="text-xs font-bold text-white">Phishing Detector</h4>
            <p className="text-[10px] text-slate-400">Spot spoofed sender domain</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/30 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 font-extrabold">
              💻
            </div>
            <h4 className="text-xs font-bold text-white">Code Auditor</h4>
            <p className="text-[10px] text-slate-400">Inspected SQLi vulnerability fix</p>
          </div>
        </div>
      </div>
    </div>
  );
};

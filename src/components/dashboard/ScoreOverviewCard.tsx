import React from 'react';
import { ScoreGauge } from '../ui/ScoreGauge';
import { useUserProgress } from '../../context/UserProgressContext';
import { Shield, Info } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const ScoreOverviewCard: React.FC = () => {
  const { progress } = useUserProgress();
  const { total_score, rating_category } = progress;

  const ratingInfo = {
    'High Risk': {
      title: 'High Security Risk',
      color: 'rose',
      badge: 'High Risk (0-30)',
      description: 'Your cybersecurity awareness and hygiene require immediate attention to protect against common threat vectors.'
    },
    'Needs Improvement': {
      title: 'Needs Security Improvement',
      color: 'amber',
      badge: 'Needs Improvement (31-60)',
      description: 'You understand key basics, but critical gaps remain in password hygiene or phishing identification.'
    },
    'Good': {
      title: 'Good Security Awareness',
      color: 'cyan',
      badge: 'Good Rating (61-80)',
      description: 'Solid foundational cybersecurity awareness! Complete advanced modules to attain Strong rating status.'
    },
    'Strong': {
      title: 'Strong Security Posture',
      color: 'emerald',
      badge: 'Strong Rating (81-100)',
      description: 'Outstanding security awareness! You demonstrate industry-aligned security hygiene and threat detection skills.'
    }
  };

  const currentInfo = ratingInfo[rating_category];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 relative overflow-hidden">
      {/* Subtle radial cyan glow background element */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Side: Score Gauge */}
        <div className="flex flex-col items-center shrink-0">
          <ScoreGauge score={total_score} rating={rating_category} size="lg" />
          <div className="mt-3">
            <Badge variant={currentInfo.color as any}>
              {currentInfo.badge}
            </Badge>
          </div>
        </div>

        {/* Right Side: Score Explanation */}
        <div className="flex-1 space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
              <Shield className="w-4 h-4" /> Comprehensive CyberShield Score
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {currentInfo.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              {currentInfo.description}
            </p>
          </div>

          {/* Sub-scores breakdown pills */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <span className="block text-[11px] font-mono text-slate-400">Quiz Knowledge</span>
              <span className="text-lg font-bold text-slate-100">{progress.quiz_score}%</span>
            </div>
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <span className="block text-[11px] font-mono text-slate-400">Phishing Accuracy</span>
              <span className="text-lg font-bold text-slate-100">{progress.phishing_score}%</span>
            </div>
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <span className="block text-[11px] font-mono text-slate-400">Hygiene Score</span>
              <span className="text-lg font-bold text-slate-100">{progress.security_hygiene_score}%</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-800/80">
            <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Note: This is an educational awareness rating to guide your learning, not a formal penetration audit.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

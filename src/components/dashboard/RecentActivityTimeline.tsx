import React from 'react';
import { Activity, CheckCircle2, ShieldAlert, Award, Clock } from 'lucide-react';

export const RecentActivityTimeline: React.FC = () => {
  const activities = [
    {
      id: 'act-1',
      title: 'Completed Cybersecurity Fundamentals Quiz',
      category: 'Quiz Module',
      score: 'Score: 85%',
      time: '2 hours ago',
      icon: <Award className="w-4 h-4 text-cyan-400" />
    },
    {
      id: 'act-2',
      title: 'Identified Urgent Bank Scam Email',
      category: 'Phishing Simulator',
      score: 'Correct: PHISHING',
      time: 'Yesterday',
      icon: <ShieldAlert className="w-4 h-4 text-rose-400" />
    },
    {
      id: 'act-3',
      title: 'Evaluated Password Entropy & Diversity',
      category: 'Password Security',
      score: '78 Bits Entropy',
      time: '2 days ago',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />
    }
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" /> Recent Security Activities
        </h3>
        <span className="text-xs text-slate-400 font-mono">Live Timeline</span>
      </div>

      <div className="space-y-3">
        {activities.map((act) => (
          <div
            key={act.id}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                {act.icon}
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-200">{act.title}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-mono text-slate-400">{act.category}</span>
                  <span className="text-[10px] text-slate-600">•</span>
                  <span className="text-[10px] font-mono text-cyan-400 font-semibold">{act.score}</span>
                </div>
              </div>
            </div>
            <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
              <Clock className="w-3 h-3" /> {act.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

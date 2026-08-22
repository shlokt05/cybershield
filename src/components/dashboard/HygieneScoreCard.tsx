import React from 'react';
import { useUserProgress } from '../../context/UserProgressContext';
import { INITIAL_CHECKLIST_ITEMS } from '../../lib/mockData';
import { CheckSquare, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

interface HygieneScoreCardProps {
  onNavigateToChecklist: () => void;
}

export const HygieneScoreCard: React.FC<HygieneScoreCardProps> = ({ onNavigateToChecklist }) => {
  const { progress, completedChecklistIds, toggleChecklistItem } = useUserProgress();
  const totalItems = INITIAL_CHECKLIST_ITEMS.length;
  const completedCount = completedChecklistIds.length;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Security Hygiene Progress</h3>
              <p className="text-xs text-slate-400">Personal security habits checklist</p>
            </div>
          </div>
          <span className="text-xl font-extrabold text-emerald-400 font-mono">
            {progress.security_hygiene_score}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 rounded-full h-2.5 mb-4 border border-slate-800 overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${progress.security_hygiene_score}%` }}
          />
        </div>

        {/* Interactive mini checklist list */}
        <div className="space-y-2 mb-4">
          {INITIAL_CHECKLIST_ITEMS.slice(0, 4).map((item) => {
            const isCompleted = completedChecklistIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                className={`flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                  isCompleted
                    ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-200'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => {}} // handled by parent onClick
                    className="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
                  />
                  <span className={isCompleted ? 'line-through text-slate-400' : 'font-medium'}>
                    {item.title}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">{item.category}</span>
              </div>
            );
          })}
        </div>
      </div>

      <Button
        variant="secondary"
        size="sm"
        onClick={onNavigateToChecklist}
        className="w-full mt-2"
        icon={<CheckSquare className="w-4 h-4 text-emerald-400" />}
      >
        View Full Checklist ({completedCount}/{totalItems} Done)
      </Button>
    </div>
  );
};

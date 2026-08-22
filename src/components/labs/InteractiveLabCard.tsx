import React from 'react';
import { InteractiveLab } from '../../types/interactiveLabs';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { OfficialReferenceSection } from '../ui/OfficialReferenceSection';
import { Clock, Zap, CheckCircle2, Terminal, ArrowRight } from 'lucide-react';

interface InteractiveLabCardProps {
  lab: InteractiveLab;
  isCompleted: boolean;
  onLaunchLab: (lab: InteractiveLab) => void;
}

export const InteractiveLabCard: React.FC<InteractiveLabCardProps> = ({
  lab,
  isCompleted,
  onLaunchLab
}) => {
  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return <Badge variant="cyan">Easy</Badge>;
      case 'Medium':
        return <Badge variant="purple">Medium</Badge>;
      case 'Hard':
        return <Badge variant="amber">Hard</Badge>;
      case 'Expert':
        return <Badge variant="rose">Expert</Badge>;
      default:
        return <Badge variant="slate">{diff}</Badge>;
    }
  };

  return (
    <div
      className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 shadow-lg ${
        isCompleted
          ? 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-500/60 shadow-emerald-500/5'
          : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 hover:shadow-cyan-500/10'
      }`}
    >
      <div className="space-y-3">
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2">
          <Badge variant="cyan">{lab.category}</Badge>
          <div className="flex items-center gap-2">
            {getDifficultyBadge(lab.difficulty)}
            {isCompleted && (
              <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3 h-3" /> COMPLETED
              </span>
            )}
          </div>
        </div>

        {/* Title & Scenario */}
        <div>
          <h3
            className="text-base font-bold text-white hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-2"
            onClick={() => onLaunchLab(lab)}
          >
            <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{lab.title}</span>
          </h3>
          <p className="text-xs text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
            {lab.scenario}
          </p>
        </div>

        {/* Quick Meta Details */}
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-1">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" /> {lab.estimatedMinutes} Mins
          </span>
          <span className="flex items-center gap-1 text-amber-400 font-bold">
            <Zap className="w-3.5 h-3.5 fill-amber-400/20" /> +{lab.xpReward} XP
          </span>
        </div>

        {/* Official References */}
        <OfficialReferenceSection sourceIds={lab.officialSourceIds} compact />
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
        <span className="text-[11px] font-mono text-slate-400">
          {lab.tasks.length} Task(s) • Sandbox Isolated
        </span>

        <Button
          size="sm"
          variant={isCompleted ? 'secondary' : 'primary'}
          onClick={() => onLaunchLab(lab)}
          icon={<ArrowRight className="w-3.5 h-3.5" />}
        >
          {isCompleted ? 'Review Lab' : 'Launch Lab'}
        </Button>
      </div>
    </div>
  );
};

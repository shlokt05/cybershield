import React from 'react';
import { SkillNode, SkillState } from '../../types/careerSkills';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { OfficialReferenceSection } from '../ui/OfficialReferenceSection';
import { Lock, CheckCircle2, Award, ArrowRight } from 'lucide-react';

interface SkillNodeCardProps {
  skill: SkillNode;
  state: SkillState;
  onSelectSkill: (skill: SkillNode) => void;
  onToggleComplete?: (skillId: string) => void;
}

export const SkillNodeCard: React.FC<SkillNodeCardProps> = ({
  skill,
  state,
  onSelectSkill,
  onToggleComplete
}) => {
  const getStateBadge = (st: SkillState) => {
    switch (st) {
      case 'LOCKED':
        return <span className="text-[10px] font-mono bg-slate-900 text-slate-500 px-2 py-0.5 rounded border border-slate-800 flex items-center gap-1"><Lock className="w-2.5 h-2.5" /> LOCKED</span>;
      case 'AVAILABLE':
        return <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30 font-semibold">AVAILABLE</span>;
      case 'IN_PROGRESS':
        return <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30 font-semibold">IN PROGRESS</span>;
      case 'COMPLETED':
        return <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1 font-semibold"><CheckCircle2 className="w-2.5 h-2.5" /> COMPLETED</span>;
      case 'MASTERED':
        return <span className="text-[10px] font-mono bg-purple-500/15 text-purple-300 px-2 py-0.5 rounded border border-purple-500/40 flex items-center gap-1 font-extrabold"><Award className="w-2.5 h-2.5 text-yellow-400" /> MASTERED</span>;
    }
  };

  const getBorderColor = (st: SkillState) => {
    switch (st) {
      case 'LOCKED': return 'border-slate-900 bg-slate-950/60 opacity-60';
      case 'AVAILABLE': return 'border-cyan-500/30 bg-slate-900/90 hover:border-cyan-500/60';
      case 'IN_PROGRESS': return 'border-amber-500/40 bg-slate-900/90 hover:border-amber-500/60';
      case 'COMPLETED': return 'border-emerald-500/40 bg-emerald-950/20 hover:border-emerald-500/60';
      case 'MASTERED': return 'border-purple-500/50 bg-purple-950/20 hover:border-purple-500/70 shadow-purple-500/10';
    }
  };

  return (
    <div className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-4 ${getBorderColor(state)} shadow-md`}>
      <div className="space-y-3">
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2">
          <Badge variant={skill.difficulty === 'Beginner' ? 'cyan' : skill.difficulty === 'Intermediate' ? 'purple' : 'emerald'}>
            {skill.category}
          </Badge>
          {getStateBadge(state)}
        </div>

        {/* Title & Description */}
        <div>
          <h4 className="text-sm font-bold text-white hover:text-cyan-300 transition-colors cursor-pointer" onClick={() => onSelectSkill(skill)}>
            {skill.title}
          </h4>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {skill.description}
          </p>
        </div>

        {/* Completion Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>Progress:</span>
            <span className="font-bold text-cyan-400">{skill.completionPercentage}%</span>
          </div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                state === 'MASTERED'
                  ? 'bg-gradient-to-r from-purple-500 to-yellow-400'
                  : state === 'COMPLETED'
                  ? 'bg-emerald-400'
                  : 'bg-cyan-400'
              }`}
              style={{ width: `${skill.completionPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Prerequisites indicators */}
        {skill.prerequisites.length > 0 && (
          <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
            <Lock className="w-2.5 h-2.5" /> Req: {skill.prerequisites.length} skill(s)
          </div>
        )}

        {/* Source Badges */}
        <OfficialReferenceSection sourceIds={skill.officialSourceIds} compact />
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between gap-2">
        <button
          onClick={() => onSelectSkill(skill)}
          className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1"
        >
          View Details <ArrowRight className="w-3 h-3" />
        </button>

        {state !== 'LOCKED' && onToggleComplete && (
          <Button
            size="sm"
            variant={state === 'COMPLETED' || state === 'MASTERED' ? 'secondary' : 'primary'}
            onClick={() => onToggleComplete(skill.id)}
          >
            {state === 'COMPLETED' || state === 'MASTERED' ? 'Mark Mastered' : 'Complete'}
          </Button>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { CtfChallenge } from '../../types/ctfArena';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { OfficialReferenceSection } from '../ui/OfficialReferenceSection';
import { Trophy, Zap, CheckCircle2, ArrowRight, Flag } from 'lucide-react';

interface CtfChallengeCardProps {
  challenge: CtfChallenge;
  isSolved: boolean;
  onSolveChallenge: (challenge: CtfChallenge) => void;
}

export const CtfChallengeCard: React.FC<CtfChallengeCardProps> = ({
  challenge,
  isSolved,
  onSolveChallenge
}) => {
  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return <Badge variant="cyan">Easy</Badge>;
      case 'Medium':
        return <Badge variant="purple">Medium</Badge>;
      case 'Hard':
        return <Badge variant="amber">Hard</Badge>;
      case 'Insane':
        return <Badge variant="rose">Insane</Badge>;
      default:
        return <Badge variant="slate">{diff}</Badge>;
    }
  };

  return (
    <div
      className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 shadow-lg ${
        isSolved
          ? 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-500/60 shadow-emerald-500/5'
          : 'bg-slate-900/80 border-slate-800 hover:border-amber-500/50 hover:shadow-amber-500/10'
      }`}
    >
      <div className="space-y-3">
        {/* Top Header Badges */}
        <div className="flex items-center justify-between gap-2">
          <Badge variant="amber">{challenge.category}</Badge>
          <div className="flex items-center gap-2">
            {getDifficultyBadge(challenge.difficulty)}
            {isSolved && (
              <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3 h-3" /> SOLVED
              </span>
            )}
          </div>
        </div>

        {/* Challenge Title & Description */}
        <div>
          <h3
            className="text-base font-bold text-white hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-2"
            onClick={() => onSolveChallenge(challenge)}
          >
            <Flag className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{challenge.title}</span>
          </h3>
          <p className="text-xs text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
            {challenge.description}
          </p>
        </div>

        {/* Metrics Footer */}
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-1">
          <span className="flex items-center gap-1 text-amber-400 font-extrabold">
            <Trophy className="w-3.5 h-3.5 fill-amber-400/20" /> +{challenge.points} PTS
          </span>
          <span className="flex items-center gap-1 text-cyan-400 font-bold">
            <Zap className="w-3.5 h-3.5 fill-cyan-400/20" /> +{challenge.xpReward} XP
          </span>
        </div>

        {/* Official Reference Icons */}
        <OfficialReferenceSection sourceIds={challenge.officialSourceIds} compact />
      </div>

      {/* Launcher Action */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
        <span className="text-[11px] font-mono text-slate-400">
          Flag format: CSCTF&#123;...&#125;
        </span>

        <Button
          size="sm"
          variant={isSolved ? 'secondary' : 'primary'}
          onClick={() => onSolveChallenge(challenge)}
          icon={<ArrowRight className="w-3.5 h-3.5" />}
        >
          {isSolved ? 'Review CTF' : 'Solve CTF'}
        </Button>
      </div>
    </div>
  );
};

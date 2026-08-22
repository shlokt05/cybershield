import React from 'react';
import { CareerPath } from '../../types/careerSkills';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Clock, Shield, ArrowRight } from 'lucide-react';
import { OfficialReferenceSection } from '../ui/OfficialReferenceSection';

interface CareerPathCardProps {
  path: CareerPath;
  userProgressPercent: number;
  onExplore: (path: CareerPath) => void;
}

export const CareerPathCard: React.FC<CareerPathCardProps> = ({
  path,
  userProgressPercent,
  onExplore
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between space-y-6 group shadow-lg">
      <div className="space-y-4">
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="cyan">{path.role}</Badge>
            <Badge variant="purple">{path.difficulty}</Badge>
          </div>
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-cyan-400" /> {path.estimatedHours}
          </span>
        </div>

        {/* Path Title & Overview */}
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
            {path.title}
          </h3>
          <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
            {path.overview}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Path Completion Progress:</span>
            <span className="text-cyan-400 font-bold">{userProgressPercent}%</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-500 rounded-full"
              style={{ width: `${userProgressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Required Skills */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-cyan-400" /> Key Skills & Competencies:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {path.skillsRequired.slice(0, 4).map((skill, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono bg-slate-950 text-slate-300 px-2.5 py-1 rounded-md border border-slate-800"
              >
                {skill}
              </span>
            ))}
            {path.skillsRequired.length > 4 && (
              <span className="text-[11px] font-mono text-slate-500 px-1 py-1">
                +{path.skillsRequired.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Quick Module Summary Counters */}
        <div className="grid grid-cols-3 gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-center text-xs font-mono">
          <div>
            <div className="text-slate-400 text-[10px] uppercase">Modules</div>
            <div className="text-white font-bold text-sm mt-0.5">
              {path.beginnerModules.length + path.intermediateModules.length + path.advancedModules.length}
            </div>
          </div>
          <div>
            <div className="text-slate-400 text-[10px] uppercase">Labs & CTF</div>
            <div className="text-cyan-400 font-bold text-sm mt-0.5">
              {path.labs.length + path.ctfChallenges.length}
            </div>
          </div>
          <div>
            <div className="text-slate-400 text-[10px] uppercase">Assessment</div>
            <div className="text-emerald-400 font-bold text-sm mt-0.5">
              {path.finalAssessment.passingScore}%
            </div>
          </div>
        </div>

        {/* Official References */}
        <OfficialReferenceSection sourceIds={path.officialSourceIds} compact />
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-slate-800/80">
        <Button
          variant="primary"
          className="w-full justify-center group-hover:shadow-cyan-500/20 shadow-md"
          icon={<ArrowRight className="w-4 h-4" />}
          onClick={() => onExplore(path)}
        >
          Explore Learning Roadmap
        </Button>
      </div>
    </div>
  );
};

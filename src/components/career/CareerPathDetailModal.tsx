import React, { useState } from 'react';
import { CareerPath, CareerModule } from '../../types/careerSkills';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { OfficialReferenceSection } from '../ui/OfficialReferenceSection';
import {
  CheckCircle2,
  Lock,
  BookOpen,
  Award,
  Shield,
  Terminal,
  Flag,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface CareerPathDetailModalProps {
  path: CareerPath | null;
  isOpen: boolean;
  onClose: () => void;
  completedModuleIds: string[];
  onCompleteModule?: (moduleId: string) => void;
}

export const CareerPathDetailModal: React.FC<CareerPathDetailModalProps> = ({
  path,
  isOpen,
  onClose,
  completedModuleIds,
  onCompleteModule
}) => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'labs_ctf' | 'assessment'>('roadmap');

  if (!path) return null;

  const totalModulesCount = path.beginnerModules.length + path.intermediateModules.length + path.advancedModules.length;
  const pathCompletedCount = [
    ...path.beginnerModules,
    ...path.intermediateModules,
    ...path.advancedModules
  ].filter(m => completedModuleIds.includes(m.id)).length;

  const progressPercent = Math.round((pathCompletedCount / totalModulesCount) * 100);

  const renderModuleCard = (mod: CareerModule, level: 'Beginner' | 'Intermediate' | 'Advanced', isUnlocked: boolean) => {
    const isCompleted = completedModuleIds.includes(mod.id);

    return (
      <div
        key={mod.id}
        className={`p-4 rounded-xl border transition-all ${
          isCompleted
            ? 'bg-emerald-950/30 border-emerald-500/40'
            : isUnlocked
            ? 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/40'
            : 'bg-slate-950/80 border-slate-900 opacity-60'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant={level === 'Beginner' ? 'cyan' : level === 'Intermediate' ? 'purple' : 'emerald'}>
                {level}
              </Badge>
              <span className="text-[11px] font-mono text-slate-400">~{mod.estimatedMinutes} Mins</span>
            </div>
            <h4 className="text-sm font-bold text-white mt-1">{mod.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{mod.description}</p>
          </div>

          <div className="flex-shrink-0 pt-0.5">
            {isCompleted ? (
              <span className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> Completed
              </span>
            ) : isUnlocked ? (
              <Button
                size="sm"
                variant="primary"
                onClick={() => onCompleteModule && onCompleteModule(mod.id)}
              >
                Start Module
              </Button>
            ) : (
              <span className="flex items-center gap-1 text-xs font-mono text-slate-500 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                <Lock className="w-3.5 h-3.5" /> Prerequisite Locked
              </span>
            )}
          </div>
        </div>

        {/* Topics */}
        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-800/60">
          {mod.topics.map((t, idx) => (
            <span key={idx} className="text-[10px] font-mono bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
              #{t}
            </span>
          ))}
        </div>

        {/* Official References */}
        <OfficialReferenceSection sourceIds={mod.officialSourceIds} compact className="mt-3" />
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={path.title} maxWidth="max-w-4xl">
      <div className="space-y-6 pb-4">
        {/* Header Overview Banner */}
        <div className="bg-slate-950 p-5 rounded-xl border border-cyan-500/30 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="cyan">{path.role}</Badge>
                <Badge variant="purple">{path.difficulty}</Badge>
                <span className="text-xs font-mono text-slate-400">Est. Time: {path.estimatedHours}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{path.title} Roadmap</h3>
            </div>

            <div className="text-right">
              <div className="text-xs font-mono text-slate-400">Path Progress</div>
              <div className="text-2xl font-extrabold text-cyan-400 font-mono">{progressPercent}%</div>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {path.overview}
          </p>

          {/* Progress bar */}
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Beginner Requirements & Required Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Beginner Prerequisites:
            </span>
            <ul className="space-y-1.5 pt-1">
              {path.beginnerRequirements.map((req, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 flex-shrink-0"></span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase flex items-center gap-1.5">
              <Shield className="w-4 h-4" /> Core Required Skills:
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {path.skillsRequired.map((skill, i) => (
                <span key={i} className="text-xs font-mono bg-slate-900 text-slate-200 px-2.5 py-1 rounded border border-slate-800">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center border-b border-slate-800 gap-4 text-xs font-mono">
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`pb-2.5 font-bold transition-colors border-b-2 ${
              activeTab === 'roadmap'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Learning Progression (Roadmap)
          </button>
          <button
            onClick={() => setActiveTab('labs_ctf')}
            className={`pb-2.5 font-bold transition-colors border-b-2 ${
              activeTab === 'labs_ctf'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Courses, Labs & CTF Challenges
          </button>
          <button
            onClick={() => setActiveTab('assessment')}
            className={`pb-2.5 font-bold transition-colors border-b-2 ${
              activeTab === 'assessment'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Final Assessment
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            {/* Beginner Modules */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                <ChevronRight className="w-4 h-4" /> Stage 1: Beginner Modules
              </div>
              <div className="space-y-3">
                {path.beginnerModules.map(m => renderModuleCard(m, 'Beginner', true))}
              </div>
            </div>

            {/* Intermediate Modules */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
                <ChevronRight className="w-4 h-4" /> Stage 2: Intermediate Modules
              </div>
              <div className="space-y-3">
                {path.intermediateModules.map(m => renderModuleCard(m, 'Intermediate', path.beginnerModules.every(bm => completedModuleIds.includes(bm.id))))}
              </div>
            </div>

            {/* Advanced Modules */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                <ChevronRight className="w-4 h-4" /> Stage 3: Advanced Modules
              </div>
              <div className="space-y-3">
                {path.advancedModules.map(m => renderModuleCard(m, 'Advanced', path.intermediateModules.every(im => completedModuleIds.includes(im.id))))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'labs_ctf' && (
          <div className="space-y-6">
            {/* Courses */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Recommended Courses:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {path.courses.map(c => (
                  <div key={c.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{c.title}</span>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                        {c.duration}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{c.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Labs */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase flex items-center gap-1.5">
                <Terminal className="w-4 h-4" /> Interactive Hands-on Labs:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {path.labs.map(l => (
                  <div key={l.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{l.title}</span>
                      <Badge variant={l.difficulty === 'Beginner' ? 'cyan' : l.difficulty === 'Intermediate' ? 'purple' : 'emerald'}>
                        {l.difficulty}
                      </Badge>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">Type: {l.type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTF Challenges */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                <Flag className="w-4 h-4" /> Capture The Flag (CTF) Challenges:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {path.ctfChallenges.map(ctf => (
                  <div key={ctf.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{ctf.title}</div>
                      <div className="text-[11px] font-mono text-slate-400">Category: {ctf.category}</div>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30">
                      +{ctf.points} PTS
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assessment' && (
          <div className="bg-slate-950 p-6 rounded-xl border border-cyan-500/30 space-y-4 text-center">
            <Award className="w-12 h-12 text-cyan-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">{path.finalAssessment.title}</h3>
            <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
              {path.finalAssessment.description}
            </p>
            <div className="inline-flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-lg border border-slate-800 text-xs font-mono">
              <span className="text-slate-400">Passing Requirement:</span>
              <span className="text-emerald-400 font-bold">{path.finalAssessment.passingScore}% Score</span>
            </div>
            <div className="pt-2">
              <Button variant="primary" icon={<Award className="w-4 h-4" />}>
                Begin Final Assessment Exam
              </Button>
            </div>
          </div>
        )}

        {/* Global Official Sources Footer */}
        <OfficialReferenceSection sourceIds={path.officialSourceIds} />
      </div>
    </Modal>
  );
};

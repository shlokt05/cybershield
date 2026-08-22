import React, { useState } from 'react';
import { CAREER_PATHS_FULL } from '../lib/careerPathsData';
import { CareerPath } from '../types/careerSkills';
import { CareerPathCard } from '../components/career/CareerPathCard';
import { CareerPathDetailModal } from '../components/career/CareerPathDetailModal';
import { SkillGraphVisualizer } from '../components/career/SkillGraphVisualizer';
import { useUserProgress } from '../context/UserProgressContext';
import { Button } from '../components/ui/Button';
import { Compass, Award, Network, Target, Search, Sparkles } from 'lucide-react';

interface LearningPathsPageProps {
  onSelectModule: (moduleId: string) => void;
  onNavigateToCertificate: () => void;
}

export const LearningPathsPage: React.FC<LearningPathsPageProps> = ({
  onNavigateToCertificate
}) => {
  const {
    completedModuleIds,
    completedSkillIds,
    masteredSkillIds,
    toggleSkillComplete,
    toggleSkillMastered,
    markModuleCompleted
  } = useUserProgress();

  const [activeTab, setActiveTab] = useState<'career_paths' | 'skill_graph'>('career_paths');
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCareerPaths = CAREER_PATHS_FULL.filter(path =>
    path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    path.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    path.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
    path.skillsRequired.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              <Compass className="w-4 h-4" /> Career Guidance & Knowledge Matrix
            </div>
            <h1 className="text-3xl font-extrabold text-white">Cybersecurity Career Paths & Skill Graph</h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Explore 10 structured cybersecurity career tracks designed around official OWASP, NIST, MITRE ATT&CK, CISA, and CWE standards. Master prerequisites on the interactive skill tree and earn your CyberShield Certificate.
            </p>
          </div>

          <Button
            variant="primary"
            onClick={onNavigateToCertificate}
            icon={<Award className="w-4 h-4" />}
            className="self-start md:self-auto"
          >
            Track Certificate Status
          </Button>
        </div>

        {/* Navigation Tabs (Career Paths vs Skill Graph) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start">
            <button
              onClick={() => setActiveTab('career_paths')}
              className={`flex items-center gap-2 text-xs font-mono font-bold px-4 py-2 rounded-lg transition-all ${
                activeTab === 'career_paths'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              <Target className="w-4 h-4" /> 10 Career Paths ({CAREER_PATHS_FULL.length})
            </button>

            <button
              onClick={() => setActiveTab('skill_graph')}
              className={`flex items-center gap-2 text-xs font-mono font-bold px-4 py-2 rounded-lg transition-all ${
                activeTab === 'skill_graph'
                  ? 'bg-purple-500 text-slate-950 shadow-md shadow-purple-500/20'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              <Network className="w-4 h-4" /> Interactive Skill Graph
            </button>
          </div>

          {/* Search Bar for Career Paths */}
          {activeTab === 'career_paths' && (
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search paths or skills..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 text-xs font-mono text-slate-100 pl-9 pr-4 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500/60 placeholder-slate-500"
              />
            </div>
          )}
        </div>
      </div>

      {/* Career Paths View */}
      {activeTab === 'career_paths' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" /> Official Cybersecurity Career Tracks:
            </span>
            <span className="text-xs font-mono text-slate-500">
              Showing {filteredCareerPaths.length} of {CAREER_PATHS_FULL.length} Tracks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCareerPaths.map(path => {
              const totalModules = path.beginnerModules.length + path.intermediateModules.length + path.advancedModules.length;
              const completedCount = [
                ...path.beginnerModules,
                ...path.intermediateModules,
                ...path.advancedModules
              ].filter(m => completedModuleIds.includes(m.id)).length;

              const pathProgressPercent = Math.round((completedCount / totalModules) * 100);

              return (
                <CareerPathCard
                  key={path.id}
                  path={path}
                  userProgressPercent={pathProgressPercent}
                  onExplore={p => setSelectedPath(p)}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Skill Graph View */}
      {activeTab === 'skill_graph' && (
        <SkillGraphVisualizer
          completedSkillIds={completedSkillIds}
          masteredSkillIds={masteredSkillIds}
          onToggleSkillComplete={toggleSkillComplete}
          onToggleSkillMastered={toggleSkillMastered}
        />
      )}

      {/* Path Detail Modal */}
      {selectedPath && (
        <CareerPathDetailModal
          path={selectedPath}
          isOpen={Boolean(selectedPath)}
          onClose={() => setSelectedPath(null)}
          completedModuleIds={completedModuleIds}
          onCompleteModule={modId => markModuleCompleted(modId, 100)}
        />
      )}
    </div>
  );
};

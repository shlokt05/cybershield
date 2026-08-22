import React, { useState } from 'react';
import { SkillNode, SkillState, SkillCategory } from '../../types/careerSkills';
import { SKILL_NODES_FULL } from '../../lib/skillsData';
import { SkillNodeCard } from './SkillNodeCard';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { OfficialReferenceSection } from '../ui/OfficialReferenceSection';
import {
  Network,
  Filter,
  Lock,
  BookOpen,
  Terminal
} from 'lucide-react';

interface SkillGraphVisualizerProps {
  completedSkillIds: string[];
  masteredSkillIds: string[];
  onToggleSkillComplete: (skillId: string) => void;
  onToggleSkillMastered: (skillId: string) => void;
}

const CATEGORIES: SkillCategory[] = [
  'Networking',
  'Linux',
  'Python',
  'Web Security',
  'Cryptography',
  'Authentication',
  'Cloud Security',
  'SOC',
  'Digital Forensics',
  'Incident Response',
  'Threat Intelligence',
  'Security Engineering'
];

export const SkillGraphVisualizer: React.FC<SkillGraphVisualizerProps> = ({
  completedSkillIds,
  masteredSkillIds,
  onToggleSkillComplete,
  onToggleSkillMastered
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('ALL');
  const [activeSkillModal, setActiveSkillModal] = useState<SkillNode | null>(null);

  // Compute state of each skill node based on completed prerequisites
  const getSkillState = (node: SkillNode): SkillState => {
    const isMastered = masteredSkillIds.includes(node.id);
    if (isMastered) return 'MASTERED';

    const isCompleted = completedSkillIds.includes(node.id);
    if (isCompleted) return 'COMPLETED';

    // Check prerequisites
    if (node.prerequisites.length > 0) {
      const prereqsSatisfied = node.prerequisites.every(
        pId => completedSkillIds.includes(pId) || masteredSkillIds.includes(pId)
      );
      if (!prereqsSatisfied) return 'LOCKED';
    }

    return 'AVAILABLE';
  };

  const filteredSkills = SKILL_NODES_FULL.filter(node => {
    const matchesCategory = selectedCategory === 'ALL' || node.category === selectedCategory;
    const nodeState = getSkillState(node);
    const matchesState = selectedStateFilter === 'ALL' || nodeState === selectedStateFilter;
    return matchesCategory && matchesState;
  });

  const totalSkills = SKILL_NODES_FULL.length;
  const completedCount = SKILL_NODES_FULL.filter(s => completedSkillIds.includes(s.id)).length;
  const masteredCount = SKILL_NODES_FULL.filter(s => masteredSkillIds.includes(s.id)).length;
  const availableCount = SKILL_NODES_FULL.filter(s => getSkillState(s) === 'AVAILABLE').length;

  return (
    <div className="space-y-6">
      {/* Visualizer Header */}
      <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest mb-1">
              <Network className="w-4 h-4" /> Interactive Skill Graph & Knowledge Matrix
            </div>
            <h2 className="text-2xl font-extrabold text-white">Cybersecurity Skill Tree</h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Track your cybersecurity mastery across 12 core security domains. Skills dynamically unlock as you satisfy prerequisite dependencies.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs">
            <div className="text-center px-2">
              <div className="text-slate-400 text-[10px] uppercase">Unlocked</div>
              <div className="text-cyan-400 font-bold text-base">{availableCount + completedCount}</div>
            </div>
            <div className="w-px h-8 bg-slate-800"></div>
            <div className="text-center px-2">
              <div className="text-slate-400 text-[10px] uppercase">Completed</div>
              <div className="text-emerald-400 font-bold text-base">{completedCount}</div>
            </div>
            <div className="w-px h-8 bg-slate-800"></div>
            <div className="text-center px-2">
              <div className="text-slate-400 text-[10px] uppercase">Mastered</div>
              <div className="text-purple-300 font-bold text-base">{masteredCount}</div>
            </div>
          </div>
        </div>

        {/* Category Filters Carousel / Badges */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-cyan-400" /> Filter Domain Category:
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`text-xs font-mono px-3 py-1 rounded-lg border transition-all ${
                selectedCategory === 'ALL'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              All Domains ({totalSkills})
            </button>
            {CATEGORIES.map(cat => {
              const catCount = SKILL_NODES_FULL.filter(s => s.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-mono px-3 py-1 rounded-lg border transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {cat} ({catCount})
                </button>
              );
            })}
          </div>
        </div>

        {/* State Filter Buttons */}
        <div className="flex items-center gap-2 pt-1 font-mono text-xs overflow-x-auto">
          <span className="text-slate-500 text-[10px] uppercase">State:</span>
          {['ALL', 'AVAILABLE', 'IN_PROGRESS', 'COMPLETED', 'MASTERED', 'LOCKED'].map(st => (
            <button
              key={st}
              onClick={() => setSelectedStateFilter(st)}
              className={`text-[11px] px-2.5 py-0.5 rounded border transition-colors ${
                selectedStateFilter === st
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 font-bold'
                  : 'bg-slate-950 text-slate-400 border-slate-900 hover:text-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Skill Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map(skill => {
          const state = getSkillState(skill);
          return (
            <SkillNodeCard
              key={skill.id}
              skill={skill}
              state={state}
              onSelectSkill={sk => setActiveSkillModal(sk)}
              onToggleComplete={sId => {
                if (state === 'COMPLETED') {
                  onToggleSkillMastered(sId);
                } else {
                  onToggleSkillComplete(sId);
                }
              }}
            />
          );
        })}
      </div>

      {filteredSkills.length === 0 && (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 space-y-2">
          <p className="text-sm font-mono">No skills match the selected filter criteria.</p>
          <Button size="sm" variant="secondary" onClick={() => { setSelectedCategory('ALL'); setSelectedStateFilter('ALL'); }}>
            Reset Filters
          </Button>
        </div>
      )}

      {/* Skill Detail Modal */}
      {activeSkillModal && (
        <Modal
          isOpen={Boolean(activeSkillModal)}
          onClose={() => setActiveSkillModal(null)}
          title={activeSkillModal.title}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <Badge variant="cyan">{activeSkillModal.category}</Badge>
              <Badge variant="purple">{activeSkillModal.difficulty}</Badge>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed">
              {activeSkillModal.description}
            </p>

            {/* Prerequisites */}
            {activeSkillModal.prerequisites.length > 0 && (
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> Prerequisite Dependencies:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeSkillModal.prerequisites.map(pId => {
                    const prereqNode = SKILL_NODES_FULL.find(s => s.id === pId);
                    const isDone = completedSkillIds.includes(pId) || masteredSkillIds.includes(pId);
                    return (
                      <span
                        key={pId}
                        className={`text-xs font-mono px-2 py-0.5 rounded border ${
                          isDone
                            ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                            : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        {isDone ? '✓' : '🔒'} {prereqNode ? prereqNode.title : pId}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Related Learning Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> Related Courses:
                </span>
                <ul className="text-xs text-slate-300 space-y-1 pt-1">
                  {activeSkillModal.relatedCourses.map((rc, i) => (
                    <li key={i}>• {rc}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs font-mono text-purple-400 font-bold flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5" /> Related Labs:
                </span>
                <ul className="text-xs text-slate-300 space-y-1 pt-1">
                  {activeSkillModal.relatedLabs.map((rl, i) => (
                    <li key={i}>• {rl}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Official References */}
            <OfficialReferenceSection sourceIds={activeSkillModal.officialSourceIds} />

            {/* Status Actions */}
            <div className="pt-2 border-t border-slate-800 flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => {
                  onToggleSkillComplete(activeSkillModal.id);
                }}
              >
                {completedSkillIds.includes(activeSkillModal.id) ? 'Mark Incomplete' : 'Mark Completed'}
              </Button>

              <Button
                variant="primary"
                onClick={() => {
                  onToggleSkillMastered(activeSkillModal.id);
                }}
              >
                {masteredSkillIds.includes(activeSkillModal.id) ? 'Unmark Mastery' : 'Mark Mastered ⭐'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

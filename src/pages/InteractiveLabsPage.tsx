import React, { useState } from 'react';
import { INTERACTIVE_LABS_FULL } from '../lib/interactiveLabsData';
import { InteractiveLab, LabCategory } from '../types/interactiveLabs';
import { InteractiveLabCard } from '../components/labs/InteractiveLabCard';
import { InteractiveLabRunnerModal } from '../components/labs/InteractiveLabRunnerModal';
import { useUserProgress } from '../context/UserProgressContext';
import { Button } from '../components/ui/Button';
import {
  Terminal,
  Zap,
  Filter,
  CheckCircle2,
  Search,
  Sparkles
} from 'lucide-react';

const CATEGORIES: LabCategory[] = [
  'Networking',
  'Linux',
  'Web Security',
  'Authentication',
  'Cryptography',
  'SOC',
  'Digital Forensics',
  'OSINT',
  'Python Security',
  'Cloud Security'
];

export const InteractiveLabsPage: React.FC = () => {
  const { completedLabIds, earnedLabXp, completeLab } = useUserProgress();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLab, setActiveLab] = useState<InteractiveLab | null>(null);

  const filteredLabs = INTERACTIVE_LABS_FULL.filter(lab => {
    const matchesCategory = selectedCategory === 'ALL' || lab.category === selectedCategory;
    const matchesSearch =
      lab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.scenario.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalLabs = INTERACTIVE_LABS_FULL.length;
  const completedCount = INTERACTIVE_LABS_FULL.filter(l => completedLabIds.includes(l.id)).length;

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              <Terminal className="w-4 h-4" /> Hands-On Security Training & Sandbox
            </div>
            <h1 className="text-3xl font-extrabold text-white">Interactive Cybersecurity Labs</h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Practice real-world offensive and defensive security operations across 10 security domains. Solve tasks, submit flags (CS&#123;...&#125;), earn XP points, and analyze remediation strategies based on OWASP, NIST, and MITRE ATT&CK standards.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
            <div className="text-center px-2">
              <div className="text-slate-400 text-[10px] uppercase">Earned XP</div>
              <div className="text-amber-400 font-extrabold text-xl flex items-center justify-center gap-1">
                <Zap className="w-4 h-4 fill-amber-400/20" /> {earnedLabXp}
              </div>
            </div>
            <div className="w-px h-10 bg-slate-800"></div>
            <div className="text-center px-2">
              <div className="text-slate-400 text-[10px] uppercase">Labs Completed</div>
              <div className="text-emerald-400 font-extrabold text-xl flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> {completedCount} / {totalLabs}
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-cyan-400" /> Filter Domain Category:
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search labs..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 text-xs font-mono text-slate-100 pl-8 pr-3 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500"
              />
            </div>
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
              All Domains ({totalLabs})
            </button>
            {CATEGORIES.map(cat => {
              const count = INTERACTIVE_LABS_FULL.filter(l => l.category === cat).length;
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
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Labs Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 flex items-center gap-1.5 font-bold uppercase">
            <Sparkles className="w-4 h-4 text-cyan-400" /> Available Interactive Labs:
          </span>
          <span className="text-slate-500">
            Showing {filteredLabs.length} of {totalLabs} Labs
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabs.map(lab => (
            <InteractiveLabCard
              key={lab.id}
              lab={lab}
              isCompleted={completedLabIds.includes(lab.id)}
              onLaunchLab={l => setActiveLab(l)}
            />
          ))}
        </div>

        {filteredLabs.length === 0 && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 space-y-2">
            <p className="text-sm font-mono">No interactive labs match your filter criteria.</p>
            <Button size="sm" variant="secondary" onClick={() => { setSelectedCategory('ALL'); setSearchQuery(''); }}>
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Lab Runner Modal */}
      {activeLab && (
        <InteractiveLabRunnerModal
          lab={activeLab}
          isOpen={Boolean(activeLab)}
          onClose={() => setActiveLab(null)}
          isAlreadyCompleted={completedLabIds.includes(activeLab.id)}
          onCompleteLab={(lId, xp) => completeLab(lId, xp)}
        />
      )}
    </div>
  );
};

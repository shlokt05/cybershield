import React, { useState } from 'react';
import { INITIAL_CHECKLIST_ITEMS } from '../lib/mockData';
import { useUserProgress } from '../context/UserProgressContext';
import { CheckSquare, Filter } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const ChecklistPage: React.FC = () => {
  const { completedChecklistIds, toggleChecklistItem, progress } = useUserProgress();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Account Security', 'Device Security', 'Data Privacy', 'Email Security', 'Network Security'];

  const filteredItems = INITIAL_CHECKLIST_ITEMS.filter(item =>
    selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
            <CheckSquare className="w-4 h-4" /> Personal Security Hygiene Audit
          </div>
          <h1 className="text-3xl font-extrabold text-white">Security Hygiene Checklist</h1>
          <p className="text-sm text-slate-300 mt-1">
            Check off key security habits to increase your CyberShield Score and strengthen your defense posture.
          </p>
        </div>

        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-center shrink-0">
          <span className="text-xs font-mono text-slate-400 block uppercase">Hygiene Score</span>
          <span className="text-3xl font-extrabold text-emerald-400 font-mono">
            {progress.security_hygiene_score}%
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            {completedChecklistIds.length} / {INITIAL_CHECKLIST_ITEMS.length} Tasks Complete
          </span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter className="w-4 h-4 text-slate-500 shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Checklist Grid */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isDone = completedChecklistIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleChecklistItem(item.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                isDone
                  ? 'bg-emerald-500/5 border-emerald-500/30 text-slate-200'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <input
                type="checkbox"
                checked={isDone}
                onChange={() => {}}
                className="mt-1 rounded bg-slate-950 border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer w-4 h-4"
              />

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className={`text-base font-bold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                    {item.title}
                  </h4>
                  <Badge variant="emerald">{item.category}</Badge>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

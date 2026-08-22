import React, { useState } from 'react';
import { REAL_WORLD_CODE_INSIGHTS } from '../../lib/mockData';
import { Code2, CheckCircle2, AlertTriangle, ShieldAlert, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface RealWorldCodeTeaserProps {
  onOpenFullCodeInsights: () => void;
}

export const RealWorldCodeTeaser: React.FC<RealWorldCodeTeaserProps> = ({ onOpenFullCodeInsights }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const currentItem = REAL_WORLD_CODE_INSIGHTS[selectedIdx];

  return (
    <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden shadow-xl shadow-purple-950/20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs font-mono text-purple-400 uppercase tracking-widest bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Real-World Code Security & Job Insights
            </span>
            <Badge variant="purple">OWASP / CWE</Badge>
          </div>
          <h3 className="text-xl font-bold text-slate-100 mt-1">
            How Code Security Works in Production Systems
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare vulnerable code snippets against secure fixes written by real application security engineers.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={onOpenFullCodeInsights}
          icon={<Code2 className="w-4 h-4 text-purple-400" />}
        >
          Explore All Real-World Code Scenarios
        </Button>
      </div>

      {/* Code Snippet Tabs */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
        {REAL_WORLD_CODE_INSIGHTS.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setSelectedIdx(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
              selectedIdx === idx
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Side-by-side Code Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Vulnerable Code Box */}
        <div className="bg-[#0b0f19] border border-rose-500/30 rounded-xl p-4 font-mono text-xs overflow-x-auto">
          <div className="flex items-center justify-between text-rose-400 font-semibold mb-2 pb-2 border-b border-rose-500/20">
            <span className="flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> ❌ Vulnerable Implementation
            </span>
            <span className="text-[10px] text-slate-500 uppercase">{currentItem.language}</span>
          </div>
          <pre className="text-rose-200/90 leading-relaxed overflow-x-auto">
            <code>{currentItem.vulnerable_code}</code>
          </pre>
        </div>

        {/* Secure Fix Code Box */}
        <div className="bg-[#0b0f19] border border-emerald-500/30 rounded-xl p-4 font-mono text-xs overflow-x-auto">
          <div className="flex items-center justify-between text-emerald-400 font-semibold mb-2 pb-2 border-b border-emerald-500/20">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> ✅ Secure Industry Fix
            </span>
            <span className="text-[10px] text-slate-500 uppercase">{currentItem.language}</span>
          </div>
          <pre className="text-emerald-200/90 leading-relaxed overflow-x-auto">
            <code>{currentItem.secure_code}</code>
          </pre>
        </div>
      </div>

      {/* Real-World Context Callout */}
      <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-xs text-purple-200 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-purple-300">Industry Security Workflow: </span>
          {currentItem.real_world_context}
        </div>
      </div>
    </div>
  );
};

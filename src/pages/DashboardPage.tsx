import React from 'react';
import { ScoreOverviewCard } from '../components/dashboard/ScoreOverviewCard';
import { HygieneScoreCard } from '../components/dashboard/HygieneScoreCard';
import { ModuleProgressGrid } from '../components/dashboard/ModuleProgressGrid';
import { RealWorldCodeTeaser } from '../components/dashboard/RealWorldCodeTeaser';
import { RecentActivityTimeline } from '../components/dashboard/RecentActivityTimeline';
import { RecommendedModules } from '../components/dashboard/RecommendedModules';
import { Info } from 'lucide-react';

interface DashboardPageProps {
  onSelectModule: (moduleId: string) => void;
  onNavigateToCodeInsights: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onSelectModule,
  onNavigateToCodeInsights
}) => {

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-cyan-950/80 via-slate-900 to-emerald-950/80 border border-cyan-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold block">
              📚 Master Interactive Chapter Notes Available
            </span>
            <p className="text-xs text-slate-200 font-medium">
              Every module contains detailed online study notes per chapter + complete 20-question exam solution keys!
            </p>
          </div>
        </div>
        <button
          onClick={() => onSelectModule('web-security')}
          className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all shrink-0 w-full sm:w-auto shadow-lg"
        >
          📄 Open Study Resources
        </button>
      </div>

      {/* Main Score Breakdown Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ScoreOverviewCard />
        </div>
        <div>
          <HygieneScoreCard onNavigateToChecklist={() => onSelectModule('checklist')} />
        </div>
      </div>

      {/* Real-World Industry Code Section */}
      <div>
        <RealWorldCodeTeaser onOpenFullCodeInsights={onNavigateToCodeInsights} />
      </div>

      {/* Core Learning Modules Grid */}
      <div>
        <ModuleProgressGrid onSelectModule={onSelectModule} />
      </div>

      {/* Activity Timeline & Next Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivityTimeline />
        <RecommendedModules onSelectModule={onSelectModule} />
      </div>
    </div>
  );
};

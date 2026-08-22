import React, { useState } from 'react';
import { SOC_INCIDENTS_FULL } from '../lib/socSimulatorData';
import { SocIncidentCase, SocCategory } from '../types/socSimulator';
import { SocIncidentCard } from '../components/soc/SocIncidentCard';
import { SocIncidentWorkbenchModal } from '../components/soc/SocIncidentWorkbenchModal';
import { useUserProgress } from '../context/UserProgressContext';
import { Button } from '../components/ui/Button';
import {
  ShieldAlert,
  Trophy,
  Filter,
  CheckCircle2,
  Search,
  Sparkles
} from 'lucide-react';

const SOC_CATEGORIES: SocCategory[] = [
  'Phishing',
  'Brute Force',
  'Suspicious Login',
  'Account Compromise',
  'Malware Alert',
  'Data Exfiltration',
  'Web Attack',
  'PowerShell Activity'
];

export const SocSimulatorPage: React.FC = () => {
  const { completedIncidentIds, socScore, completeSocIncident } = useUserProgress();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeIncident, setActiveIncident] = useState<SocIncidentCase | null>(null);

  const filteredIncidents = SOC_INCIDENTS_FULL.filter(inc => {
    const matchesCategory = selectedCategory === 'ALL' || inc.category === selectedCategory;
    const matchesSeverity = selectedSeverity === 'ALL' || inc.severity === selectedSeverity;
    const matchesSearch =
      inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.mitreId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSeverity && matchesSearch;
  });

  const totalIncidents = SOC_INCIDENTS_FULL.length;
  const completedCount = SOC_INCIDENTS_FULL.filter(i => completedIncidentIds.includes(i.id)).length;

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-rose-500/30 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-widest mb-2">
              <ShieldAlert className="w-4 h-4" /> Tier-1 / Tier-2 SOC Analyst Incident Response
            </div>
            <h1 className="text-3xl font-extrabold text-white">SOC & Incident Response Simulator</h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Investigate simulated cyber incidents in an isolated SIEM workbench. Inspect raw Sysmon logs, DNS queries, auth events, and file hashes to perform 7-point triage investigations and execute NIST SP 800-61 containment playbooks.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
            <div className="text-center px-2">
              <div className="text-slate-400 text-[10px] uppercase">SOC Points</div>
              <div className="text-amber-400 font-extrabold text-xl flex items-center justify-center gap-1">
                <Trophy className="w-4 h-4 fill-amber-400/20" /> {socScore}
              </div>
            </div>
            <div className="w-px h-10 bg-slate-800"></div>
            <div className="text-center px-2">
              <div className="text-slate-400 text-[10px] uppercase">Triaged Cases</div>
              <div className="text-emerald-400 font-extrabold text-xl flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> {completedCount} / {totalIncidents}
              </div>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search SIEM alerts & MITRE ID..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 text-xs font-mono text-slate-100 pl-8 pr-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Severity Badges */}
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span className="text-slate-400 text-[11px] font-bold uppercase mr-1">Severity:</span>
            {['ALL', 'Medium', 'High', 'Critical'].map(sev => (
              <button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={`px-3 py-1 rounded-lg border transition-all ${
                  selectedSeverity === sev
                    ? 'bg-rose-500 text-slate-950 border-rose-400 font-bold'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="space-y-2 pt-2 border-t border-slate-800/60">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-rose-400" /> Filter Incident Category:
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`text-xs font-mono px-3 py-1 rounded-lg border transition-all ${
                selectedCategory === 'ALL'
                  ? 'bg-rose-500 text-slate-950 border-rose-400 font-bold'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              All Incidents ({totalIncidents})
            </button>
            {SOC_CATEGORIES.map(cat => {
              const count = SOC_INCIDENTS_FULL.filter(c => c.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-mono px-3 py-1 rounded-lg border transition-all ${
                    selectedCategory === cat
                      ? 'bg-rose-500 text-slate-950 border-rose-400 font-bold'
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

      {/* Incidents Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 flex items-center gap-1.5 font-bold uppercase">
            <Sparkles className="w-4 h-4 text-rose-400" /> Active Incident Response Queue:
          </span>
          <span className="text-slate-500">
            Showing {filteredIncidents.length} of {totalIncidents} Incident Cases
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIncidents.map(inc => (
            <SocIncidentCard
              key={inc.id}
              incident={inc}
              isCompleted={completedIncidentIds.includes(inc.id)}
              onInvestigate={c => setActiveIncident(c)}
            />
          ))}
        </div>

        {filteredIncidents.length === 0 && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 space-y-2">
            <p className="text-sm font-mono">No SOC incident cases match your search filters.</p>
            <Button size="sm" variant="secondary" onClick={() => { setSelectedCategory('ALL'); setSelectedSeverity('ALL'); setSearchQuery(''); }}>
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* SOC Incident Workbench Modal */}
      {activeIncident && (
        <SocIncidentWorkbenchModal
          incident={activeIncident}
          isOpen={Boolean(activeIncident)}
          onClose={() => setActiveIncident(null)}
          isAlreadyCompleted={completedIncidentIds.includes(activeIncident.id)}
          onCompleteIncident={(incId, acc, pts) => completeSocIncident(incId, acc, pts)}
        />
      )}
    </div>
  );
};

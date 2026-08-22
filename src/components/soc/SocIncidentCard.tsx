import React from 'react';
import { SocIncidentCase } from '../../types/socSimulator';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { OfficialReferenceSection } from '../ui/OfficialReferenceSection';
import { ShieldAlert, ArrowRight, CheckCircle2, Clock, Terminal } from 'lucide-react';

interface SocIncidentCardProps {
  incident: SocIncidentCase;
  isCompleted: boolean;
  onInvestigate: (incident: SocIncidentCase) => void;
}

export const SocIncidentCard: React.FC<SocIncidentCardProps> = ({
  incident,
  isCompleted,
  onInvestigate
}) => {
  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'Low':
        return <Badge variant="cyan">Low</Badge>;
      case 'Medium':
        return <Badge variant="purple">Medium</Badge>;
      case 'High':
        return <Badge variant="amber">High</Badge>;
      case 'Critical':
        return <Badge variant="rose">Critical</Badge>;
      default:
        return <Badge variant="slate">{sev}</Badge>;
    }
  };

  return (
    <div
      className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 shadow-lg ${
        isCompleted
          ? 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-500/60 shadow-emerald-500/5'
          : 'bg-slate-900/80 border-slate-800 hover:border-rose-500/50 hover:shadow-rose-500/10'
      }`}
    >
      <div className="space-y-3">
        {/* Top Header Badges */}
        <div className="flex items-center justify-between gap-2">
          <Badge variant="rose">{incident.category}</Badge>
          <div className="flex items-center gap-2">
            {getSeverityBadge(incident.severity)}
            {isCompleted && (
              <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3 h-3" /> TRIAGED
              </span>
            )}
          </div>
        </div>

        {/* Title & Summary */}
        <div>
          <h3
            className="text-base font-bold text-white hover:text-rose-300 transition-colors cursor-pointer flex items-center gap-2"
            onClick={() => onInvestigate(incident)}
          >
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{incident.title}</span>
          </h3>
          <p className="text-xs text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
            {incident.summary}
          </p>
        </div>

        {/* Meta Info: MITRE ID & Detection Time */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400 pt-1">
          <span className="flex items-center gap-1 text-cyan-400 font-bold">
            <Terminal className="w-3.5 h-3.5" /> {incident.mitreId}
          </span>
          <span className="flex items-center gap-1 text-slate-400 text-[11px]">
            <Clock className="w-3.5 h-3.5" /> {new Date(incident.detectedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Official Reference Icons */}
        <OfficialReferenceSection sourceIds={incident.officialSourceIds} compact />
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
        <span className="text-[11px] font-mono text-slate-400">
          {incident.logs.length} Telemetry Events
        </span>

        <Button
          size="sm"
          variant={isCompleted ? 'secondary' : 'primary'}
          onClick={() => onInvestigate(incident)}
          icon={<ArrowRight className="w-3.5 h-3.5" />}
        >
          {isCompleted ? 'Review Incident' : 'Investigate Case'}
        </Button>
      </div>
    </div>
  );
};

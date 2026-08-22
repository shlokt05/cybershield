import React, { useState } from 'react';
import { SocIncidentCase, SocTriageAnswer } from '../../types/socSimulator';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { OfficialReferenceSection } from '../ui/OfficialReferenceSection';
import {
  ShieldAlert,
  Terminal,
  Clock,
  CheckCircle2,
  Send,
  BookOpen,
  HelpCircle,
  Sparkles,
  FileText
} from 'lucide-react';

interface SocIncidentWorkbenchModalProps {
  incident: SocIncidentCase;
  isOpen: boolean;
  onClose: () => void;
  isAlreadyCompleted: boolean;
  onCompleteIncident: (incidentId: string, accuracy: number, score: number) => void;
}

export const SocIncidentWorkbenchModal: React.FC<SocIncidentWorkbenchModalProps> = ({
  incident,
  isOpen,
  onClose,
  isAlreadyCompleted,
  onCompleteIncident
}) => {
  const [activeTab, setActiveTab] = useState<'logs' | 'triage' | 'remediation'>('logs');
  const [userAnswers, setUserAnswers] = useState<SocTriageAnswer>({
    attackType: '',
    initialAccess: '',
    affectedAccount: '',
    affectedSystem: '',
    timeline: '',
    ioc: '',
    recommendedResponse: ''
  });

  const [scoreResult, setScoreResult] = useState<{
    correctCount: number;
    accuracyPercent: number;
    earnedScore: number;
  } | null>(null);

  const handleTriageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = incident.correctAnswers;

    let correctCount = 0;
    if (userAnswers.attackType === correct.attackType) correctCount++;
    if (userAnswers.initialAccess === correct.initialAccess) correctCount++;
    if (userAnswers.affectedAccount === correct.affectedAccount) correctCount++;
    if (userAnswers.affectedSystem === correct.affectedSystem) correctCount++;
    if (userAnswers.timeline === correct.timeline) correctCount++;
    if (userAnswers.ioc === correct.ioc) correctCount++;
    if (userAnswers.recommendedResponse === correct.recommendedResponse) correctCount++;

    const accuracyPercent = Math.round((correctCount / 7) * 100);
    const earnedScore = Math.round((accuracyPercent / 100) * incident.points);

    setScoreResult({
      correctCount,
      accuracyPercent,
      earnedScore
    });

    onCompleteIncident(incident.id, accuracyPercent, earnedScore);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2 text-white font-bold">
          <ShieldAlert className="w-5 h-5 text-rose-400" />
          <span>SOC Incident Workbench: {incident.title}</span>
        </div>
      }
      maxWidth="max-w-5xl"
    >
      <div className="space-y-6">
        {/* Incident Metadata Header */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 font-mono">
          <div className="flex items-center gap-2">
            <Badge variant="rose">{incident.category}</Badge>
            <Badge variant={incident.severity === 'Critical' ? 'rose' : incident.severity === 'High' ? 'amber' : 'purple'}>
              Severity: {incident.severity}
            </Badge>
            <span className="text-xs text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/30 flex items-center gap-1 font-bold">
              <Terminal className="w-3.5 h-3.5" /> {incident.mitreId}
            </span>
            {isAlreadyCompleted && (
              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Triaged
              </span>
            )}
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-400" /> Detected: {new Date(incident.detectedAt).toUTCString()}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('logs')}
            className={`flex items-center gap-2 text-xs font-mono font-bold px-4 py-2 rounded-lg transition-all ${
              activeTab === 'logs'
                ? 'bg-rose-500 text-slate-950 shadow-md shadow-rose-500/20'
                : 'text-slate-400 hover:text-slate-100 bg-slate-950 border border-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" /> 1. SIEM Telemetry Logs ({incident.logs.length})
          </button>

          <button
            onClick={() => setActiveTab('triage')}
            className={`flex items-center gap-2 text-xs font-mono font-bold px-4 py-2 rounded-lg transition-all ${
              activeTab === 'triage'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-100 bg-slate-950 border border-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" /> 2. 7-Point SOC Triage Form
          </button>

          <button
            onClick={() => setActiveTab('remediation')}
            className={`flex items-center gap-2 text-xs font-mono font-bold px-4 py-2 rounded-lg transition-all ${
              activeTab === 'remediation'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-100 bg-slate-950 border border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" /> 3. NIST Remediation Playbook
          </button>
        </div>

        {/* TAB 1: SIEM TELEMETRY LOGS */}
        {activeTab === 'logs' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{incident.summary}</p>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-cyan-400" /> Synthetic SIEM Raw Log Inspector:
              </div>

              <div className="space-y-2 font-mono text-xs">
                {incident.logs.map((l) => (
                  <div key={l.id} className="bg-[#070b12] p-3 rounded-xl border border-slate-800 space-y-1 text-slate-200">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/60 pb-1.5 text-[11px]">
                      <span className="text-cyan-400 font-bold">[{l.logType}] {l.timestamp}</span>
                      {l.sourceIp && <span className="text-amber-400">Src IP: {l.sourceIp}</span>}
                      {l.destinationIp && <span className="text-purple-400">Dst IP: {l.destinationIp}</span>}
                    </div>

                    <p className="text-slate-100 text-xs">{l.message}</p>

                    {l.process && (
                      <div className="text-[11px] text-slate-400 pt-1">
                        <strong>Process:</strong> <code className="text-rose-300">{l.process}</code>
                      </div>
                    )}
                    {l.commandLine && (
                      <div className="text-[11px] text-slate-400">
                        <strong>CmdLine:</strong> <code className="text-cyan-300">{l.commandLine}</code>
                      </div>
                    )}
                    {l.fileHash && (
                      <div className="text-[11px] text-slate-400">
                        <strong>File Hash:</strong> <code className="text-amber-300">{l.fileHash}</code>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 7-POINT TRIAGE FORM */}
        {activeTab === 'triage' && (
          <form onSubmit={handleTriageSubmit} className="space-y-5">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Tier-1/Tier-2 SOC Analyst Triage Questions:
              </h4>
              <p className="text-xs text-slate-400">
                Analyze the SIEM logs in Tab 1 and select the correct incident properties.
              </p>
            </div>

            {/* Q1: Attack Type */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold text-slate-200">
                1. What is the verified Attack Type?
              </label>
              <select
                value={userAnswers.attackType}
                onChange={e => setUserAnswers({ ...userAnswers, attackType: e.target.value })}
                className="w-full bg-slate-950 text-xs font-mono text-white p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500"
              >
                <option value="">Select Attack Type...</option>
                {incident.options.attackTypes.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Q2: Initial Access */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold text-slate-200">
                2. What is the Initial Access Vector (MITRE Technique)?
              </label>
              <select
                value={userAnswers.initialAccess}
                onChange={e => setUserAnswers({ ...userAnswers, initialAccess: e.target.value })}
                className="w-full bg-slate-950 text-xs font-mono text-white p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500"
              >
                <option value="">Select Initial Access Vector...</option>
                {incident.options.initialAccessVectors.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Q3: Affected Account */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold text-slate-200">
                3. Which User Account was targeted or compromised?
              </label>
              <select
                value={userAnswers.affectedAccount}
                onChange={e => setUserAnswers({ ...userAnswers, affectedAccount: e.target.value })}
                className="w-full bg-slate-950 text-xs font-mono text-white p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500"
              >
                <option value="">Select Affected Account...</option>
                {incident.options.affectedAccounts.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Q4: Affected System */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold text-slate-200">
                4. Which Host System / Machine was targeted?
              </label>
              <select
                value={userAnswers.affectedSystem}
                onChange={e => setUserAnswers({ ...userAnswers, affectedSystem: e.target.value })}
                className="w-full bg-slate-950 text-xs font-mono text-white p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500"
              >
                <option value="">Select Affected Host System...</option>
                {incident.options.affectedSystems.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Q5: Timeline */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold text-slate-200">
                5. What is the correct chronological Event Timeline?
              </label>
              <select
                value={userAnswers.timeline}
                onChange={e => setUserAnswers({ ...userAnswers, timeline: e.target.value })}
                className="w-full bg-slate-950 text-xs font-mono text-white p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500"
              >
                <option value="">Select Event Timeline Sequence...</option>
                {incident.options.timelines.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Q6: IoC */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold text-slate-200">
                6. What are the key Indicators of Compromise (IoCs)?
              </label>
              <select
                value={userAnswers.ioc}
                onChange={e => setUserAnswers({ ...userAnswers, ioc: e.target.value })}
                className="w-full bg-slate-950 text-xs font-mono text-white p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500"
              >
                <option value="">Select Primary IoCs...</option>
                {incident.options.iocs.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Q7: Recommended Response Action */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold text-slate-200">
                7. What is the recommended NIST SP 800-61 Response Action?
              </label>
              <select
                value={userAnswers.recommendedResponse}
                onChange={e => setUserAnswers({ ...userAnswers, recommendedResponse: e.target.value })}
                className="w-full bg-slate-950 text-xs font-mono text-white p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500"
              >
                <option value="">Select NIST Response Playbook Action...</option>
                {incident.options.recommendedResponses.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <Button variant="primary" type="submit" icon={<Send className="w-4 h-4" />}>
              Submit SOC Triage Assessment
            </Button>

            {/* Score Results */}
            {scoreResult && (
              <div className={`p-4 rounded-xl border font-mono text-xs space-y-2 ${
                scoreResult.accuracyPercent >= 70
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}>
                <div className="flex items-center justify-between font-bold text-sm">
                  <span>Triage Accuracy: {scoreResult.accuracyPercent}% ({scoreResult.correctCount}/7 Correct)</span>
                  <span>+{scoreResult.earnedScore} PTS</span>
                </div>
                <p>
                  {scoreResult.accuracyPercent >= 70
                    ? '🎉 Excellent SOC Incident Triage! Your response plan meets NIST SP 800-61 containment guidelines.'
                    : '⚠️ Some triage answers were incorrect. Inspect the NIST Remediation Playbook in Tab 3 for full solution.'}
                </p>
              </div>
            )}
          </form>
        )}

        {/* TAB 3: REMEDIATION */}
        {activeTab === 'remediation' && (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> NIST SP 800-61 Incident Containment Playbook:
              </h4>
              <p className="text-slate-300 leading-relaxed font-sans">{incident.nistRemediation}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
              <h4 className="font-bold text-amber-400 uppercase">Correct Solution Key:</h4>
              <ul className="space-y-1 text-slate-300">
                <li>• <strong>Attack Type:</strong> {incident.correctAnswers.attackType}</li>
                <li>• <strong>Initial Access:</strong> {incident.correctAnswers.initialAccess}</li>
                <li>• <strong>Affected Account:</strong> {incident.correctAnswers.affectedAccount}</li>
                <li>• <strong>Affected System:</strong> {incident.correctAnswers.affectedSystem}</li>
                <li>• <strong>Timeline:</strong> {incident.correctAnswers.timeline}</li>
                <li>• <strong>IoCs:</strong> {incident.correctAnswers.ioc}</li>
                <li>• <strong>Response:</strong> {incident.correctAnswers.recommendedResponse}</li>
              </ul>
            </div>

            <OfficialReferenceSection sourceIds={incident.officialSourceIds} />
          </div>
        )}
      </div>
    </Modal>
  );
};

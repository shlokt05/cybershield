import React, { useState } from 'react';
import { CtfChallenge } from '../../types/ctfArena';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { OfficialReferenceSection } from '../ui/OfficialReferenceSection';
import {
  Flag,
  Trophy,
  Zap,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Send,
  Sparkles
} from 'lucide-react';

interface CtfChallengeModalProps {
  challenge: CtfChallenge;
  isOpen: boolean;
  onClose: () => void;
  isAlreadySolved: boolean;
  onSolve: (challengeId: string, points: number, xp: number) => void;
}

export const CtfChallengeModal: React.FC<CtfChallengeModalProps> = ({
  challenge,
  isOpen,
  onClose,
  isAlreadySolved,
  onSolve
}) => {
  const [activeTab, setActiveTab] = useState<'target' | 'hints' | 'writeup'>('target');
  const [userFlagInput, setUserFlagInput] = useState('');
  const [submissionFeedback, setSubmissionFeedback] = useState<{
    status: 'idle' | 'success' | 'error';
    message: string;
  }>({ status: 'idle', message: '' });

  const handleFlagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = userFlagInput.trim();
    if (!cleanInput) return;

    const expected = challenge.expectedFlag.trim();
    const accepted = challenge.acceptedFlags || [];

    const isMatch =
      cleanInput.toLowerCase() === expected.toLowerCase() ||
      accepted.some(f => f.toLowerCase() === cleanInput.toLowerCase());

    if (isMatch) {
      setSubmissionFeedback({
        status: 'success',
        message: `🎉 Correct Flag Verified! You earned +${challenge.points} CTF Points and +${challenge.xpReward} XP!`
      });
      onSolve(challenge.id, challenge.points, challenge.xpReward);
    } else {
      setSubmissionFeedback({
        status: 'error',
        message: '❌ Invalid CTF Flag. Inspect the target telemetry payload carefully and try again!'
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2 text-white font-bold">
          <Flag className="w-5 h-5 text-amber-400" />
          <span>{challenge.title}</span>
        </div>
      }
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* CTF Header Bar */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="amber">{challenge.category}</Badge>
            <Badge variant={challenge.difficulty === 'Easy' ? 'cyan' : challenge.difficulty === 'Medium' ? 'purple' : 'rose'}>
              {challenge.difficulty}
            </Badge>
            {isAlreadySolved && (
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Solved
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-amber-400 font-extrabold flex items-center gap-1">
              <Trophy className="w-4 h-4 fill-amber-400/20" /> +{challenge.points} PTS
            </span>
            <span className="text-cyan-400 font-bold flex items-center gap-1">
              <Zap className="w-4 h-4 fill-cyan-400/20" /> +{challenge.xpReward} XP
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('target')}
            className={`flex items-center gap-2 text-xs font-mono font-bold px-4 py-2 rounded-lg transition-all ${
              activeTab === 'target'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-100 bg-slate-950 border border-slate-800'
            }`}
          >
            <Flag className="w-4 h-4" /> 1. Target & Flag Submission
          </button>

          <button
            onClick={() => setActiveTab('hints')}
            className={`flex items-center gap-2 text-xs font-mono font-bold px-4 py-2 rounded-lg transition-all ${
              activeTab === 'hints'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-100 bg-slate-950 border border-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" /> 2. Hints ({challenge.hints.length})
          </button>

          <button
            onClick={() => setActiveTab('writeup')}
            className={`flex items-center gap-2 text-xs font-mono font-bold px-4 py-2 rounded-lg transition-all ${
              activeTab === 'writeup'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-100 bg-slate-950 border border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" /> 3. Solution Writeup
          </button>
        </div>

        {/* TAB 1: TARGET & FLAG */}
        {activeTab === 'target' && (
          <div className="space-y-5">
            {/* Description & Objectives */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {challenge.description}
              </p>
              <div className="space-y-1">
                <h4 className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Challenge Objectives:
                </h4>
                <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-300">
                  {challenge.objectives.map((obj, idx) => (
                    <li key={idx}>{obj}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Synthetic Target Telemetry */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Synthetic Challenge Environment Telemetry:</span>
                <span className="text-amber-400">Sandbox Isolated</span>
              </div>
              <div className="bg-[#080c14] border border-amber-500/30 rounded-xl p-4 font-mono text-xs text-cyan-300 overflow-x-auto shadow-inner">
                <pre><code>{challenge.syntheticTarget}</code></pre>
              </div>
            </div>

            {/* Flag Submission Form */}
            <form onSubmit={handleFlagSubmit} className="space-y-3">
              <label className="block text-xs font-mono font-bold text-slate-300">
                Submit Flag (e.g. CSCTF&#123;flag_here&#125;):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userFlagInput}
                  onChange={e => setUserFlagInput(e.target.value)}
                  placeholder="Enter flag string e.g. CSCTF{...}"
                  className="flex-1 bg-slate-950 text-xs font-mono text-white px-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500"
                />
                <Button variant="primary" type="submit" icon={<Send className="w-4 h-4" />}>
                  Submit Flag
                </Button>
              </div>
            </form>

            {/* Feedback */}
            {submissionFeedback.status === 'success' && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-mono text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{submissionFeedback.message}</span>
              </div>
            )}

            {submissionFeedback.status === 'error' && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs font-mono text-rose-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{submissionFeedback.message}</span>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: HINTS */}
        {activeTab === 'hints' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" /> Challenge Hints:
              </h4>
              {challenge.hints.map((h, idx) => (
                <div key={h.id} className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-200">
                  💡 <strong>Hint #{idx + 1}:</strong> {h.hintText}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: WRITEUP */}
        {activeTab === 'writeup' && (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Official Vulnerability Breakdown:
              </h4>
              <p className="text-slate-300 leading-relaxed font-sans">{challenge.explanation}</p>
            </div>

            <OfficialReferenceSection sourceIds={challenge.officialSourceIds} />
          </div>
        )}
      </div>
    </Modal>
  );
};

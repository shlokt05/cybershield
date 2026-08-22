import React, { useState } from 'react';
import { InteractiveLab } from '../../types/interactiveLabs';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { OfficialReferenceSection } from '../ui/OfficialReferenceSection';
import {
  Terminal,
  BookOpen,
  Zap,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Shield,
  Send,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface InteractiveLabRunnerModalProps {
  lab: InteractiveLab;
  isOpen: boolean;
  onClose: () => void;
  isAlreadyCompleted: boolean;
  onCompleteLab: (labId: string, xp: number) => void;
}

export const InteractiveLabRunnerModal: React.FC<InteractiveLabRunnerModalProps> = ({
  lab,
  isOpen,
  onClose,
  isAlreadyCompleted,
  onCompleteLab
}) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'workbench' | 'defense'>('workbench');
  const [userFlagInput, setUserFlagInput] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<{
    status: 'idle' | 'success' | 'error';
    message: string;
  }>({ status: 'idle', message: '' });

  const currentTask = lab.tasks[0];

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = userFlagInput.trim();
    if (!cleanInput) return;

    const expected = currentTask.expectedAnswer.trim();
    const accepted = currentTask.acceptedAnswers || [];

    const isMatch =
      cleanInput.toLowerCase() === expected.toLowerCase() ||
      accepted.some(ans => ans.toLowerCase() === cleanInput.toLowerCase());

    if (isMatch) {
      setSubmissionFeedback({
        status: 'success',
        message: `🎉 Correct Flag Verified! You earned +${lab.xpReward} XP for completing this lab!`
      });
      onCompleteLab(lab.id, lab.xpReward);
    } else {
      setSubmissionFeedback({
        status: 'error',
        message: '❌ Invalid Flag or Answer. Inspect the synthetic data, try again, or check the hints below!'
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2 text-white font-bold">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <span>{lab.title}</span>
        </div>
      }
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Lab Metadata Header */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="cyan">{lab.category}</Badge>
            <Badge variant={lab.difficulty === 'Easy' ? 'cyan' : lab.difficulty === 'Medium' ? 'purple' : 'amber'}>
              {lab.difficulty}
            </Badge>
            {isAlreadyCompleted && (
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Completed
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-amber-400 font-bold flex items-center gap-1">
              <Zap className="w-4 h-4 fill-amber-400/20" /> +{lab.xpReward} XP Reward
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('workbench')}
            className={`flex items-center gap-2 text-xs font-mono font-bold px-4 py-2 rounded-lg transition-all ${
              activeTab === 'workbench'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-100 bg-slate-950 border border-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4" /> 1. Interactive Workbench
          </button>

          <button
            onClick={() => setActiveTab('theory')}
            className={`flex items-center gap-2 text-xs font-mono font-bold px-4 py-2 rounded-lg transition-all ${
              activeTab === 'theory'
                ? 'bg-purple-500 text-slate-950 shadow-md shadow-purple-500/20'
                : 'text-slate-400 hover:text-slate-100 bg-slate-950 border border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" /> 2. Scenario & Theory
          </button>

          <button
            onClick={() => setActiveTab('defense')}
            className={`flex items-center gap-2 text-xs font-mono font-bold px-4 py-2 rounded-lg transition-all ${
              activeTab === 'defense'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-100 bg-slate-950 border border-slate-800'
            }`}
          >
            <Shield className="w-4 h-4" /> 3. Defense & Solution
          </button>
        </div>

        {/* TAB 1: WORKBENCH */}
        {activeTab === 'workbench' && (
          <div className="space-y-5">
            {/* Task Instructions */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Task Instructions:
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {currentTask.instructions}
              </p>
            </div>

            {/* Synthetic Data Window */}
            {currentTask.syntheticData && (
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>Synthetic Lab Environment Telemetry:</span>
                  <span className="text-cyan-400">Sandbox Isolated</span>
                </div>
                <div className="bg-[#080c14] border border-cyan-500/30 rounded-xl p-4 font-mono text-xs text-amber-300 overflow-x-auto shadow-inner">
                  <pre><code>{currentTask.syntheticData}</code></pre>
                </div>
              </div>
            )}

            {/* Hint Accordion */}
            {lab.hints.length > 0 && (
              <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="w-full p-3 flex items-center justify-between text-xs font-mono text-amber-400 hover:text-amber-300 font-bold"
                >
                  <span className="flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4" /> Need a Hint? ({lab.hints.length} Hint available)
                  </span>
                  {showHints ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {showHints && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-800/60 space-y-2 text-xs text-slate-300 font-mono">
                    {lab.hints.map((h, idx) => (
                      <div key={h.id} className="bg-slate-900/90 p-2.5 rounded-lg border border-amber-500/20">
                        💡 <strong>Hint #{idx + 1}:</strong> {h.hintText}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Flag Submission Form */}
            <form onSubmit={handleTaskSubmit} className="space-y-3">
              <label className="block text-xs font-mono font-bold text-slate-300">
                Submit Flag / Answer String (e.g. CS&#123;flag_value&#125;):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userFlagInput}
                  onChange={e => setUserFlagInput(e.target.value)}
                  placeholder="Enter flag here e.g. CS{...}"
                  className="flex-1 bg-slate-950 text-xs font-mono text-white px-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
                />
                <Button variant="primary" type="submit" icon={<Send className="w-4 h-4" />}>
                  Validate Flag
                </Button>
              </div>
            </form>

            {/* Submission Feedback */}
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

        {/* TAB 2: THEORY */}
        {activeTab === 'theory' && (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-mono font-bold text-purple-400 uppercase">Scenario Narrative:</h4>
              <p className="text-slate-300 leading-relaxed font-sans">{lab.scenario}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-mono font-bold text-cyan-400 uppercase">Learning Objectives:</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-300 font-sans">
                {lab.learningObjectives.map((obj, idx) => (
                  <li key={idx}>{obj}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-mono font-bold text-amber-400 uppercase">Theoretical Background:</h4>
              <p className="text-slate-300 leading-relaxed font-sans">{lab.theory}</p>
            </div>

            <OfficialReferenceSection sourceIds={lab.officialSourceIds} />
          </div>
        )}

        {/* TAB 3: DEFENSE */}
        {activeTab === 'defense' && (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Solution Walkthrough & Explanation:
              </h4>
              <p className="text-slate-300 leading-relaxed font-sans">{lab.explanation}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-2">
              <h4 className="font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                <Shield className="w-4 h-4" /> Recommended Defense & Remediation Strategy:
              </h4>
              <p className="text-slate-300 leading-relaxed font-sans">{lab.defense}</p>
            </div>

            <OfficialReferenceSection sourceIds={lab.officialSourceIds} />
          </div>
        )}
      </div>
    </Modal>
  );
};

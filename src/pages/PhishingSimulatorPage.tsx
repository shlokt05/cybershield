import React, { useState } from 'react';
import { MOCK_PHISHING_SCENARIOS } from '../lib/mockData';
import { useUserProgress } from '../context/UserProgressContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MailWarning, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, Eye } from 'lucide-react';

export const PhishingSimulatorPage: React.FC = () => {
  const { recordPhishingResult } = useUserProgress();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [userGuess, setUserGuess] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const scenario = MOCK_PHISHING_SCENARIOS[selectedIdx];

  const handleGuess = (guessIsPhishing: boolean) => {
    if (showExplanation) return;
    setUserGuess(guessIsPhishing);
    setShowExplanation(true);
    const isCorrect = guessIsPhishing === scenario.is_phishing;
    recordPhishingResult(isCorrect);
  };

  const handleNextScenario = () => {
    setUserGuess(null);
    setShowExplanation(false);
    setSelectedIdx(prev => (prev + 1) % MOCK_PHISHING_SCENARIOS.length);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="bg-slate-900/90 border border-rose-500/30 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-widest mb-2">
          <MailWarning className="w-4 h-4" /> Interactive Threat Simulation
        </div>
        <h1 className="text-3xl font-extrabold text-white">Phishing Awareness Inbox Simulator</h1>
        <p className="text-sm text-slate-300 mt-1">
          Inspect realistic email, SMS, and login portal communications. Can you spot domain spoofing, urgency traps, and suspicious links?
        </p>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {MOCK_PHISHING_SCENARIOS.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => {
              setSelectedIdx(idx);
              setUserGuess(null);
              setShowExplanation(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
              selectedIdx === idx
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {item.type}: {item.title}
          </button>
        ))}
      </div>

      {/* Interactive Email Viewer Window */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Fake Client Window Header */}
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="text-xs font-mono text-slate-400 ml-2">CyberShield Inbox Viewer</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="rose">{scenario.type}</Badge>
            <Badge variant="purple">{scenario.difficulty}</Badge>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Details */}
          <div className="space-y-2 border-b border-slate-800/80 pb-4 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-slate-500 uppercase font-bold w-16">Sender:</span>
              <span className="text-slate-200 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                {scenario.sender_info}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-slate-500 uppercase font-bold w-16">Subject:</span>
              <span className="text-slate-100 font-semibold">{scenario.title}</span>
            </div>
          </div>

          {/* Email / SMS Body Preview */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 font-sans text-sm text-slate-200 leading-relaxed whitespace-pre-line">
            {scenario.content_preview}
          </div>

          {/* User Decision Buttons */}
          {!showExplanation ? (
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-cyan-400" /> Inspect headers carefully before deciding
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  variant="danger"
                  className="flex-1 sm:flex-none"
                  onClick={() => handleGuess(true)}
                  icon={<ShieldAlert className="w-4 h-4" />}
                >
                  Flag as PHISHING Scam
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1 sm:flex-none"
                  onClick={() => handleGuess(false)}
                  icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                >
                  Mark as LEGITIMATE
                </Button>
              </div>
            </div>
          ) : (
            /* Result Explanation Box */
            <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-base">
                  {userGuess === scenario.is_phishing ? (
                    <span className="text-emerald-400 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" /> Correct Detection!
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" /> Incorrect Identification
                    </span>
                  )}
                </div>
                <Badge variant={scenario.is_phishing ? 'rose' : 'emerald'}>
                  {scenario.is_phishing ? 'MALICIOUS PHISHING' : 'LEGITIMATE COMMUNICATION'}
                </Badge>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {scenario.explanation}
              </p>

              {scenario.red_flags.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-mono text-rose-400 font-bold uppercase block">
                    Security Red Flags Present:
                  </span>
                  {scenario.red_flags.map((flag, i) => (
                    <div key={i} className="text-xs text-rose-200/90 flex items-center gap-2">
                      <span className="text-rose-500">•</span> {flag}
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <Button variant="primary" onClick={handleNextScenario} icon={<ArrowRight className="w-4 h-4" />}>
                  Try Next Scenario
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

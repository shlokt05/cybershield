import React, { useState } from 'react';
import { analyzeWeakTopics, generateAdaptiveRecommendations, generate7DayStudyPlan, queryCyberAiEngine } from '../lib/cyberAiEngine';
import { AiChatMessage, ProgressiveHintTier } from '../types/cyberAi';
import { useUserProgress } from '../context/UserProgressContext';
import { OfficialReferenceSection } from '../components/ui/OfficialReferenceSection';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  Bot,
  Sparkles,
  Send,
  HelpCircle,
  Calendar,
  BookOpen,
  Eye,
  TrendingUp,
  Target,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const CyberAiMentorPage: React.FC = () => {
  const { completedModuleIds, completedLabIds, solvedCtfIds, completedIncidentIds } = useUserProgress();

  const weakTopics = analyzeWeakTopics(
    completedModuleIds.length,
    completedLabIds.length,
    solvedCtfIds.length,
    completedIncidentIds.length
  );

  const recommendations = generateAdaptiveRecommendations(weakTopics);
  const studyPlan = generate7DayStudyPlan();

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'page-welcome-msg',
      sender: 'cyberai',
      text: '🤖 Welcome to CyberAI Mentor Hub! I analyze your real-time performance across CyberShield Courses, Labs, CTFs, and SOC Incidents to guide your cybersecurity career journey.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      officialSourceIds: ['owasp_top10', 'nist_csf', 'mitre_attack', 'cisa']
    }
  ]);

  const [activeHintTiers, setActiveHintTiers] = useState<Record<string, ProgressiveHintTier>>({});

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: AiChatMessage = {
      id: `user-msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');

    setTimeout(() => {
      const aiReply = queryCyberAiEngine(text);
      setMessages(prev => [...prev, aiReply]);
    }, 400);
  };

  const advanceHintTier = (msgId: string) => {
    setActiveHintTiers(prev => {
      const current = prev[msgId] || 1;
      const next = (current < 4 ? current + 1 : 4) as ProgressiveHintTier;
      return { ...prev, [msgId]: next };
    });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              <Bot className="w-4 h-4" /> Official Standard Compliant AI Assistant
            </div>
            <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
              CyberAI Mentor + Adaptive Learning Engine <Sparkles className="w-6 h-6 text-amber-400" />
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Your personalized AI cybersecurity mentor. Inspect progressive 3-tier hints without spoiling CTF flags, analyze weak topics, generate 7-day study plans, and master official technical standards (OWASP, NIST CSF 2.0, MITRE ATT&CK, CISA).
            </p>
          </div>

          <OfficialReferenceSection sourceIds={['owasp_top10', 'nist_csf', 'mitre_attack', 'cisa', 'python_docs', 'linux_docs']} />
        </div>

        {/* Quick Features Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> <span>Anti-Spoiler Hints</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" /> <span>Adaptive Weakness Radar</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" /> <span>7-Day Study Roadmap</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-400" /> <span>Mistake Explanations</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Chat, Right Adaptive Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT 7 COLS: Interactive CyberAI Workbench */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-[700px]">
          {/* Header */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-bold text-white font-mono">CyberAI Interactive Dialogue</span>
            </div>
            <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30">
              PROMPT READY
            </span>
          </div>

          {/* Quick Prompts */}
          <div className="p-3 bg-[#080d1a] border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs font-mono scrollbar-none">
            <button
              onClick={() => handleSendMessage('Give me a 3-Tier progressive hint for my current CTF')}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-300 hover:border-amber-500/50 shrink-0 flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" /> 3-Tier Hint
            </button>
            <button
              onClick={() => handleSendMessage('Generate a 7-Day Cybersecurity Study Plan')}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 hover:border-cyan-500/50 shrink-0 flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-cyan-400" /> 7-Day Plan
            </button>
            <button
              onClick={() => handleSendMessage('Explain my last cybersecurity mistake')}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-rose-300 hover:border-rose-500/50 shrink-0 flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-rose-400" /> Explain Mistake
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'cyberai' && (
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`p-4 rounded-2xl max-w-[85%] space-y-2 ${
                    msg.sender === 'user'
                      ? 'bg-cyan-600 text-white rounded-tr-none font-medium'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                  {/* 3-Tier Progressive Hints */}
                  {msg.hints && (
                    <div className="mt-3 p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 space-y-2.5 font-mono text-[11px]">
                      <div className="flex items-center justify-between text-amber-400 font-bold border-b border-slate-800 pb-1.5">
                        <span>Anti-Spoiler Progressive Hints</span>
                        <span>Tier {(activeHintTiers[msg.id] || 1)}/4</span>
                      </div>

                      {(activeHintTiers[msg.id] || 1) >= 1 && (
                        <p className="text-amber-300 bg-amber-500/10 p-2.5 rounded border border-amber-500/20">
                          {msg.hints.tier1}
                        </p>
                      )}

                      {(activeHintTiers[msg.id] || 1) >= 2 && (
                        <p className="text-cyan-300 bg-cyan-500/10 p-2.5 rounded border border-cyan-500/20">
                          {msg.hints.tier2}
                        </p>
                      )}

                      {(activeHintTiers[msg.id] || 1) >= 3 && (
                        <p className="text-purple-300 bg-purple-500/10 p-2.5 rounded border border-purple-500/20">
                          {msg.hints.tier3}
                        </p>
                      )}

                      {(activeHintTiers[msg.id] || 1) >= 4 && (
                        <p className="text-emerald-300 bg-emerald-500/10 p-2.5 rounded border border-emerald-500/20">
                          {msg.hints.explanation}
                        </p>
                      )}

                      {(activeHintTiers[msg.id] || 1) < 4 && (
                        <button
                          onClick={() => advanceHintTier(msg.id)}
                          className="w-full py-2 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold flex items-center justify-center gap-1.5 transition-all mt-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> Unlock Next Hint Tier (Tier {(activeHintTiers[msg.id] || 1) + 1})
                        </button>
                      )}
                    </div>
                  )}

                  {/* Official References */}
                  {msg.officialSourceIds && (
                    <OfficialReferenceSection sourceIds={msg.officialSourceIds} compact />
                  )}

                  <span className="text-[9px] text-slate-400 font-mono block text-right">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask CyberAI Mentor..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-slate-950 text-xs font-mono text-white px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
            <Button
              size="sm"
              variant="primary"
              onClick={() => handleSendMessage()}
              icon={<Send className="w-3.5 h-3.5" />}
            >
              Send
            </Button>
          </div>
        </div>

        {/* RIGHT 5 COLS: Adaptive Learning Dashboard */}
        <div className="lg:col-span-5 space-y-6">
          {/* Weak Topics Analysis Radar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-400" /> Adaptive Weakness Analysis:
            </h3>

            <div className="space-y-3 font-mono text-xs">
              {weakTopics.map((wt) => (
                <div key={wt.domain} className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-between text-slate-200">
                    <span className="font-bold">{wt.domain}</span>
                    <Badge variant={wt.status === 'Needs Practice' ? 'rose' : wt.status === 'Developing' ? 'amber' : 'emerald'}>
                      {wt.status} ({wt.scorePercent}%)
                    </Badge>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        wt.scorePercent > 80 ? 'bg-emerald-400' : wt.scorePercent > 50 ? 'bg-amber-400' : 'bg-rose-400'
                      }`}
                      style={{ width: `${wt.scorePercent}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans">{wt.recommendedAction}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Targeted Adaptive Recommendations */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" /> Recommended Learning Activities:
            </h3>

            <div className="space-y-3">
              {recommendations.map((rec) => (
                <div key={rec.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="cyan">{rec.type}</Badge>
                    <span className="text-[10px] font-mono text-slate-400">{rec.category} • {rec.difficulty}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{rec.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{rec.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7-Day Study Roadmap */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-400" /> 7-Day Cybersecurity Study Plan:
            </h3>

            <div className="space-y-2 font-mono text-xs max-h-60 overflow-y-auto pr-1">
              {studyPlan.map((d) => (
                <div key={d.day} className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between text-cyan-300 font-bold">
                    <span>Day {d.day}: {d.topic}</span>
                    <span className="text-[9px] bg-purple-500/10 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/20">{d.activityType}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-sans">{d.activity}</p>
                  <span className="text-[9px] text-amber-400 block font-sans">Official Ref: {d.officialRef}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

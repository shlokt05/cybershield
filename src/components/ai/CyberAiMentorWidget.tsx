import React, { useState } from 'react';
import { queryCyberAiEngine } from '../../lib/cyberAiEngine';
import { AiChatMessage, ProgressiveHintTier } from '../../types/cyberAi';
import { OfficialReferenceSection } from '../ui/OfficialReferenceSection';
import { Button } from '../ui/Button';
import {
  Sparkles,
  X,
  Send,
  Bot,
  HelpCircle,
  Calendar,
  BookOpen,
  Eye
} from 'lucide-react';

export const CyberAiMentorWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'cyberai',
      text: '👋 Hello! I am CyberAI Mentor. Ask me any cybersecurity question, request a 3-Tier Progressive Hint for a CTF/Lab, or generate a custom 7-Day Study Plan!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      officialSourceIds: ['nist_csf', 'mitre_attack', 'cisa']
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

    // Simulate instant CyberAI response
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
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-slate-950 font-bold shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all flex items-center gap-2"
        >
          <Bot className="w-6 h-6 animate-pulse text-slate-950" />
          <span className="text-xs font-mono tracking-wider hidden sm:inline text-slate-950 font-extrabold uppercase">
            CyberAI Mentor
          </span>
        </button>
      )}

      {/* Floating Drawer Container */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-lg bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[85vh] animate-fadeIn">
          {/* Top Header */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  CyberAI Mentor <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </h3>
                <p className="text-[10px] font-mono text-cyan-400">Context-Aware Adaptive Engine</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action Prompt Chips */}
          <div className="p-2.5 bg-[#080d1a] border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono scrollbar-none">
            <button
              onClick={() => handleSendMessage('Give me a 3-Tier progressive hint for my current CTF')}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-amber-300 hover:border-amber-500/50 shrink-0 flex items-center gap-1"
            >
              <HelpCircle className="w-3 h-3 text-amber-400" /> 3-Tier Hint
            </button>
            <button
              onClick={() => handleSendMessage('Generate a 7-Day Cybersecurity Study Plan')}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 hover:border-cyan-500/50 shrink-0 flex items-center gap-1"
            >
              <Calendar className="w-3 h-3 text-cyan-400" /> 7-Day Plan
            </button>
            <button
              onClick={() => handleSendMessage('Explain my last cybersecurity mistake')}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-rose-300 hover:border-rose-500/50 shrink-0 flex items-center gap-1"
            >
              <BookOpen className="w-3 h-3 text-rose-400" /> Explain Mistake
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'cyberai' && (
                  <div className="w-7 h-7 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] space-y-2 ${
                    msg.sender === 'user'
                      ? 'bg-cyan-600 text-white rounded-tr-none font-medium'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                  {/* 3-Tier Progressive Hints Render */}
                  {msg.hints && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-amber-500/30 space-y-2 font-mono text-[11px]">
                      <div className="flex items-center justify-between text-amber-400 font-bold border-b border-slate-800 pb-1">
                        <span>Anti-Spoiler Progressive Hints</span>
                        <span>Tier {(activeHintTiers[msg.id] || 1)}/4</span>
                      </div>

                      {/* Tier 1 */}
                      {(activeHintTiers[msg.id] || 1) >= 1 && (
                        <p className="text-amber-300 bg-amber-500/10 p-2 rounded border border-amber-500/20">
                          {msg.hints.tier1}
                        </p>
                      )}

                      {/* Tier 2 */}
                      {(activeHintTiers[msg.id] || 1) >= 2 && (
                        <p className="text-cyan-300 bg-cyan-500/10 p-2 rounded border border-cyan-500/20">
                          {msg.hints.tier2}
                        </p>
                      )}

                      {/* Tier 3 */}
                      {(activeHintTiers[msg.id] || 1) >= 3 && (
                        <p className="text-purple-300 bg-purple-500/10 p-2 rounded border border-purple-500/20">
                          {msg.hints.tier3}
                        </p>
                      )}

                      {/* Tier 4 (Explanation) */}
                      {(activeHintTiers[msg.id] || 1) >= 4 && (
                        <p className="text-emerald-300 bg-emerald-500/10 p-2 rounded border border-emerald-500/20">
                          {msg.hints.explanation}
                        </p>
                      )}

                      {(activeHintTiers[msg.id] || 1) < 4 && (
                        <button
                          onClick={() => advanceHintTier(msg.id)}
                          className="w-full py-1.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold flex items-center justify-center gap-1 transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" /> Unlock Next Hint Tier (Tier {(activeHintTiers[msg.id] || 1) + 1})
                        </button>
                      )}
                    </div>
                  )}

                  {/* 7-Day Study Plan Render */}
                  {msg.studyPlan && (
                    <div className="mt-3 space-y-2 font-mono text-[11px]">
                      <h4 className="font-bold text-cyan-400 uppercase tracking-wider">7-Day Study Roadmap:</h4>
                      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                        {msg.studyPlan.map((d) => (
                          <div key={d.day} className="bg-slate-950 p-2 rounded border border-slate-800 text-slate-300 space-y-0.5">
                            <div className="flex items-center justify-between text-cyan-300 font-bold">
                              <span>Day {d.day}: {d.topic}</span>
                              <span className="text-[9px] bg-cyan-500/10 px-1.5 py-0.5 rounded text-cyan-400 border border-cyan-500/20">{d.activityType}</span>
                            </div>
                            <p className="text-[10px] text-slate-400">{d.activity}</p>
                            <span className="text-[9px] text-amber-400 block font-sans">Ref: {d.officialRef}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Official Source Badges */}
                  {msg.officialSourceIds && (
                    <div className="pt-1">
                      <OfficialReferenceSection sourceIds={msg.officialSourceIds} compact />
                    </div>
                  )}

                  <span className="text-[9px] text-slate-400 font-mono block text-right">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Text Input */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask CyberAI Mentor anything..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-slate-950 text-xs font-mono text-white px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
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
      )}
    </>
  );
};

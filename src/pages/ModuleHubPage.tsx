import React, { useState } from 'react';
import { MODULE_DATA, CoreModuleData, MCQQuestion, TheoryProblem } from '../lib/moduleData';
import { useUserProgress } from '../context/UserProgressContext';
import { useAuth } from '../context/AuthContext';
import { useHandbookContext } from '../context/HandbookContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  BookOpen,
  HelpCircle,
  CheckCircle2,
  Award,
  Shield,
  Code2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  FileText,
  Lock,
  LogIn,
  UserPlus,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { AdBanner } from '../components/ads/AdBanner';

interface ModuleHubPageProps {
  initialModuleId?: string;
  onNavigateToCertificate: () => void;
  openAuthModal?: (mode: 'login' | 'register') => void;
}

export const ModuleHubPage: React.FC<ModuleHubPageProps> = ({
  initialModuleId = 'web-security',
  onNavigateToCertificate,
  openAuthModal
}) => {
  const { isAuthenticated } = useAuth();
  const { handbooks } = useHandbookContext();
  const { completedModuleIds, markModuleCompleted, areAllModulesCompleted } = useUserProgress();
  const [activeModuleId, setActiveModuleId] = useState<string>(initialModuleId);
  const [activeTab, setActiveTab] = useState<'study' | 'test'>('study');
  const [inlineExpandedChapter, setInlineExpandedChapter] = useState<number | null>(null);

  const shuffleModuleMcqs = (modId: string) => {
    const rawModule = MODULE_DATA[modId] || MODULE_DATA['web-security'];
    const shuffled = [...rawModule.mcqs].sort(() => Math.random() - 0.5);
    return shuffled.map(q => {
      const optionsWithCorrect = q.options.map((opt, idx) => ({
        text: opt,
        isCorrect: idx === q.correctAnswer
      })).sort(() => Math.random() - 0.5);

      return {
        ...q,
        options: optionsWithCorrect.map(o => o.text),
        correctAnswer: optionsWithCorrect.findIndex(o => o.isCorrect)
      };
    });
  };

  const [activeMcqs, setActiveMcqs] = useState(() => shuffleModuleMcqs(initialModuleId));

  const toggleInlineChapterNotes = (chapIdx: number) => {
    setInlineExpandedChapter(prev => (prev === chapIdx ? null : chapIdx));
  };

  // Assessment State
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number>>({});
  const [theoryAnswers, setTheoryAnswers] = useState<Record<number, number>>({});
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  const activeModule: CoreModuleData = MODULE_DATA[activeModuleId] || MODULE_DATA['web-security'];
  const isModuleDone = completedModuleIds.includes(activeModuleId);

  const handleModuleSwitch = (modId: string) => {
    setActiveModuleId(modId);
    setActiveTab('study');
    setMcqAnswers({});
    setTheoryAnswers({});
    setIsTestSubmitted(false);
    setFinalScore(null);
    setActiveMcqs(shuffleModuleMcqs(modId));
    setInlineExpandedChapter(null);
  };

  const handleMcqSelect = (mcqIdx: number, optionIdx: number) => {
    if (isTestSubmitted) return;
    setMcqAnswers(prev => ({ ...prev, [mcqIdx]: optionIdx }));
  };

  const handleTheorySelect = (theoryIdx: number, optionIdx: number) => {
    if (isTestSubmitted) return;
    setTheoryAnswers(prev => ({ ...prev, [theoryIdx]: optionIdx }));
  };

  const handleCalculateScore = () => {
    let correctCount = 0;

    // Grade MCQs (15 questions)
    activeMcqs.forEach((mcq: MCQQuestion, idx: number) => {
      if (mcqAnswers[idx] === mcq.correctAnswer) {
        correctCount++;
      }
    });

    // Grade Theory Scenarios (5 questions)
    activeModule.theoryProblems.forEach((th: TheoryProblem, idx: number) => {
      if (theoryAnswers[idx] === th.correctOption) {
        correctCount++;
      }
    });

    const totalQuestions = activeModule.mcqs.length + activeModule.theoryProblems.length; // 20
    const scorePercent = Math.round((correctCount / totalQuestions) * 100);

    setFinalScore(scorePercent);
    setIsTestSubmitted(true);

    if (scorePercent >= 60) {
      markModuleCompleted(activeModuleId, scorePercent);
    }
  };

  const totalAnswered = Object.keys(mcqAnswers).length + Object.keys(theoryAnswers).length;
  const totalQuestionsCount = activeModule.mcqs.length + activeModule.theoryProblems.length; // 20

  const allModules = Object.values(MODULE_DATA) as CoreModuleData[];

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 py-8 pb-16">
        {/* Lock Hero Card */}
        <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/30 mx-auto flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10">
            <Lock className="w-10 h-10" />
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            <Badge variant="amber" className="font-mono text-xs inline-flex items-center gap-1">
              <Lock className="w-3 h-3" /> Student Access Restricted
            </Badge>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Student Login Required to Access Study Resources
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Access to our 5 comprehensive cybersecurity course modules, real-world case studies, vulnerable vs secure code remediation guides, and assessment tests requires a registered <strong>Student Profile (Name, College & State)</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              variant="accent"
              size="lg"
              onClick={() => openAuthModal?.('login')}
              icon={<LogIn className="w-5 h-5" />}
              className="w-full sm:w-auto font-bold px-8"
            >
              Student Sign In
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={() => openAuthModal?.('register')}
              icon={<UserPlus className="w-5 h-5" />}
              className="w-full sm:w-auto font-bold px-8"
            >
              Register Student Profile (College & State)
            </Button>
          </div>

          <p className="text-xs text-slate-500 font-mono pt-2">
            💡 Registration is 100% Free! Takes 30 seconds to enter your College and State.
          </p>
        </div>

        {/* Blurred / Locked Module Preview Cards */}
        <div className="space-y-4">
          <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" /> Locked Curriculum Modules Preview
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allModules.map((mod) => (
              <div
                key={mod.id}
                onClick={() => openAuthModal?.('register')}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 cursor-pointer hover:border-amber-500/50 transition-all space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">{mod.category}</span>
                  <Lock className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-slate-200">{mod.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2">{mod.description}</p>
                <div className="pt-2 flex items-center justify-between text-xs text-amber-400 font-mono font-semibold">
                  <span>Sign In to Unlock</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Page Header */}
      <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest">
            <BookOpen className="w-4 h-4" /> Comprehensive Cybersecurity Curriculum
          </div>
          <Badge variant="emerald" className="font-mono text-xs">
            ✓ Direct Open Access (No Login Required to Read)
          </Badge>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Module Study Resources & Assessment Hub</h1>
        <p className="text-sm text-slate-300 mt-1 max-w-3xl">
          Study in-depth cybersecurity learning guides, real-world case studies, and defense code. All study resources are <strong>100% open to read directly</strong>! Students can log in to save test scores, track progress, and claim verified Certificates.
        </p>
      </div>

      {/* Module Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {allModules.map((mod) => {
          const isDone = completedModuleIds.includes(mod.id);
          const isActive = mod.id === activeModuleId;

          return (
            <button
              key={mod.id}
              onClick={() => handleModuleSwitch(mod.id)}
              className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isActive
                  ? 'bg-emerald-500/10 border-emerald-500/50 text-white shadow-lg shadow-emerald-500/5'
                  : isDone
                  ? 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700'
                  : 'bg-slate-950/60 border-slate-900 text-slate-400 hover:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase">{mod.category}</span>
                {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
              </div>
              <h3 className="text-xs font-bold line-clamp-2">{mod.title}</h3>
              <span className="text-[10px] font-mono text-slate-500 mt-2 block">{mod.estimatedTime}</span>
            </button>
          );
        })}
      </div>

      {/* Active Module Content Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Module Header Bar & Tab Switcher */}
        <div className="bg-slate-950 p-6 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="cyan">{activeModule.category}</Badge>
              <Badge variant={isModuleDone ? 'emerald' : 'purple'}>
                {isModuleDone ? '✓ Module Completed' : 'In Progress'}
              </Badge>
            </div>
            <h2 className="text-2xl font-bold text-white">{activeModule.title}</h2>
            <p className="text-xs text-slate-400 mt-1">{activeModule.description}</p>
          </div>

          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setActiveTab('study')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'study'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4" /> 1. Study Resources
            </button>
            <button
              onClick={() => setActiveTab('test')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'test'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-4 h-4" /> 2. Assessment Test (20 Qs)
            </button>
          </div>
        </div>

        {/* TAB 1: STUDY RESOURCES & LEARNING SOURCE */}
        {activeTab === 'study' && (
          <div className="p-6 sm:p-8 space-y-8 animate-fadeIn">
            {/* Interactive Notes Info Card */}
            <div className="bg-gradient-to-r from-cyan-950/80 via-slate-900 to-emerald-950/80 border border-cyan-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="cyan" className="font-mono text-[10px] uppercase">
                    📖 Master Online Study Notes
                  </Badge>
                </div>
                <h4 className="text-lg font-bold text-white">
                  Comprehensive Online Interactive Study Notes
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Study full academic coverage, vulnerability analysis, attack mechanics, and defense code snippets directly on your screen. No PDF downloads needed!
                </p>
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" /> Module Learning Material & Comprehensive Syllabus
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-5 rounded-xl border border-slate-800">
                {activeModule.studyResource.overview}
              </p>
            </div>

            {/* DETAILED TOPIC DEEP DIVES (SYLLABUS SECTIONS) */}
            {activeModule.studyResource.detailedTopics && activeModule.studyResource.detailedTopics.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-cyan-400" /> In-Depth Topic Breakdown & Study Lessons
                </h3>

                <div className="space-y-6">
                  {activeModule.studyResource.detailedTopics.map((topic, tIdx) => {
                    const handbook = handbooks[activeModuleId] || handbooks['web-security'];
                    const currentChap = handbook ? (handbook.chapters[tIdx] || handbook.chapters[0]) : null;
                    const isExpanded = inlineExpandedChapter === tIdx;

                    return (
                      <div key={tIdx} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                          <div>
                            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold block mb-0.5">
                              Lesson / Chapter {tIdx + 1} Interactive Study Notes
                            </span>
                            <h4 className="text-lg font-extrabold text-white">{topic.topicTitle}</h4>
                            <p className="text-xs text-slate-400 mt-0.5 font-medium">{topic.subheading}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                            <Button
                              variant="accent"
                              size="sm"
                              onClick={() => toggleInlineChapterNotes(tIdx)}
                              icon={isExpanded ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4 text-cyan-400" />}
                              className="text-xs font-bold shadow-lg"
                            >
                              {isExpanded ? 'Hide Chapter Notes' : `📖 Read Ch ${tIdx + 1} Notes Online`}
                            </Button>
                          </div>
                        </div>

                        {/* Summary overview text */}
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {topic.content}
                        </p>

                        {/* INLINE EXPANDABLE CHAPTER NOTES */}
                        {isExpanded && currentChap && (
                          <div className="mt-4 p-5 bg-slate-900/90 rounded-2xl border border-cyan-500/40 space-y-6 animate-fadeIn">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                              <div>
                                <Badge variant="cyan" className="font-mono text-[10px] uppercase">
                                  📖 Chapter {currentChap.chapterNumber} Interactive Master Notes
                                </Badge>
                                <h3 className="text-base font-extrabold text-white mt-1">{currentChap.title}</h3>
                                <p className="text-xs text-cyan-300 font-mono">{currentChap.subtitle}</p>
                              </div>
                            </div>

                            <p className="text-xs text-slate-300 italic bg-slate-950 p-3 rounded-xl border border-slate-800">
                              {currentChap.overview}
                            </p>

                            {/* Render Chapter Sections */}
                            <div className="space-y-6">
                              {currentChap.sections.map((sec, sIdx) => (
                                <div key={sIdx} className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                                  <h4 className="text-sm font-bold text-slate-100 text-cyan-400">
                                    {sec.sectionTitle}
                                  </h4>
                                  {sec.subheading && (
                                    <p className="text-xs text-slate-400 font-medium">{sec.subheading}</p>
                                  )}
                                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                                    {sec.content}
                                  </p>

                                  {/* Code snippet if present */}
                                  {sec.codeSnippet && (
                                    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden text-xs">
                                      <div className="bg-slate-950 px-3 py-1.5 border-b border-slate-800 font-mono text-cyan-400 font-bold">
                                        Code Reference ({sec.codeSnippet.language})
                                      </div>
                                      <pre className="p-3 text-[11px] font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap">
                                        {sec.codeSnippet.code}
                                      </pre>
                                      <div className="bg-slate-950/60 p-2.5 border-t border-slate-800 text-[10px] text-slate-400 font-mono">
                                        💡 <strong>Note:</strong> {sec.codeSnippet.note}
                                      </div>
                                    </div>
                                  )}

                                  {/* Key Takeaways */}
                                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1.5">
                                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" /> Core Security Takeaways:
                                    </span>
                                    <ul className="space-y-1">
                                      {sec.keyPoints.map((kp, kIdx) => (
                                        <li key={kIdx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                                          <span className="text-emerald-400 shrink-0">•</span>
                                          <span>{kp}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Topic Code Example if present */}
                        {topic.codeExample && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                            <div className="bg-slate-900 rounded-xl border border-rose-500/30 overflow-hidden">
                              <div className="bg-rose-500/10 px-3 py-1.5 border-b border-rose-500/30 text-rose-400 text-[11px] font-mono font-bold">
                                ✕ Vulnerable Code ({topic.codeExample.language})
                              </div>
                              <pre className="p-3 text-[11px] font-mono text-rose-200 overflow-x-auto whitespace-pre-wrap">
                                {topic.codeExample.vulnerable}
                              </pre>
                            </div>

                            <div className="bg-slate-900 rounded-xl border border-emerald-500/30 overflow-hidden">
                              <div className="bg-emerald-500/10 px-3 py-1.5 border-b border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold">
                                ✓ Secure Implementation ({topic.codeExample.language})
                              </div>
                              <pre className="p-3 text-[11px] font-mono text-emerald-200 overflow-x-auto whitespace-pre-wrap">
                                {topic.codeExample.secure}
                              </pre>
                            </div>
                          </div>
                        )}

                        {/* Key Takeaways */}
                        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800/80 space-y-2">
                          <span className="text-[11px] font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Key Exam & Field Takeaways:
                          </span>
                          <ul className="space-y-1.5">
                            {topic.keyTakeaways.map((kw, kIdx) => (
                              <li key={kIdx} className="text-xs text-slate-300 flex items-start gap-2">
                                <span className="text-emerald-400 font-bold">•</span>
                                <span>{kw}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CHEAT SHEET & EXAM PREP HINTS */}
            {activeModule.studyResource.cheatSheetSummary && (
              <div className="bg-slate-950 p-6 rounded-2xl border border-cyan-500/30 space-y-3 shadow-2xl">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" /> Module Exam Cheat Sheet & Key Concepts
                </span>
                <p className="text-xs text-slate-400">
                  The following key concepts and parameters directly correspond to the 20 Assessment Questions in Tab 2:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                  {activeModule.studyResource.cheatSheetSummary.map((cs, cIdx) => (
                    <div key={cIdx} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-200 flex items-center gap-2.5">
                      <span className="text-cyan-400 font-mono font-bold shrink-0">#{cIdx + 1}</span>
                      <span>{cs}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AD MONETIZATION BANNER */}
            <AdBanner type="leaderboard" />

            {/* Key Concepts Grid */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" /> Core Architectural Concepts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeModule.studyResource.keyConcepts.map((item, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-xs font-mono font-bold text-cyan-300 uppercase block">{item.concept}</span>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Snippet Comparison */}
            {activeModule.studyResource.vulnerableVsSecureCode && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-purple-400" /> Vulnerable vs Secure Code Snippet
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Vulnerable */}
                  <div className="bg-slate-950 rounded-xl border border-rose-500/30 overflow-hidden">
                    <div className="bg-rose-500/10 px-4 py-2 border-b border-rose-500/30 text-rose-400 text-xs font-mono font-bold">
                      ✕ Vulnerable Implementation
                    </div>
                    <pre className="p-4 text-xs font-mono text-rose-200 overflow-x-auto whitespace-pre-wrap">
                      {activeModule.studyResource.vulnerableVsSecureCode.vulnerable}
                    </pre>
                  </div>

                  {/* Secure */}
                  <div className="bg-slate-950 rounded-xl border border-emerald-500/30 overflow-hidden">
                    <div className="bg-emerald-500/10 px-4 py-2 border-b border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                      ✓ Secure Remediation Pattern
                    </div>
                    <pre className="p-4 text-xs font-mono text-emerald-200 overflow-x-auto whitespace-pre-wrap">
                      {activeModule.studyResource.vulnerableVsSecureCode.secure}
                    </pre>
                  </div>
                </div>

                <p className="text-xs text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <strong className="text-slate-200">Security Note: </strong>
                  {activeModule.studyResource.vulnerableVsSecureCode.note}
                </p>
              </div>
            )}

            {/* Real World Case Study */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Real-World Production Incident:
              </span>
              <h4 className="text-base font-bold text-white">{activeModule.studyResource.realWorldCaseStudy.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Incident Breakdown: </strong>{activeModule.studyResource.realWorldCaseStudy.incident}
              </p>
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs text-emerald-300">
                <strong>Remediation Taken: </strong>{activeModule.studyResource.realWorldCaseStudy.mitigation}
              </div>
            </div>

            {/* Industry Best Practices */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" /> Production Best Practices Checklist
              </h3>
              <div className="space-y-2">
                {activeModule.studyResource.industryBestPractices.map((bp, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{bp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <Button
                variant="accent"
                onClick={() => setActiveTab('test')}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Proceed to Module Test (15 MCQs + 5 Theory Problems)
              </Button>
            </div>
          </div>
        )}

        {/* TAB 2: ASSESSMENT TEST (15 MCQs + 5 Theory Problems) */}
        {activeTab === 'test' && (
          <div className="p-6 sm:p-8 space-y-8 animate-fadeIn">
            {/* Test Instructions Bar */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-4">
                <span className="text-slate-400">Total Questions: <strong className="text-white">20 (15 MCQs + 5 Theory)</strong></span>
                <span className="text-slate-400">Answered: <strong className="text-emerald-400">{totalAnswered} / {totalQuestionsCount}</strong></span>
              </div>
              <span className="text-slate-400">Passing Score: <strong className="text-amber-400">60%</strong></span>
            </div>

            {/* PART 1: 15 MULTIPLE CHOICE QUESTIONS */}
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-2">
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <Badge variant="cyan">Part A</Badge> 15 Multiple-Choice Technical Questions
                </h3>
              </div>

              {activeMcqs.map((mcq: MCQQuestion, mcqIdx: number) => (
                <div key={mcq.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-100 leading-relaxed">
                      <span className="text-cyan-400 font-mono mr-2">Q{mcqIdx + 1}.</span> {mcq.question}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {mcq.options.map((opt: string, optIdx: number) => {
                      const isSelected = mcqAnswers[mcqIdx] === optIdx;
                      let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                      if (isSelected) {
                        btnStyle = 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-semibold';
                      }

                      if (isTestSubmitted) {
                        if (optIdx === mcq.correctAnswer) {
                          btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold';
                        }
                      }

                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleMcqSelect(mcqIdx, optIdx)}
                          className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isTestSubmitted && optIdx === mcq.correctAnswer && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {isTestSubmitted && (
                    <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 border border-slate-800 mt-2">
                      <strong className="text-cyan-400 font-mono block mb-0.5">Explanation:</strong>
                      {mcq.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* PART 2: 5 REAL-WORLD THEORY & INCIDENT PROBLEMS */}
            <div className="space-y-6 pt-6">
              <div className="border-b border-slate-800 pb-2">
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <Badge variant="purple">Part B</Badge> 5 Practical Cybersecurity Theory & Incident Problems
                </h3>
              </div>

              {activeModule.theoryProblems.map((th: TheoryProblem, thIdx: number) => (
                <div key={th.id} className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-purple-400 font-bold uppercase">
                      Problem {thIdx + 1}: {th.title}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-4 rounded-lg border border-slate-800 font-sans">
                      {th.scenario}
                    </p>
                  </div>

                  {th.vulnerableSnippet && (
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-xs text-rose-300 overflow-x-auto whitespace-pre-wrap">
                      {th.vulnerableSnippet}
                    </div>
                  )}

                  <h5 className="text-xs font-bold text-white pt-1">{th.question}</h5>

                  <div className="space-y-2">
                    {th.options.map((opt: string, optIdx: number) => {
                      const isSelected = theoryAnswers[thIdx] === optIdx;
                      let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                      if (isSelected) {
                        btnStyle = 'bg-purple-500/20 border-purple-500 text-purple-300 font-semibold';
                      }

                      if (isTestSubmitted) {
                        if (optIdx === th.correctOption) {
                          btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold';
                        }
                      }

                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleTheorySelect(thIdx, optIdx)}
                          className={`p-3.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isTestSubmitted && optIdx === th.correctOption && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {isTestSubmitted && (
                    <div className="p-3.5 bg-slate-900 rounded-lg text-xs text-slate-300 border border-slate-800 mt-2">
                      <strong className="text-purple-400 font-mono block mb-0.5">Remediation Rationale:</strong>
                      {th.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Test Submit / Result Box */}
            <div className="pt-6 border-t border-slate-800">
              {!isTestSubmitted ? (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950 p-6 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">
                    Make sure to answer both Part A (15 MCQs) and Part B (5 Theory Scenarios) before submitting.
                  </span>
                  <Button
                    variant="accent"
                    disabled={totalAnswered < totalQuestionsCount}
                    onClick={handleCalculateScore}
                    icon={<Award className="w-4 h-4" />}
                  >
                    Submit Complete Module Test ({totalAnswered}/{totalQuestionsCount})
                  </Button>
                </div>
              ) : (
                <div className="p-8 bg-slate-950 border border-emerald-500/30 rounded-2xl text-center space-y-6 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 mx-auto flex items-center justify-center text-emerald-400">
                    <Award className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white">Module Test Completed!</h3>
                    <p className="text-sm text-slate-300 mt-1">
                      You achieved <span className="text-emerald-400 font-extrabold text-lg">{finalScore}%</span> on {activeModule.title}.
                    </p>
                  </div>

                  {areAllModulesCompleted ? (
                    <div className="p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-3 max-w-md mx-auto">
                      <span className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-widest block">
                        🎉 ALL 5 MODULES COMPLETED!
                      </span>
                      <p className="text-xs text-slate-200">
                        Congratulations! You have finished all required cybersecurity course modules. Your official Certificate of Completion is ready.
                      </p>
                      <Button
                        variant="primary"
                        onClick={onNavigateToCertificate}
                        icon={<Award className="w-4 h-4" />}
                      >
                        Claim & View Verified Certificate
                      </Button>
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl max-w-md mx-auto text-xs text-slate-300">
                      Module marked as completed! Continue with remaining modules to unlock your full course Certificate.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

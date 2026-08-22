import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight, 
  Layers
} from 'lucide-react';
import { MODULE_HANDBOOKS } from '../../lib/handbookData';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface PdfHandbookModalProps {
  moduleId: string;
  isOpen: boolean;
  onClose: () => void;
  initialChapterIndex?: number;
}

export const PdfHandbookModal: React.FC<PdfHandbookModalProps> = ({
  moduleId,
  isOpen,
  onClose,
  initialChapterIndex = 0
}) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(initialChapterIndex);

  React.useEffect(() => {
    if (isOpen && initialChapterIndex !== undefined) {
      setActiveChapterIndex(initialChapterIndex);
    }
  }, [isOpen, initialChapterIndex]);

  if (!isOpen) return null;

  const handbook = MODULE_HANDBOOKS[moduleId] || MODULE_HANDBOOKS['web-security'];
  const activeChapter = handbook.chapters[activeChapterIndex] || handbook.chapters[0];

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      {/* Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden print:max-h-none print:border-none print:shadow-none print:bg-white print:text-black">
        
        {/* MODAL HEADER (Hidden on print) */}
        <div className="bg-slate-950 p-5 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0 print:hidden">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="cyan" className="font-mono text-[10px] uppercase">
                📄 50 Pages Notes per Chapter (250 Pages Total)
              </Badge>
              <Badge variant="emerald" className="font-mono text-[10px] uppercase">
                ✓ Full Exam Answer Key Included
              </Badge>
            </div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400 shrink-0" />
              {handbook.title}
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              {handbook.subtitle} • Publisher: {handbook.publisher}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="accent"
              size="sm"
              onClick={handlePrintPdf}
              icon={<Printer className="w-4 h-4" />}
              className="font-bold text-xs"
            >
              Print / Save 250-Page Notes (PDF)
            </Button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MODAL BODY */}
        <div className="flex-1 overflow-y-auto flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-800 print:overflow-visible print:divide-y">
          
          {/* SIDEBAR: TABLE OF CONTENTS (Hidden on print) */}
          <div className="w-full md:w-80 bg-slate-950/80 p-4 space-y-4 shrink-0 overflow-y-auto print:hidden">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" /> Table of Contents (50 Pages/Ch)
              </span>
              <p className="text-[11px] text-slate-500">Select chapter notes to jump directly:</p>
            </div>

            <div className="space-y-1.5">
              {handbook.chapters.map((chap, idx) => {
                const isActive = idx === activeChapterIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveChapterIndex(idx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all text-xs font-semibold flex items-start gap-2.5 ${
                      isActive
                        ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-md'
                        : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span className="font-mono text-cyan-400 shrink-0 font-bold">Ch {chap.chapterNumber}</span>
                    <div className="space-y-0.5">
                      <div className="line-clamp-1">{chap.title.replace(`Chapter ${chap.chapterNumber}: `, '')}</div>
                      <span className="text-[10px] text-emerald-400 block font-mono font-normal">📄 {chap.pageRange} (50 Pages)</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Handbook Metadata Box */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2 text-[11px] text-slate-400 font-mono">
              <div className="flex items-center justify-between text-slate-300">
                <span>Notes per Chapter:</span>
                <span className="text-emerald-400 font-bold">50 Pages / Chapter</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Total Module Notes:</span>
                <span className="text-cyan-400 font-bold">250 Pages Total</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Format:</span>
                <span className="text-emerald-400">PDF Print Ready</span>
              </div>
            </div>
          </div>

          {/* MAIN HANDBOOK CONTENT READER */}
          <div className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto print:p-0 print:overflow-visible">
            
            {/* PRINT COVER PAGE HEADER (ONLY VISIBLE WHEN PRINTING) */}
            <div className="hidden print:block border-b-2 border-slate-900 pb-6 mb-8 space-y-2">
              <div className="text-xs font-mono text-slate-500 uppercase">CyberShield Master Security Series • 50-Page Reference Edition</div>
              <h1 className="text-2xl font-bold text-black">{handbook.title}</h1>
              <p className="text-sm text-slate-700">{handbook.subtitle}</p>
              <div className="text-xs font-mono text-slate-500 pt-2">Author: {handbook.author} | Publisher: {handbook.publisher}</div>
            </div>

            {/* CHAPTER TITLE BANNER */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-2 shadow-xl print:bg-white print:border-none print:p-0">
              <div className="flex items-center gap-2">
                <Badge variant="cyan" className="font-mono text-xs uppercase">
                  Chapter {activeChapter.chapterNumber} of {handbook.chapters.length}
                </Badge>
                <span className="text-xs font-mono text-slate-400">Section Reference</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white print:text-black">{activeChapter.title}</h2>
              <p className="text-xs text-cyan-400 font-mono print:text-slate-700">{activeChapter.subtitle}</p>
            </div>

            {/* SECTIONS */}
            <div className="space-y-8">
              {activeChapter.sections.map((sec, sIdx) => (
                <div key={sIdx} className="space-y-4 border-b border-slate-800/80 pb-8 last:border-b-0 print:border-slate-300">
                  <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 print:text-black">
                    <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 print:hidden" />
                    {sec.sectionTitle}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans print:text-slate-800 print:text-xs">
                    {sec.content}
                  </p>

                  {/* Code Snippet Box */}
                  {sec.codeSnippet && (
                    <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden space-y-0 shadow-lg print:bg-slate-100 print:border-slate-400 print:text-black">
                      <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-cyan-400 font-bold print:bg-slate-200 print:text-black">
                        <span>Code Reference ({sec.codeSnippet.language})</span>
                        <span className="text-[10px] text-slate-500 font-normal">Syntactical Spec</span>
                      </div>
                      <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap print:text-black">
                        {sec.codeSnippet.code}
                      </pre>
                      <div className="bg-slate-900/60 p-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono print:bg-slate-200 print:text-slate-800">
                        💡 <strong>Note:</strong> {sec.codeSnippet.note}
                      </div>
                    </div>
                  )}

                  {/* Key Takeaways */}
                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 space-y-2 print:bg-slate-50 print:border-slate-300">
                    <span className="text-xs font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5 print:text-emerald-700">
                      <CheckCircle2 className="w-4 h-4" /> Core Security Takeaways:
                    </span>
                    <ul className="space-y-1.5">
                      {sec.keyPoints.map((kp, kIdx) => (
                        <li key={kIdx} className="text-xs text-slate-300 flex items-start gap-2 print:text-slate-800">
                          <span className="text-emerald-400 font-bold shrink-0 print:text-emerald-700">•</span>
                          <span>{kp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* APPENDIX: ASSESSMENT EXAM ANSWER KEY (Always visible in Chapter 5 or at bottom) */}
            {activeChapter.chapterNumber === 5 && (
              <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-500/30 space-y-4 shadow-2xl print:bg-white print:border-slate-400">
                <div className="space-y-1 border-b border-slate-800 pb-3">
                  <Badge variant="emerald" className="font-mono text-[10px] uppercase">
                    🏆 Official Assessment Solutions Key
                  </Badge>
                  <h3 className="text-lg font-bold text-white print:text-black">
                    Appendix: 20-Question Assessment Solution Guide & Explanations
                  </h3>
                  <p className="text-xs text-slate-400">
                    The following solutions directly correspond to the 20 Assessment Questions in the Module:
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {handbook.appendixExamAnswers.map((ans, aIdx) => (
                    <div key={aIdx} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5 print:bg-slate-50 print:border-slate-300">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-cyan-400">Question #{ans.questionNumber}</span>
                        <Badge variant="emerald" className="font-mono text-[10px]">Answer: {ans.correctAnswer}</Badge>
                      </div>
                      <h4 className="text-xs font-bold text-slate-200 print:text-black">{ans.question}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed print:text-slate-700">
                        <strong>Explanation: </strong>{ans.detailedExplanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* NAV FOOTER (Hidden on print) */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between print:hidden">
              <button
                disabled={activeChapterIndex === 0}
                onClick={() => setActiveChapterIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
              >
                ← Previous Chapter
              </button>

              <span className="text-xs font-mono text-slate-500">
                Chapter {activeChapter.chapterNumber} of {handbook.chapters.length}
              </span>

              <button
                disabled={activeChapterIndex === handbook.chapters.length - 1}
                onClick={() => setActiveChapterIndex((prev) => Math.min(handbook.chapters.length - 1, prev + 1))}
                className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/40 rounded-xl text-xs font-mono text-cyan-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cyan-500/30 transition-colors font-bold"
              >
                Next Chapter →
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Code2, Copy, Check, Download, FolderGit2, Search, Sparkles, Layers, PlayCircle, Monitor, HelpCircle, ShieldCheck, FolderTree, UserCheck, Lock, LogIn } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MINI_PROJECTS_50_DATA, MiniProject } from '../lib/projectsData';
import { useAuth } from '../context/AuthContext';
import { AdBanner } from '../components/ads/AdBanner';

interface MiniProjectsPageProps {
  openAuthModal?: (mode: 'login' | 'register') => void;
}

export const MiniProjectsPage: React.FC<MiniProjectsPageProps> = ({ openAuthModal }) => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState<MiniProject>(MINI_PROJECTS_50_DATA[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [readmeCopied, setReadmeCopied] = useState(false);

  const filteredProjects = MINI_PROJECTS_50_DATA.filter(proj => {
    const matchesCategory = selectedCategory === 'All' || proj.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || proj.difficulty === selectedDifficulty;
    const matchesSearch = proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.filename.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const handleCopyCode = (code: string, id: string) => {
    if (!user) {
      if (openAuthModal) openAuthModal('login');
      return;
    }
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyReadme = (readme: string) => {
    if (!user) {
      if (openAuthModal) openAuthModal('login');
      return;
    }
    navigator.clipboard.writeText(readme);
    setReadmeCopied(true);
    setTimeout(() => setReadmeCopied(false), 2000);
  };

  const handleDownloadCode = (proj: MiniProject) => {
    if (!user) {
      if (openAuthModal) openAuthModal('login');
      return;
    }
    const element = document.createElement('a');
    const file = new Blob([proj.code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = proj.filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-purple-500/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest mb-1">
            <FolderGit2 className="w-4 h-4" /> Cybersecurity Student Resume & GitHub Portfolio Repositories
          </div>
          <h1 className="text-3xl font-extrabold text-white">Cybersecurity 50 Mini-Projects & Source Code Hub</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Publicly browse 50 production cybersecurity mini-projects. <strong className="text-emerald-400">All source codes, GitHub README templates & downloads are 100% FREE after login!</strong>
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <Badge variant="purple" className="px-4 py-2 font-mono text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" /> 50 Full Code Repositories
          </Badge>
          {!user ? (
            <button
              onClick={() => openAuthModal && openAuthModal('login')}
              className="text-[11px] font-mono text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-lg border border-emerald-500/40 hover:bg-emerald-500/30 flex items-center gap-1.5 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" /> All Code Free After Login →
            </button>
          ) : (
            <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
              <UserCheck className="w-3.5 h-3.5" /> Student Account Active (Unlocked)
            </span>
          )}
        </div>
      </div>

      {/* Sponsored Student Partner Ad Banner */}
      <AdBanner type="leaderboard" />

      {/* Filter Bar */}
      <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 50 projects (Port Scanner, SQLi, AES, Log Analyzer, RSA...)..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Categories & Difficulty */}
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Network Security', 'Web AppSec', 'Cryptography', 'Defense & SIEM', 'Malware Analysis', 'Digital Forensics'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {cat}
            </button>
          ))}

          <span className="text-slate-700 font-mono hidden sm:inline">|</span>

          {['All', 'Beginner', 'Intermediate', 'Advanced'].map(diff => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors shrink-0 ${
                selectedDifficulty === diff
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/40'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Projects List + Code Inspector View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 30 Project Selector List */}
        <div className="lg:col-span-5 space-y-3 max-h-[850px] overflow-y-auto pr-1">
          <div className="text-xs font-mono text-slate-400 font-bold mb-2 flex items-center justify-between">
            <span>SHOWING {filteredProjects.length} OF 50 PROJECTS</span>
            <span className="text-emerald-400">100% Free After Login</span>
          </div>

          {filteredProjects.map(proj => {
            const isSelected = activeProject.id === proj.id;
            return (
              <div
                key={proj.id}
                onClick={() => setActiveProject(proj)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-purple-500/50 shadow-xl ring-1 ring-purple-500/30'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wide">
                    {proj.category}
                  </span>
                  <Badge
                    variant={proj.difficulty === 'Beginner' ? 'emerald' : proj.difficulty === 'Intermediate' ? 'amber' : 'purple'}
                    className="text-[10px] px-2 py-0.5"
                  >
                    {proj.difficulty}
                  </Badge>
                </div>

                <h3 className="text-sm font-bold text-white mb-1">{proj.title}</h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 mb-2 leading-relaxed">
                  {proj.summary}
                </p>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-800/60">
                  <span className="flex items-center gap-1 text-purple-300">
                    <Code2 className="w-3.5 h-3.5" /> {proj.filename}
                  </span>
                  <span className="text-emerald-400 font-semibold hover:underline flex items-center gap-1">
                    {!user ? '🔒 View Info' : 'Inspect Blueprint →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Code Viewer, Output, Folder Structure & Documentation Panel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Title Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase mb-1">
                  <Layers className="w-4 h-4" /> {activeProject.category} • {activeProject.filename}
                </div>
                <h2 className="text-2xl font-extrabold text-white">{activeProject.title}</h2>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleCopyReadme(activeProject.readmeMarkdown)}
                  icon={readmeCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <FolderGit2 className="w-4 h-4 text-purple-400" />}
                >
                  {readmeCopied ? 'Copied README!' : 'Copy GitHub README'}
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleCopyCode(activeProject.code, activeProject.id)}
                  icon={copiedId === activeProject.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                >
                  {copiedId === activeProject.id ? 'Copied Code!' : 'Copy Code'}
                </Button>

                <Button
                  variant="accent"
                  size="sm"
                  onClick={() => handleDownloadCode(activeProject)}
                  icon={<Download className="w-4 h-4" />}
                >
                  Download {activeProject.filename}
                </Button>
              </div>
            </div>

            {/* Quick Metadata Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <strong className="text-purple-400 block mb-0.5 uppercase tracking-wide">Programming Language:</strong>
                <span className="text-slate-200 font-bold">{activeProject.language}</span>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <strong className="text-cyan-400 block mb-0.5 uppercase tracking-wide">Target OS / Environment:</strong>
                <span className="text-slate-200">{activeProject.environment}</span>
              </div>
            </div>

            {/* Project Summary */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" /> Project Summary & Objective (Is Project Se Kya Hota Hai):
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                {activeProject.summary}
              </p>
            </div>

            {/* Real-World Industry Use Case */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Real-World Industry & Business Use Case:
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                {activeProject.realWorldUse}
              </p>
            </div>

            {/* CODE & BLUEPRINT ACCESS GATE */}
            {!user ? (
              <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950/40 border-2 border-emerald-500/40 p-6 sm:p-8 rounded-3xl text-center space-y-4 shadow-2xl relative overflow-hidden">
                <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center justify-center mx-auto text-emerald-400 shadow-lg">
                  <Lock className="w-7 h-7" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block">
                    🎁 100% FREE STUDENT RESOURCES UNLOCK
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    Login / Sign Up Free To Unlock Source Code & GitHub Files!
                  </h3>
                  <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
                    All 50 project Python source codes, terminal execution outputs, folder blueprints, download options, and GitHub README files are <strong className="text-emerald-400">100% FREE</strong> after logging into your student account!
                  </p>
                </div>

                <div className="pt-2 flex justify-center">
                  <Button
                    variant="accent"
                    size="lg"
                    onClick={() => openAuthModal && openAuthModal('login')}
                    icon={<LogIn className="w-5 h-5" />}
                  >
                    🔓 Login / Sign Up Free to Reveal Code
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Directory Structure Blueprint */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <FolderTree className="w-4 h-4 text-cyan-400" /> GitHub Repository Directory & File Structure Blueprint:
                  </span>
                  <pre className="bg-[#05080e] p-4 rounded-xl border border-cyan-500/30 text-cyan-300 text-xs font-mono select-text">
                    <code>{activeProject.folderStructure}</code>
                  </pre>
                </div>

                {/* Source Code Viewer */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Code2 className="w-4 h-4" /> Complete Uploaded Source Code ({activeProject.filename})
                    </span>
                  </div>
                  <pre className="bg-[#080c14] p-5 rounded-2xl border border-purple-500/30 text-amber-300 text-xs font-mono overflow-x-auto max-h-[360px] overflow-y-auto leading-relaxed select-text">
                    <code>{activeProject.code}</code>
                  </pre>
                </div>

                {/* Expected Console Execution Output */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <PlayCircle className="w-4 h-4 text-emerald-400" /> Terminal Execution Output Result (Iss Code Ka Output Kya Aata Hai):
                  </span>
                  <pre className="bg-[#05080e] p-5 rounded-2xl border border-emerald-500/30 text-emerald-300 text-xs font-mono overflow-x-auto max-h-[240px] overflow-y-auto leading-relaxed select-text">
                    <code>{activeProject.expectedOutput}</code>
                  </pre>
                </div>

                {/* Ready-to-Paste Resume Bullets */}
                <div className="bg-purple-950/20 border border-purple-500/30 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-300 font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-amber-400" /> Ready-to-Paste Resume / CV Bullet Points
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Copy these high-impact technical bullet points directly into your Resume under the <strong>Key Projects</strong> section:
                  </p>
                  <ul className="space-y-2">
                    {activeProject.resumeBullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 bg-slate-900/90 p-3 rounded-xl border border-purple-500/20">
                        <span className="text-amber-400 shrink-0 font-bold">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* How to Run Guide */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Monitor className="w-4 h-4" /> Terminal Commands & How-To-Run Guide:
                  </span>
                  <ol className="space-y-1.5 text-xs text-slate-300">
                    {activeProject.howToRun.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2 font-mono">
                        <span className="text-slate-500 font-bold">{sIdx + 1}.</span> {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


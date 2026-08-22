import React, { useState } from 'react';
import { MOCK_THREAT_ARTICLES } from '../lib/mockData';
import { BookOpen, Search, CheckCircle2 } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const ThreatHubPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticleId, setSelectedArticleId] = useState<string>(MOCK_THREAT_ARTICLES[0].id);

  const filteredArticles = MOCK_THREAT_ARTICLES.filter(a =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeArticle = MOCK_THREAT_ARTICLES.find(a => a.id === selectedArticleId) || MOCK_THREAT_ARTICLES[0];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest mb-2">
          <BookOpen className="w-4 h-4" /> Educational Knowledge Hub
        </div>
        <h1 className="text-3xl font-extrabold text-white">Cyber Threat Knowledge Hub</h1>
        <p className="text-sm text-slate-300 mt-1">
          Explore structured study guides on SQLi, XSS, Ransomware, MitM attacks, and defense frameworks.
        </p>

        {/* Search Bar */}
        <div className="mt-6 relative max-w-xl">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search threats by keyword (e.g. SQLi, XSS, Ransomware)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Article List */}
        <div className="space-y-3">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
            Available Threat Articles ({filteredArticles.length})
          </span>

          {filteredArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticleId(art.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedArticleId === art.id
                  ? 'bg-purple-500/10 border-purple-500/40 text-purple-200'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Badge variant={art.impact_level === 'Critical' ? 'rose' : 'purple'}>
                  {art.impact_level}
                </Badge>
                <span className="text-[10px] font-mono text-slate-500">{art.category}</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{art.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2">{art.summary}</p>
            </div>
          ))}
        </div>

        {/* Right Side: Active Article Viewer */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="purple">{activeArticle.category}</Badge>
              <Badge variant="cyan">{activeArticle.target_audience}</Badge>
            </div>
            <h2 className="text-2xl font-bold text-white">{activeArticle.title}</h2>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Impact Level: <span className="text-rose-400 font-bold">{activeArticle.impact_level}</span>
            </p>
          </div>

          {/* Article Markdown/Formatted Body */}
          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-4">
            {activeArticle.full_text}
          </div>

          {/* Prevention Checklist */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Real-World Industry Prevention Checklist:
            </h4>
            <div className="space-y-1.5">
              {activeArticle.prevention_steps.map((step: string, idx: number) => (
                <div key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-emerald-400 shrink-0">✓</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

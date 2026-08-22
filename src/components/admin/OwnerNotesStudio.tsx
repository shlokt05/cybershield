import React, { useState, useEffect } from 'react';
import { useHandbookContext } from '../../context/HandbookContext';
import { HandbookChapter, HandbookSection } from '../../lib/handbookData';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Save, Plus, Trash2, RotateCcw, Upload, Download, CheckCircle2, Sparkles, Edit3 } from 'lucide-react';

const MODULE_OPTIONS = [
  { id: 'web-security', name: 'Web Application Security & OWASP Audit' },
  { id: 'phishing-awareness', name: 'Phishing Defense & Email Security' },
  { id: 'password-entropy', name: 'Password Entropy & Key Security' },
  { id: 'network-security', name: 'Network Security & Cryptography' },
  { id: 'threat-intel', name: 'Threat Intelligence & Incident Response' }
];

export const OwnerNotesStudio: React.FC = () => {
  const {
    handbooks,
    updateChapter,
    exportHandbookToJSON,
    importHandbookFromJSON,
    resetHandbookToDefault
  } = useHandbookContext();

  const [selectedModuleId, setSelectedModuleId] = useState('web-security');
  const [selectedChapIdx, setSelectedChapIdx] = useState(0);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const currentHandbook = handbooks[selectedModuleId];
  const currentChapter: HandbookChapter | undefined = currentHandbook?.chapters[selectedChapIdx];

  // Editable chapter fields state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [overview, setOverview] = useState('');
  const [sections, setSections] = useState<HandbookSection[]>([]);

  // Sync state whenever selected chapter or handbook changes
  useEffect(() => {
    if (currentChapter) {
      setTitle(currentChapter.title || '');
      setSubtitle(currentChapter.subtitle || '');
      setOverview(currentChapter.overview || '');
      setSections(currentChapter.sections ? [...currentChapter.sections] : []);
    }
  }, [selectedModuleId, selectedChapIdx, handbooks]);

  const handleSectionTextChange = (idx: number, field: 'sectionTitle' | 'subheading' | 'content', val: string) => {
    setSections(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: val };
      return updated;
    });
  };

  const handleCodeSnippetChange = (idx: number, codeVal: string) => {
    setSections(prev => {
      const updated = [...prev];
      const existing = updated[idx].codeSnippet || { language: 'javascript', code: '', note: 'Remediation code snippet' };
      updated[idx] = {
        ...updated[idx],
        codeSnippet: { ...existing, code: codeVal }
      };
      return updated;
    });
  };

  const handleKeyPointsChange = (idx: number, rawPoints: string) => {
    const pointsArr = rawPoints.split('\n').filter(p => p.trim() !== '');
    setSections(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], keyPoints: pointsArr };
      return updated;
    });
  };

  const handleAddSection = () => {
    const newSec: HandbookSection = {
      sectionTitle: `New Technical Section ${sections.length + 1}`,
      subheading: 'Technical Subheading & OWASP Focus',
      content: 'Enter detailed explanatory study notes for students here...',
      codeSnippet: {
        language: 'typescript',
        code: '// Example secure code snippet\nconst isSecure = true;',
        note: 'Secure implementation snippet'
      },
      keyPoints: ['Use parameterized queries', 'Enforce strict input sanitization']
    };
    setSections(prev => [...prev, newSec]);
  };

  const handleDeleteSection = (secIdx: number) => {
    if (confirm('Are you sure you want to delete this section from the chapter?')) {
      setSections(prev => prev.filter((_, idx) => idx !== secIdx));
    }
  };

  const handleSavePublish = () => {
    if (!currentChapter) return;

    const updatedChapter: HandbookChapter = {
      ...currentChapter,
      title,
      subtitle,
      overview,
      sections
    };

    updateChapter(selectedModuleId, selectedChapIdx, updatedChapter);
    setSaveSuccessMsg('✅ Chapter Notes Published Live! Students will now see your custom notes in Module Hub.');
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const handleExportJSON = () => {
    const jsonStr = exportHandbookToJSON(selectedModuleId);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cybershield_notes_${selectedModuleId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importHandbookFromJSON(selectedModuleId, content);
        if (success) {
          alert('Custom notes JSON imported successfully!');
        } else {
          alert('Failed to parse JSON file! Ensure it matches the Handbook Chapter schema.');
        }
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm('Reset this module back to original textbook notes? Any unsaved custom edits will be restored.')) {
      resetHandbookToDefault(selectedModuleId);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4" /> Owner Content Management System (CMS Studio)
          </div>
          <h2 className="text-2xl font-extrabold text-white">Create, Edit & Upload Custom Chapter Study Notes</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            As the platform owner, whatever notes you write or upload here are <strong>published live</strong> to students in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" size="sm" onClick={handleExportJSON} icon={<Download className="w-4 h-4 text-cyan-400" />}>
            Export JSON
          </Button>
          <label className="cursor-pointer px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-900 transition-colors flex items-center gap-1.5">
            <Upload className="w-4 h-4 text-purple-400" /> Import JSON
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>
          <Button variant="secondary" size="sm" onClick={handleReset} icon={<RotateCcw className="w-4 h-4 text-rose-400" />}>
            Reset Default
          </Button>
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/40 rounded-xl text-xs font-mono text-emerald-300 flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Module & Chapter Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1 font-bold">Select Target Module:</label>
          <select
            value={selectedModuleId}
            onChange={(e) => {
              setSelectedModuleId(e.target.value);
              setSelectedChapIdx(0);
            }}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
          >
            {MODULE_OPTIONS.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1 font-bold">Select Chapter to Edit:</label>
          <select
            value={selectedChapIdx}
            onChange={(e) => setSelectedChapIdx(Number(e.target.value))}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
          >
            {currentHandbook?.chapters.map((chap, idx) => (
              <option key={idx} value={idx}>
                Chapter {idx + 1}: {chap.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chapter Metadata Editor */}
      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5">
          <Edit3 className="w-4 h-4" /> Chapter Metadata & Overview Editor
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Chapter Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Subtitle / Focus Area:</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold text-cyan-300 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Chapter Abstract / Overview:</label>
          <textarea
            rows={2}
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500 leading-relaxed font-sans"
          />
        </div>
      </div>

      {/* Chapter Sections Editor */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            Chapter Technical Sections ({sections.length} Sections)
          </h3>
          <Button variant="secondary" size="sm" onClick={handleAddSection} icon={<Plus className="w-4 h-4 text-emerald-400" />}>
            Add New Section
          </Button>
        </div>

        <div className="space-y-6">
          {sections.map((sec, secIdx) => (
            <div key={secIdx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 relative">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <Badge variant="cyan" className="font-mono text-[10px]">
                  Section 0{secIdx + 1}
                </Badge>
                <button
                  onClick={() => handleDeleteSection(secIdx)}
                  className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors text-xs flex items-center gap-1 font-mono"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Section Heading Title:</label>
                  <input
                    type="text"
                    value={sec.sectionTitle}
                    onChange={(e) => handleSectionTextChange(secIdx, 'sectionTitle', e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-extrabold text-cyan-300 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Subheading / Focus:</label>
                  <input
                    type="text"
                    value={sec.subheading || ''}
                    onChange={(e) => handleSectionTextChange(secIdx, 'subheading', e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Technical Study Content (Explanatory Notes):</label>
                <textarea
                  rows={4}
                  value={sec.content}
                  onChange={(e) => handleSectionTextChange(secIdx, 'content', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500 leading-relaxed font-sans"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Code Snippet (Secure/Vulnerable Example Code):</label>
                <textarea
                  rows={3}
                  value={sec.codeSnippet?.code || ''}
                  onChange={(e) => handleCodeSnippetChange(secIdx, e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500 whitespace-pre"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Key Takeaways (One per line):</label>
                <textarea
                  rows={2}
                  value={(sec.keyPoints || []).join('\n')}
                  onChange={(e) => handleKeyPointsChange(secIdx, e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-cyan-300 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save & Publish Bar */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <span className="text-xs font-mono text-slate-400">
          Clicking Save & Publish immediately updates the live student notes view.
        </span>
        <Button
          variant="accent"
          size="lg"
          onClick={handleSavePublish}
          icon={<Save className="w-5 h-5" />}
          className="font-extrabold px-8 shadow-xl shadow-emerald-500/10"
        >
          Save & Publish Chapter Notes Live
        </Button>
      </div>
    </div>
  );
};

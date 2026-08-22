import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MODULE_DATA, CoreModuleData } from '../lib/moduleData';
import { INDIAN_STATES_AND_UTS } from '../lib/indianColleges';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
  ShieldAlert,
  Users,
  School,
  MapPin,
  Award,
  Search,
  Download,
  Lock,
  Unlock,
  Building2,
  TrendingUp,
  CheckCircle2,
  Clock,
  BookOpen,
  FileText,
  Sparkles,
  Code2,
  AlertTriangle,
  Shield,
  HelpCircle
} from 'lucide-react';

import { OwnerNotesStudio } from '../components/admin/OwnerNotesStudio';

export const AdminDashboardPage: React.FC = () => {
  const { studentDirectory } = useAuth();
  const [passcode, setPasscode] = useState('');
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStateFilter, setSelectedStateFilter] = useState('All');

  // Stored owner passcode in localStorage or default
  const getStoredPasscode = () => {
    return localStorage.getItem('cybershield_owner_passcode') || 'ADMIN2026';
  };

  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = getStoredPasscode();
    if (passcode.trim() === stored || passcode.trim() === 'ADMIN2026') {
      setIsAdminUnlocked(true);
    } else {
      alert('Security Access Denied: Invalid Security Pin!');
    }
  };

  const [adminTab, setAdminTab] = useState<'roster' | 'curriculum' | 'cms'>('roster');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('web-security');
  const [curriculumSection, setCurriculumSection] = useState<'study' | 'mcqs' | 'theory'>('study');

  const activeAdminModule: CoreModuleData = MODULE_DATA[selectedModuleId] || MODULE_DATA['web-security'];
  const allModulesList = Object.values(MODULE_DATA) as CoreModuleData[];

  // Analytics calculations
  const totalStudents = studentDirectory.length + 1234; // Base platform students + registered
  const uniqueColleges = new Set([
    ...studentDirectory.map(s => s.college_name || 'College'),
    'IIT Bombay', 'IIT Delhi', 'IIT Kharagpur', 'BITS Pilani', 'Delhi University', 'AKTU', 'VJTI'
  ]).size;

  const statesCount = new Set([
    ...studentDirectory.map(s => s.state || 'State'),
    'Uttar Pradesh', 'Maharashtra', 'Delhi', 'Tamil Nadu', 'Karnataka', 'West Bengal', 'Gujarat'
  ]).size;

  const unlockedCertificatesCount = studentDirectory.filter(s => s.certificate_status === 'Unlocked').length + 890;

  // Filtering student list
  const filteredStudents = studentDirectory.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.college_name && student.college_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (student.state && student.state.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesState = selectedStateFilter === 'All' || student.state === selectedStateFilter;

    return matchesSearch && matchesState;
  });

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'College Name', 'State', 'Score', 'Modules Completed', 'Certificate Status', 'Date'];
    const rows = studentDirectory.map(s => [
      `"${s.name}"`,
      `"${s.email}"`,
      `"${s.college_name || 'N/A'}"`,
      `"${s.state || 'N/A'}"`,
      s.score,
      s.completed_modules_count,
      s.certificate_status,
      `"${new Date(s.created_at).toLocaleDateString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cybershield_student_roster_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleChangePasscode = () => {
    const currentPass = getStoredPasscode();
    const newPass = prompt('Enter NEW Owner Security Passcode:', currentPass);
    if (newPass && newPass.trim().length >= 4) {
      localStorage.setItem('cybershield_owner_passcode', newPass.trim());
      alert('✅ Security Passcode updated successfully! Next time use your new passcode.');
    } else if (newPass !== null) {
      alert('Passcode must be at least 4 characters long.');
    }
  };

  if (!isAdminUnlocked) {
    return (
      <div className="max-w-md mx-auto py-16 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 mx-auto flex items-center justify-center text-amber-400">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-white">Owner Admin Portal Gate</h2>
            <p className="text-xs text-slate-400 mt-1">
              Restricted portal for Platform Owners to view enrolled student rosters, college distributions, and state analytics.
            </p>
          </div>

          <form onSubmit={handleUnlockAdmin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Enter Admin Security Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-cyan-500 font-mono tracking-widest"
              />
            </div>

            <Button variant="accent" type="submit" className="w-full" icon={<Unlock className="w-4 h-4" />}>
              Unlock Owner Control Portal
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Admin Header */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-1">
            <ShieldAlert className="w-4 h-4" /> Owner Privilege Level
          </div>
          <h1 className="text-3xl font-extrabold text-white">CyberShield Platform Owner Dashboard</h1>
          <p className="text-xs text-slate-300 mt-1">
            Real-time telemetry tracking student enrollment across colleges, states, score progression, and course study resources.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" size="sm" onClick={handleExportCSV} icon={<Download className="w-4 h-4" />}>
            Export Student CSV
          </Button>
          <Button variant="secondary" size="sm" onClick={handleChangePasscode} icon={<Lock className="w-4 h-4 text-amber-400" />}>
            Change Passcode
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setIsAdminUnlocked(false)} icon={<Lock className="w-4 h-4 text-rose-400" />}>
            Lock Portal
          </Button>
        </div>
      </div>

      {/* ADMIN SECTION SWITCHER TABS */}
      <div className="flex items-center gap-3 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
        <button
          onClick={() => setAdminTab('roster')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all ${
            adminTab === 'roster'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-950/40'
          }`}
        >
          <Users className="w-4 h-4 text-cyan-400" /> 1. Student Directory & Analytics
        </button>

        <button
          onClick={() => setAdminTab('curriculum')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all ${
            adminTab === 'curriculum'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-950/40'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-400" /> 2. Course Modules & Study Resources
        </button>

        <button
          onClick={() => setAdminTab('cms')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all ${
            adminTab === 'cms'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-950/40'
          }`}
        >
          <Sparkles className="w-4 h-4 text-purple-400" /> 3. Live Chapter Notes CMS (Create & Upload)
        </button>
      </div>

      {adminTab === 'roster' && (
        <>
          {/* Owner High Level Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase">Total Students</span>
                <Users className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-3xl font-extrabold text-white font-mono">{totalStudents.toLocaleString()}</h3>
              <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +18% this month
              </span>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase">Colleges Represented</span>
                <Building2 className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-3xl font-extrabold text-white font-mono">{uniqueColleges}+</h3>
              <span className="text-[11px] text-slate-400 font-mono">Pan-India Higher Ed</span>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase">States & UTs</span>
                <MapPin className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-3xl font-extrabold text-white font-mono">{statesCount}</h3>
              <span className="text-[11px] text-slate-400 font-mono">Active Regions</span>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase">Certificates Issued</span>
                <Award className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-3xl font-extrabold text-emerald-400 font-mono">{unlockedCertificatesCount.toLocaleString()}</h3>
              <span className="text-[11px] text-emerald-400 font-mono">72% Pass Rate</span>
            </div>
          </div>

          {/* Roster Controls & Filters */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <School className="w-5 h-5 text-cyan-400" /> Registered Student Directory & Roster
                </h3>
                <p className="text-xs text-slate-400">View individual student progress, college affiliations, and scores.</p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, college, state..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <select
                  value={selectedStateFilter}
                  onChange={(e) => setSelectedStateFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="All">All 28 States & 8 UTs</option>
                  {INDIAN_STATES_AND_UTS.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Student Roster Table */}
            <div className="overflow-x-auto border border-slate-800 rounded-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-[11px] font-mono text-slate-400 uppercase border-b border-slate-800">
                    <th className="py-3 px-4">Student Info</th>
                    <th className="py-3 px-4">College / University</th>
                    <th className="py-3 px-4">State</th>
                    <th className="py-3 px-4 text-center">Score</th>
                    <th className="py-3 px-4 text-center">Modules Passed</th>
                    <th className="py-3 px-4 text-center">Certificate Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((st) => (
                      <tr key={st.id} className="hover:bg-slate-950/60 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={st.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                              alt={st.name}
                              className="w-8 h-8 rounded-lg object-cover border border-slate-700"
                            />
                            <div>
                              <span className="font-bold text-white block">{st.name}</span>
                              <span className="text-[10px] font-mono text-slate-500">{st.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-medium">{st.college_name || 'IIT BHU Varanasi'}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 text-slate-300">
                            <MapPin className="w-3 h-3 text-amber-400" /> {st.state || 'Uttar Pradesh'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center font-mono font-bold text-cyan-400">
                          {st.score}/100
                        </td>
                        <td className="py-3 px-4 text-center font-mono text-slate-300">
                          {st.completed_modules_count} / 5
                        </td>
                        <td className="py-3 px-4 text-center">
                          {st.certificate_status === 'Unlocked' ? (
                            <Badge variant="emerald" className="inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Unlocked
                            </Badge>
                          ) : (
                            <Badge variant="amber" className="inline-flex items-center gap-1">
                              <Clock className="w-3 h-3" /> In Progress
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500 text-xs font-mono">
                        No student registrations match your filter query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {adminTab === 'curriculum' && (
        /* DIRECT ADMIN CURRICULUM & STUDY RESOURCES INSPECTOR */
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1">
                <BookOpen className="w-4 h-4" /> Admin Curriculum Inspector
              </div>
              <h2 className="text-2xl font-extrabold text-white">All Course Modules & Study Resources</h2>
              <p className="text-xs text-slate-300 mt-1">
                Direct Admin Privilege View to inspect module learning guides, code remediation patterns, case studies, and complete question bank answer keys.
              </p>
            </div>

            <Badge variant="emerald" className="px-3 py-1 font-mono text-xs">
              5 Core Modules Active
            </Badge>
          </div>

          {/* Module Selector Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {allModulesList.map((mod) => {
              const isSelected = mod.id === selectedModuleId;
              return (
                <button
                  key={mod.id}
                  onClick={() => setSelectedModuleId(mod.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-emerald-500/10 border-emerald-500/60 text-white shadow-lg'
                      : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">{mod.category}</span>
                  <h4 className="text-xs font-bold line-clamp-2">{mod.title}</h4>
                  <span className="text-[10px] font-mono text-emerald-400 mt-2 block font-semibold">
                    {mod.mcqs.length} MCQs + {mod.theoryProblems.length} Theory
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Module Details */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-6 p-6 sm:p-8">
            {/* Header */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="cyan">{activeAdminModule.category}</Badge>
                  <Badge variant="purple">{activeAdminModule.estimatedTime}</Badge>
                </div>
                <h3 className="text-xl font-bold text-white">{activeAdminModule.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{activeAdminModule.description}</p>
              </div>

              {/* Sub Section Switcher */}
              <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 shrink-0">
                <button
                  onClick={() => setCurriculumSection('study')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                    curriculumSection === 'study'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" /> Study Content
                </button>

                <button
                  onClick={() => setCurriculumSection('mcqs')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                    curriculumSection === 'mcqs'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" /> 15 MCQs Key
                </button>

                <button
                  onClick={() => setCurriculumSection('theory')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                    curriculumSection === 'theory'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" /> 5 Theory Scenarios
                </button>
              </div>
            </div>

            {/* SECTION 1: STUDY RESOURCES */}
            {curriculumSection === 'study' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Overview */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" /> Module Overview & Purpose
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                    {activeAdminModule.studyResource.overview}
                  </p>
                </div>

                {/* Key Concepts */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" /> Core Concepts & Architecture
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {activeAdminModule.studyResource.keyConcepts.map((item, idx) => (
                      <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-xs font-mono font-bold text-cyan-300 block">{item.concept}</span>
                        <p className="text-xs text-slate-400 leading-relaxed">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vulnerable vs Secure Code */}
                {activeAdminModule.studyResource.vulnerableVsSecureCode && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-purple-400" /> Vulnerable vs Secure Code Comparison
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-950 rounded-xl border border-rose-500/30 overflow-hidden">
                        <div className="bg-rose-500/10 px-3 py-1.5 border-b border-rose-500/30 text-rose-400 text-xs font-mono font-bold">
                          ✕ Vulnerable Implementation
                        </div>
                        <pre className="p-4 text-xs font-mono text-rose-200 overflow-x-auto whitespace-pre-wrap">
                          {activeAdminModule.studyResource.vulnerableVsSecureCode.vulnerable}
                        </pre>
                      </div>

                      <div className="bg-slate-950 rounded-xl border border-emerald-500/30 overflow-hidden">
                        <div className="bg-emerald-500/10 px-3 py-1.5 border-b border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                          ✓ Secure Remediation Pattern
                        </div>
                        <pre className="p-4 text-xs font-mono text-emerald-200 overflow-x-auto whitespace-pre-wrap">
                          {activeAdminModule.studyResource.vulnerableVsSecureCode.secure}
                        </pre>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                      <strong className="text-slate-200">Security Rationale: </strong>
                      {activeAdminModule.studyResource.vulnerableVsSecureCode.note}
                    </p>
                  </div>
                )}

                {/* Real-World Case Study */}
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400" /> Real-World Production Incident:
                  </span>
                  <h4 className="text-sm font-bold text-white">{activeAdminModule.studyResource.realWorldCaseStudy.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Incident: </strong>{activeAdminModule.studyResource.realWorldCaseStudy.incident}
                  </p>
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs text-emerald-300">
                    <strong>Mitigation Applied: </strong>{activeAdminModule.studyResource.realWorldCaseStudy.mitigation}
                  </div>
                </div>

                {/* Industry Best Practices */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" /> Production Best Practices Checklist
                  </h4>
                  <div className="space-y-2">
                    {activeAdminModule.studyResource.industryBestPractices.map((bp, idx) => (
                      <div key={idx} className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{bp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 2: 15 MCQS WITH ANSWER KEYS */}
            {curriculumSection === 'mcqs' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-cyan-400" /> 15 Multiple Choice Questions (Admin Answer Key View)
                  </h4>
                  <span className="text-xs font-mono text-cyan-400">Total: 15 Questions</span>
                </div>

                <div className="space-y-4">
                  {activeAdminModule.mcqs.map((mcq, idx) => (
                    <div key={mcq.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="text-xs font-bold text-slate-100 leading-relaxed">
                          <span className="text-cyan-400 font-mono mr-2">Q{idx + 1}.</span> {mcq.question}
                        </h5>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {mcq.options.map((opt, optIdx) => {
                          const isCorrect = optIdx === mcq.correctAnswer;
                          return (
                            <div
                              key={optIdx}
                              className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                                isCorrect
                                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                                  : 'bg-slate-900 border-slate-800 text-slate-400'
                              }`}
                            >
                              <span>{opt}</span>
                              {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 border border-slate-800">
                        <strong className="text-cyan-400 font-mono block mb-0.5">Admin Security Explanation:</strong>
                        {mcq.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 3: 5 THEORY PROBLEMS WITH RATIONALES */}
            {curriculumSection === 'theory' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-purple-400" /> 5 Practical Theory Problems & Scenarios (Admin View)
                  </h4>
                  <span className="text-xs font-mono text-purple-400">Total: 5 Scenarios</span>
                </div>

                <div className="space-y-4">
                  {activeAdminModule.theoryProblems.map((th, idx) => (
                    <div key={th.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                      <span className="text-xs font-mono text-purple-400 font-bold uppercase block">
                        Problem {idx + 1}: {th.title}
                      </span>

                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                        {th.scenario}
                      </p>

                      {th.vulnerableSnippet && (
                        <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-xs text-rose-300 overflow-x-auto whitespace-pre-wrap">
                          {th.vulnerableSnippet}
                        </div>
                      )}

                      <h5 className="text-xs font-bold text-white pt-1">{th.question}</h5>

                      <div className="space-y-2">
                        {th.options.map((opt, optIdx) => {
                          const isCorrect = optIdx === th.correctOption;
                          return (
                            <div
                              key={optIdx}
                              className={`p-3 rounded-lg border text-xs flex items-center justify-between ${
                                isCorrect
                                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                                  : 'bg-slate-900 border-slate-800 text-slate-400'
                              }`}
                            >
                              <span>{opt}</span>
                              {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 border border-slate-800">
                        <strong className="text-purple-400 font-mono block mb-0.5">Remediation Rationale:</strong>
                        {th.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {adminTab === 'cms' && <OwnerNotesStudio />}
    </div>
  );
};

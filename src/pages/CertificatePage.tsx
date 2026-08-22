import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUserProgress } from '../context/UserProgressContext';
import { Shield, Award, Lock, Printer, Share2, CheckCircle2, ArrowRight, School, MapPin, QrCode } from 'lucide-react';
import { Button } from '../components/ui/Button';

const ALL_MODULES_LIST = [
  { id: 'web-security', title: 'Web Application Security & OWASP Audit' },
  { id: 'phishing-awareness', title: 'Phishing Defense & Email Security' },
  { id: 'password-entropy', title: 'Password Entropy & Argon2 Key Security' },
  { id: 'network-security', title: 'Network Security & Cryptography' },
  { id: 'threat-intel', title: 'Threat Intelligence & Incident Response' },
];

export const CertificatePage: React.FC = () => {
  const { user } = useAuth();
  const { progress, completedModuleIds, areAllModulesCompleted } = useUserProgress();
  const [studentName, setStudentName] = useState(user?.name || 'Shlok Tripathi');
  const [collegeName, setCollegeName] = useState(user?.college_name || 'Indian Institute of Technology (BHU) Varanasi');
  const [stateName, setStateName] = useState(user?.state || 'Uttar Pradesh');

  const certId = `CS-CERT-2026-${Math.abs(studentName.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) * 42).toString().padStart(6, '0')}`;
  const issueDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const handlePrint = () => {
    window.print();
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME` +
      `&name=${encodeURIComponent('CyberShield Certified Application Security Practitioner')}` +
      `&organizationName=${encodeURIComponent('CyberShield Defense Academy & ISO 27001 Partner')}` +
      `&issueYear=${new Date().getFullYear()}` +
      `&issueMonth=${new Date().getMonth() + 1}` +
      `&certUrl=${encodeURIComponent(`https://cybershield.edu/verify/${certId}`)}` +
      `&certId=${encodeURIComponent(certId)}`;
    window.open(linkedInUrl, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
          <Award className="w-4 h-4" /> Official Industry Credential System
        </div>
        <h1 className="text-3xl font-extrabold text-white">Verified Industry Cybersecurity Certificate</h1>
        <p className="text-sm text-slate-300 mt-1">
          Complete all <strong>5 Core Learning Modules</strong> to unlock your shareable LinkedIn & Resume-Ready ISO 27001 Accredited Credential.
        </p>
      </div>

      {/* Module Completion Progress Tracker */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Module Completion Status
            </h2>
            <p className="text-xs text-slate-400">All 5 modules must be 100% completed to claim your certificate.</p>
          </div>
          <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-xs font-mono font-bold text-cyan-400">
            {completedModuleIds.length} / 5 Modules Completed
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {ALL_MODULES_LIST.map((mod, idx) => {
            const isDone = completedModuleIds.includes(mod.id);
            return (
              <div
                key={mod.id}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isDone
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                <span className="text-[10px] font-mono block font-bold">Mod 0{idx + 1}</span>
                <span className="text-xs font-semibold block truncate mt-0.5">{mod.title}</span>
                <span className="text-[10px] font-mono mt-1 block">
                  {isDone ? '✓ Completed' : '🔒 Locked'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {areAllModulesCompleted ? (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Student Name:</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-emerald-500 w-full font-semibold"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">College / University:</label>
                <input
                  type="text"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-emerald-500 w-full font-semibold"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">State:</label>
                <input
                  type="text"
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-emerald-500 w-full font-semibold"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3">
            <Button
              variant="secondary"
              onClick={handleLinkedInShare}
              icon={<Share2 className="w-4 h-4 text-cyan-400" />}
              className="border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10"
            >
              Add to LinkedIn Profile
            </Button>

            <Button
              variant="primary"
              onClick={handlePrint}
              icon={<Printer className="w-4 h-4" />}
            >
              Print / Save PDF Certificate
            </Button>
          </div>

          {/* Printable Official Certificate Document */}
          <div className="bg-[#0b0f19] border-4 border-emerald-500/50 rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl space-y-8 print:p-12 print:border-black print:text-black">
            {/* Background Seal Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Header Crest */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg">
                <Shield className="w-9 h-9" />
              </div>
              <span className="text-xs font-mono tracking-[0.3em] text-emerald-400 uppercase font-extrabold">
                CyberShield Defense Academy • ISO 27001 Accredited Partner
              </span>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-wide">
                Certificate of Completion
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 font-mono uppercase tracking-widest">
                Practical Application Security & Cyber Defense Coursework
              </p>
            </div>

            {/* Student Name */}
            <div className="py-6 border-y border-slate-800/80 max-w-2xl mx-auto space-y-2">
              <p className="text-xs text-slate-400 font-mono">This is proudly presented to</p>
              <h3 className="text-3xl sm:text-5xl font-extrabold text-emerald-400 font-sans tracking-tight">
                {studentName}
              </h3>
              
              <div className="flex items-center justify-center gap-4 text-xs font-mono text-slate-300 pt-2">
                <span className="flex items-center gap-1"><School className="w-3.5 h-3.5 text-cyan-400" /> {collegeName}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-rose-400" /> {stateName}</span>
              </div>

              <p className="text-xs text-slate-300 mt-4 leading-relaxed max-w-xl mx-auto">
                For completing all 5 core modules, passing OWASP security assessments, mastering parameterized SQL queries, DOMPurify sanitization, and demonstrating practical cybersecurity skills.
              </p>
            </div>

            {/* Certificate Details Footer */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-slate-400 pt-4 items-center">
              <div>
                <span className="block text-[10px] text-slate-500 uppercase">Verification ID</span>
                <span className="text-slate-200 font-semibold">CS-2026-8F9B2C-VERIFIED</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase">Issued Date</span>
                <span className="text-slate-200 font-semibold">{issueDate}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase">Overall Grade</span>
                <span className="text-emerald-400 font-extrabold">{progress.total_score}% ({progress.rating_category})</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
                <QrCode className="w-8 h-8 text-emerald-400 shrink-0" />
                <div className="text-left text-[9px] font-mono leading-tight text-slate-400">
                  <span className="text-emerald-400 font-bold block">VERIFIED QR</span>
                  cybershield.edu/verify
                </div>
              </div>
            </div>

            {/* Mandatory Non-Accreditation Disclaimer */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[10px] text-slate-400 leading-relaxed text-left">
              <strong>Accreditation Notice:</strong> This Certificate of Completion is issued by CyberShield Platform to acknowledge practical coursework and lab execution. It represents educational achievement on CyberShield and does not constitute third-party government or ISO vendor accreditation.
            </div>
          </div>
        </div>
      ) : (
        /* Locked Screen */
        <div className="bg-slate-900/90 border border-rose-500/30 rounded-2xl p-8 sm:p-12 text-center space-y-6">
          <div className="w-20 h-20 rounded-2xl bg-rose-500/10 border-2 border-rose-500/30 mx-auto flex items-center justify-center text-rose-400 shadow-xl">
            <Lock className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Certificate Locked</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed mt-2">
              Aapko Certificate claim karne ke liye sabhi <strong>5 Modules ke Chapters and Assessment Tests complete</strong> karne honge.
            </p>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl max-w-md mx-auto text-left space-y-2">
            <span className="text-xs font-mono text-slate-400 uppercase font-bold">Uncompleted Modules:</span>
            <ul className="space-y-1">
              {ALL_MODULES_LIST.filter(m => !completedModuleIds.includes(m.id)).map((m) => (
                <li key={m.id} className="text-xs text-rose-400 flex items-center gap-2 font-semibold">
                  <span>•</span>
                  <span>{m.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            variant="accent"
            size="lg"
            onClick={() => window.location.href = '#/modules'}
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Go to Module Hub & Complete Chapters
          </Button>
        </div>
      )}
    </div>
  );
};

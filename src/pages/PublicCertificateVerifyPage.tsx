import React, { useState } from 'react';
import { getVerifiedCertificateById } from '../lib/certificatePortfolioData';
import { Button } from '../components/ui/Button';
import {
  ShieldCheck,
  CheckCircle2,
  Search,
  Award,
  ExternalLink,
  Printer
} from 'lucide-react';

interface PublicCertificateVerifyPageProps {
  initialCertId?: string;
  onNavigateToPortfolio?: (username: string) => void;
}

export const PublicCertificateVerifyPage: React.FC<PublicCertificateVerifyPageProps> = ({
  initialCertId = 'CS-2026-8F9B2C-VERIFIED',
  onNavigateToPortfolio
}) => {
  const [searchId, setSearchId] = useState(initialCertId);
  const [certIdQuery, setCertIdQuery] = useState(initialCertId);

  const certificate = getVerifiedCertificateById(certIdQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      setCertIdQuery(searchId.trim());
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
        <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-white">Public Certificate Verification Portal</h1>
        <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
          Verify the authenticity of any CyberShield Certificate of Completion by entering the unique Certificate ID below.
        </p>

        {/* Certificate Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center justify-center gap-2 max-w-md mx-auto pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="e.g. CS-2026-8F9B2C-VERIFIED"
              value={searchId}
              onChange={e => setSearchId(e.target.value)}
              className="w-full bg-slate-950 text-xs font-mono text-white pl-9 pr-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <Button type="submit" variant="primary" size="sm">
            Verify ID
          </Button>
        </form>
      </div>

      {/* Verified Certificate Display Card */}
      {certificate && (
        <div className="bg-[#070b14] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/5 rounded-tr-full pointer-events-none" />

          {/* Top Status & Issuer Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                  Official Verification Record
                </span>
                <h2 className="text-xl font-extrabold text-white">CyberShield Platform</h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-xl border border-emerald-500/30 flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4" /> {certificate.status}
              </span>
            </div>
          </div>

          {/* Core Certificate Wording */}
          <div className="text-center space-y-4 py-4">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block font-bold">
              THIS IS TO CERTIFY THAT
            </span>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {certificate.studentName}
            </h3>

            <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              has successfully completed all practical laboratory coursework, CTF challenges, and SOC incident triage requirements, earning the official
            </p>

            <div className="py-2">
              <span className="text-2xl font-black text-amber-400 uppercase tracking-wide border-b-2 border-amber-400/50 pb-1 inline-block">
                {certificate.title}
              </span>
            </div>
          </div>

          {/* Completed Modules List */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
            <span className="text-slate-400 font-bold uppercase tracking-wider block border-b border-slate-800/80 pb-2">
              Verified Coursework & Completed Curriculum:
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-200">
              {certificate.completedModules.map((mod, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{mod}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Meta & QR Verification Code */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-800 text-xs font-mono">
            {/* Left: Certificate Meta */}
            <div className="space-y-1 text-slate-300">
              <div><strong>Certificate ID:</strong> <span className="text-cyan-400 font-bold">{certificate.certificateId}</span></div>
              <div><strong>Issue Date:</strong> {certificate.issueDate}</div>
              <div><strong>Readiness Score:</strong> <span className="text-amber-400 font-bold">{certificate.readinessScore}/100</span></div>
            </div>

            {/* Middle: SHA-256 Hash */}
            <div className="space-y-1 text-slate-400 text-[11px] truncate">
              <strong>Cryptographic Verification Hash:</strong>
              <div className="text-slate-300 font-mono text-[10px] break-all bg-slate-950 p-2 rounded border border-slate-800 mt-1">
                {certificate.verifiedHash}
              </div>
            </div>

            {/* Right: SVG QR Code */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="bg-white p-2 rounded-xl border border-slate-700 shadow-md">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                  <rect x="2" y="2" width="8" height="8" rx="1" />
                  <rect x="14" y="2" width="8" height="8" rx="1" />
                  <rect x="2" y="14" width="8" height="8" rx="1" />
                  <path d="M14 14h2v2h-2zM18 14h4v4h-4zM14 18h4v4h-4z" />
                </svg>
              </div>
              <span className="text-[10px] text-slate-400">Scan to Verify Publicly</span>
            </div>
          </div>

          {/* Employer & Student Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            {onNavigateToPortfolio && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onNavigateToPortfolio('shlok-tripathi')}
                icon={<ExternalLink className="w-3.5 h-3.5" />}
              >
                View Student Cyber Portfolio
              </Button>
            )}

            <Button
              variant="secondary"
              size="sm"
              onClick={() => window.print()}
              icon={<Printer className="w-3.5 h-3.5" />}
            >
              Print Verification Record
            </Button>
          </div>

          {/* Mandatory Disclaimer */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[10px] text-slate-400 leading-relaxed">
            <strong>Accreditation Notice:</strong> This Certificate of Completion is issued by CyberShield Security Awareness Platform to confirm practical coursework and lab execution. It represents educational achievement on CyberShield and does not constitute third-party government or ISO vendor accreditation.
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Award, Briefcase, Wrench, DollarSign } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export interface RoleDetail {
  id: string;
  title: string;
  category: string;
  iconName: string;
  shortDesc: string;
  overview: string;
  dayInTheLife: string[];
  essentialTools: string[];
  keyResponsibilities: string[];
  salaryRange: { india: string; global: string };
  topCertifications: string[];
  studentPortfolioProject: string;
}

export const CYBERSECURITY_ROLES_DATA: RoleDetail[] = [
  {
    id: 'appsec',
    title: 'Application Security (AppSec) Engineer',
    category: 'Software & Code Defense',
    iconName: 'Shield',
    shortDesc: 'Audits source code (SAST/DAST), fixes OWASP Top 10 vulnerabilities, and secures API gateways.',
    overview: 'AppSec Engineers bridge the gap between software development and cybersecurity. They inspect source code pull requests for SQL Injection, XSS, and SSRF flaws, design secure input validation schemas, configure Content Security Policies (CSP), and conduct penetration tests on web & mobile applications.',
    dayInTheLife: [
      'Performing automated SAST/DAST scans using Semgrep, SonarQube, and OWASP ZAP in CI/CD pipelines.',
      'Reviewing developer Pull Requests (PRs) to ensure SQL queries use parameterized prepared statements.',
      'Configuring API Gateway rate limiters and WAF rules (Cloudflare / AWS WAF) to block malicious traffic.',
      'Collaborating with backend engineering teams to implement JWT authentication and RBAC controls.'
    ],
    essentialTools: ['Burp Suite Pro', 'Semgrep', 'SonarQube', 'OWASP ZAP', 'Postman', 'Zod / Joi', 'Snyk'],
    keyResponsibilities: [
      'Vulnerability Remediation: Guiding developers on fixing security bugs.',
      'Threat Modeling: Identifying architectural security flaws before code is written.',
      'Secure Code Review: Inspecting backend Node.js, Python, Java, or Go applications.'
    ],
    salaryRange: { india: '₹8 LPA - ₹35 LPA', global: '$90,000 - $160,000 / yr' },
    topCertifications: ['OSWE (OffSec Web Expert)', 'GWAPT', 'eWPTX v2', 'CompTIA Security+'],
    studentPortfolioProject: 'Build a Node.js/React web app containing vulnerable vs parameterized SQL query demos, DOMPurify sanitization, and strict CSP headers.'
  },
  {
    id: 'soc-analyst',
    title: 'SOC Analyst / Incident Responder (Tier 1-3)',
    category: 'Security Operations & Triage',
    iconName: 'Terminal',
    shortDesc: 'Monitors SIEM dashboards, triages alert spikes, investigates brute-force attacks, and isolates compromised hosts.',
    overview: 'SOC (Security Operations Center) Analysts are the first responders in enterprise defense. They monitor continuous log feeds from firewalls, servers, and endpoints using SIEM platforms like Splunk or Microsoft Sentinel. When suspicious activity occurs (e.g. 500 failed login attempts or ransomware execution), they execute incident containment playbooks.',
    dayInTheLife: [
      'Triaging real-time SIEM alerts and correlating log events from firewalls and EDR agents.',
      'Analyzing malicious email headers and phishing attachments in a sandbox environment.',
      'Isolating infected workstations from the corporate network to halt ransomware propagation.',
      'Conducting root-cause investigation and publishing Incident Post-Mortem reports.'
    ],
    essentialTools: ['Splunk Enterprise', 'Microsoft Sentinel', 'CrowdStrike Falcon', 'Wireshark', 'Volatility', 'AbuseIPDB'],
    keyResponsibilities: [
      'Alert Triage: Distinguishing real security incidents from false positives.',
      'Endpoint Detection & Response (EDR): Analyzing process trees and registry modifications.',
      'Incident Response Playbooks: Following structured procedures to contain cyber attacks.'
    ],
    salaryRange: { india: '₹6 LPA - ₹25 LPA', global: '$70,000 - $130,000 / yr' },
    topCertifications: ['CompTIA CySA+', 'BTL1 (Blue Team Level 1)', 'GCIH (GIAC Incident Handler)', 'CEH'],
    studentPortfolioProject: 'Setup a home lab using Security Onion or ELK stack, generate simulated attacks using Kali Linux, and write SIEM detection rules.'
  },
  {
    id: 'pentester',
    title: 'Penetration Tester / Ethical Hacker (Red Team)',
    category: 'Offensive Security & Exploitation',
    iconName: 'Code2',
    shortDesc: 'Simulates real-world cyber attacks, exploits unpatched systems, and delivers executive risk reports.',
    overview: 'Penetration Testers (Red Teamers) are hired by organizations to hack into their systems legally before cybercriminals do. They probe network perimeters, exploit web application flaws, perform Active Directory Kerberoasting, and test physical or social engineering defenses to discover security weaknesses.',
    dayInTheLife: [
      'Conducting OSINT recon and scanning network perimeters using Nmap and RustScan.',
      'Exploiting web application vulnerabilities using Burp Suite and custom Python exploits.',
      'Performing Active Directory domain escalation using BloodHound and Mimikatz.',
      'Authoring comprehensive penetration test reports detailing risk metrics and remediation guidance.'
    ],
    essentialTools: ['Kali Linux', 'Metasploit Framework', 'Nmap', 'BloodHound', 'Cobalt Strike', 'John the Ripper'],
    keyResponsibilities: [
      'Offensive Exploitation: Demonstrating proof-of-concept compromise of target assets.',
      'Active Directory Hacking: PrivEsc across Windows domain environments.',
      'Executive Reporting: Translating technical vulnerabilities into business impact metrics.'
    ],
    salaryRange: { india: '₹8 LPA - ₹30 LPA', global: '$85,000 - $150,000 / yr' },
    topCertifications: ['OSCP (OffSec Certified Professional)', 'PNPT', 'CEH Practical', 'CRTO'],
    studentPortfolioProject: 'Achieve Top 5% ranking on TryHackMe or HackTheBox, and publish detailed machine writeups on Medium/GitHub.'
  },
  {
    id: 'cloud-sec',
    title: 'Cloud Security & DevSecOps Architect',
    category: 'Infrastructure & Cloud Security',
    iconName: 'Cloud',
    shortDesc: 'Automates security scanning in CI/CD pipelines, hardens AWS/Azure infrastructure, and enforces IAM least privilege.',
    overview: 'Cloud Security Architects design and enforce security controls across cloud environments (AWS, GCP, Azure) and containerized infrastructures (Docker, Kubernetes). They embed security automated checks directly into DevOps deployment pipelines so that vulnerabilities are caught before infrastructure code reaches production.',
    dayInTheLife: [
      'Writing Terraform / CloudFormation templates with built-in security compliance rules.',
      'Auditing AWS IAM policies to eliminate overly permissive admin access.',
      'Scanning Docker container images for CVE vulnerabilities using Trivy or Clair.',
      'Configuring Kubernetes RBAC and network policies to isolate microservices.'
    ],
    essentialTools: ['AWS GuardDuty', 'Terraform', 'Trivy', 'Kubernetes', 'HashiCorp Vault', 'Docker', 'Checkov'],
    keyResponsibilities: [
      'DevSecOps Automation: Integrating SAST and container security into GitHub Actions/GitLab CI.',
      'Cloud IAM Hardening: Implementing Zero Trust access controls.',
      'Infrastructure as Code (IaC) Audit: Catching misconfigured S3 buckets and security groups.'
    ],
    salaryRange: { india: '₹12 LPA - ₹40 LPA', global: '$100,000 - $180,000 / yr' },
    topCertifications: ['AWS Certified Security - Specialty', 'CKA / CKS (Kubernetes Security)', 'CCSP'],
    studentPortfolioProject: 'Create a GitHub Actions CI/CD pipeline that builds a Docker image, scans it with Trivy, and deploys it securely to AWS ECS with HTTPS.'
  }
];

interface CybersecurityRolesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoleId?: string;
}

export const CybersecurityRolesModal: React.FC<CybersecurityRolesModalProps> = ({
  isOpen,
  onClose,
  initialRoleId = 'appsec'
}) => {
  const [selectedRoleId, setSelectedRoleId] = useState(initialRoleId);

  if (!isOpen) return null;

  const currentRole = CYBERSECURITY_ROLES_DATA.find(r => r.id === selectedRoleId) || CYBERSECURITY_ROLES_DATA[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-purple-500/40 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Modal Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">What Do Cybersecurity Engineers Actually Do?</h2>
              <p className="text-xs text-slate-400">Complete Career Breakdown, Daily Responsibilities & Skill Tree</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Role Navigation Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CYBERSECURITY_ROLES_DATA.map((role) => {
              const isActive = role.id === selectedRoleId;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRoleId(role.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isActive
                      ? 'bg-purple-500/20 border-purple-500/60 text-white shadow-lg'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] font-mono text-purple-400 uppercase font-semibold">{role.category}</span>
                  <h4 className="text-xs font-bold text-slate-100 mt-1 line-clamp-1">{role.title}</h4>
                </button>
              );
            })}
          </div>

          {/* Active Role Content Header */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div>
                <Badge variant="purple" className="mb-1">{currentRole.category}</Badge>
                <h3 className="text-2xl font-extrabold text-white">{currentRole.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{currentRole.shortDesc}</p>
              </div>

              <div className="flex flex-col items-end shrink-0 bg-purple-950/30 p-3 rounded-xl border border-purple-500/30 text-right">
                <span className="text-[10px] font-mono text-purple-400 uppercase font-bold flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" /> Industry Salary Benchmark
                </span>
                <span className="text-sm font-extrabold text-emerald-400 font-mono mt-0.5">{currentRole.salaryRange.india}</span>
                <span className="text-[10px] font-mono text-slate-400">{currentRole.salaryRange.global}</span>
              </div>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed font-sans bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              {currentRole.overview}
            </p>

            {/* Day in the life */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-purple-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" /> Day-in-the-Life Tasks & Workflow:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentRole.dayInTheLife.map((task, idx) => (
                  <li key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-purple-400 font-bold shrink-0">•</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools & Certifications Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <h5 className="text-xs font-mono text-cyan-400 uppercase font-bold flex items-center gap-1.5">
                  <Wrench className="w-4 h-4" /> Essential Industry Tools:
                </h5>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentRole.essentialTools.map((tool, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-cyan-300">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <h5 className="text-xs font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Top Certifications:
                </h5>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentRole.topCertifications.map((cert, cIdx) => (
                    <span key={cIdx} className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-emerald-300">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Student Portfolio Guide */}
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-1">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Recommended Student Resume Project:
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {currentRole.studentPortfolioProject}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between shrink-0">
          <span className="text-xs font-mono text-slate-400">
            CyberShield Career & Industry Guidance System
          </span>
          <Button variant="accent" size="sm" onClick={onClose}>
            Close Career Guide
          </Button>
        </div>
      </div>
    </div>
  );
};

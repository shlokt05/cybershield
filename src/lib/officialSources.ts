import { OfficialSource } from '../types/careerSkills';

export const OFFICIAL_SOURCES: Record<string, OfficialSource> = {
  owasp: {
    id: 'owasp',
    name: 'OWASP Foundation',
    url: 'https://owasp.org/',
    description: 'Open Worldwide Application Security Project - Global non-profit setting web security standards.',
    category: 'OWASP'
  },
  owasp_top10: {
    id: 'owasp_top10',
    name: 'OWASP Top 10 Standard',
    url: 'https://owasp.org/Top10/',
    description: 'Standard awareness document for developers and web application security.',
    category: 'OWASP'
  },
  nist_csf: {
    id: 'nist_csf',
    name: 'NIST Cybersecurity Framework',
    url: 'https://www.nist.gov/cyberframework',
    description: 'National Institute of Standards and Technology Framework for improving critical infrastructure cybersecurity.',
    category: 'NIST'
  },
  mitre_attack: {
    id: 'mitre_attack',
    name: 'MITRE ATT&CK® Matrix',
    url: 'https://attack.mitre.org/',
    description: 'Globally-accessible knowledge base of adversary tactics, techniques, and procedures (TTPs).',
    category: 'MITRE'
  },
  python_docs: {
    id: 'python_docs',
    name: 'Python Official Documentation',
    url: 'https://docs.python.org/3/',
    description: 'Official standard documentation for Python programming language and security libraries.',
    category: 'Python'
  },
  linux_docs: {
    id: 'linux_docs',
    name: 'Linux Kernel Documentation',
    url: 'https://docs.kernel.org/',
    description: 'Official technical specifications and architecture guide for the Linux operating system.',
    category: 'Linux'
  },
  cisa: {
    id: 'cisa',
    name: 'CISA Cybersecurity Directives',
    url: 'https://www.cisa.gov/',
    description: 'Cybersecurity and Infrastructure Security Agency official operational directives and guidance.',
    category: 'CISA'
  },
  cwe: {
    id: 'cwe',
    name: 'Common Weakness Enumeration (CWE)',
    url: 'https://cwe.mitre.org/',
    description: 'Community-developed dictionary of hardware and software weakness types.',
    category: 'CWE'
  }
};

export function getOfficialSource(id: string): OfficialSource | undefined {
  return OFFICIAL_SOURCES[id];
}

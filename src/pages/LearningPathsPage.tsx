import React from 'react';
import { CAREER_PATHS } from '../lib/mockData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Compass, Award, Shield, Wrench } from 'lucide-react';

interface LearningPathsPageProps {
  onSelectModule: (moduleId: string) => void;
  onNavigateToCertificate: () => void;
}

export const LearningPathsPage: React.FC<LearningPathsPageProps> = ({
  onNavigateToCertificate
}) => {
  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
          <Compass className="w-4 h-4" /> Career Guidance & Learning Roadmap
        </div>
        <h1 className="text-3xl font-extrabold text-white">Real-World Cybersecurity Learning Paths</h1>
        <p className="text-sm text-slate-300 mt-1 max-w-3xl">
          Follow structured career roadmaps designed around actual job roles in the software and security industry. Learn skills, master tools, and earn your CyberShield Certificate.
        </p>
      </div>

      {/* Career Tracks */}
      <div className="space-y-6">
        {CAREER_PATHS.map((path) => (
          <div
            key={path.id}
            className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 hover:border-slate-700 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="cyan">{path.role}</Badge>
                  <Badge variant="purple">{path.difficulty}</Badge>
                  <span className="text-xs font-mono text-slate-400">• {path.estimatedHours}</span>
                </div>
                <h2 className="text-2xl font-bold text-white">{path.title}</h2>
              </div>

              <Button
                variant="primary"
                onClick={onNavigateToCertificate}
                icon={<Award className="w-4 h-4" />}
              >
                Track Certificate Status
              </Button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {path.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Key Skills */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase flex items-center gap-1.5">
                  <Shield className="w-4 h-4" /> Core Job Competencies:
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {path.keySkills.map((skill, i) => (
                    <span key={i} className="text-xs bg-slate-900 text-slate-300 px-2.5 py-1 rounded border border-slate-800 font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Real World Tools */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase flex items-center gap-1.5">
                  <Wrench className="w-4 h-4" /> Tools Used in Production:
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {path.realWorldTools.map((tool, i) => (
                    <span key={i} className="text-xs bg-purple-500/10 text-purple-300 px-2.5 py-1 rounded border border-purple-500/30 font-mono">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl text-xs text-slate-300">
              <strong className="text-cyan-300">Career Overview: </strong> {path.summary}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

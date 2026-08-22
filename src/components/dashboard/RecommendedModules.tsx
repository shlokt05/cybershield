import React from 'react';
import { Sparkles, MailWarning, Lock } from 'lucide-react';
import { Button } from '../ui/Button';

interface RecommendedModulesProps {
  onSelectModule: (moduleId: string) => void;
}

export const RecommendedModules: React.FC<RecommendedModulesProps> = ({ onSelectModule }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
        <Sparkles className="w-4 h-4" /> Next Recommended Action
      </div>
      <h3 className="text-lg font-bold text-slate-100 mb-2">
        Practice Identifying Social Engineering Scams
      </h3>
      <p className="text-xs text-slate-400 leading-relaxed mb-4">
        Boost your CyberShield Score by completing the <strong>Phishing Awareness Simulator</strong> scenarios. Learn to spot domain spoofing and urgency manipulation.
      </p>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="primary"
          size="sm"
          onClick={() => onSelectModule('phishing')}
          icon={<MailWarning className="w-4 h-4" />}
        >
          Launch Phishing Simulator
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onSelectModule('password')}
          icon={<Lock className="w-4 h-4 text-amber-400" />}
        >
          Test Password Security
        </Button>
      </div>
    </div>
  );
};

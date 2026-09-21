import React from 'react';
import { Bot, ShieldCheck, Zap } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-dark-bg border-t border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Bot className="w-4 h-4 text-brand-500" />
          <span className="font-semibold text-slate-400">Intelligent Campus Career Agent</span>
          <span>— Grounded Placement Intelligence</span>
        </div>

        <div className="flex items-center space-x-6 text-slate-400">
          <div className="flex items-center space-x-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Microsoft Foundry Engine</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero Hallucination Fact-Checking</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-600 font-mono">
          © 2026 Campus Placement Cell. Powered by Azure AI.
        </p>
      </div>
    </footer>
  );
};

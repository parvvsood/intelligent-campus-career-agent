import React from 'react';
import { Bot } from 'lucide-react';

export const TypingIndicator = () => {
  return (
    <div className="flex items-start space-x-3 py-4 animate-fade-in">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-600 to-indigo-700 flex items-center justify-center shrink-0 text-white shadow-glow-sm">
        <Bot className="w-4 h-4 animate-spin-slow" />
      </div>
      <div className="bg-dark-surface/90 border border-slate-800 rounded-2xl p-4 space-y-2 max-w-sm">
        <div className="flex items-center space-x-2 text-xs font-semibold text-brand-400">
          <span>CAREER AGENT SEARCHING PLACEMENT DATA</span>
        </div>
        <div className="flex items-center space-x-1.5 py-1">
          <div className="w-2 h-2 rounded-full bg-brand-400 animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 rounded-full bg-brand-400 animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 rounded-full bg-brand-400 animate-bounce" />
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export const PromptSuggestions = ({ onSelectPrompt }) => {
  const suggestions = [
    {
      category: 'Recruiter Discovery',
      query: 'Which companies hire for Data Analyst roles?',
      desc: 'View active campus recruiters, CGPA cutoffs & package ranges',
    },
    {
      category: 'Domain Eligibility',
      query: 'What companies are suitable for AI/ML students?',
      desc: 'Filter AI/ML hiring drives matching your CGPA',
    },
    {
      category: 'Skill Requirements',
      query: 'What skills should I prepare for Data Analyst placements?',
      desc: 'Extract required technical skills from past hiring drives',
    },
    {
      category: 'Study Roadmap',
      query: 'Give me a preparation plan for this role.',
      desc: 'Generate a step-by-step 4-week study sequence',
    },
  ];

  return (
    <div className="space-y-4 max-w-2xl mx-auto py-8 text-center">
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold">
        <Sparkles className="w-3.5 h-3.5 text-brand-400" />
        <span>Microsoft Foundry Career Agent</span>
      </div>

      <h2 className="text-2xl font-bold text-white tracking-tight">How can I guide your career today?</h2>
      <p className="text-slate-400 text-xs max-w-md mx-auto">
        Ask any question about campus recruiting companies, CGPA eligibility, required skills, or custom study plans.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-left">
        {suggestions.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPrompt(item.query)}
            className="p-3.5 rounded-2xl bg-dark-surface/90 hover:bg-dark-card border border-slate-800 hover:border-brand-500/50 transition-all duration-200 group flex flex-col justify-between space-y-2 shadow-sm"
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">{item.category}</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-brand-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <p className="text-xs font-semibold text-white group-hover:text-brand-300 transition-colors">
              "{item.query}"
            </p>
            <p className="text-[11px] text-slate-400">{item.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

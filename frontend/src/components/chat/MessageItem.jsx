import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Bot, User, Copy, Check, RotateCw, Sparkles, Building2, BookOpen, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Badge } from '../common/Badge';

export const MessageItem = ({ message, onRegenerate }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex items-start space-x-3 sm:space-x-4 py-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-700 flex items-center justify-center shrink-0 text-white shadow-glow-sm mt-1">
          <Bot className="w-4 h-4" />
        </div>
      )}

      <div className={`space-y-3 max-w-3xl ${isUser ? 'items-end' : 'items-start'} w-full`}>
        {/* Message Bubble Header */}
        <div className={`flex items-center space-x-2 text-xs text-slate-400 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="font-semibold text-slate-300">
            {isUser ? 'You' : 'Microsoft Foundry Career Agent'}
          </span>
          <span className="text-[10px] text-slate-400">{message.timestamp || 'Just now'}</span>
        </div>

        {/* Message Content Bubble */}
        <div
          className={`rounded-2xl p-4 sm:p-5 text-sm leading-relaxed ${
            isUser
              ? 'bg-brand-600 text-white rounded-tr-none shadow-glow-sm ml-auto max-w-xl'
              : 'bg-dark-surface/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-claude'
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.text}</p>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none space-y-3">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-3 rounded-xl border border-slate-800">
                      <table className="min-w-full divide-y divide-slate-800 text-xs text-left" {...props} />
                    </div>
                  ),
                  th: ({ node, ...props }) => (
                    <th className="bg-dark-bg/80 px-3 py-2 text-slate-300 font-semibold uppercase tracking-wider text-[10px]" {...props} />
                  ),
                  td: ({ node, ...props }) => (
                    <td className="px-3 py-2 text-slate-300 border-t border-slate-800/60" {...props} />
                  ),
                  code: ({ node, inline, ...props }) => (
                    inline ? (
                      <code className="bg-slate-800 text-brand-300 font-mono text-[11px] px-1.5 py-0.5 rounded border border-slate-700" {...props} />
                    ) : (
                      <pre className="bg-dark-bg p-3 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto my-2" {...props} />
                    )
                  ),
                  ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-1 my-2" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal pl-5 space-y-1 my-2" {...props} />,
                  li: ({ node, ...props }) => <li className="text-slate-300" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-bold text-white" {...props} />,
                }}
              >
                {message.text}
              </ReactMarkdown>
            </div>
          )}

          {/* Embedded Structured Companies Cards (If present in API metadata) */}
          {message.companies && message.companies.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Building2 className="w-3.5 h-3.5 text-brand-400" />
                <span>Matched Hiring Companies</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {message.companies.map((c, i) => (
                  <div key={i} className="bg-dark-bg/80 p-2.5 rounded-xl border border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between font-bold text-white">
                      <span>{c.name}</span>
                      <span className="text-brand-300 font-semibold">{c.package}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex justify-between">
                      <span>Role: {c.role}</span>
                      <span>Cutoff: {c.cutoff}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Embedded Study Plan Milestone Cards (If present in API metadata) */}
          {message.studyPlan && message.studyPlan.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>Structured Preparation Roadmap</span>
              </p>
              <div className="space-y-2">
                {message.studyPlan.map((step, i) => (
                  <div key={i} className="bg-dark-bg/80 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between text-emerald-400 font-semibold text-[11px]">
                      <span>{step.phase}</span>
                      <Badge variant="neutral">{step.duration}</Badge>
                    </div>
                    <p className="font-bold text-white">{step.topic}</p>
                    <p className="text-slate-400 text-[11px]">{step.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Message Action Footer (Copy, Regenerate, Fact Tag) */}
        {!isUser && (
          <div className="flex items-center space-x-3 text-xs text-slate-400 pt-1">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 hover:text-slate-200 transition-colors text-[11px]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            {onRegenerate && (
              <button
                onClick={onRegenerate}
                className="flex items-center space-x-1 hover:text-slate-200 transition-colors text-[11px]"
              >
                <RotateCw className="w-3.5 h-3.5 text-brand-400" />
                <span>Regenerate</span>
              </button>
            )}

            <div className="flex items-center space-x-1 text-[10px] text-slate-400 pl-2 border-l border-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Grounded in Placement DB</span>
            </div>
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-slate-300 font-bold text-xs mt-1 border border-slate-700">
          <User className="w-4 h-4 text-slate-400" />
        </div>
      )}
    </div>
  );
};

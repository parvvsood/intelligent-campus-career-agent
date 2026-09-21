import React from 'react';
import { MessageSquare, Plus, Trash2, Bot, Sparkles, Building2, BookOpen } from 'lucide-react';
import { Button } from '../common/Button';

export const ChatSidebar = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  onClearAllSessions,
}) => {
  return (
    <aside className="w-64 bg-dark-surface/90 border-r border-slate-800 flex flex-col justify-between shrink-0 h-full p-4 space-y-4">
      {/* Top Action Header */}
      <div className="space-y-4">
        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={onNewSession}
          className="w-full justify-start text-xs font-semibold shadow-glow-sm"
        >
          New Career Chat
        </Button>

        <div className="space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">
            Conversation History
          </p>
          <div className="space-y-1 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
            {sessions.map((session) => {
              const isActive = session.id === activeSessionId;
              return (
                <button
                  key={session.id}
                  onClick={() => onSelectSession(session.id)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center space-x-2.5 ${
                    isActive
                      ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-brand-400' : 'text-slate-400'}`} />
                  <span className="truncate">{session.title || 'New Conversation'}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Session Management Footer */}
      <div className="pt-4 border-t border-slate-800 space-y-3">
        <div className="p-3 rounded-xl bg-dark-bg/80 border border-slate-800 text-[11px] space-y-1 text-slate-400">
          <div className="flex items-center space-x-1.5 font-bold text-slate-300">
            <Bot className="w-3.5 h-3.5 text-brand-400" />
            <span>Foundry Agent Context</span>
          </div>
          <p>Grounding Engine: Active</p>
          <p>Placement DB: 2024-2026</p>
        </div>

        {sessions.length > 0 && (
          <button
            onClick={onClearAllSessions}
            className="w-full flex items-center justify-center space-x-1.5 text-xs text-slate-400 hover:text-red-400 py-2 rounded-lg hover:bg-red-500/10 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>
    </aside>
  );
};

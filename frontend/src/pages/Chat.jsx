import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Trash2, RotateCw, PanelLeft, Bot, AlertCircle, Lock, LogIn, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { ChatSidebar } from '../components/chat/ChatSidebar';
import { MessageItem } from '../components/chat/MessageItem';
import { PromptSuggestions } from '../components/chat/PromptSuggestions';
import { TypingIndicator } from '../components/chat/TypingIndicator';
import { Button } from '../components/common/Button';
import { sendChatMessage } from '../services/chatService';

export const Chat = ({ studentProfile, onOpenAuth }) => {
  // UNAUTHENTICATED TOKEN PROTECTION GUARD
  if (!studentProfile || !studentProfile.email) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-20 h-20 rounded-3xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center mx-auto text-brand-400 shadow-glow-sm"
        >
          <Lock className="w-10 h-10" />
        </motion.div>

        <div className="space-y-3">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">AI Career Chat Locked</h2>
          <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
            To protect Microsoft Foundry AI tokens from unauthorized usage, you must log in or sign up with your student account before conversing with your AI Career Agent.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button variant="primary" size="lg" icon={LogIn} onClick={() => onOpenAuth && onOpenAuth('login')}>
            Log In to Account
          </Button>
          <Button variant="secondary" size="lg" icon={UserPlus} onClick={() => onOpenAuth && onOpenAuth('signup')}>
            Sign Up (New Student)
          </Button>
        </div>
      </div>
    );
  }
  const storageKey = studentProfile?.email
    ? `campus_career_chat_history_${studentProfile.email}`
    : 'campus_career_chat_history_guest';

  const [sessions, setSessions] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading saved chat history:', e);
    }
    return [
      {
        id: `session-${Date.now()}`,
        title: 'New Career Chat',
        messages: [],
      },
    ];
  });

  const [activeSessionId, setActiveSessionId] = useState(() => {
    return sessions[0]?.id || `session-${Date.now()}`;
  });

  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Persist chat sessions to localStorage on every session state update
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(sessions));
    } catch (e) {
      console.error('Error persisting chat history:', e);
    }
  }, [sessions, storageKey]);

  const chatEndRef = useRef(null);

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];
  const messages = activeSession ? activeSession.messages : [];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (overrideText) => {
    const textToSend = overrideText || inputText;
    if (!textToSend.trim() || loading) return;

    const userMsg = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedSessions = sessions.map((sess) => {
      if (sess.id === activeSessionId) {
        return {
          ...sess,
          title: sess.messages.length === 0 ? textToSend.slice(0, 30) + '...' : sess.title,
          messages: [...sess.messages, userMsg],
        };
      }
      return sess;
    });

    setSessions(updatedSessions);
    setInputText('');
    setLoading(true);

    try {
      // Call Backend API via chatService
      const data = await sendChatMessage(textToSend, activeSessionId, studentProfile);

      const agentMsg = {
        id: `m-${Date.now() + 1}`,
        sender: 'agent',
        text: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        companies: data.metadata?.companies || [],
        studyPlan: data.metadata?.studyPlan || [],
      };

      setSessions((prev) =>
        prev.map((sess) =>
          sess.id === activeSessionId
            ? { ...sess, messages: [...sess.messages, agentMsg] }
            : sess
        )
      );
    } catch (err) {
      console.warn('Backend API connection exception:', err);
      const agentMsg = {
        id: `m-${Date.now() + 1}`,
        sender: 'agent',
        text: `⚠️ **Connection to AI Career Agent Interrupted**

Could not reach the backend career service. Please ensure the backend server is running and try resending your message.

*Error details: ${err.message || 'Network request failed'}*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setSessions((prev) =>
        prev.map((sess) =>
          sess.id === activeSessionId
            ? { ...sess, messages: [...sess.messages, agentMsg] }
            : sess
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNewSession = () => {
    const newId = `session-${Date.now()}`;
    const newSession = {
      id: newId,
      title: 'New Career Chat',
      messages: [],
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newId);
  };

  const handleClearAll = () => {
    const freshId = `session-${Date.now()}`;
    setSessions([{ id: freshId, title: 'New Career Chat', messages: [] }]);
    setActiveSessionId(freshId);
  };

  return (
    <div className="h-[calc(100vh-65px)] flex overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8">
      {/* Sidebar Desktop & Mobile */}
      <div className="hidden md:block shadow-lg">
        <ChatSidebar
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSelectSession={setActiveSessionId}
          onNewSession={handleNewSession}
          onClearAllSessions={handleClearAll}
        />
      </div>

      {/* Main Chat Interface Window */}
      <div className="flex-1 flex flex-col justify-between bg-dark-bg relative overflow-hidden">
        {/* Chat Feed Header Bar */}
        <div className="h-12 border-b border-slate-800/80 px-4 flex items-center justify-between bg-dark-surface/60">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-slate-400 hover:text-white p-1 rounded"
            >
              <PanelLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <Bot className="w-4 h-4 text-brand-400" />
              <span className="text-xs font-bold text-white tracking-wide">
                {activeSession.title || 'Career Chat'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleClearAll}
              className="text-xs text-slate-400 hover:text-red-400 flex items-center space-x-1 px-2 py-1 rounded hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear Chat</span>
            </button>
          </div>
        </div>

        {/* Message Feed Area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-4">
          {messages.length === 0 ? (
            <PromptSuggestions onSelectPrompt={(prompt) => handleSend(prompt)} />
          ) : (
            messages.map((msg) => (
              <MessageItem
                key={msg.id}
                message={msg}
                onRegenerate={msg.sender === 'agent' ? () => handleSend(messages[messages.length - 2]?.text) : undefined}
              />
            ))
          )}

          {loading && <TypingIndicator />}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar Section */}
        <div className="p-4 sm:p-6 bg-dark-surface/80 border-t border-slate-800/90 backdrop-blur-md">
          <div className="max-w-4xl mx-auto space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="relative flex items-center"
            >
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask about companies, CGPA eligibility, required skills, or study plans..."
                rows={1}
                className="w-full bg-dark-bg/90 border border-slate-700/80 rounded-2xl py-3.5 pl-4 pr-14 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all resize-none shadow-claude"
              />
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={!inputText.trim() || loading}
                className="absolute right-2.5 p-2 rounded-xl"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>

            <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
              <span>Press <kbd className="px-1 py-0.5 bg-slate-800 rounded font-mono text-[10px]">Enter</kbd> to send, <kbd className="px-1 py-0.5 bg-slate-800 rounded font-mono text-[10px]">Shift + Enter</kbd> for line break.</span>
              <span className="hidden sm:inline">React → FastAPI → Microsoft Foundry Pipeline</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

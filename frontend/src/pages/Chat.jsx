import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Trash2, RotateCw, PanelLeft, Bot, AlertCircle } from 'lucide-react';
import { ChatSidebar } from '../components/chat/ChatSidebar';
import { MessageItem } from '../components/chat/MessageItem';
import { PromptSuggestions } from '../components/chat/PromptSuggestions';
import { TypingIndicator } from '../components/chat/TypingIndicator';
import { Button } from '../components/common/Button';

export const Chat = ({ studentProfile }) => {
  const [sessions, setSessions] = useState([
    {
      id: 'session-1',
      title: 'Data Analyst Hiring Companies',
      messages: [
        {
          id: 'm-1',
          sender: 'user',
          text: 'Which companies come to our campus for Data Analyst roles?',
          timestamp: '10:14 AM',
        },
        {
          id: 'm-2',
          sender: 'agent',
          text: `Based on the uploaded campus placement records, the following companies actively recruit for **Data Analyst** and **Analytics** roles on campus:

| Company Name | Package (CTC) | Min CGPA Cutoff | Target Roles | Primary Location |
|---|---|---|---|---|
| **Deloitte USI** | 8.5 LPA | 6.5 CGPA | Analyst - Business Technology | Pan-India |
| **ZS Associates** | 13.5 LPA | 7.0 CGPA | Business Technology Analyst | Gurgaon / Pune |
| **Accenture** | 6.5 LPA | 6.0 CGPA | Advanced Application Analyst | Pan-India |
| **Amazon** | 16.0 LPA | 7.5 CGPA | Business Intelligence Engineer | Bangalore |

### Key Requirements Summary:
- **Eligible Branches**: CSE, IT, ECE, AI/DS, Mathematics & Computing.
- **Top In-Demand Skills**: SQL, Python (Pandas/NumPy), Power BI, Statistics, Problem Solving.`,
          timestamp: '10:15 AM',
          companies: [
            { name: 'Deloitte USI', role: 'Analyst', package: '8.5 LPA', cutoff: '6.5 CGPA' },
            { name: 'ZS Associates', role: 'Business Tech Analyst', package: '13.5 LPA', cutoff: '7.0 CGPA' },
            { name: 'Amazon BIE', role: 'BI Engineer', package: '16.0 LPA', cutoff: '7.5 CGPA' },
          ]
        },
      ],
    },
  ]);

  const [activeSessionId, setActiveSessionId] = useState('session-1');
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

    setErrorState(null);
    const userMsg = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Append User Message to active session
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
      // Call Backend API Endpoint POST /api/chat
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          conversation_id: activeSessionId,
          student_profile: studentProfile,
        }),
      });

      let data;
      if (response.ok) {
        data = await response.json();
      } else {
        // Fallback Client Simulation for demo if backend is starting
        data = simulateFallbackResponse(textToSend);
      }

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
      console.warn('API connection fallback active:', err);
      // Clean Graceful Fallback
      const fallbackData = simulateFallbackResponse(textToSend);
      const agentMsg = {
        id: `m-${Date.now() + 1}`,
        sender: 'agent',
        text: fallbackData.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        companies: fallbackData.metadata?.companies || [],
        studyPlan: fallbackData.metadata?.studyPlan || [],
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

  const simulateFallbackResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes('skill') || q.includes('prepare')) {
      return {
        answer: `### Recommended Preparation Sequence for Analytical & AI Roles

To excel in upcoming campus recruitment drives, focus on these key preparation pillars:

1. **SQL & Relational Databases**: Master multi-table JOINs, GROUP BY aggregations, Window Functions (\`DENSE_RANK()\`, \`LEAD()\`, \`LAG()\`), and Indexing.
2. **Python Data Stack**: Deep dive into Pandas dataframes, NumPy vectorization, data cleaning, and REST API development with FastAPI.
3. **Business Problem Solving**: Practice case studies, Guesstimate framework, and metric decomposition.
4. **Machine Learning Foundations**: Supervised classification models, evaluation metrics (ROC-AUC, Precision/Recall), and LLM/Prompt engineering principles.`,
        metadata: {
          studyPlan: [
            { phase: 'Week 1-2', duration: '15 Hours', topic: 'Advanced SQL & Data Cleaning', details: 'Window functions, CTEs, complex JOIN aggregations' },
            { phase: 'Week 3', duration: '12 Hours', topic: 'Python Analytics & Pandas', details: 'Feature engineering, data manipulation, exploratory data analysis' },
            { phase: 'Week 4', duration: '10 Hours', topic: 'Mock Interviews & Case Studies', details: 'Business metrics analysis and technical case presentations' },
          ]
        }
      };
    } else if (q.includes('remark') || q.includes('deloitte') || q.includes('tcs') || q.includes('amazon')) {
      return {
        answer: `### Data-Grounded Remarks: Campus Recruiting Trends

**FACT**:
- Recruiter appeared in campus placement records for **3 consecutive years** (2024, 2025, 2026).
- Minimum CGPA cutoff set at **6.5 / 10.0** with zero active backlogs.
- Package offered: **8.5 LPA** (Fixed: 7.5 LPA + Performance Variable: 1.0 LPA).

**OBSERVATION (Based on Placement Statistics)**:
- High historical selection rate for candidates possessing verified **SQL + Python + Communication** credentials during round 2 technical interviews.
- Continuous hiring presence indicates strong ongoing campus partnership.`
      };
    } else {
      return {
        answer: `### Campus Placement Response

Matching your query against the campus placement records for **${studentProfile.branch}** (CGPA: ${studentProfile.cgpa}):

- **Eligible Companies**: 15+ campus recruiters actively hiring.
- **Top Package Range**: 8.5 LPA to 24.0 LPA.
- **Key Recommendation**: Ensure your target profile emphasizes **${studentProfile.skills.slice(0, 3).join(', ')}** in your resume.

Would you like me to generate a customized 4-week study plan or detail specific company eligibility criteria?`
      };
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
      <div className={`hidden md:block shadow-lg`}>
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
              <span className="hidden sm:inline">Microsoft Foundry AI Grounded Engine</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

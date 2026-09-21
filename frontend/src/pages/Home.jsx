import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  MessageSquare, 
  Building2, 
  GraduationCap, 
  Target, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  Zap,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const Home = ({ setActiveTab }) => {
  const capabilities = [
    {
      icon: Building2,
      title: 'Company Placement Discovery',
      description: 'Explore campus recruiters, historical placement records, CGPA cutoffs, and CTC packages grounded in real placement data.',
      badge: 'Data Grounded',
      color: 'from-blue-500/20 to-indigo-500/20',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400',
    },
    {
      icon: Target,
      title: 'Role-Based Skill Analysis',
      description: 'Compare your academic background and existing technical stack against target industry roles like Data Analyst, AI/ML, and SDE.',
      badge: 'Skill Matrix',
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400',
    },
    {
      icon: BookOpen,
      title: 'Personalized Study Plans',
      description: 'Receive step-by-step preparation roadmaps with recommended study topics, sequencing, and practice areas for placement drives.',
      badge: 'Actionable Plan',
      color: 'from-emerald-500/20 to-teal-500/20',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
    },
    {
      icon: ShieldCheck,
      title: 'Fact-Checked Company Remarks',
      description: 'Get transparent data-backed observations about campus recruiters without hallucinations or fabricated statistics.',
      badge: 'Zero Hallucination',
      color: 'from-amber-500/20 to-orange-500/20',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-400',
    },
  ];

  const quickPrompts = [
    'Which companies hire for Data Analyst roles?',
    'What skills are needed for AI/ML placement drives?',
    'Give me a 4-week study plan for Deloitte & Amazon analyst roles.',
    'What are your remarks about TCS placement trends?',
  ];

  return (
    <div className="space-y-16 py-4 sm:py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-dark-surface via-dark-bg to-dark-bg border border-slate-800/90 p-8 sm:p-12 lg:p-16">
        {/* Background Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-pulse" />
            <span>AI-Powered Campus Recruitment Intelligence</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
          >
            Navigate Your Campus Placements with <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              Data-Grounded AI Intelligence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Converse with your dedicated Microsoft Foundry Career Agent to discover eligible hiring companies, analyze skill requirements, and generate tailored placement preparation plans.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button
              size="lg"
              variant="primary"
              icon={MessageSquare}
              onClick={() => setActiveTab('chat')}
              className="w-full sm:w-auto px-8 py-4 text-base"
            >
              Ask your Career Agent
            </Button>

            <Button
              size="lg"
              variant="secondary"
              icon={Building2}
              onClick={() => setActiveTab('companies')}
              className="w-full sm:w-auto px-8 py-4 text-base"
            >
              Explore Companies
            </Button>
          </motion.div>

          {/* Quick Prompt Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-6 border-t border-slate-800/80 max-w-3xl mx-auto"
          >
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Suggested Placement Inquiries
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab('chat')}
                  className="text-xs bg-dark-card hover:bg-brand-500/10 hover:border-brand-500/40 text-slate-300 hover:text-brand-300 px-3 py-1.5 rounded-xl border border-slate-700/60 transition-all duration-200 flex items-center space-x-1.5 text-left"
                >
                  <Sparkles className="w-3 h-3 text-brand-400 shrink-0" />
                  <span>"{prompt}"</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Built for Smart Placement Preparation
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Everything you need to evaluate eligibility, upgrade targeted skills, and land your ideal campus offer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card hoverEffect glass className="h-full flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.color} border ${item.borderColor}`}>
                        <Icon className={`w-6 h-6 ${item.iconColor}`} />
                      </div>
                      <Badge variant="neutral">{item.badge}</Badge>
                    </div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-800/60">
                    <button
                      onClick={() => setActiveTab('chat')}
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors"
                    >
                      <span>Try with Agent</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Trust & Architecture Banner */}
      <section className="rounded-2xl bg-gradient-to-r from-dark-card to-dark-surface p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Zero Fabricated Statistics Guarantee</span>
          </div>
          <h3 className="text-xl font-bold text-white">Grounded in Authentic Campus Records</h3>
          <p className="text-slate-400 text-xs max-w-xl">
            Our agent analyzes authentic placement data to provide verifiable facts on CTCs, eligibility criteria, and hiring trends without guessing.
          </p>
        </div>
        <Button variant="primary" icon={GraduationCap} onClick={() => setActiveTab('dashboard')}>
          Go to Career Dashboard
        </Button>
      </section>
    </div>
  );
};

import React from 'react';
import { X, Building2, MapPin, DollarSign, Award, CheckCircle2, ShieldCheck, Sparkles, BookOpen, ExternalLink } from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export const CompanyDrawer = ({ company, onClose, onAskAboutCompany }) => {
  if (!company) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-xl bg-dark-surface border-l border-slate-800 h-full overflow-y-auto p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-700 flex items-center justify-center text-white font-bold text-lg shadow-glow-sm">
                {company.name[0]}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{company.name}</h2>
                <p className="text-xs text-brand-400 font-medium">{company.role}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-dark-bg p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">CTC Package</span>
              <span className="text-base font-bold text-emerald-400">{company.package}</span>
            </div>
            <div className="bg-dark-bg p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Min CGPA</span>
              <span className="text-base font-bold text-brand-400">{company.cutoff}</span>
            </div>
            <div className="bg-dark-bg p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Placement Year</span>
              <span className="text-base font-bold text-slate-200">{company.year}</span>
            </div>
          </div>

          {/* Location & Eligibility Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hiring Details</h3>
            <div className="space-y-2 text-xs text-slate-300 bg-dark-bg p-4 rounded-2xl border border-slate-800/80">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Primary Location:</span>
                <span className="font-semibold text-white flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-brand-400" />
                  <span>{company.location}</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Eligible Branches:</span>
                <span className="font-semibold text-white">{company.branches || 'CSE, IT, ECE, AI/ML'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Active Backlogs Allowed:</span>
                <span className="font-semibold text-emerald-400">{company.maxBacklogs ?? 0}</span>
              </div>
            </div>
          </div>

          {/* Required Skills Matrix */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Required Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {company.skills.map((skill, idx) => (
                <span key={idx} className="text-xs bg-brand-500/10 text-brand-300 px-3 py-1 rounded-xl border border-brand-500/30 font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Fact-Checked Grounded Remarks */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>DATA-GROUNDED RECRUITER REMARKS</span>
            </div>

            <div className="bg-dark-bg p-4 rounded-2xl border border-slate-800 space-y-3 text-xs leading-relaxed">
              <div>
                <span className="font-bold text-emerald-400 block mb-1">FACT (PLACEMENT DATABASE):</span>
                <p className="text-slate-300">{company.factRemarks || `Recruiter visited campus in ${company.year} offering ${company.package} for ${company.role} with a CGPA cutoff of ${company.cutoff}.`}</p>
              </div>

              <div>
                <span className="font-bold text-brand-400 block mb-1">DATA OBSERVATION:</span>
                <p className="text-slate-300">{company.observationRemarks || `Historically candidates with strong analytical skills in ${company.skills.slice(0, 2).join(' & ')} achieved top conversion rates.`}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <Button
            variant="primary"
            size="md"
            icon={Sparkles}
            onClick={() => onAskAboutCompany(`What are your remarks about ${company.name}?`)}
            className="w-full text-xs font-semibold"
          >
            Ask Career Agent About {company.name}
          </Button>
        </div>
      </div>
    </div>
  );
};

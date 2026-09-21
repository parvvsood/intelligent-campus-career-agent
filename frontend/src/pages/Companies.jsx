import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Building2, 
  MapPin, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  ArrowUpDown,
  RefreshCw
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { CompanyDrawer } from '../components/company/CompanyDrawer';
import { fetchCompanies } from '../services/companyService';

export const Companies = ({ studentProfile, setActiveTab, onAskAboutCompany }) => {
  const [companiesList, setCompaniesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [minCgpaFilter, setMinCgpaFilter] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const loadCompanies = async () => {
      setLoading(true);
      try {
        const data = await fetchCompanies();
        if (data && data.companies) {
          setCompaniesList(data.companies);
        }
      } catch (err) {
        console.warn('Backend API connection fallback active:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  const locationsList = useMemo(() => {
    const locs = new Set();
    companiesList.forEach((c) => {
      const loc = c.primary_location || c.location;
      if (loc) locs.add(loc.split(',')[0].trim());
    });
    return Array.from(locs);
  }, [companiesList]);

  const filteredCompanies = useMemo(() => {
    return companiesList.filter((comp) => {
      const compName = comp.name || '';
      const compRole = comp.roles ? comp.roles.join(' ') : comp.role || '';
      const compSkills = comp.required_skills || comp.skills || [];
      const compLocation = comp.primary_location || comp.location || '';
      const cutoff = comp.cgpa_cutoff || comp.numericCutoff || 0.0;

      const matchesSearch =
        compName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        compRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        compSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesRole =
        selectedRole === 'All' || compRole.toLowerCase().includes(selectedRole.toLowerCase());

      const matchesLocation =
        selectedLocation === 'All' || compLocation.toLowerCase().includes(selectedLocation.toLowerCase());

      const matchesCgpa =
        minCgpaFilter === 'All' || cutoff <= parseFloat(minCgpaFilter);

      return matchesSearch && matchesRole && matchesLocation && matchesCgpa;
    });
  }, [companiesList, searchQuery, selectedRole, selectedLocation, minCgpaFilter]);

  return (
    <div className="space-y-8 py-4">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/30">
          <Building2 className="w-3.5 h-3.5" />
          <span>CAMPUS PLACEMENT KNOWLEDGE BASE (PDF INGESTED)</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Campus Company Explorer</h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Explore verified campus recruiters from official placement drives. Search by company, domain role, location, or required technical skills.
        </p>
      </div>

      {/* Filter Control Bar */}
      <Card className="space-y-4 bg-dark-surface/90 border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Search company, role, or skill (e.g. SQL, Deloitte, Microsoft)..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div>
            <label className="block text-xs font-semibold tracking-wider text-slate-400 uppercase mb-1.5">
              Target Role Domain
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-dark-bg border border-slate-800 text-slate-200 text-sm rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            >
              <option value="All">All Roles</option>
              <option value="Data Analyst">Data Analyst & Analytics</option>
              <option value="AI">AI / ML Engineer</option>
              <option value="Software">Software Engineer (SDE)</option>
              <option value="Analyst">Analyst & Consulting</option>
              <option value="Devops">DevOps & Cloud</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-wider text-slate-400 uppercase mb-1.5">
              Primary Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-dark-bg border border-slate-800 text-slate-200 text-sm rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            >
              <option value="All">All Locations</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Gurugram">Gurugram / Noida</option>
              <option value="Pune">Pune / Mumbai</option>
              <option value="PAN India">PAN India</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-wider text-slate-400 uppercase mb-1.5">
              Maximum CGPA Cutoff
            </label>
            <select
              value={minCgpaFilter}
              onChange={(e) => setMinCgpaFilter(e.target.value)}
              className="w-full bg-dark-bg border border-slate-800 text-slate-200 text-sm rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            >
              <option value="All">Show All Cutoffs</option>
              <option value="6.5">Below 6.5 CGPA</option>
              <option value="7.0">Below 7.0 CGPA</option>
              <option value="7.5">Below 7.5 CGPA</option>
              <option value="8.0">Below 8.0 CGPA</option>
              <option value="8.5">Below 8.5 CGPA</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
          <span>Showing <strong className="text-white">{filteredCompanies.length}</strong> verified PDF recruiting drives</span>
          {studentProfile && (
            <span>Your Current CGPA: <strong className="text-emerald-400">{studentProfile.cgpa} / 10.0</strong></span>
          )}
        </div>
      </Card>

      {/* Companies Grid */}
      {loading ? (
        <div className="py-12 text-center space-y-3">
          <RefreshCw className="w-6 h-6 text-brand-400 animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Loading placement recruiters dataset...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((comp, idx) => {
            const cutoff = comp.cgpa_cutoff || comp.numericCutoff || 0.0;
            const isEligible = studentProfile ? studentProfile.cgpa >= cutoff : true;
            const rolesText = comp.roles ? comp.roles.join(', ') : comp.role || 'Software Engineer';
            const skillsList = comp.required_skills || comp.skills || [];

            return (
              <Card
                key={comp.id || idx}
                hoverEffect
                onClick={() => setSelectedCompany({
                  ...comp,
                  name: comp.name,
                  role: rolesText,
                  package: comp.package_ctc || comp.package,
                  cutoff: `${cutoff} CGPA`,
                  location: comp.primary_location || comp.location,
                  year: comp.placement_years ? comp.placement_years.join(', ') : comp.year || '2025',
                  skills: skillsList,
                  factRemarks: comp.fact_remarks || comp.factRemarks,
                  observationRemarks: comp.observation_remarks || comp.observationRemarks,
                })}
                className="cursor-pointer space-y-4 flex flex-col justify-between group border-slate-800 hover:border-slate-700"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-indigo-700 flex items-center justify-center font-bold text-white shadow-glow-sm shrink-0">
                        {comp.name[0]}
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="font-bold text-white group-hover:text-brand-300 transition-colors truncate">{comp.name}</h3>
                        <p className="text-xs text-slate-400 truncate">{rolesText}</p>
                      </div>
                    </div>
                    <Badge variant="brand">{comp.package_ctc || comp.package}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-dark-bg/60 p-2.5 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Min Cutoff</span>
                      <span className="font-semibold text-slate-200">{cutoff} CGPA</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Drive Location</span>
                      <span className="font-semibold text-slate-200 truncate">{comp.primary_location || comp.location}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1.5">Target Skills</span>
                    <div className="flex flex-wrap gap-1">
                      {skillsList.slice(0, 4).map((skill, sIdx) => (
                        <span key={sIdx} className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  {isEligible ? (
                    <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Eligible for drive</span>
                    </span>
                  ) : (
                    <span className="text-amber-400 font-semibold flex items-center space-x-1">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Below CGPA cutoff</span>
                    </span>
                  )}

                  <span className="text-brand-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center space-x-1">
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Company Drawer */}
      <CompanyDrawer
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
        onAskAboutCompany={(prompt) => {
          setSelectedCompany(null);
          onAskAboutCompany(prompt);
        }}
      />
    </div>
  );
};

import React, { useState } from 'react';
import { User, GraduationCap, Award, MapPin, Briefcase, Plus, X, Save, CheckCircle2, Lock, LogIn, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Badge } from '../components/common/Badge';

export const Profile = ({ studentProfile, setStudentProfile, setActiveTab, onOpenAuth, onLogout }) => {
  const [formData, setFormData] = useState(studentProfile ? { ...studentProfile } : {});
  const [newSkill, setNewSkill] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // UNAUTHENTICATED GUARD
  if (!studentProfile || !studentProfile.email) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400 shadow-glow-sm"
        >
          <Lock className="w-10 h-10" />
        </motion.div>

        <div className="space-y-3">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Academic Profile Locked</h2>
          <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
            You need to be logged in to view and edit your academic background, roll number, CGPA, and technical skills portfolio.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button variant="primary" size="lg" icon={LogIn} onClick={() => onOpenAuth && onOpenAuth('login')}>
            Log In to Account
          </Button>
          <Button variant="secondary" size="lg" icon={UserPlus} onClick={() => onOpenAuth && onOpenAuth('signup')}>
            Sign Up Now
          </Button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'cgpa' ? parseFloat(value) || value : value,
    }));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStudentProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/30">
          <User className="w-3.5 h-3.5" />
          <span>STUDENT CAREER PROFILE</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Academic Profile</h1>
        <p className="text-slate-400 text-sm max-w-xl">
          Keep your CGPA, technical skills, and target career preferences up to date for personalized AI recommendations.
        </p>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl text-emerald-400 text-sm font-semibold flex items-center space-x-2 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Profile updated successfully! AI Agent context refreshed.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal & Academic Information */}
        <Card className="space-y-6 bg-dark-surface/90 border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <GraduationCap className="w-5 h-5 text-brand-400" />
            <span>Academic Background</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email || ''}
              onChange={handleInputChange}
            />

            <Input
              label="Roll Number"
              name="rollNumber"
              value={formData.rollNumber || ''}
              onChange={handleInputChange}
            />

            <Input
              label="Branch / Department"
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              required
            />

            <Input
              label="Specialization Track"
              name="specialization"
              value={formData.specialization || 'Core CSE'}
              onChange={handleInputChange}
              placeholder="e.g. CSE - AI & Machine Learning"
            />

            <Input
              label="Current CGPA (Out of 10.0)"
              name="cgpa"
              type="number"
              step="0.01"
              min="0"
              max="10"
              value={formData.cgpa}
              onChange={handleInputChange}
              required
            />

            <Input
              label="Graduation Year"
              name="graduationYear"
              type="number"
              value={formData.graduationYear}
              onChange={handleInputChange}
              required
            />
          </div>
        </Card>

        {/* Skill Portfolio Selector */}
        <Card className="space-y-6 bg-dark-surface/90 border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Award className="w-5 h-5 text-purple-400" />
            <span>Technical Skill Portfolio</span>
          </h2>

          <div className="space-y-3">
            <p className="text-xs text-slate-400">
              Add programming languages, frameworks, databases, and analytical tools you are proficient in:
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center space-x-1.5 text-xs bg-brand-500/10 text-brand-300 px-3 py-1.5 rounded-xl border border-brand-500/30 font-medium"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-red-400 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 pt-2 max-w-md">
              <Input
                placeholder="Add new skill (e.g. PyTorch, Docker)..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={handleAddSkill}
                icon={Plus}
                className="shrink-0"
              >
                Add Skill
              </Button>
            </div>
          </div>
        </Card>

        {/* Target Roles & Locations */}
        <Card className="space-y-6 bg-dark-surface/90 border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Briefcase className="w-5 h-5 text-indigo-400" />
            <span>Career Preferences</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold tracking-wider text-slate-400 uppercase mb-1.5">
                Preferred Job Roles (Comma Separated)
              </label>
              <input
                type="text"
                value={formData.preferredRoles.join(', ')}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    preferredRoles: e.target.value.split(',').map((s) => s.trim()),
                  }))
                }
                className="w-full bg-dark-bg/80 border border-slate-800 text-slate-100 text-sm rounded-xl py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wider text-slate-400 uppercase mb-1.5">
                Preferred Locations (Comma Separated)
              </label>
              <input
                type="text"
                value={formData.preferredLocations.join(', ')}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    preferredLocations: e.target.value.split(',').map((s) => s.trim()),
                  }))
                }
                className="w-full bg-dark-bg/80 border border-slate-800 text-slate-100 text-sm rounded-xl py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              />
            </div>
          </div>
        </Card>

        {/* Action Button Footer */}
        <div className="flex items-center justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setActiveTab('dashboard')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            icon={Save}
            className="px-8"
          >
            Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

import React, { useEffect } from 'react';
import { LogOut, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fade-in"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-sm bg-dark-card border border-slate-700/80 rounded-2xl shadow-2xl p-6 space-y-5 text-center overflow-hidden"
        >
          {/* Top Close Button */}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-xl transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Warning Icon Badge */}
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-400 shadow-glow-sm">
            <LogOut className="w-7 h-7" />
          </div>

          {/* Prompt Message Header */}
          <div className="space-y-1.5">
            <h3 className="text-xl font-bold text-white tracking-tight">Confirm Logout</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Are you sure you want to log out of your student account?
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 pt-2">
            {/* NO BUTTON: RED BUTTON WITH WHITE TEXT 'No' */}
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              No
            </button>

            {/* YES BUTTON */}
            <button
              onClick={onConfirm}
              className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              Yes
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

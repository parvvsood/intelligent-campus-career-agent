import React from 'react';

export const Badge = ({
  children,
  variant = 'brand',
  size = 'md',
  className = '',
  icon: Icon,
}) => {
  const variants = {
    brand: 'bg-brand-500/10 text-brand-300 border-brand-500/30',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    info: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    neutral: 'bg-slate-800/60 text-slate-300 border-slate-700/60',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 space-x-1',
    md: 'text-xs px-2.5 py-1 space-x-1.5',
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-lg border ${variants[variant]} ${sizes[size]} ${className}`}>
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      <span>{children}</span>
    </span>
  );
};

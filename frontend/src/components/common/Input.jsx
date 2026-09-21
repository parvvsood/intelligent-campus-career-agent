import React from 'react';

export const Input = ({
  label,
  error,
  icon: Icon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold tracking-wider text-slate-400 uppercase">
          {label}
        </label>
      )}
      <div className="relative rounded-xl shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          className={`w-full bg-dark-bg/80 border text-slate-100 placeholder-slate-500 text-sm rounded-xl py-2.5 ${
            Icon ? 'pl-10' : 'pl-4'
          } pr-4 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all duration-200 ${
            error ? 'border-red-500/80' : 'border-slate-800 hover:border-slate-700'
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-400 pt-0.5">{error}</p>}
    </div>
  );
};

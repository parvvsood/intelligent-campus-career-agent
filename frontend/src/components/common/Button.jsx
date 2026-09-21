import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary: 'bg-brand-600 hover:bg-brand-500 text-white shadow-glow-sm hover:shadow-glow-md active:scale-[0.98]',
    secondary: 'bg-dark-card hover:bg-dark-border text-slate-200 border border-slate-700/60 active:scale-[0.98]',
    outline: 'bg-transparent border border-slate-700 hover:border-brand-500/60 text-slate-300 hover:text-white active:scale-[0.98]',
    ghost: 'bg-transparent hover:bg-slate-800/60 text-slate-400 hover:text-slate-100',
    danger: 'bg-red-600/90 hover:bg-red-500 text-white shadow-sm active:scale-[0.98]',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 space-x-1.5',
    md: 'text-sm px-4 py-2.5 space-x-2',
    lg: 'text-base px-6 py-3.5 space-x-2.5',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      <span>{children}</span>
    </button>
  );
};

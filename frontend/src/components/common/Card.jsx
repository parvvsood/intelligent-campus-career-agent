import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  glass = false,
  glow = false,
  ...props
}) => {
  const baseStyles = 'rounded-2xl p-6 transition-all duration-300 border';
  const bgStyles = glass ? 'glass-panel' : 'bg-dark-surface/90 border-slate-800/80';
  const hoverStyles = hoverEffect ? 'hover:border-slate-700 hover:shadow-lg hover:-translate-y-0.5' : '';
  const glowStyles = glow ? 'shadow-glow-sm hover:shadow-glow-md border-brand-500/30' : '';

  return (
    <div className={`${baseStyles} ${bgStyles} ${hoverStyles} ${glowStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};

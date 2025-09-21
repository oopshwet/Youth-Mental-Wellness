import React, { memo, useMemo } from 'react';

interface AILogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'colorful' | 'monochrome';
  animated?: boolean;
  className?: string;
}

export const AILogo: React.FC<AILogoProps> = memo(({ 
  size = 'md', 
  variant = 'default',
  animated = false,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const getColors = () => {
    switch (variant) {
      case 'colorful':
        return {
          primary: 'var(--color-accent)',
          secondary: 'var(--color-primary)',
          accent: 'var(--color-background)',
          gradient: 'url(#colorfulGradient)'
        };
      case 'monochrome':
        return {
          primary: 'var(--color-foreground)',
          secondary: 'var(--color-muted-foreground)',
          accent: 'var(--color-background)',
          gradient: 'url(#monoGradient)'
        };
      default:
        return {
          primary: 'var(--color-primary)',
          secondary: 'var(--color-accent)',
          accent: 'var(--color-background)',
          gradient: 'url(#defaultGradient)'
        };
    }
  };

  const colors = useMemo(() => getColors(), [variant]);
  const uniqueId = useMemo(() => Math.random().toString(36).substr(2, 9), []);

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          {/* Gradients for different variants */}
          <linearGradient id={`defaultGradient-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="var(--color-primary)" />
          </linearGradient>
          
          <linearGradient id={`colorfulGradient-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-chart-1)" />
            <stop offset="50%" stopColor="var(--color-chart-2)" />
            <stop offset="100%" stopColor="var(--color-chart-3)" />
          </linearGradient>
          
          <linearGradient id={`monoGradient-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-muted-foreground)" />
            <stop offset="100%" stopColor="var(--color-foreground)" />
          </linearGradient>

          {animated && (
            <>
              {/* Glow effect */}
              <filter id={`glow-${uniqueId}`}>
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* Shadow */}
              <filter id={`shadow-${uniqueId}`} x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
              </filter>
            </>
          )}
        </defs>
        
        {/* Outer Ring */}
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="none" 
          stroke={variant === 'colorful' ? `url(#colorfulGradient-${uniqueId})` : variant === 'monochrome' ? `url(#monoGradient-${uniqueId})` : `url(#defaultGradient-${uniqueId})`}
          strokeWidth="2"
          opacity="0.6"
          className={animated ? "animate-spin" : ""}
          style={{ animationDuration: animated ? '8s' : 'none', transformOrigin: '50px 50px' }}
        />
        
        {/* Neural Network Pattern */}
        <g filter={animated ? `url(#shadow-${uniqueId})` : "none"}>
          {/* Central Hexagon */}
          <polygon 
            points="50,20 70,35 70,65 50,80 30,65 30,35" 
            fill={variant === 'colorful' ? `url(#colorfulGradient-${uniqueId})` : variant === 'monochrome' ? `url(#monoGradient-${uniqueId})` : `url(#defaultGradient-${uniqueId})`}
            opacity="0.9"
          />
          
          {/* Inner Core */}
          <circle 
            cx="50" 
            cy="50" 
            r="12" 
            fill={colors.accent}
            filter={animated ? `url(#glow-${uniqueId})` : "none"}
          />
          
          {/* AI Brain Pattern */}
          <circle cx="50" cy="45" r="3" fill={colors.primary} opacity="0.8" />
          <circle cx="45" cy="52" r="2" fill={colors.primary} opacity="0.6" />
          <circle cx="55" cy="52" r="2" fill={colors.primary} opacity="0.6" />
          <circle cx="50" cy="58" r="1.5" fill={colors.primary} opacity="0.4" />
          
          {/* Connection Lines */}
          <line x1="50" y1="45" x2="45" y2="52" stroke={colors.primary} strokeWidth="1" opacity="0.5" />
          <line x1="50" y1="45" x2="55" y2="52" stroke={colors.primary} strokeWidth="1" opacity="0.5" />
          <line x1="45" y1="52" x2="50" y2="58" stroke={colors.primary} strokeWidth="1" opacity="0.3" />
          <line x1="55" y1="52" x2="50" y2="58" stroke={colors.primary} strokeWidth="1" opacity="0.3" />
          
          {/* Outer Nodes */}
          <circle cx="35" cy="35" r="2" fill={colors.secondary} opacity="0.7" />
          <circle cx="65" cy="35" r="2" fill={colors.secondary} opacity="0.7" />
          <circle cx="35" cy="65" r="2" fill={colors.secondary} opacity="0.7" />
          <circle cx="65" cy="65" r="2" fill={colors.secondary} opacity="0.7" />
          
          {/* Connecting Lines to Outer Nodes */}
          <line x1="50" y1="50" x2="35" y2="35" stroke={colors.secondary} strokeWidth="0.5" opacity="0.4" />
          <line x1="50" y1="50" x2="65" y2="35" stroke={colors.secondary} strokeWidth="0.5" opacity="0.4" />
          <line x1="50" y1="50" x2="35" y2="65" stroke={colors.secondary} strokeWidth="0.5" opacity="0.4" />
          <line x1="50" y1="50" x2="65" y2="65" stroke={colors.secondary} strokeWidth="0.5" opacity="0.4" />
        </g>
        
        {/* Floating Particles (if animated) */}
        {animated && (
          <g>
            <circle cx="25" cy="25" r="1" fill={colors.secondary} opacity="0.6">
              <animate attributeName="cy" values="25;75;25" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="75" cy="75" r="1" fill={colors.secondary} opacity="0.6">
              <animate attributeName="cy" values="75;25;75" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="75" cy="25" r="1" fill={colors.secondary} opacity="0.6">
              <animate attributeName="cx" values="75;25;75" dur="5s" repeatCount="indefinite" />
            </circle>
          </g>
        )}
      </svg>
    </div>
  );
});
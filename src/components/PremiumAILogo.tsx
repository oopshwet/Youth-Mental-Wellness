import React from 'react';

interface PremiumAILogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'gold' | 'navy' | 'purple' | 'monochrome';
  animated?: boolean;
  className?: string;
}

export const PremiumAILogo: React.FC<PremiumAILogoProps> = ({ 
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
      case 'gold':
        return {
          primary: '#c9a96e',
          secondary: '#f7e6c8',
          accent: '#0f0f0f',
          gradient: 'url(#goldGradient)'
        };
      case 'navy':
        return {
          primary: '#1e3a8a',
          secondary: '#0a1628',
          accent: '#ffffff',
          gradient: 'url(#navyGradient)'
        };
      case 'purple':
        return {
          primary: '#8b5cf6',
          secondary: '#4c1d95',
          accent: '#ffffff',
          gradient: 'url(#purpleGradient)'
        };
      case 'monochrome':
        return {
          primary: '#0f0f0f',
          secondary: '#6c757d',
          accent: '#ffffff',
          gradient: 'url(#monoGradient)'
        };
      default:
        return {
          primary: '#0f0f0f',
          secondary: '#c9a96e',
          accent: '#ffffff',
          gradient: 'url(#defaultGradient)'
        };
    }
  };

  const colors = getColors();

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          {/* Gradients for different variants */}
          <linearGradient id="defaultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c9a96e" />
            <stop offset="100%" stopColor="#0f0f0f" />
          </linearGradient>
          
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f7e6c8" />
            <stop offset="50%" stopColor="#c9a96e" />
            <stop offset="100%" stopColor="#8b6914" />
          </linearGradient>
          
          <linearGradient id="navyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#0a1628" />
          </linearGradient>
          
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#4c1d95" />
          </linearGradient>
          
          <linearGradient id="monoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6c757d" />
            <stop offset="100%" stopColor="#0f0f0f" />
          </linearGradient>

          {/* Glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Shadow */}
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" floodColor={colors.primary} />
          </filter>
        </defs>
        
        {/* Outer Ring */}
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="none" 
          stroke={colors.gradient}
          strokeWidth="2"
          opacity="0.6"
          className={animated ? "animate-spin" : ""}
          style={{ animationDuration: animated ? '8s' : 'none', transformOrigin: '50px 50px' }}
        />
        
        {/* Neural Network Pattern */}
        <g filter="url(#shadow)">
          {/* Central Hexagon */}
          <polygon 
            points="50,20 70,35 70,65 50,80 30,65 30,35" 
            fill={colors.gradient}
            opacity="0.9"
          />
          
          {/* Inner Core */}
          <circle 
            cx="50" 
            cy="50" 
            r="12" 
            fill={colors.accent}
            filter={animated ? "url(#glow)" : "none"}
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
};
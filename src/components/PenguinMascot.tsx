import React from 'react';

interface PenguinMascotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  expression?: 'happy' | 'calm' | 'encouraging' | 'thoughtful';
  className?: string;
}

export const PenguinMascot: React.FC<PenguinMascotProps> = ({ 
  size = 'md', 
  expression = 'happy',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const getEyeExpression = () => {
    switch (expression) {
      case 'happy': return '• •';
      case 'calm': return '- -';
      case 'encouraging': return '^ ^';
      case 'thoughtful': return '◦ ◦';
      default: return '• •';
    }
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Penguin body - gradient from teal to darker teal */}
        <defs>
          <linearGradient id="penguinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#81e6d9" />
            <stop offset="100%" stopColor="#319795" />
          </linearGradient>
          <linearGradient id="bellyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f7fafc" />
          </linearGradient>
        </defs>
        
        {/* Body */}
        <ellipse cx="50" cy="60" rx="25" ry="30" fill="url(#penguinGradient)" />
        
        {/* Belly */}
        <ellipse cx="50" cy="65" rx="15" ry="20" fill="url(#bellyGradient)" />
        
        {/* Head */}
        <circle cx="50" cy="35" r="20" fill="url(#penguinGradient)" />
        
        {/* Eyes */}
        <circle cx="45" cy="30" r="3" fill="white" />
        <circle cx="55" cy="30" r="3" fill="white" />
        <circle cx="45" cy="30" r="1.5" fill="#2d3748" />
        <circle cx="55" cy="30" r="1.5" fill="#2d3748" />
        
        {/* Beak */}
        <polygon points="50,35 45,40 55,40" fill="#f6ad55" />
        
        {/* Wings */}
        <ellipse cx="35" cy="55" rx="8" ry="15" fill="#2c7a7b" transform="rotate(-20 35 55)" />
        <ellipse cx="65" cy="55" rx="8" ry="15" fill="#2c7a7b" transform="rotate(20 65 55)" />
        
        {/* Feet */}
        <ellipse cx="42" cy="85" rx="4" ry="6" fill="#f6ad55" />
        <ellipse cx="58" cy="85" rx="4" ry="6" fill="#f6ad55" />
        
        {/* Expression-based details */}
        {expression === 'happy' && (
          <path d="M 45 42 Q 50 45 55 42" stroke="#2d3748" strokeWidth="1" fill="none" />
        )}
        {expression === 'encouraging' && (
          <>
            <circle cx="48" cy="25" r="1" fill="#f6e05e" />
            <circle cx="52" cy="25" r="1" fill="#f6e05e" />
          </>
        )}
      </svg>
    </div>
  );
};
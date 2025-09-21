import React from 'react';

interface MeditationLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function MeditationLogo({ size = 'md', className = '' }: MeditationLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        className={`${sizeClasses[size]} drop-shadow-sm`}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Wellness App Logo"
      >
        {/* Lotus petals - outer layer */}
        <path
          d="M24 8C28 8 32 12 32 16C32 20 28 24 24 24C20 24 16 20 16 16C16 12 20 8 24 8Z"
          fill="url(#gradient1)"
          opacity="0.8"
        />
        <path
          d="M35.86 14C37.86 17.46 36.32 21.86 32.86 23.86C29.4 25.86 25 24.32 23 20.86C21 17.4 22.54 13 26 11C29.46 9 33.86 10.54 35.86 14Z"
          fill="url(#gradient2)"
          opacity="0.7"
        />
        <path
          d="M40 24C40 28 36 32 32 32C28 32 24 28 24 24C24 20 28 16 32 16C36 16 40 20 40 24Z"
          fill="url(#gradient3)"
          opacity="0.6"
        />
        <path
          d="M35.86 34C33.86 37.46 29.46 39 26 37C22.54 35 21 30.6 23 27.14C25 23.68 29.4 22.14 32.86 24.14C36.32 26.14 37.86 30.54 35.86 34Z"
          fill="url(#gradient4)"
          opacity="0.7"
        />
        <path
          d="M24 40C20 40 16 36 16 32C16 28 20 24 24 24C28 24 32 28 32 32C32 36 28 40 24 40Z"
          fill="url(#gradient5)"
          opacity="0.8"
        />
        <path
          d="M12.14 34C10.14 30.54 11.68 26.14 15.14 24.14C18.6 22.14 23 23.68 25 27.14C27 30.6 25.46 35 22 37C18.54 39 14.14 37.46 12.14 34Z"
          fill="url(#gradient6)"
          opacity="0.7"
        />
        <path
          d="M8 24C8 20 12 16 16 16C20 16 24 20 24 24C24 28 20 32 16 32C12 32 8 28 8 24Z"
          fill="url(#gradient7)"
          opacity="0.6"
        />
        <path
          d="M12.14 14C14.14 10.54 18.54 9 22 11C25.46 13 27 17.4 25 20.86C23 24.32 18.6 25.86 15.14 23.86C11.68 21.86 10.14 17.46 12.14 14Z"
          fill="url(#gradient8)"
          opacity="0.7"
        />
        
        {/* Center circle - meditation symbol */}
        <circle
          cx="24"
          cy="24"
          r="6"
          fill="url(#centerGradient)"
          className="drop-shadow-sm"
        />
        
        {/* Inner meditation dot */}
        <circle
          cx="24"
          cy="24"
          r="2"
          fill="white"
          opacity="0.9"
        />
        
        <defs>
          <linearGradient id="gradient1" x1="16" y1="8" x2="32" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="gradient2" x1="23" y1="11" x2="35.86" y2="23.86" gradientUnits="userSpaceOnUse">
            <stop stopColor="#06b6d4" />
            <stop offset="1" stopColor="#0ea5e9" />
          </linearGradient>
          <linearGradient id="gradient3" x1="24" y1="16" x2="40" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="gradient4" x1="23" y1="24.14" x2="35.86" y2="37" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10b981" />
            <stop offset="1" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="gradient5" x1="16" y1="24" x2="32" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f59e0b" />
            <stop offset="1" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="gradient6" x1="12.14" y1="24.14" x2="25" y2="37" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ef4444" />
            <stop offset="1" stopColor="#dc2626" />
          </linearGradient>
          <linearGradient id="gradient7" x1="8" y1="16" x2="24" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="gradient8" x1="12.14" y1="11" x2="25" y2="23.86" gradientUnits="userSpaceOnUse">
            <stop stopColor="#06b6d4" />
            <stop offset="1" stopColor="#0ea5e9" />
          </linearGradient>
          <radialGradient id="centerGradient" cx="24" cy="24" r="6" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#1e40af" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
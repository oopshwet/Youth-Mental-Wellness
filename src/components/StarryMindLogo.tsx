import React from 'react';

interface StarryMindLogoProps {
  size?: number;
  className?: string;
}

export function StarryMindLogo({ size = 120, className = "" }: StarryMindLogoProps) {
  return (
    <div 
      className={`relative ${className}`} 
      style={{ width: size, height: size }}
    >
      {/* Starry night background */}
      <div 
        className="absolute inset-0 rounded-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700"
      >
        {/* Simple animated stars */}
        <div className="absolute inset-0">
          {/* Large stars */}
          <div className="absolute w-1 h-1 bg-white rounded-full opacity-90" 
               style={{ top: '15%', left: '25%' }} />
          <div className="absolute w-1 h-1 bg-white rounded-full opacity-80" 
               style={{ top: '25%', left: '75%' }} />
          <div className="absolute w-1 h-1 bg-white rounded-full opacity-70" 
               style={{ top: '35%', left: '45%' }} />
          <div className="absolute w-1 h-1 bg-white rounded-full opacity-90" 
               style={{ top: '20%', left: '60%' }} />
          <div className="absolute w-1 h-1 bg-white rounded-full opacity-85" 
               style={{ top: '30%', left: '20%' }} />
          
          {/* Small stars */}
          <div className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-60" 
               style={{ top: '18%', left: '35%' }} />
          <div className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-50" 
               style={{ top: '28%', left: '65%' }} />
          <div className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-70" 
               style={{ top: '22%', left: '80%' }} />
          <div className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-40" 
               style={{ top: '38%', left: '30%' }} />
        </div>
      </div>
      
      {/* Meditation figure - simplified SVG fallback */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width={size * 0.8}
          height={size * 0.8}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Meditation figure */}
          {/* Body */}
          <ellipse cx="50" cy="65" rx="10" ry="15" fill="#fef3f3" />
          
          {/* Arms in meditation pose */}
          <ellipse cx="40" cy="60" rx="3" ry="8" fill="#fef3f3" transform="rotate(-25 40 60)" />
          <ellipse cx="60" cy="60" rx="3" ry="8" fill="#fef3f3" transform="rotate(25 60 60)" />
          
          {/* Hands */}
          <circle cx="38" cy="65" r="2.5" fill="#fef3f3" />
          <circle cx="62" cy="65" r="2.5" fill="#fef3f3" />
          
          {/* Head */}
          <circle cx="50" cy="45" r="7" fill="#fef3f3" />
          
          {/* Hair flowing upward into stars */}
          <path
            d="M44 38 C42 35, 40 30, 42 25 C44 20, 48 15, 50 10"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M56 38 C58 35, 60 30, 58 25 C56 20, 52 15, 50 10"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M50 38 C50 33, 48 28, 50 23 C51 18, 50 13, 50 8"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          {/* Face features */}
          <circle cx="47" cy="43" r="0.7" fill="#e2e8f0" />
          <circle cx="53" cy="43" r="0.7" fill="#e2e8f0" />
          <path d="M48 48 C49 49, 51 49, 52 48" stroke="#e2e8f0" strokeWidth="1" fill="none" strokeLinecap="round" />
          
          {/* Legs in lotus position */}
          <ellipse cx="45" cy="78" rx="7" ry="4" fill="#fef3f3" transform="rotate(-15 45 78)" />
          <ellipse cx="55" cy="78" rx="7" ry="4" fill="#fef3f3" transform="rotate(15 55 78)" />
        </svg>
      </div>
      
      {/* Subtle glow effect */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm"
      />
    </div>
  );
}
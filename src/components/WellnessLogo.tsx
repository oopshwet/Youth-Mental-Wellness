import React from 'react';

interface WellnessLogoProps {
  size?: number;
  className?: string;
}

export function WellnessLogo({ size = 120, className = "" }: WellnessLogoProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r="58"
          fill="url(#backgroundGradient)"
          stroke="url(#borderGradient)"
          strokeWidth="2"
        />
        
        {/* Stars in the hair/sky area */}
        <circle cx="45" cy="25" r="1.5" fill="#ffffff" opacity="0.9" />
        <circle cx="65" cy="30" r="1" fill="#ffffff" opacity="0.7" />
        <circle cx="75" cy="20" r="1.2" fill="#ffffff" opacity="0.8" />
        <circle cx="35" cy="35" r="0.8" fill="#ffffff" opacity="0.6" />
        <circle cx="80" cy="35" r="1" fill="#ffffff" opacity="0.8" />
        <circle cx="55" cy="18" r="0.6" fill="#ffffff" opacity="0.5" />
        <circle cx="40" cy="15" r="1" fill="#ffffff" opacity="0.7" />
        <circle cx="70" cy="15" r="0.8" fill="#ffffff" opacity="0.6" />
        <circle cx="85" cy="25" r="1.3" fill="#ffffff" opacity="0.9" />
        <circle cx="30" cy="25" r="1.1" fill="#ffffff" opacity="0.8" />
        
        {/* More scattered stars */}
        <circle cx="50" cy="12" r="0.5" fill="#ffffff" opacity="0.4" />
        <circle cx="90" cy="30" r="0.7" fill="#ffffff" opacity="0.6" />
        <circle cx="25" cy="30" r="0.9" fill="#ffffff" opacity="0.7" />
        <circle cx="60" cy="8" r="0.8" fill="#ffffff" opacity="0.5" />
        
        {/* Meditation figure */}
        {/* Body */}
        <ellipse cx="60" cy="75" rx="12" ry="18" fill="#fef3f3" />
        
        {/* Arms in meditation pose */}
        <ellipse cx="48" cy="70" rx="4" ry="10" fill="#fef3f3" transform="rotate(-25 48 70)" />
        <ellipse cx="72" cy="70" rx="4" ry="10" fill="#fef3f3" transform="rotate(25 72 70)" />
        
        {/* Hands */}
        <circle cx="45" cy="75" r="3" fill="#fef3f3" />
        <circle cx="75" cy="75" r="3" fill="#fef3f3" />
        
        {/* Head */}
        <circle cx="60" cy="55" r="8" fill="#fef3f3" />
        
        {/* Hair flowing upward into the night sky */}
        <path
          d="M52 48 C48 45, 45 40, 44 35 C43 30, 45 25, 48 22 C52 18, 58 15, 60 12"
          fill="none"
          stroke="url(#hairGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M68 48 C72 45, 75 40, 76 35 C77 30, 75 25, 72 22 C68 18, 62 15, 60 12"
          fill="none"
          stroke="url(#hairGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M60 47 C60 42, 58 37, 56 32 C55 27, 56 22, 58 18 C59 15, 60 12, 60 8"
          fill="none"
          stroke="url(#hairGradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M55 48 C52 44, 50 38, 49 33 C48 28, 50 23, 52 19 C54 16, 56 13, 58 10"
          fill="none"
          stroke="url(#hairGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M65 48 C68 44, 70 38, 71 33 C72 28, 70 23, 68 19 C66 16, 64 13, 62 10"
          fill="none"
          stroke="url(#hairGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        
        {/* Face features */}
        <circle cx="57" cy="53" r="0.8" fill="#e2e8f0" />
        <circle cx="63" cy="53" r="0.8" fill="#e2e8f0" />
        <path d="M58 58 C59 59, 61 59, 62 58" stroke="#e2e8f0" strokeWidth="1" fill="none" strokeLinecap="round" />
        
        {/* Legs in lotus position */}
        <ellipse cx="55" cy="88" rx="8" ry="5" fill="#fef3f3" transform="rotate(-15 55 88)" />
        <ellipse cx="65" cy="88" rx="8" ry="5" fill="#fef3f3" transform="rotate(15 65 88)" />
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="60%" stopColor="#334155" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
          
          <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          
          <linearGradient id="hairGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#fef3f3" />
            <stop offset="30%" stopColor="#e2e8f0" />
            <stop offset="70%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
import React from 'react';

interface HumanAvatarProps {
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  expression?: 'happy' | 'calm' | 'encouraging' | 'thoughtful' | 'caring' | 'listening';
  className?: string;
  gender?: 'neutral' | 'feminine' | 'masculine';
  mood?: number;
  style?: string;
}

export const HumanAvatar: React.FC<HumanAvatarProps> = ({ 
  size = 'md', 
  expression,
  className = '',
  gender = 'neutral',
  mood = 3,
  style = 'default'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  // Convert mood to expression if expression not provided
  const getExpressionFromMood = (moodValue: number) => {
    switch (moodValue) {
      case 1: return 'thoughtful';
      case 2: return 'calm';
      case 3: return 'calm';
      case 4: return 'encouraging';
      case 5: return 'happy';
      default: return 'calm';
    }
  };

  const currentExpression = expression || getExpressionFromMood(mood);
  
  // Get size style based on size prop
  const getSizeStyle = () => {
    if (typeof size === 'number') {
      return { width: `${size}px`, height: `${size}px` };
    }
    return {};
  };

  const getEyeShape = () => {
    switch (currentExpression) {
      case 'happy': return { left: 'M12,15 Q15,12 18,15', right: 'M22,15 Q25,12 28,15' };
      case 'calm': return { left: 'M12,15 L18,15', right: 'M22,15 L28,15' };
      case 'encouraging': return { left: 'M12,15 Q15,18 18,15', right: 'M22,15 Q25,18 28,15' };
      case 'thoughtful': return { left: 'M12,15 Q15,13 18,15', right: 'M22,15 Q25,13 28,15' };
      case 'caring': return { left: 'M12,15 Q15,12 18,15', right: 'M22,15 Q25,12 28,15' };
      case 'listening': return { left: 'M12,15 Q15,13 18,15', right: 'M22,15 Q25,13 28,15' };
      default: return { left: 'M12,15 Q15,12 18,15', right: 'M22,15 Q25,12 28,15' };
    }
  };

  const getMouthShape = () => {
    switch (currentExpression) {
      case 'happy': return 'M16,25 Q20,28 24,25';
      case 'calm': return 'M18,25 L22,25';
      case 'encouraging': return 'M16,24 Q20,27 24,24';
      case 'thoughtful': return 'M18,25 Q20,26 22,25';
      case 'caring': return 'M16,24 Q20,27 24,24';
      case 'listening': return 'M17,25 Q20,26 23,25';
      default: return 'M16,25 Q20,28 24,25';
    }
  };

  const getHairStyle = () => {
    if (gender === 'feminine') {
      return 'M8,12 Q20,6 32,12 Q30,8 20,6 Q10,8 8,12';
    } else if (gender === 'masculine') {
      return 'M10,12 Q20,8 30,12 Q28,10 20,8 Q12,10 10,12';
    }
    return 'M9,12 Q20,7 31,12 Q29,9 20,7 Q11,9 9,12';
  };

  const eyeShape = getEyeShape();
  const mouthShape = getMouthShape();
  const hairPath = getHairStyle();

  return (
    <div 
      className={`${typeof size === 'string' ? sizeClasses[size] : ''} ${className} relative`}
      style={getSizeStyle()}
    >
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <defs>
          <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef2e8" />
            <stop offset="100%" stopColor="#fde8d0" />
          </linearGradient>
          <linearGradient id="hairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b6f47" />
            <stop offset="100%" stopColor="#6b5639" />
          </linearGradient>
          <filter id="softShadow">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.1)" />
          </filter>
        </defs>
        
        {/* Hair */}
        <path d={hairPath} fill="url(#hairGradient)" filter="url(#softShadow)" />
        
        {/* Face */}
        <ellipse cx="20" cy="20" rx="12" ry="14" fill="url(#skinGradient)" filter="url(#softShadow)" />
        
        {/* Eyes */}
        <path d={eyeShape.left} stroke="#4a5568" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d={eyeShape.right} stroke="#4a5568" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        
        {/* Eye highlights for more life */}
        {(currentExpression === 'happy' || currentExpression === 'encouraging' || currentExpression === 'caring') && (
          <>
            <circle cx="15" cy="14" r="0.5" fill="white" opacity="0.8" />
            <circle cx="25" cy="14" r="0.5" fill="white" opacity="0.8" />
          </>
        )}
        
        {/* Nose */}
        <ellipse cx="20" cy="20" rx="1" ry="1.5" fill="#f4d1ae" opacity="0.6" />
        
        {/* Mouth */}
        <path d={mouthShape} stroke="#4a5568" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        
        {/* Cheeks for happy expressions */}
        {(currentExpression === 'happy' || currentExpression === 'encouraging') && (
          <>
            <circle cx="12" cy="22" r="2" fill="#f687b3" opacity="0.3" />
            <circle cx="28" cy="22" r="2" fill="#f687b3" opacity="0.3" />
          </>
        )}
        
        {/* Expression-specific details */}
        {currentExpression === 'thoughtful' && (
          <path d="M16,18 Q17,17 18,18" stroke="#4a5568" strokeWidth="1" fill="none" />
        )}
        
        {currentExpression === 'listening' && (
          <>
            <circle cx="13" cy="16" r="0.5" fill="#4fd1c7" opacity="0.7" />
            <circle cx="27" cy="16" r="0.5" fill="#4fd1c7" opacity="0.7" />
          </>
        )}
      </svg>
    </div>
  );
};
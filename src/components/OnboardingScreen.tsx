import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { MeditationLogo } from './MeditationLogo';
import { Heart, Shield, Lock, User } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: (data: { nickname: string; challenges: string[]; motivators: string[] }) => void;
}

const challenges = [
  { id: 'anxiety', label: 'Anxiety', icon: '🧠', color: 'bg-muted/50 text-foreground border-border hover:bg-muted' },
  { id: 'sleep', label: 'Sleep', icon: '😴', color: 'bg-muted/50 text-foreground border-border hover:bg-muted' },
  { id: 'motivation', label: 'Motivation', icon: '⚡', color: 'bg-muted/50 text-foreground border-border hover:bg-muted' },
  { id: 'relationships', label: 'Relationships', icon: '💝', color: 'bg-muted/50 text-foreground border-border hover:bg-muted' },
  { id: 'exam-stress', label: 'Exam Stress', icon: '📚', color: 'bg-muted/50 text-foreground border-border hover:bg-muted' },
  { id: 'social-anxiety', label: 'Social Anxiety', icon: '👥', color: 'bg-muted/50 text-foreground border-border hover:bg-muted' }
];

const motivators = [
  { id: 'music', label: 'Music', icon: '🎵', color: 'bg-muted/50 text-foreground border-border hover:bg-muted' },
  { id: 'nature', label: 'Nature', icon: '🌿', color: 'bg-muted/50 text-foreground border-border hover:bg-muted' },
  { id: 'friends', label: 'Friends', icon: '👭', color: 'bg-muted/50 text-foreground border-border hover:bg-muted' },
  { id: 'self-care', label: 'Self-Care', icon: '🛁', color: 'bg-muted/50 text-foreground border-border hover:bg-muted' },
  { id: 'spirituality', label: 'Spirituality', icon: '🕯️', color: 'bg-muted/50 text-foreground border-border hover:bg-muted' },
  { id: 'exercise', label: 'Exercise', icon: '🏃‍♀️', color: 'bg-muted/50 text-foreground border-border hover:bg-muted' }
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [nickname, setNickname] = useState('');
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [selectedMotivators, setSelectedMotivators] = useState<string[]>([]);

  const handleChallengeToggle = (challengeId: string) => {
    setSelectedChallenges(prev =>
      prev.includes(challengeId)
        ? prev.filter(id => id !== challengeId)
        : [...prev, challengeId]
    );
  };

  const handleMotivatorToggle = (motivatorId: string) => {
    setSelectedMotivators(prev =>
      prev.includes(motivatorId)
        ? prev.filter(id => id !== motivatorId)
        : [...prev, motivatorId]
    );
  };

  const handleComplete = () => {
    onComplete({
      nickname,
      challenges: selectedChallenges,
      motivators: selectedMotivators
    });
  };

  if (step === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-lg mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl shadow-lg border border-accent/20">
              <MeditationLogo size="xl" />
            </div>
          </div>
          
          <h1 className="text-3xl font-semibold mb-4 text-foreground">
            Welcome to MindSpace AI
          </h1>
          
          <p className="text-muted-foreground mb-12 leading-relaxed text-lg">
            Your personal AI companion for mental wellness. Get support tailored to your unique journey in a safe, anonymous space.
          </p>
          
          <Button
            onClick={() => setStep(2)}
            className="w-full max-w-sm bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started
          </Button>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <Card className="w-full max-w-lg mx-auto shadow-xl border border-border/20 bg-card/50 backdrop-blur-sm rounded-3xl">
          <CardContent className="p-10 text-center">
            <div className="flex justify-center mb-8">
              <div className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl shadow-lg border border-accent/20">
                <MeditationLogo size="xl" />
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Choose Your Nickname
            </h2>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Pick a name that feels right for your wellness journey. Your privacy is completely protected.
            </p>
            
            <div className="space-y-6">
              <div className="text-left">
                <label className="block font-medium text-foreground mb-3 flex items-center justify-center">
                  <User className="w-5 h-5 mr-3 text-accent" />
                  Your Nickname
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Alex, Sam, River..."
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="text-lg rounded-2xl py-4 px-6 text-center"
                />
              </div>
              
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 rounded-2xl py-3 text-lg"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!nickname.trim()}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Continue
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen p-6 pt-12 bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-wellness-success/10 to-wellness-success/5 rounded-2xl shadow-lg border border-wellness-success/20">
                <MeditationLogo size="lg" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              What areas would you like to focus on?
            </h2>
            <p className="text-muted-foreground text-lg">Select any that resonate with your current needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {challenges.map((challenge) => (
              <Card
                key={challenge.id}
                className={`cursor-pointer transition-all duration-300 border-2 ${
                  selectedChallenges.includes(challenge.id)
                    ? 'ring-2 ring-accent bg-accent/10 shadow-xl scale-105 border-accent'
                    : 'hover:shadow-lg border-border hover:border-accent/50 bg-card/50'
                } rounded-2xl ${challenge.color}`}
                onClick={() => handleChallengeToggle(challenge.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">{challenge.icon}</div>
                  <p className="font-semibold text-lg">{challenge.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => setStep(2)}
              className="flex-1 rounded-2xl py-3 text-lg"
            >
              Back
            </Button>
            <Button
              onClick={() => setStep(4)}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 pt-12 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-wellness-calm/10 rounded-2xl shadow-lg border border-wellness-calm/20">
              <MeditationLogo size="lg" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            What inspires and motivates you?
          </h2>
          <p className="text-muted-foreground text-lg">Help us personalize your wellness experience</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {motivators.map((motivator) => (
            <Card
              key={motivator.id}
              className={`cursor-pointer transition-all duration-300 border-2 ${
                selectedMotivators.includes(motivator.id)
                  ? 'ring-2 ring-accent bg-accent/10 shadow-xl scale-105 border-accent'
                  : 'hover:shadow-lg border-border hover:border-accent/50 bg-card/50'
              } rounded-2xl ${motivator.color}`}
              onClick={() => handleMotivatorToggle(motivator.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">{motivator.icon}</div>
                <p className="font-semibold text-lg">{motivator.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={() => setStep(3)}
            className="flex-1 rounded-2xl py-3 text-lg"
          >
            Back
          </Button>
          <Button
            onClick={handleComplete}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={selectedMotivators.length === 0}
          >
            Complete Setup
          </Button>
        </div>
      </div>
    </div>
  );
};
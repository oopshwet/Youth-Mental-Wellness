import React, { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Toaster } from './components/ui/sonner';
import { OnboardingScreen } from './components/OnboardingScreen';
import { DailyCheckInScreen } from './components/DailyCheckInScreen';
import { HomeScreen } from './components/HomeScreen';
import { ChatScreen } from './components/ChatScreen';
import { WellnessRoadmapScreen } from './components/WellnessRoadmapScreen';
import { GamificationScreen } from './components/GamificationScreen';
import { JournalingScreen } from './components/JournalingScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SOSScreen } from './components/SOSScreen';

export type Screen = 'onboarding' | 'dailyCheckIn' | 'home' | 'chat' | 'roadmap' | 'gamification' | 'journal' | 'profile' | 'sos';

export interface DailyTask {
  id: string;
  title: string;
  description: string;
  points: number;
  category: 'mindfulness' | 'physical' | 'social' | 'creative' | 'learning';
  completed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: 'streak' | 'points' | 'milestone' | 'special';
}

export interface Gift {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: 'avatar' | 'theme' | 'quote' | 'music';
  unlocked: boolean;
}

export interface UserData {
  nickname: string;
  challenges: string[];
  motivators: string[];
  currentMood: number;
  lastCheckIn: string;
  totalPoints: number;
  streaks: {
    journaling: number;
    meditation: number;
    checkIn: number;
  };
  badges: Badge[];
  gifts: Gift[];
  dailyTasks: DailyTask[];
  completedTasks: string[];
  journalEntries: Array<{
    id: string;
    date: string;
    prompt: string;
    content: string;
    tasksCompleted: number;
    pointsEarned: number;
  }>;
  avatar: {
    style: string;
    accessories: string[];
    mood: number;
  };
}

const defaultUserData: UserData = {
  nickname: '',
  challenges: [],
  motivators: [],
  currentMood: 3,
  lastCheckIn: '',
  totalPoints: 0,
  streaks: { journaling: 0, meditation: 0, checkIn: 0 },
  badges: [],
  gifts: [],
  dailyTasks: [],
  completedTasks: [],
  journalEntries: [],
  avatar: {
    style: 'default',
    accessories: [],
    mood: 3
  }
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const handleScreenChange = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleUserDataUpdate = (updates: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...updates }));
  };

  const renderScreen = () => {
    if (!hasCompletedOnboarding) {
      return (
        <OnboardingScreen
          onComplete={(data) => {
            handleUserDataUpdate(data);
            setHasCompletedOnboarding(true);
            handleScreenChange('dailyCheckIn');
          }}
        />
      );
    }

    switch (currentScreen) {
      case 'dailyCheckIn':
        return (
          <DailyCheckInScreen
            userData={userData}
            onNavigate={handleScreenChange}
            onUpdateUserData={handleUserDataUpdate}
          />
        );
      case 'home':
        return (
          <HomeScreen
            userData={userData}
            onNavigate={handleScreenChange}
            onUpdateUserData={handleUserDataUpdate}
          />
        );
      case 'chat':
        return (
          <ChatScreen
            userData={userData}
            onNavigate={handleScreenChange}
          />
        );
      case 'roadmap':
        return (
          <WellnessRoadmapScreen
            userData={userData}
            onNavigate={handleScreenChange}
            onUpdateUserData={handleUserDataUpdate}
          />
        );
      case 'gamification':
        return (
          <GamificationScreen
            userData={userData}
            onNavigate={handleScreenChange}
          />
        );
      case 'journal':
        return (
          <JournalingScreen
            userData={userData}
            onNavigate={handleScreenChange}
            onUpdateUserData={handleUserDataUpdate}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            userData={userData}
            onNavigate={handleScreenChange}
            onUpdateUserData={handleUserDataUpdate}
          />
        );
      case 'sos':
        return (
          <SOSScreen
            userData={userData}
            onNavigate={handleScreenChange}
          />
        );
      default:
        return (
          <HomeScreen
            userData={userData}
            onNavigate={handleScreenChange}
            onUpdateUserData={handleUserDataUpdate}
          />
        );
    }
  };

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          {renderScreen()}
        </div>
        <Toaster />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
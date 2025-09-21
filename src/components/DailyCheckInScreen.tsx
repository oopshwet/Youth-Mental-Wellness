import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Heart, Sun, Moon, Cloud, CloudRain, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { UserData, DailyTask, Screen } from '../App';
import { HumanAvatar } from './HumanAvatar';
import { MeditationLogo } from './MeditationLogo';

interface DailyCheckInScreenProps {
  userData: UserData;
  onNavigate: (screen: Screen) => void;
  onUpdateUserData: (updates: Partial<UserData>) => void;
}

const moodOptions = [
  { value: 1, emoji: '😢', label: 'Very Low', color: 'text-red-500', icon: CloudRain },
  { value: 2, emoji: '😕', label: 'Low', color: 'text-orange-500', icon: Cloud },
  { value: 3, emoji: '😐', label: 'Neutral', color: 'text-yellow-500', icon: Sun },
  { value: 4, emoji: '🙂', label: 'Good', color: 'text-green-500', icon: Sun },
  { value: 5, emoji: '😄', label: 'Excellent', color: 'text-blue-500', icon: Zap }
];

const generateDailyTasks = (): DailyTask[] => {
  const taskPool = [
    { title: '5-Minute Meditation', description: 'Practice mindfulness meditation', points: 10, category: 'mindfulness' as const, difficulty: 'easy' as const },
    { title: 'Gratitude List', description: 'Write down 3 things you\'re grateful for', points: 15, category: 'mindfulness' as const, difficulty: 'easy' as const },
    { title: 'Take a Walk', description: 'Go for a 15-minute walk outside', points: 20, category: 'physical' as const, difficulty: 'medium' as const },
    { title: 'Connect with a Friend', description: 'Send a message to someone you care about', points: 25, category: 'social' as const, difficulty: 'medium' as const },
    { title: 'Creative Expression', description: 'Draw, write, or create something for 10 minutes', points: 30, category: 'creative' as const, difficulty: 'hard' as const },
    { title: 'Learn Something New', description: 'Spend 20 minutes learning about a topic you\'re curious about', points: 35, category: 'learning' as const, difficulty: 'hard' as const },
    { title: 'Deep Breathing', description: 'Practice 4-7-8 breathing technique for 5 minutes', points: 12, category: 'mindfulness' as const, difficulty: 'easy' as const },
    { title: 'Stretch or Yoga', description: 'Do gentle stretches or yoga poses', points: 18, category: 'physical' as const, difficulty: 'easy' as const },
  ];

  // Select 3-4 random tasks
  const shuffled = taskPool.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3 + Math.floor(Math.random() * 2)).map(task => ({
    ...task,
    id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    completed: false
  }));
};

export function DailyCheckInScreen({ userData, onNavigate, onUpdateUserData }: DailyCheckInScreenProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [reflection, setReflection] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleSubmit = async () => {
    if (selectedMood === null) return;
    
    setIsSubmitting(true);
    
    // Generate daily tasks
    const dailyTasks = generateDailyTasks();
    
    // Create journal entry if reflection is provided
    let newJournalEntry = null;
    if (reflection.trim()) {
      newJournalEntry = {
        id: `entry-${Date.now()}`,
        date: new Date().toISOString(),
        prompt: "Daily Check-in Reflection",
        content: reflection,
        tasksCompleted: 0,
        pointsEarned: 5
      };
    }

    const updates: Partial<UserData> = {
      currentMood: selectedMood,
      dailyTasks,
      completedTasks: [],
      totalPoints: userData.totalPoints + (reflection.trim() ? 5 : 0),
      avatar: {
        ...userData.avatar,
        mood: selectedMood
      },
      streaks: {
        ...userData.streaks,
        checkIn: userData.streaks.checkIn + 1
      }
    };

    if (newJournalEntry) {
      updates.journalEntries = [...(userData.journalEntries || []), newJournalEntry];
    }

    onUpdateUserData(updates);
    
    setTimeout(() => {
      onNavigate('home');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 pt-8"
        >
          <div className="flex justify-center mb-4">
            <MeditationLogo size="md" />
          </div>
          <div className="flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6 text-wellness-primary mr-2" />
            <h1>Daily Check-in</h1>
          </div>
          <p className="text-muted-foreground">{today}</p>
          
          <div className="mt-6">
            <HumanAvatar 
              size={80} 
              mood={selectedMood || userData.currentMood} 
              style={userData.avatar?.style || 'default'}
            />
          </div>
        </motion.div>

        <Card className="p-6 mb-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <Heart className="w-5 h-5 text-wellness-primary mr-2" />
              <h3>How are you feeling today?</h3>
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {moodOptions.map((mood) => {
                const IconComponent = mood.icon;
                return (
                  <motion.button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-xl text-center transition-all ${
                      selectedMood === mood.value
                        ? 'bg-wellness-primary text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <IconComponent className="w-5 h-5" />
                      <span className="text-xs">{mood.label}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="reflection" className="block mb-2">
              What's on your mind? (Optional)
            </label>
            <Textarea
              id="reflection"
              placeholder="Share your thoughts, feelings, or anything you'd like to reflect on..."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              className="min-h-[100px] bg-input-background"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={selectedMood === null || isSubmitting}
            className="w-full wellness-gradient-primary text-white"
            size="lg"
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
              />
            ) : null}
            {isSubmitting ? 'Setting up your day...' : 'Start My Day'}
          </Button>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground">
            ✨ Your daily wellness tasks and personalized content are being prepared
          </p>
        </motion.div>
      </div>
    </div>
  );
}
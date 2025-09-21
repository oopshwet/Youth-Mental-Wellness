import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { HumanAvatar } from './HumanAvatar';
import { MeditationLogo } from './MeditationLogo';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  BookOpen, 
  Save, 
  Calendar, 
  Heart, 
  Star, 
  Lightbulb, 
  Sunrise,
  CheckCircle2,
  Coins,
  Trophy,
  Target,
  Zap,
  Gift
} from 'lucide-react';
import { UserData, Screen, DailyTask, Badge as BadgeType } from '../App';

interface JournalingScreenProps {
  userData: UserData;
  onNavigate: (screen: Screen) => void;
  onUpdateUserData: (updates: Partial<UserData>) => void;
}

interface JournalPrompt {
  id: string;
  title: string;
  prompt: string;
  category: 'gratitude' | 'reflection' | 'goals' | 'emotions' | 'growth';
  icon: string;
  color: string;
}

const journalPrompts: JournalPrompt[] = [
  {
    id: 'gratitude-three',
    title: 'Three Good Things',
    prompt: 'What are three things that went well today? Why do you think they went well?',
    category: 'gratitude',
    icon: '🙏',
    color: 'bg-yellow-50 text-yellow-700 border-yellow-200'
  },
  {
    id: 'feeling-check',
    title: 'Emotional Check-in',
    prompt: 'How are you feeling right now? What emotions are present, and what might be causing them?',
    category: 'emotions',
    icon: '💝',
    color: 'bg-pink-50 text-pink-700 border-pink-200'
  },
  {
    id: 'proud-moment',
    title: 'Proud Moment',
    prompt: 'What is something you did today that you\'re proud of, no matter how small?',
    category: 'reflection',
    icon: '⭐',
    color: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  {
    id: 'tomorrow-intention',
    title: 'Tomorrow\'s Intention',
    prompt: 'What is one intention you want to set for tomorrow? How will you make it happen?',
    category: 'goals',
    icon: '🌅',
    color: 'bg-orange-50 text-orange-700 border-orange-200'
  },
  {
    id: 'kindness-received',
    title: 'Kindness Received',
    prompt: 'When did someone show you kindness recently? How did it make you feel?',
    category: 'gratitude',
    icon: '💖',
    color: 'bg-rose-50 text-rose-700 border-rose-200'
  },
  {
    id: 'learning-growth',
    title: 'Learning & Growth',
    prompt: 'What did you learn about yourself today? How are you growing as a person?',
    category: 'growth',
    icon: '🌱',
    color: 'bg-green-50 text-green-700 border-green-200'
  },
  {
    id: 'stress-relief',
    title: 'Stress Release',
    prompt: 'What has been weighing on your mind? Write it all out - sometimes putting worries on paper helps lighten the load.',
    category: 'emotions',
    icon: '🌊',
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: 'future-self',
    title: 'Letter to Future Self',
    prompt: 'What would you want to tell yourself one year from now? What hopes and dreams do you have?',
    category: 'goals',
    icon: '💌',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  }
];

const getBadgeForPoints = (totalPoints: number, existingBadges: BadgeType[]): BadgeType | null => {
  if (totalPoints >= 1000 && !hasEarnedBadge('champion', existingBadges)) {
    return {
      id: 'champion',
      name: 'Wellness Champion',
      description: 'Earned 1000 total points!',
      icon: '🏆',
      unlockedAt: new Date().toISOString(),
      category: 'points'
    };
  } else if (totalPoints >= 500 && !hasEarnedBadge('achiever', existingBadges)) {
    return {
      id: 'achiever',
      name: 'Super Achiever',
      description: 'Earned 500 total points!',
      icon: '⭐',
      unlockedAt: new Date().toISOString(),
      category: 'points'
    };
  } else if (totalPoints >= 100 && !hasEarnedBadge('starter', existingBadges)) {
    return {
      id: 'starter',
      name: 'Getting Started',
      description: 'Earned your first 100 points!',
      icon: '🌟',
      unlockedAt: new Date().toISOString(),
      category: 'points'
    };
  }
  return null;
};

const hasEarnedBadge = (badgeId: string, badges: BadgeType[]): boolean => {
  return badges.some(badge => badge.id === badgeId);
};

export const JournalingScreen: React.FC<JournalingScreenProps> = ({ 
  userData, 
  onNavigate, 
  onUpdateUserData 
}) => {
  const [selectedPrompt, setSelectedPrompt] = useState<JournalPrompt | null>(null);
  const [journalText, setJournalText] = useState('');
  const [showPrompts, setShowPrompts] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'journal' | 'tasks'>('tasks');

  const handleTaskToggle = (taskId: string) => {
    const task = userData.dailyTasks.find(t => t.id === taskId);
    if (!task) return;

    const isCompleting = !userData.completedTasks.includes(taskId);
    const newCompletedTasks = isCompleting 
      ? [...userData.completedTasks, taskId]
      : userData.completedTasks.filter(id => id !== taskId);

    const pointsChange = isCompleting ? task.points : -task.points;
    const newTotalPoints = userData.totalPoints + pointsChange;

    // Check for new badges
    const newBadge = isCompleting ? getBadgeForPoints(newTotalPoints, userData.badges) : null;
    const updatedBadges = newBadge ? [...userData.badges, newBadge] : userData.badges;

    // Show toast notifications
    if (isCompleting) {
      toast.success(`✨ Great job! +${task.points} points`, {
        description: `You completed: ${task.title}`,
        duration: 3000,
      });
      
      if (newBadge) {
        setTimeout(() => {
          toast.success(`🏆 New Badge Unlocked!`, {
            description: `${newBadge.icon} ${newBadge.name} - ${newBadge.description}`,
            duration: 4000,
          });
        }, 500);
      }
    } else {
      toast.info(`Task marked as incomplete`, {
        description: `${task.title} removed from completed tasks`,
        duration: 2000,
      });
    }

    onUpdateUserData({
      completedTasks: newCompletedTasks,
      totalPoints: newTotalPoints,
      badges: updatedBadges
    });
  };

  const handleSaveEntry = () => {
    if (!journalText.trim()) return;

    const completedTasksCount = userData.completedTasks.length;
    const journalPoints = 20 + (completedTasksCount * 5); // Base 20 points + 5 per completed task

    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      prompt: selectedPrompt ? selectedPrompt.prompt : 'Free writing',
      content: journalText.trim(),
      tasksCompleted: completedTasksCount,
      pointsEarned: journalPoints
    };

    const newTotalPoints = userData.totalPoints + journalPoints;
    const updatedEntries = [...userData.journalEntries, newEntry];
    
    // Check for new badges
    const newBadge = getBadgeForPoints(newTotalPoints, userData.badges);
    const updatedBadges = newBadge ? [...userData.badges, newBadge] : userData.badges;

    // Show success toast
    toast.success(`📝 Journal entry saved! +${journalPoints} points`, {
      description: `Great work on reflecting and sharing your thoughts!`,
      duration: 3000,
    });

    if (newBadge) {
      setTimeout(() => {
        toast.success(`🏆 New Badge Unlocked!`, {
          description: `${newBadge.icon} ${newBadge.name} - ${newBadge.description}`,
          duration: 4000,
        });
      }, 500);
    }

    onUpdateUserData({ 
      journalEntries: updatedEntries,
      totalPoints: newTotalPoints,
      badges: updatedBadges,
      streaks: { ...userData.streaks, journaling: userData.streaks.journaling + 1 }
    });

    setJournalText('');
    setSelectedPrompt(null);
    setShowPrompts(true);
    setSelectedTab('tasks'); // Return to tasks view after saving
  };

  const handlePromptSelect = (prompt: JournalPrompt) => {
    setSelectedPrompt(prompt);
    setShowPrompts(false);
  };

  const handleFreeWriting = () => {
    setSelectedPrompt(null);
    setShowPrompts(false);
    setSelectedTab('journal');
  };

  const renderTasksTab = () => {
    const completedCount = userData.completedTasks?.length || 0;
    const totalTasks = userData.dailyTasks?.length || 0;
    const completionPercentage = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

    return (
      <div className="space-y-6">
        {/* Progress Overview */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-md rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3>Daily Progress</h3>
              <Badge variant="secondary" className="bg-wellness-primary/10 text-wellness-primary">
                {completedCount}/{totalTasks} Complete
              </Badge>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-wellness-primary to-wellness-secondary h-3 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Coins className="w-4 h-4 text-wellness-warning" />
                <span className="text-sm">Points today: {userData.dailyTasks.filter(task => userData.completedTasks.includes(task.id)).reduce((sum, task) => sum + task.points, 0)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-wellness-accent" />
                <span className="text-sm">Total: {userData.totalPoints}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Tasks */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-md rounded-3xl">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="flex items-center space-x-3">
              <Target className="w-6 h-6 text-wellness-primary" />
              <span>Today's Wellness Tasks</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-4">
            {userData.dailyTasks?.length > 0 ? (
              userData.dailyTasks.map((task) => {
                const isCompleted = userData.completedTasks.includes(task.id);
                const categoryColors = {
                  mindfulness: 'bg-purple-50 text-purple-700 border-purple-200',
                  physical: 'bg-green-50 text-green-700 border-green-200',
                  social: 'bg-blue-50 text-blue-700 border-blue-200',
                  creative: 'bg-orange-50 text-orange-700 border-orange-200',
                  learning: 'bg-teal-50 text-teal-700 border-teal-200'
                };

                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      isCompleted 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        checked={isCompleted}
                        onCheckedChange={() => handleTaskToggle(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className={isCompleted ? 'line-through text-green-700' : ''}>{task.title}</h4>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${categoryColors[task.category]}`}
                          >
                            {task.category}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            +{task.points} pts
                          </Badge>
                        </div>
                        <p className={`text-sm text-muted-foreground ${isCompleted ? 'line-through' : ''}`}>
                          {task.description}
                        </p>
                      </div>
                      {isCompleted && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <Target className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Complete your daily check-in to get personalized tasks!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Rewards Section */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Gift className="w-6 h-6 text-purple-600" />
              <h3>Rewards & Motivation</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl mb-2">🏆</div>
                <p className="font-medium">{userData.badges?.length || 0} Badges</p>
                <p className="text-sm text-muted-foreground">Earned</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🔥</div>
                <p className="font-medium">{userData.streaks.journaling}</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
            </div>
            <Button
              onClick={() => setSelectedTab('journal')}
              className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Journal & Earn More Points
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  };

  if (!showPrompts) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50/80 via-blue-50/60 to-purple-50/80">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
          <div className="flex items-center space-x-4 p-6">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowPrompts(true)}
              className="rounded-xl"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <MeditationLogo size="sm" />
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-gray-800">
                {selectedPrompt ? selectedPrompt.title : 'Free Writing'}
              </h1>
              <p className="text-gray-600">Let your thoughts flow freely</p>
            </div>
            <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl">
              <HumanAvatar size="md" expression="thoughtful" />
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Prompt Display */}
          {selectedPrompt && (
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-md rounded-3xl">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{selectedPrompt.icon}</div>
                  <div>
                    <p className="text-gray-700 leading-relaxed text-lg">{selectedPrompt.prompt}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Writing Area */}
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-md rounded-3xl">
            <CardContent className="p-8">
              <Textarea
                placeholder="Start writing your thoughts here... There's no right or wrong way to journal. Just let your mind wander and write whatever feels natural to you."
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                className="min-h-[400px] border-none resize-none focus:ring-0 text-lg leading-relaxed bg-transparent"
                style={{ boxShadow: 'none' }}
              />
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowPrompts(true)}
              className="rounded-2xl px-6 py-3 border-2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEntry}
              disabled={!journalText.trim()}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-2xl px-8 py-3 shadow-lg"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Entry
            </Button>
          </div>

          {/* Encouragement */}
          <Card className="shadow-xl border-0 bg-gradient-to-r from-teal-50 to-blue-50 rounded-3xl">
            <CardContent className="p-6 text-center">
              <div className="p-2 bg-white rounded-2xl inline-block mb-4">
                <HumanAvatar size="sm" expression="encouraging" />
              </div>
              <p className="text-gray-700 leading-relaxed">
                Remember, there's no perfect way to journal. Just be honest with yourself. 💙
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/80 via-blue-50/60 to-purple-50/80">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="flex items-center space-x-4 p-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate('home')}
            className="rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <MeditationLogo size="sm" />
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-800">
              {selectedTab === 'tasks' ? 'Daily Tasks' : 'Journal'}
            </h1>
            <p className="text-gray-600">
              {selectedTab === 'tasks' 
                ? 'Complete tasks to earn points and badges' 
                : 'Your private space for reflection'
              }
            </p>
          </div>
          <div className="p-2 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl">
            <HumanAvatar size="md" expression="calm" mood={userData.currentMood} />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pb-4">
          <div className="flex space-x-2 bg-gray-100 rounded-xl p-1">
            <Button
              variant={selectedTab === 'tasks' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTab('tasks')}
              className="flex-1 rounded-lg"
            >
              <Target className="w-4 h-4 mr-2" />
              Tasks
            </Button>
            <Button
              variant={selectedTab === 'journal' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTab('journal')}
              className="flex-1 rounded-lg"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Journal
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8 pb-24">
        {/* Content based on selected tab */}
        {selectedTab === 'tasks' ? renderTasksTab() : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-md rounded-2xl">
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-blue-600">{userData.journalEntries.length}</p>
                  <p className="text-gray-600 font-medium">Entries Written</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-md rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">🔥</div>
                  <p className="text-2xl font-bold text-orange-600">{userData.streaks.journaling}</p>
                  <p className="text-gray-600 font-medium">Day Streak</p>
                </CardContent>
              </Card>
            </div>

        {/* Quick Start */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-md rounded-3xl">
          <CardHeader className="px-8 pt-8">
            <CardTitle className="text-xl">Start Writing</CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <Button
              onClick={handleFreeWriting}
              className="w-full text-left justify-start h-auto p-6 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 text-gray-800 border-2 border-purple-200 hover:border-purple-300 rounded-2xl"
            >
              <div className="flex items-center space-x-4">
                <div className="text-3xl">✨</div>
                <div>
                  <p className="font-semibold text-lg">Free Writing</p>
                  <p className="text-gray-600">Write about whatever's on your mind</p>
                </div>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Guided Prompts */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-md rounded-3xl">
          <CardHeader className="px-8 pt-8">
            <CardTitle className="flex items-center space-x-3 text-xl">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              <span>Guided Prompts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8 space-y-4">
            {journalPrompts.slice(0, 6).map((prompt) => (
              <Button
                key={prompt.id}
                onClick={() => handlePromptSelect(prompt)}
                variant="outline"
                className="w-full text-left justify-start h-auto p-6 hover:bg-gray-50/80 border-2 hover:border-gray-300 rounded-2xl"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{prompt.icon}</div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800 text-lg">{prompt.title}</p>
                    <p className="text-gray-600 mt-2 leading-relaxed">{prompt.prompt}</p>
                  </div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Entries */}
        {userData.journalEntries.length > 0 && (
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-md rounded-3xl">
            <CardHeader className="px-8 pt-8">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <Calendar className="w-6 h-6 text-teal-500" />
                <span>Recent Entries</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8 space-y-4">
              {userData.journalEntries.slice(-3).reverse().map((entry) => (
                <div
                  key={entry.id}
                  className="p-6 bg-gray-50/80 rounded-2xl border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <p className="font-medium text-gray-800">{entry.date}</p>
                    <div className="text-2xl">📝</div>
                  </div>
                  <p className="text-gray-600 mb-3 italic leading-relaxed">{entry.prompt}</p>
                  <p className="text-gray-700 line-clamp-2 leading-relaxed">
                    {entry.content.substring(0, 120)}...
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

            {/* Inspirational Message */}
            <Card className="shadow-xl border-0 bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl">
              <CardContent className="p-8 text-center">
                <div className="p-3 bg-white rounded-2xl inline-block mb-6">
                  <HumanAvatar size="md" expression="encouraging" mood={userData.currentMood} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Your Voice Matters 💜</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Journaling is a powerful tool for self-discovery and emotional healing. 
                  Every word you write is a step toward understanding yourself better.
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};
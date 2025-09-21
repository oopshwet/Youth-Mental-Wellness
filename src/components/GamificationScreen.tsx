import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { HumanAvatar } from './HumanAvatar';
import { MeditationLogo } from './MeditationLogo';
import { ArrowLeft, Award, Star, Flame, Crown, Heart, Target, BookOpen, Zap } from 'lucide-react';
import { UserData, Screen } from '../App';

interface GamificationScreenProps {
  userData: UserData;
  onNavigate: (screen: Screen) => void;
}

interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earned: boolean;
  progress: number;
  maxProgress: number;
  category: 'wellness' | 'social' | 'creativity' | 'consistency';
}

const badges: BadgeData[] = [
  {
    id: 'first-journal',
    name: 'First Steps',
    description: 'Write your first journal entry',
    icon: '📝',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    earned: true,
    progress: 1,
    maxProgress: 1,
    category: 'wellness'
  },
  {
    id: 'week-warrior',
    name: 'Week Warrior',
    description: 'Complete 7 days of check-ins',
    icon: '🗓️',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    earned: false,
    progress: 5,
    maxProgress: 7,
    category: 'consistency'
  },
  {
    id: 'mindful-master',
    name: 'Mindful Master',
    description: 'Complete 10 meditation sessions',
    icon: '🧘‍♀️',
    color: 'bg-green-50 text-green-700 border-green-200',
    earned: false,
    progress: 3,
    maxProgress: 10,
    category: 'wellness'
  },
  {
    id: 'gratitude-guru',
    name: 'Gratitude Guru',
    description: 'Write 5 gratitude entries',
    icon: '🙏',
    color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    earned: true,
    progress: 5,
    maxProgress: 5,
    category: 'wellness'
  },
  {
    id: 'social-butterfly',
    name: 'Social Butterfly',
    description: 'Connect with friends 3 times',
    icon: '🦋',
    color: 'bg-pink-50 text-pink-700 border-pink-200',
    earned: false,
    progress: 1,
    maxProgress: 3,
    category: 'social'
  },
  {
    id: 'creative-soul',
    name: 'Creative Soul',
    description: 'Express creativity 5 times',
    icon: '🎨',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    earned: false,
    progress: 2,
    maxProgress: 5,
    category: 'creativity'
  },
  {
    id: 'streak-legend',
    name: 'Streak Legend',
    description: 'Maintain a 30-day streak',
    icon: '🔥',
    color: 'bg-red-50 text-red-700 border-red-200',
    earned: false,
    progress: 7,
    maxProgress: 30,
    category: 'consistency'
  },
  {
    id: 'wellness-champion',
    name: 'Wellness Champion',
    description: 'Earn 10 other badges',
    icon: '👑',
    color: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-300',
    earned: false,
    progress: 2,
    maxProgress: 10,
    category: 'wellness'
  }
];

const achievements = [
  { name: 'Days Active', value: 12, icon: '📅', color: 'text-blue-600' },
  { name: 'Journal Entries', value: 8, icon: '📝', color: 'text-green-600' },
  { name: 'Chat Sessions', value: 15, icon: '💬', color: 'text-purple-600' },
  { name: 'Mindful Minutes', value: 120, icon: '🧘‍♀️', color: 'text-teal-600' }
];

export const GamificationScreen: React.FC<GamificationScreenProps> = ({ 
  userData, 
  onNavigate 
}) => {
  const earnedBadges = badges.filter(badge => badge.earned);
  const inProgressBadges = badges.filter(badge => !badge.earned);
  
  const totalXP = earnedBadges.length * 100 + inProgressBadges.reduce((sum, badge) => sum + (badge.progress / badge.maxProgress * 50), 0);
  const currentLevel = Math.floor(totalXP / 200) + 1;
  const nextLevelXP = currentLevel * 200;
  const progressToNextLevel = ((totalXP % 200) / 200) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/80 via-purple-50/60 to-pink-50/80">
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
          <div className="flex items-center space-x-3">
            <MeditationLogo size="sm" />
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Your Achievements</h1>
              <p className="text-gray-600">Celebrating your wellness journey</p>
            </div>
          </div>
          <div className="p-2 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl">
            <HumanAvatar size="md" expression="happy" />
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8 pb-24">
        {/* Level & XP */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md">
                  <Crown className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">Level {currentLevel}</h2>
                  <p className="text-gray-600">Wellness Explorer</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-purple-600">{Math.round(totalXP)}</p>
                <p className="text-sm text-gray-600">Total XP</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Progress to Level {currentLevel + 1}</span>
                <span className="font-medium">{Math.round(progressToNextLevel)}%</span>
              </div>
              <Progress value={progressToNextLevel} className="h-4 rounded-full" />
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <Card key={index} className="shadow-lg border-0 bg-white/90 backdrop-blur-md rounded-2xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">{achievement.icon}</div>
                <p className="text-2xl font-bold mb-2" style={{ color: achievement.color.split('-')[1] }}>
                  {achievement.value}
                </p>
                <p className="text-sm text-gray-600">{achievement.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Earned Badges */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-md rounded-3xl">
          <CardHeader className="px-8 pt-8">
            <CardTitle className="flex items-center space-x-3 text-xl">
              <Award className="w-6 h-6 text-yellow-500" />
              <span>Earned Badges ({earnedBadges.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            {earnedBadges.length === 0 ? (
              <div className="text-center py-12">
                <div className="p-4 bg-gradient-to-br from-teal-100 to-blue-100 rounded-2xl inline-block mb-6">
                  <HumanAvatar size="lg" expression="encouraging" />
                </div>
                <p className="text-gray-600 text-lg">Your first badge is waiting! Complete an activity to get started.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {earnedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200 shadow-md"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{badge.icon}</div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{badge.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{badge.description}</p>
                      <Badge className="bg-yellow-500 text-white">
                        <Star className="w-4 h-4 mr-1" />
                        Earned!
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* In Progress Badges */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-md rounded-3xl">
          <CardHeader className="px-8 pt-8">
            <CardTitle className="flex items-center space-x-3 text-xl">
              <Target className="w-6 h-6 text-blue-500" />
              <span>In Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="space-y-6">
              {inProgressBadges.slice(0, 4).map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center space-x-6 p-5 bg-gray-50/80 rounded-2xl border border-gray-200"
                >
                  <div className="text-3xl opacity-70">{badge.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{badge.name}</h3>
                    <p className="text-gray-600 mb-3">{badge.description}</p>
                    <div className="flex items-center space-x-3">
                      <Progress 
                        value={(badge.progress / badge.maxProgress) * 100} 
                        className="flex-1 h-3 rounded-full" 
                      />
                      <span className="text-sm text-gray-500 font-medium">
                        {badge.progress}/{badge.maxProgress}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Motivational Message */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-teal-50 to-blue-50 rounded-3xl">
          <CardContent className="p-8 text-center">
            <div className="p-3 bg-white rounded-2xl inline-block mb-6">
              <HumanAvatar size="md" expression="encouraging" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">You're Doing Amazing! 🌟</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              Every badge you earn represents real progress in your mental wellness journey. 
              Keep going - your future self will thank you for the care you're showing today!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
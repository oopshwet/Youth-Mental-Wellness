import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { MeditationLogo } from './MeditationLogo';
import { ArrowLeft, Calendar, Clock, CheckCircle, Circle, Star, Flame, Diamond } from 'lucide-react';
import { UserData, Screen } from '../App';

interface WellnessRoadmapScreenProps {
  userData: UserData;
  onNavigate: (screen: Screen) => void;
  onUpdateUserData: (updates: Partial<UserData>) => void;
}

interface Activity {
  id: string;
  title: string;
  description: string;
  category: 'breathing' | 'journaling' | 'meditation' | 'movement' | 'social' | 'creativity';
  duration: string;
  difficulty: 'essential' | 'intermediate' | 'advanced';
  completed: boolean;
  streak: number;
  icon: string;
  color: string;
}

const weeklyActivities: Activity[] = [
  {
    id: 'morning-breath',
    title: 'Elite Morning Breathing',
    description: 'Premium 5-minute mindfulness technique for optimal mental clarity',
    category: 'breathing',
    duration: '5 min',
    difficulty: 'essential',
    completed: false,
    streak: 3,
    icon: '🌸',
    color: 'bg-slate-50 text-slate-700 border-slate-200'
  },
  {
    id: 'gratitude-journal',
    title: 'Sophisticated Gratitude Practice',
    description: 'Curated reflection on three meaningful moments of appreciation',
    category: 'journaling',
    duration: '10 min',
    difficulty: 'essential',
    completed: true,
    streak: 7,
    icon: '📝',
    color: 'bg-slate-50 text-slate-700 border-slate-200'
  },
  {
    id: 'body-scan',
    title: 'Advanced Body Scan Meditation',
    description: 'Progressive relaxation technique for complete mind-body integration',
    category: 'meditation',
    duration: '15 min',
    difficulty: 'intermediate',
    completed: false,
    streak: 1,
    icon: '🧘‍♀️',
    color: 'bg-slate-50 text-slate-700 border-slate-200'
  },
  {
    id: 'gentle-walk',
    title: 'Mindful Movement Session',
    description: 'Intentional walking practice with environmental awareness',
    category: 'movement',
    duration: '20 min',
    difficulty: 'essential',
    completed: false,
    streak: 0,
    icon: '🚶‍♀️',
    color: 'bg-slate-50 text-slate-700 border-slate-200'
  },
  {
    id: 'connect-friend',
    title: 'Meaningful Connection',
    description: 'Authentic engagement with someone important to you',
    category: 'social',
    duration: '30 min',
    difficulty: 'intermediate',
    completed: false,
    streak: 2,
    icon: '💝',
    color: 'bg-slate-50 text-slate-700 border-slate-200'
  },
  {
    id: 'creative-time',
    title: 'Creative Expression',
    description: 'Dedicated time for artistic and creative exploration',
    category: 'creativity',
    duration: '25 min',
    difficulty: 'advanced',
    completed: false,
    streak: 0,
    icon: '🎨',
    color: 'bg-slate-50 text-slate-700 border-slate-200'
  }
];

export const WellnessRoadmapScreen: React.FC<WellnessRoadmapScreenProps> = ({ 
  userData, 
  onNavigate, 
  onUpdateUserData 
}) => {
  const [activities, setActivities] = useState<Activity[]>(weeklyActivities);

  const handleCompleteActivity = (activityId: string) => {
    setActivities(prev => 
      prev.map(activity => 
        activity.id === activityId 
          ? { ...activity, completed: !activity.completed, streak: activity.completed ? activity.streak - 1 : activity.streak + 1 }
          : activity
      )
    );

    const activity = activities.find(a => a.id === activityId);
    if (activity && !activity.completed) {
      if (activity.category === 'journaling') {
        onUpdateUserData({
          streaks: { ...userData.streaks, journaling: userData.streaks.journaling + 1 }
        });
      } else if (activity.category === 'meditation') {
        onUpdateUserData({
          streaks: { ...userData.streaks, meditation: userData.streaks.meditation + 1 }
        });
      }
    }
  };

  const completedCount = activities.filter(a => a.completed).length;
  const totalActivities = activities.length;
  const progressPercentage = (completedCount / totalActivities) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'essential': return 'bg-green-50 text-green-700 border-green-200';
      case 'intermediate': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'advanced': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="premium-glass border-b border-gray-200/50">
        <div className="flex items-center space-x-4 p-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate('home')}
            className="rounded-xl hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-semibold text-gray-900">Premium Wellness Program</h1>
              <Diamond className="w-6 h-6 text-yellow-500" />
            </div>
            <p className="text-gray-600">Your personalized journey to optimal mental wellness</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl shadow-sm">
            <MeditationLogo size="md" />
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8 pb-24">
        {/* Progress Overview */}
        <Card className="shadow-xl border-0 premium-glass rounded-3xl">
          <CardHeader className="px-8 pt-8">
            <CardTitle className="flex items-center justify-between text-xl text-gray-900">
              <span className="flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-gray-700" />
                <span>Today's Elite Progress</span>
              </span>
              <div className="flex items-center space-x-3">
                <Flame className="w-6 h-6 text-orange-500" />
                <span className="font-medium">{userData.streaks.checkIn} day excellence streak</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium text-gray-800 text-lg">
                    {completedCount} of {totalActivities} premium activities completed
                  </span>
                  <span className="text-3xl">
                    {progressPercentage === 100 ? '🏆' : progressPercentage >= 50 ? '⭐' : '💎'}
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-4 rounded-full" />
              </div>
              
              {progressPercentage === 100 && (
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-2xl border border-yellow-200">
                  <p className="text-yellow-800 font-semibold text-center text-lg">
                    🏆 Outstanding! You've completed today's premium wellness program! 🏆
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Activities List */}
        <Card className="shadow-xl border-0 premium-glass rounded-3xl">
          <CardHeader className="px-8 pt-8">
            <CardTitle className="text-xl text-gray-900">Premium Daily Activities</CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8 space-y-6">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  activity.completed 
                    ? 'bg-green-50 border-green-200 shadow-md' 
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-start space-x-6">
                  <button
                    onClick={() => handleCompleteActivity(activity.id)}
                    className="mt-2 transition-colors hover:scale-110 duration-200"
                  >
                    {activity.completed ? (
                      <CheckCircle className="w-7 h-7 text-green-500" />
                    ) : (
                      <Circle className="w-7 h-7 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-3xl">{activity.icon}</span>
                      <h3 className={`text-lg font-semibold ${activity.completed ? 'text-green-800' : 'text-gray-900'}`}>
                        {activity.title}
                      </h3>
                      {activity.streak > 0 && (
                        <div className="flex items-center space-x-2 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                          <Flame className="w-4 h-4 text-orange-500" />
                          <span className="font-medium text-orange-600">{activity.streak}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className={`mb-4 leading-relaxed ${activity.completed ? 'text-green-700' : 'text-gray-600'}`}>
                      {activity.description}
                    </p>
                    
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="text-sm border-2 border-gray-300">
                        <Clock className="w-4 h-4 mr-2" />
                        {activity.duration}
                      </Badge>
                      <Badge variant="outline" className={`text-sm border-2 ${getDifficultyColor(activity.difficulty)}`}>
                        {activity.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-sm border-2 bg-slate-50 text-slate-700 border-slate-200">
                        {activity.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Encouragement Message */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl">
          <CardContent className="p-8 text-center">
            <div className="p-4 bg-card/50 rounded-2xl inline-block mb-6 shadow-sm border border-border/20">
              <MeditationLogo size="md" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence in Progress 💎</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              Every action you take demonstrates commitment to your highest potential. 
              Premium wellness isn't about perfection—it's about consistent, intentional growth.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
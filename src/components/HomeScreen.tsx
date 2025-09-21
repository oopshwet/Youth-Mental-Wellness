import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { MeditationLogo } from './MeditationLogo';
import { HumanAvatar } from './HumanAvatar';
import { ThemeToggle } from './ThemeToggle';
import { MessageCircle, Target, Award, BookOpen, Home, Menu, AlertTriangle } from 'lucide-react';
import { UserData, Screen } from '../App';

interface HomeScreenProps {
  userData: UserData;
  onNavigate: (screen: Screen) => void;
  onUpdateUserData: (updates: Partial<UserData>) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ 
  userData, 
  onNavigate, 
  onUpdateUserData 
}) => {
  const todayActivities = [
    {
      id: 'breathing',
      title: 'Mindful Breathing',
      description: '5-minute guided breathing exercise',
      icon: '🌸',
      progress: 0,
      type: 'breathing'
    },
    {
      id: 'journal',
      title: 'Reflection Journal',
      description: 'Personal journaling space',
      icon: '📝',
      progress: userData.journalEntries.length > 0 ? 100 : 0,
      type: 'journal'
    },
    {
      id: 'chat',
      title: 'AI Wellness Session',
      description: 'Chat with your AI wellness companion',
      icon: '💭',
      progress: 50,
      type: 'chat'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass-light dark:glass-dark border-b border-border/50">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <MeditationLogo size="sm" />
              <div 
                className="p-3 bg-card rounded-2xl shadow-sm border border-border/20 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => onNavigate('profile')}
              >
                <HumanAvatar size="md" mood={userData.currentMood} style={userData.avatar?.style} />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Welcome back, {userData.nickname}</h1>
                <p className="text-muted-foreground">How are you feeling today?</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                onClick={() => onNavigate('sos')}
                size="sm" 
                className="bg-red-500 hover:bg-red-600 text-white rounded-xl px-3 py-2 shadow-lg animate-pulse"
              >
                <AlertTriangle className="w-4 h-4 mr-1" />
                SOS
              </Button>
              <ThemeToggle />
              <Button variant="ghost" size="sm" className="rounded-xl">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 space-y-8">
        {/* AI Chat Preview */}
        <Card 
          className="shadow-lg border border-border/20 bg-card/50 backdrop-blur-sm cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-3xl group"
          onClick={() => onNavigate('chat')}
        >
          <CardContent className="p-8">
            <div className="flex items-start space-x-6">
              <div className="p-4 bg-accent/10 rounded-2xl shadow-sm group-hover:shadow-md transition-shadow border border-accent/20">
                <MeditationLogo size="lg" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-foreground">AI Wellness Companion</h3>
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
                  "I'm here to provide you with personalized support whenever you need it. How can I assist with your wellness journey today?"
                </p>
                <Button className="rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                  Start Conversation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Wellness Plan */}
        <Card className="shadow-lg border border-border/20 bg-card/50 backdrop-blur-sm rounded-3xl">
          <CardHeader className="px-8 pt-8">
            <CardTitle className="flex items-center justify-between text-xl text-foreground">
              <span className="flex items-center space-x-3">
                <Target className="w-6 h-6 text-accent" />
                <span>Wellness Activities</span>
              </span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('roadmap')}
                className="rounded-xl"
              >
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8 space-y-6">
            {todayActivities.map((activity) => (
              <div 
                key={activity.id}
                className="flex items-center space-x-6 p-5 rounded-2xl hover:bg-muted/50 transition-colors duration-200"
              >
                <div className="text-3xl">{activity.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground text-lg">{activity.title}</h4>
                  <p className="text-muted-foreground mb-3">{activity.description}</p>
                  <div className="mt-3">
                    <Progress value={activity.progress} className="h-3 rounded-full" />
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant={activity.progress === 100 ? "secondary" : "default"}
                  className="rounded-2xl px-6 py-2 font-medium"
                  onClick={() => {
                    if (activity.type === 'journal') onNavigate('journal');
                    if (activity.type === 'chat') onNavigate('chat');
                  }}
                >
                  {activity.progress === 100 ? '✓ Complete' : 'Begin'}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            className="shadow-lg border border-border/20 wellness-gradient-success cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-3xl group"
            onClick={() => onNavigate('gamification')}
          >
            <CardContent className="p-8 text-center">
              <Award className="w-10 h-10 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-white mb-2">Achievements</h3>
              <p className="text-white/90">
                {userData.badges.length} badges earned
              </p>
            </CardContent>
          </Card>

          <Card 
            className="shadow-lg border border-border/20 wellness-gradient-calm cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-3xl group"
            onClick={() => onNavigate('journal')}
          >
            <CardContent className="p-8 text-center">
              <BookOpen className="w-10 h-10 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-white mb-2">Personal Journal</h3>
              <p className="text-white/90">
                {userData.journalEntries.length} reflections documented
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 glass-light dark:glass-dark border-t border-border/50 shadow-lg">
        <div className="max-w-5xl mx-auto px-6 py-3">
          <div className="flex justify-around">
            <Button variant="ghost" size="sm" className="flex flex-col items-center py-4 rounded-xl">
              <Home className="w-6 h-6 text-primary" />
              <span className="text-xs text-primary mt-1 font-medium">Home</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex flex-col items-center py-4 rounded-xl"
              onClick={() => onNavigate('chat')}
            >
              <MessageCircle className="w-6 h-6" />
              <span className="text-xs mt-1 font-medium">AI Chat</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex flex-col items-center py-4 rounded-xl"
              onClick={() => onNavigate('roadmap')}
            >
              <Target className="w-6 h-6" />
              <span className="text-xs mt-1 font-medium">Activities</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex flex-col items-center py-4 rounded-xl"
              onClick={() => onNavigate('gamification')}
            >
              <Award className="w-6 h-6" />
              <span className="text-xs mt-1 font-medium">Progress</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
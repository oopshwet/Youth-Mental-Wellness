import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Edit3, 
  Trophy, 
  Target, 
  Calendar, 
  Zap, 
  Heart,
  Award,
  Coins,
  Settings,
  User,
  Palette,
  Star
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { HumanAvatar } from './HumanAvatar';
import { UserData } from '../App';

interface ProfileScreenProps {
  userData: UserData;
  onNavigate: (screen: string) => void;
  onUpdateUserData: (updates: Partial<UserData>) => void;
}

const avatarStyles = [
  { id: 'default', name: 'Classic', preview: 'neutral' },
  { id: 'friendly', name: 'Friendly', preview: 'neutral' },
  { id: 'professional', name: 'Professional', preview: 'neutral' },
  { id: 'creative', name: 'Creative', preview: 'neutral' }
];

const availableAccessories = [
  { id: 'glasses', name: '👓 Glasses', cost: 50 },
  { id: 'hat', name: '🎩 Hat', cost: 75 },
  { id: 'flowers', name: '🌸 Flower Crown', cost: 60 },
  { id: 'earrings', name: '💎 Earrings', cost: 40 }
];

export function ProfileScreen({ userData, onNavigate, onUpdateUserData }: ProfileScreenProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [newNickname, setNewNickname] = useState(userData.nickname);
  const [selectedTab, setSelectedTab] = useState<'profile' | 'avatar' | 'achievements' | 'stats'>('profile');

  const handleSaveName = () => {
    onUpdateUserData({ nickname: newNickname });
    setIsEditingName(false);
  };

  const totalBadges = userData.badges?.length || 0;
  const totalStreakDays = Object.values(userData.streaks).reduce((sum, streak) => sum + streak, 0);
  const completionRate = userData.dailyTasks?.length > 0 
    ? (userData.completedTasks?.length || 0) / userData.dailyTasks.length * 100 
    : 0;

  const nextLevel = Math.floor(userData.totalPoints / 100) + 1;
  const progressToNextLevel = (userData.totalPoints % 100);

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* User Info Card */}
      <Card className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <HumanAvatar 
            size={80} 
            mood={userData.currentMood} 
            style={userData.avatar?.style || 'default'}
          />
          <div className="flex-1">
            {isEditingName ? (
              <div className="flex items-center space-x-2">
                <Input
                  value={newNickname}
                  onChange={(e) => setNewNickname(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSaveName} size="sm">Save</Button>
                <Button 
                  onClick={() => setIsEditingName(false)} 
                  variant="outline" 
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <h2>{userData.nickname}</h2>
                <Button
                  onClick={() => setIsEditingName(true)}
                  variant="ghost"
                  size="sm"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              </div>
            )}
            <p className="text-muted-foreground">Level {nextLevel} Wellness Explorer</p>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Progress to Level {nextLevel + 1}</span>
            <span className="text-sm text-wellness-primary">{progressToNextLevel}/100 XP</span>
          </div>
          <Progress value={progressToNextLevel} className="h-2" />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Coins className="w-4 h-4 text-wellness-warning mr-1" />
            </div>
            <p className="text-lg">{userData.totalPoints}</p>
            <p className="text-xs text-muted-foreground">Total Points</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Trophy className="w-4 h-4 text-wellness-accent mr-1" />
            </div>
            <p className="text-lg">{totalBadges}</p>
            <p className="text-xs text-muted-foreground">Badges</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Zap className="w-4 h-4 text-wellness-success mr-1" />
            </div>
            <p className="text-lg">{totalStreakDays}</p>
            <p className="text-xs text-muted-foreground">Streak Days</p>
          </div>
        </div>
      </Card>

      {/* Current Mood Card */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Heart className="w-5 h-5 text-wellness-primary mr-2" />
            <h3>Current Mood</h3>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-2xl">
            {userData.currentMood === 1 && '😢'}
            {userData.currentMood === 2 && '😕'}
            {userData.currentMood === 3 && '😐'}
            {userData.currentMood === 4 && '🙂'}
            {userData.currentMood === 5 && '😄'}
          </div>
          <div>
            <p>
              {userData.currentMood === 1 && 'Very Low'}
              {userData.currentMood === 2 && 'Low'}
              {userData.currentMood === 3 && 'Neutral'}
              {userData.currentMood === 4 && 'Good'}
              {userData.currentMood === 5 && 'Excellent'}
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: {userData.lastCheckIn || 'Not set'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderAvatarTab = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="mb-4">Customize Your Avatar</h3>
        
        <div className="flex justify-center mb-6">
          <HumanAvatar 
            size={120} 
            mood={userData.currentMood} 
            style={userData.avatar?.style || 'default'}
          />
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="mb-3">Avatar Style</h4>
            <div className="grid grid-cols-2 gap-3">
              {avatarStyles.map((style) => (
                <Button
                  key={style.id}
                  variant={userData.avatar?.style === style.id ? "default" : "outline"}
                  onClick={() => onUpdateUserData({
                    avatar: { ...userData.avatar, style: style.id }
                  })}
                  className="p-4 h-auto flex flex-col items-center space-y-2"
                >
                  <HumanAvatar size={40} style={style.id} mood={userData.currentMood} />
                  <span className="text-sm">{style.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3">Accessories ({userData.totalPoints} points available)</h4>
            <div className="space-y-2">
              {availableAccessories.map((accessory) => {
                const isOwned = userData.avatar?.accessories?.includes(accessory.id);
                const canAfford = userData.totalPoints >= accessory.cost;
                
                return (
                  <div key={accessory.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span>{accessory.name}</span>
                      {isOwned && <Badge variant="secondary">Owned</Badge>}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{accessory.cost} pts</span>
                      {!isOwned && (
                        <Button
                          size="sm"
                          disabled={!canAfford}
                          onClick={() => {
                            if (canAfford) {
                              const newAccessories = [...(userData.avatar?.accessories || []), accessory.id];
                              onUpdateUserData({
                                avatar: { ...userData.avatar, accessories: newAccessories },
                                totalPoints: userData.totalPoints - accessory.cost
                              });
                            }
                          }}
                        >
                          {canAfford ? 'Buy' : 'Need more points'}
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderAchievementsTab = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="mb-4">Your Badges</h3>
        {userData.badges && userData.badges.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {userData.badges.map((badge) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center space-x-3 p-4 border rounded-lg"
              >
                <div className="text-2xl">{badge.icon}</div>
                <div>
                  <p className="font-medium">{badge.name}</p>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Award className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No badges earned yet</p>
            <p className="text-sm text-muted-foreground">Complete tasks and activities to earn badges!</p>
          </div>
        )}
      </Card>
    </div>
  );

  const renderStatsTab = () => (
    <div className="space-y-6">
      {/* Streaks */}
      <Card className="p-6">
        <h3 className="mb-4">Activity Streaks</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-wellness-primary" />
              <span>Daily Check-in</span>
            </div>
            <Badge variant="secondary">{userData.streaks.checkIn} days</Badge>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Edit3 className="w-4 h-4 text-wellness-accent" />
              <span>Journaling</span>
            </div>
            <Badge variant="secondary">{userData.streaks.journaling} days</Badge>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-wellness-calm" />
              <span>Meditation</span>
            </div>
            <Badge variant="secondary">{userData.streaks.meditation} days</Badge>
          </div>
        </div>
      </Card>

      {/* Completion Rate */}
      <Card className="p-6">
        <h3 className="mb-4">Today's Progress</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Task Completion Rate</span>
            <span>{Math.round(completionRate)}%</span>
          </div>
          <Progress value={completionRate} />
          <p className="text-sm text-muted-foreground">
            {userData.completedTasks?.length || 0} of {userData.dailyTasks?.length || 0} tasks completed
          </p>
        </div>
      </Card>

      {/* Journal Stats */}
      <Card className="p-6">
        <h3 className="mb-4">Journal Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl">{userData.journalEntries?.length || 0}</p>
            <p className="text-sm text-muted-foreground">Total Entries</p>
          </div>
          <div className="text-center">
            <p className="text-2xl">
              {userData.journalEntries?.reduce((sum, entry) => sum + entry.pointsEarned, 0) || 0}
            </p>
            <p className="text-sm text-muted-foreground">Points from Journal</p>
          </div>
        </div>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'avatar', label: 'Avatar', icon: Palette },
    { id: 'achievements', label: 'Badges', icon: Trophy },
    { id: 'stats', label: 'Stats', icon: Target }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button
            onClick={() => onNavigate('home')}
            variant="ghost"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1>Profile</h1>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-card border-b px-4">
        <div className="max-w-md mx-auto">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={selectedTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedTab(tab.id as any)}
                  className="flex-1 flex flex-col items-center py-3"
                >
                  <IconComponent className="w-4 h-4 mb-1" />
                  <span className="text-xs">{tab.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 pb-20">
        <div className="max-w-md mx-auto">
          {selectedTab === 'profile' && renderProfileTab()}
          {selectedTab === 'avatar' && renderAvatarTab()}
          {selectedTab === 'achievements' && renderAchievementsTab()}
          {selectedTab === 'stats' && renderStatsTab()}
        </div>
      </div>
    </div>
  );
}
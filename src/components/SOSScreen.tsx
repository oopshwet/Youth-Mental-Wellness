import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { MeditationLogo } from './MeditationLogo';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Mic, 
  MicOff,
  Send, 
  AlertTriangle,
  Heart,
  Phone,
  Shield,
  Clock,
  MessageSquare,
  Volume2,
  PauseCircle
} from 'lucide-react';
import { UserData, Screen } from '../App';

interface SOSScreenProps {
  userData: UserData;
  onNavigate: (screen: Screen) => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'emergency' | 'support' | 'breathing';
}

const emergencyPrompts = [
  "I'm feeling overwhelmed and need immediate support",
  "I'm having anxiety and can't calm down",
  "I'm feeling unsafe and need help",
  "I'm having panic attacks",
  "I need someone to talk to right now",
  "I'm having suicidal thoughts"
];

const emergencyContacts = [
  { name: "National Suicide Prevention Lifeline", number: "988", description: "24/7 Crisis Support" },
  { name: "Crisis Text Line", number: "Text HOME to 741741", description: "Free 24/7 Crisis Support" },
  { name: "Emergency Services", number: "112", description: "Immediate Emergency Help" },
];

export const SOSScreen: React.FC<SOSScreenProps> = ({ userData, onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "I'm here to help you through this difficult moment. You're not alone. Take a deep breath and tell me what's happening.",
      sender: 'ai',
      timestamp: new Date(),
      type: 'support'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isBreathingExercise, setIsBreathingExercise] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingCount, setBreathingCount] = useState(4);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'emergency'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(text.trim());
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        type: 'support'
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const generateAIResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes('suicide') || lowerText.includes('kill myself') || lowerText.includes('end it all')) {
      return "I'm very concerned about you. These feelings can be overwhelming, but they can pass. Please reach out to the National Suicide Prevention Lifeline at 988 right now. You matter, and there are people who want to help you through this.";
    }
    
    if (lowerText.includes('panic') || lowerText.includes('anxiety') || lowerText.includes('scared')) {
      return "I understand you're feeling anxious. Let's try to ground yourself. Can you name 5 things you can see around you right now? This can help bring you back to the present moment. Remember, panic attacks are temporary and will pass.";
    }
    
    if (lowerText.includes('alone') || lowerText.includes('nobody')) {
      return "You're not alone, even though it might feel that way right now. I'm here with you, and there are people who care about you. Sometimes reaching out to one person can make all the difference. Is there someone you trust that you could contact?";
    }
    
    if (lowerText.includes('breathe') || lowerText.includes('breathing')) {
      return "Let's focus on your breathing together. I can guide you through a breathing exercise that might help you feel more centered. Would you like to try that?";
    }
    
    return "Thank you for sharing that with me. Your feelings are valid, and it takes courage to reach out. What would help you feel even a little bit safer or calmer right now?";
  };

  const handleMicPress = () => {
    if (isRecording) {
      setIsRecording(false);
      toast.success("Voice message recorded", {
        description: "Processing your message...",
        duration: 2000,
      });
      // Simulate voice-to-text processing
      setTimeout(() => {
        handleSendMessage("I need help dealing with my anxiety right now.");
      }, 1500);
    } else {
      setIsRecording(true);
      toast.info("Recording...", {
        description: "Speak clearly about your situation",
        duration: 1000,
      });
    }
  };

  const startBreathingExercise = () => {
    setIsBreathingExercise(true);
    setBreathingPhase('inhale');
    setBreathingCount(4);
    
    const breathingCycle = () => {
      let phase: 'inhale' | 'hold' | 'exhale' = 'inhale';
      let count = 4;
      
      const interval = setInterval(() => {
        count--;
        setBreathingCount(count);
        
        if (count === 0) {
          if (phase === 'inhale') {
            phase = 'hold';
            count = 7;
            setBreathingPhase('hold');
          } else if (phase === 'hold') {
            phase = 'exhale';
            count = 8;
            setBreathingPhase('exhale');
          } else {
            phase = 'inhale';
            count = 4;
            setBreathingPhase('inhale');
          }
          setBreathingCount(count);
        }
      }, 1000);
      
      return interval;
    };
    
    const interval = breathingCycle();
    
    // Auto-stop after 5 cycles (about 2 minutes)
    setTimeout(() => {
      clearInterval(interval);
      setIsBreathingExercise(false);
      toast.success("Great job!", {
        description: "You completed the breathing exercise",
        duration: 3000,
      });
    }, 120000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 dark:from-red-950/20 dark:via-orange-950/10 dark:to-pink-950/20">
      {/* Emergency Header */}
      <div className="bg-red-600/95 backdrop-blur-md shadow-lg border-b border-red-500/20">
        <div className="flex items-center space-x-4 p-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate('home')}
            className="rounded-xl text-white hover:bg-red-700/30"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <MeditationLogo size="sm" />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-6 h-6 text-white" />
              <h1 className="text-xl font-semibold text-white">Emergency Support</h1>
            </div>
            <p className="text-red-100">Immediate crisis assistance available 24/7</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="destructive" className="animate-pulse">
              <Heart className="w-3 h-3 mr-1" />
              LIVE
            </Badge>
          </div>
        </div>
      </div>

      {/* Emergency Contacts Bar */}
      <div className="bg-red-600 p-3 overflow-x-auto">
        <div className="flex space-x-4 min-w-max">
          {emergencyContacts.map((contact, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl whitespace-nowrap"
              onClick={() => {
                toast.info(`Calling ${contact.name}`, {
                  description: contact.number,
                  duration: 3000,
                });
              }}
            >
              <Phone className="w-3 h-3 mr-2" />
              {contact.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Breathing Exercise Overlay */}
      <AnimatePresence>
        {isBreathingExercise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <Card className="w-80 bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-3xl">
              <CardContent className="p-12 text-center">
                <motion.div
                  animate={{ 
                    scale: breathingPhase === 'inhale' ? 1.2 : breathingPhase === 'hold' ? 1.2 : 0.8,
                  }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center"
                >
                  <div className="text-white font-bold text-4xl">{breathingCount}</div>
                </motion.div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                  {breathingPhase === 'inhale' ? 'Breathe In' : 
                   breathingPhase === 'hold' ? 'Hold' : 'Breathe Out'}
                </h3>
                <p className="text-gray-600 mb-6">Follow the circle and count</p>
                <Button
                  onClick={() => setIsBreathingExercise(false)}
                  variant="outline"
                  className="rounded-2xl"
                >
                  <PauseCircle className="w-4 h-4 mr-2" />
                  Stop Exercise
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col h-[calc(100vh-180px)]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                <Card className={`shadow-lg border-0 rounded-3xl ${
                  message.sender === 'user' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/95 backdrop-blur-md'
                }`}>
                  <CardContent className="p-4">
                    <p className="leading-relaxed">{message.text}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        {message.sender === 'ai' && <Shield className="w-4 h-4 text-green-500" />}
                        {message.type === 'emergency' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                      </div>
                      <span className={`text-xs ${
                        message.sender === 'user' ? 'text-red-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Action Buttons */}
        <div className="px-4 pb-4">
          <div className="flex space-x-2 mb-4 overflow-x-auto">
            <Button
              onClick={startBreathingExercise}
              variant="outline"
              size="sm"
              className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 rounded-2xl whitespace-nowrap"
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Breathing Exercise
            </Button>
            {emergencyPrompts.slice(0, 2).map((prompt, index) => (
              <Button
                key={index}
                onClick={() => handleSendMessage(prompt)}
                variant="outline"
                size="sm"
                className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100 rounded-2xl whitespace-nowrap"
              >
                {prompt.split(' ').slice(0, 3).join(' ')}...
              </Button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 p-4">
          <div className="flex items-end space-x-4">
            {/* Large Microphone Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleMicPress}
                size="lg"
                className={`h-16 w-16 rounded-full shadow-lg ${
                  isRecording 
                    ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
                    : 'bg-red-500 hover:bg-red-600'
                } text-white`}
              >
                {isRecording ? (
                  <MicOff className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </Button>
            </motion.div>

            {/* Text Input */}
            <div className="flex-1">
              <Textarea
                placeholder="Describe what's happening... You're safe here."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[60px] max-h-32 resize-none border-2 border-red-200 focus:border-red-400 rounded-2xl bg-white/90"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(inputText);
                  }
                }}
              />
            </div>

            {/* Send Button */}
            <Button
              onClick={() => handleSendMessage(inputText)}
              disabled={!inputText.trim()}
              className="bg-red-500 hover:bg-red-600 text-white rounded-2xl px-6 py-3 h-auto"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>

          {/* Quick Prompts */}
          <div className="mt-4 flex flex-wrap gap-2">
            {emergencyPrompts.slice(0, 3).map((prompt, index) => (
              <Button
                key={index}
                onClick={() => handleSendMessage(prompt)}
                variant="outline"
                size="sm"
                className="bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 rounded-xl text-xs"
              >
                {prompt}
              </Button>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              <Clock className="w-3 h-3 inline mr-1" />
              For immediate emergencies, call 112 • This is AI support, not a replacement for professional help
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
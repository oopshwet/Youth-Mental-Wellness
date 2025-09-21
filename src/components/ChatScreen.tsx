import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { MeditationLogo } from './MeditationLogo';
import { ArrowLeft, Send, Mic } from 'lucide-react';
import { UserData, Screen } from '../App';

interface ChatScreenProps {
  userData: UserData;
  onNavigate: (screen: Screen) => void;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const quickReplies = [
  "I'm feeling stressed 😰",
  "I need motivation 💪",
  "Help me journal 📝",
  "Relaxation techniques 🧘‍♀️",
  "I'm anxious today 😔",
  "Share wisdom ✨"
];

const aiResponses = {
  stress: [
    "I understand you're experiencing stress. This is completely natural - life can be overwhelming sometimes. Let's create a moment of calm together. Would you like me to guide you through a simple breathing technique? 🌸",
    "Stress can feel overwhelming, but you're showing strength by reaching out. What specific things have been weighing on your mind? Sometimes talking about these concerns can help provide clarity and relief. 💙"
  ],
  motivation: [
    "I believe in your abilities and potential. 🌟 Every big achievement starts with one small step. What's one meaningful thing you could do today that would move you closer to your goals?",
    "You've overcome challenges before - that same strength is still within you. What usually helps reignite your motivation when you're feeling stuck? Let's reconnect with that energy. ⚡"
  ],
  journal: [
    "Journaling is a wonderful way for self-discovery and understanding your emotions. 📝 Would you like me to suggest a prompt to get started, or would you prefer to write freely about what's on your mind?",
    "I appreciate your commitment to self-reflection - it shows real self-awareness. How about starting with: 'Right now, I'm feeling...' and letting your thoughts flow naturally? ✨"
  ],
  relax: [
    "Let's work on finding some peace together. 🧘‍♀️ If you're comfortable, close your eyes and imagine yourself somewhere calm and beautiful - maybe by water or in nature. Feel the gentle breeze and peaceful sounds. How does that feel?",
    "Deep relaxation starts with mindful breathing. Try this simple technique: breathe in for 4 counts, hold for 7, breathe out for 8. This naturally helps your body relax. You're doing great. 🌊"
  ],
  anxiety: [
    "Anxiety can feel really overwhelming, but your feelings are completely valid and you're being brave by reaching out for support. 💜 Let's ground ourselves in the present moment - can you name 5 things you can see around you right now?",
    "When anxiety comes, remember it's temporary - like clouds passing through the sky. You are stronger than these feelings. What grounding techniques have helped you before? 🌈"
  ],
  quote: [
    "✨ 'The only impossible journey is the one you never begin.' - Tony Robbins. Your wellness journey is already underway, and that's something to be proud of. 💙",
    "🌟 'What lies behind us and what lies before us are tiny matters compared to what lies within us.' - Ralph Waldo Emerson. Your inner strength is amazing, and I'm here to support you. 💪"
  ]
};

export const ChatScreen: React.FC<ChatScreenProps> = ({ userData, onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello ${userData.nickname}! 🌟 I'm your AI wellness companion, here to provide personalized support for your mental health journey. I'm here to listen, offer insights, and guide you toward greater well-being. How may I assist you today?`,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelm')) {
      return aiResponses.stress[Math.floor(Math.random() * aiResponses.stress.length)];
    } else if (lowerMessage.includes('motivat') || lowerMessage.includes('energy')) {
      return aiResponses.motivation[Math.floor(Math.random() * aiResponses.motivation.length)];
    } else if (lowerMessage.includes('journal') || lowerMessage.includes('write')) {
      return aiResponses.journal[Math.floor(Math.random() * aiResponses.journal.length)];
    } else if (lowerMessage.includes('relax') || lowerMessage.includes('calm') || lowerMessage.includes('meditat')) {
      return aiResponses.relax[Math.floor(Math.random() * aiResponses.relax.length)];
    } else if (lowerMessage.includes('anxious') || lowerMessage.includes('worry') || lowerMessage.includes('scared')) {
      return aiResponses.anxiety[Math.floor(Math.random() * aiResponses.anxiety.length)];
    } else if (lowerMessage.includes('quote') || lowerMessage.includes('wisdom') || lowerMessage.includes('positive')) {
      return aiResponses.quote[Math.floor(Math.random() * aiResponses.quote.length)];
    } else {
      const genericResponses = [
        "Thank you for sharing that with me. Your thoughts and feelings are completely valid and important. 💙 I'm here to support you. Could you tell me more about what's on your mind?",
        "I appreciate you opening up and sharing this with me. It takes courage to express what you're feeling. I'm here to listen and support you. 🌟",
        "I hear you, and I want you to know that you're not alone in experiencing these feelings. What kind of support would feel most helpful to you right now? 🤗",
        "That sounds like something important to work through. You're being really brave by reaching out. How can I best support you in this moment? 💜"
      ];
      return genericResponses[Math.floor(Math.random() * genericResponses.length)];
    }
  };

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(content),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1500 + Math.random() * 2000); // Random delay between 1.5-3.5 seconds
  };

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="glass-light dark:glass-dark border-b border-border/50">
        <div className="flex items-center space-x-4 p-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate('home')}
            className="rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="p-3 bg-accent/10 rounded-2xl shadow-sm border border-accent/20">
            <MeditationLogo size="md" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground">AI Wellness Companion</h1>
            <div className="text-sm text-wellness-success flex items-center">
              <div className="w-2 h-2 bg-wellness-success rounded-full mr-2 animate-pulse"></div>
              Online & Ready to Help
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-40">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] ${
                message.sender === 'user'
                  ? 'ml-12'
                  : 'mr-12'
              }`}
            >
              {message.sender === 'ai' && (
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-card/50 backdrop-blur-sm rounded-2xl shadow-sm border border-border/20">
                    <MeditationLogo size="sm" />
                  </div>
                  <div className="bg-card/50 backdrop-blur-sm shadow-lg rounded-3xl rounded-tl-lg p-6 max-w-md border border-border/20">
                    <div className="text-foreground leading-relaxed text-base">{message.content}</div>
                    <div className="text-xs text-muted-foreground mt-3">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              )}
              {message.sender === 'user' && (
                <div className="bg-primary text-primary-foreground shadow-lg rounded-3xl rounded-tr-lg p-6 max-w-md ml-auto">
                  <div className="leading-relaxed text-base">{message.content}</div>
                  <div className="text-xs text-primary-foreground/70 mt-3 text-right">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      <div className="fixed bottom-24 left-0 right-0 p-6">
        <div className="flex overflow-x-auto space-x-3 pb-2">
          {quickReplies.map((reply, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuickReply(reply)}
              className="whitespace-nowrap bg-card/50 backdrop-blur-sm hover:bg-accent/10 rounded-2xl border-border/50 hover:border-accent/50 shadow-md"
            >
              {reply}
            </Button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 glass-light dark:glass-dark border-t border-border/50 p-6 shadow-lg">
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Share your thoughts with your AI companion..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputValue)}
            className="flex-1 rounded-2xl py-4 px-6 text-base"
          />
          <Button
            size="sm"
            onClick={() => sendMessage(inputValue)}
            className="rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-4 shadow-lg"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
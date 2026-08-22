import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, RefreshCcw, Sparkles } from 'lucide-react';
import { findResponse, suggestedQuestions } from '@/data/chatbotKnowledge';
import portfolioData from '@/data/portfolioData';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      sender: 'bot',
      text: `Hi! I'm Subhan's AI Portfolio Assistant. I can answer questions about his experience, skills, and projects. What would you like to know?`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate network delay and bot processing
    setTimeout(() => {
      const response = findResponse(text);
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: response,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 700); // Random delay between 800-1500ms
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputValue);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'bot',
        text: `Conversation reset. How else can I help you learn about Subhan?`,
        timestamp: new Date(),
      },
    ]);
  };

  // Replace links in text with actual anchor tags safely
  const formatMessageText = (text: string) => {
    // Basic markdown-style link parser [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    
    if (!linkRegex.test(text)) {
      return text.split('\n').map((line, i) => (
        <span key={i}>
          {line}
          {i !== text.split('\n').length - 1 && <br />}
        </span>
      ));
    }

    const parts = [];
    let lastIndex = 0;
    let match;

    // Reset regex state
    linkRegex.lastIndex = 0;

    while ((match = linkRegex.exec(text)) !== null) {
      // Add text before link
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      // Add link
      parts.push(
        <a 
          key={match.index} 
          href={match[2]} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline font-medium"
        >
          {match[1]}
        </a>
      );
      
      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    // Handle newlines in the parts
    return parts.map((part, index) => {
      if (typeof part === 'string') {
        return part.split('\n').map((line, i, arr) => (
          <span key={`${index}-${i}`}>
            {line.replace(/\*\*(.*?)\*\*/g, '$1')} {/* Simple bold strip for now */}
            {i !== arr.length - 1 && <br />}
          </span>
        ));
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        className={`fixed z-50 right-6 bottom-24 md:bottom-6 w-14 h-14 rounded-full shadow-lg shadow-primary/20 bg-primary text-primary-foreground flex items-center justify-center transition-transform hover:scale-110 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
        onClick={() => setIsOpen(true)}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 right-4 bottom-20 md:right-6 md:bottom-24 w-[calc(100vw-32px)] md:w-[380px] h-[500px] max-h-[80vh] flex flex-col overflow-hidden glass-card shadow-2xl shadow-black/50 border border-primary/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 bg-background/50 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot size={18} className="text-primary" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-background" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                    AI Assistant
                    <Sparkles size={12} className="text-primary" />
                  </h3>
                  <p className="text-[10px] text-muted-foreground leading-none">
                    Verified Portfolio Knowledge
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                  title="Reset conversation"
                >
                  <RefreshCcw size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20 scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-sm'
                        : 'bg-muted/80 text-foreground rounded-tl-sm border border-border/30'
                    }`}
                  >
                    {formatMessageText(msg.text)}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted/80 rounded-2xl rounded-tl-sm px-3.5 py-3 border border-border/30 flex gap-1">
                    <motion.div 
                      animate={{ y: [0, -5, 0] }} 
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                      className="w-1.5 h-1.5 rounded-full bg-primary/60"
                    />
                    <motion.div 
                      animate={{ y: [0, -5, 0] }} 
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                      className="w-1.5 h-1.5 rounded-full bg-primary/60"
                    />
                    <motion.div 
                      animate={{ y: [0, -5, 0] }} 
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                      className="w-1.5 h-1.5 rounded-full bg-primary/60"
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length < 3 && !isTyping && (
              <div className="px-3 pb-2 pt-2 border-t border-border/20 bg-background/50 flex gap-2 overflow-x-auto scrollbar-none whitespace-nowrap">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(q)}
                    className="text-xs px-2.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors flex-shrink-0"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-3 bg-background/80 border-t border-border/30 backdrop-blur-md">
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Subhan's experience..."
                  className="w-full bg-muted/50 border border-border/50 rounded-full pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-foreground placeholder:text-muted-foreground"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-1.5 p-1.5 rounded-full text-primary hover:bg-primary/10 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
                  <Send size={16} className={inputValue.trim() ? '' : 'text-muted-foreground'} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;

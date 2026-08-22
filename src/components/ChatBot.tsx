import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Send, 
  Trash2, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Bot
} from 'lucide-react';
import { generateChatResponse, ChatMessage } from '@/lib/chatbotEngine';
import { profileKnowledge } from '@/data/profile';

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome-0',
  sender: 'assistant',
  text: `Hi — I'm **Chip**, Subhan's AI portfolio assistant. I can answer questions about his experience, projects, skills, or how to get in touch!`,
  timestamp: new Date(),
  suggestedActions: [
    { label: 'What does Subhan specialize in?', query: 'What does Subhan specialize in?' },
    { label: 'Tell me about his projects', query: 'Tell me about his projects' },
    { label: 'What technologies does he use?', query: 'What technologies does he use?' },
    { label: 'What is his experience?', query: 'What is his experience?' },
    { label: 'Is he available for work?', query: 'Is he available for work?' },
    { label: 'How can I contact him?', query: 'How can I contact him?' },
  ],
};

const CHIP_AVATAR = '/images/chip.jpg';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [imgError, setImgError] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message or loading state change
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isChecking, scrollToBottom]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Handle escape key to close panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend !== undefined ? textToSend : inputValue).trim();
    if (!query || isChecking) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (textToSend === undefined) {
      setInputValue('');
    }
    setIsChecking(true);

    // Responsive delay (350 - 650ms)
    const delay = 380 + Math.random() * 280;
    setTimeout(() => {
      const responseResult = generateChatResponse(query, messages, profileKnowledge);

      const botMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: responseResult.text,
        timestamp: new Date(),
        suggestedActions: responseResult.suggestedActions,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsChecking(false);
    }, delay);
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearConversation = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: `Conversation cleared. How can I help you explore Subhan's portfolio?`,
        timestamp: new Date(),
        suggestedActions: INITIAL_MESSAGE.suggestedActions,
      },
    ]);
  };

  const handleActionClick = (action: { label: string; query?: string; href?: string }) => {
    if (action.href) {
      if (action.href.startsWith('#')) {
        const targetId = action.href.replace('#', '');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const offset = 76;
          const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
          setIsOpen(false);
          return;
        }
      } else {
        window.open(action.href, '_blank', 'noopener,noreferrer');
        return;
      }
    }

    if (action.query) {
      handleSendMessage(action.query);
    }
  };

  // Safe formatting for markdown (links, bold, lists, code) without danger of raw HTML injection
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');

    return lines.map((line, lineIdx) => {
      // Blockquote
      if (line.startsWith('> ')) {
        const quoteContent = line.replace(/^>\s*/, '');
        return (
          <blockquote
            key={`bq-${lineIdx}`}
            className="border-l-2 border-primary/50 pl-3 py-1 my-1.5 text-xs text-foreground/90 italic bg-primary/5 rounded-r"
          >
            {renderInlineSpans(quoteContent)}
          </blockquote>
        );
      }

      // Bullet list item
      if (line.startsWith('• ') || line.startsWith('- ') || line.startsWith('* ')) {
        const itemContent = line.replace(/^[•\-*]\s*/, '');
        return (
          <div key={`li-${lineIdx}`} className="flex items-start gap-2 my-1 text-xs sm:text-[13px] leading-relaxed">
            <span className="text-primary mt-1 text-[8px] flex-shrink-0">●</span>
            <span className="flex-1">{renderInlineSpans(itemContent)}</span>
          </div>
        );
      }

      // Numbered list item
      const numMatch = line.match(/^(\d+)\.\s+(.*)$/);
      if (numMatch) {
        return (
          <div key={`num-${lineIdx}`} className="flex items-start gap-2 my-1.5 text-xs sm:text-[13px] leading-relaxed">
            <span className="font-mono text-primary text-[11px] font-semibold flex-shrink-0 mt-0.5">
              {numMatch[1]}.
            </span>
            <span className="flex-1">{renderInlineSpans(numMatch[2])}</span>
          </div>
        );
      }

      // Spacing
      if (!line.trim()) {
        return <div key={`sp-${lineIdx}`} className="h-2" />;
      }

      // Regular line
      return (
        <p key={`p-${lineIdx}`} className="text-xs sm:text-[13px] leading-relaxed my-0.5">
          {renderInlineSpans(line)}
        </p>
      );
    });
  };

  // Safe inline parser for **bold**, `code`, and [label](url)
  const renderInlineSpans = (text: string) => {
    const regex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (!part) return null;

      // Link: [label](url)
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const label = linkMatch[1];
        const href = linkMatch[2];
        const isAnchor = href.startsWith('#');

        return (
          <a
            key={`inline-link-${index}`}
            href={href}
            onClick={(e) => {
              if (isAnchor) {
                e.preventDefault();
                const targetId = href.replace('#', '');
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                  const offset = 76;
                  const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
                  window.scrollTo({ top, behavior: 'smooth' });
                  setIsOpen(false);
                }
              }
            }}
            target={isAnchor ? undefined : '_blank'}
            rel={isAnchor ? undefined : 'noopener noreferrer'}
            className="inline-flex items-center gap-0.5 text-primary hover:underline font-medium hover:text-primary/90 transition-colors"
          >
            <span>{label}</span>
            {!isAnchor && <ExternalLink size={10} className="inline ml-0.5 opacity-80" />}
          </a>
        );
      }

      // Bold: **bold**
      const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
      if (boldMatch) {
        return (
          <strong key={`inline-bold-${index}`} className="font-semibold text-foreground">
            {boldMatch[1]}
          </strong>
        );
      }

      // Code: `code`
      const codeMatch = part.match(/^`([^`]+)`$/);
      if (codeMatch) {
        return (
          <code
            key={`inline-code-${index}`}
            className="px-1.5 py-0.5 mx-0.5 text-[11px] font-mono bg-surface-2 border border-border/40 text-primary rounded"
          >
            {codeMatch[1]}
          </code>
        );
      }

      return <span key={`inline-text-${index}`}>{part}</span>;
    });
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0.75, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.75, opacity: 0, y: 24 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed z-40 right-4 bottom-6 md:right-6 md:bottom-6"
          >
            <div className="relative group">
              {/* Subtle ambient breathing glow halo */}
              <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-pulse pointer-events-none motion-reduce:hidden" />

              <motion.button
                type="button"
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open Chip AI assistant"
                className="relative flex items-center gap-3 px-4 py-2.5 rounded-full bg-surface-1/95 hover:bg-surface-2 text-foreground border border-primary/40 hover:border-primary/80 shadow-2xl shadow-black/60 backdrop-blur-xl transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                {/* Chip Avatar with glowing ring */}
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-primary shadow-md shadow-primary/20 bg-surface-2 flex-shrink-0 group-hover:border-primary transition-colors">
                  {!imgError ? (
                    <img
                      src={CHIP_AVATAR}
                      alt="Chip AI"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/20 text-primary flex items-center justify-center">
                      <Bot size={20} />
                    </div>
                  )}
                  {/* Active online pulse dot */}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-surface-1 shadow-sm" />
                </div>

                <div className="flex flex-col text-left pr-1">
                  <span className="text-xs font-bold tracking-wide text-foreground flex items-center gap-1.5 group-hover:text-primary transition-colors">
                    Ask Chip
                    <Sparkles size={12} className="text-primary animate-pulse motion-reduce:hidden" />
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground leading-tight">
                    Subhan's AI Assistant
                  </span>
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 35, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            transition={{ type: 'spring', damping: 24, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-label="Chip — AI Portfolio Assistant"
            className="fixed z-50 right-3 bottom-3 sm:right-6 sm:bottom-6 w-[calc(100vw-24px)] sm:w-[415px] max-w-[430px] h-[calc(100vh-32px)] max-h-[640px] flex flex-col rounded-2xl bg-surface-1/95 border border-primary/30 shadow-2xl shadow-black/80 backdrop-blur-2xl overflow-hidden ring-1 ring-primary/20"
          >
            {/* Header */}
            <div className="flex flex-col border-b border-border/40 bg-surface-2/85 px-4 py-3.5 backdrop-blur-md">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  {/* Chip Avatar */}
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-primary/60 flex-shrink-0 bg-surface-3 shadow-md shadow-primary/10">
                    {!imgError ? (
                      <img
                        src={CHIP_AVATAR}
                        alt="Chip AI"
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/20 text-primary flex items-center justify-center">
                        <Bot size={20} />
                      </div>
                    )}
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-surface-2 shadow-sm" />
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="text-sm font-bold text-foreground tracking-tight flex items-center gap-1">
                        Chip
                        <span className="text-[11px] font-normal text-muted-foreground">· Subhan AI</span>
                      </h2>
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-medium bg-primary/15 text-primary border border-primary/25">
                        <ShieldCheck size={10} />
                        Portfolio Knowledge
                      </span>
                    </div>
                  </div>
                </div>

                {/* Header controls */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleClearConversation}
                    aria-label="Clear conversation"
                    title="Clear conversation"
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors focus-visible:ring-1 focus-visible:ring-primary"
                  >
                    <Trash2 size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close Chip assistant"
                    title="Close assistant"
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors focus-visible:ring-1 focus-visible:ring-primary"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>

              {/* Sub-header description */}
              <p className="text-[11px] text-muted-foreground mt-1.5 line-clamp-1 leading-snug">
                Ask Chip about Subhan's experience, projects, skills, availability, or contact.
              </p>

              {/* Verified disclosure */}
              <div className="mt-2 pt-1.5 border-t border-border/20 flex items-center gap-1 text-[10px] font-mono text-muted-foreground/80">
                <span>AI assistant for this portfolio. Answers are based on verified data.</span>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end gap-2 max-w-[92%]">
                    {msg.sender === 'assistant' && (
                      <div className="w-7 h-7 rounded-full overflow-hidden border border-primary/50 flex-shrink-0 mb-1 bg-surface-3 shadow-sm">
                        {!imgError ? (
                          <img
                            src={CHIP_AVATAR}
                            alt="Chip"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">
                            <Bot size={14} />
                          </div>
                        )}
                      </div>
                    )}

                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-foreground transition-all ${
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground font-medium rounded-br-sm shadow-md'
                          : 'bg-surface-2/95 border border-border/45 rounded-bl-sm shadow-sm'
                      }`}
                    >
                      {msg.sender === 'user' ? (
                        <p className="text-xs sm:text-[13px] whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                      ) : (
                        <div>{renderFormattedText(msg.text)}</div>
                      )}
                    </div>
                  </div>

                  {/* Message timestamp */}
                  <span className="text-[9px] font-mono text-muted-foreground/60 px-1 mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>

                  {/* Quick Action Chips attached to message */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                      {msg.suggestedActions.map((action, idx) => (
                        <motion.button
                          key={`${msg.id}-action-${idx}`}
                          type="button"
                          whileHover={{ scale: 1.03, y: -1 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => handleActionClick(action)}
                          className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/25 hover:border-primary/50 transition-all shadow-sm active:scale-95 focus-visible:ring-1 focus-visible:ring-primary text-left"
                        >
                          <span>{action.label}</span>
                          {action.href ? (
                            <ExternalLink size={10} className="opacity-70 flex-shrink-0" />
                          ) : (
                            <ChevronRight size={11} className="opacity-70 flex-shrink-0" />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing / Checking Indicator */}
              {isChecking && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-primary/50 flex-shrink-0 mt-0.5 bg-surface-3 shadow-sm">
                    {!imgError ? (
                      <img
                        src={CHIP_AVATAR}
                        alt="Chip"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">
                        <Bot size={14} />
                      </div>
                    )}
                  </div>
                  <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-surface-2 border border-border/40 flex items-center gap-2 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <motion.span
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                      />
                      <motion.span
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                      />
                      <motion.span
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                      />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      Chip is checking Subhan's portfolio...
                    </span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form Bar */}
            <div className="p-3 border-t border-border/40 bg-surface-2/90">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="relative flex items-end gap-1.5 bg-surface-3/85 border border-border/60 focus-within:border-primary/60 focus-within:ring-1 focus-within:ring-primary/40 rounded-xl p-1.5 transition-all shadow-inner"
              >
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleTextareaKeyDown}
                  placeholder="Ask Chip a question about Subhan..."
                  rows={1}
                  disabled={isChecking}
                  aria-label="Ask Chip AI a question"
                  className="w-full bg-transparent text-xs sm:text-sm text-foreground placeholder:text-muted-foreground resize-none max-h-24 py-1.5 px-2 focus:outline-none scrollbar-none"
                  style={{ minHeight: '34px' }}
                />

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!inputValue.trim() || isChecking}
                  aria-label="Send message to Chip AI"
                  className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:hover:bg-primary transition-all active:scale-95 flex-shrink-0 focus-visible:ring-1 focus-visible:ring-primary shadow-sm"
                >
                  <Send size={14} />
                </motion.button>
              </form>

              <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground/70 px-1 pt-1.5">
                <span>Press Enter to send · Shift+Enter for new line</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;

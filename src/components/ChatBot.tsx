import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Send, 
  Trash2, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { generateChatResponse, ChatMessage } from '@/lib/chatbotEngine';
import { profileKnowledge } from '@/data/profile';
import { MASCOT_ASSETS } from '@/types/mascot';
import { useDragonMascot } from '@/hooks/useDragonMascot';
import DragonMascot from './DragonMascot';
import DragonLauncher from './DragonLauncher';

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome-0',
  sender: 'assistant',
  text: `Hi — I can help you explore Subhan's experience, projects, skills, availability, and contact details.`,
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

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement | null>(null);

  const [anchorPos, setAnchorPos] = useState<{ x: number; y: number } | null>(null);

  // Mascot state controller
  const {
    state: dragonState,
    triggerCurious,
    triggerListening,
    triggerThinking,
    triggerAnswering,
    triggerExcited,
    triggerError,
    triggerIdle,
    wakeUp,
  } = useDragonMascot({ isOpen });

  // Auto-scroll on new message or checking state change
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isChecking, scrollToBottom]);

  // Focus management on open/close
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        textareaRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
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

  const handleOpen = (pos?: { x: number; y: number }) => {
    if (pos) {
      setAnchorPos(pos);
    }
    wakeUp();
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    triggerIdle();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.trim().length > 0) {
      triggerListening();
    }
  };

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
    triggerThinking();

    // Responsive processing delay (380 - 650ms)
    const delay = 380 + Math.random() * 270;
    setTimeout(() => {
      try {
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
        triggerAnswering();
      } catch (err) {
        console.error('Chat error:', err);
        const errorMessage: ChatMessage = {
          id: `assistant-error-${Date.now()}`,
          sender: 'assistant',
          text: `Chip is temporarily unavailable. You can still explore the portfolio or contact Subhan directly.`,
          timestamp: new Date(),
          suggestedActions: [
            { label: 'How can I contact him?', query: 'How can I contact him?' },
            { label: 'Tell me about his projects', query: 'Tell me about his projects' },
          ],
        };
        setMessages((prev) => [...prev, errorMessage]);
        setIsChecking(false);
        triggerError();
      }
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
        text: `Conversation cleared. Hi — I can help you explore Subhan's experience, projects, skills, availability, and contact details.`,
        timestamp: new Date(),
        suggestedActions: INITIAL_MESSAGE.suggestedActions,
      },
    ]);
    triggerIdle();
  };

  const handleActionClick = (action: { label: string; query?: string; href?: string }) => {
    triggerExcited();

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

  // Safe formatting for markdown (links, bold, lists, code)
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

  const isLeft = anchorPos ? anchorPos.x < (typeof window !== 'undefined' ? window.innerWidth / 2 : 500) : false;

  return (
    <>
      {/* Collapsed Floating Dragon Companion Launcher */}
      <DragonLauncher
        isOpen={isOpen}
        state={dragonState}
        onOpen={handleOpen}
        onHover={triggerCurious}
      />

      {/* Expanded Assistant State (Dialog Panel) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 25, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ type: 'spring', damping: 25, stiffness: 340 }}
            role="dialog"
            aria-modal="true"
            aria-label="Chip AI — Subhan's portfolio assistant"
            className={`fixed z-50 bottom-3 sm:bottom-5 ${
              isLeft ? 'left-3 sm:left-6 right-auto' : 'right-3 sm:right-6 left-auto'
            } w-[calc(100vw-24px)] sm:w-[350px] max-w-[360px] h-[calc(100vh-70px)] max-h-[510px] flex flex-col rounded-2xl bg-surface-1/95 border border-cyan-400/40 shadow-2xl shadow-cyan-950/60 backdrop-blur-2xl overflow-hidden ring-1 ring-cyan-500/25`}
          >
            {/* Bioluminescent Dragon Plasma & Flame Embers Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
              {/* Radial bottom flame glow */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-60 h-40 bg-gradient-to-t from-cyan-500/20 via-primary/10 to-transparent blur-2xl rounded-full" />

              {/* Animated Floating Cyan Flame Wisps */}
              <motion.div
                animate={{
                  y: [0, -35, -70],
                  opacity: [0, 0.7, 0],
                  scale: [0.6, 1.2, 0.4],
                  x: [0, 10, -6],
                }}
                transition={{ repeat: Infinity, duration: 3.2, ease: 'easeOut' }}
                className="absolute bottom-2 left-1/4 w-4 h-8 rounded-full bg-gradient-to-t from-cyan-400/40 via-cyan-300/60 to-transparent blur-[3px]"
              />
              <motion.div
                animate={{
                  y: [0, -45, -85],
                  opacity: [0, 0.8, 0],
                  scale: [0.7, 1.4, 0.5],
                  x: [0, -12, 8],
                }}
                transition={{ repeat: Infinity, duration: 2.8, delay: 0.6, ease: 'easeOut' }}
                className="absolute bottom-1 right-1/3 w-5 h-10 rounded-full bg-gradient-to-t from-sky-400/40 via-cyan-400/60 to-transparent blur-[3px]"
              />
              <motion.div
                animate={{
                  y: [0, -40, -80],
                  opacity: [0, 0.6, 0],
                  scale: [0.5, 1.1, 0.3],
                  x: [0, 14, -8],
                }}
                transition={{ repeat: Infinity, duration: 3.6, delay: 1.2, ease: 'easeOut' }}
                className="absolute bottom-3 right-1/4 w-3.5 h-7 rounded-full bg-gradient-to-t from-cyan-500/30 via-primary/50 to-transparent blur-[2px]"
              />
            </div>

            {/* Header */}
            <div className="flex flex-col border-b border-border/40 bg-surface-2/90 px-3.5 py-2.5 backdrop-blur-md">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {/* Living Dragon Mascot in Header Habitat */}
                  <div className="relative w-10 h-10 rounded-xl overflow-visible flex-shrink-0 flex items-center justify-center">
                    <DragonMascot
                      state={dragonState}
                      size="sm"
                      showHalo={false}
                      showLabel={false}
                      altText="Chip AI mascot companion"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-1">
                      <h2 className="text-xs sm:text-sm font-bold text-foreground tracking-tight flex items-center gap-1">
                        Chip AI
                        <span className="text-[10px] font-normal text-muted-foreground">· Subhan's Guide</span>
                      </h2>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="inline-flex items-center gap-0.5 px-1 py-0.2 rounded text-[8px] font-mono font-medium bg-primary/15 text-primary border border-primary/25">
                        <ShieldCheck size={9} />
                        Verified
                      </span>
                      <span className="text-[9px] text-muted-foreground/80 font-mono">
                        Portfolio assistant
                      </span>
                    </div>
                  </div>
                </div>

                {/* Header controls */}
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    onClick={handleClearConversation}
                    aria-label="Reset conversation"
                    title="Reset conversation"
                    className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors focus-visible:ring-1 focus-visible:ring-primary"
                  >
                    <RotateCcw size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close Chip assistant"
                    title="Close assistant"
                    className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors focus-visible:ring-1 focus-visible:ring-primary"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Sub-header disclosure */}
              <div className="mt-1.5 pt-1 border-t border-border/20 flex items-center justify-between text-[9px] font-mono text-muted-foreground/80">
                <span>Grounded portfolio AI</span>
                <span className="text-cyan-400/90 capitalize flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  {dragonState}
                </span>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto px-3 py-2.5 space-y-3 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end gap-1.5 max-w-[94%]">
                    {msg.sender === 'assistant' && (
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-primary/50 flex-shrink-0 mb-1 bg-surface-3 shadow-sm flex items-center justify-center">
                        <DragonMascot
                          state="idle"
                          size="xs"
                          showHalo={false}
                          showLabel={false}
                          altText="Chip AI"
                        />
                      </div>
                    )}

                    <div
                      className={`rounded-2xl px-3 py-2 text-foreground transition-all ${
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground font-medium rounded-br-sm shadow-md'
                          : 'bg-surface-2/95 border border-border/45 rounded-bl-sm shadow-sm'
                      }`}
                    >
                      {msg.sender === 'user' ? (
                        <p className="text-xs whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                      ) : (
                        <div>{renderFormattedText(msg.text)}</div>
                      )}
                    </div>
                  </div>

                  {/* Message timestamp */}
                  <span className="text-[8px] font-mono text-muted-foreground/60 px-1 mt-0.5">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>

                  {/* Quick Action Chips attached to message */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5 max-w-[96%]">
                      {msg.suggestedActions.map((action, idx) => (
                        <motion.button
                          key={`${msg.id}-action-${idx}`}
                          type="button"
                          whileHover={{ scale: 1.03, y: -1 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => handleActionClick(action)}
                          className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/25 hover:border-primary/50 transition-all shadow-sm active:scale-95 focus-visible:ring-1 focus-visible:ring-primary text-left"
                        >
                          <span>{action.label}</span>
                          {action.href ? (
                            <ExternalLink size={9} className="opacity-70 flex-shrink-0" />
                          ) : (
                            <ChevronRight size={10} className="opacity-70 flex-shrink-0" />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing / Checking Indicator with Thinking Dragon */}
              {isChecking && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="flex items-start gap-1.5"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-primary/50 flex-shrink-0 mt-0.5 bg-surface-3 shadow-sm flex items-center justify-center">
                    <DragonMascot
                      state="thinking"
                      size="xs"
                      showHalo={false}
                      showLabel={false}
                      altText="Chip thinking"
                    />
                  </div>
                  <div className="px-3 py-2 rounded-2xl rounded-bl-sm bg-surface-2 border border-border/40 flex items-center gap-2 shadow-sm">
                    <div className="flex items-center gap-1">
                      <motion.span
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                      />
                      <motion.span
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                      />
                      <motion.span
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                      />
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      Chip is checking knowledge...
                    </span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>



            {/* Input Form Bar */}
            <div className="p-2.5 border-t border-border/40 bg-surface-2/90">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="relative flex items-end gap-1.5 bg-surface-3/85 border border-border/60 focus-within:border-cyan-400/60 focus-within:ring-1 focus-within:ring-cyan-400/30 rounded-xl p-1 transition-all shadow-inner"
              >
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleTextareaKeyDown}
                  placeholder="Ask Chip about Subhan..."
                  rows={1}
                  disabled={isChecking}
                  aria-label="Ask Chip AI a question"
                  className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground resize-none max-h-20 py-1 px-2 focus:outline-none scrollbar-none"
                  style={{ minHeight: '30px' }}
                />

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!inputValue.trim() || isChecking}
                  aria-label="Send message to Chip AI"
                  className="p-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:hover:bg-primary transition-all active:scale-95 flex-shrink-0 focus-visible:ring-1 focus-visible:ring-primary shadow-sm"
                >
                  <Send size={13} />
                </motion.button>
              </form>

              <div className="flex items-center justify-between text-[9px] font-mono text-muted-foreground/70 px-1 pt-1">
                <span>Enter to send · Shift+Enter new line</span>
                <span className="text-cyan-400/70">Chip AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
};

export default ChatBot;

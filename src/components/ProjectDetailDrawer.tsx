import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, ArrowRight } from 'lucide-react';
import type { Project } from '@/data/portfolioData';

interface ProjectDetailDrawerProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailDrawer = ({ project, isOpen, onClose }: ProjectDetailDrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Save and restore focus
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap
  const handleTabKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== 'Tab' || !drawerRef.current) return;

      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    []
  );

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Project details: ${project.title}`}
            onKeyDown={handleTabKey}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-[61] h-full w-full max-w-lg overflow-y-auto bg-background border-l border-border/30"
          >
            {/* Close button */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 md:p-6 bg-background/90 backdrop-blur-md border-b border-border/20">
              <span className="eyebrow">{project.category} / {project.year}</span>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                aria-label="Close project details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 md:p-6 space-y-6">
              {/* Project Image */}
              <div className="relative h-48 md:h-56 rounded-lg overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.imageAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
              </div>

              {/* Role */}
              {project.role && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1 font-mono uppercase tracking-wider">Role</h4>
                  <p className="text-sm text-muted-foreground">{project.role}</p>
                </div>
              )}

              {/* Problem */}
              {project.problem && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1 font-mono uppercase tracking-wider">Problem</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
                </div>
              )}

              {/* Solution */}
              {project.solution && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1 font-mono uppercase tracking-wider">Solution</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
                </div>
              )}

              {/* Impact */}
              {project.impact && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1 font-mono uppercase tracking-wider">Outcome</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.impact}</p>
                </div>
              )}

              {/* Tech Stack */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2 font-mono uppercase tracking-wider">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono bg-primary/8 text-primary border border-primary/15 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              {project.features && project.features.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2 font-mono uppercase tracking-wider">Key Features</h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ArrowRight size={14} className="text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Links */}
              <div className="flex gap-3 pt-4 border-t border-border/30">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm px-5 py-2.5 inline-flex items-center gap-2"
                  >
                    <ExternalLink size={15} />
                    Live Demo
                  </a>
                )}
                {project.codeUrl && (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-sm px-5 py-2.5 inline-flex items-center gap-2"
                  >
                    <Github size={15} />
                    Source Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailDrawer;

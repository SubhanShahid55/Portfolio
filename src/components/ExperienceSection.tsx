import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar, MapPin, ChevronDown, Check } from 'lucide-react';
import portfolioData from '@/data/portfolioData';
import SectionHeading from './SectionHeading';

const ExperienceSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'Brawse': true, // Keep recent role open by default
  });

  const toggleExpand = (company: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [company]: !prev[company],
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="experience" className="section-container">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <SectionHeading
          number="02"
          eyebrow="EXPERIENCE"
          title="Career &"
          highlight="contributions."
          subtitle="A track record of shipping software across startups, digital banking, browser extensions, and agency clients."
        />

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto lg:mx-0">
          {/* Vertical Timeline Track */}
          <div className="absolute left-[8px] sm:left-[9px] top-3 bottom-4 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent pointer-events-none" />

          <div className="space-y-6">
            {portfolioData.experience.map((exp) => {
              const isExpanded = !!expandedIds[exp.company];
              const isCurrent = exp.current || exp.status === 'Current';
              const initialHighlights = exp.highlights.slice(0, 2);
              const remainingHighlights = exp.highlights.slice(2);

              return (
                <motion.div
                  key={`${exp.company}-${exp.title}`}
                  variants={itemVariants}
                  className="relative pl-8 sm:pl-10"
                >
                  {/* Timeline Dot of Tick for Completed Works */}
                  <div
                    className={`absolute left-0 top-1 w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-primary border-primary shadow-[0_0_12px_hsla(187,80%,48%,0.5)] text-primary-foreground'
                        : 'bg-card border-primary/50 text-primary shadow-[0_0_8px_hsla(187,80%,48%,0.25)]'
                    }`}
                    title={isCurrent ? 'Current role' : 'Completed role'}
                  >
                    {isCurrent ? (
                      <div className="w-2 h-2 rounded-full bg-primary-foreground animate-ping" />
                    ) : (
                      <Check size={11} strokeWidth={3} className="text-primary" />
                    )}
                  </div>

                  {/* Experience Card */}
                  <div className={`glass-card p-5 sm:p-6 transition-all duration-300 ${
                    isCurrent ? 'border-primary/40' : 'border-border/40 hover:border-primary/30'
                  }`}>
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          {/* Status Badge with Checkmark */}
                          <span
                            className={`px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider rounded-full inline-flex items-center gap-1 ${
                              isCurrent
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                : 'bg-primary/10 text-primary border border-primary/25'
                            }`}
                          >
                            {!isCurrent && <Check size={10} strokeWidth={3} className="text-primary" />}
                            <span>{isCurrent ? 'Current' : 'Completed'}</span>
                          </span>
                          <span className="px-2 py-0.5 text-[10px] font-mono text-muted-foreground bg-surface-2 rounded border border-border/20">
                            {exp.type}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-foreground leading-tight">
                          {exp.title}{' '}
                          <span className="text-primary font-medium">@ {exp.company}</span>
                        </h3>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-primary/70" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} className="text-primary/70" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3.5 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Initial 1-2 Strongest Highlights */}
                    <ul className="space-y-1.5 mb-3.5">
                      {initialHighlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs sm:text-sm text-foreground/90 leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Expandable Remaining Highlights */}
                    <AnimatePresence initial={false}>
                      {isExpanded && remainingHighlights.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <ul className="space-y-1.5 mb-3.5 pt-1 border-t border-border/20">
                            {remainingHighlights.map((highlight, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground leading-relaxed"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0 mt-2" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Footer Row: Tech Tags & Expand Toggle */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/20">
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[10px] font-mono bg-surface-2 text-muted-foreground rounded border border-border/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Expand / Collapse Button */}
                      {remainingHighlights.length > 0 && (
                        <button
                          onClick={() => toggleExpand(exp.company)}
                          className="text-xs font-mono uppercase tracking-wider text-primary hover:text-accent transition-colors inline-flex items-center gap-1 font-medium ml-auto"
                          aria-expanded={isExpanded}
                          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} details for ${exp.company}`}
                        >
                          <span>{isExpanded ? 'Show Less' : `+${remainingHighlights.length} More Highlights`}</span>
                          <ChevronDown
                            size={14}
                            className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;

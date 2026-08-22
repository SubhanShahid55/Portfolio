import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote, Linkedin, ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import portfolioData from '@/data/portfolioData';
import type { Testimonial } from '@/data/portfolioData';
import SectionHeading from './SectionHeading';

const TestimonialsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const testimonials = portfolioData.testimonials.filter(
    (t) => t.permissionToPublish
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="testimonials" className="section-container">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <SectionHeading
          number="03"
          eyebrow="TESTIMONIALS"
          title="Collaborator &"
          highlight="client feedback."
          subtitle="Direct observations and reviews from engineering teams, agency leads, and freelance clients."
        />

        {/* Testimonials Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {testimonials.map((item: Testimonial) => (
            <motion.article
              key={item.id}
              variants={itemVariants}
              className="glass-card p-6 flex flex-col justify-between hover:border-primary/40 transition-all duration-300 shadow-lg shadow-black/20 group"
            >
              <div>
                {/* Header Tag & Relationship Badge */}
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-border/20">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                    {item.project || 'Engineering Work'}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                    {item.relationship}
                  </span>
                </div>

                {/* Restrained Quote */}
                <div className="relative mb-6">
                  <Quote size={20} className="text-primary/30 mb-2" />
                  <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>
              </div>

              {/* Author & Verification Footer */}
              <div className="pt-4 border-t border-border/20 flex items-center gap-3">
                {/* Initials Avatar */}
                <div className="w-8 h-8 rounded-md bg-surface-2 border border-border/40 flex items-center justify-center font-mono font-bold text-xs text-primary flex-shrink-0 group-hover:border-primary/40 transition-colors">
                  {item.avatarInitials || item.name.slice(0, 2).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-foreground truncate flex items-center gap-1">
                    <span>{item.name}</span>
                    <CheckCircle2 size={12} className="text-primary flex-shrink-0" />
                  </h4>
                  <p className="text-[11px] font-mono text-muted-foreground truncate">
                    {item.role} {item.company && `· ${item.company}`}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Verification & Reference Note */}
        <motion.div
          variants={itemVariants}
          className="glass-card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-primary/20 bg-surface-1/40"
        >
          <div className="flex items-center gap-3">
            <ShieldCheck size={18} className="text-primary flex-shrink-0" />
            <p className="text-xs text-muted-foreground font-mono">
              Direct recommendations and past manager references can be verified on LinkedIn.
            </p>
          </div>

          <a
            href="https://www.linkedin.com/in/muhammad-subhan-shahid-564160384/details/recommendations/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-xs font-mono uppercase tracking-wider px-3.5 py-1.5 inline-flex items-center gap-1.5 flex-shrink-0"
            aria-label="View verified recommendations on LinkedIn"
          >
            <Linkedin size={13} />
            <span>LinkedIn Recommendations</span>
            <ArrowUpRight size={12} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;

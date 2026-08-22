import { motion, Easing } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar, ChevronRight, MapPin, ExternalLink } from 'lucide-react';
import portfolioData from '@/data/portfolioData';

const ExperienceSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const easeOut: Easing = [0.16, 1, 0.3, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
  };

  return (
    <section id="experience" className="section-container">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-14">
          <h2 className="section-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            My professional journey in software engineering
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />

          {portfolioData.experience.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.title}`}
              variants={itemVariants}
              className="relative mb-8 last:mb-0"
            >
              {/* Timeline Dot */}
              <div
                className={`absolute left-4 md:left-8 w-3 h-3 -translate-x-1/2 rounded-full mt-2 ${
                  exp.current ? 'bg-primary' : 'bg-muted-foreground/40'
                }`}
                style={{
                  boxShadow: exp.current ? '0 0 12px hsla(190, 100%, 50%, 0.5)' : 'none',
                }}
              >
                {exp.current && (
                  <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
                )}
              </div>

              {/* Content Card */}
              <div className={`glass-card p-6 md:p-7 ml-10 md:ml-16 ${index === 0 ? 'border-primary/30' : ''}`}>
                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {exp.current && (
                    <span className="px-3 py-0.5 text-xs font-semibold bg-primary/15 text-primary rounded-full">
                      Current
                    </span>
                  )}
                  <span className="px-3 py-0.5 text-xs font-medium bg-muted/60 text-muted-foreground rounded-full">
                    {exp.type}
                  </span>
                </div>

                {/* Header */}
                <h3 className="text-xl font-bold text-foreground mb-1">{exp.title}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm mb-3">
                  <div className="flex items-center gap-1.5 text-primary font-medium">
                    {exp.logo ? (
                      <img src={exp.logo} alt={exp.company} className="h-4 w-auto object-contain" />
                    ) : (
                      <Briefcase size={14} />
                    )}
                    <span>{exp.company}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin size={13} />
                    <span>{exp.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar size={13} />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4">{exp.description}</p>

                {/* Highlights */}
                <ul className="space-y-2 mb-4">
                  {exp.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <ChevronRight size={14} className="text-primary flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs bg-muted/50 text-muted-foreground rounded-md border border-border/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;

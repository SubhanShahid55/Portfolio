import { motion, Easing } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';

const experiences = [
  {
    title: 'Freelance Full-Stack Developer',
    company: 'Devmerce',
    period: 'January 2025 - Present',
    description: 'Delivering cutting-edge web solutions for international clients',
    highlights: [
      'Delivered web solutions for 15+ international clients across e-commerce, healthcare, and fintech',
      'Generated 500+ qualified B2B leads monthly with 15% conversion rate',
      'Led cross-functional teams of 5-8 freelancers achieving 95% on-time delivery',
    ],
    current: true,
  },
  {
    title: 'Backend Developer Intern',
    company: 'Smile Check AI',
    period: 'June 2024 - August 2024',
    description: 'Engineered high-performance Rust backend services for AI diagnostics',
    highlights: [
      'Engineered Rust backend services processing 10,000+ daily AI diagnostic requests with 99.8% uptime',
      'Reduced API latency by 30% through PostgreSQL optimization and Redis caching',
      'Collaborated with 8-member Agile team, conducted code reviews and pair programming',
    ],
    current: false,
  },
];

const ExperienceSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const easeOut: Easing = [0.16, 1, 0.3, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } },
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
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="section-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            My professional journey in software development and technical innovation
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              variants={itemVariants}
              className={`relative mb-12 md:mb-16 ${
                index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'
              }`}
            >
              {/* Timeline Dot */}
              <div
                className={`absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full ${
                  exp.current ? 'bg-primary animate-pulse-glow' : 'bg-muted'
                }`}
                style={{ boxShadow: exp.current ? '0 0 20px hsla(190, 100%, 50%, 0.5)' : 'none' }}
              />

              {/* Content Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className={`glass-card p-6 ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                }`}
              >
                {/* Current Badge */}
                {exp.current && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full mb-3">
                    Current
                  </span>
                )}

                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                    <div className="flex items-center gap-2 text-primary">
                      <Briefcase size={16} />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar size={14} />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-4">{exp.description}</p>

                {/* Highlights */}
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <ChevronRight size={16} className="text-primary flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;

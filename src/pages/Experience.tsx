import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar, ChevronRight, MapPin } from 'lucide-react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import TechIcon from '@/components/TechIcon';

const experiences = [
  {
    title: 'Freelance Full-Stack Developer',
    company: 'Devmerce',
    location: 'Remote',
    period: 'January 2025 - Present',
    description: 'Delivering cutting-edge web solutions for international clients across multiple industries.',
    highlights: [
      'Delivered web solutions for 15+ international clients across e-commerce, healthcare, and fintech',
      'Generated 500+ qualified B2B leads monthly with 15% conversion rate',
      'Led cross-functional teams of 5-8 freelancers achieving 95% on-time delivery',
      'Implemented CI/CD pipelines reducing deployment time by 40%',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'TypeScript'],
    current: true,
  },
  {
    title: 'Backend Developer Intern',
    company: 'Smile Check AI',
    location: 'Remote',
    period: 'June 2024 - August 2024',
    description: 'Engineered high-performance Rust backend services for AI diagnostics platform.',
    highlights: [
      'Engineered Rust backend services processing 10,000+ daily AI diagnostic requests with 99.8% uptime',
      'Reduced API latency by 30% through PostgreSQL optimization and Redis caching',
      'Collaborated with 8-member Agile team, conducted code reviews and pair programming',
      'Developed comprehensive API documentation improving developer onboarding time by 50%',
    ],
    technologies: ['Rust', 'PostgreSQL', 'Docker', 'AWS'],
    current: false,
  },
];

const Experience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <Layout>
      <SEOHead
        title="Work Experience"
        description="Professional experience of Muhammad Subhan Shahid in software development, including roles at Devmerce and Smile Check AI."
        canonical="https://subhansportfolio.vercel.app/experience"
      />

      <section className="section-container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="section-title">
              Work <span className="gradient-text">Experience</span>
            </h1>
            <p className="section-subtitle max-w-2xl mx-auto">
              My professional journey in software development and technical innovation
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full" />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                variants={itemVariants}
                className={`relative mb-12 ${
                  index % 2 === 0 ? 'md:pr-[50%]' : 'md:pl-[50%]'
                }`}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full ${
                    exp.current ? 'bg-primary' : 'bg-muted'
                  }`}
                  style={{
                    boxShadow: exp.current ? '0 0 20px hsla(190, 100%, 50%, 0.5), 0 0 40px hsla(190, 100%, 50%, 0.3)' : 'none',
                  }}
                >
                  {exp.current && (
                    <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                  )}
                </div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`glass-card p-6 md:p-8 ml-12 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                  }`}
                >
                  {/* Current Badge */}
                  {exp.current && (
                    <span className="inline-block px-4 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full mb-4">
                      🟢 Currently Working
                    </span>
                  )}

                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{exp.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-primary font-medium">
                        <Briefcase size={16} />
                        <span>{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar size={14} />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6">{exp.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {exp.technologies.map((tech) => (
                      <TechIcon key={tech} name={tech} size="sm" />
                    ))}
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-3">
                    {exp.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
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
    </Layout>
  );
};

export default Experience;

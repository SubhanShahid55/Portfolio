import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Calendar, ExternalLink } from 'lucide-react';

const certifications = [
  {
    title: 'MEAN Stack Development Bootcamp',
    issuer: 'Hami Trainings',
    date: 'January 2025',
    description: 'Comprehensive bootcamp covering MongoDB, Express, Angular, and Node.js full-stack development.',
  },
  {
    title: 'Professional Digital Marketing Certification',
    issuer: 'Industry Certification',
    date: 'January 2024',
    description: 'Advanced digital marketing strategies including SEO, SEM, social media marketing, and analytics.',
  },
];

const CertificationsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="section-container">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="section-title">
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Professional certifications and continuous learning achievements
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card p-6 group"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Award className="w-7 h-7 text-primary" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {cert.title}
              </h3>

              {/* Issuer & Date */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="text-muted-foreground">{cert.issuer}</span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar size={14} />
                  {cert.date}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4">{cert.description}</p>

              {/* View Certificate Link */}
              <motion.a
                href="#"
                whileHover={{ x: 5 }}
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors"
              >
                View Certificate
                <ExternalLink size={14} />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CertificationsSection;

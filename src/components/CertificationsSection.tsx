import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Calendar } from 'lucide-react';
import portfolioData from '@/data/portfolioData';

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
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Sort certifications so primary ones appear first
  const sortedCertifications = [...portfolioData.certifications].sort((a, b) => {
    if (a.relevance === 'primary' && b.relevance === 'secondary') return -1;
    if (a.relevance === 'secondary' && b.relevance === 'primary') return 1;
    return 0;
  });

  return (
    <section id="certifications" className="section-container">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="section-title">
            <span className="gradient-text">Certifications</span>
          </h2>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {sortedCertifications.map((cert) => (
            <motion.div
              key={cert.title}
              variants={itemVariants}
              className={`glass-card p-6 ${cert.relevance === 'primary' ? 'border-primary/20 bg-primary/5' : ''}`}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground leading-tight mb-1">
                    {cert.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                    <span className="font-medium">{cert.issuer}</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      {cert.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {cert.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CertificationsSection;

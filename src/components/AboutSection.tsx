import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, Users, Trophy, Zap, Target } from 'lucide-react';

const skills = {
  languages: [
    { name: 'Python', level: 90 },
    { name: 'JavaScript/TypeScript', level: 95 },
    { name: 'PHP', level: 75 },
    { name: 'Rust', level: 70 },
    { name: 'C/C++', level: 65 },
  ],
  frontend: [
    { name: 'React', level: 95 },
    { name: 'Angular', level: 85 },
    { name: 'HTML5/CSS3', level: 95 },
  ],
  backend: [
    { name: 'Node.js/Express', level: 90 },
    { name: 'Flask/Django', level: 80 },
    { name: 'RESTful APIs', level: 95 },
  ],
  databases: [
    { name: 'MongoDB', level: 90 },
    { name: 'PostgreSQL', level: 85 },
    { name: 'MySQL', level: 80 },
  ],
  devops: [
    { name: 'Docker', level: 75 },
    { name: 'AWS', level: 80 },
    { name: 'Git', level: 95 },
  ],
};

const stats = [
  { icon: Users, value: '15+', label: 'Client Projects' },
  { icon: Trophy, value: '$25K+', label: 'Revenue Generated' },
  { icon: Target, value: '100%', label: 'Client Satisfaction' },
  { icon: Zap, value: '30%', label: 'Latency Reduction' },
];

const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-foreground">{name}</span>
        <span className="text-sm text-primary">{level}%</span>
      </div>
      <div className="skill-bar">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: level / 100 } : { scaleX: 0 }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className="skill-bar-fill"
        />
      </div>
    </div>
  );
};

const AboutSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="section-container">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            A passionate Software Engineering student specializing in building scalable web applications and AI-powered systems
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card p-6 text-center"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
              <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* About Text */}
        <motion.div variants={itemVariants} className="glass-card p-8 mb-16">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            I'm a dedicated Software Engineering student with a passion for creating innovative digital solutions. 
            My expertise spans full-stack development using the MEAN stack, Python for machine learning applications, 
            and high-performance backend systems with Rust.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            With over <span className="text-primary font-semibold">15+ client projects delivered</span> and{' '}
            <span className="text-primary font-semibold">$25K+ in revenue generated</span>, I've proven my ability 
            to deliver results that matter. My technical achievements include reducing API latency by 30% and 
            building fraud detection systems with 95% accuracy.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Download size={18} />
            Download Resume
          </motion.button>
        </motion.div>

        {/* Skills Grid */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold text-center mb-8">
            Technical <span className="gradient-text">Skills</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList], categoryIndex) => (
              <div key={category} className="glass-card p-6">
                <h4 className="text-lg font-semibold text-primary capitalize mb-4">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                {skillList.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={categoryIndex * 0.1 + skillIndex * 0.05}
                  />
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;

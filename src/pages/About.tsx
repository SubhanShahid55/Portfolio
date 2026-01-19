import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, Users, Trophy, Zap, Target, Palette, Code, Wrench, Monitor } from 'lucide-react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import portfolioData from '@/data/portfolioData';
import logoImage from '@/assets/logo.png';

const categoryIcons: Record<string, React.ElementType> = {
  Development: Monitor,
  Programming: Code,
  Design: Palette,
  Tools: Wrench,
};

const stats = [
  { icon: Users, value: '6+', label: 'Projects Completed' },
  { icon: Trophy, value: '10+', label: 'Happy Clients' },
  { icon: Target, value: '100%', label: 'Client Satisfaction' },
  { icon: Zap, value: '2+', label: 'Years Experience' },
];

const SkillBar = ({ name, level, imageUrl, delay }: { name: string; level: number; imageUrl: string; delay: number }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <img src={imageUrl} alt={name} className="w-5 h-5" />
          <span className="text-sm text-foreground font-medium">{name}</span>
        </div>
        <span className="text-sm text-primary font-semibold">{level}%</span>
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

const About = () => {
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

  // Group skills by category
  const skillsByCategory = portfolioData.skills.categories.reduce((acc, category) => {
    acc[category] = portfolioData.skills.skills.filter(skill => skill.category === category);
    return acc;
  }, {} as Record<string, typeof portfolioData.skills.skills>);

  return (
    <Layout>
      <SEOHead
        title="About Me"
        description={portfolioData.about.bio}
        canonical="https://subhansportfolio.vercel.app/about"
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
              About <span className="gradient-text">Me</span>
            </h1>
            <p className="section-subtitle max-w-2xl mx-auto">
              A passionate Freelance Web Developer specializing in creating modern web applications
            </p>
          </motion.div>

          {/* Profile Section */}
          <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Image */}
            <div className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl blur-2xl" />
                <div className="relative glass-card p-4 rounded-2xl">
                  <img
                    src={logoImage}
                    alt={portfolioData.hero.name}
                    className="w-full max-w-md rounded-xl object-contain"
                  />
                </div>
              </motion.div>
            </div>

            {/* Bio */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-6">
                Hello! I'm <span className="gradient-text">Subhan</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {portfolioData.about.bio}
              </p>
              
              {/* Values */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {portfolioData.about.values.map((value) => (
                  <div key={value.title} className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="text-sm font-semibold text-primary mb-1">{value.title}</h4>
                    <p className="text-xs text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
              
              <a href="/Muhammad_Subhan_CV.pdf" download>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Download size={18} />
                  Download Resume
                </motion.button>
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {stats.map((stat) => (
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

          {/* Skills Grid */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-center mb-8">
              Technical <span className="gradient-text">Skills</span>
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {portfolioData.skills.categories.map((category, categoryIndex) => {
                const IconComponent = categoryIcons[category] || Code;
                const categorySkills = skillsByCategory[category] || [];
                
                return (
                  <motion.div 
                    key={category} 
                    whileHover={{ y: -5 }}
                    className="glass-card p-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="text-lg font-semibold text-primary capitalize">
                        {category}
                      </h4>
                    </div>
                    {categorySkills.map((skill, skillIndex) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        imageUrl={skill.imageUrl}
                        delay={categoryIndex * 0.1 + skillIndex * 0.05}
                      />
                    ))}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default About;

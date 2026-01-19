import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Instagram, MapPin, Download } from 'lucide-react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import portfolioData from '@/data/portfolioData';
import logoImage from '@/assets/logo.png';

const Home = () => {
  const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  const stats = [
    { value: '6+', label: 'Projects Completed' },
    { value: '10+', label: 'Happy Clients' },
    { value: '100%', label: 'Client Satisfaction' },
    { value: '2+', label: 'Years Experience' },
  ];

  return (
    <Layout>
      <SEOHead
        title="Freelance Web Developer"
        description={portfolioData.hero.description}
        canonical="https://subhanshahidportfolio.vercel.app/"
      />
      
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 md:px-6 z-10"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Location Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
              >
                <MapPin size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">{portfolioData.contact.location}</span>
              </motion.div>

              {/* Name */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              >
                <span className="block text-foreground mb-2">Hi, I'm</span>
                <span className="gradient-text leading-tight">{portfolioData.hero.name}</span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-muted-foreground mb-4 max-w-xl"
              >
                {portfolioData.hero.title}
              </motion.p>

              {/* Typing Animation */}
              <motion.div
                variants={itemVariants}
                className="h-10 mb-8"
              >
                <TypeAnimation
                  sequence={[
                    'React Developer',
                    2000,
                    'JavaScript Expert',
                    2000,
                    'UI/UX Designer',
                    2000,
                    'Frontend Specialist',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  className="text-lg md:text-xl font-mono text-primary"
                  repeat={Infinity}
                />
                <span className="text-lg md:text-xl font-mono text-primary animate-pulse ml-1">|</span>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-8"
              >
                <Link to="/projects">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                  >
                    View Projects
                  </motion.button>
                </Link>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-outline"
                  >
                    Contact Me
                  </motion.button>
                </Link>
                <a href="/Muhammad_Subhan_CV.pdf" download>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-outline inline-flex items-center gap-2"
                  >
                    <Download size={18} />
                    Download CV
                  </motion.button>
                </a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center lg:justify-start gap-4"
              >
                {portfolioData.contact.socials.linkedin && (
                  <motion.a
                    href={portfolioData.contact.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 glass-card rounded-full text-muted-foreground hover:text-primary transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={24} />
                  </motion.a>
                )}
                {portfolioData.contact.socials.instagram && (
                  <motion.a
                    href={portfolioData.contact.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 glass-card rounded-full text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Instagram Profile"
                  >
                    <Instagram size={24} />
                  </motion.a>
                )}
                {portfolioData.contact.socials.github && (
                  <motion.a
                    href={portfolioData.contact.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 glass-card rounded-full text-muted-foreground hover:text-primary transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <Github size={24} />
                  </motion.a>
                )}
                {/* Floating WhatsApp button is rendered globally in Layout */}
              </motion.div>
            </div>

            {/* Right Content - Profile Image */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Decorative rings */}
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse scale-110" />
                <div className="absolute inset-0 rounded-full border border-primary/10 animate-pulse scale-125" style={{ animationDelay: '0.5s' }} />
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-2xl" />
                
                {/* Image container */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden glass-card p-2"
                >
                  <img
                    src={logoImage}
                    alt={portfolioData.hero.name}
                    className="w-full h-full object-contain rounded-full"
                  />
                </motion.div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 glass-card px-4 py-2 rounded-full"
                >
                  <span className="text-sm font-medium text-primary">🚀 Open to Work</span>
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  className="absolute -bottom-4 -left-4 glass-card px-4 py-2 rounded-full"
                >
                  <span className="text-sm font-medium text-primary">💼 6+ Projects</span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="glass-card p-4 text-center"
              >
                <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </section>
    </Layout>
  );
};

export default Home;

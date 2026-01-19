import { motion, Easing } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, MapPin, ChevronDown, Instagram } from 'lucide-react';
import logoImage from '@/assets/logo.png';

const HeroSection = () => {
  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const easeOut: Easing = [0.16, 1, 0.3, 1];

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

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse animate-delay-500" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 md:px-6 text-center z-10"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="mb-6">
          <img 
            src={logoImage} 
            alt="Muhammad Subhan Shahid" 
            className="w-32 h-32 md:w-40 md:h-40 mx-auto object-contain"
          />
        </motion.div>

        {/* Location Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
        >
          <MapPin size={16} className="text-primary" />
          <span className="text-sm text-muted-foreground">Rawalpindi, Pakistan</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="block text-foreground">Hi, I'm</span>
          <span className="gradient-text">Muhammad Subhan Shahid</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto"
        >
          Full-Stack Developer | AI Solutions Architect | Digital Innovator
        </motion.p>

        {/* Typing Animation */}
        <motion.div
          variants={itemVariants}
          className="h-12 mb-10"
        >
          <TypeAnimation
            sequence={[
              'MEAN Stack',
              2000,
              'Python',
              2000,
              'Rust',
              2000,
              'Machine Learning',
              2000,
            ]}
            wrapper="span"
            speed={50}
            className="text-xl md:text-2xl font-mono text-primary"
            repeat={Infinity}
          />
          <span className="text-xl md:text-2xl font-mono text-primary animate-pulse ml-1">|</span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <motion.button
            onClick={scrollToProjects}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            View Projects
          </motion.button>
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-outline"
          >
            Contact Me
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-6"
        >
          <motion.a
            href="https://www.linkedin.com/in/muhammad-subhan-shahid-564160384/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 glass-card rounded-full text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin size={24} />
          </motion.a>
          <motion.a
            href="https://instagram.com/iamsubhanshahid"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 glass-card rounded-full text-muted-foreground hover:text-primary transition-colors"
          >
            <Instagram size={24} />
          </motion.a>
          <motion.a
            href="https://github.com/SubhanShahid55"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 glass-card rounded-full text-muted-foreground hover:text-primary transition-colors"
          >
            <Github size={24} />
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-muted-foreground"
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

import { motion, Easing } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Mail, Download, ArrowDown } from 'lucide-react';
import portfolioData from '@/data/portfolioData';
import WhatsAppIcon from './WhatsAppIcon';

const HeroSection = () => {
  const easeOut: Easing = [0.16, 1, 0.3, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  const scrollToProjects = () => {
    const el = document.querySelector('#projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-12 md:py-20">
      {/* Subtle background glow */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-accent/8 rounded-full blur-[100px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 md:px-6 z-10"
      >
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left Content — 3 cols */}
          <div className="lg:col-span-3 text-center lg:text-left">
            {/* Status Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/5 mb-6"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-sm text-green-400 font-medium">{portfolioData.personal.availability}</span>
            </motion.div>

            {/* Name & Title */}
            <motion.h1
              variants={itemVariants}
              className="mb-4"
            >
              <span className="block text-lg sm:text-xl text-muted-foreground font-medium mb-2">
                Hi, I'm
              </span>
              <span className="gradient-text block text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl leading-tight font-bold mb-3">
                {portfolioData.personal.shortName}
              </span>
              <span className="block text-lg sm:text-xl md:text-2xl text-foreground/90 font-semibold">
                {portfolioData.personal.title}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-4 leading-relaxed"
            >
              {portfolioData.personal.subtitle}
            </motion.p>

            {/* Typing Animation */}
            <motion.div
              variants={itemVariants}
              className="h-8 mb-8"
            >
              <TypeAnimation
                sequence={[
                  'React Developer',
                  2000,
                  'Next.js Developer',
                  2000,
                  'Full-Stack Engineer',
                  2000,
                  'MERN Stack Developer',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                className="text-base md:text-lg font-mono text-primary/80"
                repeat={Infinity}
              />
              <span className="text-base md:text-lg font-mono text-primary/60 animate-pulse ml-0.5">|</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 mb-8"
            >
              <motion.button
                onClick={scrollToProjects}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary inline-flex items-center gap-2"
              >
                View My Work
                <ArrowDown size={16} />
              </motion.button>
              <a href={portfolioData.personal.resumeUrl} download>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-outline inline-flex items-center gap-2"
                >
                  <Download size={16} />
                  Download Resume
                </motion.button>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              <a
                href={portfolioData.personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a
                href={portfolioData.personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="p-2.5 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href={portfolioData.personal.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* Right Content — Profile Image — 2 cols */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Subtle glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-accent/10 rounded-2xl blur-2xl scale-105" />

              {/* Image container */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden glass-card p-1.5"
              >
                <img
                  src={portfolioData.personal.profileImage}
                  alt={portfolioData.personal.name}
                  className="w-full h-full object-contain rounded-xl"
                  loading="eager"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

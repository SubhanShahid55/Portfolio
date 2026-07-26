import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Quote,
  Zap,
  Globe,
  Shield,
  Code,
  Layers,
} from 'lucide-react';

import SEOHead from '@/components/SEOHead';

const stackItems = [
  {
    letter: 'M',
    name: 'MongoDB',
    description:
      'NoSQL database for flexible, scalable data storage. I design optimized schemas, implement indexing strategies, and build aggregation pipelines for complex data operations.',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg',
    color: 'from-green-500 to-emerald-600',
    features: [
      'Schema design & data modeling',
      'Aggregation pipelines',
      'Indexing & query optimization',
      'Atlas cloud deployment',
    ],
  },
  {
    letter: 'E',
    name: 'Express.js',
    description:
      'Minimalist Node.js framework for building robust APIs. I create RESTful services with middleware architecture, authentication, and error handling best practices.',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg',
    color: 'from-gray-400 to-gray-600',
    features: [
      'RESTful API architecture',
      'Middleware & authentication',
      'Error handling & logging',
      'Rate limiting & security',
    ],
  },
  {
    letter: 'R',
    name: 'React',
    description:
      'The most popular frontend library for building dynamic user interfaces. I create performant SPAs with hooks, context, React Router, and modern component patterns.',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
    color: 'from-cyan-400 to-blue-500',
    features: [
      'Component-based architecture',
      'Hooks & custom hooks',
      'React Router & SPA navigation',
      'State management (Context, Redux, Zustand)',
    ],
  },
  {
    letter: 'N',
    name: 'Node.js',
    description:
      'JavaScript runtime for server-side development. I build event-driven, non-blocking I/O applications that handle thousands of concurrent connections efficiently.',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
    color: 'from-green-600 to-lime-500',
    features: [
      'Event-driven architecture',
      'Real-time with WebSockets',
      'Microservices & scaling',
      'CI/CD & deployment',
    ],
  },
];

const benefits = [
  {
    icon: Zap,
    title: 'Unified JavaScript',
    description:
      'One language across the entire stack means faster development, easier debugging, and seamless data flow from database to browser.',
  },
  {
    icon: Globe,
    title: 'Real-Time Capable',
    description:
      'Node.js event-driven architecture enables real-time features like live chat, notifications, and collaborative editing out of the box.',
  },
  {
    icon: Shield,
    title: 'Battle-Tested at Scale',
    description:
      "React powers Facebook, Instagram, Netflix, and Airbnb. Combined with Node.js and MongoDB, the MERN stack handles enterprise-scale traffic effortlessly.",
  },
  {
    icon: Layers,
    title: 'JSON Everywhere',
    description:
      'MongoDB stores JSON documents, Express/Node handle JSON natively, and React consumes JSON APIs — zero data transformation friction.',
  },
];

const projects = [
  {
    title: 'Digital Media Archive (FYP)',
    description:
      'A full-stack media management platform with secure upload, download, and viewing capabilities. Built with React and modern JavaScript technologies.',
    tags: ['React', 'Full-Stack', 'Media Management'],
    demoUrl: 'https://digitalmediaarchive.vercel.app/',
  },
  {
    title: 'Homixa — Home Services Platform',
    description:
      'A comprehensive home services website with service listings, booking flows, and contact management. Demonstrates full-stack development with API integrations.',
    tags: ['Business Website', 'API Integration', 'Responsive'],
    demoUrl: 'https://www.homixaleads.online/',
  },
  {
    title: 'Meme Coins Agent — Crypto Platform',
    description:
      'Real-time cryptocurrency data platform with market analysis, live price feeds, and data visualization. Showcases real-time data handling and API consumption.',
    tags: ['Real-Time Data', 'API Integration', 'Dashboard'],
    demoUrl: 'https://memecoinsagent.info/',
  },
];

const MernStack = () => {
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
    <>
      <SEOHead
        title="MERN Stack Development Services"
        description="Expert freelance MERN Stack developer offering MongoDB, Express.js, React, and Node.js development services. Building scalable, real-time web applications."
        canonical="https://subhanshahidportfolio.vercel.app/mern-stack"
      />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 md:px-6 z-10 text-center"
        >
          <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary font-medium mb-6">
            🚀 Full-Stack JavaScript Development
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">MERN Stack</span>{' '}
            <span className="gradient-text">Development Services</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            I build high-performance, scalable web applications using{' '}
            <strong className="text-foreground">MongoDB</strong>,{' '}
            <strong className="text-foreground">Express.js</strong>,{' '}
            <strong className="text-foreground">React</strong>, and{' '}
            <strong className="text-foreground">Node.js</strong> — the most popular
            JavaScript ecosystem for modern web development.
          </p>

          {/* Stack Logos */}
          <div className="flex items-center justify-center gap-6 md:gap-10 mb-10">
            {stackItems.map((item) => (
              <motion.div
                key={item.letter}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + stackItems.indexOf(item) * 0.1 }}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 md:w-18 md:h-18 rounded-2xl glass-card flex items-center justify-center group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-primary/20 p-2.5">
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xs md:text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-flex items-center gap-2"
              >
                Start Your Project <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link to="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline"
              >
                View My Work
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Expert Quote */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 rounded-2xl relative overflow-hidden max-w-4xl mx-auto border border-primary/20"
          >
            <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/15" />
            <Quote className="absolute bottom-6 right-6 w-12 h-12 text-primary/15 rotate-180" />
            <div className="relative z-10 text-center">
              <p className="text-xl md:text-2xl text-foreground font-medium italic leading-relaxed mb-6">
                "The MERN stack's cohesive JavaScript environment accelerates development
                of real-time applications — React's component model on the frontend paired
                with Node.js on the backend creates an unbeatable developer experience."
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Code size={18} className="text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground text-sm">Muhammad Subhan Shahid</p>
                  <p className="text-xs text-muted-foreground">
                    MERN Stack Developer & Full-Stack Engineer
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stack Breakdown */}
      <section className="section-container" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="section-title">
              The <span className="gradient-text">MERN</span> Stack
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Four powerful technologies working in harmony — each one mastered to deliver
              production-grade applications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {stackItems.map((item) => (
              <motion.div
                key={item.letter}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card p-8 relative overflow-hidden group"
              >
                {/* Large background letter */}
                <span className="absolute -top-4 -right-2 text-[120px] font-black text-primary/5 leading-none select-none pointer-events-none group-hover:text-primary/10 transition-colors duration-500">
                  {item.letter}
                </span>

                <div className="relative z-10">
                  {/* Tech logo */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 shadow-lg p-2.5`}
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-full h-full object-contain brightness-0 invert"
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-3">{item.name}</h3>
                  <p className="text-muted-foreground mb-5 leading-relaxed">
                    {item.description}
                  </p>

                  <ul className="space-y-2">
                    {item.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 size={14} className="text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Why MERN Stack */}
      <section className="section-container bg-muted/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="container mx-auto px-4 md:px-6"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="section-title">
              Why Choose <span className="gradient-text">MERN Stack?</span>
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              The advantages of the world's most popular JavaScript stack for your next project
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:border-primary/50 transition-colors"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150" />
                <benefit.icon size={32} className="text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Related Projects */}
      <section className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="container mx-auto px-4 md:px-6"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="section-title">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Real-world applications built with the MERN stack and modern JavaScript
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card p-6 rounded-2xl group"
              >
                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors font-medium"
                  >
                    View Live Demo <ArrowRight size={14} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="section-container pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 md:px-6"
        >
          <div className="glass-card rounded-3xl p-8 md:p-12 text-center relative overflow-hidden border border-primary/20 hover:border-primary/40 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-50 pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to build with the MERN Stack?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let's discuss your project requirements and create a scalable, modern web
                application using MongoDB, Express.js, React, and Node.js.
              </p>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-3"
                >
                  Get a Free Consultation <ArrowRight size={20} />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default MernStack;

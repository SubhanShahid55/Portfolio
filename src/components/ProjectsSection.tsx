import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Building2, Shield, ShoppingCart } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Homixa.us',
    subtitle: 'Real Estate Platform',
    category: 'Web Development',
    icon: Building2,
    year: '2024',
    techStack: ['MongoDB', 'Express', 'Angular', 'Node.js', 'AWS'],
    highlights: [
      'Marketplace platform with 5,000+ listings serving 1,200+ users',
      '99.9% uptime on AWS infrastructure',
      'RESTful APIs handling 50,000+ daily requests with <200ms response time',
    ],
    demoLink: '#',
    githubLink: '#',
  },
  {
    id: 2,
    title: 'Fraud Detection System',
    subtitle: 'ML-Powered Security',
    category: 'Machine Learning',
    icon: Shield,
    year: '2024',
    techStack: ['Python', 'React', 'Flask', 'Machine Learning'],
    highlights: [
      'ML-powered system analyzing 100,000+ daily transactions',
      '95% accuracy with 2% false positive rate',
      'Real-time alerting dashboard reducing fraud detection time by 30%',
    ],
    demoLink: '#',
    githubLink: '#',
  },
  {
    id: 3,
    title: 'E-Commerce Platform',
    subtitle: 'Full-Stack Store',
    category: 'E-commerce',
    icon: ShoppingCart,
    year: '2024',
    techStack: ['PHP', 'MySQL', 'JavaScript', 'Stripe', 'PayPal'],
    highlights: [
      'Responsive platform processing 200+ monthly orders',
      'Google PageSpeed score 92+ with 60% SEO improvement',
      '25% reduction in checkout abandonment',
    ],
    demoLink: '#',
    githubLink: '#',
  },
];

const categories = ['All', 'Web Development', 'Machine Learning', 'E-commerce'];

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

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
    <section id="projects" className="section-container">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            A showcase of my recent work in full-stack development and machine learning
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground glow'
                  : 'glass-card text-muted-foreground hover:text-foreground'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                className="glass-card overflow-hidden group"
              >
                {/* Project Icon & Year */}
                <div className="p-6 pb-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <project.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{project.year}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{project.subtitle}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="px-6 pb-6">
                  <ul className="space-y-2 mb-6">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Links */}
                  <div className="flex gap-4">
                    <motion.a
                      href={project.demoLink}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </motion.a>
                    <motion.a
                      href={project.githubLink}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors"
                    >
                      <Github size={16} />
                      Code
                    </motion.a>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;

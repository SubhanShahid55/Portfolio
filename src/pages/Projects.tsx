import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, ArrowRight, Eye, Code, Briefcase, GraduationCap } from 'lucide-react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import portfolioData from '@/data/portfolioData';

const tagIcons: Record<string, React.ElementType> = {
  'Web Development': Code,
  'Frontend': Code,
  'React': Code,
  'Freelance': Briefcase,
  'University Projects': GraduationCap,
  'Python': Code,
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const filteredProjects = activeCategory === 'All'
    ? portfolioData.projects.projects
    : portfolioData.projects.projects.filter((p) => p.tags.includes(activeCategory));

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
    <Layout>
      <SEOHead
        title="Projects Portfolio"
        description="Explore Muhammad Subhan Shahid's portfolio of web development and React projects."
        canonical="https://subhanshahidportfolio.vercel.app/projects"
      />

      <section className="section-container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="section-title">
              Featured <span className="gradient-text">Projects</span>
            </h1>
            <p className="section-subtitle max-w-2xl mx-auto">
              A showcase of my recent work in web development and design
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {portfolioData.projects.categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'glass-card text-muted-foreground hover:text-foreground hover:border-primary/50'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const IconComponent = tagIcons[project.tags[0]] || Code;
                
                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -10 }}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className="glass-card overflow-hidden group relative"
                  >
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />

                      {/* Hover Actions */}
                      <AnimatePresence>
                        {hoveredProject === project.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center gap-4"
                          >
                            {project.demoUrl && (
                              <motion.a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                              >
                                <Eye size={20} />
                              </motion.a>
                            )}
                            {project.codeUrl && (
                              <motion.a
                                href={project.codeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-12 h-12 rounded-full bg-muted text-foreground flex items-center justify-center"
                              >
                                <Github size={20} />
                              </motion.a>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Icon & Tags */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex flex-wrap gap-1 justify-end">
                          {project.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-xs text-muted-foreground uppercase tracking-wider bg-muted px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Links */}
                      <div className="flex gap-4">
                        {project.demoUrl && (
                          <motion.a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors group/link"
                          >
                            <ExternalLink size={16} />
                            Live Demo
                            <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                          </motion.a>
                        )}
                        {project.codeUrl && (
                          <motion.a
                            href={project.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Github size={16} />
                            Source
                          </motion.a>
                        )}
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Want to see more of my work?
            </p>
            <a
              href={portfolioData.contact.socials.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline inline-flex items-center gap-2"
              >
                <Github size={18} />
                View GitHub Profile
              </motion.button>
            </a>
          </motion.div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Projects;

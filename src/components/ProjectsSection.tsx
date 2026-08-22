import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import portfolioData from '@/data/portfolioData';

const ProjectsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const featured = portfolioData.projects.filter((p) => p.featured);
  const other = portfolioData.projects.filter((p) => !p.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
        <motion.div variants={itemVariants} className="text-center mb-14">
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Production applications I've built for clients and as personal projects
          </p>
        </motion.div>

        {/* Featured Projects — Large Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {featured.map((project) => (
            <motion.article
              key={project.id}
              variants={itemVariants}
              className="glass-card overflow-hidden group flex flex-col"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Features */}
                {project.features && (
                  <ul className="space-y-1.5 mb-4">
                    {project.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs bg-primary/10 text-primary/90 rounded-md font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-3 border-t border-border/30">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-primary hover:text-accent transition-colors font-medium"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  )}
                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github size={14} />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Other Projects */}
        {other.length > 0 && (
          <>
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">
                Other <span className="gradient-text">Projects</span>
              </h3>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {other.map((project) => (
                <motion.article
                  key={project.id}
                  variants={itemVariants}
                  className="glass-card p-5 group flex flex-col"
                >
                  <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs bg-muted/50 text-muted-foreground rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-primary hover:text-accent transition-colors"
                      >
                        <ExternalLink size={13} />
                        Demo
                      </a>
                    )}
                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github size={13} />
                        Code
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </>
        )}

        {/* GitHub CTA */}
        <motion.div variants={itemVariants} className="text-center">
          <a
            href={portfolioData.personal.socials.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-outline inline-flex items-center gap-2"
            >
              <Github size={18} />
              View GitHub Profile
              <ArrowRight size={14} />
            </motion.button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;

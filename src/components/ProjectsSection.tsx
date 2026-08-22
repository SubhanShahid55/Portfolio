import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Info, ArrowUpRight } from 'lucide-react';
import portfolioData from '@/data/portfolioData';
import type { Project } from '@/data/portfolioData';
import SectionHeading from './SectionHeading';
import ProjectDetailDrawer from './ProjectDetailDrawer';

const FILTER_CATEGORIES = ['All', 'Full-Stack', 'Frontend', 'AI', 'Freelance'] as const;
type FilterCategory = (typeof FILTER_CATEGORIES)[number];

const isProjectMatch = (project: Project, filter: FilterCategory): boolean => {
  if (filter === 'All') return true;

  if (filter === 'Full-Stack') {
    return (
      project.category === 'Full-Stack' ||
      project.tags.some((t) => t.toLowerCase().includes('full-stack')) ||
      project.techStack.some((t) => ['node.js', 'mongodb', 'express.js', 'postgresql'].includes(t.toLowerCase()))
    );
  }

  if (filter === 'Frontend') {
    return (
      project.category === 'Frontend' ||
      project.tags.some((t) => t.toLowerCase().includes('frontend') || t.toLowerCase().includes('react')) ||
      project.techStack.some((t) => ['react', 'javascript', 'html', 'tailwind css'].includes(t.toLowerCase()))
    );
  }

  if (filter === 'AI') {
    return (
      project.category === 'AI' ||
      project.tags.some((t) => t.toLowerCase().includes('ai') || t.toLowerCase().includes('python') || t.toLowerCase().includes('machine learning')) ||
      project.techStack.some((t) => t.toLowerCase().includes('python') || t.toLowerCase().includes('machine learning'))
    );
  }

  if (filter === 'Freelance') {
    return (
      project.category === 'Freelance' ||
      project.tags.some((t) => t.toLowerCase().includes('freelance')) ||
      project.role?.toLowerCase().includes('freelance') === true
    );
  }

  return project.category === filter || project.tags.includes(filter);
};

const ProjectsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    return portfolioData.projects.filter((project) => isProjectMatch(project, activeFilter));
  }, [activeFilter]);

  // Compute count for each category for quick preview badge
  const categoryCounts = useMemo(() => {
    return FILTER_CATEGORIES.reduce((acc, cat) => {
      acc[cat] = portfolioData.projects.filter((p) => isProjectMatch(p, cat)).length;
      return acc;
    }, {} as Record<FilterCategory, number>);
  }, []);

  const openDrawer = useCallback((project: Project) => {
    setSelectedProject(project);
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <section id="work" className="section-container">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <SectionHeading
          number="01"
          eyebrow="SELECTED WORK"
          title="Engineered for"
          highlight="production."
          subtitle="Real-world applications built for international clients, businesses, and engineering solutions."
        />

        {/* Filter Chips */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {FILTER_CATEGORIES.map((cat) => {
            const isSelected = activeFilter === cat;
            const count = categoryCounts[cat] || 0;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`filter-chip text-xs font-mono uppercase tracking-wider py-1.5 px-4 rounded-full border transition-all inline-flex items-center gap-1.5 ${
                  isSelected
                    ? 'active bg-primary/20 text-primary border-primary font-semibold shadow-[0_0_14px_hsla(187,80%,48%,0.3)]'
                    : 'bg-surface-2/60 text-muted-foreground border-border/40 hover:border-primary/40 hover:text-foreground'
                }`}
                role="tab"
                aria-selected={isSelected}
                aria-controls="project-grid"
                tabIndex={0}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-primary text-primary-foreground font-bold' : 'bg-surface-3 text-muted-foreground'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Unified Project Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            id="project-grid"
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={openDrawer}
                variants={itemVariants}
                isFeatured={project.featured}
              />
            ))}

            {filteredProjects.length === 0 && (
              <div className="col-span-full text-center py-16 glass-card border border-border/40">
                <p className="text-muted-foreground text-sm font-mono">
                  No projects found for category "{activeFilter}".
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* GitHub CTA */}
        <motion.div variants={itemVariants} className="text-center pt-10">
          <a
            href={portfolioData.personal.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider px-6 py-2.5 hover:border-primary hover:text-primary transition-all active:scale-95"
            aria-label="View Muhammad Subhan Shahid's GitHub profile"
          >
            <Github size={15} />
            <span>Explore All Repositories On GitHub</span>
            <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </motion.div>

      {/* Project Detail Drawer */}
      <ProjectDetailDrawer
        project={selectedProject}
        isOpen={drawerOpen}
        onClose={closeDrawer}
      />
    </section>
  );
};

/* ─── Project Card Component ─── */
interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  variants: Record<string, unknown>;
  isFeatured: boolean;
}

const ProjectCard = ({ project, onOpen, variants, isFeatured }: ProjectCardProps) => {
  return (
    <motion.article
      variants={variants}
      layout
      className={`glass-card group flex flex-col h-full hover:border-primary/40 transition-all duration-300 shadow-lg shadow-black/20 ${
        isFeatured ? 'border-primary/25' : 'border-border/40'
      }`}
    >
      {/* Visual Header / Cover */}
      <div
        className="relative h-44 overflow-hidden cursor-pointer bg-card"
        onClick={() => onOpen(project)}
      >
        <img
          src={project.imageUrl}
          alt={project.imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-background/85 backdrop-blur-md text-primary border border-primary/25">
            {project.category}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-background/85 backdrop-blur-md text-muted-foreground border border-border/40">
            {project.year}
          </span>
        </div>

        {/* Hover Hint Overlay */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-background/90 backdrop-blur-md text-xs font-mono uppercase tracking-wider text-foreground border border-primary/30 flex items-center gap-1.5 shadow-lg">
            <Info size={12} className="text-primary" />
            <span>View Case Study</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3
            onClick={() => onOpen(project)}
            className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug cursor-pointer"
          >
            {project.title}
          </h3>
        </div>

        {/* Role & Metadata row */}
        {project.role && (
          <p className="text-[11px] font-mono text-primary/80 mb-2 font-medium">
            {project.role}
          </p>
        )}

        {/* Short Description */}
        <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] font-mono bg-primary/8 text-primary/90 rounded border border-primary/15"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Distinct Action Buttons */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-border/30 mt-auto">
          {/* Details CTA */}
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 p-1"
            aria-label={`View full details for ${project.title}`}
          >
            <Info size={13} className="text-primary" />
            <span>Details</span>
          </button>

          {/* External Links */}
          <div className="flex items-center gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono uppercase tracking-wider text-primary hover:text-accent transition-colors inline-flex items-center gap-1 font-medium"
                aria-label={`Open live demo for ${project.title}`}
              >
                <ExternalLink size={12} />
                <span>Live</span>
              </a>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                aria-label={`View source code for ${project.title} on GitHub`}
              >
                <Github size={12} />
                <span>Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectsSection;

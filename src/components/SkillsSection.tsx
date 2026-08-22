import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Monitor, Server, Database, Wrench, Palette, 
  Code2, Layers, Cpu, Globe, Box, Terminal
} from 'lucide-react';
import portfolioData from '@/data/portfolioData';
import SectionHeading from './SectionHeading';

const categoryIcons: Record<string, React.ElementType> = {
  Frontend: Monitor,
  'Backend & APIs': Server,
  Databases: Database,
  'DevOps & Deployment': Wrench,
  Design: Palette,
};

// Local icon map for reliable fallback
const skillFallbackIcons: Record<string, React.ElementType> = {
  React: Layers,
  'Next.js': Globe,
  TypeScript: Code2,
  JavaScript: Code2,
  HTML5: Globe,
  CSS3: Palette,
  'Tailwind CSS': Palette,
  'Node.js': Server,
  'Express.js': Server,
  Python: Terminal,
  'REST APIs': Globe,
  MongoDB: Database,
  PostgreSQL: Database,
  MySQL: Database,
  Git: Box,
  GitHub: Box,
  Docker: Cpu,
  Postman: Globe,
  Vercel: Globe,
  Render: Globe,
  Figma: Palette,
  Photoshop: Palette,
};

const SkillsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="skills" className="section-container">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <SectionHeading
          number="05"
          eyebrow="TOOLKIT"
          title="Skills &"
          highlight="technologies."
          subtitle="Modern toolset for building high-performance web products, APIs, and scalable infrastructure."
        />

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
          {portfolioData.skills.map((category) => {
            const HeaderIcon = categoryIcons[category.name] || Monitor;

            return (
              <motion.div
                key={category.name}
                variants={itemVariants}
                className="glass-card p-5 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-border/20">
                    <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <HeaderIcon size={15} />
                    </div>
                    <h3 className="text-xs font-mono font-bold text-foreground tracking-wider uppercase">
                      {category.name}
                    </h3>
                  </div>

                  {/* Skills Tag Cloud */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => {
                      const FallbackIcon = skillFallbackIcons[skill] || Code2;
                      return (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: skillIndex * 0.03, duration: 0.25 }}
                          className="skill-tag text-xs font-mono py-1 px-2.5 rounded flex items-center gap-1.5"
                        >
                          <FallbackIcon size={12} className="text-primary/70" />
                          <span>{skill}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;

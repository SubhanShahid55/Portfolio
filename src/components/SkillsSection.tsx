import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Monitor, Server, Database, Wrench, Palette } from 'lucide-react';
import portfolioData from '@/data/portfolioData';

const categoryIcons: Record<string, React.ElementType> = {
  Frontend: Monitor,
  Backend: Server,
  Databases: Database,
  'Tools & DevOps': Wrench,
  Design: Palette,
};

// Devicon URLs for technology logos
const techIcons: Record<string, string> = {
  React: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
  'Next.js': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg',
  TypeScript: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
  JavaScript: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
  HTML5: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg',
  CSS3: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg',
  'Tailwind CSS': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg',
  'Node.js': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
  'Express.js': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg',
  'REST APIs': '',
  Python: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
  MongoDB: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg',
  PostgreSQL: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg',
  MySQL: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg',
  Git: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg',
  GitHub: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg',
  Docker: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg',
  Postman: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postman/postman-original.svg',
  Vercel: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vercel/vercel-original.svg',
  Render: '',
  Figma: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg',
  Photoshop: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/photoshop/photoshop-plain.svg',
};

const SkillsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="skills" className="section-container">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-14">
          <h2 className="section-title">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Technologies I use to build production applications
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {portfolioData.skills.map((category) => {
            const IconComponent = categoryIcons[category.name] || Monitor;

            return (
              <motion.div
                key={category.name}
                variants={itemVariants}
                className="glass-card p-6"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <IconComponent className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {category.name}
                  </h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const iconUrl = techIcons[skill];
                    return (
                      <div
                        key={skill}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/40 rounded-lg text-sm text-foreground/80 border border-border/20 hover:border-primary/30 hover:bg-muted/60 transition-all"
                      >
                        {iconUrl && (
                          <img
                            src={iconUrl}
                            alt={skill}
                            className="w-4 h-4 object-contain"
                            loading="lazy"
                          />
                        )}
                        <span className="font-medium">{skill}</span>
                      </div>
                    );
                  })}
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

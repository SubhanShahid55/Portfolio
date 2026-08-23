import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Monitor, Server, Database, Wrench, Palette, 
  Orbit, LayoutGrid
} from 'lucide-react';
import portfolioData from '@/data/portfolioData';
import SectionHeading from './SectionHeading';
import TechUniverseOrbit from './TechUniverseOrbit';
import { getTechBrandIcon } from './TechBrandIcons';

const categoryIcons: Record<string, React.ElementType> = {
  Frontend: Monitor,
  'Backend & APIs': Server,
  Databases: Database,
  'DevOps & Deployment': Wrench,
  Design: Palette,
};


const SkillsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [viewMode, setViewMode] = useState<'solar' | 'grid'>('solar');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend & APIs', 'Databases', 'DevOps & Deployment', 'Design'];

  const filteredSkills =
    selectedCategory === 'All'
      ? portfolioData.skills
      : portfolioData.skills.filter((c) => c.name === selectedCategory);

  return (
    <section id="skills" className="section-container relative overflow-hidden">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <SectionHeading
            number="05"
            eyebrow="TOOLKIT & ARCHITECTURE"
            title="Skills &"
            highlight="technologies."
            subtitle="Explore Subhan's interactive tech universe spanning full-stack frameworks, distributed backends, and cloud DevOps."
          />

          {/* View Mode Switcher (Solar System vs Bento Grid) */}
          <div className="flex items-center gap-1 bg-surface-2/90 border border-border/50 rounded-2xl p-1 shadow-md mb-4 md:mb-0 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('solar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                viewMode === 'solar'
                  ? 'bg-primary text-primary-foreground font-bold shadow-md shadow-primary/25 border border-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-surface-3'
              }`}
            >
              <Orbit size={14} className={viewMode === 'solar' ? 'animate-spin' : ''} style={{ animationDuration: '8s' }} />
              <span>Solar System</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                viewMode === 'grid'
                  ? 'bg-primary text-primary-foreground font-bold shadow-md shadow-primary/25 border border-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-surface-3'
              }`}
            >
              <LayoutGrid size={14} />
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {/* View Transition Area */}
        <AnimatePresence mode="wait">
          {viewMode === 'solar' ? (
            <motion.div
              key="solar-view"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              <TechUniverseOrbit
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </motion.div>
          ) : (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col gap-6"
            >
              {/* Category Filter Pills for Grid View */}
              <div className="flex flex-wrap items-center gap-1.5">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-primary text-primary-foreground font-bold shadow-md shadow-primary/25 border border-primary'
                          : 'bg-surface-2/80 text-muted-foreground hover:text-foreground hover:bg-surface-3 border border-border/40'
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping" />}
                      <span>{cat}</span>
                    </button>
                  );
                })}
              </div>

              {/* Bento Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
                {filteredSkills.map((category, catIdx) => {
                  const HeaderIcon = categoryIcons[category.name] || Monitor;

                  return (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: catIdx * 0.05 }}
                      className="glass-card p-5 hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between rounded-2xl bg-surface-1/90 border border-border/50 shadow-xl"
                    >
                      <div>
                        {/* Category Header */}
                        <div className="flex items-center gap-2.5 mb-4 pb-2.5 border-b border-border/30">
                          <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-cyan-400 shadow-sm">
                            <HeaderIcon size={16} />
                          </div>
                          <div>
                            <h3 className="text-xs font-mono font-bold text-foreground tracking-wider uppercase">
                              {category.name}
                            </h3>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              {category.skills.length} core technologies
                            </span>
                          </div>
                        </div>

                        {/* Skills Tag Cloud */}
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill) => {
                            const BrandIcon = getTechBrandIcon(skill);
                            return (
                              <div
                                key={skill}
                                className="skill-tag text-xs font-mono py-1.5 px-3 rounded-lg flex items-center gap-2 bg-surface-2/90 border border-border/50 text-foreground hover:border-cyan-400/50 hover:bg-surface-3 transition-colors shadow-sm"
                              >
                                <BrandIcon size={14} className="flex-shrink-0" />
                                <span>{skill}</span>
                              </div>
                            );
                          })}
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default SkillsSection;

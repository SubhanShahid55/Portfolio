import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Monitor, Server, Database, Wrench, Palette,
  Orbit, LayoutGrid, Sparkles, CheckCircle2, Eye,
} from 'lucide-react';
import portfolioData from '@/data/portfolioData';
import SectionHeading from './SectionHeading';
import TechUniverseOrbit from './TechUniverseOrbit';
import { getTechBrandIcon } from './TechBrandIcons';
import { TECH_PLANETS, TechPlanet } from './TechUniverseOrbit';

const categoryIcons: Record<string, React.ElementType> = {
  Frontend: Monitor,
  'Backend & APIs': Server,
  Databases: Database,
  'DevOps & Deployment': Wrench,
  Design: Palette,
};

// Map a plain skill name to its TechPlanet entry (for the detail card)
const findPlanet = (skillName: string): TechPlanet | undefined =>
  TECH_PLANETS.find(
    (p) => p.name.toLowerCase() === skillName.toLowerCase()
  );

// ─── Detail Card (same as orbit) ────────────────────────────────────────────
const PlanetDetailCard: React.FC<{ planet: TechPlanet; onClose: () => void }> = ({
  planet,
  onClose,
}) => (
  <motion.div
    key={planet.id}
    initial={{ opacity: 0, y: 12, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -8, scale: 0.97 }}
    transition={{ duration: 0.22, ease: 'easeOut' }}
    className="glass-card p-5 rounded-3xl border border-cyan-400/40 bg-surface-1/95 shadow-2xl shadow-black/80 flex flex-col relative overflow-hidden"
  >
    {/* ambient glow */}
    <div
      style={{ backgroundColor: planet.color }}
      className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-20 pointer-events-none"
    />

    {/* Header row */}
    <div className="flex items-start justify-between gap-2 mb-3 pb-2 border-b border-border/30">
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-primary/15 text-cyan-300 border border-cyan-400/30">
        <planet.icon size={12} style={{ color: planet.color }} />
        {planet.category}
      </span>
      <button
        type="button"
        onClick={onClose}
        className="text-muted-foreground hover:text-foreground transition-colors text-lg leading-none -mt-0.5"
        aria-label="Close detail"
      >
        ×
      </button>
    </div>

    {/* Title + icon */}
    <div className="flex items-center gap-3 mb-3">
      <div
        style={{ borderColor: planet.color, boxShadow: `0 0 14px ${planet.color}40` }}
        className="w-10 h-10 rounded-xl bg-surface-2 flex items-center justify-center border-2 flex-shrink-0"
      >
        <planet.icon size={20} style={{ color: planet.color }} />
      </div>
      <div>
        <h3 className="text-base font-bold text-foreground tracking-tight">{planet.name}</h3>
        <p className="text-[11px] text-muted-foreground font-mono">{planet.tagline}</p>
      </div>
    </div>

    {/* Description */}
    <p className="text-xs text-foreground/85 leading-relaxed mb-3">{planet.description}</p>

    {/* Proficiency bar */}
    <div className="mb-3 bg-surface-2/80 p-3 rounded-xl border border-border/40">
      <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
        <span className="text-muted-foreground flex items-center gap-1">
          <Sparkles size={11} className="text-cyan-400" />
          Proficiency
        </span>
        <span className="font-bold text-foreground">{planet.proficiency}%</span>
      </div>
      <div className="w-full h-1.5 bg-surface-3 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${planet.proficiency}%` }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          style={{ backgroundColor: planet.color }}
          className="h-full rounded-full"
        />
      </div>
    </div>

    {/* Projects */}
    <div>
      <h4 className="text-[10px] font-mono font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1">
        <CheckCircle2 size={11} className="text-emerald-400" />
        Applied In:
      </h4>
      <div className="flex flex-wrap gap-1.5">
        {planet.projects.map((proj) => (
          <span
            key={proj}
            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-surface-2/90 border border-border/50 text-foreground/85"
          >
            {proj}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

// ─── Placeholder when nothing is selected ───────────────────────────────────
const EmptyDetailCard: React.FC = () => (
  <div className="glass-card p-5 rounded-3xl border border-border/40 bg-surface-1/80 shadow-xl flex flex-col items-center justify-center text-center h-full min-h-[220px]">
    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-cyan-400 mb-3 animate-bounce">
      <Eye size={18} />
    </div>
    <p className="text-xs font-bold text-foreground mb-1">Click any skill</p>
    <p className="text-[11px] text-muted-foreground leading-relaxed max-w-[180px]">
      Select a skill chip to see proficiency, description, and projects.
    </p>
  </div>
);

// ─── Main Section ────────────────────────────────────────────────────────────
const SkillsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [viewMode, setViewMode] = useState<'solar' | 'grid'>('solar');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePlanet, setActivePlanet] = useState<TechPlanet | null>(null);

  const categories = ['All', 'Frontend', 'Backend & APIs', 'Databases', 'DevOps & Deployment', 'Design'];

  const filteredSkills =
    selectedCategory === 'All'
      ? portfolioData.skills
      : portfolioData.skills.filter((c) => c.name === selectedCategory);

  const handleSkillClick = (skillName: string) => {
    const planet = findPlanet(skillName);
    if (!planet) return;
    setActivePlanet((prev) => (prev?.id === planet.id ? null : planet));
  };

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

          {/* View Mode Switcher */}
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
              onClick={() => { setViewMode('grid'); setActivePlanet(null); }}
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
              className="w-full"
            >
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 mb-5">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => { setSelectedCategory(cat); setActivePlanet(null); }}
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

              {/* Two-column layout: skill cards left, detail card right */}
              <div className="grid lg:grid-cols-12 gap-5">
                {/* Left: Bento skill cards */}
                <div className="lg:col-span-7 grid md:grid-cols-2 gap-4 content-start">
                  {filteredSkills.map((category, catIdx) => {
                    const HeaderIcon = categoryIcons[category.name] || Monitor;
                    return (
                      <motion.div
                        key={category.name}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: catIdx * 0.05 }}
                        className="glass-card p-4 hover:border-cyan-400/40 transition-all duration-300 flex flex-col rounded-2xl bg-surface-1/90 border border-border/50 shadow-xl"
                      >
                        {/* Category Header */}
                        <div className="flex items-center gap-2.5 mb-3 pb-2 border-b border-border/30">
                          <div className="w-7 h-7 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-cyan-400 shadow-sm">
                            <HeaderIcon size={14} />
                          </div>
                          <div>
                            <h3 className="text-[11px] font-mono font-bold text-foreground tracking-wider uppercase">
                              {category.name}
                            </h3>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              {category.skills.length} technologies
                            </span>
                          </div>
                        </div>

                        {/* Clickable Skill Chips */}
                        <div className="flex flex-wrap gap-1.5">
                          {category.skills.map((skill) => {
                            const BrandIcon = getTechBrandIcon(skill);
                            const planet = findPlanet(skill);
                            const isActive = activePlanet?.name === skill;
                            const hasPlanet = !!planet;
                            return (
                              <button
                                key={skill}
                                type="button"
                                onClick={() => handleSkillClick(skill)}
                                disabled={!hasPlanet}
                                title={hasPlanet ? `Click to inspect ${skill}` : skill}
                                className={`text-xs font-mono py-1 px-2.5 rounded-lg flex items-center gap-1.5 transition-all duration-200 shadow-sm border ${
                                  isActive
                                    ? 'bg-primary/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20 scale-105'
                                    : hasPlanet
                                    ? 'bg-surface-2/90 border-border/50 text-foreground hover:border-cyan-400/60 hover:bg-surface-3 hover:scale-105 cursor-pointer'
                                    : 'bg-surface-2/60 border-border/30 text-foreground/70 cursor-default'
                                }`}
                                style={isActive ? { borderColor: planet?.color, boxShadow: `0 0 10px ${planet?.color}30` } : {}}
                              >
                                <BrandIcon size={13} className="flex-shrink-0" style={isActive ? { color: planet?.color } : {}} />
                                <span>{skill}</span>
                                {isActive && (
                                  <span
                                    className="w-1.5 h-1.5 rounded-full ml-0.5 flex-shrink-0 animate-pulse"
                                    style={{ backgroundColor: planet?.color }}
                                  />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Right: Detail card */}
                <div className="lg:col-span-5">
                  <AnimatePresence mode="wait">
                    {activePlanet ? (
                      <PlanetDetailCard
                        key={activePlanet.id}
                        planet={activePlanet}
                        onClose={() => setActivePlanet(null)}
                      />
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <EmptyDetailCard />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default SkillsSection;

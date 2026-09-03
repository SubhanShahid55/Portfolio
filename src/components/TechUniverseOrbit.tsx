import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  RotateCw,
  Eye,
} from 'lucide-react';
import {
  ReactIcon,
  NextjsIcon,
  TypeScriptIcon,
  JavaScriptIcon,
  TailwindIcon,
  NodejsIcon,
  ExpressIcon,
  PythonIcon,
  RestApiIcon,
  MongoDbIcon,
  PostgresIcon,
  DockerIcon,
  GitIcon,
  VercelIcon,
  FigmaIcon,
  CanvaIcon,
} from './TechBrandIcons';

export interface TechPlanet {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend & APIs' | 'Databases' | 'DevOps & Deployment' | 'Design';
  orbit: 1 | 2 | 3;
  angleOffset: number;
  color: string;
  icon: React.FC<{ size?: number; className?: string }>;
  tagline: string;
  description: string;
  proficiency: number;
  projects: string[];
}

export const TECH_PLANETS: TechPlanet[] = [
  // Orbit 1: Inner
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    orbit: 1,
    angleOffset: 0,
    color: '#61DAFB',
    icon: ReactIcon,
    tagline: 'Reactive Component Architecture',
    description: 'Custom hooks, state management, Framer Motion motion design, and high-performance SPAs.',
    proficiency: 95,
    projects: ['Brawse Extension', 'Digital Media Archive', 'Meme Coins Agent', 'Portfolio'],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Frontend',
    orbit: 1,
    angleOffset: 72,
    color: '#FFFFFF',
    icon: NextjsIcon,
    tagline: 'Server-Side Rendered Powerhouse',
    description: 'App router, Server Components, SSR/SSG caching, and SEO-optimized web applications.',
    proficiency: 90,
    projects: ['Homixa Platform', 'Client Web Portals'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Frontend',
    orbit: 1,
    angleOffset: 144,
    color: '#3178C6',
    icon: TypeScriptIcon,
    tagline: 'Enterprise Type Safety',
    description: 'Strict type safety, generic utility interfaces, refactoring confidence, and DX tooling.',
    proficiency: 92,
    projects: ['Digital Media Archive', 'Brawse', 'Chip Mascot Engine'],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Frontend',
    orbit: 1,
    angleOffset: 216,
    color: '#F7DF1E',
    icon: JavaScriptIcon,
    tagline: 'Modern ES6+ Engine',
    description: 'Async/await, DOM APIs, event loop concurrency, and modular architecture.',
    proficiency: 95,
    projects: ['Brawse Extension', 'Ecommerce Frontend'],
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Frontend',
    orbit: 1,
    angleOffset: 288,
    color: '#38BDF8',
    icon: TailwindIcon,
    tagline: 'Modern Utility Styling',
    description: 'Design token architecture, responsive layouts, glassmorphism, and dark mode themes.',
    proficiency: 95,
    projects: ['Homixa', 'Meme Coins Agent', 'Portfolio 2026'],
  },

  // Orbit 2: Mid
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend & APIs',
    orbit: 2,
    angleOffset: 30,
    color: '#339933',
    icon: NodejsIcon,
    tagline: 'Asynchronous Server Engine',
    description: 'Scalable backend services, streaming data processing, and microservice architecture.',
    proficiency: 90,
    projects: ['Digital Media Archive', 'Smile Check AI Diagnostics'],
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'Backend & APIs',
    orbit: 2,
    angleOffset: 120,
    color: '#A855F7',
    icon: ExpressIcon,
    tagline: 'RESTful Middleware Routing',
    description: 'Modular routing, token-based authentication, request validation, and error pipelines.',
    proficiency: 88,
    projects: ['Digital Media Archive API', 'Auth Microservices'],
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Backend & APIs',
    orbit: 2,
    angleOffset: 210,
    color: '#3776AB',
    icon: PythonIcon,
    tagline: 'Data Processing & ML Logic',
    description: 'Machine learning fraud detection algorithms, automated scripts, and analytical workflows.',
    proficiency: 85,
    projects: ['Fraud Detection System', 'Data Pipelines'],
  },
  {
    id: 'rest-apis',
    name: 'REST APIs',
    category: 'Backend & APIs',
    orbit: 2,
    angleOffset: 300,
    color: '#009688',
    icon: RestApiIcon,
    tagline: 'API Contracts & Integrations',
    description: 'Clean RESTful conventions, OpenAPI documentation, rate limiting, and third-party webhooks.',
    proficiency: 92,
    projects: ['Meme Coins Agent', 'Brawse Data Sync'],
  },

  // Orbit 3: Outer
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Databases',
    orbit: 3,
    angleOffset: 15,
    color: '#47A248',
    icon: MongoDbIcon,
    tagline: 'NoSQL Document Store',
    description: 'Schema modeling, indexing strategies, complex aggregation pipelines, and high availability.',
    proficiency: 88,
    projects: ['Digital Media Archive', 'MERN Applications'],
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Databases',
    orbit: 3,
    angleOffset: 75,
    color: '#4169E1',
    icon: PostgresIcon,
    tagline: 'Relational ACID Engine',
    description: 'Relational schema design, query optimization, foreign keys, and transaction integrity.',
    proficiency: 84,
    projects: ['Enterprise DB Systems', 'Diagnostics Service'],
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'DevOps & Deployment',
    orbit: 3,
    angleOffset: 135,
    color: '#2496ED',
    icon: DockerIcon,
    tagline: 'Containerized Infrastructure',
    description: 'Multi-stage Docker builds, container orchestration, and isolated reproducible environments.',
    proficiency: 82,
    projects: ['Smile Check Backend', 'Local Microservices'],
  },
  {
    id: 'git-github',
    name: 'Git & GitHub',
    category: 'DevOps & Deployment',
    orbit: 3,
    angleOffset: 195,
    color: '#F05032',
    icon: GitIcon,
    tagline: 'Version Control & CI/CD',
    description: 'Trunk-based branch workflows, code reviews, semantic versioning, and GitHub Actions.',
    proficiency: 94,
    projects: ['All Open Source & Client Repos'],
  },
  {
    id: 'cloud-deploy',
    name: 'Vercel & Render',
    category: 'DevOps & Deployment',
    orbit: 3,
    angleOffset: 255,
    color: '#E11D48',
    icon: VercelIcon,
    tagline: 'Zero-Downtime Deployment',
    description: 'Continuous deployment pipelines, preview environments, custom domains, and edge routing.',
    proficiency: 90,
    projects: ['Homixa', 'Meme Coins Agent', 'Digital Media Archive'],
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'Design',
    orbit: 3,
    angleOffset: 315,
    color: '#F24E1E',
    icon: FigmaIcon,
    tagline: 'UI/UX Prototyping Systems',
    description: 'Wireframing, interactive prototyping, auto-layout design systems, and developer handoff.',
    proficiency: 86,
    projects: ['UI Mockups', 'Portfolio Wireframes'],
  },
  {
    id: 'canva',
    name: 'Canva',
    category: 'Design',
    orbit: 3,
    angleOffset: 345,
    color: '#7D2AE8',
    icon: CanvaIcon,
    tagline: 'Rapid Visual Design & Branding',
    description: 'Quick-turnaround social media graphics, pitch decks, brand kits, and marketing collateral for clients.',
    proficiency: 80,
    projects: ['Client Brand Assets', 'Social Media Graphics', 'Portfolio Decks'],
  },
];

// Seconds per full revolution
const ORBIT_DURATIONS = { 1: 34, 2: 52, 3: 72 };

// Degrees per millisecond for each orbit
const DEG_PER_MS = {
  1:  360 / (ORBIT_DURATIONS[1] * 1000),
  2: -360 / (ORBIT_DURATIONS[2] * 1000), // Reverse mid orbit
  3:  360 / (ORBIT_DURATIONS[3] * 1000),
};

interface TechUniverseOrbitProps {
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export const TechUniverseOrbit: React.FC<TechUniverseOrbitProps> = ({
  selectedCategory = 'All',
  onSelectCategory,
}) => {
  const [activePlanet, setActivePlanet] = useState<TechPlanet | null>(TECH_PLANETS[0]);
  const [isOrbiting, setIsOrbiting] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  // ── Ref-based angle state — avoids React re-renders every rAF frame ──
  const anglesRef = useRef<{ 1: number; 2: number; 3: number }>({ 1: 0, 2: 0, 3: 0 });
  const isOrbitingRef = useRef(isOrbiting);
  const speedRef = useRef(speedMultiplier);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // One ref per planet node for direct DOM transforms
  const planetRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Current orbit radii ref (used inside rAF)
  const orbitRadiiRef = useRef({ 1: 105, 2: 180, 3: 255 });

  // ── Sync mutable refs ──
  useEffect(() => { isOrbitingRef.current = isOrbiting; }, [isOrbiting]);
  useEffect(() => { speedRef.current = speedMultiplier; }, [speedMultiplier]);

  // ── Responsive orbit radii ──
  const orbitRadii = {
    // Mobile: tighter to prevent clipping (container half-height ≈ 170px on 340px)
    mobile:  { 1: 46, 2:  84, 3: 128 },
    tablet:  { 1: 80, 2: 145, 3: 205 },
    desktop: { 1: 105, 2: 180, 3: 255 },
  }[screenSize];

  // Keep radii ref updated without triggering rAF restart
  useEffect(() => {
    orbitRadiiRef.current = orbitRadii;
  }, [orbitRadii]);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setScreenSize('mobile');
      else if (w < 1024) setScreenSize('tablet');
      else setScreenSize('desktop');
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── rAF loop: directly mutates planet DOM nodes — ZERO React re-renders per frame ──
  useEffect(() => {
    const tick = (now: number) => {
      animFrameRef.current = requestAnimationFrame(tick);

      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
        return;
      }

      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      if (!isOrbitingRef.current || delta > 200) return; // skip big gaps (tab hidden etc.)

      const spd = speedRef.current;
      const radii = orbitRadiiRef.current;

      // Advance angles
      anglesRef.current = {
        1: (anglesRef.current[1] + DEG_PER_MS[1] * spd * delta) % 360,
        2: (anglesRef.current[2] + DEG_PER_MS[2] * spd * delta) % 360,
        3: (anglesRef.current[3] + DEG_PER_MS[3] * spd * delta) % 360,
      };

      // Directly update each planet's DOM transform
      planetRefs.current.forEach((el, id) => {
        const planet = TECH_PLANETS.find((p) => p.id === id);
        if (!planet) return;
        const orbitAngle = anglesRef.current[planet.orbit];
        const totalDeg = (planet.angleOffset + orbitAngle) % 360;
        const rad = (totalDeg * Math.PI) / 180;
        const r = radii[planet.orbit];
        const x = Math.cos(rad) * r;
        const y = Math.sin(rad) * r;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      lastTimeRef.current = null;
    };
  }, []); // ← no deps: loop runs once and reads from refs

  // ── Assign planet ref callback ──
  const setPlanetRef = useCallback((id: string) => (el: HTMLDivElement | null) => {
    if (el) planetRefs.current.set(id, el);
    else planetRefs.current.delete(id);
  }, []);

  const categories = ['All', 'Frontend', 'Backend & APIs', 'Databases', 'DevOps & Deployment', 'Design'];

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* Category Pills & Physics Controls Toolbar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2.5 mb-4 sm:mb-6 px-1">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 w-full sm:w-auto max-w-full">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory?.(cat)}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono transition-all flex items-center gap-1.5 flex-shrink-0 ${
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

        <div className="flex items-center gap-2 bg-surface-2/80 border border-border/40 rounded-full px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-mono">
          <button
            type="button"
            onClick={() => setIsOrbiting((prev) => !prev)}
            className={`flex items-center gap-1 transition-colors ${
              isOrbiting ? 'text-cyan-400 hover:text-cyan-300' : 'text-amber-400 hover:text-amber-300'
            }`}
            title={isOrbiting ? 'Pause orbital rotation' : 'Resume orbital rotation'}
          >
            <RotateCw size={12} className={isOrbiting ? 'animate-spin' : ''} style={{ animationDuration: '4s' }} />
            <span>{isOrbiting ? 'Orbiting' : 'Paused'}</span>
          </button>
          <span className="text-border/60">|</span>
          <button
            type="button"
            onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 2 : prev === 2 ? 0.5 : 1))}
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Toggle orbital velocity"
          >
            Speed: <span className="text-primary font-bold">{speedMultiplier}x</span>
          </button>
        </div>
      </div>

      {/* Main Solar System Stage */}
      <div className="relative w-full grid lg:grid-cols-12 gap-5 lg:gap-6 items-center">
        {/* Interactive Orbit Canvas */}
        <div
          className="lg:col-span-7 flex items-center justify-center relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-primary/20 backdrop-blur-xl shadow-2xl shadow-black/80"
          style={{
            height: screenSize === 'mobile' ? 320 : screenSize === 'tablet' ? 480 : 540,
            background: 'hsla(225, 25%, 8%, 0.6)',
            /* Promote to GPU compositing layer for smooth animation */
            transform: 'translateZ(0)',
            willChange: 'transform',
          }}
        >
          {/* Deep Space Backdrop */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-background/90 to-background" />
            <div className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d408_1px,transparent_1px),linear-gradient(to_bottom,#06b6d408_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]" />
          </div>

          {/* Central Full-Stack Reactor Core */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.9, 0.6] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-cyan-500/30 via-primary/40 to-blue-600/30 blur-2xl pointer-events-none"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
              className="absolute w-16 h-16 sm:w-24 sm:h-24 rounded-full border border-cyan-400/30 border-dashed pointer-events-none"
            />
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="relative w-12 h-12 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-surface-1 via-surface-2 to-surface-3 border-2 border-cyan-400 shadow-xl shadow-cyan-500/30 flex flex-col items-center justify-center text-center p-1 sm:p-2 cursor-pointer z-10"
              onClick={() => setActivePlanet(null)}
            >
              <Zap size={screenSize === 'mobile' ? 13 : 18} className="text-cyan-300 animate-pulse mb-0.5" />
              <span className="text-[7.5px] sm:text-[10px] md:text-[11px] font-bold font-mono text-foreground tracking-tight leading-none">
                FULL STACK
              </span>
              <span className="text-[6px] sm:text-[8px] font-mono text-cyan-400 uppercase tracking-widest mt-0.5">
                CORE
              </span>
            </motion.div>
          </div>

          {/* Orbit Ring SVGs */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
            <circle cx="50%" cy="50%" r={orbitRadii[1]} fill="none" stroke="#06b6d4" strokeWidth="1.2" strokeDasharray="4 6" className="opacity-40" />
            <circle cx="50%" cy="50%" r={orbitRadii[2]} fill="none" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="5 8" className="opacity-35" />
            <circle cx="50%" cy="50%" r={orbitRadii[3]} fill="none" stroke="#8b5cf6" strokeWidth="1.2" strokeDasharray="6 10" className="opacity-30" />
          </svg>

          {/* Planet Nodes — positioned absolutely from center, transforms driven by rAF */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {TECH_PLANETS.map((planet) => {
              const isMatchCategory = selectedCategory === 'All' || planet.category === selectedCategory;
              const isSelectedPlanet = activePlanet?.id === planet.id;
              const IconComp = planet.icon;

              return (
                <div
                  key={planet.id}
                  ref={setPlanetRef(planet.id)}
                  style={{
                    position: 'absolute',
                    willChange: 'transform',
                    // Initial transform so planets aren't all stacked at center before rAF fires
                    transform: (() => {
                      const rad = (planet.angleOffset * Math.PI) / 180;
                      const r = orbitRadii[planet.orbit];
                      return `translate(${Math.cos(rad) * r}px, ${Math.sin(rad) * r}px)`;
                    })(),
                  }}
                  className="pointer-events-auto"
                >
                  <div className="relative group flex items-center justify-center">
                    {/* Glow aura */}
                    <div
                      style={{ backgroundColor: planet.color }}
                      className={`absolute -inset-1 rounded-full blur-md transition-opacity duration-300 ${
                        isSelectedPlanet
                          ? 'opacity-85 scale-125'
                          : isMatchCategory
                          ? 'opacity-35 group-hover:opacity-80'
                          : 'opacity-10'
                      }`}
                    />

                    {/* Planet button */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.25, y: -2 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => setActivePlanet(planet)}
                      aria-label={`Inspect ${planet.name} skill`}
                      className={`relative rounded-full flex items-center justify-center transition-all ${
                        isSelectedPlanet
                          ? 'bg-surface-1 border-2 border-white shadow-xl shadow-cyan-500/50 scale-110'
                          : isMatchCategory
                          ? 'bg-surface-2/95 border border-border/80 hover:border-white shadow-md'
                          : 'bg-surface-2/40 border border-border/20 opacity-30 hover:opacity-100'
                      }`}
                      style={{
                        width: screenSize === 'mobile' ? 28 : 36,
                        height: screenSize === 'mobile' ? 28 : 36,
                        borderColor: isSelectedPlanet ? '#ffffff' : isMatchCategory ? planet.color : undefined,
                      }}
                    >
                      <IconComp
                        size={screenSize === 'mobile' ? 13 : 16}
                        style={{ color: isSelectedPlanet || isMatchCategory ? planet.color : '#94a3b8' }}
                        className="transition-transform group-hover:rotate-12"
                      />
                    </motion.button>

                    {/* Label */}
                    <div
                      className={`absolute top-full mt-1.5 px-2 py-0.5 rounded-md bg-surface-1/95 border border-border/40 backdrop-blur-md whitespace-nowrap text-[9px] sm:text-[10px] font-mono font-medium text-foreground transition-all duration-200 pointer-events-none z-30 ${
                        isSelectedPlanet
                          ? 'opacity-100 scale-100 text-cyan-300 font-bold border-cyan-400/60 shadow-lg shadow-black/50'
                          : 'opacity-0 sm:group-hover:opacity-100 scale-95 sm:group-hover:scale-100'
                      }`}
                    >
                      {planet.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Tech Planet Detail Card */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <AnimatePresence mode="wait">
            {activePlanet ? (
              <motion.div
                key={activePlanet.id}
                initial={{ opacity: 0, x: 20, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.96 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="glass-card p-6 rounded-3xl border border-cyan-400/40 bg-surface-1/95 shadow-2xl shadow-black/80 flex flex-col justify-between relative overflow-hidden"
              >
                <div
                  style={{ backgroundColor: activePlanet.color }}
                  className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-20 pointer-events-none"
                />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-border/30">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-primary/15 text-cyan-300 border border-cyan-400/30">
                      <activePlanet.icon size={12} style={{ color: activePlanet.color }} />
                      {activePlanet.category}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      Orbit Ring #{activePlanet.orbit}
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 mb-3">
                    <div
                      style={{ borderColor: activePlanet.color, boxShadow: `0 0 16px ${activePlanet.color}40` }}
                      className="w-12 h-12 rounded-2xl bg-surface-2 flex items-center justify-center border-2 flex-shrink-0"
                    >
                      <activePlanet.icon size={24} style={{ color: activePlanet.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground tracking-tight">{activePlanet.name}</h3>
                      <p className="text-xs text-muted-foreground font-mono">{activePlanet.tagline}</p>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/90 leading-relaxed mb-4">{activePlanet.description}</p>

                  <div className="mb-4 bg-surface-2/80 p-3 rounded-2xl border border-border/40">
                    <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Sparkles size={12} className="text-cyan-400" />
                        Engineering Proficiency
                      </span>
                      <span className="font-bold text-foreground">{activePlanet.proficiency}%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-3 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${activePlanet.proficiency}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        style={{ backgroundColor: activePlanet.color }}
                        className="h-full rounded-full shadow-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-emerald-400" />
                      Applied in Subhan's Work:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activePlanet.projects.map((proj) => (
                        <span
                          key={proj}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-surface-2/90 border border-border/50 text-foreground/90 shadow-sm"
                        >
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-border/20 flex items-center justify-between text-[10px] font-mono text-muted-foreground/80">
                  <span>Click any planet to inspect architecture</span>
                  <span className="text-cyan-400 font-bold">Interactive Solar System</span>
                </div>
              </motion.div>
            ) : (
              <div className="glass-card p-6 rounded-3xl border border-border/40 bg-surface-1/80 shadow-xl flex flex-col items-center justify-center text-center h-[380px]">
                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-cyan-400 mb-3 animate-bounce">
                  <Eye size={24} />
                </div>
                <h3 className="text-base font-bold text-foreground mb-1">Explore Subhan's Tech Cosmos</h3>
                <p className="text-xs text-muted-foreground max-w-xs leading-relaxed mb-4">
                  Click any orbiting planetary technology in the solar system to explore its architecture,
                  engineering proficiency, and applied portfolio projects.
                </p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {TECH_PLANETS.slice(0, 4).map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActivePlanet(p)}
                      className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-surface-2 hover:bg-primary/20 hover:text-primary border border-border/40 transition-colors"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TechUniverseOrbit;

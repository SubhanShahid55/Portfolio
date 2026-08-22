import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  MapPin, 
  Download, 
  CheckCircle2, 
  Layers, 
  Code2, 
  Zap, 
  Rocket, 
  ShieldCheck, 
  Users, 
  Database, 
  GraduationCap,
  Sparkles
} from 'lucide-react';
import portfolioData from '@/data/portfolioData';
import { profileKnowledge } from '@/data/profile';
import SectionHeading from './SectionHeading';

const workflowSteps = [
  {
    step: '01',
    phase: 'DISCOVER & ARCHITECT',
    title: 'System Design & Scoping',
    description: 'Decompose business requirements into modular architectures, database schemas, and RESTful API contracts.',
    icon: Layers,
    focus: 'Schema Design & API Specs',
  },
  {
    step: '02',
    phase: 'CLEAN IMPLEMENTATION',
    title: 'Full-Stack Development',
    description: 'Construct type-safe interfaces with React / Next.js and robust backend microservices with Node.js and TypeScript.',
    icon: Code2,
    focus: 'Type-Safe Modular Code',
  },
  {
    step: '03',
    phase: 'OPTIMIZE & VALIDATE',
    title: 'Performance & Testing',
    description: 'Implement database indexing, caching strategies, and comprehensive testing to ensure speed, uptime, and security.',
    icon: Zap,
    focus: '30% Lower Latency & 99.8% Uptime',
  },
  {
    step: '04',
    phase: 'DEPLOY & SCALE',
    title: 'Production CI/CD & Delivery',
    description: 'Automate deployments via Docker and Vercel with structured monitoring, observability, and iterative release cycles.',
    icon: Rocket,
    focus: 'Zero-Downtime Delivery',
  },
];

const pillars = [
  {
    icon: Code2,
    title: 'Full-Stack Architecture',
    desc: 'End-to-end delivery with React, Next.js, TypeScript, and Node.js.',
  },
  {
    icon: Database,
    title: 'Data Modeling & Scale',
    desc: 'Normalized PostgreSQL & flexible MongoDB schema design with caching.',
  },
  {
    icon: ShieldCheck,
    title: 'Performance & Uptime',
    desc: 'Proven 30% API latency reduction and 99.8% platform uptime.',
  },
  {
    icon: Users,
    title: 'Collaborative Sprint Leadership',
    desc: 'Led cross-functional teams of 5–8 developers with 95% on-time delivery.',
  },
];

const AboutSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="about" className="section-container">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <SectionHeading
          number="04"
          eyebrow="ABOUT & PATHWAY"
          title="Engineering approach &"
          highlight="workflow."
          subtitle="How I transform complex product requirements into scalable, production-ready software."
        />

        {/* Top Split: Bio + Technical Pillars (Left 7 cols) & Principles (Right 5 cols) */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 mb-10">
          {/* Left: Narrative & Core Pillars */}
          <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col">
            <div className="glass-card p-6 sm:p-8 flex-1 flex flex-col justify-between border-primary/20">
              <div>
                {/* Header Tag */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="eyebrow text-[10px] text-primary font-mono tracking-widest uppercase">
                    ENGINEERING PROFILE
                  </span>
                  <span className="h-px flex-1 bg-border/40" />
                </div>

                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed mb-4">
                  {portfolioData.about.bio}
                </p>

                {/* Live Availability Pill */}
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-primary font-medium mb-6 p-3 rounded-xl bg-primary/10 border border-primary/20 backdrop-blur-sm">
                  <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="leading-snug">{portfolioData.about.seeking}</span>
                </div>

                {/* 4 Pillars Grid: Fills space cleanly with high-value technical context */}
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {pillars.map((pillar) => {
                    const Icon = pillar.icon;
                    return (
                      <div
                        key={pillar.title}
                        className="p-3.5 rounded-xl bg-surface-2/70 border border-border/40 hover:border-primary/30 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="p-1 rounded bg-primary/15 text-primary">
                            <Icon size={14} />
                          </div>
                          <h4 className="text-xs font-bold text-foreground truncate">{pillar.title}</h4>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Location & Resume Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/25">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-muted-foreground">
                  <MapPin size={14} className="text-primary flex-shrink-0" />
                  <span>{portfolioData.personal.location}</span>
                </div>
                <a
                  href={portfolioData.personal.resumeUrl}
                  download
                  className="btn-outline px-4 py-2 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2 hover:border-primary hover:text-primary transition-all active:scale-95 shadow-sm"
                >
                  <Download size={13} />
                  <span>Download CV</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Principles (5 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col gap-3.5">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="eyebrow text-[10px] text-muted-foreground font-mono tracking-widest uppercase">
                CORE PRINCIPLES
              </span>
              <span className="h-px flex-1 bg-border/40" />
            </div>

            {portfolioData.about.principles.map((principle, index) => (
              <div
                key={principle.title}
                className="glass-card p-5 sm:p-6 hover:border-primary/40 transition-all duration-300 flex-1 flex flex-col justify-center group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="eyebrow text-[10px] text-primary font-mono tracking-wider">
                    0{index + 1} / PRINCIPLE
                  </span>
                  <Sparkles size={12} className="text-primary/40 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                  {principle.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Development Pathway: "How I Work — The Engineering Pipeline" */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="glass-card p-6 sm:p-8 border-primary/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-border/30">
              <div>
                <div className="flex items-center gap-2">
                  <span className="eyebrow text-[10px] text-primary font-mono tracking-widest uppercase">
                    EXECUTION FRAMEWORK
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground mt-1">
                  How I Work: From Concept to Production
                </h3>
              </div>
              <p className="text-xs font-mono text-muted-foreground">
                Predictable · Test-Driven · Scalable
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
              {workflowSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.step}
                    className="relative p-5 rounded-xl bg-surface-2/60 border border-border/50 hover:border-primary/40 transition-all duration-200 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary border border-primary/25 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon size={16} />
                        </div>
                        <span className="font-mono text-xs font-bold text-primary/70 group-hover:text-primary transition-colors">
                          {step.step}
                        </span>
                      </div>

                      <span className="text-[10px] font-mono text-muted-foreground block mb-1 uppercase tracking-wider">
                        {step.phase}
                      </span>
                      <h4 className="text-sm font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                        {step.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border/30 flex items-center gap-1.5 text-[11px] font-mono text-primary/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{step.focus}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar: Verified Education & Certifications */}
        <motion.div variants={itemVariants}>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Education */}
            <div className="glass-card p-5 border-border/40 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap size={16} className="text-primary" />
                <span className="eyebrow text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  ACADEMIC FOUNDATION
                </span>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  Bachelor of Science in Software Engineering (BSSE)
                </p>
                <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
                  Final Year Project: Digital Media Archive (Full-Stack Platform)
                </p>
              </div>
            </div>

            {/* Certifications */}
            <div className="glass-card p-5 border-primary/25 hover:border-primary/45 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={16} className="text-primary" />
                <span className="eyebrow text-[10px] font-mono text-primary uppercase tracking-wider">
                  VERIFIED INDUSTRY CERTIFICATIONS
                </span>
              </div>
              <div className="space-y-2">
                {profileKnowledge.certifications.map((cert) => (
                  <div key={cert.name} className="flex items-start justify-between gap-2">
                    <p className="text-xs sm:text-sm font-semibold text-foreground">{cert.name}</p>
                    <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">
                      {cert.issuer} · {cert.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;

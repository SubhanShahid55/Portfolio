import SEOHead from '@/components/SEOHead';
import HeroSection from '@/components/HeroSection';
import MetricStrip from '@/components/MetricStrip';
import ProcessMarquee from '@/components/ProcessMarquee';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import portfolioData from '@/data/portfolioData';

const Home = () => {
  return (
    <>
      <SEOHead
        title={`${portfolioData.personal.name} | ${portfolioData.personal.title}`}
        description={portfolioData.personal.subtitle}
        canonical="https://subhanshahidportfolio.vercel.app/"
      />

      {/* 01: Hero */}
      <HeroSection />

      {/* Verified Metric Strip */}
      <MetricStrip />

      {/* Engineering Process Marquee */}
      <ProcessMarquee />

      {/* 01: Selected Work */}
      <ProjectsSection />

      <div className="section-divider" />

      {/* 02: Work Experience */}
      <ExperienceSection />

      <div className="section-divider" />

      {/* 03: Testimonials & Endorsements */}
      <TestimonialsSection />

      <div className="section-divider" />

      {/* 04: About & Engineering Principles */}
      <AboutSection />

      <div className="section-divider" />

      {/* 05: Skills & Toolkit */}
      <SkillsSection />

      <div className="section-divider" />

      {/* 06: Contact Form & Direct Channels */}
      <ContactSection />
    </>
  );
};

export default Home;

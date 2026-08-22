import SEOHead from '@/components/SEOHead';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import portfolioData from '@/data/portfolioData';

const Home = () => {
  return (
    <>
      <SEOHead
        title={portfolioData.personal.title}
        description={portfolioData.personal.description}
        canonical="https://subhanshahidportfolio.vercel.app/"
      />
      
      {/* 
        Single-Page Layout for Home
        Each section has an ID that Navbar hash links can scroll to.
        The .section-divider adds consistent visual separation between major areas.
      */}
      
      <HeroSection />
      
      <div className="section-divider" />
      <AboutSection />
      
      <div className="section-divider" />
      <ExperienceSection />
      
      <div className="section-divider" />
      <ProjectsSection />
      
      <div className="section-divider" />
      <SkillsSection />
      
      <div className="section-divider" />
      <ContactSection />
      
    </>
  );
};

export default Home;

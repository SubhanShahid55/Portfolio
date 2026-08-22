import { motion } from 'framer-motion';
import SEOHead from '@/components/SEOHead';
import portfolioData from '@/data/portfolioData';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import CertificationsSection from '@/components/CertificationsSection';

const About = () => {
  return (
    <>
      <SEOHead
        title="About Me | Software Engineer"
        description={portfolioData.personal.description}
        canonical="https://subhanshahidportfolio.vercel.app/about"
      />

      <div className="pt-8">
        <AboutSection />
        
        <div className="section-divider" />
        <SkillsSection />
        
        <div className="section-divider" />
        <CertificationsSection />
      </div>
    </>
  );
};

export default About;

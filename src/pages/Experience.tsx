import SEOHead from '@/components/SEOHead';
import ExperienceSection from '@/components/ExperienceSection';
import portfolioData from '@/data/portfolioData';

const Experience = () => {
  return (
    <>
      <SEOHead
        title="Experience | Software Engineer"
        description="Professional experience of Muhammad Subhan Shahid in software engineering."
        canonical="https://subhanshahidportfolio.vercel.app/experience"
      />

      <div className="pt-8">
        <ExperienceSection />
      </div>
    </>
  );
};

export default Experience;

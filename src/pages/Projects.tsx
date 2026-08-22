import SEOHead from '@/components/SEOHead';
import ProjectsSection from '@/components/ProjectsSection';
import portfolioData from '@/data/portfolioData';

const Projects = () => {
  return (
    <>
      <SEOHead
        title="Projects | Software Engineer"
        description="Portfolio of web development and software engineering projects by Muhammad Subhan Shahid."
        canonical="https://subhanshahidportfolio.vercel.app/projects"
      />

      <div className="pt-8">
        <ProjectsSection />
      </div>
    </>
  );
};

export default Projects;

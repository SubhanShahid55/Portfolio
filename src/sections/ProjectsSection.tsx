import React, { useState } from 'react';
import Section from '../components/Section';
import AnimatedElement from '../components/AnimatedElement';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  demoUrl?: string;
  codeUrl?: string;
}

interface ProjectsSectionProps {
  data: {
    projects: Project[];
    categories: string[];
  };
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const filteredProjects = activeCategory === 'All' 
    ? data.projects 
    : data.projects.filter(project => project.tags.includes(activeCategory));

  return (
    <Section id="projects" title="My Projects">
      <div className="mb-10">
        <div className="flex flex-wrap gap-3 mb-10">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeCategory === 'All'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All
          </button>
          
          {data.categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <AnimatedElement key={project.id} delay={index * 100}>
              <div className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all">
                <div className="relative overflow-hidden h-60">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex gap-3">
                      {project.demoUrl && (
                        <a 
                          href={project.demoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-colors"
                          aria-label="View Demo"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                      {project.codeUrl && (
                        <a 
                          href={project.codeUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-colors"
                          aria-label="View Code"
                        >
                          <Github size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ProjectsSection;
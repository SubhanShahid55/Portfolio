import React from 'react';
import Section from '../components/Section';
import AnimatedElement from '../components/AnimatedElement';

interface Skill {
  name: string;
  imageUrl: string;
  level: number;
  category: string;
}

interface SkillsSectionProps {
  data: {
    skills: Skill[];
    categories: string[];
  };
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ data }) => {
  return (
    <Section id="skills" title="Skills & Expertise" className="bg-gray-50 dark:bg-gray-900">
      <div className="mb-10">
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {data.categories.map((category, index) => (
            <AnimatedElement key={index} delay={index * 100}>
              <div className="px-5 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-gray-700 dark:text-gray-300 font-medium">
                {category}
              </div>
            </AnimatedElement>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.skills.map((skill, index) => (
            <AnimatedElement key={index} delay={index * 100}>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg p-2 group-hover:scale-110 transition-transform">
                    <img
                      src={skill.imageUrl}
                      alt={skill.name}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {skill.name}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {skill.category}
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all group-hover:bg-blue-500"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default SkillsSection;
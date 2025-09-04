import React from 'react';
import Section from '../components/Section';
import AnimatedElement from '../components/AnimatedElement';

interface AboutSectionProps {
  data: {
    bio: string;
    values: Array<{
      title: string;
      description: string;
    }>;
  };
}

const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  return (
    <Section id="about" title="About Me">
      <div className="w-full flex flex-col gap-12 mb-16 md:mb-24">
        
        {/* About Text */}
        <AnimatedElement className="w-full">
          <div className="prose max-w-none dark:prose-invert">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              {data.bio}
            </p>
          </div>
        </AnimatedElement>

        {/* Values (Cards/Tabs) */}
        <AnimatedElement delay={200} className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {data.values.map((value, index) => (
              <div 
                key={index} 
                className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-500 ease-in-out"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </AnimatedElement>

      </div>
    </Section>
  );
};

export default AboutSection;

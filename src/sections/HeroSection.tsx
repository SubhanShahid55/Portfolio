import React from 'react';
import { ArrowDown } from 'lucide-react';
import AnimatedElement from '../components/AnimatedElement';

interface HeroSectionProps {
  data: {
    name: string;
    title: string;
    description: string;
    imageUrl: string;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/20 dark:to-transparent opacity-50"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <AnimatedElement className="flex-1">
            <div className="max-w-2xl space-y-6">
              <h3 className="text-lg md:text-xl text-blue-600 dark:text-blue-400 font-medium animate-fade-in">
                Hi, I'm <span className="font-bold">Subhan Shahid</span>
              </h3>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-fade-in">
                {data.name}
              </h1>
              <h2 className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 animate-slide-up">
                {data.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed animate-slide-up">
                {data.description}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="#contact" 
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  Contact Me
                </a>
                <a 
                  href="#projects" 
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-300 hover:-translate-y-1"
                >
                  View Projects
                </a>
              </div>
            </div>
          </AnimatedElement>
          
          <AnimatedElement delay={200} className="flex-1">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-900/30 dark:to-purple-900/30 absolute -top-6 -left-6 animate-pulse"></div>
              <img 
                src="https://pics.craiyon.com/2023-10-25/b65f72d6d11a48c1bc560059cc36e31f.webp" 
                alt="Muhammad Subhan Shahid" 
                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-xl relative z-10 transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse delay-300"></div>
            </div>
          </AnimatedElement>
        </div>
      </div>

      <a 
        href="#about" 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <span className="text-sm">Scroll Down</span>
        <ArrowDown size={20} className="animate-bounce" />
      </a>
    </section>
  );
};

export default HeroSection;
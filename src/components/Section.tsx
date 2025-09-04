import React, { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, children, className = '' }) => {
  return (
    <section 
      id={id} 
      className={`py-16 md:py-24 scroll-mt-20 ${className}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-white relative inline-block">
          {title}
          <span className="absolute -bottom-3 left-0 w-1/3 h-1 bg-blue-500"></span>
        </h2>
        {children}
      </div>
    </section>
  );
};

export default Section;
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {currentYear} Muhammad Subhan Shahid. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
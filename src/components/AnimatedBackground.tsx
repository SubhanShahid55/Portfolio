import React from 'react';

const AnimatedBackground: React.FC = () => {
  const logos = [
    {
      name: 'React',
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
      size: 'w-8 h-8',
      delay: '0s',
      duration: '20s',
      path: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
    },
    {
      name: 'JavaScript',
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
      size: 'w-6 h-6',
      delay: '2s',
      duration: '25s',
      path: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
    },
    {
      name: 'HTML5',
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg',
      size: 'w-7 h-7',
      delay: '4s',
      duration: '30s',
      path: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
    },
    {
      name: 'CSS3',
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg',
      size: 'w-6 h-6',
      delay: '6s',
      duration: '22s',
      path: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
    },
    {
      name: 'Node.js',
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
      size: 'w-8 h-8',
      delay: '8s',
      duration: '28s',
      path: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
    },
    {
      name: 'Git',
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg',
      size: 'w-7 h-7',
      delay: '10s',
      duration: '26s',
      path: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
    },
    {
      name: 'TypeScript',
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
      size: 'w-6 h-6',
      delay: '12s',
      duration: '24s',
      path: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
    },
    {
      name: 'Figma',
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg',
      size: 'w-6 h-6',
      delay: '14s',
      duration: '32s',
      path: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
    }
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating logos */}
      {logos.map((logo, index) => (
        <div
          key={logo.name}
          className={`absolute opacity-10 dark:opacity-5 animate-float-${index + 1}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: logo.delay,
            animationDuration: logo.duration,
          }}
        >
          <img
            src={logo.icon}
            alt={logo.name}
            className={`${logo.size} filter grayscale hover:grayscale-0 transition-all duration-500`}
          />
        </div>
      ))}

      {/* Additional geometric shapes */}
      <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-blue-400/20 rounded-full animate-pulse-slow"></div>
      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400/20 rounded-full animate-bounce-slow"></div>
      <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-green-400/20 rounded-full animate-ping-slow"></div>
      <div className="absolute top-1/2 right-1/6 w-2 h-2 bg-yellow-400/20 rounded-full animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-red-400/20 rounded-full animate-bounce-slow" style={{ animationDelay: '5s' }}></div>
      
      {/* Gradient orbs */}
      <div className="absolute top-1/5 right-1/5 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl animate-float-orb-1"></div>
      <div className="absolute bottom-1/5 left-1/5 w-40 h-40 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-xl animate-float-orb-2"></div>
      <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-xl animate-float-orb-3"></div>
    </div>
  );
};

export default AnimatedBackground;
import React from 'react';
import { motion } from 'framer-motion';
import { getTechBrandIcon } from './TechBrandIcons';

interface TechIconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const TechIcon: React.FC<TechIconProps> = ({ name, size = 'md', showLabel = true }) => {
  const sizeMap = {
    sm: 14,
    md: 17,
    lg: 22,
  };
  
  const containerClasses = {
    sm: 'px-2 py-1 gap-1.5',
    md: 'px-2.5 py-1.5 gap-2',
    lg: 'px-3.5 py-2 gap-2.5',
  };

  const IconComponent = getTechBrandIcon(name);

  return (
    <motion.span 
      whileHover={{ scale: 1.05, y: -2 }}
      className={`inline-flex items-center ${containerClasses[size]} bg-surface-2/90 rounded-lg text-foreground hover:border-cyan-400/50 hover:bg-surface-3 transition-colors border border-border/50 shadow-sm`}
    >
      <IconComponent 
        size={sizeMap[size]}
        className="flex-shrink-0"
      />
      {showLabel && <span className="text-xs font-mono font-medium">{name}</span>}
    </motion.span>
  );
};

export default TechIcon;

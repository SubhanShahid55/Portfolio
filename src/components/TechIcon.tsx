import { motion } from 'framer-motion';
import { 
  Code, Database, Server, Cloud, CreditCard, Brain, 
  FileCode, Layers, Box, GitBranch, Globe
} from 'lucide-react';

// Map tech names to Lucide icons and colors
const techConfig: Record<string, { icon: React.ElementType; color: string }> = {
  // Languages
  'Python': { icon: FileCode, color: '#3776AB' },
  'JavaScript': { icon: FileCode, color: '#F7DF1E' },
  'TypeScript': { icon: FileCode, color: '#3178C6' },
  'JavaScript/TypeScript': { icon: FileCode, color: '#3178C6' },
  'PHP': { icon: FileCode, color: '#777BB4' },
  'Rust': { icon: FileCode, color: '#DEA584' },
  'C/C++': { icon: FileCode, color: '#00599C' },
  
  // Frontend
  'React': { icon: Layers, color: '#61DAFB' },
  'Angular': { icon: Layers, color: '#DD0031' },
  'HTML5': { icon: Globe, color: '#E34F26' },
  'HTML5/CSS3': { icon: Globe, color: '#E34F26' },
  'CSS3': { icon: Globe, color: '#1572B6' },
  
  // Backend
  'Node.js': { icon: Server, color: '#339933' },
  'Node.js/Express': { icon: Server, color: '#339933' },
  'Express': { icon: Server, color: '#ffffff' },
  'Flask': { icon: Server, color: '#ffffff' },
  'Flask/Django': { icon: Server, color: '#092E20' },
  'Django': { icon: Server, color: '#092E20' },
  'RESTful APIs': { icon: Globe, color: '#009688' },
  
  // Databases
  'MongoDB': { icon: Database, color: '#47A248' },
  'PostgreSQL': { icon: Database, color: '#4169E1' },
  'MySQL': { icon: Database, color: '#4479A1' },
  
  // DevOps
  'Docker': { icon: Box, color: '#2496ED' },
  'AWS': { icon: Cloud, color: '#FF9900' },
  'Git': { icon: GitBranch, color: '#F05032' },
  
  // Payment
  'Stripe': { icon: CreditCard, color: '#008CDD' },
  'PayPal': { icon: CreditCard, color: '#00457C' },
  
  // ML
  'Machine Learning': { icon: Brain, color: '#FF6F00' },
};

interface TechIconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const TechIcon = ({ name, size = 'md', showLabel = true }: TechIconProps) => {
  const tech = techConfig[name];
  const sizeMap = {
    sm: 14,
    md: 16,
    lg: 20,
  };
  
  const containerClasses = {
    sm: 'px-2 py-1 gap-1',
    md: 'px-3 py-1.5 gap-2',
    lg: 'px-4 py-2 gap-2',
  };

  const IconComponent = tech?.icon || Code;
  const color = tech?.color || 'currentColor';

  return (
    <motion.span 
      whileHover={{ scale: 1.05, y: -2 }}
      className={`inline-flex items-center ${containerClasses[size]} bg-muted/50 rounded-lg text-muted-foreground hover:bg-muted transition-colors border border-border/50`}
    >
      <IconComponent 
        size={sizeMap[size]}
        style={{ color }}
      />
      {showLabel && <span className="text-xs font-medium">{name}</span>}
    </motion.span>
  );
};

export default TechIcon;

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  number: string;
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

const SectionHeading = ({
  number,
  eyebrow,
  title,
  highlight,
  subtitle,
  align = 'left',
}: SectionHeadingProps) => {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={`mb-14 md:mb-16 ${alignClass}`}
    >
      <span className="eyebrow mb-3 inline-block">
        {number} / {eyebrow}
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3">
        {title}{' '}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed"
           style={align === 'center' ? { margin: '0 auto' } : undefined}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;

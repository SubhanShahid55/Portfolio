import { motion } from 'framer-motion';
import portfolioData from '@/data/portfolioData';

const MetricStrip = () => {
  return (
    <div className="border-y border-border/40 bg-surface-1/40 py-8 md:py-10">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 max-w-[1200px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {portfolioData.stats.map((stat, index) => {
            const formattedValue = `${stat.value}${stat.suffix}`;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="text-center group"
                aria-label={`${formattedValue} ${stat.label}`}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-1 font-mono tracking-tight group-hover:text-primary transition-colors">
                  <span className="gradient-text">{formattedValue}</span>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MetricStrip;

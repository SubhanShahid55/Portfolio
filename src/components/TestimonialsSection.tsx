import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote, Star, Users, Heart, DollarSign } from 'lucide-react';

const stats = [
  { icon: Users, value: '15+', label: 'International Clients' },
  { icon: Heart, value: '100%', label: 'Satisfaction Rate' },
  { icon: DollarSign, value: '$25K+', label: 'Revenue Generated' },
];

const testimonials = [
  {
    quote: "Muhammad delivered exceptional work on our e-commerce platform. His technical expertise and attention to detail exceeded our expectations.",
    client: "E-commerce Client",
    industry: "E-commerce",
    rating: 5,
  },
  {
    quote: "The fraud detection system he built has significantly improved our security posture. Highly recommended for any AI/ML projects.",
    client: "Fintech Client",
    industry: "Fintech",
    rating: 5,
  },
  {
    quote: "Professional, responsive, and incredibly skilled. The real estate platform he developed is robust and scales beautifully.",
    client: "Healthcare Client",
    industry: "Healthcare",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="section-container">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="section-title">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            What my clients say about working with me
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 mb-16 max-w-2xl mx-auto"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="glass-card p-6 relative"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-primary/30 absolute top-4 right-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>

              {/* Client Info */}
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">{testimonial.client}</span>
                <span className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
                  {testimonial.industry}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;

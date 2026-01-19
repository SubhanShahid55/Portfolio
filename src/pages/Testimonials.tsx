import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote, Star, Users, Heart, Award, Calendar, ExternalLink } from 'lucide-react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';

const stats = [
  { icon: Users, value: '10+', label: 'Happy Clients' },
  { icon: Heart, value: '100%', label: 'Satisfaction Rate' },
  { icon: Award, value: '6+', label: 'Projects Completed' },
];

const testimonials = [
  {
    quote: "Muhammad built our Homixa home services website with exceptional attention to detail. The modern design and responsive layout perfectly represent our brand. Highly professional and delivered on time!",
    client: "Homixa Team",
    role: "Client",
    company: "Homixa",
    industry: "Home Services",
    rating: 5,
  },
  {
    quote: "The Meme Coins Agent platform he developed is fantastic! Real-time crypto data, clean UI, and excellent performance. Muhammad understood our vision and executed it perfectly.",
    client: "Crypto Client",
    role: "Founder",
    company: "Meme Coins Agent",
    industry: "Cryptocurrency",
    rating: 5,
  },
  {
    quote: "The Habit Tracker app Muhammad created is intuitive and well-designed. The React implementation is clean, and the visual analytics feature really helps users stay motivated. Great work!",
    client: "App User",
    role: "User",
    company: "Habit Tracker",
    industry: "Productivity",
    rating: 5,
  },
  {
    quote: "Muhammad developed our fraud detection system with impressive accuracy. His Python and machine learning skills are top-notch. The real-time alerting dashboard has been invaluable for our security.",
    client: "University Supervisor",
    role: "Supervisor",
    company: "University Project",
    industry: "Machine Learning",
    rating: 5,
  },
];

const certifications = [
  {
    title: 'MEAN Stack Development Bootcamp',
    issuer: 'Hami Trainings',
    date: 'January 2025',
    description: 'Comprehensive bootcamp covering MongoDB, Express, Angular, and Node.js full-stack development with real-world projects.',
    credentialId: 'MEAN-2025-001',
  },
  {
    title: 'Professional Digital Marketing Certification',
    issuer: 'Industry Certification',
    date: 'January 2024',
    description: 'Advanced digital marketing strategies including SEO, SEM, social media marketing, analytics, and conversion optimization.',
    credentialId: 'PDM-2024-001',
  },
];

const Testimonials = () => {
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
    <Layout>
      <SEOHead
        title="Testimonials & Certifications"
        description="Client testimonials and professional certifications of Muhammad Subhan Shahid."
        canonical="https://subhansportfolio.vercel.app/testimonials"
      />

      <section className="section-container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Testimonials Section */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="section-title">
              Client <span className="gradient-text">Testimonials</span>
            </h1>
            <p className="section-subtitle max-w-2xl mx-auto">
              What my clients say about working with me
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 mb-16 max-w-3xl mx-auto"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-6 text-center"
              >
                <stat.icon className="w-10 h-10 mx-auto mb-3 text-primary" />
                <div className="text-2xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="glass-card p-8 relative"
              >
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-primary/20 absolute top-4 right-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-muted-foreground mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Client Info */}
                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.client}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                    </div>
                    <span className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
                      {testimonial.industry}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications Section */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="section-title">
              <span className="gradient-text">Certifications</span>
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Professional certifications and continuous learning achievements
            </p>
          </motion.div>

          {/* Certifications Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-card p-8 group"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Award className="w-8 h-8 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>

                {/* Issuer & Date */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="text-primary font-medium">{cert.issuer}</span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar size={14} />
                    {cert.date}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4">{cert.description}</p>

                {/* Credential ID */}
                <p className="text-xs text-muted-foreground mb-4">
                  Credential ID: <span className="font-mono">{cert.credentialId}</span>
                </p>

                {/* View Certificate Link */}
                <motion.a
                  href="#"
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors"
                >
                  View Certificate
                  <ExternalLink size={14} />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Testimonials;

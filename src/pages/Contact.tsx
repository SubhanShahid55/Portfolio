import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import portfolioData from '@/data/portfolioData';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const resp = await fetch('https://formspree.io/f/xrbqbqwa', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await resp.json();
      if (resp.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        console.error('Formspree error', result);
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error('Form submission failed', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

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

  const contactInfo = [
    { icon: Mail, label: 'Email', value: portfolioData.contact.email, href: `mailto:${portfolioData.contact.email}` },
    { icon: Phone, label: 'Phone', value: portfolioData.contact.phone, href: `tel:${portfolioData.contact.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: 'Location', value: portfolioData.contact.location, href: '#' },
  ];

  return (
    <Layout>
      <SEOHead
        title="Contact Me"
        description="Get in touch with Muhammad Subhan Shahid for project inquiries, collaboration opportunities, or freelance work."
        canonical="https://subhanshahidportfolio.vercel.app/contact"
      />

      <section className="section-container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="section-title">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="section-subtitle max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-2">Let's Connect</h2>
                <p className="text-muted-foreground mb-8">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
                
                <div className="space-y-6">
                  {contactInfo.map((item) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                          {item.value}
                        </p>
                      </div>
                      <ArrowRight size={16} className="ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </motion.a>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-border">
                  <p className="text-muted-foreground mb-4">Connect with me on social media</p>
                  <div className="flex gap-4">
                    {portfolioData.contact.socials.linkedin && (
                      <motion.a
                        href={portfolioData.contact.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-14 h-14 glass-card rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                      >
                        <Linkedin size={24} />
                      </motion.a>
                    )}
                    {portfolioData.contact.socials.instagram && (
                      <motion.a
                        href={portfolioData.contact.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-14 h-14 glass-card rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                      >
                        <Instagram size={24} />
                      </motion.a>
                    )}
                    {portfolioData.contact.socials.github && (
                      <motion.a
                        href={portfolioData.contact.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-14 h-14 glass-card rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                      >
                        <Github size={24} />
                      </motion.a>
                    )}
                    {/* Floating WhatsApp button is rendered globally in Layout */}
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <motion.div variants={itemVariants} className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4">Why Work With Me?</h3>
                <ul className="space-y-3">
                  {portfolioData.about.values.map((value) => (
                    <li key={value.title} className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle size={18} className="text-primary flex-shrink-0" />
                      <span>{value.title}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`input-glass ${errors.name ? 'border-destructive' : ''}`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input-glass ${errors.email ? 'border-destructive' : ''}`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject Input */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`input-glass ${errors.subject ? 'border-destructive' : ''}`}
                    placeholder="Project inquiry"
                  />
                  {errors.subject && (
                    <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message Input */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`input-glass resize-none ${errors.message ? 'border-destructive' : ''}`}
                    placeholder="Tell me about your project, timeline, and budget..."
                  />
                  {errors.message && (
                    <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-3 rounded-lg"
                  >
                    <CheckCircle size={18} />
                    Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-destructive bg-destructive/10 px-4 py-3 rounded-lg"
                  >
                    <AlertCircle size={18} />
                    Failed to send message. Please try again or email rajpootsubhan41@gmail.com.
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Contact;

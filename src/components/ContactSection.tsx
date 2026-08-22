import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Github, Linkedin, CheckCircle, AlertCircle } from 'lucide-react';
import portfolioData from '@/data/portfolioData';
import WhatsAppIcon from './WhatsAppIcon';

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

const ContactSection = () => {
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
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitStatus('idle'), 5000);
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
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="contact" className="section-container">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-14">
          <h2 className="section-title">
            Let's Build <span className="gradient-text">Something Together</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            I'm currently open to Software Engineering, Full-Stack, MERN, and Next.js opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="glass-card p-7">
              <h3 className="text-xl font-bold mb-6">Get In Touch</h3>

              <div className="space-y-5">
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                      {portfolioData.personal.email}
                    </p>
                  </div>
                </a>
                <a
                  href={`tel:${portfolioData.personal.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                      {portfolioData.personal.phone}
                    </p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-foreground font-medium">{portfolioData.personal.location}</p>
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="mt-8 pt-6 border-t border-border/30">
                <p className="text-sm text-muted-foreground mb-4">Quick connect</p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`mailto:${portfolioData.personal.email}`}
                    className="btn-primary text-sm px-5 py-2 inline-flex items-center gap-2"
                  >
                    <Mail size={15} />
                    Email Me
                  </a>
                  <a
                    href={portfolioData.personal.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-sm px-5 py-2 inline-flex items-center gap-2"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    WhatsApp
                  </a>
                  <a
                    href={portfolioData.personal.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-sm px-5 py-2 inline-flex items-center gap-2"
                  >
                    <Linkedin size={15} />
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6 pt-6 border-t border-border/30 flex gap-3">
                <a
                  href={portfolioData.personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href={portfolioData.personal.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="glass-card p-7">
            <h3 className="text-xl font-bold mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                <input type="text" id="contact-name" name="name" value={formData.name} onChange={handleChange}
                  className={`input-glass ${errors.name ? 'border-destructive' : ''}`} placeholder="Your name" />
                {errors.name && <p className="text-destructive text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                <input type="email" id="contact-email" name="email" value={formData.email} onChange={handleChange}
                  className={`input-glass ${errors.email ? 'border-destructive' : ''}`} placeholder="your@email.com" />
                {errors.email && <p className="text-destructive text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
                <input type="text" id="contact-subject" name="subject" value={formData.subject} onChange={handleChange}
                  className={`input-glass ${errors.subject ? 'border-destructive' : ''}`} placeholder="Opportunity / Project inquiry" />
                {errors.subject && <p className="text-destructive text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.subject}</p>}
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} rows={4}
                  className={`input-glass resize-none ${errors.message ? 'border-destructive' : ''}`} placeholder="Tell me about the opportunity..." />
                {errors.message && <p className="text-destructive text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.message}</p>}
              </div>
              <motion.button type="submit" disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }} whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? (
                  <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full" />Sending...</>
                ) : (
                  <><Send size={16} />Send Message</>
                )}
              </motion.button>
              {submitStatus === 'success' && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-3 rounded-lg text-sm">
                  <CheckCircle size={16} />Message sent! I'll get back to you soon.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;

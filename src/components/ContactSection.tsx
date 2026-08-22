import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Github, Linkedin, CheckCircle, AlertCircle } from 'lucide-react';
import portfolioData from '@/data/portfolioData';
import WhatsAppIcon from './WhatsAppIcon';
import SectionHeading from './SectionHeading';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  companyName: string; // Honeypot field (named innocuously)
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    companyName: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Please specify a subject';
    if (!formData.message.trim()) newErrors.message = 'Please enter your message';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam protection: if filled by a bot, silently complete
    if (formData.companyName) {
      setSubmitStatus('success');
      return;
    }

    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      // Create mailto string and trigger email client
      const subject = encodeURIComponent(`[Portfolio Contact] ${formData.subject}`);
      const body = encodeURIComponent(
        `Hi Subhan,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\nSent from portfolio contact form.`
      );
      
      // Open mailto URL
      window.location.href = `mailto:${portfolioData.personal.email}?subject=${subject}&body=${body}`;

      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', companyName: '' });
      setTimeout(() => setSubmitStatus('idle'), 10000);
    } catch {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 6000);
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
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="contact" className="section-container">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <SectionHeading
          number="06"
          eyebrow="CONTACT"
          title="Let's build"
          highlight="together."
          subtitle="Open to Software Engineering, Full-Stack, MERN, and Next.js roles worldwide. Reach out directly or send a message."
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 max-w-5xl">
          {/* Left: Contact Info & Direct Channels (5 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-4">
            <div className="glass-card p-6 sm:p-7 h-full flex flex-col justify-between">
              <div>
                <span className="eyebrow text-[10px] block mb-2 font-mono">DIRECT INQUIRIES</span>
                <h3 className="text-lg font-bold text-foreground mb-5">
                  Get In Touch Directly
                </h3>

                <div className="space-y-4">
                  {/* Email */}
                  <a
                    href={`mailto:${portfolioData.personal.email}`}
                    className="flex items-center gap-3 group p-2.5 rounded-lg hover:bg-surface-2 transition-colors border border-transparent hover:border-border/30"
                  >
                    <div className="w-9 h-9 rounded-md bg-primary/10 border border-primary/25 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Mail size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono text-muted-foreground uppercase">Email</p>
                      <p className="text-xs sm:text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {portfolioData.personal.email}
                      </p>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={portfolioData.personal.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group p-2.5 rounded-lg hover:bg-surface-2 transition-colors border border-transparent hover:border-border/30"
                  >
                    <div className="w-9 h-9 rounded-md bg-green-500/10 border border-green-500/25 flex items-center justify-center text-green-400 flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                      <WhatsAppIcon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono text-muted-foreground uppercase">WhatsApp / Direct</p>
                      <p className="text-xs sm:text-sm font-medium text-foreground truncate group-hover:text-green-400 transition-colors">
                        {portfolioData.personal.phone}
                      </p>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-center gap-3 p-2.5">
                    <div className="w-9 h-9 rounded-md bg-surface-2 border border-border/40 flex items-center justify-center text-muted-foreground flex-shrink-0">
                      <MapPin size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono text-muted-foreground uppercase">Location</p>
                      <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                        {portfolioData.personal.location} (Remote Worldwide)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels Row */}
              <div className="pt-6 border-t border-border/20 mt-6">
                <p className="text-[10px] font-mono text-muted-foreground uppercase mb-3">
                  Professional Profiles
                </p>
                <div className="flex items-center gap-2">
                  <a
                    href={portfolioData.personal.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline px-3 py-1.5 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1.5"
                    aria-label="GitHub Profile"
                  >
                    <Github size={13} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={portfolioData.personal.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline px-3 py-1.5 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1.5"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={13} />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form (7 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-7 border-primary/20">
              <span className="eyebrow text-[10px] block mb-1 font-mono">MESSAGE FORM</span>
              <h3 className="text-base font-bold text-foreground mb-4">
                Send A Project Inquiry or Interview Request
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Honeypot Spam Protection (Hidden from screen readers & users) */}
                <div className="sr-only" aria-hidden="true" style={{ display: 'none' }}>
                  <label htmlFor="companyName">Company Name</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono font-medium text-foreground mb-1">
                      Your Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`input-glass text-xs sm:text-sm py-2 px-3 ${errors.name ? 'border-destructive' : ''}`}
                      placeholder="e.g. Alex Morgan"
                      required
                    />
                    {errors.name && (
                      <p className="text-destructive text-[11px] font-mono mt-1 flex items-center gap-1">
                        <AlertCircle size={11} />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono font-medium text-foreground mb-1">
                      Your Email <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input-glass text-xs sm:text-sm py-2 px-3 ${errors.email ? 'border-destructive' : ''}`}
                      placeholder="alex@company.com"
                      required
                    />
                    {errors.email && (
                      <p className="text-destructive text-[11px] font-mono mt-1 flex items-center gap-1">
                        <AlertCircle size={11} />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-mono font-medium text-foreground mb-1">
                    Subject <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`input-glass text-xs sm:text-sm py-2 px-3 ${errors.subject ? 'border-destructive' : ''}`}
                    placeholder="Full-Stack Opportunity / Freelance Project"
                    required
                  />
                  {errors.subject && (
                    <p className="text-destructive text-[11px] font-mono mt-1 flex items-center gap-1">
                      <AlertCircle size={11} />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono font-medium text-foreground mb-1">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`input-glass text-xs sm:text-sm py-2 px-3 resize-none ${errors.message ? 'border-destructive' : ''}`}
                    placeholder="Tell me about the role, project scope, or technical requirements..."
                    required
                  />
                  {errors.message && (
                    <p className="text-destructive text-[11px] font-mono mt-1 flex items-center gap-1">
                      <AlertCircle size={11} />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Action Buttons Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="btn-primary text-xs font-mono uppercase tracking-wider px-6 py-2.5 inline-flex items-center gap-2 disabled:opacity-50 min-w-[160px] justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                        <span>Opening...</span>
                      </>
                    ) : (
                      <>
                        <Send size={13} />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>

                  <a
                    href={`mailto:${portfolioData.personal.email}`}
                    className="text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
                  >
                    Direct email: {portfolioData.personal.email}
                  </a>
                </div>

                {/* Feedback Alerts */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2.5 text-green-400 bg-green-500/10 px-3.5 py-3 rounded-lg text-xs border border-green-500/20"
                  >
                    <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Email client launched!</p>
                      <p className="text-[11px] text-green-300/80 mt-0.5">
                        If your email client didn't open, email directly at {portfolioData.personal.email}
                      </p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2.5 text-destructive bg-destructive/10 px-3.5 py-3 rounded-lg text-xs border border-destructive/20"
                  >
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Unable to launch email client automatically.</p>
                      <p className="text-[11px] text-destructive/80 mt-0.5">
                        Please email directly at {portfolioData.personal.email}
                      </p>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;

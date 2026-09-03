import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import portfolioData from '@/data/portfolioData';
import WhatsAppIcon from './WhatsAppIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Work', id: 'work' },
    { label: 'Experience', id: 'experience' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Contact', id: 'contact' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 76;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-border/40 bg-surface-1/60 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 max-w-[1200px] py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Availability Statement (5 cols) */}
          <div className="md:col-span-5 space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg overflow-hidden border border-primary/30 bg-surface-2 flex items-center justify-center flex-shrink-0">
                <img
                  src="/images/subhan-avatar.jpg"
                  alt="Muhammad Subhan Shahid Logo"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="text-sm font-bold text-foreground">
                {portfolioData.personal.name}
              </h3>
            </div>
            
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              Full-Stack Software Engineer building reliable web applications with React, Next.js, Node.js, and modern databases.
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono text-muted-foreground pt-1">
              <span>{portfolioData.personal.location}</span>
            </div>
          </div>

          {/* Quick Navigation (4 cols) */}
          <div className="md:col-span-4">
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2.5">
              Navigation
            </p>
            <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Footer quick navigation">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.id)}
                  className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Connect & Direct Link (3 cols) */}
          <div className="md:col-span-3 md:text-right space-y-3">
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              Direct Contact
            </p>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="text-xs font-mono text-primary hover:underline block truncate"
            >
              {portfolioData.personal.email}
            </a>

            <div className="flex items-center md:justify-end gap-2 pt-1">
              <a
                href={portfolioData.personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded border border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                aria-label="GitHub"
              >
                <Github size={14} />
              </a>
              <a
                href={portfolioData.personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded border border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={14} />
              </a>
              <a
                href={portfolioData.personal.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded border border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="p-1.5 rounded border border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                aria-label="Email"
              >
                <Mail size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 mt-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-muted-foreground">
          <p>© {currentYear} Muhammad Subhan Shahid. All rights reserved.</p>
          <button
            onClick={() => scrollTo('home')}
            className="inline-flex items-center gap-1 hover:text-primary transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

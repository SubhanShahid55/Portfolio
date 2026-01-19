import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="relative border-t border-border">

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold gradient-text mb-2">Muhammad Subhan Shahid</h3>
            <p className="text-sm text-muted-foreground">© {currentYear} All rights reserved.</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/muhammad-subhan-shahid-564160384/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://instagram.com/iamsubhanshahid" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://github.com/SubhanShahid55" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
              </a>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

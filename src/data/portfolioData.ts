export interface Experience {
  title: string;
  company: string;
  location: string;
  type: string; // "Full-time" | "Internship" | "Freelance" | "Contract"
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
  current: boolean;
  logo?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  tags: string[];
  techStack: string[];
  features?: string[];
  demoUrl?: string;
  codeUrl?: string;
  featured: boolean;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  relevance: 'primary' | 'secondary';
}

export interface PortfolioData {
  personal: {
    name: string;
    shortName: string;
    title: string;
    subtitle: string;
    description: string;
    location: string;
    email: string;
    phone: string;
    availability: string;
    resumeUrl: string;
    profileImage: string;
    socials: {
      github: string;
      linkedin: string;
      instagram: string;
      whatsapp: string;
    };
  };
  about: {
    bio: string;
    seeking: string;
  };
  experience: Experience[];
  projects: Project[];
  skills: SkillCategory[];
  stats: Stat[];
  certifications: Certification[];
}

const portfolioData: PortfolioData = {
  personal: {
    name: 'Muhammad Subhan Shahid',
    shortName: 'Subhan Shahid',
    title: 'Software Engineer | Full-Stack Developer',
    subtitle: 'I build production-ready web applications using React, Next.js, TypeScript, Node.js, and modern databases.',
    description: 'Software Engineer and Full-Stack Developer specializing in React, Next.js, TypeScript, Node.js, MongoDB, and PostgreSQL.',
    location: 'Rawalpindi, Pakistan',
    email: 'subhanshahid.dev@gmail.com',
    phone: '+92 324-0545602',
    availability: 'Open to Software Engineering Opportunities',
    resumeUrl: '/Muhammad_Subhan_CV.pdf',
    profileImage: '/logo.png',
    socials: {
      github: 'https://github.com/SubhanShahid55',
      linkedin: 'https://www.linkedin.com/in/muhammad-subhan-shahid-564160384',
      instagram: 'https://www.instagram.com/iamsubhanshahid/',
      whatsapp: 'https://wa.me/923240545602',
    },
  },

  about: {
    bio: "I'm a Software Engineer focused on full-stack web development. I build responsive, production-ready applications using React, Next.js, TypeScript, Node.js, MongoDB, and PostgreSQL. I've worked on client projects across fintech, healthcare, e-commerce, and SaaS, with experience spanning frontend development, backend APIs, databases, integrations, and deployment.",
    seeking: 'Currently seeking Software Engineer, Full-Stack Developer, MERN, and Next.js opportunities.',
  },

  experience: [
    {
      title: 'Summer Intern',
      company: 'EasyPaisa',
      location: 'Onsite',
      type: 'Internship',
      period: 'July 2026 – August 2026',
      description: 'Interned at EasyPaisa, one of Pakistan\'s leading digital financial services platforms, within the Channel and Development Solutions Team.',
      highlights: [
        'Supported the Channel and Development Solutions Team at EasyPaisa digital banking platform',
        'Programmed and maintained features for merchant and retail applications serving millions of users',
        'Evaluated EasyPaisa APIs and financial technology concepts during technical sessions',
        'Gained hands-on exposure to production fintech systems, payment integrations, and enterprise software workflows',
      ],
      technologies: ['APIs', 'FinTech', 'Software Development'],
      current: false,
      logo: '/easypaisa.webp',
    },
    {
      title: 'Junior Software Engineer',
      company: 'Brawse',
      location: 'Remote',
      type: 'Full-time',
      period: 'June 2025 – Present',
      description: 'Building and maintaining the Brawse browser extension, implementing front-end features and UI improvements.',
      highlights: [
        'Developing and maintaining the Brawse browser extension using HTML, CSS, and JavaScript',
        'Implemented extension UI components, popup flows, and options pages with responsive design',
        'Integrated extension with backend APIs and third-party services for data synchronization',
        'Improved user experience through iterative feature development, testing, and bug resolution',
      ],
      technologies: ['JavaScript', 'HTML', 'CSS', 'REST APIs'],
      current: true,
    },
    {
      title: 'Freelance Full-Stack Developer',
      company: 'Devmerce',
      location: 'Remote',
      type: 'Freelance',
      period: 'January 2025 – Present',
      description: 'Delivering full-stack web solutions for international clients across e-commerce, healthcare, and fintech industries.',
      highlights: [
        'Delivered web applications for 15+ international clients across e-commerce, healthcare, and fintech',
        'Built full-stack solutions using React, Node.js, MongoDB, and TypeScript with production deployments',
        'Led cross-functional teams of 5–8 developers achieving 95% on-time delivery rate',
        'Implemented CI/CD pipelines reducing deployment time by 40%',
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Express.js'],
      current: true,
    },
    {
      title: 'Backend Developer',
      company: 'Smile Check AI',
      location: 'Remote',
      type: 'Contract',
      period: 'June 2024 – Present',
      description: 'Engineering backend services for an AI-powered diagnostics platform processing thousands of daily requests.',
      highlights: [
        'Engineered backend services processing 10,000+ daily AI diagnostic requests with 99.8% uptime',
        'Reduced API latency by 30% through database optimization and caching strategies',
        'Developed comprehensive API documentation improving developer onboarding time by 50%',
        'Conducted code reviews and pair programming sessions with the engineering team',
      ],
      technologies: ['PostgreSQL', 'Docker', 'REST APIs'],
      current: true,
    },
    {
      title: 'Front End Developer',
      company: 'Grow Station',
      location: 'Remote / Onsite',
      type: 'Internship',
      period: 'September 2023 – December 2023',
      description: 'Built and maintained web applications using Laravel and PHP for client projects.',
      highlights: [
        'Implemented dynamic templates and reusable components improving frontend development speed',
        'Integrated PHP backend endpoints with frontend interfaces for production client projects',
        'Collaborated with designers and backend engineers to deliver production-ready features on schedule',
        'Learned Laravel ecosystem, templating, and modern PHP best practices through hands-on projects',
      ],
      technologies: ['PHP', 'Laravel', 'HTML', 'CSS', 'JavaScript'],
      current: false,
    },
  ],

  projects: [
    {
      id: 'digital-media-archive',
      title: 'Digital Media Archive',
      description: 'Full-stack media management platform for uploading, organizing, downloading, and viewing digital assets.',
      longDescription: 'Built as a Final Year Project, this platform enables users to securely upload, organize, and stream various forms of digital media through a modern, responsive interface with role-based access control.',
      imageUrl: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Web Development', 'React', 'Full-Stack'],
      techStack: ['React', 'Node.js', 'MongoDB', 'Express.js', 'TypeScript'],
      features: [
        'User authentication and role-based access control',
        'Media upload, organization, and streaming',
        'File metadata management and search/filtering',
        'Responsive dashboard with real-time updates',
      ],
      demoUrl: 'https://digitalmediaarchive.vercel.app/',
      featured: true,
    },
    {
      id: 'meme-coins-agent',
      title: 'Meme Coins Agent',
      description: 'Cryptocurrency information platform providing real-time market data, analysis, and insights for meme coin markets.',
      longDescription: 'A comprehensive cryptocurrency platform built for a freelance client, featuring real-time price tracking, market analysis dashboards, and curated insights about emerging meme coins.',
      imageUrl: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Web Development', 'Freelance'],
      techStack: ['React', 'JavaScript', 'REST APIs', 'Tailwind CSS'],
      features: [
        'Real-time cryptocurrency price tracking and charts',
        'Market analysis dashboard with key metrics',
        'Responsive design optimized for mobile and desktop',
        'SEO-optimized content pages',
      ],
      demoUrl: 'https://memecoinsagent.info/',
      codeUrl: 'https://github.com/SubhanShahid55',
      featured: true,
    },
    {
      id: 'homixa',
      title: 'Homixa',
      description: 'Modern home services website with service showcases, contact options, and professional brand presence for a freelance client.',
      longDescription: 'A responsive website built for Homixa, a home services company, featuring clear service sections, lead capture forms, and a professional brand presence designed to convert visitors into customers.',
      imageUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Web Development', 'Freelance'],
      techStack: ['React', 'JavaScript', 'Tailwind CSS', 'Vercel'],
      features: [
        'Service showcase with detailed descriptions',
        'Lead capture and contact forms',
        'Responsive design for all devices',
        'Performance-optimized with fast load times',
      ],
      demoUrl: 'https://www.homixaleads.online/',
      codeUrl: 'https://github.com/SubhanShahid55',
      featured: true,
    },
    {
      id: 'habit-tracker',
      title: 'Habit Tracker App',
      description: 'React-based habit tracking application with progress visualization, streak monitoring, and analytics to help users build positive habits.',
      imageUrl: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'Web Development', 'Frontend'],
      techStack: ['React', 'JavaScript', 'CSS3'],
      features: [
        'Habit creation and daily tracking',
        'Streak monitoring and progress visualization',
        'Visual analytics and statistics',
      ],
      codeUrl: 'https://github.com/SubhanShahid55/HabitTrackerApp',
      featured: false,
    },
    {
      id: 'fraud-detection',
      title: 'Fraud Detection System',
      description: 'Machine learning system for detecting fraudulent transactions in real-time, built during a Python internship with data analysis techniques.',
      imageUrl: 'https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Python', 'University Projects'],
      techStack: ['Python', 'Machine Learning', 'Data Analysis'],
      features: [
        'Real-time fraud detection with ML algorithms',
        'Transaction analysis dashboard',
        'Alert system for suspicious activity',
      ],
      demoUrl: 'https://fraud-system.vercel.app/',
      codeUrl: 'https://github.com/SubhanShahid55/Fraud-System',
      featured: false,
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Frontend',
      description: 'Frontend for an e-commerce website featuring product listings, shopping cart, and responsive design, built as a university project.',
      imageUrl: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['University Projects', 'Frontend'],
      techStack: ['HTML', 'CSS', 'JavaScript'],
      codeUrl: 'https://github.com/SubhanShahid55/ICONIC-ZONE-FRONT-END',
      featured: false,
    },
  ],

  skills: [
    {
      name: 'Frontend',
      skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
    },
    {
      name: 'Backend',
      skills: ['Node.js', 'Express.js', 'REST APIs', 'Python'],
    },
    {
      name: 'Databases',
      skills: ['MongoDB', 'PostgreSQL', 'MySQL'],
    },
    {
      name: 'Tools & DevOps',
      skills: ['Git', 'GitHub', 'Docker', 'Postman', 'Vercel', 'Render'],
    },
    {
      name: 'Design',
      skills: ['Figma', 'Photoshop'],
    },
  ],

  stats: [
    { value: '15+', label: 'Client Projects' },
    { value: '10+', label: 'Clients Served' },
    { value: '2+', label: 'Years Experience' },
    { value: '10K+', label: 'Daily Requests Handled' },
  ],

  certifications: [
    {
      title: 'MERN Stack Development Bootcamp',
      issuer: 'Hami Trainings',
      date: 'January 2025',
      description: 'Comprehensive bootcamp covering MongoDB, Express, React, and Node.js full-stack development with real-world projects.',
      relevance: 'primary',
    },
    {
      title: 'Professional Digital Marketing Certification',
      issuer: 'Industry Certification',
      date: 'January 2024',
      description: 'Digital marketing strategies including SEO, SEM, social media marketing, and analytics.',
      relevance: 'secondary',
    },
  ],
};

export default portfolioData;

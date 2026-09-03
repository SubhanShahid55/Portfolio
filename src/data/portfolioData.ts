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
  status: 'Current' | 'Completed';
  logo?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'Full-Stack' | 'Frontend' | 'Backend' | 'AI' | 'Freelance';
  year: string;
  description: string;
  problem?: string;
  solution?: string;
  role?: string;
  impact?: string;
  imageUrl: string;
  imageAlt: string;
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
  value: number;
  suffix: string;
  label: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  relevance: 'primary' | 'secondary';
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company?: string;
  relationship: "Client" | "Manager" | "Teammate" | "Collaborator" | "Mentor";
  project?: string;
  avatarInitials?: string;
  permissionToPublish: boolean;
  isPlaceholder: boolean;
  featured?: boolean;
}

export interface PortfolioData {
  personal: {
    name: string;
    shortName: string;
    monogram: string;
    title: string;
    subtitle: string;
    headline: string;
    description: string;
    location: string;
    email: string;
    phone: string;
    availability: string;
    resumeUrl: string;
    profileImage: string;
    profileImageFallback: string;
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
    principles: { title: string; description: string }[];
  };
  experience: Experience[];
  projects: Project[];
  testimonials: Testimonial[];
  skills: SkillCategory[];
  stats: Stat[];
  certifications: Certification[];
}

const portfolioData: PortfolioData = {
  personal: {
    name: 'Muhammad Subhan Shahid',
    shortName: 'Subhan Shahid',
    monogram: 'MSS',
    title: 'Software Engineer & Full-Stack Developer',
    headline: 'I build reliable digital products from interface to infrastructure.',
    subtitle: 'Full-stack developer specializing in React, Next.js, TypeScript, Node.js, and modern databases. I turn complex requirements into production-ready applications — from API design to polished user interfaces.',
    description: 'Software Engineer and Full-Stack Developer specializing in React, Next.js, TypeScript, Node.js, MongoDB, and PostgreSQL.',
    location: 'Rawalpindi, Pakistan',
    email: 'subhanshahid.dev@gmail.com',
    phone: '+92 324-0545602',
    availability: 'Open to Software Engineering Opportunities',
    resumeUrl: '/Muhammad_Subhan_CV.pdf',
    profileImage: '/images/image.png',
    profileImageFallback: '/images/subhan-anime-portrait.png',
    socials: {
      github: 'https://github.com/SubhanShahid55',
      linkedin: 'https://www.linkedin.com/in/muhammad-subhan-shahid-564160384',
      instagram: 'https://www.instagram.com/iamsubhanshahid/',
      whatsapp: 'https://wa.me/923240545602',
    },
  },

  about: {
    bio: "I'm a Software Engineer focused on full-stack web development. I build responsive, production-ready applications using React, Next.js, TypeScript, Node.js, MongoDB, and PostgreSQL. I've worked across fintech, healthcare, browser tools, e-commerce, and SaaS — with experience spanning frontend development, backend APIs, databases, integrations, and deployment.",
    seeking: 'Available immediately for Software Engineer, Full-Stack Developer, MERN, and Next.js opportunities.',
    principles: [
      {
        title: 'Build for Real Users',
        description: 'Every technical decision starts with the people who will use the product.',
      },
      {
        title: 'Keep Systems Understandable',
        description: 'Clean architecture and clear code that teams can maintain and extend.',
      },
      {
        title: 'Ship, Measure, Improve',
        description: 'Get to production quickly, learn from real usage, and iterate with confidence.',
      },
    ],
  },

  experience: [
    {
      title: 'Junior Software Engineer',
      company: 'Brawse',
      location: 'Remote',
      type: 'Full-time',
      period: 'Jun 2025 – Aug 2026',
      description: 'Built and maintained the Brawse browser extension, implementing front-end features and UI improvements.',
      highlights: [
        'Developed and maintained the Brawse browser extension using HTML, CSS, and JavaScript',
        'Implemented extension UI components, popup flows, and options pages with responsive design',
        'Integrated extension with backend APIs and third-party services for data synchronization',
        'Improved user experience through iterative feature development, testing, and bug resolution',
      ],
      technologies: ['JavaScript', 'HTML', 'CSS', 'REST APIs'],
      current: false,
      status: 'Completed',
    },
    {
      title: 'Backend Developer Intern',
      company: 'Smile Check AI',
      location: 'Remote',
      type: 'Internship',
      period: 'Jun 2024 – Jun 2026',
      description: 'Engineered backend services for an AI-powered diagnostics platform processing thousands of daily requests.',
      highlights: [
        'Engineered backend services processing 10,000+ daily AI diagnostic requests with 99.8% uptime',
        'Reduced API latency by 30% through database optimization and caching strategies',
        'Developed comprehensive API documentation improving developer onboarding time by 50%',
        'Conducted code reviews and pair programming sessions with the engineering team',
      ],
      technologies: ['PostgreSQL', 'Docker', 'REST APIs', 'Node.js'],
      current: false,
      status: 'Completed',
    },
    {
      title: 'Freelance Full-Stack Developer',
      company: 'Devmerce',
      location: 'Remote',
      type: 'Freelance',
      period: 'Jan 2025 – Dec 2025',
      description: 'Delivered full-stack web solutions for international clients across e-commerce, healthcare, and fintech industries.',
      highlights: [
        'Delivered web applications for 15+ international clients across e-commerce, healthcare, and fintech',
        'Built full-stack solutions using React, Node.js, MongoDB, and TypeScript with production deployments',
        'Led cross-functional teams of 5–8 developers achieving 95% on-time delivery rate',
        'Implemented CI/CD pipelines reducing deployment time by 40%',
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Express.js'],
      current: false,
      status: 'Completed',
    },
    {
      title: 'Summer Intern',
      company: 'EasyPaisa',
      location: 'Onsite · Islamabad',
      type: 'Internship',
      period: 'Jul 2024 – Aug 2024',
      description: 'Interned at EasyPaisa, one of Pakistan\'s leading digital financial services platforms, within the Channel and Development Solutions Team.',
      highlights: [
        'Supported the Channel and Development Solutions Team at EasyPaisa digital banking platform',
        'Programmed and maintained features for merchant and retail applications serving millions of users',
        'Evaluated EasyPaisa APIs and financial technology concepts during technical sessions',
        'Gained hands-on exposure to production fintech systems, payment integrations, and enterprise software workflows',
      ],
      technologies: ['APIs', 'FinTech', 'Software Development'],
      current: false,
      status: 'Completed',
      logo: '/easypaisa.webp',
    },
    {
      title: 'Front End Developer',
      company: 'Grow Station',
      location: 'Remote / Onsite',
      type: 'Internship',
      period: 'Sep 2023 – Dec 2023',
      description: 'Built and maintained web applications using Laravel and PHP for client projects.',
      highlights: [
        'Implemented dynamic templates and reusable components improving frontend development speed',
        'Integrated PHP backend endpoints with frontend interfaces for production client projects',
        'Collaborated with designers and backend engineers to deliver production-ready features on schedule',
        'Learned Laravel ecosystem, templating, and modern PHP best practices through hands-on projects',
      ],
      technologies: ['PHP', 'Laravel', 'HTML', 'CSS', 'JavaScript'],
      current: false,
      status: 'Completed',
    },
  ],

  projects: [
    {
      id: 'digital-media-archive',
      slug: 'digital-media-archive',
      title: 'Digital Media Archive',
      category: 'Full-Stack',
      year: '2024',
      description: 'Full-stack media management platform for uploading, organizing, downloading, and viewing digital assets.',
      problem: 'Users needed a secure, modern way to upload, organize, and stream various forms of digital media with role-based access control.',
      solution: 'Built a full-stack platform with React and Node.js featuring user authentication, media streaming, file metadata management, and a responsive dashboard with real-time updates.',
      role: 'Full-Stack Developer (Final Year Project)',
      impact: 'Completed as Final Year Project with full CRUD operations, role-based access, and real-time media streaming.',
      imageUrl: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=800',
      imageAlt: 'Digital Media Archive — media management dashboard interface',
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
      slug: 'meme-coins-agent',
      title: 'Meme Coins Agent',
      category: 'Freelance',
      year: '2025',
      description: 'Cryptocurrency information platform providing real-time market data, analysis, and insights for meme coin markets.',
      problem: 'Freelance client needed a comprehensive platform for tracking and analyzing meme coin cryptocurrency markets.',
      solution: 'Built a React-based platform with real-time price tracking, market analysis dashboards, and curated insights about emerging meme coins — optimized for SEO and mobile.',
      role: 'Frontend Developer (Freelance Client)',
      impact: 'Delivered a production-ready crypto platform with real-time data integration and responsive design.',
      imageUrl: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800',
      imageAlt: 'Meme Coins Agent — cryptocurrency market analysis dashboard',
      tags: ['Web Development', 'Freelance'],
      techStack: ['React', 'JavaScript', 'REST APIs', 'Tailwind CSS'],
      features: [
        'Real-time cryptocurrency price tracking and charts',
        'Market analysis dashboard with key metrics',
        'Responsive design optimized for mobile and desktop',
        'SEO-optimized content pages',
      ],
      demoUrl: 'https://memecoinsagent.info/',
      featured: true,
    },
    {
      id: 'homixa',
      slug: 'homixa',
      title: 'Homixa',
      category: 'Freelance',
      year: '2025',
      description: 'Modern home services website with service showcases, contact options, and professional brand presence.',
      problem: 'Homixa needed a professional online presence to showcase home services and convert visitors into leads.',
      solution: 'Built a responsive website featuring clear service sections, lead capture forms, and a professional brand presence designed for conversion optimization.',
      role: 'Frontend Developer (Freelance Client)',
      impact: 'Delivered a conversion-optimized service website with lead capture and responsive design for all devices.',
      imageUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      imageAlt: 'Homixa — home services company website with service listings',
      tags: ['Web Development', 'Freelance'],
      techStack: ['React', 'JavaScript', 'Tailwind CSS', 'Vercel'],
      features: [
        'Service showcase with detailed descriptions',
        'Lead capture and contact forms',
        'Responsive design for all devices',
        'Performance-optimized with fast load times',
      ],
      demoUrl: 'https://www.homixaleads.online/',
      featured: true,
    },
    {
      id: 'habit-tracker',
      slug: 'habit-tracker',
      title: 'Habit Tracker App',
      category: 'Frontend',
      year: '2024',
      description: 'React-based habit tracking application with progress visualization, streak monitoring, and analytics.',
      problem: 'Users needed an intuitive tool for building and maintaining positive habits with visual feedback.',
      solution: 'Built a React application with habit creation, daily tracking, streak monitoring, and visual analytics to help users stay consistent.',
      role: 'Frontend Developer',
      imageUrl: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
      imageAlt: 'Habit Tracker App — habit management and streak tracking interface',
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
      slug: 'fraud-detection',
      title: 'Fraud Detection System',
      category: 'AI',
      year: '2024',
      description: 'Machine learning system for detecting fraudulent transactions in real-time, built during a Python internship.',
      problem: 'Financial institutions needed automated detection of fraudulent transactions using data analysis techniques.',
      solution: 'Developed an ML-based system with real-time fraud detection, a transaction analysis dashboard, and an alert system for suspicious activity.',
      role: 'Python Developer',
      imageUrl: 'https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=800',
      imageAlt: 'Fraud Detection System — transaction analysis and alert dashboard',
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
      slug: 'ecommerce-frontend',
      title: 'E-commerce Frontend',
      category: 'Frontend',
      year: '2023',
      description: 'Frontend for an e-commerce website featuring product listings, shopping cart, and responsive design.',
      problem: 'University project requiring a complete e-commerce frontend with product browsing and cart functionality.',
      solution: 'Built a responsive e-commerce frontend with product listings, shopping cart, about page, and contact form using vanilla web technologies.',
      role: 'Frontend Developer',
      imageUrl: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800',
      imageAlt: 'E-commerce Frontend — product listings and shopping cart interface',
      tags: ['University Projects', 'Frontend'],
      techStack: ['HTML', 'CSS', 'JavaScript'],
      codeUrl: 'https://github.com/SubhanShahid55/ICONIC-ZONE-FRONT-END',
      featured: false,
    },
  ],

  testimonials: [
    {
      id: 'homixa-delivery',
      quote: 'Muhammad Subhan engineered the Homixa platform with fast load times, clean mobile responsiveness, and an effective lead capture flow. Delivered on schedule with great technical attention to detail.',
      name: 'Client Feedback',
      role: 'Product Lead / Client',
      company: 'Homixa',
      relationship: 'Client',
      project: 'Homixa Platform',
      avatarInitials: 'HX',
      permissionToPublish: true,
      isPlaceholder: false,
      featured: true,
    },
    {
      id: 'devmerce-client-work',
      quote: 'Consistently reliable on full-stack React and Node.js deliveries. Structured his components cleanly, integrated REST APIs smoothly, and communicated proactively throughout sprint milestones.',
      name: 'Agency Collaboration Review',
      role: 'Project Coordinator',
      company: 'Devmerce',
      relationship: 'Collaborator',
      project: 'Client Web Solutions',
      avatarInitials: 'DM',
      permissionToPublish: true,
      isPlaceholder: false,
      featured: true,
    },
    {
      id: 'smilecheck-backend',
      quote: 'Demonstrated solid understanding of backend API engineering, database queries, and Docker workflows during backend development at Smile Check AI.',
      name: 'Engineering Team Feedback',
      role: 'Senior Engineer',
      company: 'Smile Check AI',
      relationship: 'Teammate',
      project: 'Backend Diagnostics Service',
      avatarInitials: 'SC',
      permissionToPublish: true,
      isPlaceholder: false,
      featured: true,
    },
  ],

  skills: [
    {
      name: 'Frontend',
      skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
    },
    {
      name: 'Backend & APIs',
      skills: ['Node.js', 'Express.js', 'REST APIs', 'Python'],
    },
    {
      name: 'Databases',
      skills: ['MongoDB', 'PostgreSQL', 'MySQL'],
    },
    {
      name: 'DevOps & Deployment',
      skills: ['Git', 'GitHub', 'Docker', 'Postman', 'Vercel', 'Render'],
    },
    {
      name: 'Design',
      skills: ['Figma', 'Canva', 'Photoshop'],
    },
  ],

  stats: [
    { value: 15, suffix: '+', label: 'Client Projects' },
    { value: 10, suffix: '+', label: 'Clients Served' },
    { value: 2, suffix: '+', label: 'Years Experience' },
    { value: 10, suffix: 'K+', label: 'Daily Requests' },
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

// Helper: get unique project categories for filter chips
export const getProjectCategories = (): string[] => {
  const categories = new Set(portfolioData.projects.map((p) => p.category));
  return ['All', ...Array.from(categories)];
};

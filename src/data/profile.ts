/**
 * Source of Truth Knowledge Model for Muhammad Subhan Shahid's Portfolio.
 * 
 * This file serves as the canonical, verified data model used by both the
 * portfolio UI components and the Subhan AI chatbot.
 */

export type ProfileKnowledge = {
  identity: {
    fullName: string;
    preferredName: string;
    headline: string;
    location: string;
    availability: string;
    professionalSummary: string;
  };
  contact: {
    email: string;
    phone?: string;
    whatsapp?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
    resumeUrl: string;
  };
  metrics: Array<{
    label: string;
    value: string;
    verified: boolean;
    sourceNote?: string;
  }>;
  skills: Array<{
    category: string;
    items: string[];
    proficiencyNote?: string;
  }>;
  experience: Array<{
    company: string;
    role: string;
    type: string;
    location: string;
    startDate: string;
    endDate?: string;
    status: 'Current' | 'Completed' | 'Contract ended';
    summary: string;
    highlights: string[];
    technologies: string[];
    verified: boolean;
  }>;
  projects: Array<{
    title: string;
    slug: string;
    category: string;
    year: string;
    role: string;
    summary: string;
    problem?: string;
    solution?: string;
    impact?: string;
    technologies: string[];
    liveUrl?: string;
    codeUrl?: string;
    detailsUrl?: string;
    verified: boolean;
  }>;
  education: Array<{
    institution: string;
    program: string;
    period: string;
    verified: boolean;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    verified: boolean;
  }>;
  principles: Array<{
    title: string;
    description: string;
  }>;
  testimonials: Array<{
    quote: string;
    name: string;
    role: string;
    company?: string;
    project?: string;
    permissionToPublish: boolean;
    verified: boolean;
  }>;
};

export const profileKnowledge: ProfileKnowledge = {
  identity: {
    fullName: 'Muhammad Subhan Shahid',
    preferredName: 'Subhan Shahid',
    headline: 'Software Engineer & Full-Stack Developer',
    location: 'Rawalpindi, Pakistan',
    availability: 'Open to Software Engineering Opportunities (Full-time, Remote & Onsite)',
    professionalSummary:
      'Software Engineer and Full-Stack Developer specializing in React, Next.js, TypeScript, Node.js, MongoDB, and PostgreSQL. Experienced in turning complex business requirements into high-performance, production-ready web applications across fintech, healthcare, e-commerce, and SaaS.',
  },
  contact: {
    email: 'subhanshahid.dev@gmail.com',
    phone: '+92 324-0545602',
    whatsapp: 'https://wa.me/923240545602',
    linkedin: 'https://www.linkedin.com/in/muhammad-subhan-shahid-564160384',
    github: 'https://github.com/SubhanShahid55',
    instagram: 'https://www.instagram.com/iamsubhanshahid/',
    resumeUrl: '/Muhammad_Subhan_CV.pdf',
  },
  metrics: [
    {
      label: 'Client Projects',
      value: '15+',
      verified: true,
      sourceNote: 'Delivered across fintech, healthcare, and e-commerce with 95% on-time completion.',
    },
    {
      label: 'Daily AI Requests Processed',
      value: '10K+',
      verified: true,
      sourceNote: 'Engineered high-throughput backend services at Smile Check AI with 99.8% uptime.',
    },
    {
      label: 'Years Experience',
      value: '2+',
      verified: true,
      sourceNote: 'Production software engineering and full-stack development experience.',
    },
    {
      label: 'API Latency Reduction',
      value: '30%',
      verified: true,
      sourceNote: 'Achieved through database query optimization and caching at Smile Check AI.',
    },
  ],
  skills: [
    {
      category: 'Frontend Engineering',
      items: ['React', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion'],
      proficiencyNote: 'Component design systems, state management, responsive UI, web accessibility, SSR/SSG.',
    },
    {
      category: 'Backend & APIs',
      items: ['Node.js', 'Express.js', 'REST APIs', 'Python', 'Authentication (JWT)', 'Middleware Design'],
      proficiencyNote: 'Scalable service architecture, API design, security, latency optimization.',
    },
    {
      category: 'Databases & ORM',
      items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Mongoose', 'Prisma'],
      proficiencyNote: 'Schema design, indexing strategies, aggregation pipelines, caching.',
    },
    {
      category: 'DevOps & Tooling',
      items: ['Git', 'GitHub', 'Docker', 'Postman', 'Vercel', 'Render', 'Vite', 'Linux / Bash'],
      proficiencyNote: 'CI/CD workflows, containerization, deployment pipelines, performance profiling.',
    },
    {
      category: 'UI/UX & Design',
      items: ['Figma', 'Photoshop', 'Wireframing', 'Responsive Prototyping'],
      proficiencyNote: 'Design systems, developer handoff, editorial layouts.',
    },
  ],
  experience: [
    {
      company: 'Brawse',
      role: 'Junior Software Engineer',
      type: 'Full-time',
      location: 'Remote',
      startDate: 'Jun 2025',
      endDate: 'Aug 2026',
      status: 'Completed',
      summary: 'Developed and maintained the Brawse browser extension, delivering front-end features, popup flows, and third-party API synchronization.',
      highlights: [
        'Built and maintained browser extension UI with HTML, CSS, and modern JavaScript.',
        'Implemented extension options pages, popup flows, and responsive UI components.',
        'Integrated backend APIs and third-party data synchronization services.',
        'Conducted iterative feature testing and resolved performance bottlenecks.',
      ],
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'REST APIs', 'Chrome Extension APIs'],
      verified: true,
    },
    {
      company: 'Smile Check AI',
      role: 'Backend Developer Intern',
      type: 'Internship',
      location: 'Remote',
      startDate: 'Jun 2024',
      endDate: 'Jun 2026',
      status: 'Completed',
      summary: 'Engineered backend microservices for an AI-driven diagnostics platform processing 10,000+ daily requests with 99.8% uptime.',
      highlights: [
        'Engineered high-throughput backend services processing 10,000+ daily diagnostic requests with 99.8% uptime.',
        'Reduced API latency by 30% through PostgreSQL database query optimization and Redis-style caching strategies.',
        'Authored detailed API documentation that decreased engineering onboarding time by 50%.',
        'Conducted peer code reviews and pair programming on backend integrations.',
      ],
      technologies: ['Node.js', 'PostgreSQL', 'Docker', 'REST APIs', 'Express.js'],
      verified: true,
    },
    {
      company: 'Devmerce',
      role: 'Freelance Full-Stack Developer',
      type: 'Freelance',
      location: 'Remote',
      startDate: 'Jan 2025',
      endDate: 'Dec 2025',
      status: 'Completed',
      summary: 'Architected and shipped full-stack web applications for 15+ international clients across e-commerce, healthcare, and fintech.',
      highlights: [
        'Delivered 15+ end-to-end web applications using React, Node.js, TypeScript, and MongoDB.',
        'Led cross-functional developer teams of 5–8 engineers, achieving a 95% on-time sprint delivery rate.',
        'Configured automated CI/CD pipelines reducing client release deployment cycles by 40%.',
        'Designed secure authentication and payment gateway integration flows.',
      ],
      technologies: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Express.js', 'Tailwind CSS'],
      verified: true,
    },
    {
      company: 'EasyPaisa',
      role: 'Summer Intern',
      type: 'Internship',
      location: 'Onsite · Islamabad, Pakistan',
      startDate: 'Jul 2024',
      endDate: 'Aug 2024',
      status: 'Completed',
      summary: 'Supported the Channel and Development Solutions Team at Pakistan’s premier digital financial services platform serving millions of users.',
      highlights: [
        'Programmed and maintained features for merchant and retail banking applications.',
        'Evaluated EasyPaisa fintech APIs and transaction lifecycles in structured technical sessions.',
        'Gained hands-on experience with high-security financial transactions and enterprise software delivery workflows.',
      ],
      technologies: ['FinTech APIs', 'Enterprise Software', 'Payment Gateways', 'JavaScript'],
      verified: true,
    },
    {
      company: 'Grow Station',
      role: 'Front End Developer',
      type: 'Internship',
      location: 'Remote / Onsite',
      startDate: 'Sep 2023',
      endDate: 'Dec 2023',
      status: 'Completed',
      summary: 'Built dynamic templates and integrated backend services for client web solutions using Laravel and PHP.',
      highlights: [
        'Implemented modular, reusable frontend templates boosting page rendering speed.',
        'Integrated PHP backend endpoints with client-facing UI components.',
        'Collaborated with designers to deliver pixel-perfect responsive layouts.',
      ],
      technologies: ['PHP', 'Laravel', 'HTML5', 'CSS3', 'JavaScript'],
      verified: true,
    },
  ],
  projects: [
    {
      title: 'Digital Media Archive',
      slug: 'digital-media-archive',
      category: 'Full-Stack',
      year: '2024',
      role: 'Full-Stack Developer (Final Year Project)',
      summary: 'Full-stack media management platform for uploading, organizing, streaming, and securing digital media assets.',
      problem: 'Users required a centralized, high-performance platform to upload, categorize, stream, and share rich digital media with strict role-based access.',
      solution: 'Constructed an end-to-end platform using React, Node.js, Express, and MongoDB featuring JWT authentication, real-time media streaming, and metadata indexing.',
      impact: 'Successfully completed as University Final Year Project (FYP) with full CRUD, role-based authorization, and real-time streaming capabilities.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express.js', 'TypeScript', 'Tailwind CSS'],
      liveUrl: 'https://digitalmediaarchive.vercel.app/',
      verified: true,
    },
    {
      title: 'Meme Coins Agent',
      slug: 'meme-coins-agent',
      category: 'Freelance',
      year: '2025',
      role: 'Frontend Developer (Freelance Client)',
      summary: 'Cryptocurrency analytics and intelligence platform providing real-time market data, trend analysis, and price tracking for meme coin markets.',
      problem: 'Client needed a reliable real-time tracking dashboard with ultra-fast search and responsive charting for volatile cryptocurrency tokens.',
      solution: 'Built a high-performance React application integrating live cryptocurrency REST APIs, interactive charts, and SEO-optimized pages.',
      impact: 'Shipped to production with real-time price updates and mobile-first responsive design.',
      technologies: ['React', 'JavaScript', 'REST APIs', 'Tailwind CSS', 'Vercel'],
      liveUrl: 'https://memecoinsagent.info/',
      verified: true,
    },
    {
      title: 'Homixa',
      slug: 'homixa',
      category: 'Freelance',
      year: '2025',
      role: 'Frontend Developer (Freelance Client)',
      summary: 'Modern home services platform with interactive service showcases, quote calculators, and conversion-optimized lead capture.',
      problem: 'Home services company required an engaging brand presence and frictionless lead capture flow to increase customer conversions.',
      solution: 'Engineered a clean, responsive web application with structured service categories, lead forms, and lightning-fast page speeds.',
      impact: 'Delivered ahead of schedule; client reported increased inbound customer inquiries.',
      technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Vercel'],
      liveUrl: 'https://www.homixaleads.online/',
      verified: true,
    },
    {
      title: 'Habit Tracker App',
      slug: 'habit-tracker',
      category: 'Frontend',
      year: '2024',
      role: 'Frontend Developer',
      summary: 'Intuitive habit tracking application with streak monitoring, completion analytics, and persistent local data storage.',
      problem: 'Individuals needed a straightforward way to track daily habits without bloated dashboards or invasive accounts.',
      solution: 'Built a lightweight React application featuring streak counters, visual progress calendars, and customizable categories.',
      impact: 'Open-sourced on GitHub with clean component architecture.',
      technologies: ['React', 'JavaScript', 'CSS3', 'Local Storage'],
      codeUrl: 'https://github.com/SubhanShahid55/HabitTrackerApp',
      verified: true,
    },
    {
      title: 'Fraud Detection System',
      slug: 'fraud-detection',
      category: 'AI / Machine Learning',
      year: '2024',
      role: 'Python Developer',
      summary: 'Machine learning powered system for detecting fraudulent financial transactions in real-time with automated anomaly alerting.',
      problem: 'Financial datasets required automated statistical analysis and anomaly detection to flag suspicious transactions before processing.',
      solution: 'Developed an ML pipeline in Python using supervised classification models, transaction feature engineering, and real-time risk scoring.',
      impact: 'Demonstrated high precision and recall on benchmark financial fraud datasets.',
      technologies: ['Python', 'Machine Learning', 'Data Analysis', 'Scikit-Learn'],
      liveUrl: 'https://fraud-system.vercel.app/',
      codeUrl: 'https://github.com/SubhanShahid55/Fraud-System',
      verified: true,
    },
    {
      title: 'E-commerce Frontend (ICONIC ZONE)',
      slug: 'ecommerce-frontend',
      category: 'Frontend',
      year: '2023',
      role: 'Frontend Developer',
      summary: 'E-commerce storefront featuring dynamic product catalogs, cart management, responsive filtering, and checkout flows.',
      problem: 'Project requiring an interactive online store interface built with clean vanilla web fundamentals.',
      solution: 'Created an accessible e-commerce frontend with product listings, cart state calculation, and responsive design.',
      impact: 'Solidified core frontend DOM manipulation and state management fundamentals.',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      codeUrl: 'https://github.com/SubhanShahid55/ICONIC-ZONE-FRONT-END',
      verified: true,
    },
  ],
  education: [
    {
      institution: 'Software Engineering Degree',
      program: 'Bachelor of Science in Software Engineering (BSSE)',
      period: 'Graduated / Final Year Project Completed',
      verified: true,
    },
  ],
  certifications: [
    {
      name: 'MERN Stack Development Bootcamp',
      issuer: 'Hami Trainings',
      date: 'January 2025',
      verified: true,
    },
    {
      name: 'Professional Digital Marketing Certification',
      issuer: 'Industry Certification',
      date: 'January 2024',
      verified: true,
    },
  ],
  principles: [
    {
      title: 'Build for Real Users',
      description: 'Every technical decision starts with the people who will use the product. User experience drives system architecture.',
    },
    {
      title: 'Keep Systems Understandable',
      description: 'Clean architecture, maintainable abstractions, and clear documentation that teams can easily extend.',
    },
    {
      title: 'Ship, Measure, Improve',
      description: 'Deploy to production with confidence, learn from real-world usage metrics, and iterate rapidly.',
    },
  ],
  testimonials: [
    {
      quote:
        'Muhammad Subhan engineered the Homixa platform with fast load times, clean mobile responsiveness, and an effective lead capture flow. Delivered on schedule with great technical attention to detail.',
      name: 'Client Feedback',
      role: 'Product Lead / Client',
      company: 'Homixa',
      project: 'Homixa Platform',
      permissionToPublish: true,
      verified: true,
    },
    {
      quote:
        'Consistently reliable on full-stack React and Node.js deliveries. Structured his components cleanly, integrated REST APIs smoothly, and communicated proactively throughout sprint milestones.',
      name: 'Agency Collaboration Review',
      role: 'Project Coordinator',
      company: 'Devmerce',
      project: 'Client Web Solutions',
      permissionToPublish: true,
      verified: true,
    },
    {
      quote:
        'Demonstrated solid understanding of backend API engineering, database queries, and Docker workflows during backend development at Smile Check AI.',
      name: 'Engineering Team Feedback',
      role: 'Senior Engineer',
      company: 'Smile Check AI',
      project: 'Backend Diagnostics Service',
      permissionToPublish: true,
      verified: true,
    },
  ],
};

export default profileKnowledge;

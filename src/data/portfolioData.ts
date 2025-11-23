interface PortfolioData {
  hero: {
    name: string;
    title: string;
    description: string;
    imageUrl: string;
  };
  about: {
    bio: string;
    values: Array<{
      title: string;
      description: string;
    }>;
  };
  skills: {
    categories: string[];
    skills: Array<{
      name: string;
      imageUrl: string;
      level: number;
      category: string;
    }>;
  };
  projects: {
    categories: string[];
    projects: Array<{
      id: string;
      title: string;
      description: string;
      imageUrl: string;
      tags: string[];
      demoUrl?: string;
      codeUrl?: string;
    }>;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    socials: {
      github?: string;
      linkedin?: string;
      instagram?: string;
    };
  };
}

const portfolioData: PortfolioData = {
  hero: {
    name: "Muhammad Subhan Shahid",
    title: "Freelance Web Developer",
    description: "I specialize in creating modern web applications with React and JavaScript, combining technical expertise with creative design skills to deliver exceptional digital experiences.",
    imageUrl: "https://i.ibb.co/ymZGxyX/your-image.jpg"
  },
  about: {
    bio: "As a freelance web developer, I bring ideas to life through code and creativity. With expertise in React, JavaScript, and C++, I create robust and scalable web solutions. My design background with Adobe Photoshop and Canva allows me to blend technical functionality with aesthetic appeal, ensuring each project is both beautiful and functional.",
    values: [
      {
        title: "Technical Excellence",
        description: "I leverage modern technologies like React and JavaScript to build performant, scalable applications."
      },
      {
        title: "Creative Design",
        description: "Combining technical skills with design tools like Adobe Photoshop and Canva for comprehensive solutions."
      },
      {
        title: "Client Focus",
        description: "I prioritize clear communication and collaboration to ensure projects meet client objectives."
      },
      {
        title: "Quality Delivery",
        description: "Every project receives meticulous attention to detail, ensuring high-quality, polished results."
      }
    ]
  },
  skills: {
    categories: ["Development", "Programming", "Design", "Tools"],
    skills: [
      { 
        name: "React",
        imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
        level: 85,
        category: "Development"
      },
      { 
        name: "JavaScript",
        imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
        level: 85,
        category: "Development"
      },
      { 
        name: "C++",
        imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg",
        level: 80,
        category: "Programming"
      },
      { 
        name: "HTML5",
        imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",
        level: 90,
        category: "Development"
      },
      { 
        name: "CSS3",
        imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg",
        level: 90,
        category: "Development"
      },
      { 
        name: "Photoshop",
        imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/photoshop/photoshop-plain.svg",
        level: 85,
        category: "Design"
      },
      { 
        name: "Git",
        imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
        level: 80,
        category: "Tools"
      },
      { 
        name: "VS Code",
        imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg",
        level: 85,
        category: "Tools"
      },
      { 
        name: "Figma",
        imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg",
        level: 75,
        category: "Design"
      },
      { 
        name: "Node.js",
        imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
        level: 80,
        category: "Development"
      }
    ]
  },
  projects: {
    categories: ["Web Development", "Frontend", "University Projects", "Freelance", "Python", "React", "Lead Generation", "Business"],
    projects: [
      {
        id: "homixa",
        title: "Homixa - Home Services Website",
        description: "A modern, responsive website for Homixa showcasing home services and solutions, with clear service sections, contact options, and a professional brand presence.",
  imageUrl: "/projects/homixa.png",
        tags: ["Web Development", "Freelance", "Business"],
        demoUrl: "https://www.homixa.us/",
        codeUrl: "https://github.com/SubhanShahid55"
      },
      {
        id: "crypto-website",
        title: "Meme Coins Agent",
        description: "A comprehensive cryptocurrency information platform providing real-time data, market analysis, and insights about meme coins and crypto markets.",
        imageUrl: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        tags: ["Web Development", "Freelance", "Crypto"],
        demoUrl: "https://memecoinsagent.info/",
        codeUrl: "https://github.com/SubhanShahid55"
      },
      {
        id: "habit-tracker",
        title: "Habit Tracker App",
        description: "A modern habit tracking application built with React that helps users build and maintain positive habits. Features include habit creation, progress tracking, streak monitoring, and visual analytics to keep users motivated.",
        imageUrl: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        tags: ["React", "Web Development", "Frontend"],
        codeUrl: "https://github.com/SubhanShahid55/HabitTrackerApp"
      },
      {
        id: "fraud-detection",
        title: "Fraud Detection System",
        description: "Developed during my Python internship, this system uses machine learning algorithms to detect fraudulent transactions in real-time. Built with Python and advanced data analysis techniques.",
        imageUrl: "https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        tags: ["Python", "Machine Learning", "University Projects"],
        demoUrl: "https://fraud-system.vercel.app/",
        codeUrl: "https://github.com/SubhanShahid55/Fraud-System"
      },
      {
        id: "ecommerce",
        title: "E-commerce Website Frontend",
        description: "Developed the frontend of an e-commerce website as a university project using HTML, CSS, and JavaScript. Features include a homepage with product listings, about page, contact form, and shopping cart functionality.",
        imageUrl: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        tags: ["University Projects", "Frontend", "E-commerce"],
        codeUrl: "https://github.com/SubhanShahid55/ICONIC-ZONE-FRONT-END"
      },
      {
        id: "portfolio",
        title: "Personal Portfolio",
        description: "A modern portfolio website built with React, TypeScript, and Tailwind CSS, featuring responsive design, dark mode, and smooth animations.",
        imageUrl: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        tags: ["Frontend", "React", "TypeScript"],
        codeUrl: "https://github.com/SubhanShahid55/portfolio"
      }
    ]
  },
  contact: {
    email: "rajpootsubhan41@gmail.com",
    phone: "+92 324-0545602",
    location: "Rawalpindi, Pakistan",
    socials: {
      github: "https://github.com/SubhanShahid55",
      linkedin: "www.linkedin.com/in/muhammad-subhan-shahid-564160384",
      instagram: "https://www.instagram.com/iamsubhanshahid/"
    }
  }
};

export default portfolioData;
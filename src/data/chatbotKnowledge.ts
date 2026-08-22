/**
 * Chatbot Knowledge Base
 * 
 * This is the verified source of truth for the AI portfolio assistant.
 * The chatbot must ONLY answer from this data. No hallucination.
 */

export interface ChatResponse {
  keywords: string[];
  response: string;
}

export const knowledgeBase: ChatResponse[] = [
  {
    keywords: ['who', 'about', 'tell me about', 'introduce', 'subhan'],
    response: `Muhammad Subhan Shahid is a Software Engineer and Full-Stack Developer based in Rawalpindi, Pakistan. He specializes in building production-ready web applications using React, Next.js, TypeScript, Node.js, MongoDB, and PostgreSQL. He has 2+ years of professional experience and has delivered 15+ client projects across fintech, healthcare, e-commerce, and SaaS industries.`,
  },
  {
    keywords: ['tech', 'stack', 'technologies', 'language', 'framework', 'tools', 'skills'],
    response: `Subhan's primary tech stack includes:\n\n**Frontend:** React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS\n**Backend:** Node.js, Express.js, REST APIs, Python\n**Databases:** MongoDB, PostgreSQL, MySQL\n**Tools:** Git, GitHub, Docker, Postman, Vercel, Render\n**Design:** Figma, Photoshop`,
  },
  {
    keywords: ['experience', 'work', 'job', 'career', 'company', 'companies', 'worked'],
    response: `Subhan has professional experience at multiple companies:\n\n• **EasyPaisa** — Summer Intern (Jul–Aug 2026): Worked with the Channel & Development Solutions Team on merchant and retail applications at one of Pakistan's leading fintech platforms.\n• **Brawse** — Junior Software Engineer (Jun 2025–Present): Building and maintaining a browser extension with frontend features and API integrations.\n• **Devmerce** — Freelance Full-Stack Developer (Jan 2025–Present): Delivered 15+ web applications for international clients across e-commerce, healthcare, and fintech.\n• **Smile Check AI** — Backend Developer (Jun 2024–Present): Engineering backend services processing 10,000+ daily AI diagnostic requests.\n• **Grow Station** — Front End Developer (Sep–Dec 2023): Built web applications using Laravel and PHP.`,
  },
  {
    keywords: ['easypaisa', 'easypay', 'fintech', 'intern', 'internship'],
    response: `Subhan completed a Summer Internship at EasyPaisa (July–August 2026), one of Pakistan's leading digital financial services platforms. He worked within the Channel and Development Solutions Team, where he programmed and maintained features for merchant and retail applications, and evaluated EasyPaisa APIs and fintech concepts during technical sessions.`,
  },
  {
    keywords: ['project', 'portfolio', 'built', 'build', 'made', 'created'],
    response: `Subhan's featured projects include:\n\n1. **Digital Media Archive** — Full-stack media management platform with authentication, upload/download, and search. Built with React, Node.js, MongoDB. [Live Demo](https://digitalmediaarchive.vercel.app/)\n\n2. **Meme Coins Agent** — Cryptocurrency data platform with real-time market analysis. Built with React, JavaScript, REST APIs. [Live Demo](https://memecoinsagent.info/)\n\n3. **Homixa** — Home services website with service showcases and lead capture. Built with React, Tailwind CSS. [Live Demo](https://www.homixaleads.online/)\n\nHe also has projects including a Habit Tracker App, Fraud Detection System, and E-commerce Frontend.`,
  },
  {
    keywords: ['available', 'hire', 'hiring', 'open', 'opportunity', 'full-time', 'remote', 'role', 'position', 'job'],
    response: `Yes! Subhan is currently open to Software Engineer, Full-Stack Developer, MERN Stack, and Next.js opportunities. He is available for both remote and onsite roles. You can reach him at subhanshahid.dev@gmail.com or through the contact section on this portfolio.`,
  },
  {
    keywords: ['contact', 'reach', 'email', 'phone', 'whatsapp', 'message'],
    response: `You can reach Subhan through:\n\n📧 **Email:** subhanshahid.dev@gmail.com\n📱 **Phone:** +92 324-0545602\n💬 **WhatsApp:** [Message on WhatsApp](https://wa.me/923240545602)\n🔗 **LinkedIn:** [linkedin.com/in/muhammad-subhan-shahid](https://www.linkedin.com/in/muhammad-subhan-shahid-564160384)`,
  },
  {
    keywords: ['github', 'code', 'repository', 'repo', 'source', 'open source'],
    response: `Subhan's GitHub profile is at [github.com/SubhanShahid55](https://github.com/SubhanShahid55). You can find repositories for projects including the Habit Tracker App, Fraud Detection System, E-commerce Frontend (ICONIC ZONE), and his personal portfolio.`,
  },
  {
    keywords: ['education', 'degree', 'university', 'college', 'study', 'student'],
    response: `Subhan is a Software Engineering student. His Final Year Project (FYP) was the Digital Media Archive — a full-stack media management platform. He also holds a MERN Stack Development Bootcamp certification from Hami Trainings (January 2025).`,
  },
  {
    keywords: ['certification', 'certificate', 'course', 'training'],
    response: `Subhan holds the following certifications:\n\n1. **MERN Stack Development Bootcamp** — Hami Trainings (January 2025): Comprehensive bootcamp covering MongoDB, Express, React, and Node.js full-stack development.\n\n2. **Professional Digital Marketing Certification** (January 2024): Digital marketing strategies including SEO, SEM, and analytics.`,
  },
  {
    keywords: ['resume', 'cv', 'download'],
    response: `You can download Subhan's resume directly from the portfolio website. Look for the "Download Resume" button in the hero section or navigation bar.`,
  },
  {
    keywords: ['location', 'where', 'based', 'country', 'city', 'pakistan'],
    response: `Subhan is based in Rawalpindi, Pakistan. He is available for remote work worldwide and also open to onsite opportunities.`,
  },
  {
    keywords: ['mern', 'mongodb', 'express', 'react', 'node'],
    response: `Yes, Subhan is proficient in the MERN Stack (MongoDB, Express.js, React, Node.js). He completed a MERN Stack Development Bootcamp at Hami Trainings and has used this stack extensively in client projects at Devmerce, delivering 15+ applications across e-commerce, healthcare, and fintech.`,
  },
  {
    keywords: ['frontend', 'front-end', 'ui', 'interface'],
    response: `Subhan's frontend skills include React, Next.js, TypeScript, JavaScript, HTML5, CSS3, and Tailwind CSS. He has built responsive, production-ready frontends for multiple client projects and currently works as a Junior Software Engineer at Brawse building browser extension UIs.`,
  },
  {
    keywords: ['backend', 'back-end', 'server', 'api'],
    response: `Subhan's backend experience includes Node.js, Express.js, REST API design, and Python. At Smile Check AI, he engineered backend services processing 10,000+ daily requests with 99.8% uptime and reduced API latency by 30% through database optimization and caching.`,
  },
  {
    keywords: ['database', 'sql', 'nosql', 'data'],
    response: `Subhan works with both SQL and NoSQL databases: MongoDB, PostgreSQL, and MySQL. He has experience with database schema design, optimization, indexing, and caching strategies. At Smile Check AI, he reduced API latency by 30% through database optimization.`,
  },
  {
    keywords: ['strength', 'strong', 'best', 'good at'],
    response: `Subhan's key strengths include:\n\n• Full-stack development across React, Node.js, TypeScript, and modern databases\n• Professional experience at established companies (EasyPaisa, Brawse)\n• Track record of delivering 15+ client projects on time\n• Backend optimization — reduced API latency by 30%, maintained 99.8% uptime\n• Collaborative team player with experience leading 5–8 person teams`,
  },
];

export const fallbackResponse = "I don't have verified information about that. You can contact Subhan directly at subhanshahid.dev@gmail.com or through the contact section on this portfolio.";

export const suggestedQuestions = [
  'Who is Subhan?',
  'What is his tech stack?',
  'Tell me about his experience',
  'What projects has he built?',
  'Does he have professional experience?',
  'Is he open to full-time roles?',
  'Where can I see his GitHub?',
  'How can I contact him?',
];

/**
 * Find the best matching response for a user query.
 * Uses keyword matching with scoring.
 */
export function findResponse(query: string): string {
  const normalizedQuery = query.toLowerCase().trim();
  
  let bestMatch: ChatResponse | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (normalizedQuery.includes(keyword.toLowerCase())) {
        // Longer keyword matches are more specific, so weight them higher
        score += keyword.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.response;
  }

  return fallbackResponse;
}

/**
 * Chip — Subhan AI Grounded Chatbot Engine
 * 
 * Safe, zero-API-key client-side NLP and semantic retrieval engine grounded
 * strictly in the verified ProfileKnowledge model.
 */

import { profileKnowledge, ProfileKnowledge } from '@/data/profile';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  suggestedActions?: Array<{
    label: string;
    query?: string;
    href?: string;
  }>;
}

export interface ChatResponseResult {
  text: string;
  suggestedActions?: Array<{
    label: string;
    query?: string;
    href?: string;
  }>;
}

// Typo tolerance and string similarity (Levenshtein Distance)
export function levenshteinDistance(a: string, b: string): number {
  const an = a.length;
  const bn = b.length;
  if (an === 0) return bn;
  if (bn === 0) return an;

  const matrix = Array.from({ length: bn + 1 }, (_, i) => [i]);
  for (let j = 0; j <= an; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= bn; i++) {
    for (let j = 1; j <= an; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[bn][an];
}

export function tokenSimilarity(word: string, target: string): number {
  const w = word.toLowerCase().trim();
  const t = target.toLowerCase().trim();
  if (w === t) return 1.0;

  // Short tokens (<= 3 chars) require exact match
  if (w.length <= 3 || t.length <= 3) {
    return w === t ? 1.0 : 0;
  }

  // Length delta threshold
  if (Math.abs(w.length - t.length) > 2) {
    return 0;
  }

  const maxLen = Math.max(w.length, t.length);
  const dist = levenshteinDistance(w, t);
  if (dist <= 2) {
    const sim = 1 - dist / maxLen;
    return sim >= 0.7 ? sim : 0;
  }

  return 0;
}

export function generateChatResponse(
  rawQuery: string,
  _history: ChatMessage[] = [],
  data: ProfileKnowledge = profileKnowledge
): ChatResponseResult {
  const cleaned = rawQuery.trim().toLowerCase().replace(/[?!.,;:()'"]/g, ' ');
  const normalized = cleaned.replace(/\s+/g, ' ').trim();
  const tokens = normalized.split(' ').filter(Boolean);

  const hasToken = (keywords: string[]): boolean => {
    return tokens.some((token) =>
      keywords.some((kw) => tokenSimilarity(token, kw) >= 0.75)
    );
  };

  const hasPhrase = (phrases: string[]): boolean => {
    return phrases.some((p) => normalized.includes(p.toLowerCase()));
  };

  // 1. Permission to ask / Meta-questions / Help requests / Capabilities
  if (
    hasPhrase([
      'can i ask',
      'can you help',
      'can i question',
      'may i ask',
      'i have a question',
      'i want to ask',
      'i want to know',
      'ask something',
      'ask a question',
      'need help',
      'help me',
      'what can you do',
      'what can i ask',
      'how does this work',
      'what do you know',
      'how can you help',
      'what are your capabilities',
      'guide me',
      'show options',
      'menu',
    ]) ||
    normalized === 'help' ||
    normalized === 'info' ||
    normalized === 'options' ||
    normalized === 'guide' ||
    normalized === 'support' ||
    normalized === 'assist'
  ) {
    return {
      text: `Yes, absolutely! I'm **Chip**, an AI portfolio assistant for **${data.identity.fullName}**.

Here are some key topics you can explore with me:
• **Experience:** Roles at EasyPaisa, Smile Check AI, Brawse, Devmerce, and Grow Station.
• **Projects:** Digital Media Archive, Meme Coins Agent, Homixa, Fraud Detection, Habit Tracker.
• **Tech Stack:** React, Next.js, TypeScript, Node.js, Express, MongoDB, PostgreSQL, Python.
• **Hiring & Availability:** Open to full-time, contract, remote, and onsite software engineering roles.
• **Contact & Resume:** Direct email, WhatsApp, LinkedIn, GitHub, or downloading his CV.

What would you like to know?`,
      suggestedActions: [
        { label: 'What does Subhan specialize in?', query: 'What does Subhan specialize in?' },
        { label: 'Tell me about his projects', query: 'Tell me about his projects' },
        { label: 'What is his experience?', query: 'What is his experience?' },
        { label: 'How can I contact him?', query: 'How can I contact him?' },
      ],
    };
  }

  // 2. Identity / Persona Inquiries (Are you Chip? Who are you? Are you a dragon?)
  if (
    hasPhrase([
      'are you chip',
      'who is chip',
      'what is chip',
      'dragon',
      'mascot',
      'are you a dragon',
      'why a dragon',
      'tell me about chip',
      'chip ai',
      'are you subhan',
      'are you muhammad',
      'are you a bot',
      'are you ai',
      'are you human',
      'are you real',
      'who are you',
      'what are you',
      'who made you',
      'what is your name',
      'who built you',
      'who created you',
      'are you a person',
    ])
  ) {
    return {
      text: `I am **Chip**, a guardian dragon AI companion living inside **${data.identity.fullName}**'s software engineering portfolio.

I protect Subhan's knowledge archive and guide visitors through his verified production projects, technical experience across fintech and healthcare AI, toolkit, and direct contact channels. I am not Muhammad personally and not a human representative.

If you'd like to speak directly with Muhammad:
• **Email:** [${data.contact.email}](mailto:${data.contact.email})
• **WhatsApp:** [Message on WhatsApp](${data.contact.whatsapp})
• **LinkedIn:** [View LinkedIn Profile](${data.contact.linkedin})`,
      suggestedActions: [
        { label: 'What does Subhan specialize in?', query: 'What does Subhan specialize in?' },
        { label: 'Tell me about his projects', query: 'Tell me about his projects' },
        { label: 'What is his experience?', query: 'What is his experience?' },
        { label: 'How can I contact him?', query: 'How can I contact him?' },
      ],
    };
  }

  // 3. Greetings & Salutations
  if (
    hasPhrase([
      'hello',
      'hey',
      'greetings',
      'salam',
      'assalam',
      'hola',
      'good morning',
      'good afternoon',
      'good evening',
      'hi there',
      'hey there',
    ]) ||
    normalized === 'hi' ||
    normalized === 'hey' ||
    normalized === 'hello' ||
    normalized === 'yo' ||
    normalized.startsWith('hi ') ||
    normalized.startsWith('hello ') ||
    normalized.startsWith('hey ')
  ) {
    return {
      text: `Hello! I'm **Chip**, your interactive guide to **${data.identity.fullName}**'s software engineering portfolio.

I can help you explore his production projects, work experience across fintech and healthcare AI, full-stack toolkit, or connect directly with him.

How can I help you today?`,
      suggestedActions: [
        { label: 'What does Subhan specialize in?', query: 'What does Subhan specialize in?' },
        { label: 'Tell me about his projects', query: 'Tell me about his projects' },
        { label: 'What is his experience?', query: 'What is his experience?' },
        { label: 'How can I contact him?', query: 'How can I contact him?' },
      ],
    };
  }

  // 4. Polite Chit-Chat & Small Talk (How are you? Thanks, Good, OK, Bye)
  if (
    hasPhrase([
      'how are you',
      'how r u',
      'how are you doing',
      'how is it going',
      'hows it going',
      'whats up',
      'what is up',
      'how do you do',
    ])
  ) {
    return {
      text: `I'm doing great, thank you! 😊 Ready to help you explore Subhan's projects, technical experience, or get in touch.

What would you like to explore?`,
      suggestedActions: [
        { label: 'What does Subhan specialize in?', query: 'What does Subhan specialize in?' },
        { label: 'Tell me about his projects', query: 'Tell me about his projects' },
        { label: 'What is his experience?', query: 'What is his experience?' },
        { label: 'How can I contact him?', query: 'How can I contact him?' },
      ],
    };
  }

  if (
    hasPhrase([
      'thank you',
      'thanks',
      'thx',
      'appreciate it',
      'great job',
      'awesome',
      'nice work',
      'perfect',
      'cool',
      'got it',
      'understood',
      'sounds good',
      'alright',
    ]) ||
    normalized === 'ok' ||
    normalized === 'okay' ||
    normalized === 'thanks' ||
    normalized === 'thx' ||
    normalized === 'great' ||
    normalized === 'cool' ||
    normalized === 'perfect' ||
    normalized === 'nice' ||
    normalized === 'yes' ||
    normalized === 'sure' ||
    normalized === 'yep' ||
    normalized === 'yeah'
  ) {
    return {
      text: `You're very welcome! If there's anything else you'd like to know about Subhan's engineering background or if you'd like to reach out to him directly, I'm here to help.`,
      suggestedActions: [
        { label: 'Tell me about his projects', query: 'Tell me about his projects' },
        { label: 'Is he available for work?', query: 'Is he available for work?' },
        { label: 'Download Resume (PDF)', href: data.contact.resumeUrl },
        { label: 'Contact Subhan', query: 'How can I contact him?' },
      ],
    };
  }

  if (
    hasPhrase([
      'bye',
      'goodbye',
      'see you',
      'cya',
      'take care',
      'talk to you later',
      'have a good day',
      'have a nice day',
      'good night',
    ]) ||
    normalized === 'bye' ||
    normalized === 'goodbye' ||
    normalized === 'cya'
  ) {
    return {
      text: `Thank you for exploring **${data.identity.fullName}**'s portfolio!

Feel free to connect with Muhammad directly anytime via [Email](mailto:${data.contact.email}) or [LinkedIn](${data.contact.linkedin}). Have a wonderful day!`,
      suggestedActions: [
        { label: 'Send Email', href: `mailto:${data.contact.email}` },
        { label: 'Message on WhatsApp', href: data.contact.whatsapp },
        { label: 'View LinkedIn', href: data.contact.linkedin },
      ],
    };
  }

  // 5. Rates / Pricing / Cost / Salary / Quote
  if (
    hasPhrase([
      'how much does he charge',
      'what are his rates',
      'rate',
      'pricing',
      'cost',
      'price',
      'fee',
      'hourly rate',
      'salary',
      'quote',
      'budget',
      'how much for a website',
    ])
  ) {
    return {
      text: `Subhan's rates and compensation depend on project scope, architecture requirements, and engagement model (contract, freelance, or full-time).

To discuss budget, quotes, or salary expectations for an engineering opportunity:
• **Email:** [${data.contact.email}](mailto:${data.contact.email})
• **WhatsApp:** [Message on WhatsApp](${data.contact.whatsapp})
• **Direct Inquiry:** [Submit via Contact Form](#contact)`,
      suggestedActions: [
        { label: 'Send Email', href: `mailto:${data.contact.email}` },
        { label: 'Message on WhatsApp', href: data.contact.whatsapp },
        { label: 'Is he available for work?', query: 'Is he available for work?' },
      ],
    };
  }

  // 6. Location / Timezone / Relocation / Remote Work
  if (
    hasPhrase([
      'location',
      'where does he live',
      'where is he',
      'where is subhan',
      'city',
      'country',
      'pakistan',
      'rawalpindi',
      'islamabad',
      'timezone',
      'time zone',
      'relocate',
      'relocation',
      'remote work',
      'work remotely',
    ])
  ) {
    return {
      text: `**Location & Timezone:**
• **Location:** ${data.identity.location} (Rawalpindi / Islamabad, Pakistan)
• **Timezone:** PKT (UTC+5) — comfortable collaborating across US, UK, European, and Asian timezones.
• **Work Preference:** Fully available for **Remote** roles worldwide as well as **Onsite** opportunities in Islamabad/Rawalpindi.`,
      suggestedActions: [
        { label: 'Is he available for work?', query: 'Is he available for work?' },
        { label: 'How can I contact him?', query: 'How can I contact him?' },
        { label: 'Download Resume (PDF)', href: data.contact.resumeUrl },
      ],
    };
  }

  // 7. Resume / CV
  if (
    hasPhrase([
      'resume',
      'cv',
      'curriculum vitae',
      'download resume',
      'download cv',
      'pdf',
      'profile document',
    ]) ||
    normalized === 'resume' ||
    normalized === 'cv' ||
    hasToken(['resume', 'curriculum', 'resum'])
  ) {
    return {
      text: `You can download **${data.identity.fullName}**'s latest verified resume directly:

📄 **[Download Resume (PDF)](${data.contact.resumeUrl})**

His resume includes comprehensive details of his software engineering roles at EasyPaisa, Smile Check AI, Brawse, and Devmerce, as well as full-stack production projects and technical certifications.`,
      suggestedActions: [
        { label: 'Download Resume (PDF)', href: data.contact.resumeUrl },
        { label: 'What is his experience?', query: 'What is his experience?' },
        { label: 'What technologies does he use?', query: 'What technologies does he use?' },
      ],
    };
  }

  // 8. Contact / Availability / Hiring
  if (
    hasPhrase([
      'contact',
      'email',
      'phone',
      'whatsapp',
      'linkedin',
      'github',
      'instagram',
      'reach',
      'get in touch',
      'call him',
      'message him',
      'available',
      'hire',
      'hiring',
      'open to work',
      'work with him',
      'job opportunity',
      'interview',
    ]) ||
    normalized === 'contact' ||
    normalized === 'email' ||
    normalized === 'phone' ||
    normalized === 'whatsapp' ||
    normalized === 'linkedin' ||
    normalized === 'github' ||
    normalized === 'hire' ||
    hasToken(['contact', 'contct', 'whatsapp', 'linkedin', 'email', 'available', 'avialable', 'hire'])
  ) {
    const isHireFocus = hasPhrase(['available', 'hire', 'hiring', 'open to work', 'job opportunity', 'interview']);

    let text = '';
    if (isHireFocus) {
      text = `**Availability Status:** ${data.identity.availability}\n\nSubhan is based in **${data.identity.location}** and is open to both **Remote** and **Onsite** software engineering roles.\n\n`;
    } else {
      text = `You can connect directly with **${data.identity.preferredName}** through any of these verified channels:\n\n`;
    }

    text += `• **Email:** [${data.contact.email}](mailto:${data.contact.email})\n` +
      `• **WhatsApp:** [Message on WhatsApp](${data.contact.whatsapp})\n` +
      `• **LinkedIn:** [linkedin.com/in/muhammad-subhan-shahid](https://www.linkedin.com/in/muhammad-subhan-shahid-564160384)\n` +
      `• **GitHub:** [github.com/SubhanShahid55](https://github.com/SubhanShahid55)\n` +
      `• **Location:** ${data.identity.location}\n\n` +
      `You can also submit a message through the [Contact Form](#contact) on this portfolio.`;

    return {
      text,
      suggestedActions: [
        { label: 'Send Email', href: `mailto:${data.contact.email}` },
        { label: 'Message on WhatsApp', href: data.contact.whatsapp },
        { label: 'View LinkedIn', href: data.contact.linkedin },
        { label: 'Download Resume (PDF)', href: data.contact.resumeUrl },
      ],
    };
  }

  // 9. Specific Company Experience
  // EasyPaisa
  if (hasPhrase(['easypaisa', 'easypay', 'telenor']) || hasToken(['easypaisa', 'easypay'])) {
    const ep = data.experience.find((e) => e.company.toLowerCase().includes('easypaisa'));
    return {
      text: `**${ep?.company || 'EasyPaisa'} — ${ep?.role || 'Summer Intern'}** (${ep?.startDate} – ${ep?.endDate})
*Location:* ${ep?.location} · *Type:* ${ep?.type}

${ep?.summary}

**Key Contributions:**
${ep?.highlights.map((h) => `• ${h}`).join('\n')}

**Technologies & Focus:** ${ep?.technologies.join(', ')}`,
      suggestedActions: [
        { label: 'What is his experience?', query: 'What is his experience?' },
        { label: 'Tell me about Smile Check AI', query: 'Tell me about Smile Check AI' },
        { label: 'Download Resume (PDF)', href: data.contact.resumeUrl },
      ],
    };
  }

  // Smile Check AI
  if (hasPhrase(['smile check', 'smilecheck', 'diagnostic']) || hasToken(['smilecheck'])) {
    const sc = data.experience.find((e) => e.company.toLowerCase().includes('smile check'));
    return {
      text: `**${sc?.company || 'Smile Check AI'} — ${sc?.role || 'Backend Developer Intern'}** (${sc?.startDate} – ${sc?.endDate})
*Location:* ${sc?.location} · *Type:* ${sc?.type}

${sc?.summary}

**Key Highlights:**
${sc?.highlights.map((h) => `• ${h}`).join('\n')}

**Technologies:** ${sc?.technologies.join(', ')}`,
      suggestedActions: [
        { label: 'What is his experience?', query: 'What is his experience?' },
        { label: 'What technologies does he use?', query: 'What technologies does he use?' },
      ],
    };
  }

  // Brawse
  if (hasPhrase(['brawse', 'browser extension', 'extension']) || hasToken(['brawse'])) {
    const br = data.experience.find((e) => e.company.toLowerCase().includes('brawse'));
    return {
      text: `**${br?.company || 'Brawse'} — ${br?.role || 'Junior Software Engineer'}** (${br?.startDate} – ${br?.endDate})
*Location:* ${br?.location} · *Type:* ${br?.type}

${br?.summary}

**Key Highlights:**
${br?.highlights.map((h) => `• ${h}`).join('\n')}

**Technologies:** ${br?.technologies.join(', ')}`,
      suggestedActions: [
        { label: 'What is his experience?', query: 'What is his experience?' },
        { label: 'Tell me about his projects', query: 'Tell me about his projects' },
      ],
    };
  }

  // Devmerce
  if (hasPhrase(['devmerce', 'freelance work', '15+ client']) || hasToken(['devmerce'])) {
    const dm = data.experience.find((e) => e.company.toLowerCase().includes('devmerce'));
    return {
      text: `**${dm?.company || 'Devmerce'} — ${dm?.role || 'Freelance Full-Stack Developer'}** (${dm?.startDate} – ${dm?.endDate})
*Location:* ${dm?.location} · *Type:* ${dm?.type}

${dm?.summary}

**Key Highlights:**
${dm?.highlights.map((h) => `• ${h}`).join('\n')}

**Technologies:** ${dm?.technologies.join(', ')}`,
      suggestedActions: [
        { label: 'Tell me about his projects', query: 'Tell me about his projects' },
        { label: 'How can I contact him?', query: 'How can I contact him?' },
      ],
    };
  }

  // Grow Station
  if (hasPhrase(['grow station', 'growstation', 'laravel', 'php']) || hasToken(['growstation'])) {
    const gs = data.experience.find((e) => e.company.toLowerCase().includes('grow station'));
    return {
      text: `**${gs?.company || 'Grow Station'} — ${gs?.role || 'Front End Developer'}** (${gs?.startDate} – ${gs?.endDate})
*Location:* ${gs?.location} · *Type:* ${gs?.type}

${gs?.summary}

**Highlights:**
${gs?.highlights.map((h) => `• ${h}`).join('\n')}

**Technologies:** ${gs?.technologies.join(', ')}`,
      suggestedActions: [
        { label: 'What is his experience?', query: 'What is his experience?' },
      ],
    };
  }

  // 10. Specific Project Inquiries
  if (hasPhrase(['digital media archive', 'media archive', 'fyp', 'final year project'])) {
    const p = data.projects.find((pr) => pr.slug === 'digital-media-archive');
    return {
      text: `**${p?.title}** (${p?.year}) — *${p?.role}*
*Category:* ${p?.category}

**Overview:** ${p?.summary}
**Problem:** ${p?.problem}
**Solution:** ${p?.solution}
**Impact:** ${p?.impact}

**Tech Stack:** ${p?.technologies.join(', ')}
${p?.liveUrl ? `🔗 **[Launch Live Demo](${p.liveUrl})**` : ''}`,
      suggestedActions: [
        ...(p?.liveUrl ? [{ label: 'Open Live Demo', href: p.liveUrl }] : []),
        { label: 'Tell me about Meme Coins Agent', query: 'Tell me about Meme Coins Agent' },
        { label: 'Tell me about his projects', query: 'Tell me about his projects' },
      ],
    };
  }

  if (hasPhrase(['meme coin', 'memecoin', 'memecoins', 'memecoinsagent', 'crypto platform', 'cryptocurrency'])) {
    const p = data.projects.find((pr) => pr.slug === 'meme-coins-agent');
    return {
      text: `**${p?.title}** (${p?.year}) — *${p?.role}*
*Category:* ${p?.category}

**Overview:** ${p?.summary}
**Problem:** ${p?.problem}
**Solution:** ${p?.solution}
**Impact:** ${p?.impact}

**Tech Stack:** ${p?.technologies.join(', ')}
${p?.liveUrl ? `🔗 **[Live Platform](${p.liveUrl})**` : ''}`,
      suggestedActions: [
        ...(p?.liveUrl ? [{ label: 'Launch Live App', href: p.liveUrl }] : []),
        { label: 'Tell me about Homixa', query: 'Tell me about Homixa' },
      ],
    };
  }

  if (hasPhrase(['homixa', 'home service', 'home services'])) {
    const p = data.projects.find((pr) => pr.slug === 'homixa');
    return {
      text: `**${p?.title}** (${p?.year}) — *${p?.role}*
*Category:* ${p?.category}

**Overview:** ${p?.summary}
**Problem:** ${p?.problem}
**Solution:** ${p?.solution}
**Impact:** ${p?.impact}

**Tech Stack:** ${p?.technologies.join(', ')}
${p?.liveUrl ? `🔗 **[Visit Homixa Website](${p.liveUrl})**` : ''}`,
      suggestedActions: [
        ...(p?.liveUrl ? [{ label: 'Visit Website', href: p.liveUrl }] : []),
        { label: 'Tell me about his projects', query: 'Tell me about his projects' },
      ],
    };
  }

  if (hasPhrase(['fraud detection', 'fraud', 'anomaly detection', 'machine learning project', 'ml project'])) {
    const p = data.projects.find((pr) => pr.slug === 'fraud-detection');
    return {
      text: `**${p?.title}** (${p?.year}) — *${p?.role}*
*Category:* ${p?.category}

**Overview:** ${p?.summary}
**Solution:** ${p?.solution}
**Impact:** ${p?.impact}

**Tech Stack:** ${p?.technologies.join(', ')}
${p?.codeUrl ? `📦 **[View Source Code on GitHub](${p.codeUrl})**` : ''}`,
      suggestedActions: [
        ...(p?.codeUrl ? [{ label: 'GitHub Repository', href: p.codeUrl }] : []),
        { label: 'Tell me about Habit Tracker', query: 'Tell me about Habit Tracker' },
      ],
    };
  }

  if (hasPhrase(['habit tracker', 'habit tracking', 'habit app'])) {
    const p = data.projects.find((pr) => pr.slug === 'habit-tracker');
    return {
      text: `**${p?.title}** (${p?.year}) — *${p?.role}*
*Category:* ${p?.category}

**Overview:** ${p?.summary}
**Solution:** ${p?.solution}

**Tech Stack:** ${p?.technologies.join(', ')}
${p?.codeUrl ? `📦 **[View GitHub Code](${p.codeUrl})**` : ''}`,
      suggestedActions: [
        ...(p?.codeUrl ? [{ label: 'View GitHub Repo', href: p.codeUrl }] : []),
        { label: 'Tell me about his projects', query: 'Tell me about his projects' },
      ],
    };
  }

  if (hasPhrase(['ecommerce', 'e-commerce', 'iconic zone', 'shopping cart', 'storefront'])) {
    const p = data.projects.find((pr) => pr.slug === 'ecommerce-frontend');
    return {
      text: `**${p?.title || 'E-commerce Frontend (ICONIC ZONE)'}** (${p?.year || '2023'}) — *${p?.role || 'Frontend Developer'}*
*Category:* ${p?.category || 'Frontend'}

**Overview:** ${p?.summary || 'Frontend for an e-commerce website featuring product listings, shopping cart, and responsive design.'}
**Tech Stack:** ${p?.technologies.join(', ')}
${p?.codeUrl ? `📦 **[View GitHub Code](${p.codeUrl})**` : ''}`,
      suggestedActions: [
        ...(p?.codeUrl ? [{ label: 'View GitHub Code', href: p.codeUrl }] : []),
        { label: 'Tell me about his projects', query: 'Tell me about his projects' },
      ],
    };
  }

  // 11. Specific Tech Deep Dives
  if (
    hasPhrase(['react', 'next.js', 'nextjs', 'tailwind', 'typescript', 'javascript', 'frontend', 'ui/ux', 'figma']) ||
    hasToken(['css', 'html', 'frontend', 'ui'])
  ) {
    return {
      text: `**Frontend & UI Engineering:**
Subhan specializes in **React**, **Next.js**, **TypeScript**, and **Tailwind CSS**.

• **Architecture:** Clean component hierarchies, modular UI design systems, custom hooks, and Radix UI primitives.
• **Performance & Rendering:** Server-side rendering (SSR), static site generation (SSG), client caching with React Query (@tanstack/react-query).
• **Design & Polish:** Tailwind CSS, Framer Motion micro-interactions, responsive design, and Figma prototyping.`,
      suggestedActions: [
        { label: 'What is his backend stack?', query: 'What is his backend stack?' },
        { label: 'Tell me about his projects', query: 'Tell me about his projects' },
      ],
    };
  }

  if (
    hasPhrase(['node', 'backend', 'express', 'restful', 'python', 'docker', 'postman', 'backend engineering', 'api engineering']) ||
    hasToken(['api', 'apis', 'rest', 'node', 'express', 'python', 'docker'])
  ) {
    return {
      text: `**Backend & API Engineering:**
Subhan builds production backend services with **Node.js**, **Express.js**, and **Python**.

• **API Design:** RESTful endpoints, JWT authentication, request validation, rate limiting, and middleware architecture.
• **High Throughput:** Processed 10,000+ daily diagnostic requests at Smile Check AI with 99.8% uptime.
• **Optimization:** Reduced API latency by 30% through database query optimization and caching.
• **DevOps & Containers:** Docker containerization, Postman API testing suites, and CI/CD pipelines.`,
      suggestedActions: [
        { label: 'What databases does he use?', query: 'What databases does he use?' },
        { label: 'What is his experience?', query: 'What is his experience?' },
      ],
    };
  }

  if (
    hasPhrase(['database', 'databases', 'mongodb', 'postgresql', 'postgres', 'mysql', 'prisma', 'mongoose']) ||
    hasToken(['sql', 'db', 'mongo', 'postgres'])
  ) {
    return {
      text: `**Databases & Data Modeling:**
Subhan works with both NoSQL and relational SQL databases:

• **MongoDB / Mongoose:** Document schema design, indexing strategies, and aggregation pipelines (used in Digital Media Archive and Devmerce client apps).
• **PostgreSQL / MySQL:** Relational schema normalization, complex queries, connection pooling, and performance tuning (used at Smile Check AI).`,
      suggestedActions: [
        { label: 'What technologies does he use?', query: 'What technologies does he use?' },
        { label: 'Tell me about his projects', query: 'Tell me about his projects' },
      ],
    };
  }

  if (hasPhrase(['mern', 'mern stack'])) {
    return {
      text: `**MERN Stack Development:**
Subhan holds a **MERN Stack Development Bootcamp** certification from Hami Trainings (Jan 2025) and has delivered 15+ full-stack web applications using MongoDB, Express.js, React, and Node.js.`,
      suggestedActions: [
        { label: 'Tell me about his projects', query: 'Tell me about his projects' },
        { label: 'Download Resume (PDF)', href: data.contact.resumeUrl },
      ],
    };
  }

  // 12. Education & Certifications
  if (
    hasPhrase([
      'education',
      'degree',
      'study',
      'studied',
      'university',
      'college',
      'school',
      'academic',
      'qualification',
      'qualifications',
      'certification',
      'certifications',
      'certificate',
      'bootcamp',
      'hami trainings',
      'final year project',
    ]) ||
    normalized === 'education' ||
    normalized === 'certifications' ||
    hasToken(['education', 'university', 'degree', 'study', 'studied', 'bootcamp', 'certification'])
  ) {
    const eduList = data.education.map((e) => `• **${e.program}** — ${e.institution} (${e.period})`).join('\n');
    const certList = data.certifications.map((c) => `• **${c.name}** — ${c.issuer} (${c.date})`).join('\n');

    return {
      text: `**Education & Academic Background:**
${eduList}

**Verified Certifications:**
${certList}

**Final Year Project (FYP):** *Digital Media Archive* (React, Node.js, MongoDB).`,
      suggestedActions: [
        { label: 'Tell me about Digital Media Archive', query: 'Tell me about Digital Media Archive' },
        { label: 'Download Resume (PDF)', href: data.contact.resumeUrl },
      ],
    };
  }

  // 13. Projects Overview
  if (
    hasPhrase([
      'project',
      'projects',
      'portfolio',
      'built',
      'apps',
      'applications',
      'websites',
      'what has he built',
      'what has he made',
      'show me his work',
      'case studies',
      'github repos',
    ]) ||
    normalized === 'projects' ||
    normalized === 'work' ||
    hasToken(['project', 'projects', 'projcts', 'built', 'build'])
  ) {
    const projList = data.projects.map((p, i) => (
      `${i + 1}. **${p.title}** (${p.year} · ${p.category})\n   ${p.summary}\n   *Stack:* ${p.technologies.slice(0, 4).join(', ')}${p.liveUrl ? ` · [Live Demo](${p.liveUrl})` : ''}`
    )).join('\n\n');

    return {
      text: `Here are **${data.identity.preferredName}**'s featured engineering projects:\n\n${projList}\n\nYou can explore case studies in the [Work Section](#work) or ask me about any specific project.`,
      suggestedActions: [
        { label: 'Tell me about Digital Media Archive', query: 'Tell me about Digital Media Archive' },
        { label: 'Tell me about Meme Coins Agent', query: 'Tell me about Meme Coins Agent' },
        { label: 'Tell me about Homixa', query: 'Tell me about Homixa' },
        { label: 'Tell me about Fraud Detection', query: 'Tell me about Fraud Detection' },
      ],
    };
  }

  // 14. Experience Overview
  if (
    hasPhrase([
      'experience',
      'work history',
      'career',
      'company',
      'companies',
      'jobs',
      'employment',
      'internship',
      'internships',
      'where has he worked',
    ]) ||
    normalized === 'experience' ||
    hasToken(['experience', 'experence', 'career', 'companies'])
  ) {
    const expList = data.experience.map((e) => (
      `• **${e.company}** — *${e.role}* (${e.startDate} – ${e.endDate || 'Present'})\n  ${e.summary} [Tech: ${e.technologies.slice(0, 4).join(', ')}]`
    )).join('\n\n');

    return {
      text: `**${data.identity.fullName}** has 2+ years of professional software engineering experience across fintech, healthcare AI, browser tools, and client web solutions:\n\n${expList}\n\nWould you like details on a specific role?`,
      suggestedActions: [
        { label: 'Tell me about EasyPaisa', query: 'Tell me about EasyPaisa' },
        { label: 'Tell me about Smile Check AI', query: 'Tell me about Smile Check AI' },
        { label: 'Tell me about Brawse', query: 'Tell me about Brawse' },
        { label: 'Download Resume (PDF)', href: data.contact.resumeUrl },
      ],
    };
  }

  // 15. General Skills & Specialization Overview
  if (
    hasPhrase([
      'specialize',
      'specialization',
      'skill',
      'skills',
      'technology',
      'technologies',
      'stack',
      'toolkit',
      'about',
      'who is subhan',
      'tell me about subhan',
      'tell me about him',
      'summary',
      'overview',
      'background',
    ]) ||
    normalized === 'skills' ||
    normalized === 'about' ||
    normalized === 'stack' ||
    hasToken(['skill', 'skills', 'skils', 'tech', 'stack', 'technologies', 'specialize', 'specialization'])
  ) {
    const skillList = data.skills.map((s) => `• **${s.category}:** ${s.items.join(', ')}`).join('\n');

    return {
      text: `**${data.identity.fullName}** specializes in **Full-Stack Web Development**, engineering production-ready applications with **React**, **Next.js**, **TypeScript**, **Node.js**, **MongoDB**, and **PostgreSQL**.

**Core Toolkit:**
${skillList}

He has delivered 15+ client projects across fintech, healthcare, e-commerce, and SaaS.`,
      suggestedActions: [
        { label: 'Tell me about his projects', query: 'Tell me about his projects' },
        { label: 'What is his experience?', query: 'What is his experience?' },
        { label: 'Is he available for work?', query: 'Is he available for work?' },
        { label: 'How can I contact him?', query: 'How can I contact him?' },
      ],
    };
  }

  // 16. Metrics / Stats
  if (hasPhrase(['metrics', 'stats', 'numbers', 'achievements', 'how many', 'uptime', 'latency', 'requests'])) {
    const metricList = data.metrics.map((m) => `• **${m.value} ${m.label}** — ${m.sourceNote || 'Verified'}`).join('\n');
    return {
      text: `Here are verified engineering metrics for **${data.identity.preferredName}**:\n\n${metricList}`,
      suggestedActions: [
        { label: 'What is his experience?', query: 'What is his experience?' },
        { label: 'How can I contact him?', query: 'How can I contact him?' },
      ],
    };
  }

  // 17. Principles & Philosophy
  if (hasPhrase(['principle', 'principles', 'philosophy', 'approach', 'how does he work', 'work style', 'best practices'])) {
    const principlesList = data.principles.map((p, i) => `**${i + 1}. ${p.title}**\n${p.description}`).join('\n\n');
    return {
      text: `**${data.identity.preferredName}**'s core engineering principles:\n\n${principlesList}`,
      suggestedActions: [
        { label: 'What is his experience?', query: 'What is his experience?' },
        { label: 'How can I contact him?', query: 'How can I contact him?' },
      ],
    };
  }

  // 18. Testimonials & Recommendations
  if (hasPhrase(['testimonial', 'testimonials', 'review', 'reviews', 'recommendation', 'recommendations', 'feedback', 'endorsement'])) {
    const testList = data.testimonials.map((t) => `> "${t.quote}"\n— **${t.name}** (${t.role}${t.company ? `, ${t.company}` : ''})`).join('\n\n');
    return {
      text: `Here is verified feedback from clients and collaborators:\n\n${testList}`,
      suggestedActions: [
        { label: 'Tell me about his projects', query: 'Tell me about his projects' },
        { label: 'How can I contact him?', query: 'How can I contact him?' },
      ],
    };
  }

  // 19. Graceful helpful fallback
  return {
    text: `I don’t have a confirmed answer for that in the published portfolio. You can explore the verified sections above or contact Subhan directly for the most accurate information.

What would you like to explore?`,
    suggestedActions: [
      { label: 'What does Subhan specialize in?', query: 'What does Subhan specialize in?' },
      { label: 'Tell me about his projects', query: 'Tell me about his projects' },
      { label: 'What technologies does he use?', query: 'What technologies does he use?' },
      { label: 'What is his experience?', query: 'What is his experience?' },
      { label: 'How can I contact him?', query: 'How can I contact him?' },
    ],
  };
}

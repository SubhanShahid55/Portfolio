import { describe, it, expect } from 'vitest';
import { generateChatResponse, levenshteinDistance, tokenSimilarity } from '@/lib/chatbotEngine';
import { profileKnowledge } from '@/data/profile';

describe('chatbotEngine — Conversational Edge Cases & Meta Inquiries', () => {
  it('handles "can i ask something ?" and permission queries with a warm, helpful response', () => {
    const metaQueries = [
      'can i ask something ?',
      'can I ask a question?',
      'i have a question',
      'i want to know something',
      'can you help me?',
      'help',
      'what can you do?',
      'what can i ask you?',
      'guide me',
    ];

    for (const q of metaQueries) {
      const res = generateChatResponse(q);
      expect(res.text).toContain('Subhan AI');
      expect(res.text).toContain('Muhammad Subhan Shahid');
      expect(res.suggestedActions?.length).toBeGreaterThanOrEqual(4);
    }
  });

  it('handles chit-chat, politeness, gratitude, and goodbyes', () => {
    const thankRes = generateChatResponse('thank you so much!');
    expect(thankRes.text).toContain('welcome');

    const howAreYouRes = generateChatResponse('how are you doing?');
    expect(howAreYouRes.text).toContain('doing great');

    const byeRes = generateChatResponse('goodbye see you later');
    expect(byeRes.text).toContain('Thank you for exploring');

    const okRes = generateChatResponse('ok sounds good');
    expect(okRes.text).toContain('welcome');
  });

  it('handles pricing, rates, location, and timezone questions', () => {
    const ratesRes = generateChatResponse('How much does he charge for a project?');
    expect(ratesRes.text).toContain('subhanshahid.dev@gmail.com');
    expect(ratesRes.text).toContain('rates');

    const locRes = generateChatResponse('Where is he located?');
    expect(locRes.text).toContain('Rawalpindi / Islamabad, Pakistan');
    expect(locRes.text).toContain('PKT');
  });

  it('handles single-word queries gracefully', () => {
    expect(generateChatResponse('projects').text).toContain('Digital Media Archive');
    expect(generateChatResponse('skills').text).toContain('Full-Stack Web Development');
    expect(generateChatResponse('contact').text).toContain('subhanshahid.dev@gmail.com');
    expect(generateChatResponse('resume').text).toContain('/Muhammad_Subhan_CV.pdf');
    expect(generateChatResponse('experience').text).toContain('EasyPaisa');
    expect(generateChatResponse('about').text).toContain('Full-Stack Web Development');
  });
});

describe('chatbotEngine — String similarity & Typo tolerance', () => {
  it('computes correct levenshtein distances', () => {
    expect(levenshteinDistance('project', 'project')).toBe(0);
    expect(levenshteinDistance('projct', 'project')).toBe(1);
    expect(levenshteinDistance('skils', 'skills')).toBe(1);
    expect(levenshteinDistance('contct', 'contact')).toBe(1);
  });

  it('calculates token similarity for typos', () => {
    expect(tokenSimilarity('projcts', 'projects')).toBeGreaterThan(0.7);
    expect(tokenSimilarity('easypasa', 'easypaisa')).toBeGreaterThan(0.7);
    expect(tokenSimilarity('linkdin', 'linkedin')).toBeGreaterThan(0.7);
    expect(tokenSimilarity('whatsap', 'whatsapp')).toBeGreaterThan(0.7);
    expect(tokenSimilarity('experence', 'experience')).toBeGreaterThan(0.7);
  });
});

describe('chatbotEngine — Persona & AI Safety Guardrails', () => {
  it('clarifies it is an AI assistant representing the portfolio and not Muhammad personally', () => {
    const questions = [
      'Are you Muhammad?',
      'Are you Subhan?',
      'Are you a bot?',
      'Are you human?',
      'Who are you?',
      'What is your name?',
    ];

    for (const q of questions) {
      const res = generateChatResponse(q);
      expect(res.text).toContain('Subhan AI');
      expect(res.text).toContain('not Muhammad personally');
      expect(res.text).toContain('subhanshahid.dev@gmail.com');
      expect(res.suggestedActions?.length).toBeGreaterThan(0);
    }
  });
});

describe('chatbotEngine — Six Core Welcome Prompts', () => {
  it('1. What does Subhan specialize in?', () => {
    const res = generateChatResponse('What does Subhan specialize in?');
    expect(res.text).toContain('Full-Stack Web Development');
    expect(res.text).toContain('React');
    expect(res.text).toContain('Node.js');
    expect(res.text).toContain('15+ client projects');
  });

  it('2. Tell me about his projects', () => {
    const res = generateChatResponse('Tell me about his projects');
    expect(res.text).toContain('Digital Media Archive');
    expect(res.text).toContain('Meme Coins Agent');
    expect(res.text).toContain('Homixa');
    expect(res.suggestedActions?.length).toBeGreaterThanOrEqual(4);
  });

  it('3. What technologies does he use?', () => {
    const res = generateChatResponse('What technologies does he use?');
    expect(res.text).toContain('Frontend');
    expect(res.text).toContain('Backend');
    expect(res.text).toContain('MongoDB');
  });

  it('4. What is his experience?', () => {
    const res = generateChatResponse('What is his experience?');
    expect(res.text).toContain('EasyPaisa');
    expect(res.text).toContain('Smile Check AI');
    expect(res.text).toContain('Brawse');
    expect(res.text).toContain('Devmerce');
  });

  it('5. Is he available for work?', () => {
    const res = generateChatResponse('Is he available for work?');
    expect(res.text).toContain('Availability Status');
    expect(res.text).toContain('Open to Software Engineering Opportunities');
    expect(res.text).toContain('Rawalpindi, Pakistan');
    expect(res.text).toContain('subhanshahid.dev@gmail.com');
  });

  it('6. How can I contact him?', () => {
    const res = generateChatResponse('How can I contact him?');
    expect(res.text).toContain('subhanshahid.dev@gmail.com');
    expect(res.text).toContain('wa.me/923240545602');
    expect(res.text).toContain('linkedin.com/in/muhammad-subhan-shahid');
    expect(res.text).toContain('github.com/SubhanShahid55');
  });
});

describe('chatbotEngine — Specific Domain Entities', () => {
  it('handles specific company questions: EasyPaisa, Smile Check AI, Brawse, Devmerce, Grow Station', () => {
    const ep = generateChatResponse('What did Subhan do at EasyPaisa?');
    expect(ep.text).toContain('EasyPaisa');
    expect(ep.text).toContain('Channel and Development Solutions Team');

    const sc = generateChatResponse('Tell me about Smile Check AI');
    expect(sc.text).toContain('Smile Check AI');
    expect(sc.text).toContain('10,000+');
    expect(sc.text).toContain('30%');

    const br = generateChatResponse('What was his role at Brawse?');
    expect(br.text).toContain('Brawse');
    expect(br.text).toContain('Junior Software Engineer');

    const dm = generateChatResponse('Tell me about Devmerce');
    expect(dm.text).toContain('Devmerce');
    expect(dm.text).toContain('15+');

    const gs = generateChatResponse('Did he work at Grow Station?');
    expect(gs.text).toContain('Grow Station');
  });

  it('handles specific project questions: Digital Media Archive, Meme Coins, Homixa, Fraud Detection, Habit Tracker', () => {
    const dma = generateChatResponse('Tell me about Digital Media Archive');
    expect(dma.text).toContain('Digital Media Archive');
    expect(dma.text).toContain('Final Year Project');
    expect(dma.text).toContain('https://digitalmediaarchive.vercel.app/');

    const mc = generateChatResponse('What is Meme Coins Agent?');
    expect(mc.text).toContain('Meme Coins Agent');
    expect(mc.text).toContain('https://memecoinsagent.info/');

    const hx = generateChatResponse('Tell me about Homixa');
    expect(hx.text).toContain('Homixa');
    expect(hx.text).toContain('https://www.homixaleads.online/');

    const fd = generateChatResponse('What is the Fraud Detection System?');
    expect(fd.text).toContain('Fraud Detection System');
    expect(fd.text).toContain('Python');

    const ht = generateChatResponse('Tell me about the Habit Tracker');
    expect(ht.text).toContain('Habit Tracker App');
  });

  it('handles resume download requests', () => {
    const res1 = generateChatResponse('Where can I download his CV?');
    expect(res1.text).toContain('/Muhammad_Subhan_CV.pdf');

    const res2 = generateChatResponse('Can I get his resume?');
    expect(res2.text).toContain('/Muhammad_Subhan_CV.pdf');
  });

  it('handles education, certifications, and metrics', () => {
    const edu = generateChatResponse('Where did he study?');
    expect(edu.text).toContain('Software Engineering');

    const cert = generateChatResponse('What certifications does he hold?');
    expect(cert.text).toContain('MERN Stack Development Bootcamp');
    expect(cert.text).toContain('Hami Trainings');

    const metrics = generateChatResponse('What are his engineering stats?');
    expect(metrics.text).toContain('15+');
    expect(metrics.text).toContain('10K+');
  });

  it('handles tech stack deep dives (React, Node, DB, MERN)', () => {
    const react = generateChatResponse('How is his React and Next.js experience?');
    expect(react.text).toContain('React');
    expect(react.text).toContain('Next.js');

    const node = generateChatResponse('What about Node and backend APIs?');
    expect(node.text).toContain('Node.js');
    expect(node.text).toContain('Express.js');

    const db = generateChatResponse('What databases does he use?');
    expect(db.text).toContain('MongoDB');
    expect(db.text).toContain('PostgreSQL');

    const mern = generateChatResponse('Does he know MERN stack?');
    expect(mern.text).toContain('MERN Stack Development');
  });

  it('tolerates typos in user queries', () => {
    const typo1 = generateChatResponse('tell me about his projcts');
    expect(typo1.text).toContain('Digital Media Archive');

    const typo2 = generateChatResponse('what skils does he have?');
    expect(typo2.text).toContain('Full-Stack Web Development');

    const typo3 = generateChatResponse('how can i contct him?');
    expect(typo3.text).toContain('subhanshahid.dev@gmail.com');

    const typo4 = generateChatResponse('tell me about easypasa');
    expect(typo4.text).toContain('EasyPaisa');
  });
});

describe('profileKnowledge — Source of Truth Schema', () => {
  it('satisfies ProfileKnowledge model specifications', () => {
    expect(profileKnowledge.identity.fullName).toBe('Muhammad Subhan Shahid');
    expect(profileKnowledge.identity.preferredName).toBe('Subhan Shahid');
    expect(profileKnowledge.contact.email).toBe('subhanshahid.dev@gmail.com');
    expect(profileKnowledge.contact.phone).toBe('+92 324-0545602');
    expect(profileKnowledge.contact.whatsapp).toContain('923240545602');
    expect(profileKnowledge.contact.resumeUrl).toBe('/Muhammad_Subhan_CV.pdf');
    expect(profileKnowledge.metrics.length).toBeGreaterThanOrEqual(4);
    expect(profileKnowledge.skills.length).toBeGreaterThanOrEqual(5);
    expect(profileKnowledge.experience.length).toBeGreaterThanOrEqual(5);
    expect(profileKnowledge.projects.length).toBeGreaterThanOrEqual(6);
    expect(profileKnowledge.education.length).toBeGreaterThanOrEqual(1);
    expect(profileKnowledge.certifications.length).toBeGreaterThanOrEqual(2);
    expect(profileKnowledge.principles.length).toBeGreaterThanOrEqual(3);
    expect(profileKnowledge.testimonials.length).toBeGreaterThanOrEqual(3);
  });
});

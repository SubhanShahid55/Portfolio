import SEOHead from '@/components/SEOHead';
import ContactSection from '@/components/ContactSection';
import portfolioData from '@/data/portfolioData';

const Contact = () => {
  return (
    <>
      <SEOHead
        title="Contact | Software Engineer"
        description="Get in touch with Muhammad Subhan Shahid for software engineering and full-stack development opportunities."
        canonical="https://subhanshahidportfolio.vercel.app/contact"
      />

      <div className="pt-8">
        <ContactSection />
      </div>
    </>
  );
};

export default Contact;

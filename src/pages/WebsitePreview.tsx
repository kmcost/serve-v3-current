
import { useRef } from 'react';
import { WebsiteHeader } from '@/components/website/WebsiteHeader';
import { WebsiteHero } from '@/components/website/WebsiteHero';
import { WebsiteContactForm } from '@/components/website/WebsiteContactForm';

const WebsitePreview = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const issuesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const prioritiesRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    const refs = {
      about: aboutRef,
      issues: issuesRef,
      contact: contactRef,
      priorities: prioritiesRef
    };

    const targetRef = refs[section as keyof typeof refs];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <WebsiteHeader onNavigate={handleNavigate} />
      
      {/* Hero Section */}
      <WebsiteHero onNavigate={handleNavigate} />
      
      {/* About Section - Placeholder */}
      <section ref={aboutRef} className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">About Sarah</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Coming soon: Detailed biography and background information.
          </p>
        </div>
      </section>
      
      {/* Issues Section - Placeholder */}
      <section ref={issuesRef} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Issues & Positions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Coming soon: Position cards for Arts & Culture, LGBTQ+ Rights, Free Speech, and more.
          </p>
        </div>
      </section>
      
      {/* Contact Section */}
      <section ref={contactRef} className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Contact Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your voice matters. Share your thoughts, concerns, or ideas with us.
            </p>
          </div>
          <WebsiteContactForm />
        </div>
      </section>
      
      {/* Priorities Section - Placeholder */}
      <section ref={prioritiesRef} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Current Priorities</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Coming soon: Real-time public board showing community priorities and progress.
          </p>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-muted border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Paid for and authorized by Sarah Mitchell for Office
          </p>
          <p className="text-sm text-muted-foreground">
            Empowered by GoodParty.org
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WebsitePreview;

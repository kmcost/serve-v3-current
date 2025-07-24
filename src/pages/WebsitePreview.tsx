import { useRef } from 'react';
import { WebsiteHeader } from '@/components/website/WebsiteHeader';
import { WebsiteHero } from '@/components/website/WebsiteHero';
import { WebsiteContactForm } from '@/components/website/WebsiteContactForm';
import { WebsitePriorities } from '@/components/website/WebsitePriorities';
import { WebsiteIssueCards } from '@/components/website/WebsiteIssueCards';
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
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <WebsiteHeader onNavigate={handleNavigate} />
      
      {/* Hero Section */}
      <WebsiteHero onNavigate={handleNavigate} />
      
      {/* About Section - Placeholder */}
      <section ref={aboutRef} className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">About Sarah</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Sarah is an advocate for local communities, small businesses and smart economics. As president of a chamber of commerce for 5 years, Sarah has supported strong small business policies that help local economies flourish. A state leader for the White House and board member of national organizations such as Main Street Alliance, Sarah has extensive experience in working across the aisle to pass legislation that improves the daily lives of real people just like you.</p>
        </div>
      </section>
      
      {/* Issues Section */}
      <section ref={issuesRef} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Issues & Positions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn about the key issues and policy positions that guide my commitment to our community.
            </p>
          </div>
          <WebsiteIssueCards />
        </div>
      </section>
      
      {/* Contact Section */}
      <section ref={contactRef} className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Contact</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your voice matters. Share your thoughts, concerns, or ideas with us.
            </p>
          </div>
          <WebsiteContactForm />
        </div>
      </section>
      
      {/* Priorities Section */}
      <section ref={prioritiesRef} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WebsitePriorities />
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
    </div>;
};
export default WebsitePreview;
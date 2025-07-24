import { Button } from '@/components/ui/button';
import { ArrowRight, Users } from 'lucide-react';
interface WebsiteHeroProps {
  onNavigate: (section: string) => void;
}
export function WebsiteHero({
  onNavigate
}: WebsiteHeroProps) {
  return <section className="bg-gradient-to-b from-primary/5 to-background py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Candidate Photo Placeholder */}
          <div className="mx-auto mb-8 w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center">
            <Users className="h-16 w-16 text-primary" />
          </div>

          {/* Main Message */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Sarah Mitchell
          </h1>
          
          <p className="text-xl sm:text-2xl text-primary font-medium mb-4">
            Local Solutions, Not Party Politics
          </p>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Building responsive governance through transparency, accountability, and direct community engagement. 
            Your voice matters, and every message gets a response.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" onClick={() => onNavigate('contact')} className="min-w-48 h-12 text-base font-medium">
              Send a Message
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="lg" onClick={() => onNavigate('priorities')} className="min-w-48 h-12 text-base font-medium">View Priorities</Button>
          </div>
        </div>
      </div>
    </section>;
}
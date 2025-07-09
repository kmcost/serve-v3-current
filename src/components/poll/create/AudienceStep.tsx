import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Lightbulb } from 'lucide-react';

interface AudienceStepProps {
  audience: string;
  onAudienceChange: (value: string) => void;
}

export function AudienceStep({ audience, onAudienceChange }: AudienceStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Who should we ask?</h2>
        <p className="text-muted-foreground">
          Select your target audience for maximum relevant engagement.
        </p>
      </div>

      <RadioGroup value={audience} onValueChange={onAudienceChange}>
        <div className="space-y-3">
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all" className="flex-1">
              <div>
                <p className="font-medium">All Constituents</p>
                <p className="text-sm text-muted-foreground">~25,000 residents in District 3</p>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="downtown" id="downtown" />
            <Label htmlFor="downtown" className="flex-1">
              <div>
                <p className="font-medium">Downtown Area</p>
                <p className="text-sm text-muted-foreground">~2,400 residents and businesses</p>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="residential" id="residential" />
            <Label htmlFor="residential" className="flex-1">
              <div>
                <p className="font-medium">Residential Neighborhoods</p>
                <p className="text-sm text-muted-foreground">~18,500 residents</p>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="previous" id="previous" />
            <Label htmlFor="previous" className="flex-1">
              <div>
                <p className="font-medium">Previous Poll Respondents</p>
                <p className="text-sm text-muted-foreground">~850 engaged constituents</p>
              </div>
            </Label>
          </div>
        </div>
      </RadioGroup>

      {/* AI Recommendation */}
      <div className="bg-accent/50 border-l-4 border-l-primary p-4 rounded">
        <div className="flex gap-3">
          <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm">AI Recommendation</p>
            <p className="text-sm text-muted-foreground mt-1">
              For this parking topic, we recommend targeting <strong>downtown area residents and businesses</strong> (est. 2,400 people) because they're directly affected by parking meter changes and likely to provide relevant feedback.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
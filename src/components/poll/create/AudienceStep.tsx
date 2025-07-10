import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, X } from 'lucide-react';
interface AudienceTag {
  id: string;
  label: string;
  category: 'demographic' | 'geographic' | 'interest' | 'engagement';
  estimatedSize: number;
}
interface AudienceStepProps {
  audience: string[];
  onAudienceChange: (value: string[]) => void;
}
const AUDIENCE_TAGS: AudienceTag[] = [
// Geographic
{
  id: 'downtown',
  label: 'Downtown Area',
  category: 'geographic',
  estimatedSize: 2400
}, {
  id: 'residential',
  label: 'Residential Neighborhoods',
  category: 'geographic',
  estimatedSize: 18500
}, {
  id: 'suburban',
  label: 'Suburban Areas',
  category: 'geographic',
  estimatedSize: 8200
},
// Demographics
{
  id: 'young-adults',
  label: 'Young Adults (18-25)',
  category: 'demographic',
  estimatedSize: 3500
}, {
  id: 'middle-age',
  label: 'Middle Age (26-55)',
  category: 'demographic',
  estimatedSize: 12000
}, {
  id: 'seniors',
  label: 'Seniors (55+)',
  category: 'demographic',
  estimatedSize: 6800
}, {
  id: 'parents',
  label: 'Parents with Children',
  category: 'demographic',
  estimatedSize: 9200
},
// Interests & Occupations
{
  id: 'business-owners',
  label: 'Business Owners',
  category: 'interest',
  estimatedSize: 1200
}, {
  id: 'transit-users',
  label: 'Public Transit Users',
  category: 'interest',
  estimatedSize: 4800
}, {
  id: 'students',
  label: 'Students',
  category: 'interest',
  estimatedSize: 2100
}, {
  id: 'veterans',
  label: 'Veterans',
  category: 'interest',
  estimatedSize: 1800
},
// Engagement
{
  id: 'previous-respondents',
  label: 'Previous Poll Respondents',
  category: 'engagement',
  estimatedSize: 850
}, {
  id: 'newsletter-subscribers',
  label: 'Newsletter Subscribers',
  category: 'engagement',
  estimatedSize: 2200
}, {
  id: 'meeting-attendees',
  label: 'Community Meeting Attendees',
  category: 'engagement',
  estimatedSize: 650
}];
export function AudienceStep({
  audience,
  onAudienceChange
}: AudienceStepProps) {
  const toggleTag = (tagId: string) => {
    if (audience.includes(tagId)) {
      onAudienceChange(audience.filter(id => id !== tagId));
    } else {
      onAudienceChange([...audience, tagId]);
    }
  };
  const selectedTags = AUDIENCE_TAGS.filter(tag => audience.includes(tag.id));
  const totalEstimatedSize = selectedTags.reduce((sum, tag) => sum + tag.estimatedSize, 0);
  const categoryGroups = {
    geographic: AUDIENCE_TAGS.filter(t => t.category === 'geographic'),
    demographic: AUDIENCE_TAGS.filter(t => t.category === 'demographic'),
    interest: AUDIENCE_TAGS.filter(t => t.category === 'interest'),
    engagement: AUDIENCE_TAGS.filter(t => t.category === 'engagement')
  };
  return <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Who do you want to ask?</h2>
      </div>

      {/* Selected Tags Summary */}
      {selectedTags.length > 0 && <Card>
          <CardContent className="p-4 bg-muted/50">
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Current Selection:</div>
                <div className="text-xl font-bold text-primary whitespace-nowrap">
                  {Math.round(totalEstimatedSize * 0.8).toLocaleString()} Residents
                </div>
              </div>
              <div className="flex flex-wrap gap-2 py-[4px]">
                {selectedTags.map(tag => <Badge key={tag.id} variant="secondary" className="gap-2 px-3 py-1 bg-blue-100 text-blue-800">
                    {tag.label}
                    <Button variant="ghost" size="sm" className="h-4 w-4 p-0 hover:bg-transparent" onClick={() => toggleTag(tag.id)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>)}
              </div>
            </div>
          </CardContent>
        </Card>}

      {/* Tag Categories */}
      <div className="space-y-4">
        {Object.entries(categoryGroups).map(([category, tags]) => <div key={category}>
            <h3 className="font-medium mb-2 capitalize">
              {category === 'geographic' ? 'Geographic' : category === 'demographic' ? 'Demographics' : category === 'interest' ? 'Interests & Occupations' : 'Engagement Level'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => {
            const isSelected = audience.includes(tag.id);
            return <Button key={tag.id} variant={isSelected ? "default" : "outline"} size="sm" onClick={() => toggleTag(tag.id)} className="text-xs">
                    {tag.label} ({tag.estimatedSize.toLocaleString()})
                  </Button>;
          })}
            </div>
          </div>)}
      </div>

    </div>;
}
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Eye } from 'lucide-react';
import { Question } from './types';
interface PreviewStepProps {
  questions: Question[];
  audience: string[];
  channels: string[];
  isMultipleQuestions: boolean;
}
const AUDIENCE_TAGS = [{
  id: 'downtown',
  label: 'Downtown Area'
}, {
  id: 'residential',
  label: 'Residential Neighborhoods'
}, {
  id: 'suburban',
  label: 'Suburban Areas'
}, {
  id: 'young-adults',
  label: 'Young Adults (18-25)'
}, {
  id: 'middle-age',
  label: 'Middle Age (26-55)'
}, {
  id: 'seniors',
  label: 'Seniors (55+)'
}, {
  id: 'parents',
  label: 'Parents with Children'
}, {
  id: 'business-owners',
  label: 'Business Owners'
}, {
  id: 'transit-users',
  label: 'Public Transit Users'
}, {
  id: 'students',
  label: 'Students'
}, {
  id: 'veterans',
  label: 'Veterans'
}, {
  id: 'previous-respondents',
  label: 'Previous Poll Respondents'
}, {
  id: 'newsletter-subscribers',
  label: 'Newsletter Subscribers'
}, {
  id: 'meeting-attendees',
  label: 'Community Meeting Attendees'
}];
export function PreviewStep({
  questions,
  audience,
  channels,
  isMultipleQuestions
}: PreviewStepProps) {
  const CHANNEL_OPTIONS = [
    { id: 'email', name: 'Email' },
    { id: 'sms', name: 'SMS' },
    { id: 'social', name: 'Social Media' },
    { id: 'phone', name: 'Phone Calls' }
  ];

  const getAudienceDisplay = () => {
    if (audience.length === 0) return <p className="font-medium">No audience selected</p>;
    const selectedTags = AUDIENCE_TAGS.filter(tag => audience.includes(tag.id));
    return (
      <div className="space-y-1">
        {selectedTags.map(tag => (
          <p key={tag.id} className="font-medium">{tag.label}</p>
        ))}
      </div>
    );
  };

  const getChannelsDisplay = () => {
    if (channels.length === 0) return <p className="font-medium">None selected</p>;
    const selectedChannels = CHANNEL_OPTIONS.filter(channel => channels.includes(channel.id));
    return (
      <div className="space-y-1">
        {selectedChannels.map(channel => (
          <p key={channel.id} className="font-medium">{channel.name}</p>
        ))}
      </div>
    );
  };

  const getExpectedEngagement = () => {
    const channelResponses = {
      email: 800,
      sms: 400,
      social: 300,
      phone: 150
    };
    
    const totalResponses = channels.reduce((sum, channelId) => {
      return sum + (channelResponses[channelId as keyof typeof channelResponses] || 0);
    }, 0);
    
    return totalResponses;
  };
  return <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Preview & Launch</h2>
        
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-3 space-y-3">
              <div>
                <Label className="text-sm text-muted-foreground">
                  {questions.length === 1 ? 'Question' : 'Questions'}
                </Label>
                <div className="space-y-1 mt-1">
                  {questions.map((question, index) => (
                    <p key={index} className="font-medium">
                      {questions.length === 1 
                        ? question.text
                        : `Question ${index + 1}: ${question.text}`
                      }
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Audience</Label>
                <div className="mt-1">{getAudienceDisplay()}</div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Channels</Label>
                <div className="mt-1">{getChannelsDisplay()}</div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Expected Engagement</Label>
                <p className="font-medium text-primary">{getExpectedEngagement()} Responses</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Total Cost</Label>
                <p className="font-medium">$120</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          
        </div>
      </div>
    </div>;
}
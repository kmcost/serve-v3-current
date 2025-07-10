import { Badge } from '@/components/ui/badge';
import { Mail, MessageSquare, Share2, Phone, Lightbulb } from 'lucide-react';

interface DistributionStepProps {
  channels: string[];
  onChannelsChange: (channels: string[]) => void;
}

const CHANNEL_OPTIONS = [
  { id: 'email', icon: Mail, name: 'Email', reach: '~800 responses', cost: '$45' },
  { id: 'sms', icon: MessageSquare, name: 'SMS', reach: '~400 responses', cost: '$75' },
  { id: 'social', icon: Share2, name: 'Social Media', reach: '~300 responses', cost: '$25' },
  { id: 'phone', icon: Phone, name: 'Phone Calls', reach: '~150 responses', cost: '$200' }
];

export function DistributionStep({ channels, onChannelsChange }: DistributionStepProps) {
  const toggleChannel = (channelId: string) => {
    if (channels.includes(channelId)) {
      onChannelsChange(channels.filter(c => c !== channelId));
    } else {
      onChannelsChange([...channels, channelId]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">How do you want to ask them?</h2>
        <p className="text-muted-foreground">
          Select how you want to reach your audience.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          {CHANNEL_OPTIONS.map((channel) => {
            const Icon = channel.icon;
            const isSelected = channels.includes(channel.id);
            
            return (
              <div 
                key={channel.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  isSelected ? 'border-primary bg-primary/5' : 'border-border hover:bg-accent/50'
                }`}
                onClick={() => toggleChannel(channel.id)}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{channel.name}</p>
                      {isSelected && <Badge variant="default" className="text-xs">Selected</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {channel.reach} • {channel.cost}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
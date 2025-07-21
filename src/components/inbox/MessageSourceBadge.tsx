
import { Badge } from '@/components/ui/badge';
import { Globe, Mail, Facebook, Smartphone } from 'lucide-react';

interface MessageSourceBadgeProps {
  source: 'website' | 'email' | 'facebook' | 'sms';
  className?: string;
}

export function MessageSourceBadge({ source, className = '' }: MessageSourceBadgeProps) {
  const sourceConfig = {
    website: {
      label: 'Website',
      icon: Globe,
      color: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    email: {
      label: 'Email',
      icon: Mail,
      color: 'bg-green-100 text-green-800 border-green-200'
    },
    facebook: {
      label: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    sms: {
      label: 'SMS',
      icon: Smartphone,
      color: 'bg-purple-100 text-purple-800 border-purple-200'
    }
  };

  const config = sourceConfig[source];
  const Icon = config.icon;

  return (
    <Badge 
      variant="outline" 
      className={`${config.color} gap-1 text-xs whitespace-nowrap flex-shrink-0 ${className}`}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}

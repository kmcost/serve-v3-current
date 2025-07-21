
import { Globe, Mail, Facebook, Smartphone } from 'lucide-react';

interface MessageSourceBadgeProps {
  source: 'website' | 'email' | 'facebook' | 'sms';
  className?: string;
}

export function MessageSourceBadge({ source, className = '' }: MessageSourceBadgeProps) {
  const sourceConfig = {
    website: {
      icon: Globe,
      title: 'Website'
    },
    email: {
      icon: Mail,
      title: 'Email'
    },
    facebook: {
      icon: Facebook,
      title: 'Facebook'
    },
    sms: {
      icon: Smartphone,
      title: 'SMS'
    }
  };

  const config = sourceConfig[source];
  const Icon = config.icon;

  return (
    <span title={config.title}>
      <Icon className={`h-4 w-4 text-muted-foreground ${className}`} />
    </span>
  );
}

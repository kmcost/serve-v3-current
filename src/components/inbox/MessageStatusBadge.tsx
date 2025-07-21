
import { Badge } from '@/components/ui/badge';
import { 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  MessageCircle,
  Eye 
} from 'lucide-react';

interface MessageStatusBadgeProps {
  status: 'unread' | 'read' | 'responded' | 'issue-created' | 'resolved';
  className?: string;
}

export function MessageStatusBadge({ status, className = '' }: MessageStatusBadgeProps) {
  const statusConfig = {
    unread: {
      label: 'Unread',
      icon: AlertCircle,
      color: 'bg-red-100 text-red-800 border-red-200'
    },
    read: {
      label: 'Read',
      icon: Eye,
      color: 'bg-gray-100 text-gray-800 border-gray-200'
    },
    responded: {
      label: 'Responded',
      icon: MessageCircle,
      color: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    'issue-created': {
      label: 'Issue Created',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-800 border-green-200'
    },
    resolved: {
      label: 'Resolved',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-800 border-green-200'
    }
  };

  const config = statusConfig[status];
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

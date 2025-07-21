
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Clock,
  Mail,
  Phone,
  Plus,
  ArrowRight,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';
import { MessageSourceBadge } from './MessageSourceBadge';
import { MessageStatusBadge } from './MessageStatusBadge';
import { EnhancedMessage } from '@/types/inbox';

interface MessageCardProps {
  message: EnhancedMessage;
  isSelected?: boolean;
  onSelect?: (messageId: string, selected: boolean) => void;
  onCreateIssue?: (messageId: string) => void;
  showCheckbox?: boolean;
}

export function MessageCard({ 
  message, 
  isSelected = false, 
  onSelect, 
  onCreateIssue, 
  showCheckbox = false 
}: MessageCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-destructive';
      case 'medium':
        return 'border-l-warning';
      case 'low':
        return 'border-l-muted-foreground';
      default:
        return 'border-l-muted';
    }
  };

  const handleCreateIssue = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCreateIssue?.(message.id);
  };

  return (
    <Card 
      className={`hover:shadow-md transition-all border-l-4 ${getPriorityColor(message.priority)} ${
        !message.isRead ? 'bg-blue-50/50' : ''
      } ${isSelected ? 'ring-2 ring-primary' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-3 md:p-4">
        {/* Mobile Header with checkbox and sender */}
        <div className="flex items-start gap-3 mb-3">
          {showCheckbox && (
            <div className="flex items-center pt-0.5">
              <Checkbox
                checked={isSelected}
                onCheckedChange={(checked) => onSelect?.(message.id, !!checked)}
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-semibold truncate text-base ${!message.isRead ? 'text-primary' : 'text-foreground'}`}>
                {message.from}
              </h3>
              {!message.isRead && (
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
              )}
            </div>
            
            <p className={`text-sm font-medium mb-2 ${!message.isRead ? 'text-primary' : 'text-foreground'}`}>
              {message.subject}
            </p>
          </div>
        </div>

        {/* Message preview */}
        <div className="mb-3">
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {message.preview}
          </p>
        </div>

        {/* Badges - Stack on mobile, inline on desktop */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <MessageSourceBadge source={message.source} />
            <MessageStatusBadge status={message.status} />
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {message.priority === 'high' && (
              <Badge variant="outline" className="gap-1 text-xs bg-red-100 text-red-800 border-red-200 flex-shrink-0">
                <AlertTriangle className="h-3 w-3" />
                High Priority
              </Badge>
            )}
            
            {message.relatedIssues && message.relatedIssues.length > 0 && (
              <Badge variant="outline" className="gap-1 text-xs bg-green-100 text-green-800 border-green-200 flex-shrink-0">
                <ArrowRight className="h-3 w-3" />
                {message.relatedIssues.length} Issue{message.relatedIssues.length !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>
        </div>

        {/* Contact info - Stack on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Mail className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{message.email}</span>
          </div>
          {message.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3 flex-shrink-0" />
              <span>{message.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 flex-shrink-0" />
            <span>{message.time}</span>
          </div>
        </div>

        {/* Action Buttons - Full width on mobile, side by side on desktop */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Link to={`/inbox/${message.id}`} className="flex-1 sm:flex-initial">
            <Button size="sm" variant="outline" className="w-full sm:w-auto gap-2">
              <MessageSquare className="h-4 w-4" />
              View Message
            </Button>
          </Link>
          
          {message.status !== 'issue-created' && (
            <Button
              size="sm"
              onClick={handleCreateIssue}
              className="w-full sm:w-auto gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Issue
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

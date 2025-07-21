
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
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Selection Checkbox */}
          {showCheckbox && (
            <div className="flex items-center pt-1">
              <Checkbox
                checked={isSelected}
                onCheckedChange={(checked) => onSelect?.(message.id, !!checked)}
              />
            </div>
          )}

          {/* Message Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-semibold truncate ${!message.isRead ? 'text-primary' : 'text-foreground'}`}>
                    {message.from}
                  </h3>
                  {!message.isRead && (
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  )}
                </div>
                
                <p className={`text-sm font-medium mb-1 ${!message.isRead ? 'text-primary' : 'text-foreground'}`}>
                  {message.subject}
                </p>
                
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {message.preview}
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col gap-2 flex-shrink-0">
                <Link to={`/inbox/${message.id}`}>
                  <Button size="sm" variant="outline" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    View
                  </Button>
                </Link>
                
                {message.status !== 'issue-created' && (
                  <Button
                    size="sm"
                    onClick={handleCreateIssue}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Create Issue
                  </Button>
                )}
              </div>
            </div>
            
            {/* Message Metadata */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <MessageSourceBadge source={message.source} />
              <MessageStatusBadge status={message.status} />
              
              {message.priority === 'high' && (
                <Badge variant="outline" className="gap-1 text-xs bg-red-100 text-red-800 border-red-200">
                  <AlertTriangle className="h-3 w-3" />
                  High Priority
                </Badge>
              )}
              
              {message.relatedIssues && message.relatedIssues.length > 0 && (
                <Badge variant="outline" className="gap-1 text-xs bg-green-100 text-green-800 border-green-200">
                  <ArrowRight className="h-3 w-3" />
                  {message.relatedIssues.length} Issue{message.relatedIssues.length !== 1 ? 's' : ''}
                </Badge>
              )}
            </div>
            
            {/* Contact Info & Time */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {message.email}
              </div>
              {message.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {message.phone}
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {message.time}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

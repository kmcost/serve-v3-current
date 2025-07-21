
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Plus,
  AlertTriangle
} from 'lucide-react';
import { MessageSourceBadge } from './MessageSourceBadge';
import { EnhancedMessage } from '@/types/inbox';

interface MessageCardProps {
  message: EnhancedMessage;
  isSelected?: boolean;
  onSelect?: (messageId: string, selected: boolean) => void;
  onCreateIssue?: (messageId: string) => void;
}

export function MessageCard({ 
  message, 
  isSelected = false, 
  onSelect, 
  onCreateIssue
}: MessageCardProps) {
  const handleCreateIssue = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCreateIssue?.(message.id);
  };

  const handleCheckboxChange = (checked: boolean | 'indeterminate') => {
    onSelect?.(message.id, !!checked);
  };

  return (
    <div className={`
      group border-b border-border hover:bg-accent/50 transition-colors
      ${!message.isRead ? 'border-l-4 border-l-primary bg-accent/20' : 'border-l-4 border-l-transparent'}
    `}>
      <div className="flex items-start gap-3 p-4">
        {/* Checkbox - separate click area */}
        <div className="flex items-center pt-1">
          <Checkbox
            checked={isSelected}
            onCheckedChange={handleCheckboxChange}
          />
        </div>

        {/* Unread indicator dot */}
        {!message.isRead && (
          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
        )}

        {/* Clickable message content area */}
        <Link to={`/inbox/${message.id}`} className="flex-1 min-w-0 block">
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-1">
              {/* Sender name */}
              <div className="flex items-center gap-2 min-w-0">
                <span className={`truncate text-sm ${!message.isRead ? 'font-semibold text-foreground' : 'font-medium text-foreground'}`}>
                  {message.from}
                </span>
                {message.priority === 'high' && (
                  <AlertTriangle className="h-3 w-3 text-orange-500 flex-shrink-0" />
                )}
              </div>

              {/* Time and source */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <MessageSourceBadge source={message.source} />
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {message.time}
                </span>
              </div>
            </div>

            {/* Subject */}
            <div className="mb-2">
              <span className={`text-sm ${!message.isRead ? 'font-semibold text-foreground' : 'font-normal text-foreground'}`}>
                {message.subject}
              </span>
            </div>

            {/* Preview */}
            <div className="mb-3">
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {message.preview}
              </p>
            </div>

            {/* Actions - only show on hover/mobile */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity md:opacity-100">
              {message.status !== 'issue-created' && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCreateIssue}
                  className="gap-1 text-xs h-7 px-2"
                >
                  <Plus className="h-3 w-3" />
                  Create Issue
                </Button>
              )}

              {/* Issue indicator */}
              {message.relatedIssues && message.relatedIssues.length > 0 && (
                <span className="text-xs text-muted-foreground ml-2">
                  {message.relatedIssues.length} issue{message.relatedIssues.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}


import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Check, 
  X, 
  MessageCircle,
  CheckCircle,
  Plus,
  Eye,
  Archive
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BulkMessageActionsProps {
  selectedMessages: string[];
  onClearSelection: () => void;
  onBulkCreateIssues: (messageIds: string[]) => void;
  onBulkStatusUpdate: (messageIds: string[], status: string) => void;
}

export function BulkMessageActions({
  selectedMessages,
  onClearSelection,
  onBulkCreateIssues,
  onBulkStatusUpdate
}: BulkMessageActionsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleBulkCreateIssues = async () => {
    setIsLoading(true);
    try {
      await onBulkCreateIssues(selectedMessages);
      toast({
        title: "Issues created",
        description: `${selectedMessages.length} issue${selectedMessages.length !== 1 ? 's' : ''} created from selected messages`,
      });
      onClearSelection();
    } catch (error) {
      toast({
        title: "Error creating issues",
        description: "Failed to create issues from selected messages",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (status: string) => {
    setIsLoading(true);
    try {
      await onBulkStatusUpdate(selectedMessages, status);
      toast({
        title: "Status updated",
        description: `${selectedMessages.length} message${selectedMessages.length !== 1 ? 's' : ''} marked as ${status}`,
      });
      onClearSelection();
    } catch (error) {
      toast({
        title: "Error updating status",
        description: "Failed to update message status",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (selectedMessages.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-4 z-10 bg-background border rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Badge variant="default" className="px-3 py-1">
            {selectedMessages.length} selected
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Clear
          </Button>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            onClick={handleBulkCreateIssues}
            disabled={isLoading}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Issues
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleStatusUpdate('read')}
            disabled={isLoading}
            className="gap-2"
          >
            <Eye className="h-4 w-4" />
            Mark as Read
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleStatusUpdate('responded')}
            disabled={isLoading}
            className="gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            Mark as Responded
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleStatusUpdate('resolved')}
            disabled={isLoading}
            className="gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            Mark as Resolved
          </Button>
        </div>
      </div>
    </div>
  );
}

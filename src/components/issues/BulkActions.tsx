
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  X, 
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { addIssueToPriorities } from '@/services/mockData';
import { updateIssue } from '@/services/issueService';

interface BulkActionsProps {
  selectedIssues: string[];
  onClearSelection: () => void;
  onMoveToPriorities: (issueIds: string[]) => void;
  onStatusChange: (issueIds: string[], status: string) => void;
}

export function BulkActions({
  selectedIssues,
  onClearSelection,
  onMoveToPriorities,
  onStatusChange
}: BulkActionsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleMoveToPriorities = async () => {
    setIsLoading(true);
    try {
      await onMoveToPriorities(selectedIssues);
      toast({
        title: "Issues moved to priorities",
        description: `${selectedIssues.length} issue${selectedIssues.length !== 1 ? 's' : ''} moved to priorities board`,
      });
      onClearSelection();
    } catch (error) {
      toast({
        title: "Error moving issues",
        description: "Failed to move issues to priorities board",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (status: string) => {
    setIsLoading(true);
    try {
      // Update each selected issue
      await Promise.all(
        selectedIssues.map(issueId => updateIssue(issueId, { status }))
      );
      
      toast({
        title: "Status updated",
        description: `${selectedIssues.length} issue${selectedIssues.length !== 1 ? 's' : ''} marked as ${status}`,
      });
      onClearSelection();
    } catch (error) {
      toast({
        title: "Error updating status",
        description: "Failed to update issue status",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (selectedIssues.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-4 z-10 bg-background border rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Badge variant="default" className="px-3 py-1">
            {selectedIssues.length} selected
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
        
        <div className="flex items-center gap-2">
          <Button
            onClick={handleMoveToPriorities}
            disabled={isLoading}
            className="gap-2"
          >
            <ArrowRight className="h-4 w-4" />
            Move to Priorities
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleStatusChange('in-progress')}
            disabled={isLoading}
            className="gap-2"
          >
            <Clock className="h-4 w-4" />
            Mark In Progress
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleStatusChange('resolved')}
            disabled={isLoading}
            className="gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            Mark Resolved
          </Button>
        </div>
      </div>
    </div>
  );
}

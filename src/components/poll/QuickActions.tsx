import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar,
  Send,
  TrendingUp,
  StopCircle,
  Edit3,
  Play,
  Trash2,
  FileText,
  Copy
} from 'lucide-react';
import { Poll, getPollStatus } from '@/data/pollData';

interface QuickActionsProps {
  poll: Poll;
}

export default function QuickActions({ poll }: QuickActionsProps) {
  const status = getPollStatus(poll.startDate, poll.endDate);

  const renderActions = () => {
    switch (status) {
      case 'not_started':
        return (
          <>
            <Button variant="outline" size="sm" className="w-full gap-2">
              <Edit3 className="h-4 w-4" />
              Edit Poll
            </Button>
            <Button variant="outline" size="sm" className="w-full gap-2">
              <Play className="h-4 w-4" />
              Start Early
            </Button>
            <Button variant="destructive" size="sm" className="w-full gap-2">
              <Trash2 className="h-4 w-4" />
              Delete Draft
            </Button>
          </>
        );
      
      case 'active':
        return (
          <>
            <Button variant="outline" size="sm" className="w-full gap-2">
              <Send className="h-4 w-4" />
              Send Reminder
            </Button>
            <Button variant="outline" size="sm" className="w-full gap-2">
              <Calendar className="h-4 w-4" />
              Extend Duration
            </Button>
            <Button variant="outline" size="sm" className="w-full gap-2">
              <TrendingUp className="h-4 w-4" />
              Export Data
            </Button>
            <Button variant="destructive" size="sm" className="w-full gap-2">
              <StopCircle className="h-4 w-4" />
              End Early
            </Button>
          </>
        );
      
      case 'completed':
        return (
          <>
            <Button variant="outline" size="sm" className="w-full gap-2">
              <FileText className="h-4 w-4" />
              View Full Report
            </Button>
            <Button variant="outline" size="sm" className="w-full gap-2">
              <TrendingUp className="h-4 w-4" />
              Export Data
            </Button>
            <Button variant="outline" size="sm" className="w-full gap-2">
              <Copy className="h-4 w-4" />
              Create Similar Poll
            </Button>
          </>
        );
      
      default:
        return (
          <Button variant="outline" size="sm" className="w-full gap-2">
            <TrendingUp className="h-4 w-4" />
            Export Data
          </Button>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {renderActions()}
      </CardContent>
    </Card>
  );
}
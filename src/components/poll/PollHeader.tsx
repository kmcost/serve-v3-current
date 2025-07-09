import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Settings,
  StopCircle,
  Send
} from 'lucide-react';
import { Poll } from '@/data/pollData';

interface PollHeaderProps {
  poll: Poll;
}

export default function PollHeader({ poll }: PollHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => navigate('/polls')}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Polls
      </Button>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-bold text-foreground">{poll.title}</h1>
          <Badge variant="default">Active</Badge>
        </div>
        <p className="text-muted-foreground">Created {poll.createdAt} • Ends {poll.endDate}</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <StopCircle className="h-4 w-4" />
          End Early
        </Button>
        <Button size="sm" className="gap-2">
          <Send className="h-4 w-4" />
          Send Reminder
        </Button>
      </div>
    </div>
  );
}
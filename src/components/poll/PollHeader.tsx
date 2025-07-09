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
    <div className="space-y-4">
      {/* Mobile-first header with back button */}
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/polls')}
          className="gap-2 shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back to Polls</span>
        </Button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <Badge variant="default" className="order-first sm:order-last">Active</Badge>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">{poll.title}</h1>
          </div>
          <p className="text-sm text-muted-foreground">Created {poll.createdAt} • Ends {poll.endDate}</p>
        </div>
      </div>

      {/* Action buttons - responsive layout */}
      <div className="flex flex-wrap gap-2 sm:justify-end">
        <Button variant="outline" size="sm" className="gap-2 flex-1 sm:flex-none">
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Settings</span>
        </Button>
        <Button variant="outline" size="sm" className="gap-2 flex-1 sm:flex-none">
          <StopCircle className="h-4 w-4" />
          <span className="hidden sm:inline">End Early</span>
        </Button>
        <Button size="sm" className="gap-2 flex-1 sm:flex-none">
          <Send className="h-4 w-4" />
          <span className="hidden sm:inline">Send Reminder</span>
        </Button>
      </div>
    </div>
  );
}
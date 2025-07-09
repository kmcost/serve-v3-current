import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Settings, StopCircle, Send, Inbox } from 'lucide-react';
import { Poll } from '@/data/pollData';
interface PollHeaderProps {
  poll: Poll;
}
export default function PollHeader({
  poll
}: PollHeaderProps) {
  const navigate = useNavigate();
  return <div className="flex flex-col gap-3">
      <Button variant="ghost" size="sm" onClick={() => navigate('/polls')} className="gap-2 self-start">
        <ArrowLeft className="h-4 w-4" />
        Back to Polls
      </Button>
      
      <Badge variant="default" className="self-start">Active</Badge>
      
      <h1 className="text-2xl font-bold text-foreground">{poll.title}</h1>
      
      <p className="text-muted-foreground">Created {poll.createdAt} • Ends {poll.endDate}</p>
      
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <Send className="h-4 w-4" />
          Send Reminder
        </Button>
        
        <Link to="/inbox">
          <Button variant="outline" size="sm" className="gap-2">
            <Inbox className="h-4 w-4" />
            View all Responses
          </Button>
        </Link>
      </div>
      
    </div>;
}
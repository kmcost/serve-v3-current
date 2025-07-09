import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Settings, StopCircle, Send } from 'lucide-react';
import { Poll } from '@/data/pollData';
import { getPollStatus } from '@/utils/pollUtils';
interface PollHeaderProps {
  poll: Poll;
}
export default function PollHeader({
  poll
}: PollHeaderProps) {
  const navigate = useNavigate();
  const pollStatus = getPollStatus(poll.startDate, poll.endDate);
  
  return <div className="flex flex-col gap-3">
      <Button variant="ghost" size="sm" onClick={() => navigate('/polls')} className="gap-2 self-start">
        <ArrowLeft className="h-4 w-4" />
        Back to Polls
      </Button>
      
      <Badge variant={pollStatus === 'Active' ? 'default' : 'secondary'} className="self-start">{pollStatus}</Badge>
      
      <h1 className="text-2xl font-bold text-foreground">{poll.title}</h1>
      
      <p className="text-muted-foreground">Created {poll.createdAt} • Ends {poll.endDate}</p>
      
      
    </div>;
}
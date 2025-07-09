import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { Poll, getPollStatus } from '@/data/pollData';

interface PollHeaderProps {
  poll: Poll;
}

export default function PollHeader({ poll }: PollHeaderProps) {
  const navigate = useNavigate();
  const status = getPollStatus(poll.startDate, poll.endDate);
  
  const getStatusBadge = () => {
    switch (status) {
      case 'not_started':
        return <Badge variant="outline">Not Started</Badge>;
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'completed':
        return <Badge className="bg-green-600 text-white hover:bg-green-600/80">Completed</Badge>;
      case 'expired':
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <Button variant="ghost" size="sm" onClick={() => navigate('/polls')} className="gap-2 self-start">
        <ArrowLeft className="h-4 w-4" />
        Back to Polls
      </Button>
      
      {getStatusBadge()}
      
      <h1 className="text-2xl font-bold text-foreground">{poll.title}</h1>
      
      <p className="text-muted-foreground">
        Starts {formatDate(poll.startDate)} • Ends {formatDate(poll.endDate)}
      </p>
    </div>
  );
}
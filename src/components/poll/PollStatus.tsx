import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, Users, TrendingUp } from 'lucide-react';
import { Poll, getPollStatus, getDaysLeft } from '@/data/pollData';

interface PollStatusProps {
  poll: Poll;
}

export default function PollStatus({ poll }: PollStatusProps) {
  const status = getPollStatus(poll.startDate, poll.endDate);
  const daysLeft = getDaysLeft(poll.endDate, status);
  const progress = Math.min((poll.responses / poll.expectedResponses) * 100, 100);
  const responseRate = Math.round((poll.responses / poll.expectedResponses) * 100);

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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span>Status</span>
            </div>
            {getStatusBadge()}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Start Date</span>
            </div>
            <p className="text-sm font-medium">{formatDate(poll.startDate)}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>End Date</span>
            </div>
            <p className="text-sm font-medium">{formatDate(poll.endDate)}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Time Left</span>
            </div>
            <p className="text-sm font-medium">{daysLeft}</p>
          </div>
        </div>

        {status !== 'not_started' && (
          <div className="space-y-4 pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-1">
                  <Users className="h-4 w-4" />
                  <span>Responses</span>
                </div>
                <p className="text-2xl font-bold text-primary">{poll.responses}</p>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">Progress</div>
                <p className="text-2xl font-bold text-success">{responseRate}%</p>
              </div>
              
              <div className="text-center sm:col-span-1 col-span-2">
                <div className="text-sm text-muted-foreground mb-1">Expected</div>
                <p className="text-2xl font-bold text-muted-foreground">{poll.expectedResponses}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Response Progress</span>
                <span className="font-medium">{responseRate}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
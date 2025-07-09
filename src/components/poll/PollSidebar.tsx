import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Poll, getPollStatus, getDaysLeft } from '@/data/pollData';

interface PollSidebarProps {
  poll: Poll;
}

export default function PollSidebar({ poll }: PollSidebarProps) {
  const status = getPollStatus(poll.startDate, poll.endDate);
  const daysLeft = getDaysLeft(poll.endDate, status);
  const responseRate = Math.round((poll.responses / poll.expectedResponses) * 100);

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
        <CardTitle className="text-lg">Distribution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Channels</span>
            <span className="text-sm font-medium">{poll.channels.join(', ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Reach</span>
            <span className="text-sm font-medium">{poll.reach}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Response Rate</span>
            <span className="text-sm font-medium text-success">{responseRate}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">End Date</span>
            <span className="text-sm font-medium">{formatDate(poll.endDate)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
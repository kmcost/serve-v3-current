import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Send, TrendingUp, StopCircle, Edit, Play, Copy } from 'lucide-react';
import { Poll } from '@/data/pollData';
import { getPollStatus, calculateTimeLeft } from '@/utils/pollUtils';
import { StatusBadge } from '@/components/ui/status-badge';

interface PollSidebarProps {
  poll: Poll;
}

export default function PollSidebar({
  poll
}: PollSidebarProps) {
  const pollStatus = getPollStatus(poll.startDate, poll.endDate);

  return <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Poll Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <StatusBadge startDate={poll.startDate} endDate={poll.endDate} />
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Start Date</span>
              <span className="text-sm font-medium">{poll.startDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">End Date</span>
              <span className="text-sm font-medium">{poll.endDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Time Left</span>
              <span className="text-sm font-medium">{calculateTimeLeft(poll.endDate)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

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
              <span className="text-sm text-muted-foreground">Potential Reach</span>
              <span className="text-sm font-medium">{poll.reach}</span>
            </div>
            
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {pollStatus === 'Completed' ? (
            <>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <TrendingUp className="h-4 w-4" />
                Export Data
              </Button>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Copy className="h-4 w-4" />
                Duplicate Poll
              </Button>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Play className="h-4 w-4" />
                Create Priority Issue
              </Button>
            </>
          ) : pollStatus === 'Active' ? (
            <>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Calendar className="h-4 w-4" />
                Extend Duration
              </Button>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Send className="h-4 w-4" />
                Send Reminder
              </Button>
              <Button variant="destructive" size="sm" className="w-full gap-2">
                <StopCircle className="h-4 w-4" />
                End Poll Early
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Edit className="h-4 w-4" />
                Edit Poll
              </Button>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Play className="h-4 w-4" />
                Start Poll Early
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>;
}
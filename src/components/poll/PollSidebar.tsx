import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  Send,
  TrendingUp,
  StopCircle
} from 'lucide-react';
import { Poll } from '@/data/pollData';

interface PollSidebarProps {
  poll: Poll;
}

export default function PollSidebar({ poll }: PollSidebarProps) {
  return (
    <div className="space-y-4">
      {/* Mobile: Horizontal cards, Desktop: Vertical cards */}
      <div className="md:space-y-4">
        {/* Poll Status - Most important info first on mobile */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg">Poll Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-3 md:gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Time Left</span>
                <span className="text-sm font-medium">{poll.timeLeft}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">End Date</span>
                <span className="text-sm font-medium">{poll.endDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg">Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-3 md:gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Channels</span>
                <span className="text-sm font-medium text-right">{poll.channels.join(', ')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Reach</span>
                <span className="text-sm font-medium">{poll.reach}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Response Rate</span>
                <span className="text-sm font-medium text-success">{poll.responseRate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
              <Button variant="outline" size="sm" className="gap-2 h-10">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline md:inline">Extend Duration</span>
                <span className="sm:hidden md:hidden">Extend</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2 h-10">
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline md:inline">Send Reminder</span>
                <span className="sm:hidden md:hidden">Remind</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2 h-10">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline md:inline">Export Data</span>
                <span className="sm:hidden md:hidden">Export</span>
              </Button>
              <Button variant="destructive" size="sm" className="gap-2 h-10 md:col-span-1 col-span-2">
                <StopCircle className="h-4 w-4" />
                <span className="hidden sm:inline md:inline">End Poll Early</span>
                <span className="sm:hidden md:hidden">End Poll</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
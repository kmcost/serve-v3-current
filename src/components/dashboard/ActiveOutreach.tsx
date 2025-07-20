
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { pollData } from '@/data/pollData';
import { StatusBadge } from '@/components/ui/status-badge';
import { getPollStatus } from '@/utils/pollUtils';

export function ActiveOutreach() {
  // Filter for only active/in-progress polls, limit to 2 items
  const activePolls = Object.values(pollData).filter(poll => 
    getPollStatus(poll.startDate, poll.endDate) === 'Active'
  ).slice(0, 2); // Reduced from 3 to 2
  
  // Calculate completion percentage
  const calculateProgress = (responses: number) => {
    const expectedResponses = 200; // Default expected responses
    return Math.round((responses / expectedResponses) * 100);
  };

  if (activePolls.length === 0) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Active Outreach</CardTitle>
          <Link 
            to="/polls" 
            className="text-primary hover:text-primary/80 text-sm font-medium"
          >
            View all
          </Link>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">No active polls at the moment</p>
          <Link to="/polls/edit" className="block mt-3">
            <Button variant="outline" className="w-full">
              Create New Poll
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Active Outreach</CardTitle>
        <Link 
          to="/polls" 
          className="text-primary hover:text-primary/80 text-sm font-medium"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activePolls.map((poll) => (
            <div 
              key={poll.id}
              className="space-y-3 p-3 rounded-lg border bg-card"
            >
              {/* Status and Progress Row */}
              <div className="flex items-center justify-between">
                <StatusBadge 
                  startDate={poll.startDate} 
                  endDate={poll.endDate}
                />
                <span className="text-xs text-muted-foreground">
                  {calculateProgress(poll.responses)}% complete
                </span>
              </div>
              
              {/* Poll Title */}
              <div>
                <Link 
                  to={`/polls/${poll.id}`}
                  className="hover:text-primary transition-colors"
                >
                  <h3 className="font-medium text-foreground leading-tight">
                    {poll.question}
                  </h3>
                </Link>
              </div>
              
              {/* Channels */}
              <p className="text-sm text-muted-foreground">
                {poll.channels.join(', ')}
              </p>
              
              {/* View Details Button */}
              <Link to={`/polls/${poll.id}`} className="block">
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

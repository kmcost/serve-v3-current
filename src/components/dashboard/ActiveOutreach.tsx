import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { pollData } from '@/data/pollData';
import { StatusBadge } from '@/components/ui/status-badge';
import { getPollStatus } from '@/utils/pollUtils';

export function ActiveOutreach() {
  // Filter for only active/in-progress polls
  const activePolls = Object.values(pollData).filter(poll => 
    getPollStatus(poll.startDate, poll.endDate) === 'Active'
  ).slice(0, 3); // Show first 3 active polls
  
  // Calculate completion percentage
  const calculateProgress = (responses: number) => {
    const expectedResponses = 200; // Default expected responses
    return Math.round((responses / expectedResponses) * 100);
  };

  return (
    <div className="space-y-4 py-4 px-4 bg-white rounded-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Active Outreach</h2>
        <Link 
          to="/polls" 
          className="text-primary hover:text-primary/80 text-sm font-medium"
        >
          View all
        </Link>
      </div>
      
      <div className="space-y-4">
        {activePolls.map((poll) => (
          <div 
            key={poll.id}
            className="bg-white p-4 rounded-lg border"
          >
            <div className="space-y-3">
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
              <Link 
                to={`/polls/${poll.id}`}
                className="hover:text-primary transition-colors mt-4"
              >
                <h3 className="font-medium text-foreground leading-tight">
                  {poll.question}
                </h3>
              </Link>
              
              {/* Channels */}
              <p className="text-sm text-muted-foreground">
                {poll.channels.join(', ')}
              </p>
              
              {/* View Details Button */}
              <Link to={`/polls/${poll.id}`} className="block">
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';
import { pollData } from '@/data/pollData';
import { StatusBadge } from '@/components/ui/status-badge';

export function ActiveOutreach() {
  // Get active polls (you could filter by status if needed)
  const activePolls = Object.values(pollData).slice(1, 4); // Shows polls 2, 3, 4

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
          <Link 
            key={poll.id}
            to={`/polls/${poll.id}`} 
            className="block bg-white p-4 rounded-lg border hover:bg-gray-50 transition-colors"
          >
            <div className="space-y-3">
              {/* Status and Recipients Row */}
              <div className="flex items-center justify-between">
                <StatusBadge 
                  startDate={poll.startDate} 
                  endDate={poll.endDate}
                />
                <span className="text-xs text-muted-foreground">
                  {poll.reach}
                </span>
              </div>
              
              {/* Poll Title */}
              <h3 className="font-medium text-foreground leading-tight">
                {poll.question}
              </h3>
              
              {/* Channels */}
              <p className="text-sm text-muted-foreground">
                {poll.channels.join(', ')}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
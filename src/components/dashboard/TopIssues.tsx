import { Link } from 'react-router-dom';
import { topIssues } from '@/types/issues';
import { ExternalLink } from 'lucide-react';

export function TopIssues() {
  return (
    <div className="space-y-4 px-4 py-4 bg-white rounded-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Top Issues</h2>
        <Link 
          to="/issues" 
          className="text-primary hover:text-primary/80 text-sm font-medium"
        >
          View All Issues
        </Link>
      </div>
      
      <div className="space-y-3">
        {topIssues.map((issue, index) => (
          <div 
            key={issue.id}
            className="flex items-center justify-between p-4 bg-card rounded-lg border hover:bg-card/80 transition-colors"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                #{index + 1}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate">
                  {issue.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {issue.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 ml-4">
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">
                  {issue.supportPercentage}%
                </p>
                <p className="text-xs text-muted-foreground">support</p>
              </div>
              
              {issue.relatedPollId && (
                <Link 
                  to={`/polls/${issue.relatedPollId}`}
                  className="flex items-center gap-1 text-primary hover:text-primary/80 text-sm font-medium"
                >
                  View Details
                  <ExternalLink className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
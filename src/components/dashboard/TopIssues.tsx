import { Link } from 'react-router-dom';
import { topIssues } from '@/types/issues';
import { ExternalLink } from 'lucide-react';

export function TopIssues() {
  return (
    <div className="space-y-4 px-4 py-4 bg-white rounded-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Top 5 Issues</h2>
        <Link 
          to="/issues" 
          className="text-primary hover:text-primary/80 text-sm font-medium"
        >
          View All Issues
        </Link>
      </div>
      
      <div className="space-y-3">
        {topIssues.map((issue) => (
          <div 
            key={issue.id}
            className="p-4 bg-card rounded-lg border hover:bg-card/80 transition-colors"
          >
            <div className="space-y-3">
              {/* Lead with support percentage */}
              <div className="flex items-center gap-1">
                <span className="text-xl sm:text-2xl font-bold text-primary">
                  {issue.supportPercentage}%
                </span>
                <span className="text-xl sm:text-2xl font-bold text-primary">
                  support
                </span>
              </div>
              
              {/* Title and description */}
              <div>
                <h3 className="font-medium text-foreground leading-tight mb-1">
                  {issue.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {issue.description}
                </p>
              </div>
              
              {/* Full-width button */}
              {issue.relatedPollId && (
                <Link 
                  to={`/polls/${issue.relatedPollId}`}
                  className="w-full flex items-center justify-center gap-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
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
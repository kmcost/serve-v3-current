import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Issue } from '@/types/issues';
import { SupportPercentage } from './SupportPercentage';

interface IssueCardProps {
  issue: Issue;
}

export function IssueCard({ issue }: IssueCardProps) {
  return (
    <div 
      className="p-4 bg-card rounded-lg border hover:bg-card/80 transition-colors"
      role="article"
      aria-labelledby={`issue-title-${issue.id}`}
    >
      <div className="space-y-3">
        <SupportPercentage percentage={issue.supportPercentage} />
        
        <div>
          <h3 
            id={`issue-title-${issue.id}`}
            className="font-medium text-foreground leading-tight mb-1"
          >
            {issue.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {issue.description}
          </p>
        </div>
        
        {issue.relatedPollId && (
          <Link 
            to={`/polls/${issue.relatedPollId}`}
            className="w-full flex items-center justify-center gap-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
            aria-label={`View details for ${issue.title}`}
          >
            View Details
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  );
}
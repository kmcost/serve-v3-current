import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Issue } from '@/types/issues';
import { SupportPercentage } from './SupportPercentage';
import { DESIGN_TOKENS, TRANSITIONS, PERFORMANCE_CONFIG } from './styles';

interface IssueCardProps {
  issue: Issue;
}

export const IssueCard = React.memo(function IssueCard({ issue }: IssueCardProps) {
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    // Enhanced keyboard navigation - Enter/Space to focus first interactive element
    if (event.key === 'Enter' || event.key === ' ') {
      const link = event.currentTarget.querySelector('a');
      if (link) {
        event.preventDefault();
        link.focus();
      }
    }
  }, []);

  return (
    <div 
      className={`${DESIGN_TOKENS.layout.card} ${TRANSITIONS.hover} ${TRANSITIONS.focus}`}
      role="article"
      aria-labelledby={`issue-title-${issue.id}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className={DESIGN_TOKENS.spacing.card}>
        <SupportPercentage percentage={issue.supportPercentage} />
        
        <div>
          <h3 
            id={`issue-title-${issue.id}`}
            className={`${DESIGN_TOKENS.typography.subtitle} mb-1`}
          >
            {issue.title}
          </h3>
          <p className={DESIGN_TOKENS.typography.description}>
            {issue.description}
          </p>
        </div>
        
        {issue.relatedPollId && (
          <Link 
            to={`/polls/${issue.relatedPollId}`}
            className={`${DESIGN_TOKENS.interactive.button} ${TRANSITIONS.focus}`}
            aria-label={`View details for ${issue.title}`}
          >
            View Details
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  );
}, PERFORMANCE_CONFIG.issueComparison);
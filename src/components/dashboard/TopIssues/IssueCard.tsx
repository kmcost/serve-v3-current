import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Issue } from '@/types/issues';
import { SupportPercentage } from './SupportPercentage';
import { DESIGN_TOKENS, TRANSITIONS, PERFORMANCE_CONFIG } from './styles';
import { t, I18N_KEYS, getAriaLabel } from './i18n';

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
        <div>
          <h3 
            id={`issue-title-${issue.id}`}
            className={`${DESIGN_TOKENS.typography.subtitle} mb-2`}
          >
            {issue.title}
          </h3>
          <SupportPercentage percentage={issue.supportPercentage} />
          <p className={`${DESIGN_TOKENS.typography.description} mt-2`}>
            {issue.description}
          </p>
        </div>
        
        {issue.relatedPollId && (
          <Link 
            to={`/polls/${issue.relatedPollId}`}
            className="block mt-4"
          >
            <Button variant="outline" className="w-full">
              {t(I18N_KEYS.VIEW_DETAILS_BUTTON)}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}, PERFORMANCE_CONFIG.issueComparison);
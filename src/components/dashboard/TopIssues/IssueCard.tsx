import React from 'react';
import { Link } from 'react-router-dom';
import { Issue } from '@/types/issues';
import { SupportPercentage } from './SupportPercentage';
import { DESIGN_TOKENS, TRANSITIONS, PERFORMANCE_CONFIG } from './styles';

interface IssueCardProps {
  issue: Issue;
}

export const IssueCard = React.memo(function IssueCard({ issue }: IssueCardProps) {
  if (!issue.relatedPollId) {
    return (
      <div 
        className={`${DESIGN_TOKENS.layout.card}`}
        role="article"
        aria-labelledby={`issue-title-${issue.id}`}
      >
        <div className={DESIGN_TOKENS.spacing.card}>
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
      </div>
    );
  }

  return (
    <Link 
      to={`/polls/${issue.relatedPollId}`}
      className={`block ${DESIGN_TOKENS.layout.card} ${TRANSITIONS.hover} hover:shadow-sm transition-shadow cursor-pointer`}
      role="article"
      aria-labelledby={`issue-title-${issue.id}`}
    >
      <div className={DESIGN_TOKENS.spacing.card}>
        <h3 
          id={`issue-title-${issue.id}`}
          className="text-blue-500 hover:text-blue-600 font-medium mb-2 transition-colors"
        >
          {issue.title}
        </h3>
        <SupportPercentage percentage={issue.supportPercentage} />
        <p className={`${DESIGN_TOKENS.typography.description} mt-2`}>
          {issue.description}
        </p>
      </div>
    </Link>
  );
}, PERFORMANCE_CONFIG.issueComparison);
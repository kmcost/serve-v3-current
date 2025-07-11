import React, { useMemo } from 'react';
import { topIssues, Issue, validateIssues } from '@/types/issues';
import { IssueCard } from './IssueCard';
import { IssueHeader } from './IssueHeader';
import { DESIGN_TOKENS, getSkeletonClasses, getErrorClasses, getEmptyStateClasses } from './styles';

interface TopIssuesProps {
  issues?: Issue[];
  loading?: boolean;
  error?: string | null;
}

export const TopIssues = React.memo(function TopIssues({ 
  issues = topIssues, 
  loading = false, 
  error = null 
}: TopIssuesProps) {
  // Memoize validated issues for performance
  const validatedIssues = useMemo(() => {
    if (!issues) return [];
    return validateIssues(issues).slice(0, 5); // Ensure max 5 issues
  }, [issues]);

  // Memoize loading skeleton to prevent unnecessary re-renders
  const loadingSkeleton = useMemo(() => (
    Array.from({ length: 5 }, (_, index) => (
      <div 
        key={`skeleton-${index}`}
        className={`${DESIGN_TOKENS.layout.card} ${DESIGN_TOKENS.states.loading}`}
        aria-hidden="true"
      >
        <div className={DESIGN_TOKENS.spacing.card}>
          <div className={getSkeletonClasses('w-32')}></div>
          <div className={getSkeletonClasses('w-3/4')}></div>
          <div className={getSkeletonClasses('w-full')}></div>
          <div className={getSkeletonClasses('w-full')} style={{ height: '2rem' }}></div>
        </div>
      </div>
    ))
  ), []);

  if (loading) {
    return (
      <section 
        className={`${DESIGN_TOKENS.spacing.component} ${DESIGN_TOKENS.spacing.header} ${DESIGN_TOKENS.layout.container}`}
        aria-live="polite"
        aria-busy="true"
        aria-label="Loading top issues"
      >
        <IssueHeader />
        <div className={DESIGN_TOKENS.layout.cardGrid}>
          {loadingSkeleton}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section 
        className={`${DESIGN_TOKENS.spacing.component} ${DESIGN_TOKENS.spacing.header} ${DESIGN_TOKENS.layout.container}`}
        aria-live="assertive"
      >
        <IssueHeader />
        <div 
          className={getErrorClasses()}
          role="alert"
        >
          <p className="text-sm font-medium">Error loading issues</p>
          <p className="text-xs mt-1">{error}</p>
        </div>
      </section>
    );
  }

  if (validatedIssues.length === 0) {
    return (
      <section 
        className={`${DESIGN_TOKENS.spacing.component} ${DESIGN_TOKENS.spacing.header} ${DESIGN_TOKENS.layout.container}`}
        aria-live="polite"
      >
        <IssueHeader />
        <div className={getEmptyStateClasses()}>
          <p className="text-sm">No issues available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      className={`${DESIGN_TOKENS.spacing.component} ${DESIGN_TOKENS.spacing.header} ${DESIGN_TOKENS.layout.container}`}
      aria-labelledby="top-issues-heading"
    >
      <IssueHeader />
      
      <div 
        className={DESIGN_TOKENS.layout.cardGrid}
        role="list"
        aria-label="Top community issues by support percentage"
        aria-live="polite"
      >
        {validatedIssues.map((issue, index) => (
          <div 
            key={issue.id} 
            role="listitem"
            aria-posinset={index + 1}
            aria-setsize={validatedIssues.length}
          >
            <IssueCard issue={issue} />
          </div>
        ))}
      </div>
    </section>
  );
});
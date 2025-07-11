import React from 'react';
import { topIssues, Issue } from '@/types/issues';
import { IssueCard } from './IssueCard';
import { IssueHeader } from './IssueHeader';

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
  if (loading) {
    return (
      <div className="space-y-4 px-4 py-4 bg-white rounded-xl">
        <IssueHeader />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div 
              key={index} 
              className="p-4 bg-card rounded-lg border animate-pulse"
              aria-hidden="true"
            >
              <div className="space-y-3">
                <div className="h-6 bg-muted rounded w-32"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-full"></div>
                <div className="h-8 bg-muted rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4 px-4 py-4 bg-white rounded-xl">
        <IssueHeader />
        <div 
          className="p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20"
          role="alert"
        >
          <p className="text-sm font-medium">Error loading issues</p>
          <p className="text-xs mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!issues || issues.length === 0) {
    return (
      <div className="space-y-4 px-4 py-4 bg-white rounded-xl">
        <IssueHeader />
        <div className="p-8 text-center text-muted-foreground">
          <p className="text-sm">No issues available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 px-4 py-4 bg-white rounded-xl">
      <IssueHeader />
      
      <div 
        className="space-y-3"
        role="list"
        aria-label="Top community issues by support percentage"
      >
        {issues.map((issue) => (
          <div key={issue.id} role="listitem">
            <IssueCard issue={issue} />
          </div>
        ))}
      </div>
    </div>
  );
});
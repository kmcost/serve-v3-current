// Re-export the refactored component for backward compatibility with error boundary
import React from 'react';
import { TopIssues as TopIssuesComponent } from './TopIssues/TopIssues';
import { TopIssuesErrorBoundary } from './TopIssues/ErrorBoundary';

interface TopIssuesWrapperProps {
  issues?: any[];
  loading?: boolean;
  error?: string | null;
}

export function TopIssues(props: TopIssuesWrapperProps) {
  return (
    <TopIssuesErrorBoundary>
      <TopIssuesComponent {...props} />
    </TopIssuesErrorBoundary>
  );
}

// Also export the unwrapped component for advanced use cases
export { TopIssues as TopIssuesComponent } from './TopIssues/TopIssues';
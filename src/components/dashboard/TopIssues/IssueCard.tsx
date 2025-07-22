
import React from 'react';
import { Issue } from '@/types/issues';
import { UnifiedIssueCard } from '@/components/shared/UnifiedIssueCard';

interface IssueCardProps {
  issue: Issue;
}

export const IssueCard = React.memo(function IssueCard({ issue }: IssueCardProps) {
  return (
    <UnifiedIssueCard
      issue={issue}
      variant="dashboard"
    />
  );
});

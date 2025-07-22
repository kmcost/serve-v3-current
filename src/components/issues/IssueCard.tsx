
import { UnifiedIssueCard } from '@/components/shared/UnifiedIssueCard';
import { ConstituentIssue } from '@/types/core';

interface IssueCardProps {
  issue: ConstituentIssue;
  isSelected?: boolean;
  onSelect?: (issueId: string, selected: boolean) => void;
  onMoveToPriorities?: (issueId: string) => void;
  showCheckbox?: boolean;
}

export function IssueCard({ 
  issue, 
  isSelected = false, 
  onSelect, 
  onMoveToPriorities,
  showCheckbox = false 
}: IssueCardProps) {
  return (
    <UnifiedIssueCard
      issue={issue}
      variant="issues"
      isSelected={isSelected}
      onSelect={onSelect}
      onMoveToPriorities={onMoveToPriorities}
      showCheckbox={showCheckbox}
    />
  );
}

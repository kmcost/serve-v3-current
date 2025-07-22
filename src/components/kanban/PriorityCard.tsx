
import { UnifiedIssueCard } from '@/components/shared/UnifiedIssueCard';
import { PriorityItem } from '@/types/core';

interface PriorityCardProps {
  item: PriorityItem;
  isDragging?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
}

export function PriorityCard({ item, isDragging, onDragStart, onDragEnd }: PriorityCardProps) {
  return (
    <UnifiedIssueCard
      issue={item}
      variant="priorities"
      isDragging={isDragging}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    />
  );
}

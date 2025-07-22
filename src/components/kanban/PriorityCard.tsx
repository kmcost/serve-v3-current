
import { PriorityItem } from '@/types/core';
import { IssueCard } from '@/components/issues/IssueCard';
import { ConstituentIssue } from '@/types/core';

interface PriorityCardProps {
  item: PriorityItem;
  isDragging?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
}

export function PriorityCard({ item, isDragging, onDragStart, onDragEnd }: PriorityCardProps) {
  // Transform PriorityItem to ConstituentIssue format for IssueCard compatibility
  const transformedIssue: ConstituentIssue = {
    id: item.id,
    title: item.title,
    description: item.description,
    priority: item.priority,
    status: item.boardStatus === 'completed' ? 'resolved' : 
            item.boardStatus === 'in-progress' ? 'in-progress' : 'new',
    type: item.type,
    createdAt: item.addedToBoardAt,
    timeframe: item.estimatedDuration,
    supportPercentage: item.supportPercentage,
    mentions: 0, // Default for non-trending items
    constituent: item.assignee ? {
      id: '1',
      name: item.assignee,
      email: '',
      location: '',
      demographics: {}
    } : undefined
  };

  return (
    <div 
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`cursor-move select-none transition-all ${isDragging ? 'opacity-50 transform rotate-2 shadow-lg' : ''}`}
    >
      <IssueCard 
        issue={transformedIssue}
        variant="dashboard"
        showCheckbox={false}
      />
    </div>
  );
}

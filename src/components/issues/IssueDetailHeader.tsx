
import { ArrowLeft, Calendar, MapPin, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ConstituentIssue, PriorityItem } from '@/types/core';
import { formatRelativeTime } from '@/utils/dateUtils';

interface IssueDetailHeaderProps {
  issue: ConstituentIssue | PriorityItem;
  onBack: () => void;
}

const statusConfig = {
  'in-progress': { label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  'resolved': { label: 'Resolved', color: 'bg-green-100 text-green-800' },
  'validated': { label: 'Validated', color: 'bg-purple-100 text-purple-800' }
};

const priorityConfig = {
  'high': { label: 'High', color: 'bg-red-100 text-red-800' },
  'medium': { label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  'low': { label: 'Low', color: 'bg-green-100 text-green-800' }
};

export function IssueDetailHeader({ issue, onBack }: IssueDetailHeaderProps) {
  const statusInfo = issue.status ? statusConfig[issue.status as keyof typeof statusConfig] : null;
  const priorityInfo = issue.priority ? priorityConfig[issue.priority as keyof typeof priorityConfig] : null;

  return (
    <div className="border-b border-border pb-6">
      <div className="flex items-center gap-4 mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Badge variant="outline" className="font-mono text-xs">
          {issue.uniqueId}
        </Badge>
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-foreground">
          {issue.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Created {formatRelativeTime(issue.createdAt)}</span>
          </div>
          
          {issue.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{issue.location}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {statusInfo && (
            <Badge className={statusInfo.color}>
              {statusInfo.label}
            </Badge>
          )}
          
          {priorityInfo && (
            <Badge className={priorityInfo.color}>
              {priorityInfo.label} Priority
            </Badge>
          )}
          
          {issue.tags.map((tag) => (
            <Badge key={tag} className="gap-1 bg-white text-gray-700 border border-gray-300">
              <Tag className="h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

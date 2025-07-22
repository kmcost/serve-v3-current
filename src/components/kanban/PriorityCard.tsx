
import { PriorityItem } from '@/types/core';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  MessageSquare, 
  Users, 
  Clock,
  User,
  ExternalLink
} from 'lucide-react';
import { formatRelativeTime } from '@/utils/dateUtils';

interface PriorityCardProps {
  item: PriorityItem;
  isDragging?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
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

export function PriorityCard({ item, isDragging, onDragStart, onDragEnd }: PriorityCardProps) {
  const statusInfo = item.status ? statusConfig[item.status as keyof typeof statusConfig] : null;
  const priorityInfo = item.priority ? priorityConfig[item.priority as keyof typeof priorityConfig] : null;

  return (
    <div 
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`cursor-move select-none transition-all ${isDragging ? 'opacity-50 transform rotate-2 shadow-lg' : ''}`}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-semibold line-clamp-2">
              {item.title}
            </CardTitle>
            <Button 
              asChild
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Link to={`/issues/${item.id}`}>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {statusInfo && (
              <Badge className={`${statusInfo.color} text-xs`}>
                {statusInfo.label}
              </Badge>
            )}
            {priorityInfo && (
              <Badge className={`${priorityInfo.color} text-xs`}>
                {priorityInfo.label} Priority
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {item.description}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatRelativeTime(item.addedToBoardAt)}</span>
            </div>
            
            {item.type === 'trending' && item.mentions && (
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{item.mentions} mentions</span>
              </div>
            )}
            
            {item.type === 'community' && item.supportPercentage && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{item.supportPercentage}% support</span>
              </div>
            )}
          </div>
          
          {item.assignee && (
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Assigned to:</span>
              <span className="font-medium">{item.assignee}</span>
            </div>
          )}
          
          {item.estimatedDuration && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Duration:</span>
              <span className="font-medium">{item.estimatedDuration}</span>
            </div>
          )}
          
          <Button 
            asChild
            variant="outline"
            size="sm"
            className="w-full"
          >
            <Link to={`/issues/${item.id}`}>
              View Details
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}


import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  GripVertical, 
  User, 
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  MessageSquare
} from 'lucide-react';
import { PriorityItem } from '@/types/core';
import { cn } from '@/lib/utils';

interface PriorityCardProps {
  item: PriorityItem;
  isDragging?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
}

export function PriorityCard({ item, isDragging, onDragStart, onDragEnd }: PriorityCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'community': return <Users className="h-4 w-4" />;
      case 'individual': return <User className="h-4 w-4" />;
      case 'trending': return <AlertTriangle className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card 
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={cn(
        "cursor-move select-none transition-all hover:shadow-md",
        isDragging && "opacity-50 transform rotate-2 shadow-lg"
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start gap-2">
          <GripVertical className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {getTypeIcon(item.type)}
              <Badge 
                variant="outline" 
                className={cn("text-xs", getPriorityColor(item.priority))}
              >
                {item.priority}
              </Badge>
              {item.boardStatus === 'completed' && (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
            </div>
            <CardTitle className="text-sm font-medium line-clamp-2">
              {item.title}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {item.description}
        </p>
        
        {/* Key metrics */}
        <div className="space-y-2 mb-3">
          {item.supportPercentage && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{item.supportPercentage}% support</span>
            </div>
          )}
          
          {item.assignee && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <User className="h-3 w-3" />
              <span>{item.assignee}</span>
            </div>
          )}
          
          {item.estimatedDuration && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{item.estimatedDuration}</span>
            </div>
          )}
        </div>
        
        {/* Dates */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Added {formatDate(item.addedToBoardAt)}</span>
          </div>
          {item.completedAt && (
            <div className="text-green-600">
              ✓ {formatDate(item.completedAt)}
            </div>
          )}
        </div>
        
        {/* Public notes - expandable */}
        {item.publicNotes && (
          <div className="mt-3 pt-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-auto p-0 text-xs text-blue-600 hover:text-blue-800"
            >
              {isExpanded ? 'Hide' : 'Show'} public notes
            </Button>
            {isExpanded && (
              <p className="text-xs text-muted-foreground mt-2 p-2 bg-blue-50 rounded">
                {item.publicNotes}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Calendar, 
  MessageSquare, 
  Users, 
  ChevronDown, 
  ChevronUp,
  ArrowRight,
  GripVertical,
  User,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { ConstituentIssue, PriorityItem } from '@/types/core';
import { Issue } from '@/types/issues';
import { getRelatedIssues } from '@/services/mockData';
import { cn } from '@/lib/utils';

type UnifiedIssueData = ConstituentIssue | Issue | PriorityItem;

interface UnifiedIssueCardProps {
  issue: UnifiedIssueData;
  variant: 'issues' | 'dashboard' | 'priorities';
  isSelected?: boolean;
  onSelect?: (issueId: string | number, selected: boolean) => void;
  onMoveToPriorities?: (issueId: string | number) => void;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  showCheckbox?: boolean;
  isDragging?: boolean;
}

const statusConfig = {
  'new': { label: 'New', color: 'bg-yellow-100 text-yellow-800' },
  'in-progress': { label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  'resolved': { label: 'Resolved', color: 'bg-green-100 text-green-800' },
  'validated': { label: 'Validated', color: 'bg-purple-100 text-purple-800' }
};

const priorityConfig = {
  'high': { label: 'High', color: 'bg-red-100 text-red-800' },
  'medium': { label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  'low': { label: 'Low', color: 'bg-green-100 text-green-800' }
};

export function UnifiedIssueCard({ 
  issue, 
  variant,
  isSelected = false, 
  onSelect, 
  onMoveToPriorities,
  onDragStart,
  onDragEnd,
  showCheckbox = false,
  isDragging = false
}: UnifiedIssueCardProps) {
  const [showRelated, setShowRelated] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Type guards to safely access properties
  const isConstituentIssue = (item: UnifiedIssueData): item is ConstituentIssue => 
    'status' in item && 'priority' in item && 'type' in item;
  
  const isPriorityItem = (item: UnifiedIssueData): item is PriorityItem =>
    'boardStatus' in item;
  
  const isBasicIssue = (item: UnifiedIssueData): item is Issue =>
    'supportPercentage' in item && !('status' in item);

  // Safe property access
  const statusInfo = isConstituentIssue(issue) ? statusConfig[issue.status as keyof typeof statusConfig] : null;
  const priorityInfo = isConstituentIssue(issue) ? priorityConfig[issue.priority as keyof typeof priorityConfig] : null;
  const supportPercentage = isBasicIssue(issue) ? issue.supportPercentage : 
                           isConstituentIssue(issue) ? issue.supportPercentage : undefined;
  const mentions = isConstituentIssue(issue) ? issue.mentions : undefined;
  const constituent = isConstituentIssue(issue) ? issue.constituent : undefined;
  const timeframe = isConstituentIssue(issue) ? issue.timeframe : undefined;
  const issueType = isConstituentIssue(issue) ? issue.type : undefined;
  
  // Priority-specific fields
  const assignee = isPriorityItem(issue) ? issue.assignee : undefined;
  const estimatedDuration = isPriorityItem(issue) ? issue.estimatedDuration : undefined;
  const publicNotes = isPriorityItem(issue) ? issue.publicNotes : undefined;
  const addedToBoardAt = isPriorityItem(issue) ? issue.addedToBoardAt : undefined;
  const completedAt = isPriorityItem(issue) ? issue.completedAt : undefined;
  const boardStatus = isPriorityItem(issue) ? issue.boardStatus : undefined;
  
  // Related issues - only for ConstituentIssue types
  const relatedIssues = isConstituentIssue(issue) ? getRelatedIssues(issue.id) : [];
  const hasRelatedIssues = relatedIssues.length > 0;

  const handleSelect = (checked: boolean) => {
    onSelect?.(issue.id, checked);
  };

  const handleMoveToPriorities = () => {
    onMoveToPriorities?.(issue.id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case 'community': return <Users className="h-4 w-4" />;
      case 'individual': return <User className="h-4 w-4" />;
      case 'trending': return <AlertTriangle className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Priorities variant - compact mobile-style layout
  if (variant === 'priorities') {
    return (
      <Card 
        draggable={true}
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
                {getTypeIcon(issueType)}
                {priorityInfo && (
                  <Badge 
                    variant="outline" 
                    className={cn("text-xs", getPriorityColor(isConstituentIssue(issue) ? issue.priority : 'low'))}
                  >
                    {isConstituentIssue(issue) ? issue.priority : 'low'}
                  </Badge>
                )}
                {boardStatus === 'completed' && (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
              </div>
              <CardTitle className="text-sm font-medium line-clamp-2">
                {issue.title}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
            {issue.description}
          </p>
          
          {/* Key metrics */}
          <div className="space-y-2 mb-3">
            {supportPercentage && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                <span>{supportPercentage}% support</span>
              </div>
            )}
            
            {assignee && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <User className="h-3 w-3" />
                <span>{assignee}</span>
              </div>
            )}
            
            {estimatedDuration && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{estimatedDuration}</span>
              </div>
            )}
          </div>
          
          {/* Dates */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
            {addedToBoardAt && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Added {formatDate(addedToBoardAt)}</span>
              </div>
            )}
            {completedAt && (
              <div className="text-green-600">
                ✓ {formatDate(completedAt)}
              </div>
            )}
          </div>
          
          {/* Public notes - expandable */}
          {publicNotes && (
            <div className="pt-2 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-auto p-0 text-xs text-blue-600 hover:text-blue-800 mb-2"
              >
                {isExpanded ? 'Hide' : 'Show'} public notes
              </Button>
              {isExpanded && (
                <p className="text-xs text-muted-foreground p-2 bg-blue-50 rounded">
                  {publicNotes}
                </p>
              )}
            </div>
          )}

          {/* View Details button at bottom for priorities */}
          <div className="mt-3 pt-2 border-t">
            <Link to={`/issues/${issue.id}`}>
              <Button variant="outline" size="sm" className="w-full">
                View Details
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default layout for issues and dashboard variants
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          {showCheckbox && (
            <Checkbox
              checked={isSelected}
              onCheckedChange={handleSelect}
              className="mt-1"
            />
          )}
          
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2 mb-2">
              <CardTitle className="text-lg font-semibold line-clamp-2">
                <Link 
                  to={`/issues/${issue.id}`} 
                  className="hover:text-blue-600 transition-colors"
                >
                  {issue.title}
                </Link>
              </CardTitle>
              
              {/* Move to Priorities button in top right for issues variant */}
              {variant === 'issues' && onMoveToPriorities && (
                <div className="flex-shrink-0">
                  <Button 
                    onClick={handleMoveToPriorities}
                    size="sm"
                    className="gap-2 sm:flex hidden"
                  >
                    <ArrowRight className="h-4 w-4" />
                    Move to Priorities
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-2">
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
            
            <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
              {issue.description}
            </p>
            
            {constituent && (
              <div className="text-sm text-muted-foreground mb-2">
                <strong>From:</strong> {constituent.name}
                {constituent.email && (
                  <span className="ml-2">({constituent.email})</span>
                )}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>
              {timeframe || (isConstituentIssue(issue) ? new Date(issue.createdAt).toLocaleDateString() : 'N/A')}
            </span>
          </div>
          
          {mentions && (
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{mentions} mentions</span>
            </div>
          )}
          
          {supportPercentage && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{supportPercentage}% support</span>
            </div>
          )}
        </div>
        
        {hasRelatedIssues && (
          <div className="border-t pt-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowRelated(!showRelated)}
              className="gap-2 p-0 h-auto font-normal text-sm"
            >
              {showRelated ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              {relatedIssues.length} related issue{relatedIssues.length !== 1 ? 's' : ''}
            </Button>
            
            {showRelated && (
              <div className="mt-2 space-y-2">
                {relatedIssues.map((relatedIssue) => (
                  <div key={relatedIssue.id} className="text-sm bg-muted/50 p-2 rounded">
                    <div className="font-medium">{relatedIssue.title}</div>
                    <div className="text-muted-foreground line-clamp-2">
                      {relatedIssue.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Button section */}
        <div className="flex justify-between items-center pt-2">
          {variant === 'dashboard' ? (
            <div className="w-full flex justify-end">
              <Link to={`/issues/${issue.id}`}>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </Link>
            </div>
          ) : variant === 'issues' ? (
            <>
              <div></div> {/* Empty div for spacing */}
              {/* Mobile button - shown below sm breakpoint */}
              <div className="sm:hidden w-full">
                <Button 
                  onClick={handleMoveToPriorities}
                  size="sm"
                  className="gap-2 w-full"
                >
                  <ArrowRight className="h-4 w-4" />
                  Move to Priorities
                </Button>
              </div>
            </>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { differenceInDays, parseISO } from 'date-fns';
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
  ArrowRight
} from 'lucide-react';
import { ConstituentIssue } from '@/types/core';
import { getRelatedIssues } from '@/services/mockData';
import { formatRelativeTime } from '@/utils/dateUtils';
import { cn } from '@/lib/utils';

interface IssueCardProps {
  issue: ConstituentIssue;
  isSelected?: boolean;
  onSelect?: (issueId: string, selected: boolean) => void;
  onMoveToPriorities?: (issueId: string) => void;
  showCheckbox?: boolean;
  variant?: 'issues' | 'dashboard';
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

// Helper function to determine if issue is new (< 7 days old)
const isNewIssue = (createdAt: string): boolean => {
  const issueDate = parseISO(createdAt);
  const daysDifference = differenceInDays(new Date(), issueDate);
  return daysDifference < 7;
};

export function IssueCard({ 
  issue, 
  isSelected = false, 
  onSelect, 
  onMoveToPriorities,
  showCheckbox = false,
  variant = 'issues'
}: IssueCardProps) {
  const [showRelated, setShowRelated] = useState(false);
  
  const statusInfo = issue.status ? statusConfig[issue.status as keyof typeof statusConfig] : null;
  const priorityInfo = issue.priority ? priorityConfig[issue.priority as keyof typeof priorityConfig] : null;
  const isAIDetected = issue.source === 'ai-detected';
  const isNew = isNewIssue(issue.createdAt);
  
  const relatedIssues = getRelatedIssues(issue.id);
  const hasRelatedIssues = relatedIssues.length > 0;

  const handleSelect = (checked: boolean) => {
    onSelect?.(issue.id, checked);
  };

  const handleMoveToPriorities = () => {
    onMoveToPriorities?.(issue.id);
  };

  return (
    <Card className={cn("relative", variant !== 'dashboard' && "hover:shadow-md transition-shadow")}>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          {showCheckbox && (
            <Checkbox
              checked={isSelected}
              onCheckedChange={handleSelect}
              className="mt-1"
            />
          )}
          
          <div className="flex-1 pr-4 md:pr-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <Link to={`/issues/${issue.id}`} className="flex-1">
                <CardTitle className="text-lg font-semibold line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                  {issue.title}
                </CardTitle>
              </Link>
            </div>
            
            {variant !== 'dashboard' && (
              <div className="flex flex-wrap gap-2 mb-2">
                {isAIDetected && (
                  <Badge className="bg-orange-100 text-orange-800 text-xs">
                    AI Detected
                  </Badge>
                )}
                {statusInfo && (
                  <Badge className={`${statusInfo.color} text-xs`}>
                    {statusInfo.label}
                  </Badge>
                )}
                {/* Only show priority badge if issue is NOT new (>= 7 days old) */}
                {!isNew && priorityInfo && (
                  <Badge className={`${priorityInfo.color} text-xs`}>
                    {priorityInfo.label} Priority
                  </Badge>
                )}
              </div>
            )}
            
            <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
              {issue.description}
            </p>
            
            {issue.constituent && (
              <div className="text-sm text-muted-foreground mb-2">
                <strong>From:</strong> {issue.constituent.name}
                {issue.constituent.email && (
                  <span className="ml-2">({issue.constituent.email})</span>
                )}
              </div>
            )}
          </div>
          
          {/* Desktop: Button in top-right corner (only for issues variant) */}
          {variant === 'issues' && (
            <div className="hidden md:block absolute top-4 right-4">
              <Button 
                asChild
                variant="outline"
                size="sm"
              >
                <Link to={`/issues/${issue.id}`}>
                  View Details
                </Link>
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {variant !== 'dashboard' && (
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>
                {formatRelativeTime(issue.createdAt)}
              </span>
            </div>
            
            {issue.type === 'trending' && issue.mentions && (
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{issue.mentions} mentions</span>
              </div>
            )}
            
            {issue.type === 'community' && issue.supportPercentage && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{issue.supportPercentage}% support</span>
              </div>
            )}
          </div>
        )}
        
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
        
        {/* Bottom button: Always shown for dashboard variant, mobile-only for issues variant */}
        <div className={variant === 'dashboard' ? 'pt-2' : 'md:hidden pt-2'}>
          {variant === 'dashboard' ? (
            <Button 
              asChild
              variant="outline"
              size="sm"
              className="w-full"
            >
              <Link to={`/issues/${issue.id}`}>
                Take Action
              </Link>
            </Button>
          ) : (
            <Button 
              asChild
              variant="outline"
              size="sm"
              className="w-full"
            >
              <Link to={`/issues/${issue.id}`}>
                View Details
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

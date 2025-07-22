
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  ArrowRight, 
  User, 
  Clock, 
  CheckCircle,
  Mail,
  Phone,
  Users,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { ConstituentIssue, PriorityItem } from '@/types/core';

interface IssueDetailActionsProps {
  issue: ConstituentIssue | PriorityItem;
  onMoveToPriorities?: () => void;
  onUpdateStatus?: (status: string) => void;
}

export function IssueDetailActions({ 
  issue, 
  onMoveToPriorities, 
  onUpdateStatus 
}: IssueDetailActionsProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  
  const isPriorityItem = 'boardStatus' in issue;
  
  const handleStatusUpdate = async (status: string) => {
    setIsUpdating(true);
    await onUpdateStatus?.(status);
    setIsUpdating(false);
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {!isPriorityItem && (
            <Button 
              onClick={onMoveToPriorities}
              className="w-full gap-2"
              variant="default"
            >
              <ArrowRight className="h-4 w-4" />
              Move to Priorities
            </Button>
          )}
          
          {isPriorityItem && (
            <div className="space-y-2">
              <Button 
                onClick={() => handleStatusUpdate('in-progress')}
                className="w-full gap-2"
                variant="outline"
                disabled={isUpdating}
              >
                <Clock className="h-4 w-4" />
                Mark In Progress
              </Button>
              <Button 
                onClick={() => handleStatusUpdate('completed')}
                className="w-full gap-2"
                variant="outline"
                disabled={isUpdating}
              >
                <CheckCircle className="h-4 w-4" />
                Mark Completed
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Issue Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Issue Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Type:</span>
              <div className="font-medium capitalize">{issue.type}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Source:</span>
              <div className="font-medium capitalize">{issue.source}</div>
            </div>
          </div>

          {issue.assignedTo && (
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Assigned to</div>
                <div className="text-sm text-muted-foreground">{issue.assignedTo}</div>
              </div>
            </div>
          )}

          {issue.estimatedResolution && (
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Estimated Resolution</div>
                <div className="text-sm text-muted-foreground">{issue.estimatedResolution}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Constituent Info (for individual issues) */}
      {issue.constituent && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Constituent Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="font-medium">{issue.constituent.name}</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                {issue.constituent.email}
              </div>
              {issue.constituent.phone && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {issue.constituent.phone}
                </div>
              )}
            </div>
            <Button variant="outline" size="sm" className="w-full gap-2">
              <MessageSquare className="h-4 w-4" />
              Contact Constituent
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Community Metrics (for community issues) */}
      {issue.type === 'community' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Community Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {issue.supportPercentage && (
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Support Level</div>
                  <div className="text-sm text-muted-foreground">{issue.supportPercentage}%</div>
                </div>
              </div>
            )}
            <Button variant="outline" size="sm" className="w-full gap-2">
              <BarChart3 className="h-4 w-4" />
              View Poll Data
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Trending Metrics (for trending issues) */}
      {issue.type === 'trending' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Trending Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {issue.mentions && (
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Mentions</div>
                  <div className="text-sm text-muted-foreground">{issue.mentions} mentions</div>
                </div>
              </div>
            )}
            {issue.timeframe && (
              <div className="text-sm text-muted-foreground">
                Active {issue.timeframe}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Internal Notes */}
      {issue.internalNotes && issue.internalNotes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Internal Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {issue.internalNotes.map((note, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm">{note}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

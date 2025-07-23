
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Flag, 
  Calendar, 
  MapPin, 
  Clock,
  CheckCircle,
  User
} from 'lucide-react';
import { ConstituentIssue, PriorityItem } from '@/types/core';
import { formatRelativeTime } from '@/utils/dateUtils';

interface PublicIssueViewProps {
  issue: ConstituentIssue | PriorityItem;
}

const statusConfig = {
  'in-progress': { 
    label: 'In Progress', 
    color: 'bg-blue-100 text-blue-800',
    icon: Clock,
    description: 'We are actively working on this issue'
  },
  'resolved': { 
    label: 'Resolved', 
    color: 'bg-green-100 text-green-800',
    icon: CheckCircle,
    description: 'This issue has been resolved'
  },
  'validated': { 
    label: 'Validated', 
    color: 'bg-purple-100 text-purple-800',
    icon: User,
    description: 'This issue has been reviewed and validated'
  }
};

export function PublicIssueView({ issue }: PublicIssueViewProps) {
  const statusInfo = issue.status ? statusConfig[issue.status as keyof typeof statusConfig] : null;
  const StatusIcon = statusInfo?.icon;
  
  // Filter timeline to only show public-relevant entries
  const publicTimeline = issue.timeline.filter(entry => 
    ['submitted', 'validated', 'in-progress', 'resolved'].includes(entry.status)
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Status Badge - only show if status exists */}
      {statusInfo && (
        <div className="flex items-center gap-3">
          <Badge className={`${statusInfo.color} gap-2`}>
            {StatusIcon && <StatusIcon className="h-4 w-4" />}
            {statusInfo.label}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {statusInfo.description}
          </span>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">About This Issue</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {issue.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Public Notes */}
          {'publicNotes' in issue && issue.publicNotes && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Latest Update</h2>
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-200 rounded-r-lg">
                    <p className="text-blue-800 leading-relaxed">
                      {issue.publicNotes}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Public Timeline */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Progress Updates</h2>
                <div className="space-y-4">
                  {publicTimeline.map((entry, index) => (
                    <div key={entry.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        {index < publicTimeline.length - 1 && (
                          <div className="w-0.5 h-8 bg-border mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium capitalize">
                            {entry.status.replace('-', ' ')}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {formatRelativeTime(entry.timestamp)}
                          </span>
                        </div>
                        {entry.notes && (
                          <p className="text-sm text-muted-foreground">
                            {entry.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Citizen Actions */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Stay Updated</h2>
                <div className="space-y-2">
                  <Button className="w-full gap-2">
                    <Bell className="h-4 w-4" />
                    Follow for Updates
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Flag className="h-4 w-4" />
                    Report Similar Issue
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline Info */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Expected Timeline</h2>
                {issue.estimatedResolution ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Expected resolution:</span>
                    </div>
                    <p className="font-medium">{issue.estimatedResolution}</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Timeline will be updated as we review this issue.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Category Tags */}
          {issue.tags && issue.tags.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Categories</h2>
                  <div className="flex flex-wrap gap-2">
                    {issue.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Community Support (for community issues) */}
          {issue.type === 'community' && issue.supportPercentage && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Community Support</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Support Level</span>
                      <span className="text-sm font-medium">{issue.supportPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${issue.supportPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

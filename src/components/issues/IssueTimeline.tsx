
import { Calendar, Clock, User, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { StatusChange } from '@/types/core';
import { formatRelativeTime } from '@/utils/dateUtils';

interface IssueTimelineProps {
  timeline: StatusChange[];
}

const statusConfig = {
  'submitted': { label: 'Submitted', color: 'bg-gray-100 text-gray-800', icon: Calendar },
  'reviewed': { label: 'Reviewed', color: 'bg-blue-100 text-blue-800', icon: User },
  'assigned': { label: 'Assigned', color: 'bg-yellow-100 text-yellow-800', icon: User },
  'in-progress': { label: 'In Progress', color: 'bg-blue-100 text-blue-800', icon: Clock },
  'completed': { label: 'Completed', color: 'bg-green-100 text-green-800', icon: Calendar },
  'resolved': { label: 'Resolved', color: 'bg-green-100 text-green-800', icon: Calendar },
  'validated': { label: 'Validated', color: 'bg-purple-100 text-purple-800', icon: User }
};

export function IssueTimeline({ timeline }: IssueTimelineProps) {
  const sortedTimeline = [...timeline].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {sortedTimeline.map((event, index) => {
          const config = statusConfig[event.status as keyof typeof statusConfig];
          const Icon = config?.icon || Calendar;
          const isLast = index === sortedTimeline.length - 1;
          
          return (
            <div key={event.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background border-2 border-border">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                {!isLast && (
                  <div className="w-px h-6 bg-border mt-2" />
                )}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  {config && (
                    <Badge className={config.color}>
                      {config.label}
                    </Badge>
                  )}
                  <span className="text-sm text-muted-foreground">
                    {formatRelativeTime(event.timestamp)}
                  </span>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  by {event.changedBy}
                </div>
                
                {event.notes && (
                  <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                    <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-foreground">{event.notes}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { IssueCard } from '@/components/issues/IssueCard';
import { getPriorityItems } from '@/services/mockData';
import { PriorityItem, ConstituentIssue } from '@/types/core';

type StatusFilter = 'todo' | 'in-progress' | 'completed';

export function WebsitePriorities() {
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('in-progress');
  
  const {
    data: priorityItems = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['priority-items'],
    queryFn: getPriorityItems
  });

  // Filter items based on active filter
  const filteredItems = priorityItems.filter(item => item.boardStatus === activeFilter);

  // Transform PriorityItem to ConstituentIssue for IssueCard compatibility
  const transformedIssues: ConstituentIssue[] = filteredItems.map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    priority: item.priority,
    status: item.boardStatus === 'completed' ? 'resolved' : item.boardStatus === 'in-progress' ? 'in-progress' : undefined,
    type: item.type,
    source: item.source,
    createdAt: item.addedToBoardAt,
    updatedAt: item.updatedAt,
    timeframe: item.estimatedDuration,
    supportPercentage: item.supportPercentage,
    mentions: 0,
    constituent: item.assignee ? {
      name: item.assignee,
      email: ''
    } : undefined
  }));

  const getFilterLabel = (filter: StatusFilter) => {
    switch (filter) {
      case 'todo':
        return 'To Do';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Done';
    }
  };

  const getStatusDescription = (filter: StatusFilter) => {
    switch (filter) {
      case 'todo':
        return 'Priorities we plan to address';
      case 'in-progress':
        return 'Issues we are actively working on';
      case 'completed':
        return 'Successfully completed initiatives';
    }
  };

  if (isLoading) {
    return <div className="space-y-6">
        <div className="text-center">
          <div className="h-8 bg-muted rounded w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-96 mx-auto animate-pulse"></div>
        </div>
        <div className="flex justify-center">
          <div className="h-10 bg-muted rounded w-80 animate-pulse"></div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({
          length: 6
        }, (_, i) => <div key={i} className="h-48 bg-muted rounded animate-pulse"></div>)}
        </div>
      </div>;
  }

  if (error) {
    return <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          Unable to load current priorities at this time.
        </p>
      </div>;
  }

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Our Current Priorities</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Track our progress on community issues with full transparency. 
          See what we're working on and what we've accomplished.
        </p>
      </div>

      {/* Segmented Control */}
      <div className="flex justify-center">
        <ToggleGroup type="single" value={activeFilter} onValueChange={value => value && setActiveFilter(value as StatusFilter)} className="grid grid-cols-3 w-full max-w-md border rounded-lg p-1 bg-muted/50">
          <ToggleGroupItem value="todo" className="data-[state=on]:bg-background data-[state=on]:shadow-sm transition-all">
            To Do
          </ToggleGroupItem>
          <ToggleGroupItem value="in-progress" className="data-[state=on]:bg-background data-[state=on]:shadow-sm transition-all">
            In Progress
          </ToggleGroupItem>
          <ToggleGroupItem value="completed" className="data-[state=on]:bg-background data-[state=on]:shadow-sm transition-all">
            Done
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Status Description */}
      <div className="text-center">
        <p className="text-muted-foreground py-0">
          {getStatusDescription(activeFilter)}
        </p>
      </div>

      {/* Issues Grid */}
      {transformedIssues.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {transformedIssues.map(issue => (
            <div key={issue.id} className="w-full">
              <IssueCard issue={issue} variant="dashboard" showCheckbox={false} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            <p className="text-lg font-medium mb-2">
              No items in "{getFilterLabel(activeFilter)}"
            </p>
            <p className="text-sm">
              {activeFilter === 'in-progress' ? "We're currently organizing our priorities. Check back soon!" : `No items are currently marked as ${getFilterLabel(activeFilter).toLowerCase()}.`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

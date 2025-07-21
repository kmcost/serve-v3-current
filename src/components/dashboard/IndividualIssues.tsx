import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getIndividualIssues } from '@/services/mockData';
import { ConstituentIssue } from '@/types/core';
export function IndividualIssues() {
  const {
    data: issues = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['individual-issues'],
    queryFn: getIndividualIssues
  });
  if (isLoading) {
    return <Card>
        <CardHeader>
          <CardTitle>High-Priority Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({
            length: 3
          }, (_, i) => <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-muted rounded w-3/4 mb-1"></div>
                <div className="h-8 bg-muted rounded w-full"></div>
              </div>)}
          </div>
        </CardContent>
      </Card>;
  }
  if (error) {
    return <Card>
        <CardHeader>
          <CardTitle>High-Priority Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Unable to load individual requests</p>
        </CardContent>
      </Card>;
  }
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };
  return <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl">High-Priority Requests</CardTitle>
        <Link to="/inbox" className="text-primary hover:text-primary/80 text-sm font-medium">
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {issues.slice(0, 5).map(issue => <div key={issue.id} className="space-y-3 p-3 rounded-lg border bg-card">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {issue.constituent?.name}
                  </p>
                  <h3 className="font-medium text-foreground leading-tight">
                    {issue.title}
                  </h3>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority || 'low')}`}>
                    {issue.priority}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {issue.timeframe}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {issue.description}
              </p>
              <Link to={`/inbox/${issue.id}`}>
                <Button variant="outline" size="sm" className="w-full">
                  Respond
                </Button>
              </Link>
            </div>)}
        </div>
      </CardContent>
    </Card>;
}
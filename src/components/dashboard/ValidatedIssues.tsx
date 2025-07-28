import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getValidatedIssues } from '@/services/mockData';
import { ConstituentIssue } from '@/types/core';
import { IssueCard } from '@/components/issues/IssueCard';
export function ValidatedIssues() {
  const {
    data: issues = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['validated-issues'],
    queryFn: getValidatedIssues
  });
  if (isLoading) {
    return <Card>
        <CardHeader>
          <CardTitle>Top 5 Issues in Your Community</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({
            length: 3
          }, (_, i) => <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2 mb-1"></div>
                <div className="h-3 bg-muted rounded w-full"></div>
              </div>)}
          </div>
        </CardContent>
      </Card>;
  }
  if (error) {
    return <Card>
        <CardHeader>
          <CardTitle>Top 5 Issues in Your Community</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Unable to load validated issues</p>
        </CardContent>
      </Card>;
  }
  return <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl">Top 5 Community Priorities</CardTitle>
        <Button asChild size="sm">
          <Link to="/issues">
            Take Action
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {issues.slice(0, 5).map(issue => <IssueCard key={issue.id} issue={issue} variant="dashboard" />)}
        </div>
      </CardContent>
    </Card>;
}
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getTrendingIssues } from '@/services/mockData';
import { ConstituentIssue } from '@/types/core';
export function TrendingIssues() {
  const {
    data: issues = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['trending-issues'],
    queryFn: getTrendingIssues
  });
  if (isLoading) {
    return <Card>
        <CardHeader>
          <CardTitle>New Issues to Validate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({
            length: 3
          }, (_, i) => <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-2/3 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/3 mb-1"></div>
                <div className="h-8 bg-muted rounded w-full"></div>
              </div>)}
          </div>
        </CardContent>
      </Card>;
  }
  if (error) {
    return <Card>
        <CardHeader>
          <CardTitle>New Issues to Validate</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Unable to load trending issues</p>
        </CardContent>
      </Card>;
  }
  const handleValidateClick = (issue: ConstituentIssue) => {
    // Navigate to poll creation with pre-filled question
    const encodedQuestion = encodeURIComponent(issue.title);
    window.location.href = `/polls/edit?question=${encodedQuestion}`;
  };
  return <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl">Trending Topics</CardTitle>
        <Link to="/issues" className="text-primary hover:text-primary/80 text-sm font-medium">
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {issues.slice(0, 4).map(issue => <div key={issue.id} className="space-y-3 p-3 rounded-lg border bg-card">
              <div className="space-y-1">
                <h3 className="font-medium text-foreground leading-tight">
                  {issue.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {issue.mentions} mentions {issue.timeframe}
                </p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {issue.description}
              </p>
              <Button onClick={() => handleValidateClick(issue)} variant="outline" size="sm" className="w-full">
                Validate with Poll
              </Button>
            </div>)}
        </div>
      </CardContent>
    </Card>;
}
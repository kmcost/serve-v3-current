import { mockValidatedIssues, mockTrendingIssues, mockIndividualIssues, mockPriorityItems } from './mockData';

export interface ImpactStat {
  title: string;
  value: string;
  icon: string;
  color: string;
}

export function calculateImpactStats(): ImpactStat[] {
  // Calculate Issues Resolved
  const regularResolvedIssues = [
    ...mockValidatedIssues,
    ...mockTrendingIssues,
    ...mockIndividualIssues
  ].filter(issue => issue.status === 'resolved');
  
  const completedPriorityIssues = mockPriorityItems.filter(item => item.boardStatus === 'completed');
  const issuesResolved = [...regularResolvedIssues, ...completedPriorityIssues];

  // Calculate Policies Changed (completed priority items)
  const policiesChanged = mockPriorityItems.filter(item => item.boardStatus === 'completed');

  // Calculate Response Time (time to first response after submission)
  const issuesWithResponse = [
    ...mockValidatedIssues,
    ...mockTrendingIssues,
    ...mockIndividualIssues
  ].filter(issue => issue.timeline && issue.timeline.length > 1);
  
  const averageResponseHours = issuesWithResponse.length > 0 
    ? Math.round(
        issuesWithResponse.reduce((sum, issue) => {
          const firstEntry = new Date(issue.timeline[0].timestamp);
          const secondEntry = new Date(issue.timeline[1].timestamp);
          const diffHours = Math.max(1, Math.ceil((secondEntry.getTime() - firstEntry.getTime()) / (1000 * 60 * 60)));
          return sum + diffHours;
        }, 0) / issuesWithResponse.length
      )
    : 24; // Default to 24 hours

  // Calculate Avg Time to Resolution (from open to resolved)
  const resolvedIssuesWithTimeline = issuesResolved.filter(issue => 
    issue.timeline && issue.timeline.length > 1
  );
  
  const averageResolutionDays = resolvedIssuesWithTimeline.length > 0 
    ? Math.round(
        resolvedIssuesWithTimeline.reduce((sum, issue) => {
          const firstEntry = new Date(issue.timeline[0].timestamp);
          const lastEntry = new Date(issue.timeline[issue.timeline.length - 1].timestamp);
          const diffDays = Math.max(1, Math.ceil((lastEntry.getTime() - firstEntry.getTime()) / (1000 * 60 * 60 * 24)));
          return sum + diffDays;
        }, 0) / resolvedIssuesWithTimeline.length
      )
    : 7; // Default to 7 days

  return [
    {
      title: "Issues Resolved",
      value: issuesResolved.length.toString(),
      icon: "CheckCircle",
      color: "green"
    },
    {
      title: "Policies Changed", 
      value: policiesChanged.length.toString(),
      icon: "FileText",
      color: "blue"
    },
    {
      title: "Response Time",
      value: averageResponseHours < 24 ? `${averageResponseHours}h` : `${Math.round(averageResponseHours / 24)}d`,
      icon: "Clock",
      color: "orange"
    },
    {
      title: "Avg. Time to Resolution",
      value: `${averageResolutionDays} days`,
      icon: "Timer",
      color: "purple"
    }
  ];
}
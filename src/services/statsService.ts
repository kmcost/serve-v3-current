import { mockValidatedIssues, mockTrendingIssues, mockIndividualIssues, mockPriorityItems } from './mockData';
import { getConstituents, getConstituentStats } from './constituentsService';
import { pollData } from '../data/pollData';

export interface ImpactStat {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  description: string;
  icon: string;
}

export function calculateImpactStats(): ImpactStat[] {
  // Calculate People Helped from resolved issues
  const regularResolvedIssues = [
    ...mockValidatedIssues,
    ...mockTrendingIssues,
    ...mockIndividualIssues
  ].filter(issue => issue.status === 'resolved');
  
  const completedPriorityIssues = mockPriorityItems.filter(item => item.boardStatus === 'completed');
  const resolvedIssues = [...regularResolvedIssues, ...completedPriorityIssues];
  
  const peopleHelped = resolvedIssues.length;
  const peopleHelpedChange = "+12%";

  // Calculate Active Community Engagement
  const constituents = getConstituents();
  const totalPolls = Object.keys(pollData).length;
  const totalPollResponses = Object.values(pollData).reduce((sum, poll) => sum + poll.responses, 0);
  const activeEngagement = Math.round((totalPollResponses / constituents.length) * 100);
  const engagementChange = "+8%";

  // Calculate Policy Changes Implemented from completed priority items
  const completedPriorities = mockPriorityItems.filter(item => item.boardStatus === 'completed');
  const policyChanges = completedPriorities.length;
  const policyChangesChange = "+3";

  // Calculate Response Time Performance
  const issuesWithTimeline = [
    ...mockValidatedIssues,
    ...mockTrendingIssues,
    ...mockIndividualIssues
  ].filter(issue => issue.timeline && issue.timeline.length > 1);
  
  // Calculate average response time in days for issues that have been processed
  const averageResponseDays = issuesWithTimeline.length > 0 
    ? Math.round(
        issuesWithTimeline.reduce((sum, issue) => {
          const firstEntry = new Date(issue.timeline[0].timestamp);
          const lastEntry = new Date(issue.timeline[issue.timeline.length - 1].timestamp);
          const diffDays = Math.max(1, Math.ceil((lastEntry.getTime() - firstEntry.getTime()) / (1000 * 60 * 60 * 24)));
          return sum + diffDays;
        }, 0) / issuesWithTimeline.length
      )
    : 0;

  const responseTimeChange = "-18%"; // Improvement means reduction in days

  return [
    {
      title: "People Helped",
      value: peopleHelped.toString(),
      change: peopleHelpedChange,
      trend: "up" as const,
      description: "Issues resolved this month",
      icon: "Users"
    },
    {
      title: "Community Engagement",
      value: `${activeEngagement}%`,
      change: engagementChange,
      trend: "up" as const,
      description: "Active participation rate",
      icon: "TrendingUp"
    },
    {
      title: "Policy Changes",
      value: policyChanges.toString(),
      change: policyChangesChange,
      trend: "up" as const,
      description: "Implemented this quarter",
      icon: "CheckCircle"
    },
    {
      title: "Response Time",
      value: `${averageResponseDays} days`,
      change: responseTimeChange,
      trend: "up" as const, // Even though it's down, faster response is good
      description: "Average issue resolution",
      icon: "Clock"
    }
  ];
}
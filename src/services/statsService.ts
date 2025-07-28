import { mockValidatedIssues, mockTrendingIssues, mockIndividualIssues, mockPriorityItems } from './mockData';

export interface ImpactStat {
  title: string;
  value: string;
  icon: string;
  color: string;
  trend: 'up' | 'down' | 'neutral';
  change: string;
  changeValue: number;
}

function calculatePeriodMetrics() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

  // Current period (last 30 days)
  const currentIssuesResolved = [
    ...mockValidatedIssues,
    ...mockTrendingIssues,
    ...mockIndividualIssues
  ].filter(issue => 
    issue.status === 'resolved' && 
    new Date(issue.timeline[issue.timeline.length - 1]?.timestamp) >= thirtyDaysAgo
  );
  
  const currentPoliciesChanged = mockPriorityItems.filter(item => 
    item.boardStatus === 'completed' && 
    item.completedAt && 
    new Date(item.completedAt) >= thirtyDaysAgo
  );

  // Previous period (30-60 days ago)
  const previousIssuesResolved = [
    ...mockValidatedIssues,
    ...mockTrendingIssues,
    ...mockIndividualIssues
  ].filter(issue => 
    issue.status === 'resolved' && 
    new Date(issue.timeline[issue.timeline.length - 1]?.timestamp) >= sixtyDaysAgo &&
    new Date(issue.timeline[issue.timeline.length - 1]?.timestamp) < thirtyDaysAgo
  );
  
  const previousPoliciesChanged = mockPriorityItems.filter(item => 
    item.boardStatus === 'completed' && 
    item.completedAt &&
    new Date(item.completedAt) >= sixtyDaysAgo &&
    new Date(item.completedAt) < thirtyDaysAgo
  );

  return {
    current: {
      issuesResolved: currentIssuesResolved.length,
      policiesChanged: currentPoliciesChanged.length
    },
    previous: {
      issuesResolved: previousIssuesResolved.length,
      policiesChanged: previousPoliciesChanged.length
    }
  };
}

function getTrend(current: number, previous: number): { trend: 'up' | 'down' | 'neutral', change: string, changeValue: number } {
  if (previous === 0) {
    return { trend: current > 0 ? 'up' : 'neutral', change: current > 0 ? `+${current}` : '0', changeValue: current };
  }
  
  const changeValue = current - previous;
  const changePercent = Math.round((changeValue / previous) * 100);
  
  if (changeValue > 0) {
    return { trend: 'up', change: `+${changePercent}%`, changeValue };
  } else if (changeValue < 0) {
    return { trend: 'down', change: `${changePercent}%`, changeValue };
  } else {
    return { trend: 'neutral', change: '0%', changeValue: 0 };
  }
}

export function calculateImpactStats(): ImpactStat[] {
  const metrics = calculatePeriodMetrics();
  
  // Calculate current metrics
  const currentResolutionTime = 4; // Average 4 hours (mock data)
  const previousResolutionTime = 6; // Previous period was 6 hours
  
  const currentAvgResolution = 7; // 7 days average
  const previousAvgResolution = 9; // Previous was 9 days
  
  // GoodParty.org benchmark average (mock data)
  const goodPartyAverage = 85; // 85% efficiency score
  const previousGoodPartyAverage = 82; // Previous was 82%

  const issuesTrend = getTrend(metrics.current.issuesResolved, metrics.previous.issuesResolved);
  const policiesTrend = getTrend(metrics.current.policiesChanged, metrics.previous.policiesChanged);
  const goodPartyTrend = getTrend(goodPartyAverage, previousGoodPartyAverage);
  
  // For resolution time, lower is better, so we invert the trend
  const resolutionTrend = currentAvgResolution < previousAvgResolution 
    ? { trend: 'up' as const, change: `-${Math.round(((previousAvgResolution - currentAvgResolution) / previousAvgResolution) * 100)}%`, changeValue: currentAvgResolution - previousAvgResolution }
    : currentAvgResolution > previousAvgResolution 
    ? { trend: 'down' as const, change: `+${Math.round(((currentAvgResolution - previousAvgResolution) / previousAvgResolution) * 100)}%`, changeValue: currentAvgResolution - previousAvgResolution }
    : { trend: 'neutral' as const, change: '0%', changeValue: 0 };

  return [
    {
      title: "Issues Resolved",
      value: metrics.current.issuesResolved.toString(),
      icon: "CheckCircle",
      color: "green",
      trend: issuesTrend.trend,
      change: issuesTrend.change,
      changeValue: issuesTrend.changeValue
    },
    {
      title: "Policies Changed", 
      value: metrics.current.policiesChanged.toString(),
      icon: "FileText",
      color: "blue",
      trend: policiesTrend.trend,
      change: policiesTrend.change,
      changeValue: policiesTrend.changeValue
    },
    {
      title: "GoodParty.org Average",
      value: `${goodPartyAverage}%`,
      icon: "TrendingUp",
      color: "purple",
      trend: goodPartyTrend.trend,
      change: goodPartyTrend.change,
      changeValue: goodPartyTrend.changeValue
    },
    {
      title: "Avg. Time to Resolution",
      value: `${currentAvgResolution} days`,
      icon: "Timer",
      color: "orange",
      trend: resolutionTrend.trend,
      change: resolutionTrend.change,
      changeValue: resolutionTrend.changeValue
    }
  ];
}
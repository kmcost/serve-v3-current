import { mockValidatedIssues, mockTrendingIssues, mockIndividualIssues, mockPriorityItems } from './mockData';

export interface ImpactStat {
  title: string;
  value: string;
  icon: string;
  color: string;
  trend: 'up' | 'down' | 'neutral';
  change: string;
  changeValue: number;
  benchmark?: string;
  performanceLevel: 'excellent' | 'good' | 'needs-improvement';
  context?: string;
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
  
  // Current performance metrics
  const currentAvgResolution = 8; // 8 days average
  const previousAvgResolution = 9; // Previous was 9 days
  const goodPartyAvgResolution = 12; // GoodParty.org average is 12 days
  
  // GoodParty.org benchmarks
  const goodPartyAvgIssues = 4; // Average issues resolved by GoodParty.org officials
  const goodPartyAvgPolicies = 3; // Average policies changed by GoodParty.org officials
  
  // Calculate performance score (your efficiency vs GoodParty.org average)
  const yourEfficiencyScore = Math.round(
    ((metrics.current.issuesResolved / Math.max(goodPartyAvgIssues, 1)) * 0.4 +
     (metrics.current.policiesChanged / Math.max(goodPartyAvgPolicies, 1)) * 0.4 +
     (goodPartyAvgResolution / Math.max(currentAvgResolution, 1)) * 0.2) * 100
  );
  const previousEfficiencyScore = 78; // Previous period score

  const issuesTrend = getTrend(8, metrics.previous.issuesResolved);
  const policiesTrend = getTrend(metrics.current.policiesChanged, metrics.previous.policiesChanged);
  const efficiencyTrend = getTrend(yourEfficiencyScore, previousEfficiencyScore);
  
  // For resolution time, lower is better, so we invert the trend
  const resolutionTrend = currentAvgResolution < previousAvgResolution 
    ? { trend: 'up' as const, change: `-${Math.round(((previousAvgResolution - currentAvgResolution) / previousAvgResolution) * 100)}%`, changeValue: currentAvgResolution - previousAvgResolution }
    : currentAvgResolution > previousAvgResolution 
    ? { trend: 'down' as const, change: `+${Math.round(((currentAvgResolution - previousAvgResolution) / previousAvgResolution) * 100)}%`, changeValue: currentAvgResolution - previousAvgResolution }
    : { trend: 'neutral' as const, change: '0%', changeValue: 0 };

  // Performance level calculation
  const getPerformanceLevel = (value: number, benchmark: number, higherIsBetter: boolean = true): 'excellent' | 'good' | 'needs-improvement' => {
    const ratio = higherIsBetter ? value / benchmark : benchmark / value;
    if (ratio >= 1.2) return 'excellent';
    if (ratio >= 0.8) return 'good';
    return 'needs-improvement';
  };

  return [
    {
      title: "Issues Resolved",
      value: "8",
      icon: "CheckCircle",
      color: "green",
      trend: issuesTrend.trend,
      change: issuesTrend.change,
      changeValue: issuesTrend.changeValue,
      benchmark: `Avg. 4 issues/month across GoodParty.org`,
      performanceLevel: getPerformanceLevel(8, 4),
      context: "Issues resolved this month"
    },
    {
      title: "Policies Changed", 
      value: metrics.current.policiesChanged.toString(),
      icon: "FileText",
      color: "blue",
      trend: policiesTrend.trend,
      change: policiesTrend.change,
      changeValue: policiesTrend.changeValue,
      benchmark: `Avg: ${goodPartyAvgPolicies}`,
      performanceLevel: getPerformanceLevel(metrics.current.policiesChanged, goodPartyAvgPolicies),
      context: "Policy changes implemented"
    },
    {
      title: "Your Efficiency Score",
      value: `${yourEfficiencyScore}%`,
      icon: "TrendingUp",
      color: "purple",
      trend: efficiencyTrend.trend,
      change: efficiencyTrend.change,
      changeValue: efficiencyTrend.changeValue,
      benchmark: "vs GoodParty.org officials",
      performanceLevel: yourEfficiencyScore >= 90 ? 'excellent' : yourEfficiencyScore >= 70 ? 'good' : 'needs-improvement',
      context: "Overall performance vs peers"
    },
    {
      title: "Avg. Time to Resolution",
      value: `${currentAvgResolution} days`,
      icon: "Timer",
      color: "orange",
      trend: resolutionTrend.trend,
      change: resolutionTrend.change,
      changeValue: resolutionTrend.changeValue,
      benchmark: `Avg: ${goodPartyAvgResolution} days`,
      performanceLevel: getPerformanceLevel(currentAvgResolution, goodPartyAvgResolution, false),
      context: "Average time to resolve issues"
    }
  ];
}
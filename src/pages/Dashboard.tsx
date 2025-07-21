
import { ValidatedIssues } from '@/components/dashboard/ValidatedIssues';
import { TrendingIssues } from '@/components/dashboard/TrendingIssues';
import { IndividualIssues } from '@/components/dashboard/IndividualIssues';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your constituent engagement and priorities
        </p>
      </div>

      {/* Main Dashboard Sections */}
      <div className="space-y-6">
        <ValidatedIssues />
        <TrendingIssues />
        <IndividualIssues />
      </div>
    </div>
  );
}

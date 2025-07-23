import { ValidatedIssues } from '@/components/dashboard/ValidatedIssues';
import { TrendingIssues } from '@/components/dashboard/TrendingIssues';
import { IndividualIssues } from '@/components/dashboard/IndividualIssues';
import { ImpactStats } from '@/components/dashboard/ImpactStats';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
export default function Dashboard() {
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your constituent engagement and priorities
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="gap-2 text-xs sm:text-sm">
            <Plus className="h-4 w-4" />
            <span className="hidden xs:inline">Create Issue</span>
            <span className="xs:hidden text-sm">Create Issue</span>
          </Button>
        </div>
      </div>

      {/* Impact Statistics */}
      <ImpactStats />

      {/* Main Dashboard Sections */}
      <div className="space-y-6">
        <ValidatedIssues />
        <TrendingIssues />
        <IndividualIssues />
      </div>
    </div>;
}
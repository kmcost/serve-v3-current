
import { QuestionInput } from '@/components/QuestionInput';
import { ValidatedIssues } from '@/components/dashboard/ValidatedIssues';
import { TrendingIssues } from '@/components/dashboard/TrendingIssues';
import { IndividualIssues } from '@/components/dashboard/IndividualIssues';
import { ActiveOutreach } from '@/components/dashboard/ActiveOutreach';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Welcome Back, Farhad</h1>
        </div>
        
        <QuestionInput />
      </div>

      {/* Main Dashboard Sections */}
      <div className="space-y-6">
        <ValidatedIssues />
        <TrendingIssues />
        <IndividualIssues />
      </div>

      {/* Active Outreach Section */}
      <div className="space-y-6">
        <ActiveOutreach />
      </div>
    </div>
  );
}

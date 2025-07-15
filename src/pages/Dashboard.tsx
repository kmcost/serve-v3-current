import { QuestionInput } from '@/components/QuestionInput';
import { TopIssues } from '@/components/dashboard/TopIssues';
import { ActiveOutreach } from '@/components/dashboard/ActiveOutreach';
export default function Dashboard() {
  return <div className="space-y-8">
      {/* Hero Section */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Welcome Back, Farhad</h1>
        </div>
        
        <QuestionInput />
      </div>

      {/* Main Dashboard Sections */}
      

      {/* Stats Sections */}
      <div className="space-y-6">
        <TopIssues />
        <ActiveOutreach />
      </div>
    </div>;
}
import { Link } from 'react-router-dom';
import { QuestionInput } from '@/components/QuestionInput';
export default function Dashboard() {
  return <div className="space-y-8">
      {/* Hero Section */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Welcome back, Raymond
          </h1>
        </div>
        
        <QuestionInput />
      </div>

      {/* Main Dashboard Sections */}
      

      {/* Stats Sections */}
      <div className="space-y-6">
        {/* Top Issue Categories */}
        <div className="space-y-4 px-[16px] py-[16px] bg-white rounded-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Top Issue Categories</h2>
            <Link to="/issues" className="text-primary hover:text-primary/80 text-sm font-medium">View Issues</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-card rounded-lg border">
              <p className="text-3xl font-bold text-primary">42%</p>
              <p className="text-sm font-medium text-muted-foreground mt-2">Infrastructure & Roads</p>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border">
              <p className="text-3xl font-bold text-primary">28%</p>
              <p className="text-sm font-medium text-muted-foreground mt-2">Public Safety</p>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border">
              <p className="text-3xl font-bold text-primary">16%</p>
              <p className="text-sm font-medium text-muted-foreground mt-2">Environmental Initiatives</p>
            </div>
          </div>
        </div>

        {/* Active Outreach */}
        <div className="space-y-4 py-[16px] px-[16px] bg-white rounded-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Active Outreach</h2>
            <Link to="/polls" className="text-primary hover:text-primary/80 text-sm font-medium">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            <Link to="/polls/2" className="block bg-white p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center md:gap-8 space-y-2 md:space-y-0">
                <div className="order-1 md:order-1">
                  <h3 className="font-medium text-sm text-primary">
                    Should we reopen the community pool?
                  </h3>
                </div>
                <div className="order-2 md:order-2 md:text-right">
                  <p className="text-sm font-medium text-foreground">Facebook, SMS, Email</p>
                </div>
                <div className="order-3 md:order-3 md:text-right">
                  <p className="text-xs text-muted-foreground">1243 recipients</p>
                </div>
              </div>
            </Link>
            <Link to="/polls/3" className="block bg-white p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center md:gap-8 space-y-2 md:space-y-0">
                <div className="order-1 md:order-1">
                  <h3 className="font-medium text-sm text-primary">
                    Are you in favor of the operation of golf carts on village streets?
                  </h3>
                </div>
                <div className="order-2 md:order-2 md:text-right">
                  <p className="text-sm font-medium text-foreground">Facebook, SMS, Email</p>
                </div>
                <div className="order-3 md:order-3 md:text-right">
                  <p className="text-xs text-muted-foreground">567 recipients</p>
                </div>
              </div>
            </Link>
            <Link to="/polls/4" className="block bg-white p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center md:gap-8 space-y-2 md:space-y-0">
                <div className="order-1 md:order-1">
                  <h3 className="font-medium text-sm text-primary">
                    How would you like to receive council updates?
                  </h3>
                </div>
                <div className="order-2 md:order-2 md:text-right">
                  <p className="text-sm font-medium text-foreground">Facebook</p>
                </div>
                <div className="order-3 md:order-3 md:text-right">
                  <p className="text-xs text-muted-foreground">982 recipients</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>;
}
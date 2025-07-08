import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, BarChart3, Inbox, AlertTriangle, Users, MessageSquare, TrendingUp } from 'lucide-react';
export default function Dashboard() {
  const [question, setQuestion] = useState('');
  return <div className="space-y-8">
      {/* Hero Section */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Welcome back, Sarah
          </h1>
          <p className="text-lg text-muted-foreground">
            What would you like to learn?
          </p>
        </div>
        
        <div className="space-y-4">
          <Textarea placeholder="What would you like to ask your constituents?" value={question} onChange={e => setQuestion(e.target.value)} className="min-h-[100px] text-base resize-none" />
          <Link to="/polls/create">
            <Button size="lg" className="gap-2 my-[16px]">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Dashboard Sections */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {/* Active Polls & Surveys */}
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Polls & Surveys</h3>
              <p className="text-sm text-muted-foreground">Track constituent engagement</p>
            </div>
          </div>
          <Link to="/polls" className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center gap-1">
            View all polls →
          </Link>
        </div>

        {/* Recent Inbox Activity */}
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Inbox className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Constituent Inbox</h3>
              <p className="text-sm text-muted-foreground">Incoming messages from your constituents</p>
            </div>
          </div>
          <Link to="/inbox" className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center gap-1">
            View inbox →
          </Link>
        </div>

        {/* Top Issues */}
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Issue Tracking</h3>
              <p className="text-sm text-muted-foreground">Monitor and manage community issues</p>
            </div>
          </div>
          <Link to="/issues" className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center gap-1">
            Manage issues →
          </Link>
        </div>
      </div>

      {/* Stats Sections */}
      <div className="space-y-6">
        {/* Active Outreach */}
        <div className="space-y-4 py-[16px] px-[16px] bg-white rounded-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Active Outreach</h2>
            <Link to="/polls" className="text-primary hover:text-primary/80 text-sm font-medium">
              View all
            </Link>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Link to="/polls/2" className="font-medium text-sm text-primary hover:text-primary/80">
                  Should we reopen the community pool?
                </Link>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Facebook, SMS, Email</p>
                <p className="text-xs text-muted-foreground">1243 recipients</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Link to="/polls/3" className="font-medium text-sm text-primary hover:text-primary/80">
                  Are you in favor of the operation of golf carts on village streets?
                </Link>
                <p className="text-xs text-muted-foreground">Friday</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Facebook, SMS, Email</p>
                <p className="text-xs text-muted-foreground">567 recipients</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Link to="/polls/4" className="font-medium text-sm text-primary hover:text-primary/80">
                  How would you like to receive council updates?
                </Link>
                <p className="text-xs text-muted-foreground">2 weeks ago</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Facebook</p>
                <p className="text-xs text-muted-foreground">982 recipients</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Issue Categories */}
        <div className="space-y-4 px-[16px] py-[16px] bg-white rounded-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Top Issue Categories</h2>
            <Link to="/issues" className="text-primary hover:text-primary/80 text-sm font-medium">View Issues</Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
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
      </div>
    </div>;
}
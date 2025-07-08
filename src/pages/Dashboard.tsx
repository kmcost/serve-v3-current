import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowRight, 
  BarChart3, 
  Inbox, 
  AlertTriangle,
  Users,
  MessageSquare,
  TrendingUp
} from 'lucide-react';

export default function Dashboard() {
  const [question, setQuestion] = useState('');

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Welcome back, Sarah
          </h1>
          <p className="text-lg text-muted-foreground">
            What do you need to know from your constituents today?
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto space-y-4">
          <Textarea
            placeholder="What do you need to know from your constituents?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-[100px] text-base resize-none"
          />
          <Link to="/polls/create">
            <Button size="lg" className="gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Dashboard Sections */}
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        {/* Active Polls & Surveys */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-lg font-semibold">Active Polls & Surveys</CardTitle>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-accent/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Active Polls</p>
                  <p className="text-2xl font-bold text-primary">3</p>
                </div>
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              
              <div className="flex justify-between items-center p-3 bg-accent/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Active Surveys</p>
                  <p className="text-2xl font-bold text-primary">1</p>
                </div>
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg. Engagement</span>
                  <span className="text-lg font-semibold text-success">24%</span>
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs text-success">
                  <TrendingUp className="h-3 w-3" />
                  +3% from last month
                </div>
              </div>
            </div>
            
            <Link to="/polls">
              <Button variant="outline" className="w-full">
                View All Polls & Surveys
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Inbox Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-lg font-semibold">Recent Inbox Activity</CardTitle>
            <Inbox className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-accent/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">New Messages</p>
                  <p className="text-2xl font-bold text-primary">12</p>
                </div>
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              
              <div className="flex justify-between items-center p-3 bg-accent/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Related Messages</p>
                  <p className="text-2xl font-bold text-warning">3</p>
                </div>
                <Users className="h-8 w-8 text-warning" />
              </div>
              
              <div className="flex justify-between items-center p-3 bg-accent/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Identified Issues</p>
                  <p className="text-2xl font-bold text-success">1</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-success" />
              </div>
            </div>
            
            <Link to="/inbox">
              <Button variant="outline" className="w-full">
                View Inbox
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Top Issues */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-lg font-semibold">Top Issues</CardTitle>
            <AlertTriangle className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded border-l-4 border-l-primary bg-accent/30">
                  <span className="text-sm font-medium">Parking enforcement downtown</span>
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Active</span>
                </div>
                
                <div className="flex items-center justify-between p-2 rounded border-l-4 border-l-warning bg-accent/30">
                  <span className="text-sm font-medium">Street lighting on Oak Ave</span>
                  <span className="text-xs bg-warning text-warning-foreground px-2 py-1 rounded">Open</span>
                </div>
                
                <div className="flex items-center justify-between p-2 rounded border-l-4 border-l-primary bg-accent/30">
                  <span className="text-sm font-medium">Dog park funding</span>
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Active</span>
                </div>
                
                <div className="flex items-center justify-between p-2 rounded border-l-4 border-l-success bg-accent/30">
                  <span className="text-sm font-medium">Community pool hours</span>
                  <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded">Resolved</span>
                </div>
              </div>
            </div>
            
            <Link to="/issues">
              <Button variant="outline" className="w-full">
                Manage Issues
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
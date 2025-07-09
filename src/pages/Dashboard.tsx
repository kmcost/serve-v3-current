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
          
        </div>
        
        <div className="space-y-4">
          <Textarea placeholder="What would you like to ask your constituents?" value={question} onChange={e => setQuestion(e.target.value)} className="min-h-[100px] text-base resize-none" />
          
          {/* Suggested Questions */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Suggested questions:</p>
            <div className="space-y-2">
              <button 
                onClick={() => setQuestion("What are my constituent's most important issues?")}
                className="w-full p-3 text-left text-sm bg-card border rounded-lg hover:bg-accent transition-colors"
              >
                What are my constituent's most important issues?
              </button>
              <button 
                onClick={() => setQuestion("Where are the most troubling roadworks issues?")}
                className="w-full p-3 text-left text-sm bg-card border rounded-lg hover:bg-accent transition-colors"
              >
                Where are the most troubling roadworks issues?
              </button>
              <button 
                onClick={() => setQuestion("How can we make our school system better?")}
                className="w-full p-3 text-left text-sm bg-card border rounded-lg hover:bg-accent transition-colors"
              >
                How can we make our school system better?
              </button>
            </div>
          </div>
          
          <Link to="/polls/create">
            <Button size="lg" className="gap-2 my-[16px] w-full">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
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
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <div className="order-1 md:order-1">
                <Link to="/polls/2" className="font-medium text-sm text-primary hover:text-primary/80">
                  Should we reopen the community pool?
                </Link>
              </div>
              <div className="order-3 md:order-2 md:text-right">
                <p className="text-sm font-medium">Facebook, SMS, Email</p>
              </div>
              <div className="order-4 md:order-3 md:text-right">
                <p className="text-xs text-muted-foreground">1243 recipients</p>
              </div>
              <div className="order-2 md:order-4">
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <div className="order-1 md:order-1">
                <Link to="/polls/3" className="font-medium text-sm text-primary hover:text-primary/80">
                  Are you in favor of the operation of golf carts on village streets?
                </Link>
              </div>
              <div className="order-3 md:order-2 md:text-right">
                <p className="text-sm font-medium">Facebook, SMS, Email</p>
              </div>
              <div className="order-4 md:order-3 md:text-right">
                <p className="text-xs text-muted-foreground">567 recipients</p>
              </div>
              <div className="order-2 md:order-4">
                <p className="text-xs text-muted-foreground">Friday</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <div className="order-1 md:order-1">
                <Link to="/polls/4" className="font-medium text-sm text-primary hover:text-primary/80">
                  How would you like to receive council updates?
                </Link>
              </div>
              <div className="order-3 md:order-2 md:text-right">
                <p className="text-sm font-medium">Facebook</p>
              </div>
              <div className="order-4 md:order-3 md:text-right">
                <p className="text-xs text-muted-foreground">982 recipients</p>
              </div>
              <div className="order-2 md:order-4">
                <p className="text-xs text-muted-foreground">2 weeks ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}
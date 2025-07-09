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
            Welcome back, Raymond
          </h1>
          
        </div>
        
        <div className="space-y-4">
          <Textarea placeholder="What would you like to ask your constituents?" value={question} onChange={e => setQuestion(e.target.value)} className="min-h-[100px] text-base resize-none" />
          
          {/* Suggested Questions */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Suggested questions:</p>
            <div className="space-y-2">
              <button 
                onClick={() => setQuestion("What issues do you as a constituent care about most?")}
                className="w-full p-3 text-left text-sm bg-card border rounded-lg hover:bg-accent transition-colors"
              >
                What issues do you as a constituent care about most?
              </button>
              <button 
                onClick={() => setQuestion("Would you support increased funding for our local library?")}
                className="w-full p-3 text-left text-sm bg-card border rounded-lg hover:bg-accent transition-colors"
              >
                Would you support increased funding for our local library?
              </button>
              <button 
                onClick={() => setQuestion("What programs or services would you like to see offered in our schools?")}
                className="w-full p-3 text-left text-sm bg-card border rounded-lg hover:bg-accent transition-colors"
              >
                What programs or services would you like to see offered in our schools?
              </button>
            </div>
          </div>
          
          <Button 
            size="lg" 
            className="gap-2 my-[16px] w-full"
            onClick={() => {
              if (question.trim()) {
                window.location.href = `/polls/ai-recommendations?question=${encodeURIComponent(question)}`;
              }
            }}
            disabled={!question.trim()}
          >
            Create Poll
            <ArrowRight className="h-4 w-4" />
          </Button>
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
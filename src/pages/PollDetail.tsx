import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  BarChart3, 
  Users, 
  Clock, 
  Mail, 
  MessageSquare,
  TrendingUp,
  Calendar,
  Settings,
  StopCircle,
  Send
} from 'lucide-react';

// Mock data - in real app this would come from API
const pollData = {
  1: {
    id: 1,
    title: "Should we extend parking meter hours downtown?",
    type: "Poll",
    status: "Active",
    question: "Do you support extending parking meter hours downtown from 6 PM to 8 PM on weekdays?",
    description: "This poll aims to gather community input on proposed changes to downtown parking meter hours to improve turnover and accessibility.",
    responses: 156,
    timeLeft: "3 days remaining",
    createdAt: "5 days ago",
    endDate: "January 15, 2024",
    channels: ["Email", "SMS"],
    reach: "2,400 residents",
    responseRate: "24%",
    results: {
      yes: { count: 104, percentage: 67 },
      no: { count: 52, percentage: 33 }
    },
    recentResponses: [
      { name: "John D.", response: "Yes", time: "2 hours ago", comment: "This will help with turnover" },
      { name: "Sarah M.", response: "No", time: "4 hours ago", comment: "Too restrictive for workers" },
      { name: "Mike R.", response: "Yes", time: "6 hours ago", comment: "Good for business" },
      { name: "Lisa K.", response: "No", time: "8 hours ago", comment: "Hurts downtown workers" }
    ],
    demographics: {
      byAge: [
        { range: "18-30", yes: 45, no: 25 },
        { range: "31-50", yes: 38, no: 18 },
        { range: "51+", yes: 21, no: 9 }
      ]
    }
  }
};

export default function PollDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const poll = pollData[Number(id) as keyof typeof pollData];
  
  if (!poll) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-medium text-muted-foreground">Poll not found</p>
        <Button onClick={() => navigate('/polls')} className="mt-4">
          Back to Polls
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/polls')}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Polls
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-foreground">{poll.title}</h1>
            <Badge variant="default">Active</Badge>
          </div>
          <p className="text-muted-foreground">Created {poll.createdAt} • Ends {poll.endDate}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <StopCircle className="h-4 w-4" />
            End Early
          </Button>
          <Button size="sm" className="gap-2">
            <Send className="h-4 w-4" />
            Send Reminder
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Question & Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Poll Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Question</h3>
                <p className="text-muted-foreground">{poll.question}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Yes</span>
                    <span className="text-sm text-muted-foreground">
                      {poll.results.yes.count} votes ({poll.results.yes.percentage}%)
                    </span>
                  </div>
                  <Progress value={poll.results.yes.percentage} className="h-3" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">No</span>
                    <span className="text-sm text-muted-foreground">
                      {poll.results.no.count} votes ({poll.results.no.percentage}%)
                    </span>
                  </div>
                  <Progress value={poll.results.no.percentage} className="h-3" />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{poll.responses}</p>
                  <p className="text-sm text-muted-foreground">Total Responses</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">{poll.responseRate}</p>
                  <p className="text-sm text-muted-foreground">Response Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-warning">3</p>
                  <p className="text-sm text-muted-foreground">Days Left</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demographics */}
          <Card>
            <CardHeader>
              <CardTitle>Response Demographics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="font-medium">By Age Group</h4>
                {poll.demographics.byAge.map((age, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{age.range}</span>
                      <span>{age.yes + age.no} responses</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Yes</span>
                          <span>{age.yes}</span>
                        </div>
                        <Progress value={(age.yes / (age.yes + age.no)) * 100} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>No</span>
                          <span>{age.no}</span>
                        </div>
                        <Progress value={(age.no / (age.yes + age.no)) * 100} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Responses */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {poll.recentResponses.map((response, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{response.name}</span>
                        <Badge 
                          variant={response.response === 'Yes' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {response.response}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{response.time}</span>
                    </div>
                    {response.comment && (
                      <p className="text-sm text-muted-foreground italic">"{response.comment}"</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Poll Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Time Left</span>
                  <span className="text-sm font-medium">{poll.timeLeft}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">End Date</span>
                  <span className="text-sm font-medium">{poll.endDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Channels</span>
                  <span className="text-sm font-medium">{poll.channels.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Reach</span>
                  <span className="text-sm font-medium">{poll.reach}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Response Rate</span>
                  <span className="text-sm font-medium text-success">{poll.responseRate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Calendar className="h-4 w-4" />
                Extend Duration
              </Button>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Send className="h-4 w-4" />
                Send Reminder
              </Button>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <TrendingUp className="h-4 w-4" />
                Export Data
              </Button>
              <Button variant="destructive" size="sm" className="w-full gap-2">
                <StopCircle className="h-4 w-4" />
                End Poll Early
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
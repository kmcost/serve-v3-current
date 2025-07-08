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
  },
  2: {
    id: 2,
    title: "Should we reopen the community pool?",
    type: "Poll",
    status: "Active",
    question: "Should we reopen the community pool?",
    description: "Community input on reopening the local swimming pool facility.",
    responses: 89,
    timeLeft: "5 days remaining",
    createdAt: "2 hours ago",
    endDate: "January 18, 2024",
    channels: ["Facebook", "SMS", "Email"],
    reach: "1,243 residents",
    responseRate: "18%",
    results: {
      yes: { count: 62, percentage: 70 },
      no: { count: 27, percentage: 30 }
    },
    recentResponses: [
      { name: "Alex P.", response: "Yes", time: "1 hour ago", comment: "Great for families" },
      { name: "Maria G.", response: "Yes", time: "3 hours ago", comment: "Kids need this" }
    ],
    demographics: {
      byAge: [
        { range: "18-30", yes: 25, no: 8 },
        { range: "31-50", yes: 28, no: 12 },
        { range: "51+", yes: 9, no: 7 }
      ]
    }
  },
  3: {
    id: 3,
    title: "Are you in favor of the operation of golf carts on village streets?",
    type: "Poll",
    status: "Active",
    question: "Are you in favor of the operation of golf carts on village streets?",
    description: "Survey regarding golf cart usage on public village streets.",
    responses: 45,
    timeLeft: "2 days remaining",
    createdAt: "Friday",
    endDate: "January 12, 2024",
    channels: ["Facebook", "SMS", "Email"],
    reach: "567 residents",
    responseRate: "22%",
    results: {
      yes: { count: 28, percentage: 62 },
      no: { count: 17, percentage: 38 }
    },
    recentResponses: [
      { name: "Tom W.", response: "Yes", time: "4 hours ago", comment: "Convenient transportation" },
      { name: "Linda S.", response: "No", time: "6 hours ago", comment: "Safety concerns" }
    ],
    demographics: {
      byAge: [
        { range: "18-30", yes: 8, no: 5 },
        { range: "31-50", yes: 12, no: 8 },
        { range: "51+", yes: 8, no: 4 }
      ]
    }
  },
  4: {
    id: 4,
    title: "How would you like to receive council updates?",
    type: "Survey",
    status: "Active",
    question: "How would you like to receive council updates?",
    description: "Preference survey for communication methods.",
    responses: 134,
    timeLeft: "1 week remaining",
    createdAt: "2 weeks ago",
    endDate: "January 20, 2024",
    channels: ["Facebook"],
    reach: "982 residents",
    responseRate: "28%",
    results: {
      email: { count: 67, percentage: 50 },
      sms: { count: 40, percentage: 30 },
      facebook: { count: 27, percentage: 20 }
    },
    recentResponses: [
      { name: "Jennifer L.", response: "Email", time: "1 day ago", comment: "Most convenient" },
      { name: "Robert K.", response: "SMS", time: "2 days ago", comment: "Quick updates" }
    ],
    demographics: {
      byAge: [
        { range: "18-30", yes: 35, no: 15 },
        { range: "31-50", yes: 45, no: 20 },
        { range: "51+", yes: 54, no: 10 }
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
                {'yes' in poll.results ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Email</span>
                        <span className="text-sm text-muted-foreground">
                          {poll.results.email.count} votes ({poll.results.email.percentage}%)
                        </span>
                      </div>
                      <Progress value={poll.results.email.percentage} className="h-3" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">SMS</span>
                        <span className="text-sm text-muted-foreground">
                          {poll.results.sms.count} votes ({poll.results.sms.percentage}%)
                        </span>
                      </div>
                      <Progress value={poll.results.sms.percentage} className="h-3" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Facebook</span>
                        <span className="text-sm text-muted-foreground">
                          {poll.results.facebook.count} votes ({poll.results.facebook.percentage}%)
                        </span>
                      </div>
                      <Progress value={poll.results.facebook.percentage} className="h-3" />
                    </div>
                  </>
                )}
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
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
    title: "Community Center Improvements",
    type: "Survey",
    status: "Active",
    question: "What improvements would you like to see at the community center?",
    description: "Survey to gather input on potential community center upgrades and improvements.",
    responses: 89,
    timeLeft: "5 days remaining",
    createdAt: "2 hours ago",
    endDate: "January 20, 2024",
    channels: ["Email", "SMS"],
    reach: "1,243 residents",
    responseRate: "18%",
    results: {
      fitness: { count: 35, percentage: 39 },
      programs: { count: 28, percentage: 31 },
      renovations: { count: 26, percentage: 30 }
    },
    recentResponses: [
      { name: "Alex P.", response: "Fitness equipment", time: "1 hour ago", comment: "Need better gym facilities" },
      { name: "Maria G.", response: "Youth programs", time: "3 hours ago", comment: "More activities for kids" }
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
    title: "Support for new bike lanes on Main St?",
    type: "Poll",
    status: "Active",
    question: "Do you support adding new bike lanes on Main Street?",
    description: "Gathering community input on proposed bike lane installation along Main Street corridor.",
    responses: 203,
    timeLeft: "2 days remaining",
    createdAt: "Friday",
    endDate: "January 22, 2024",
    channels: ["Facebook", "SMS", "Email"],
    reach: "2,100 residents",
    responseRate: "31%",
    results: {
      yes: { count: 132, percentage: 65 },
      no: { count: 71, percentage: 35 }
    },
    recentResponses: [
      { name: "Tom W.", response: "Yes", time: "4 hours ago", comment: "Great for cyclists and environment" },
      { name: "Linda S.", response: "No", time: "6 hours ago", comment: "Will reduce parking spaces" }
    ],
    demographics: {
      byAge: [
        { range: "18-30", yes: 45, no: 15 },
        { range: "31-50", yes: 52, no: 28 },
        { range: "51+", yes: 35, no: 28 }
      ]
    }
  },
  4: {
    id: 4,
    title: "Reopen Community Pool",
    type: "Survey",
    status: "Active",
    question: "Should we reopen the community pool this summer?",
    description: "Survey to determine community interest in reopening the pool facility.",
    responses: 219,
    timeLeft: "1 week remaining",
    createdAt: "2 weeks ago",
    endDate: "January 18, 2024",
    channels: ["Facebook", "Email", "SMS"],
    reach: "1,500 residents",
    responseRate: "42%",
    results: {
      yes: { count: 154, percentage: 70 },
      no: { count: 65, percentage: 30 }
    },
    recentResponses: [
      { name: "Jennifer L.", response: "Yes", time: "1 day ago", comment: "Kids need summer activities" },
      { name: "Robert K.", response: "Yes", time: "2 days ago", comment: "Great for community health" }
    ],
    demographics: {
      byAge: [
        { range: "18-30", yes: 45, no: 15 },
        { range: "31-50", yes: 65, no: 25 },
        { range: "51+", yes: 44, no: 25 }
      ]
    }
  },
  5: {
    id: 5,
    title: "Weekend farmers market location",
    type: "Poll",
    status: "Active",
    question: "Where should we relocate the weekend farmers market?",
    description: "Poll to determine the best location for the weekend farmers market.",
    responses: 342,
    timeLeft: "Completed",
    createdAt: "3 weeks ago",
    endDate: "January 12, 2024",
    channels: ["Facebook", "Email"],
    reach: "2,800 residents",
    responseRate: "38%",
    results: {
      downtown: { count: 189, percentage: 55 },
      park: { count: 103, percentage: 30 },
      school: { count: 50, percentage: 15 }
    },
    recentResponses: [
      { name: "Sarah M.", response: "Downtown Plaza", time: "2 weeks ago", comment: "More foot traffic downtown" },
      { name: "Mike R.", response: "City Park", time: "2 weeks ago", comment: "More parking available" }
    ],
    demographics: {
      byAge: [
        { range: "18-30", yes: 85, no: 25 },
        { range: "31-50", yes: 142, no: 48 },
        { range: "51+", yes: 115, no: 27 }
      ]
    }
  },
  6: {
    id: 6,
    title: "Public Library Hours Survey",
    type: "Survey", 
    status: "Active",
    question: "What library hours would work best for you?",
    description: "Survey to optimize public library operating hours based on community needs.",
    responses: 156,
    timeLeft: "1 week remaining",
    createdAt: "1 week ago",
    endDate: "February 5, 2024",
    channels: ["Email", "Website"],
    reach: "1,200 residents",
    responseRate: "29%",
    results: {
      extended: { count: 78, percentage: 50 },
      current: { count: 47, percentage: 30 },
      reduced: { count: 31, percentage: 20 }
    },
    recentResponses: [
      { name: "David K.", response: "Extended hours", time: "2 days ago", comment: "Need evening access" },
      { name: "Lisa P.", response: "Current hours", time: "1 day ago", comment: "Current schedule works fine" }
    ],
    demographics: {
      byAge: [
        { range: "18-30", yes: 45, no: 12 },
        { range: "31-50", yes: 58, no: 18 },
        { range: "51+", yes: 53, no: 15 }
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
                {Object.entries(poll.results).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      <span className="text-sm text-muted-foreground">
                        {value.count} votes ({value.percentage}%)
                      </span>
                    </div>
                    <Progress value={value.percentage} className="h-3" />
                  </div>
                ))}
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
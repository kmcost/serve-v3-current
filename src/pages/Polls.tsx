import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Plus, 
  BarChart3, 
  MessageSquare,
  Clock,
  Users,
  CheckCircle
} from 'lucide-react';

const activePollsData = [
  {
    id: 1,
    title: "Should we extend parking meter hours downtown?",
    type: "Poll",
    responses: 156,
    timeLeft: "3 days left",
    status: "active",
    engagement: "24%"
  },
  {
    id: 2,
    title: "Community Center Improvements",
    type: "Survey",
    responses: 89,
    timeLeft: "5 days left",
    status: "active",
    engagement: "18%"
  },
  {
    id: 3,
    title: "Support for new bike lanes on Main St?",
    type: "Poll", 
    responses: 203,
    timeLeft: "1 day left",
    status: "active",
    engagement: "31%"
  },
  {
    id: 4,
    title: "Reopen Community Pool",
    type: "Survey",
    responses: 219,
    timeLeft: "Closed",
    status: "needs_review",
    engagement: "42%"
  }
];

const closedPollsData = [
  {
    id: 5,
    title: "Weekend farmers market location",
    type: "Poll",
    responses: 342,
    timeLeft: "Closed 2 days ago",
    status: "closed",
    engagement: "38%"
  },
  {
    id: 6,
    title: "Public Library Hours Survey",
    type: "Survey",
    responses: 156,
    timeLeft: "Closed 1 week ago", 
    status: "closed",
    engagement: "29%"
  }
];

export default function Polls() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('active');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'needs_review':
        return <Badge className="bg-warning text-warning-foreground">Needs Review</Badge>;
      case 'closed':
        return <Badge variant="secondary">Closed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'Poll' ? <BarChart3 className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />;
  };

  const PollCard = ({ poll }: { poll: typeof activePollsData[0] }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold leading-6">{poll.title}</CardTitle>
          {getStatusBadge(poll.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            {getTypeIcon(poll.type)}
            <span>{poll.type}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{poll.responses} responses</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{poll.timeLeft}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="text-sm">
            <span className="text-muted-foreground">Engagement: </span>
            <span className="font-semibold text-primary">{poll.engagement}</span>
          </div>
          <Link to={`/polls/${poll.id}`}>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Polls & Surveys</h1>
          <p className="text-muted-foreground">Manage your constituent engagement</p>
        </div>
        <Link to="/polls/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create New
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search polls and surveys..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activePollsData
              .filter(poll => poll.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((poll) => (
                <PollCard key={poll.id} poll={poll} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="closed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {closedPollsData
              .filter(poll => poll.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((poll) => (
                <PollCard key={poll.id} poll={poll} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
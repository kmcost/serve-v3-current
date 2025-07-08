import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  MessageSquare, 
  BarChart3, 
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

const issuesData = [
  {
    id: 1,
    title: "Parking enforcement downtown",
    description: "Concerns about aggressive parking enforcement and meter hour extensions in the downtown business district.",
    status: "in_progress",
    createdAt: "2 weeks ago",
    updatedAt: "3 days ago",
    messageCount: 15,
    pollCount: 1,
    surveyCount: 0,
    interestedCount: 28
  },
  {
    id: 2,
    title: "Street lighting on Oak Ave",
    description: "Multiple reports of broken or inadequate street lighting along Oak Avenue between 3rd and 8th streets.",
    status: "open",
    createdAt: "1 week ago",
    updatedAt: "2 days ago",
    messageCount: 8,
    pollCount: 0,
    surveyCount: 1,
    interestedCount: 12
  },
  {
    id: 3,
    title: "Dog park funding",
    description: "Community requests for dedicated dog park space and funding allocation in the district.",
    status: "in_progress",
    createdAt: "3 weeks ago",
    updatedAt: "1 day ago",
    messageCount: 23,
    pollCount: 3,
    surveyCount: 1,
    interestedCount: 45
  },
  {
    id: 4,
    title: "Community pool hours",
    description: "Requests to extend community pool operating hours during summer months.",
    status: "resolved",
    createdAt: "1 month ago",
    updatedAt: "1 week ago",
    messageCount: 12,
    pollCount: 2,
    surveyCount: 0,
    interestedCount: 32
  },
  {
    id: 5,
    title: "Noise ordinance enforcement",
    description: "Complaints about construction noise violations and inconsistent enforcement of noise ordinances.",
    status: "open",
    createdAt: "5 days ago",
    updatedAt: "1 day ago",
    messageCount: 6,
    pollCount: 0,
    surveyCount: 0,
    interestedCount: 9
  },
  {
    id: 6,
    title: "Bike lane maintenance",
    description: "Safety concerns about potholes and debris in bike lanes throughout the district.",
    status: "in_progress",
    createdAt: "10 days ago",
    updatedAt: "4 days ago",
    messageCount: 11,
    pollCount: 1,
    surveyCount: 0,
    interestedCount: 16
  },
  {
    id: 7,
    title: "Public transportation access",
    description: "Requests for improved bus stop amenities and schedule reliability.",
    status: "open",
    createdAt: "6 days ago",
    updatedAt: "2 days ago",
    messageCount: 4,
    pollCount: 0,
    surveyCount: 0,
    interestedCount: 7
  }
];

export default function Issues() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIssues = issuesData.filter(issue =>
    issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'open':
        return { 
          label: 'Open', 
          variant: 'outline' as const, 
          icon: AlertTriangle, 
          color: 'text-warning' 
        };
      case 'in_progress':
        return { 
          label: 'In Progress', 
          variant: 'default' as const, 
          icon: Clock, 
          color: 'text-primary' 
        };
      case 'resolved':
        return { 
          label: 'Resolved', 
          variant: 'secondary' as const, 
          icon: CheckCircle, 
          color: 'text-success' 
        };
      default:
        return { 
          label: 'Unknown', 
          variant: 'outline' as const, 
          icon: AlertTriangle, 
          color: 'text-muted-foreground' 
        };
    }
  };

  const activeIssues = issuesData.filter(i => i.status !== 'resolved').length;
  const resolvedIssues = issuesData.filter(i => i.status === 'resolved').length;
  const totalMessages = issuesData.reduce((sum, issue) => sum + issue.messageCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Issues</h1>
          <p className="text-muted-foreground">
            {activeIssues} active • {resolvedIssues} resolved • {totalMessages} total messages
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Issue
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Open Issues</p>
                <p className="text-2xl font-bold">{issuesData.filter(i => i.status === 'open').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{issuesData.filter(i => i.status === 'in_progress').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold">{resolvedIssues}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search issues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.map((issue) => {
          const statusInfo = getStatusInfo(issue.status);
          const StatusIcon = statusInfo.icon;
          
          return (
            <Card key={issue.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-lg font-semibold">{issue.title}</CardTitle>
                      <Badge variant={statusInfo.variant} className="gap-1">
                        <StatusIcon className="h-3 w-3" />
                        {statusInfo.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {issue.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Created {issue.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Updated {issue.updatedAt}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-3 border-t">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                      <MessageSquare className="h-4 w-4" />
                      Messages
                    </div>
                    <p className="text-lg font-semibold">{issue.messageCount}</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                      <BarChart3 className="h-4 w-4" />
                      Polls
                    </div>
                    <p className="text-lg font-semibold">{issue.pollCount}</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                      <MessageSquare className="h-4 w-4" />
                      Surveys
                    </div>
                    <p className="text-lg font-semibold">{issue.surveyCount}</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                      <Users className="h-4 w-4" />
                      Interested
                    </div>
                    <p className="text-lg font-semibold">{issue.interestedCount}</p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Link to={`/issues/${issue.id}`}>
                    <Button variant="outline">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredIssues.length === 0 && (
        <div className="text-center py-12">
          <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium text-muted-foreground">No issues found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or create a new issue.
          </p>
        </div>
      )}
    </div>
  );
}
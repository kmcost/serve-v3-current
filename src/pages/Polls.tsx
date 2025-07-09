import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { 
  Search, 
  Filter, 
  Plus, 
  BarChart3, 
  MessageSquare,
  Clock,
  Users,
  CheckCircle,
  Grid3X3,
  List,
  ArrowUpDown
} from 'lucide-react';

const allPollsData = [
  {
    id: 1,
    title: "Should we extend parking meter hours downtown?",
    type: "Poll",
    responses: 156,
    expectedResponses: 200,
    startDate: "2024-01-15",
    endDate: "2024-01-25",
    status: "in_progress",
    engagement: "24%"
  },
  {
    id: 2,
    title: "Community Center Improvements",
    type: "Survey",
    responses: 89,
    expectedResponses: 150,
    startDate: "2024-01-10",
    endDate: "2024-01-20",
    status: "in_progress",
    engagement: "18%"
  },
  {
    id: 3,
    title: "Support for new bike lanes on Main St?",
    type: "Poll", 
    responses: 203,
    expectedResponses: 250,
    startDate: "2024-01-18",
    endDate: "2024-01-22",
    status: "in_progress",
    engagement: "31%"
  },
  {
    id: 4,
    title: "Reopen Community Pool",
    type: "Survey",
    responses: 219,
    expectedResponses: 200,
    startDate: "2024-01-08",
    endDate: "2024-01-18",
    status: "completed",
    engagement: "42%"
  },
  {
    id: 5,
    title: "Weekend farmers market location",
    type: "Poll",
    responses: 342,
    expectedResponses: 300,
    startDate: "2024-01-01",
    endDate: "2024-01-12",
    status: "completed",
    engagement: "38%"
  },
  {
    id: 6,
    title: "Public Library Hours Survey",
    type: "Survey",
    responses: 156,
    expectedResponses: 200,
    startDate: "2024-01-25",
    endDate: "2024-02-05",
    status: "not_started",
    engagement: "29%"
  }
];

export default function Polls() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortField, setSortField] = useState<string>('startDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_progress':
        return <Badge variant="default">In Progress</Badge>;
      case 'not_started':
        return <Badge variant="secondary">Not Started</Badge>;
      case 'completed':
        return <Badge className="bg-green-600 text-white hover:bg-green-600/80">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'Poll' ? <BarChart3 className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />;
  };

  const calculateProgress = (responses: number, expectedResponses: number) => {
    return Math.min((responses / expectedResponses) * 100, 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getDaysLeft = (endDate: string, status: string) => {
    if (status === 'completed') return 'Completed';
    if (status === 'not_started') return 'Not Started';
    
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Ends today';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };

  const sortedAndFilteredPolls = allPollsData
    .filter(poll => poll.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      let aValue: any = a[sortField as keyof typeof a];
      let bValue: any = b[sortField as keyof typeof b];
      
      if (sortField === 'startDate' || sortField === 'endDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const PollCard = ({ poll }: { poll: typeof allPollsData[0] }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Link to={`/polls/${poll.id}`} className="hover:text-primary transition-colors">
            <CardTitle className="text-lg font-semibold leading-6">{poll.title}</CardTitle>
          </Link>
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
            <span>{getDaysLeft(poll.endDate, poll.status)}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold">{Math.round(calculateProgress(poll.responses, poll.expectedResponses))}%</span>
          </div>
          <Progress value={calculateProgress(poll.responses, poll.expectedResponses)} className="h-2" />
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="text-sm">
            <span className="text-muted-foreground">{poll.responses}/{poll.expectedResponses} responses</span>
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

      {/* Search, Filters, and View Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
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
        
        {/* View Toggle */}
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'grid' | 'list')}>
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <Grid3X3 className="h-4 w-4" />
            <span className="ml-2">Grid</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="h-4 w-4" />
            <span className="ml-2">List</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedAndFilteredPolls.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    className="h-auto p-0 font-medium"
                    onClick={() => handleSort('status')}
                  >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    className="h-auto p-0 font-medium"
                    onClick={() => handleSort('type')}
                  >
                    Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    className="h-auto p-0 font-medium"
                    onClick={() => handleSort('title')}
                  >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    className="h-auto p-0 font-medium"
                    onClick={() => handleSort('startDate')}
                  >
                    Start Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    className="h-auto p-0 font-medium"
                    onClick={() => handleSort('endDate')}
                  >
                    End Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAndFilteredPolls.map((poll) => (
                <TableRow key={poll.id}>
                  <TableCell>{getStatusBadge(poll.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(poll.type)}
                      <span>{poll.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link 
                      to={`/polls/${poll.id}`} 
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {poll.title}
                    </Link>
                  </TableCell>
                  <TableCell>{formatDate(poll.startDate)}</TableCell>
                  <TableCell>{formatDate(poll.endDate)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={calculateProgress(poll.responses, poll.expectedResponses)} 
                        className="h-2 w-16" 
                      />
                      <span className="text-sm text-muted-foreground">
                        {Math.round(calculateProgress(poll.responses, poll.expectedResponses))}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
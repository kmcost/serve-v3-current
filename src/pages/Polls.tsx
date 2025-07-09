import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Search, Filter, Plus, BarChart3, MessageSquare, Clock, Users, CheckCircle, Grid3X3, List, ArrowUpDown } from 'lucide-react';
const allPollsData = [{
  id: 1,
  title: "Should we extend parking meter hours downtown?",
  type: "Poll",
  responses: 156,
  expectedResponses: 200,
  startDate: "2024-01-15",
  endDate: "2024-01-25",
  status: "in_progress",
  engagement: "24%"
}, {
  id: 2,
  title: "Community Center Improvements",
  type: "Survey",
  responses: 89,
  expectedResponses: 150,
  startDate: "2024-01-10",
  endDate: "2024-01-20",
  status: "in_progress",
  engagement: "18%"
}, {
  id: 3,
  title: "Should we add new bike lanes on Main Street?",
  type: "Poll",
  responses: 203,
  expectedResponses: 250,
  startDate: "2024-01-18",
  endDate: "2024-01-22",
  status: "in_progress",
  engagement: "31%"
}, {
  id: 4,
  title: "Reopen Community Pool",
  type: "Survey",
  responses: 219,
  expectedResponses: 200,
  startDate: "2024-01-08",
  endDate: "2024-01-18",
  status: "completed",
  engagement: "42%"
}, {
  id: 5,
  title: "Weekend farmers market location",
  type: "Poll",
  responses: 342,
  expectedResponses: 300,
  startDate: "2024-01-01",
  endDate: "2024-01-12",
  status: "completed",
  engagement: "38%"
}, {
  id: 6,
  title: "Public Library Hours Survey",
  type: "Survey",
  responses: 156,
  expectedResponses: 200,
  startDate: "2024-01-25",
  endDate: "2024-02-05",
  status: "not_started",
  engagement: "29%"
}];
export default function Polls() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortField, setSortField] = useState<string>('startDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_progress':
        return <Badge variant="default" className="whitespace-nowrap">In Progress</Badge>;
      case 'not_started':
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100/80 whitespace-nowrap">Not Started</Badge>;
      case 'completed':
        return <Badge className="bg-green-600 text-white hover:bg-green-600/80 whitespace-nowrap">Completed</Badge>;
      default:
        return <Badge variant="outline" className="whitespace-nowrap">Unknown</Badge>;
    }
  };
  const getTypeIcon = (type: string) => {
    return type === 'Poll' ? <BarChart3 className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />;
  };
  const calculateProgress = (responses: number, expectedResponses: number) => {
    return Math.min(responses / expectedResponses * 100, 100);
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
  const sortedAndFilteredPolls = allPollsData.filter(poll => poll.title.toLowerCase().includes(searchTerm.toLowerCase())).sort((a, b) => {
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
  const PollCard = ({
    poll
  }: {
    poll: typeof allPollsData[0];
  }) => <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="space-y-3 px-0 py-0 my-0">
          {getStatusBadge(poll.status)}
          <Link to={`/polls/${poll.id}`} className="hover:text-primary transition-colors">
            <CardTitle className="text-lg font-semibold leading-6 py-[8px]">{poll.title}</CardTitle>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{poll.responses} responses</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold">{Math.round(calculateProgress(poll.responses, poll.expectedResponses))}%</span>
            </div>
            <Progress value={calculateProgress(poll.responses, poll.expectedResponses)} className="h-2" />
          </div>
        </div>
        
        <Link to={`/polls/${poll.id}`} className="block">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>;
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Polls & Surveys</h1>
          <p className="text-muted-foreground">Manage your constituent engagement</p>
        </div>
        <Link to="/polls/create" className="w-full">
          <Button className="gap-2 w-full">
            <Plus className="h-4 w-4" />
            Create New
          </Button>
        </Link>
      </div>

      {/* Search, Filters, and View Toggle */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search polls and surveys..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
        
        {/* View Toggle */}
        <div className="relative bg-muted/50 p-1 rounded-xl border">
          <ToggleGroup type="single" value={viewMode} onValueChange={value => value && setViewMode(value as 'grid' | 'list')} className="grid grid-cols-2 gap-0 bg-transparent">
            <ToggleGroupItem value="grid" aria-label="Grid view" className="relative flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-transparent border-0 text-muted-foreground font-medium transition-all duration-200 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm hover:text-foreground">
              <Grid3X3 className="h-4 w-4" />
              <span className="text-sm font-medium">Grid</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view" className="relative flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-transparent border-0 text-muted-foreground font-medium transition-all duration-200 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm hover:text-foreground">
              <List className="h-4 w-4" />
              <span className="text-sm font-medium">List</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedAndFilteredPolls.map(poll => <PollCard key={poll.id} poll={poll} />)}
        </div> : <div className="border rounded-lg bg-white">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>
                  <Button variant="ghost" className="h-auto p-0 font-medium" onClick={() => handleSort('status')}>
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" className="h-auto p-0 font-medium" onClick={() => handleSort('title')}>
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" className="h-auto p-0 font-medium" onClick={() => handleSort('responses')}>
                    # of Responses
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAndFilteredPolls.map((poll, index) => <TableRow key={poll.id} className={`hover:bg-transparent ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}>
                  <TableCell>{getStatusBadge(poll.status)}</TableCell>
                  <TableCell>
                    <Link to={`/polls/${poll.id}`} className="font-medium hover:text-primary transition-colors">
                      {poll.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{poll.responses}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={calculateProgress(poll.responses, poll.expectedResponses)} className="h-2 w-16" />
                      <span className="text-sm text-muted-foreground">
                        {Math.round(calculateProgress(poll.responses, poll.expectedResponses))}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </div>}
    </div>;
}
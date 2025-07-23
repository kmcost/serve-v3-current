import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Search, Plus, Filter } from 'lucide-react';
import { pollData } from '@/data/pollData';
import { StatusBadge } from '@/components/ui/status-badge';
import { QuestionInput } from '@/components/QuestionInput';
import { ActiveOutreach } from '@/components/dashboard/ActiveOutreach';
import { getPollStatus } from '@/utils/pollUtils';
export default function Polls() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Convert pollData object to array for easier manipulation
  const allPollsData = Object.values(pollData).map(poll => ({
    id: poll.id,
    title: poll.title,
    type: poll.type,
    responses: poll.responses,
    expectedResponses: 200, // Default expected responses
    startDate: poll.startDate,
    endDate: poll.endDate,
    engagement: poll.responseRate
  }));

  const getStatusBadge = (startDate: string, endDate: string) => {
    return <StatusBadge startDate={startDate} endDate={endDate} className="whitespace-nowrap" />;
  };
  const calculateProgress = (responses: number, expectedResponses: number) => {
    return Math.min(responses / expectedResponses * 100, 100);
  };
  // Custom sorting function for status-based ordering
  const getStatusOrder = (status: string) => {
    switch (status) {
      case 'Not Started': return 1; // Scheduled
      case 'Active': return 2; // In Progress  
      case 'Completed': return 3; // Done
      default: return 4;
    }
  };

  const sortedAndFilteredPolls = allPollsData
    .filter(poll => poll.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const statusA = getPollStatus(a.startDate, a.endDate);
      const statusB = getPollStatus(b.startDate, b.endDate);
      
      // First sort by status order
      const statusOrderA = getStatusOrder(statusA);
      const statusOrderB = getStatusOrder(statusB);
      
      if (statusOrderA !== statusOrderB) {
        return statusOrderA - statusOrderB;
      }
      
      // Within same status, sort by relevant date
      const parseDate = (dateStr: string) => {
        // Handle both "YYYY-MM-DD" and "Month DD, YYYY" formats
        return new Date(dateStr);
      };
      
      if (statusA === 'Not Started') {
        // Scheduled: Sort by start date (earliest first)
        return parseDate(a.startDate).getTime() - parseDate(b.startDate).getTime();
      } else if (statusA === 'Active') {
        // In Progress: Sort by end date (earliest deadline first)
        return parseDate(a.endDate).getTime() - parseDate(b.endDate).getTime();
      } else {
        // Done: Sort by end date (most recently completed first)
        return parseDate(b.endDate).getTime() - parseDate(a.endDate).getTime();
      }
    });
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Polls & Surveys</h1>
          <p className="text-muted-foreground">Manage your constituent engagement</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link to="/polls/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Poll
            </Button>
          </Link>
        </div>
      </div>

      {/* Question Input */}
      <QuestionInput />

      {/* Active Outreach */}
      <ActiveOutreach />

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Status</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="whitespace-nowrap">Responses</TableHead>
              <TableHead>Progress</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAndFilteredPolls.map((poll, index) => <TableRow key={poll.id} className={`hover:bg-transparent ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}>
                <TableCell>{getStatusBadge(poll.startDate, poll.endDate)}</TableCell>
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
      </div>
    </div>;
}
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MessageSquare, 
  Users, 
  AlertTriangle,
  Clock,
  Mail
} from 'lucide-react';

const messagesData = [
  {
    id: 1,
    from: "Maria Rodriguez",
    email: "maria.r@email.com",
    subject: "Broken streetlight on Elm St",
    preview: "There's a broken streetlight on Elm St between 5th and 6th. It's been out for a week...",
    time: "2 hours ago",
    relatedCount: 2,
    hasIssue: false,
    priority: "medium"
  },
  {
    id: 2,
    from: "John Kim",
    email: "john.kim@email.com", 
    subject: "Parking enforcement complaint",
    preview: "The parking enforcement officers have been very aggressive lately. I got a ticket...",
    time: "4 hours ago",
    relatedCount: 0,
    hasIssue: false,
    priority: "low"
  },
  {
    id: 3,
    from: "Lisa Thompson",
    email: "lisa.t@email.com",
    subject: "Dog park funding",
    preview: "I wanted to follow up on the proposed dog park funding. Many residents in my neighborhood...",
    time: "1 day ago",
    relatedCount: 0,
    hasIssue: true,
    priority: "high"
  },
  {
    id: 4,
    from: "Robert Chen",
    email: "rchen@oaklandresident.org",
    subject: "Community center hours",
    preview: "Could you please consider extending the community center hours? Many working parents...",
    time: "1 day ago",
    relatedCount: 5,
    hasIssue: false,
    priority: "medium"
  },
  {
    id: 5,
    from: "Patricia Williams",
    email: "p.williams@email.com",
    subject: "Noise ordinance violation",
    preview: "There's a construction site that starts work at 6 AM every day, which violates the noise...",
    time: "2 days ago",
    relatedCount: 3,
    hasIssue: false,
    priority: "high"
  },
  {
    id: 6,
    from: "David Martinez",
    email: "d.martinez@email.com",
    subject: "Bike lane maintenance",
    preview: "The bike lane on Telegraph Avenue has several potholes that need attention...",
    time: "2 days ago",
    relatedCount: 1,
    hasIssue: false,
    priority: "medium"
  },
  {
    id: 7,
    from: "Angela Foster",
    email: "afoster@email.com",
    subject: "Public transportation concerns",
    preview: "The bus stops in our area don't have adequate shelter or seating...",
    time: "3 days ago",
    relatedCount: 0,
    hasIssue: false,
    priority: "low"
  },
  {
    id: 8,
    from: "Michael Brown",
    email: "mbrown@email.com",
    subject: "Street cleaning schedule",
    preview: "The street cleaning schedule in our neighborhood seems inconsistent...",
    time: "3 days ago",
    relatedCount: 2,
    hasIssue: false,
    priority: "low"
  }
];

export default function Inbox() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMessages = messagesData.filter(message =>
    message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-destructive';
      case 'medium':
        return 'border-l-warning';
      case 'low':
        return 'border-l-muted-foreground';
      default:
        return 'border-l-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Inbox</h1>
          <p className="text-muted-foreground">
            {filteredMessages.length} messages • {messagesData.filter(m => m.relatedCount > 0).length} with related messages
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="gap-1">
            <MessageSquare className="h-3 w-3" />
            {messagesData.filter(m => !m.hasIssue && m.relatedCount === 0).length} New
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Users className="h-3 w-3" />
            {messagesData.filter(m => m.relatedCount > 0).length} Related
          </Badge>
          <Badge variant="outline" className="gap-1">
            <AlertTriangle className="h-3 w-3" />
            {messagesData.filter(m => m.hasIssue).length} Issues
          </Badge>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Messages List */}
      <div className="space-y-3">
        {filteredMessages.map((message) => (
          <Card 
            key={message.id} 
            className={`hover:shadow-md transition-shadow border-l-4 ${getPriorityColor(message.priority)}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground truncate">
                      {message.from}
                    </h3>
                    <div className="flex gap-1">
                      {message.relatedCount > 0 && (
                        <Badge variant="secondary" className="text-xs gap-1">
                          <Users className="h-3 w-3" />
                          {message.relatedCount} Similar
                        </Badge>
                      )}
                      {message.hasIssue && (
                        <Badge variant="outline" className="text-xs gap-1 border-success text-success">
                          <AlertTriangle className="h-3 w-3" />
                          Issue
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm font-medium text-foreground mb-1">
                    {message.subject}
                  </p>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {message.preview}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {message.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {message.time}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Link to={`/inbox/${message.id}`}>
                    <Button size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium text-muted-foreground">No messages found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or check back later for new messages.
          </p>
        </div>
      )}
    </div>
  );
}
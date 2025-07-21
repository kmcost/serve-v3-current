
import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Users, 
  AlertTriangle,
  Clock,
  Mail,
  Plus,
  CheckCircle
} from 'lucide-react';
import { MessageCard } from '@/components/inbox/MessageCard';
import { MessageFilters } from '@/components/inbox/MessageFilters';
import { BulkMessageActions } from '@/components/inbox/BulkMessageActions';
import { CreateIssueModal } from '@/components/inbox/CreateIssueModal';
import { 
  getEnhancedMessages, 
  createIssueFromMessage, 
  updateMessageStatus, 
  bulkUpdateMessages 
} from '@/services/inboxService';
import { EnhancedMessage } from '@/types/inbox';
import { ConstituentIssue } from '@/types/core';
import { toast } from '@/hooks/use-toast';

export default function Inbox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [createIssueModal, setCreateIssueModal] = useState<{
    isOpen: boolean;
    message: EnhancedMessage | null;
  }>({ isOpen: false, message: null });

  const { data: messages = [], isLoading, error, refetch } = useQuery({
    queryKey: ['inbox-messages'],
    queryFn: getEnhancedMessages,
  });

  // Filter messages based on search and filters
  const filteredMessages = useMemo(() => {
    return messages.filter(message => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          message.from.toLowerCase().includes(searchLower) ||
          message.subject.toLowerCase().includes(searchLower) ||
          message.message.toLowerCase().includes(searchLower) ||
          message.email.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Source filter
      if (selectedSources.length > 0 && !selectedSources.includes(message.source)) {
        return false;
      }

      // Status filter
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(message.status)) {
        return false;
      }

      // Priority filter
      if (selectedPriorities.length > 0 && !selectedPriorities.includes(message.priority)) {
        return false;
      }

      return true;
    });
  }, [messages, searchTerm, selectedSources, selectedStatuses, selectedPriorities]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = messages.length;
    const unread = messages.filter(m => !m.isRead).length;
    const responded = messages.filter(m => m.status === 'responded').length;
    const issuesCreated = messages.filter(m => m.status === 'issue-created').length;
    const highPriority = messages.filter(m => m.priority === 'high').length;
    const withRelatedIssues = messages.filter(m => m.relatedIssues && m.relatedIssues.length > 0).length;
    
    return {
      total,
      unread,
      responded,
      issuesCreated,
      highPriority,
      withRelatedIssues
    };
  }, [messages]);

  const handleSelectMessage = (messageId: string, selected: boolean) => {
    setSelectedMessages(prev => 
      selected 
        ? [...prev, messageId]
        : prev.filter(id => id !== messageId)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedMessages(checked ? filteredMessages.map(m => m.id) : []);
  };

  const handleClearSelection = () => {
    setSelectedMessages([]);
  };

  const handleCreateIssue = (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (message) {
      setCreateIssueModal({ isOpen: true, message });
    }
  };

  const handleCreateIssueSubmit = async (messageId: string, issueData: Partial<ConstituentIssue>) => {
    try {
      await createIssueFromMessage(messageId, issueData);
      toast({
        title: "Issue created successfully",
        description: "The message has been converted to a trackable issue",
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error creating issue",
        description: "Failed to create issue from message",
        variant: "destructive"
      });
    }
  };

  const handleBulkCreateIssues = async (messageIds: string[]) => {
    const promises = messageIds.map(id => {
      const message = messages.find(m => m.id === id);
      if (message) {
        return createIssueFromMessage(id, {
          title: message.subject,
          description: message.message,
          type: 'individual',
          priority: message.priority
        });
      }
      return Promise.resolve();
    });
    
    await Promise.all(promises);
    refetch();
  };

  const handleBulkStatusUpdate = async (messageIds: string[], status: string) => {
    await bulkUpdateMessages(messageIds, { status: status as any });
    refetch();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-48 mb-2"></div>
          <div className="h-4 bg-muted rounded w-64"></div>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-16 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="space-y-2">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="animate-pulse border-b border-border p-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-muted rounded-full mt-2"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-3 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-lg font-medium text-muted-foreground">Unable to load messages</p>
        <p className="text-sm text-muted-foreground mb-4">
          There was an error loading the inbox messages.
        </p>
        <Button onClick={() => refetch()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Inbox</h1>
          <p className="text-muted-foreground">
            {stats.total} messages • {stats.unread} unread • {stats.responded} responded • {stats.issuesCreated} issues created
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="gap-2 text-xs sm:text-sm">
            <Plus className="h-4 w-4" />
            <span className="hidden xs:inline">Compose Message</span>
            <span className="xs:hidden">Compose</span>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unread</p>
                <p className="text-2xl font-bold">{stats.unread}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageSquare className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Responded</p>
                <p className="text-2xl font-bold">{stats.responded}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold">{stats.highPriority}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Issues Created</p>
                <p className="text-2xl font-bold">{stats.issuesCreated}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <MessageFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedSources={selectedSources}
        onSourcesChange={setSelectedSources}
        selectedStatuses={selectedStatuses}
        onStatusesChange={setSelectedStatuses}
        selectedPriorities={selectedPriorities}
        onPrioritiesChange={setSelectedPriorities}
        totalMessages={messages.length}
        filteredCount={filteredMessages.length}
      />

      {/* Bulk Actions */}
      <BulkMessageActions
        selectedMessages={selectedMessages}
        onClearSelection={handleClearSelection}
        onBulkCreateIssues={handleBulkCreateIssues}
        onBulkStatusUpdate={handleBulkStatusUpdate}
      />

      {/* Select All - Always visible when there are messages */}
      {filteredMessages.length > 0 && (
        <Card className="bg-muted/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={selectedMessages.length === filteredMessages.length}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm font-medium">
                Select all {filteredMessages.length} messages
              </span>
              {selectedMessages.length > 0 && (
                <Badge variant="secondary">
                  {selectedMessages.length} selected
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Messages List - Clean list design */}
      <div className="bg-card rounded-lg border">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message) => (
            <MessageCard
              key={message.id}
              message={message}
              isSelected={selectedMessages.includes(message.id)}
              onSelect={handleSelectMessage}
              onCreateIssue={handleCreateIssue}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-muted-foreground">No messages found</p>
            <p className="text-sm text-muted-foreground mb-4">
              Try adjusting your search or filters, or check back later for new messages.
            </p>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Compose New Message
            </Button>
          </div>
        )}
      </div>

      {/* Create Issue Modal */}
      {createIssueModal.message && (
        <CreateIssueModal
          isOpen={createIssueModal.isOpen}
          onClose={() => setCreateIssueModal({ isOpen: false, message: null })}
          message={createIssueModal.message}
          onCreateIssue={handleCreateIssueSubmit}
        />
      )}
    </div>
  );
}

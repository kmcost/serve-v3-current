import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Mail, Phone, AlertTriangle, MessageSquare, Plus, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { MessageSourceBadge } from '@/components/inbox/MessageSourceBadge';
import { MessageStatusBadge } from '@/components/inbox/MessageStatusBadge';
import { CreateIssueModal } from '@/components/inbox/CreateIssueModal';
import { getMessageById, getMessageThread, createIssueFromMessage, updateMessageStatus } from '@/services/inboxService';
import { ConstituentIssue } from '@/types/core';
import { toast } from '@/hooks/use-toast';
export default function MessageDetail() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const [reply, setReply] = useState('');
  const [createIssueModal, setCreateIssueModal] = useState(false);
  const {
    data: message,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['message-detail', id],
    queryFn: () => getMessageById(id!),
    enabled: !!id
  });
  const {
    data: thread
  } = useQuery({
    queryKey: ['message-thread', id],
    queryFn: () => getMessageThread(id!),
    enabled: !!id
  });
  const handleCreateIssue = async (messageId: string, issueData: Partial<ConstituentIssue>) => {
    try {
      await createIssueFromMessage(messageId, issueData);
      toast({
        title: "Issue created successfully",
        description: "The message has been converted to a trackable issue"
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
  const handleMarkAsRead = async () => {
    if (message && !message.isRead) {
      await updateMessageStatus(message.id, 'read');
      refetch();
    }
  };
  const handleSendReply = async () => {
    if (reply.trim()) {
      await updateMessageStatus(message!.id, 'responded');
      setReply('');
      toast({
        title: "Reply sent",
        description: "Your response has been sent to the constituent"
      });
      refetch();
    }
  };
  if (isLoading) {
    return <div className="max-w-4xl mx-auto space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-48 mb-2"></div>
          <div className="h-4 bg-muted rounded w-64"></div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4">
            <Card className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-32 bg-muted rounded"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>;
  }
  if (!message) {
    return <div className="text-center py-12">
        <p className="text-lg font-medium text-muted-foreground">Message not found</p>
        <Button onClick={() => navigate('/inbox')} className="mt-4">
          Back to Inbox
        </Button>
      </div>;
  }

  // Mark as read when viewing
  if (!message.isRead) {
    handleMarkAsRead();
  }
  return <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/inbox')} className="gap-2 self-start">
          <ArrowLeft className="h-4 w-4" />
          Back to Inbox
        </Button>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">{message.subject}</h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">From {message.from} • {message.time}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Message */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Message Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <MessageSourceBadge source={message.source} />
                <MessageStatusBadge status={message.status} />
                {message.priority === 'high' && <Badge variant="outline" className="gap-1 text-xs bg-red-100 text-red-800 border-red-200">
                    <AlertTriangle className="h-3 w-3" />
                    High Priority
                  </Badge>}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{message.email}</span>
                  </div>
                  {message.phone && <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{message.phone}</span>
                    </div>}
                </div>
              </div>

              {/* Source-specific metadata */}
              {message.metadata}
              
              <div className="pt-4 border-t">
                <p className="text-foreground leading-relaxed">
                  {message.message}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Message Thread */}
          {thread && thread.messages.length > 1 && <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Conversation Thread ({thread.messages.length} messages)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {thread.messages.map((msg, index) => <div key={msg.id} className="p-4 border rounded-lg bg-accent/30">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{msg.from}</span>
                          <MessageSourceBadge source={msg.source} />
                        </div>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{msg.subject}</p>
                      <p className="text-sm line-clamp-3">{msg.message}</p>
                    </div>)}
                </div>
              </CardContent>
            </Card>}

          {/* Reply Section */}
          <Card>
            <CardHeader>
              <CardTitle>Reply to {message.from}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea placeholder={`Type your reply to ${message.from}...`} value={reply} onChange={e => setReply(e.target.value)} className="min-h-[120px]" />
              <div className="flex gap-2">
                <Button onClick={handleSendReply} disabled={!reply.trim()}>
                  Send Reply
                </Button>
                <Button variant="outline">Save Draft</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {message.status !== 'issue-created' && <Button className="w-full gap-2" onClick={() => setCreateIssueModal(true)}>
                  <Plus className="h-4 w-4" />
                  Create Issue
                </Button>}
              
              <Button variant="outline" className="w-full gap-2">
                <MessageSquare className="h-4 w-4" />
                Quick Reply
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Related Issues</CardTitle>
            </CardHeader>
            <CardContent>
              {message.relatedIssues && message.relatedIssues.length > 0 ? <div className="space-y-2">
                  {message.relatedIssues.map(issueId => <div key={issueId} className="p-3 border rounded-lg">
                      <p className="font-medium text-sm">Issue #{issueId}</p>
                      <Button variant="outline" size="sm" className="mt-2 w-full gap-2" onClick={() => navigate(`/issues`)}>
                        <ExternalLink className="h-3 w-3" />
                        View in Issues
                      </Button>
                    </div>)}
                </div> : <div className="text-center py-4">
                  <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-3">No related issues</p>
                  <Button size="sm" className="gap-2" onClick={() => setCreateIssueModal(true)}>
                    <Plus className="h-3 w-3" />
                    Create Issue
                  </Button>
                </div>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Message Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Source</span>
                <MessageSourceBadge source={message.source} />
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <MessageStatusBadge status={message.status} />
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Priority</span>
                <Badge variant="outline" className={message.priority === 'high' ? 'bg-red-100 text-red-800' : message.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                  {message.priority}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Received</span>
                <span className="text-sm">{message.time}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Issue Modal */}
      <CreateIssueModal isOpen={createIssueModal} onClose={() => setCreateIssueModal(false)} message={message} onCreateIssue={handleCreateIssue} />
    </div>;
}
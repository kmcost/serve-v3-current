import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  AlertTriangle, 
  Users, 
  MessageSquare,
  Plus
} from 'lucide-react';
import { useState } from 'react';

// Mock data - in real app this would come from API
const messageData = {
  1: {
    id: 1,
    from: "Maria Rodriguez",
    email: "maria.r@email.com",
    phone: "(510) 555-0123",
    subject: "Broken streetlight on Elm St",
    message: "There's a broken streetlight on Elm St between 5th and 6th. It's been out for a week and it's making that intersection really dangerous at night. I've seen two near-miss accidents already. Can someone please get this fixed? I'm happy to provide more details if needed.",
    time: "2 hours ago",
    relatedMessages: [
      {
        from: "John Peterson",
        subject: "Dark intersection at Elm & 5th",
        time: "1 day ago"
      },
      {
        from: "Sarah Kim",
        subject: "Street lighting safety concern",
        time: "3 days ago"
      }
    ],
    relatedIssue: null
  }
};

export default function MessageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reply, setReply] = useState('');
  
  const message = messageData[Number(id) as keyof typeof messageData];
  
  if (!message) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-medium text-muted-foreground">Message not found</p>
        <Button onClick={() => navigate('/inbox')} className="mt-4">
          Back to Inbox
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/inbox')}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Inbox
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{message.subject}</h1>
          <p className="text-muted-foreground">From {message.from} • {message.time}</p>
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
              <div className="space-y-2">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{message.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{message.phone}</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-foreground leading-relaxed">
                  {message.message}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Related Messages */}
          {message.relatedMessages.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Related Messages ({message.relatedMessages.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {message.relatedMessages.map((related, index) => (
                    <div key={index} className="p-3 border rounded-lg bg-accent/30">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{related.from}</p>
                          <p className="text-sm text-muted-foreground">{related.subject}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{related.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reply Section */}
          <Card>
            <CardHeader>
              <CardTitle>Draft Reply</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Type your reply to Maria Rodriguez..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                className="min-h-[120px]"
              />
              <div className="flex gap-2">
                <Button>Send Reply</Button>
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
              <Button className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Create Issue
              </Button>
              
              <Button variant="outline" className="w-full gap-2">
                <MessageSquare className="h-4 w-4" />
                Draft Reply
              </Button>
              
              <Button variant="outline" className="w-full gap-2">
                <Users className="h-4 w-4" />
                Find Similar Messages
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Related Issues</CardTitle>
            </CardHeader>
            <CardContent>
              {message.relatedIssue ? (
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-sm">{message.relatedIssue}</p>
                  <Button variant="outline" size="sm" className="mt-2 w-full">
                    View Issue
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-3">No related issues</p>
                  <Button size="sm" className="gap-2">
                    <Plus className="h-3 w-3" />
                    Create Issue
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Related messages</span>
                <Badge variant="outline">{message.relatedMessages.length}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Priority</span>
                <Badge variant="outline">Medium</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Category</span>
                <Badge variant="outline">Infrastructure</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
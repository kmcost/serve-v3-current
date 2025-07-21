
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, ExternalLink, Users, Calendar, CheckCircle } from 'lucide-react';
import { PriorityItem } from '@/types/core';

interface PublicBoardPreviewProps {
  items: PriorityItem[];
}

export function PublicBoardPreview({ items }: PublicBoardPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  const publicItems = items.filter(item => item.publicNotes);
  const completedCount = items.filter(item => item.boardStatus === 'completed').length;
  const activeCount = items.filter(item => item.boardStatus !== 'completed').length;

  const PublicCard = ({ item }: { item: PriorityItem }) => (
    <Card className="mb-3">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {item.type === 'community' ? <Users className="h-4 w-4" /> : <Calendar className="h-4 w-4" />}
            <Badge variant="outline" className="text-xs">
              {item.type === 'community' ? 'Community Priority' : 'Constituent Service'}
            </Badge>
          </div>
          {item.boardStatus === 'completed' && (
            <CheckCircle className="h-4 w-4 text-green-600" />
          )}
        </div>
        <CardTitle className="text-sm">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
        {item.publicNotes && (
          <div className="bg-blue-50 p-2 rounded text-xs">
            <strong>Update:</strong> {item.publicNotes}
          </div>
        )}
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>Status: {item.boardStatus.replace('-', ' ')}</span>
          {item.supportPercentage && (
            <span>{item.supportPercentage}% community support</span>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Eye className="h-4 w-4" />
          Preview Public Board
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Public Priorities Board - Campaign Website Preview
          </DialogTitle>
        </DialogHeader>
        
        {/* Mock website header */}
        <div className="bg-blue-600 text-white p-4 rounded-lg mb-4">
          <h2 className="text-xl font-bold">Councilmember Sarah Chen</h2>
          <p className="text-blue-100">District 4 - Transparent Leadership in Action</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{completedCount}</div>
              <div className="text-sm text-muted-foreground">Priorities Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{activeCount}</div>
              <div className="text-sm text-muted-foreground">Currently Working On</div>
            </CardContent>
          </Card>
        </div>

        {/* Public priorities */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Current Priorities & Progress</h3>
          <div className="space-y-3">
            {publicItems.map(item => (
              <PublicCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 rounded-lg mt-6">
          <p className="text-sm text-muted-foreground text-center">
            This board is updated in real-time to show progress on community priorities and constituent services.
            <br />
            Have an issue? <span className="text-blue-600 underline cursor-pointer">Submit it here</span> or contact our office directly.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

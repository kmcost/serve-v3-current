
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  User, 
  Calendar,
  MessageSquare,
  Plus
} from 'lucide-react';
import { ConstituentIssue, PriorityItem } from '@/types/core';
import { IssueTimeline } from './IssueTimeline';
import { InlineTextEditor, InlineSelectEditor, InlineTagEditor } from './InlineEditor';
import { updateIssue, addTimelineEntry, revertFromPriorities } from '@/services/issueService';
import { toast } from '@/hooks/use-toast';

interface AdminIssueViewProps {
  issue: ConstituentIssue | PriorityItem;
  onMoveToPriorities?: () => void;
  onUpdateStatus?: (status: string) => void;
  onRefetch: () => void;
}

const statusOptions = [
  { value: '', label: 'No Status' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'validated', label: 'Validated' }
];

const priorityOptions = [
  { value: '', label: 'No Priority' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
];

export function AdminIssueView({ 
  issue, 
  onMoveToPriorities, 
  onUpdateStatus, 
  onRefetch 
}: AdminIssueViewProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [newTimelineNote, setNewTimelineNote] = useState('');
  
  const isPriorityItem = 'boardStatus' in issue;

  const handleFieldUpdate = async (field: string, value: any) => {
    setIsUpdating(true);
    try {
      await updateIssue(issue.id, { [field]: value });
      toast({
        title: "Updated",
        description: `${field} updated successfully`,
      });
      onRefetch();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update ${field}`,
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRevertFromPriorities = async () => {
    if (!isPriorityItem) return;
    
    setIsUpdating(true);
    try {
      await revertFromPriorities(issue.id);
      toast({
        title: "Reverted",
        description: "Issue reverted from priorities board",
      });
      onRefetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to revert from priorities",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddTimelineEntry = async () => {
    if (!newTimelineNote.trim()) return;
    
    try {
      await addTimelineEntry(issue.id, {
        status: 'reviewed',
        timestamp: new Date().toISOString(),
        changedBy: 'Admin',
        notes: newTimelineNote
      });
      setNewTimelineNote('');
      toast({
        title: "Note added",
        description: "Timeline note added successfully",
      });
      onRefetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add timeline note",
        variant: "destructive",
      });
    }
  };

  const handleStatusUpdate = async (status: string) => {
    setIsUpdating(true);
    try {
      await onUpdateStatus?.(status);
      onRefetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Essential Info Card */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Editable Title */}
            <div>
              <label className="text-sm font-medium text-muted-foreground">Title</label>
              <InlineTextEditor
                value={issue.title}
                onSave={(value) => handleFieldUpdate('title', value)}
                className="text-2xl font-bold"
                placeholder="Enter issue title..."
              />
            </div>

            {/* Status and Priority */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <InlineSelectEditor
                  value={issue.status || ''}
                  options={statusOptions}
                  onSave={(value) => handleFieldUpdate('status', value)}
                  placeholder="Select status..."
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Priority</label>
                <InlineSelectEditor
                  value={issue.priority || ''}
                  options={priorityOptions}
                  onSave={(value) => handleFieldUpdate('priority', value)}
                  placeholder="Select priority..."
                />
              </div>
            </div>

            {/* Assignment and Timeline */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Assigned To</label>
                <InlineTextEditor
                  value={issue.assignedTo || ''}
                  onSave={(value) => handleFieldUpdate('assignedTo', value)}
                  placeholder="Assign to department..."
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Estimated Resolution</label>
                <InlineTextEditor
                  value={issue.estimatedResolution || ''}
                  onSave={(value) => handleFieldUpdate('estimatedResolution', value)}
                  placeholder="e.g., 2-3 weeks"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="text-sm font-medium text-muted-foreground">Tags</label>
              <InlineTagEditor
                tags={issue.tags || []}
                onSave={(tags) => handleFieldUpdate('tags', tags)}
              />
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 pt-4 border-t">
              {!isPriorityItem && (
                <Button onClick={onMoveToPriorities} disabled={isUpdating} className="gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Move to Priorities
                </Button>
              )}
              
              {isPriorityItem && (
                <Button onClick={handleRevertFromPriorities} disabled={isUpdating} variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Revert from Priorities
                </Button>
              )}
              
              <Button 
                onClick={() => handleStatusUpdate('in-progress')}
                disabled={isUpdating}
                variant="outline"
                className="gap-2"
              >
                <Clock className="h-4 w-4" />
                Mark In Progress
              </Button>
              
              <Button 
                onClick={() => handleStatusUpdate('resolved')}
                disabled={isUpdating}
                variant="outline"
                className="gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                Mark Resolved
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Description</h2>
                <InlineTextEditor
                  value={issue.description}
                  onSave={(value) => handleFieldUpdate('description', value)}
                  multiline
                  placeholder="Enter issue description..."
                  className="text-muted-foreground leading-relaxed"
                />
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Timeline</h2>
                <IssueTimeline timeline={issue.timeline} />
                
                {/* Add Timeline Entry */}
                <div className="border-t pt-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTimelineNote}
                      onChange={(e) => setNewTimelineNote(e.target.value)}
                      placeholder="Add timeline note..."
                      className="flex-1 px-3 py-2 border rounded-md"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTimelineEntry()}
                    />
                    <Button onClick={handleAddTimelineEntry} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Public Notes */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Public Notes</h2>
                <p className="text-sm text-muted-foreground">
                  This information will be visible to the public on the website
                </p>
                <InlineTextEditor
                  value={('publicNotes' in issue ? issue.publicNotes : '') || ''}
                  onSave={(value) => handleFieldUpdate('publicNotes', value)}
                  multiline
                  placeholder="Add public notes..."
                  className="text-muted-foreground leading-relaxed"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Issue Details */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Issue Details</h2>
                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">ID:</span>
                    <div className="font-mono">{issue.uniqueId}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <div className="font-medium capitalize">{issue.type}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Source:</span>
                    <div className="font-medium capitalize">{issue.source}</div>
                  </div>
                  {issue.location && (
                    <div>
                      <span className="text-muted-foreground">Location:</span>
                      <div className="font-medium">{issue.location}</div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Constituent Info */}
          {issue.constituent && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Constituent Information</h2>
                  <div className="space-y-2">
                    <div className="font-medium">{issue.constituent.name}</div>
                    <div className="text-sm text-muted-foreground">{issue.constituent.email}</div>
                    {issue.constituent.phone && (
                      <div className="text-sm text-muted-foreground">{issue.constituent.phone}</div>
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Contact Constituent
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Internal Notes */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Internal Notes</h2>
                <div className="space-y-2">
                  {issue.internalNotes?.map((note, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm">{note}</p>
                    </div>
                  ))}
                </div>
                <InlineTextEditor
                  value=""
                  onSave={(value) => {
                    const currentNotes = issue.internalNotes || [];
                    handleFieldUpdate('internalNotes', [...currentNotes, value]);
                  }}
                  placeholder="Add internal note..."
                  className="text-sm"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

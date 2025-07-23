
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  User, 
  Calendar,
  MessageSquare,
  Plus,
  Edit,
  Save
} from 'lucide-react';
import { ConstituentIssue, PriorityItem } from '@/types/core';
import { IssueTimeline } from './IssueTimeline';
import { updateIssue, addTimelineEntry, revertFromPriorities } from '@/services/issueService';
import { toast } from '@/hooks/use-toast';

interface AdminIssueViewProps {
  issue: ConstituentIssue | PriorityItem;
  onMoveToPriorities?: () => void;
  onUpdateStatus?: (status: string) => void;
  onRefetch: () => void;
}

const statusOptions = [
  { value: 'none', label: 'No Status' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'validated', label: 'Validated' }
];

const priorityOptions = [
  { value: 'none', label: 'No Priority' },
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
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newTimelineNote, setNewTimelineNote] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    title: issue.title,
    status: issue.status || 'none',
    priority: issue.priority || 'none',
    assignedTo: issue.assignedTo || '',
    estimatedResolution: issue.estimatedResolution || '',
    description: issue.description,
    publicNotes: ('publicNotes' in issue ? issue.publicNotes : '') || '',
    tags: issue.tags || []
  });
  
  const isPriorityItem = 'boardStatus' in issue;

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      const updates: any = {};
      
      // Only include changed fields
      if (formData.title !== issue.title) updates.title = formData.title;
      if (formData.status !== (issue.status || 'none')) {
        updates.status = formData.status === 'none' ? undefined : formData.status;
      }
      if (formData.priority !== (issue.priority || 'none')) {
        updates.priority = formData.priority === 'none' ? undefined : formData.priority;
      }
      if (formData.assignedTo !== (issue.assignedTo || '')) {
        updates.assignedTo = formData.assignedTo || undefined;
      }
      if (formData.estimatedResolution !== (issue.estimatedResolution || '')) {
        updates.estimatedResolution = formData.estimatedResolution || undefined;
      }
      if (formData.description !== issue.description) updates.description = formData.description;
      if (formData.publicNotes !== (('publicNotes' in issue ? issue.publicNotes : '') || '')) {
        updates.publicNotes = formData.publicNotes || undefined;
      }
      if (JSON.stringify(formData.tags) !== JSON.stringify(issue.tags || [])) {
        updates.tags = formData.tags.length > 0 ? formData.tags : undefined;
      }

      if (Object.keys(updates).length > 0) {
        await updateIssue(issue.id, updates);
        toast({
          title: "Success",
          description: "Issue updated successfully",
        });
        onRefetch();
      }
      
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update issue",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: issue.title,
      status: issue.status || 'none',
      priority: issue.priority || 'none',
      assignedTo: issue.assignedTo || '',
      estimatedResolution: issue.estimatedResolution || '',
      description: issue.description,
      publicNotes: ('publicNotes' in issue ? issue.publicNotes : '') || '',
      tags: issue.tags || []
    });
    setIsEditing(false);
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
      {/* Main Issue Form */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Issue Details</CardTitle>
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="hidden sm:flex">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            ) : (
              <div className="hidden sm:flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleCancel} disabled={isUpdating}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave} disabled={isUpdating}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              disabled={!isEditing}
              placeholder="Enter issue title..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status..." />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={formData.priority} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority..." />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assigned To</Label>
              <Input 
                id="assignedTo"
                value={formData.assignedTo}
                onChange={(e) => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
                disabled={!isEditing}
                placeholder="Assign to department..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedResolution">Estimated Resolution</Label>
              <Input 
                id="estimatedResolution"
                value={formData.estimatedResolution}
                onChange={(e) => setFormData(prev => ({ ...prev, estimatedResolution: e.target.value }))}
                disabled={!isEditing}
                placeholder="e.g., 2-3 weeks"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              disabled={!isEditing}
              placeholder="Enter issue description..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="publicNotes">Public Notes</Label>
            <p className="text-sm text-muted-foreground">
              This information will be visible to the public on the website
            </p>
            <Textarea 
              id="publicNotes"
              value={formData.publicNotes}
              onChange={(e) => setFormData(prev => ({ ...prev, publicNotes: e.target.value }))}
              disabled={!isEditing}
              placeholder="Add public notes..."
              rows={3}
            />
          </div>

          {/* Mobile buttons */}
          <div className="flex sm:hidden justify-end">
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            ) : (
              <div className="flex space-x-2 w-full">
                <Button variant="outline" size="sm" onClick={handleCancel} disabled={isUpdating} className="flex-1">
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave} disabled={isUpdating} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            )}
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
        </CardContent>
      </Card>

      {/* Timeline and Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Timeline</h2>
                <IssueTimeline timeline={issue.timeline} />
                
                {/* Add Timeline Entry */}
                <div className="border-t pt-4">
                  <div className="flex gap-2">
                    <Input
                      value={newTimelineNote}
                      onChange={(e) => setNewTimelineNote(e.target.value)}
                      placeholder="Add timeline note..."
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
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Issue Metadata */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Issue Metadata</h2>
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
                  {issue.tags && issue.tags.length > 0 && (
                    <div>
                      <span className="text-muted-foreground">Tags:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {issue.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
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
                <div className="flex gap-2">
                  <Input
                    value={newTimelineNote}
                    onChange={(e) => setNewTimelineNote(e.target.value)}
                    placeholder="Add internal note..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        if (newTimelineNote.trim()) {
                          const currentNotes = issue.internalNotes || [];
                          updateIssue(issue.id, { internalNotes: [...currentNotes, newTimelineNote] })
                            .then(() => {
                              setNewTimelineNote('');
                              onRefetch();
                              toast({
                                title: "Note added",
                                description: "Internal note added successfully",
                              });
                            })
                            .catch(() => {
                              toast({
                                title: "Error",
                                description: "Failed to add internal note",
                                variant: "destructive",
                              });
                            });
                        }
                      }
                    }}
                  />
                  <Button 
                    onClick={() => {
                      if (newTimelineNote.trim()) {
                        const currentNotes = issue.internalNotes || [];
                        updateIssue(issue.id, { internalNotes: [...currentNotes, newTimelineNote] })
                          .then(() => {
                            setNewTimelineNote('');
                            onRefetch();
                            toast({
                              title: "Note added",
                              description: "Internal note added successfully",
                            });
                          })
                          .catch(() => {
                            toast({
                              title: "Error",
                              description: "Failed to add internal note",
                              variant: "destructive",
                            });
                          });
                      }
                    }}
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

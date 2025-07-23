
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle } from 'lucide-react';
import { getIssueById, addIssueToPriorities, updatePriorityItemStatus } from '@/services/mockData';
import { ConstituentIssue, PriorityItem } from '@/types/core';
import { toast } from '@/hooks/use-toast';
import { useUserRole } from '@/contexts/UserRoleContext';
import { AdminIssueView } from '@/components/issues/AdminIssueView';
import { PublicIssueView } from '@/components/issues/PublicIssueView';
import { IssueDetailHeader } from '@/components/issues/IssueDetailHeader';

export default function IssueDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin, isPublic } = useUserRole();
  
  const { data: issue, isLoading, error, refetch } = useQuery({
    queryKey: ['issue', id],
    queryFn: () => getIssueById(id!),
    enabled: !!id,
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleMoveToPriorities = async () => {
    if (!issue || 'boardStatus' in issue) return;
    
    try {
      await addIssueToPriorities(issue);
      toast({
        title: "Success",
        description: "Issue moved to priorities board",
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to move issue to priorities",
        variant: "destructive",
      });
    }
  };

  const handleUpdateStatus = async (status: string) => {
    if (!issue || !('boardStatus' in issue)) return;
    
    try {
      await updatePriorityItemStatus(issue.id, status as 'todo' | 'in-progress' | 'completed');
      toast({
        title: "Success",
        description: "Status updated successfully",
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-48 mb-4"></div>
          <div className="h-12 bg-muted rounded w-full mb-4"></div>
          <div className="h-4 bg-muted rounded w-64"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-32 bg-muted rounded animate-pulse"></div>
          </div>
          <div className="space-y-6">
            <div className="h-24 bg-muted rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !issue) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-lg font-medium text-muted-foreground">Issue not found</p>
        <p className="text-sm text-muted-foreground mb-4">
          The issue you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={handleBack}
          className="text-primary hover:underline"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header - only show for admin view */}
      {isAdmin && (
        <IssueDetailHeader issue={issue} onBack={handleBack} />
      )}
      
      {/* Role-based content */}
      {isAdmin ? (
        <AdminIssueView 
          issue={issue}
          onMoveToPriorities={handleMoveToPriorities}
          onUpdateStatus={handleUpdateStatus}
          onRefetch={refetch}
        />
      ) : (
        <PublicIssueView issue={issue} />
      )}
    </div>
  );
}


import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  BarChart3, 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  MessageSquare,
  Settings
} from 'lucide-react';
import { IssueCard } from '@/components/issues/IssueCard';
import { IssueFilters } from '@/components/issues/IssueFilters';
import { BulkActions } from '@/components/issues/BulkActions';
import { getAllIssuesEnhanced, moveIssuesToPriorities } from '@/services/mockData';
import { ConstituentIssue } from '@/types/core';
import { toast } from '@/hooks/use-toast';

export default function Issues() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [bulkSelectMode, setBulkSelectMode] = useState(false);

  const { data: issues = [], isLoading, error, refetch } = useQuery({
    queryKey: ['all-issues'],
    queryFn: getAllIssuesEnhanced,
  });

  // Filter issues based on search and filters
  const filteredIssues = useMemo(() => {
    return issues.filter(issue => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          issue.title.toLowerCase().includes(searchLower) ||
          issue.description.toLowerCase().includes(searchLower) ||
          issue.constituent?.name.toLowerCase().includes(searchLower) ||
          issue.constituent?.email.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Source filter
      if (selectedSources.length > 0 && !selectedSources.includes(issue.source)) {
        return false;
      }

      // Status filter
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(issue.status)) {
        return false;
      }

      // Priority filter
      if (selectedPriorities.length > 0 && !selectedPriorities.includes(issue.priority)) {
        return false;
      }

      return true;
    });
  }, [issues, searchTerm, selectedSources, selectedStatuses, selectedPriorities]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = issues.length;
    const newIssues = issues.filter(i => i.status === 'new').length;
    const inProgress = issues.filter(i => i.status === 'in-progress').length;
    const resolved = issues.filter(i => i.status === 'resolved').length;
    const validated = issues.filter(i => i.status === 'validated').length;
    
    const highPriority = issues.filter(i => i.priority === 'high').length;
    const communityIssues = issues.filter(i => i.type === 'community').length;
    const individualIssues = issues.filter(i => i.type === 'individual').length;
    
    return {
      total,
      newIssues,
      inProgress,
      resolved,
      validated,
      highPriority,
      communityIssues,
      individualIssues
    };
  }, [issues]);

  const handleSelectIssue = (issueId: string, selected: boolean) => {
    setSelectedIssues(prev => 
      selected 
        ? [...prev, issueId]
        : prev.filter(id => id !== issueId)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIssues(checked ? filteredIssues.map(i => i.id) : []);
  };

  const handleClearSelection = () => {
    setSelectedIssues([]);
    setBulkSelectMode(false);
  };

  const handleMoveToPriorities = async (issueIds: string[]) => {
    await moveIssuesToPriorities(issueIds);
    refetch();
  };

  const handleStatusChange = async (issueIds: string[], status: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    refetch();
  };

  const handleSingleMoveToPriorities = (issueId: string) => {
    handleMoveToPriorities([issueId]);
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
        <div className="space-y-4">
          {Array.from({ length: 6 }, (_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-lg font-medium text-muted-foreground">Unable to load issues</p>
        <p className="text-sm text-muted-foreground mb-4">
          There was an error loading the issues data.
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
          <h1 className="text-2xl font-bold text-foreground">Issues</h1>
          <p className="text-muted-foreground">
            {stats.total} total issues • {stats.newIssues} new • {stats.inProgress} in progress • {stats.resolved} resolved
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setBulkSelectMode(!bulkSelectMode)}
            className="gap-2"
          >
            <Settings className="h-4 w-4" />
            {bulkSelectMode ? 'Cancel Selection' : 'Select Multiple'}
          </Button>
          <Link to="/priorities">
            <Button variant="outline" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              View Priorities
            </Button>
          </Link>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Issue
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">New Issues</p>
                <p className="text-2xl font-bold">{stats.newIssues}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{stats.inProgress}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-red-600" />
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
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold">{stats.resolved}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <IssueFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedSources={selectedSources}
        onSourcesChange={setSelectedSources}
        selectedStatuses={selectedStatuses}
        onStatusesChange={setSelectedStatuses}
        selectedPriorities={selectedPriorities}
        onPrioritiesChange={setSelectedPriorities}
        totalIssues={issues.length}
        filteredCount={filteredIssues.length}
      />

      {/* Bulk Actions */}
      <BulkActions
        selectedIssues={selectedIssues}
        onClearSelection={handleClearSelection}
        onMoveToPriorities={handleMoveToPriorities}
        onStatusChange={handleStatusChange}
      />

      {/* Bulk Select All */}
      {bulkSelectMode && filteredIssues.length > 0 && (
        <Card className="bg-muted/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={selectedIssues.length === filteredIssues.length}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm font-medium">
                Select all {filteredIssues.length} issues
              </span>
              {selectedIssues.length > 0 && (
                <Badge variant="secondary">
                  {selectedIssues.length} selected
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.map((issue) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            isSelected={selectedIssues.includes(issue.id)}
            onSelect={handleSelectIssue}
            onMoveToPriorities={handleSingleMoveToPriorities}
            showCheckbox={bulkSelectMode}
          />
        ))}
      </div>

      {/* No Results */}
      {filteredIssues.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium text-muted-foreground">No issues found</p>
          <p className="text-sm text-muted-foreground mb-4">
            Try adjusting your search or filters, or create a new issue.
          </p>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create New Issue
          </Button>
        </div>
      )}
    </div>
  );
}

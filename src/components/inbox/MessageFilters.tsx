
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  X,
  Globe,
  Mail,
  Facebook,
  Smartphone
} from 'lucide-react';

interface MessageFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedSources: string[];
  onSourcesChange: (sources: string[]) => void;
  selectedStatuses: string[];
  onStatusesChange: (statuses: string[]) => void;
  selectedPriorities: string[];
  onPrioritiesChange: (priorities: string[]) => void;
  totalMessages: number;
  filteredCount: number;
}

const sourceOptions = [
  { value: 'website', label: 'Website', icon: Globe },
  { value: 'email', label: 'Email', icon: Mail },
  { value: 'facebook', label: 'Facebook', icon: Facebook },
  { value: 'sms', label: 'SMS', icon: Smartphone }
];

const statusOptions = [
  { value: 'unread', label: 'Unread' },
  { value: 'read', label: 'Read' },
  { value: 'responded', label: 'Responded' },
  { value: 'issue-created', label: 'Issue Created' },
  { value: 'resolved', label: 'Resolved' }
];

const priorityOptions = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' }
];

export function MessageFilters({
  searchTerm,
  onSearchChange,
  selectedSources,
  onSourcesChange,
  selectedStatuses,
  onStatusesChange,
  selectedPriorities,
  onPrioritiesChange,
  totalMessages,
  filteredCount
}: MessageFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const toggleSource = (source: string) => {
    const newSources = selectedSources.includes(source)
      ? selectedSources.filter(s => s !== source)
      : [...selectedSources, source];
    onSourcesChange(newSources);
  };

  const toggleStatus = (status: string) => {
    const newStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter(s => s !== status)
      : [...selectedStatuses, status];
    onStatusesChange(newStatuses);
  };

  const togglePriority = (priority: string) => {
    const newPriorities = selectedPriorities.includes(priority)
      ? selectedPriorities.filter(p => p !== priority)
      : [...selectedPriorities, priority];
    onPrioritiesChange(newPriorities);
  };

  const clearAllFilters = () => {
    onSearchChange('');
    onSourcesChange([]);
    onStatusesChange([]);
    onPrioritiesChange([]);
  };

  const hasActiveFilters = searchTerm || selectedSources.length > 0 || selectedStatuses.length > 0 || selectedPriorities.length > 0;

  return (
    <div className="space-y-4">
      {/* Search and Filter Toggle */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search messages, constituents, or content..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-1 px-1 py-0 text-xs">
                {[selectedSources.length, selectedStatuses.length, selectedPriorities.length].filter(n => n > 0).length}
              </Badge>
            )}
          </Button>
          
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearAllFilters}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredCount} of {totalMessages} messages
        {hasActiveFilters && (
          <span className="ml-2 text-primary">
            • {totalMessages - filteredCount} filtered out
          </span>
        )}
      </div>

      {/* Expandable Filters */}
      {showFilters && (
        <div className="border rounded-lg p-4 space-y-4 bg-muted/30">
          {/* Source Filters */}
          <div>
            <h4 className="font-medium mb-2">Source</h4>
            <div className="flex flex-wrap gap-2">
              {sourceOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedSources.includes(option.value);
                return (
                  <Button
                    key={option.value}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleSource(option.value)}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {option.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Status Filters */}
          <div>
            <h4 className="font-medium mb-2">Status</h4>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => {
                const isSelected = selectedStatuses.includes(option.value);
                return (
                  <Button
                    key={option.value}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleStatus(option.value)}
                  >
                    {option.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Priority Filters */}
          <div>
            <h4 className="font-medium mb-2">Priority</h4>
            <div className="flex flex-wrap gap-2">
              {priorityOptions.map((option) => {
                const isSelected = selectedPriorities.includes(option.value);
                return (
                  <Button
                    key={option.value}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => togglePriority(option.value)}
                  >
                    {option.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

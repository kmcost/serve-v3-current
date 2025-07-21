
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Calendar, 
  MessageSquare, 
  Users, 
  ChevronDown, 
  ChevronUp,
  ArrowRight,
  Globe,
  Mail,
  Facebook,
  Smartphone,
  Bot
} from 'lucide-react';
import { ConstituentIssue } from '@/types/core';
import { getRelatedIssues } from '@/services/mockData';

interface IssueCardProps {
  issue: ConstituentIssue;
  isSelected?: boolean;
  onSelect?: (issueId: string, selected: boolean) => void;
  onMoveToPriorities?: (issueId: string) => void;
  showCheckbox?: boolean;
}

const sourceConfig = {
  'website': { icon: Globe, label: 'Website', color: 'bg-blue-100 text-blue-800' },
  'email': { icon: Mail, label: 'Email', color: 'bg-green-100 text-green-800' },
  'facebook': { icon: Facebook, label: 'Facebook', color: 'bg-blue-100 text-blue-800' },
  'sms': { icon: Smartphone, label: 'SMS', color: 'bg-purple-100 text-purple-800' },
  'ai-detected': { icon: Bot, label: 'AI Detected', color: 'bg-orange-100 text-orange-800' }
};

const statusConfig = {
  'new': { label: 'New', color: 'bg-yellow-100 text-yellow-800' },
  'in-progress': { label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  'resolved': { label: 'Resolved', color: 'bg-green-100 text-green-800' },
  'validated': { label: 'Validated', color: 'bg-purple-100 text-purple-800' }
};

const priorityConfig = {
  'high': { label: 'High', color: 'bg-red-100 text-red-800' },
  'medium': { label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  'low': { label: 'Low', color: 'bg-green-100 text-green-800' }
};

export function IssueCard({ 
  issue, 
  isSelected = false, 
  onSelect, 
  onMoveToPriorities,
  showCheckbox = false 
}: IssueCardProps) {
  const [showRelated, setShowRelated] = useState(false);
  
  const sourceInfo = sourceConfig[issue.source as keyof typeof sourceConfig];
  const statusInfo = statusConfig[issue.status as keyof typeof statusConfig];
  const priorityInfo = priorityConfig[issue.priority as keyof typeof priorityConfig];
  const SourceIcon = sourceInfo?.icon;
  
  const relatedIssues = getRelatedIssues(issue.id);
  const hasRelatedIssues = relatedIssues.length > 0;

  const handleSelect = (checked: boolean) => {
    onSelect?.(issue.id, checked);
  };

  const handleMoveToPriorities = () => {
    onMoveToPriorities?.(issue.id);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          {showCheckbox && (
            <Checkbox
              checked={isSelected}
              onCheckedChange={handleSelect}
              className="mt-1"
            />
          )}
          
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2 mb-2">
              <CardTitle className="text-lg font-semibold line-clamp-2">
                {issue.title}
              </CardTitle>
              
              <div className="flex flex-col gap-1">
                {sourceInfo && (
                  <Badge className={`${sourceInfo.color} gap-1 text-xs`}>
                    <SourceIcon className="h-3 w-3" />
                    {sourceInfo.label}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-2">
              {statusInfo && (
                <Badge className={`${statusInfo.color} text-xs`}>
                  {statusInfo.label}
                </Badge>
              )}
              {priorityInfo && (
                <Badge className={`${priorityInfo.color} text-xs`}>
                  {priorityInfo.label} Priority
                </Badge>
              )}
              {issue.type === 'community' && issue.supportPercentage && (
                <Badge variant="outline" className="text-xs">
                  {issue.supportPercentage}% Support
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
              {issue.description}
            </p>
            
            {issue.constituent && (
              <div className="text-sm text-muted-foreground mb-2">
                <strong>From:</strong> {issue.constituent.name}
                {issue.constituent.email && (
                  <span className="ml-2">({issue.constituent.email})</span>
                )}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>
              {issue.timeframe || new Date(issue.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          {issue.type === 'trending' && issue.mentions && (
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{issue.mentions} mentions</span>
            </div>
          )}
          
          {issue.type === 'community' && issue.supportPercentage && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{issue.supportPercentage}% support</span>
            </div>
          )}
        </div>
        
        {hasRelatedIssues && (
          <div className="border-t pt-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowRelated(!showRelated)}
              className="gap-2 p-0 h-auto font-normal text-sm"
            >
              {showRelated ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              {relatedIssues.length} related issue{relatedIssues.length !== 1 ? 's' : ''}
            </Button>
            
            {showRelated && (
              <div className="mt-2 space-y-2">
                {relatedIssues.map((relatedIssue) => (
                  <div key={relatedIssue.id} className="text-sm bg-muted/50 p-2 rounded">
                    <div className="font-medium">{relatedIssue.title}</div>
                    <div className="text-muted-foreground line-clamp-2">
                      {relatedIssue.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        <div className="flex justify-between items-center pt-2">
          <Link to={`/issues/${issue.id}`}>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>
          
          <Button 
            onClick={handleMoveToPriorities}
            size="sm"
            className="gap-2"
          >
            <ArrowRight className="h-4 w-4" />
            Move to Priorities
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

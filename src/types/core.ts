
export interface ConstituentIssue {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'community' | 'trending';
  status: 'new' | 'in-progress' | 'resolved' | 'validated';
  source: 'website' | 'email' | 'facebook' | 'sms' | 'ai-detected';
  priority: 'low' | 'medium' | 'high';
  supportPercentage?: number; // for validated community issues
  mentions?: number; // for trending issues
  timeframe?: string; // "this week", "2 hours ago", etc.
  constituent?: {
    name: string;
    email: string;
    phone?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface DataSource {
  id: string;
  type: 'website' | 'email' | 'facebook' | 'sms';
  name: string;
  connected: boolean;
  status: 'analyzing' | 'connected' | 'disconnected' | 'error';
  issuesGenerated?: number;
  lastSync?: string;
}

// Re-export Poll interface from existing pollData for consistency
export interface Poll {
  id: string;
  title: string;
  status: 'draft' | 'active' | 'completed';
  responses: number;
  targetResponses: number;
  endDate: string;
}

// Type guards and validation
export function isValidConstituentIssue(issue: unknown): issue is ConstituentIssue {
  return (
    typeof issue === 'object' &&
    issue !== null &&
    typeof (issue as ConstituentIssue).id === 'string' &&
    typeof (issue as ConstituentIssue).title === 'string' &&
    typeof (issue as ConstituentIssue).description === 'string' &&
    ['individual', 'community', 'trending'].includes((issue as ConstituentIssue).type) &&
    ['new', 'in-progress', 'resolved', 'validated'].includes((issue as ConstituentIssue).status) &&
    ['website', 'email', 'facebook', 'sms', 'ai-detected'].includes((issue as ConstituentIssue).source)
  );
}

export function validateConstituentIssues(issues: unknown[]): ConstituentIssue[] {
  return issues.filter(isValidConstituentIssue);
}

export interface ConstituentIssue {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'community' | 'trending';
  status?: 'in-progress' | 'resolved' | 'validated'; // Made optional for undefined status
  source: 'website' | 'email' | 'facebook' | 'ai-detected';
  priority?: 'low' | 'medium' | 'high'; // Made optional for undefined priority
  supportPercentage?: number; // for validated community issues
  mentions?: number; // for trending issues
  timeframe?: string; // "this week", "2 hours ago", etc.
  relatedIssues?: string[]; // IDs of related issues
  constituent?: {
    name: string;
    email: string;
    phone?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PriorityItem extends ConstituentIssue {
  boardStatus: 'todo' | 'in-progress' | 'completed';
  addedToBoardAt: string;
  completedAt?: string;
  assignee?: string;
  estimatedDuration?: string;
  actualDuration?: string;
  publicNotes?: string;
}

export type BoardColumn = 'todo' | 'in-progress' | 'completed';

export interface DataSource {
  id: string;
  type: 'website' | 'email' | 'facebook' | 'crm';
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
    (typeof (issue as ConstituentIssue).status === 'undefined' || ['in-progress', 'resolved', 'validated'].includes((issue as ConstituentIssue).status)) &&
    ['website', 'email', 'facebook', 'ai-detected'].includes((issue as ConstituentIssue).source)
  );
}

export function isValidPriorityItem(item: unknown): item is PriorityItem {
  return (
    isValidConstituentIssue(item) &&
    typeof (item as PriorityItem).boardStatus === 'string' &&
    ['todo', 'in-progress', 'completed'].includes((item as PriorityItem).boardStatus) &&
    typeof (item as PriorityItem).addedToBoardAt === 'string'
  );
}

export function validateConstituentIssues(issues: unknown[]): ConstituentIssue[] {
  return issues.filter(isValidConstituentIssue);
}

export function validatePriorityItems(items: unknown[]): PriorityItem[] {
  return items.filter(isValidPriorityItem);
}

// Constituent types
export interface ConstituentRecord {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  politicalAffiliation: 'Democrat' | 'Republican' | 'Independent' | 'Other';
  priorityIssues: string[];
  optInEmail: boolean;
  optInSMS: boolean;
  hasEngaged: boolean;
  createdAt: string;
}

export interface ConstituentStats {
  totalConstituents: number;
  optInEmailCount: number;
  optInSMSCount: number;
  engagementPercentage: number;
}

// Type guards for constituents
export function isValidConstituentRecord(record: unknown): record is ConstituentRecord {
  return (
    typeof record === 'object' &&
    record !== null &&
    typeof (record as ConstituentRecord).id === 'string' &&
    typeof (record as ConstituentRecord).firstName === 'string' &&
    typeof (record as ConstituentRecord).lastName === 'string' &&
    typeof (record as ConstituentRecord).email === 'string' &&
    typeof (record as ConstituentRecord).phone === 'string' &&
    ['Democrat', 'Republican', 'Independent', 'Other'].includes((record as ConstituentRecord).politicalAffiliation) &&
    Array.isArray((record as ConstituentRecord).priorityIssues) &&
    typeof (record as ConstituentRecord).optInEmail === 'boolean' &&
    typeof (record as ConstituentRecord).optInSMS === 'boolean' &&
    typeof (record as ConstituentRecord).hasEngaged === 'boolean' &&
    typeof (record as ConstituentRecord).createdAt === 'string'
  );
}


export interface StatusChange {
  id: string;
  status: 'submitted' | 'reviewed' | 'assigned' | 'in-progress' | 'completed' | 'resolved' | 'validated';
  timestamp: string;
  changedBy: string;
  notes?: string;
}

export interface ConstituentIssue {
  id: string;
  uniqueId: string; // ISU-001 format
  title: string;
  description: string;
  type: 'individual' | 'community' | 'trending';
  status?: 'in-progress' | 'resolved' | 'validated';
  source: 'website' | 'email' | 'facebook' | 'ai-detected';
  priority?: 'low' | 'medium' | 'high';
  supportPercentage?: number;
  mentions?: number;
  timeframe?: string;
  relatedIssues?: string[];
  constituent?: {
    name: string;
    email: string;
    phone?: string;
  };
  createdAt: string;
  updatedAt: string;
  
  // Enhanced fields
  tags: string[];
  location?: string;
  timeline: StatusChange[];
  assignedTo?: string;
  internalNotes: string[];
  estimatedResolution?: string;
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
    typeof (issue as ConstituentIssue).uniqueId === 'string' &&
    typeof (issue as ConstituentIssue).title === 'string' &&
    typeof (issue as ConstituentIssue).description === 'string' &&
    ['individual', 'community', 'trending'].includes((issue as ConstituentIssue).type) &&
    (typeof (issue as ConstituentIssue).status === 'undefined' || ['in-progress', 'resolved', 'validated'].includes((issue as ConstituentIssue).status)) &&
    ['website', 'email', 'facebook', 'ai-detected'].includes((issue as ConstituentIssue).source) &&
    Array.isArray((issue as ConstituentIssue).tags) &&
    Array.isArray((issue as ConstituentIssue).timeline) &&
    Array.isArray((issue as ConstituentIssue).internalNotes)
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
  age: '18-25' | '25-35' | '35-50' | '50+';
  familyStatus: 'Parent/Guardian (Under 18)' | 'Not a parent/guardian' | 'Unknown';
  ward: string;
  isBusinessOwner: boolean;
}

export interface ConstituentStats {
  totalConstituents: number;
  optInEmailCount: number;
  optInSMSCount: number;
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

// Standard tags for categorization
export const STANDARD_TAGS = [
  'Infrastructure & Roads',
  'Parks & Recreation',
  'Public Safety',
  'Transportation',
  'Environmental',
  'Housing',
  'Economic Development',
  'Education',
  'Healthcare',
  'Community Services',
  'Technology',
  'Budget & Finance'
] as const;

export type StandardTag = typeof STANDARD_TAGS[number];

// Utility functions
export function generateUniqueId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `ISU-${timestamp}-${randomStr}`.toUpperCase();
}

export function formatUniqueId(id: string): string {
  if (id.startsWith('ISU-')) return id;
  return `ISU-${id.substring(0, 3).toUpperCase()}`;
}

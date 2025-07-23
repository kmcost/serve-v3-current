
import { ConstituentIssue, PriorityItem, TimelineEntry } from '@/types/core';
import { 
  mockValidatedIssues, 
  mockTrendingIssues, 
  mockIndividualIssues, 
  mockPriorityItems,
  updatePriorityItemStatus as updatePriorityStatus,
  addIssueToPriorities as addToPriorities
} from './mockData';

export interface IssueUpdateData {
  title?: string;
  description?: string;
  status?: string;
  priority?: 'low' | 'medium' | 'high';
  assignedTo?: string;
  estimatedResolution?: string;
  tags?: string[];
  publicNotes?: string;
  internalNotes?: string[];
}

export const updateIssue = async (issueId: string, updates: IssueUpdateData): Promise<ConstituentIssue | PriorityItem> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Find issue in all collections
      const allIssues = [...mockValidatedIssues, ...mockTrendingIssues, ...mockIndividualIssues];
      const issue = allIssues.find(i => i.id === issueId);
      
      if (issue) {
        Object.assign(issue, updates, { updatedAt: new Date().toISOString() });
        resolve(issue);
      } else {
        // Check priority items
        const priorityItem = mockPriorityItems.find(p => p.id === issueId);
        if (priorityItem) {
          Object.assign(priorityItem, updates, { updatedAt: new Date().toISOString() });
          resolve(priorityItem);
        } else {
          reject(new Error('Issue not found'));
        }
      }
    }, 300);
  });
};

export const addTimelineEntry = async (issueId: string, entry: Omit<TimelineEntry, 'id'>): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const allIssues = [...mockValidatedIssues, ...mockTrendingIssues, ...mockIndividualIssues, ...mockPriorityItems];
      const issue = allIssues.find(i => i.id === issueId);
      
      if (issue) {
        const newEntry: TimelineEntry = {
          ...entry,
          id: Date.now().toString()
        };
        issue.timeline.push(newEntry);
        resolve();
      } else {
        reject(new Error('Issue not found'));
      }
    }, 200);
  });
};

export const revertFromPriorities = async (priorityId: string): Promise<ConstituentIssue> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const priorityIndex = mockPriorityItems.findIndex(p => p.id === priorityId);
      
      if (priorityIndex !== -1) {
        const priorityItem = mockPriorityItems[priorityIndex];
        
        // Create regular issue from priority item
        const regularIssue: ConstituentIssue = {
          id: priorityItem.id,
          uniqueId: priorityItem.uniqueId,
          title: priorityItem.title,
          description: priorityItem.description,
          type: priorityItem.type,
          status: priorityItem.status,
          source: priorityItem.source,
          priority: priorityItem.priority,
          supportPercentage: priorityItem.supportPercentage,
          mentions: priorityItem.mentions,
          timeframe: priorityItem.timeframe,
          createdAt: priorityItem.createdAt,
          updatedAt: new Date().toISOString(),
          tags: priorityItem.tags,
          location: priorityItem.location,
          timeline: priorityItem.timeline,
          assignedTo: priorityItem.assignedTo,
          internalNotes: priorityItem.internalNotes,
          estimatedResolution: priorityItem.estimatedResolution,
          constituent: priorityItem.constituent
        };
        
        // Add timeline entry for revert
        regularIssue.timeline.push({
          id: Date.now().toString(),
          status: 'reverted',
          timestamp: new Date().toISOString(),
          changedBy: 'Admin',
          notes: 'Reverted from priorities board'
        });
        
        // Remove from priorities and add to appropriate collection
        mockPriorityItems.splice(priorityIndex, 1);
        
        if (regularIssue.type === 'individual') {
          mockIndividualIssues.push(regularIssue);
        } else if (regularIssue.type === 'trending') {
          mockTrendingIssues.push(regularIssue);
        } else {
          mockValidatedIssues.push(regularIssue);
        }
        
        resolve(regularIssue);
      } else {
        reject(new Error('Priority item not found'));
      }
    }, 500);
  });
};

// Re-export existing functions
export { updatePriorityStatus, addToPriorities };

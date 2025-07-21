import { ConstituentIssue, DataSource, Poll, PriorityItem } from '../types/core';

export const mockDataSources: DataSource[] = [
  {
    id: '1',
    type: 'website',
    name: 'Campaign Website Contact Form',
    connected: true,
    status: 'connected',
    issuesGenerated: 12,
    lastSync: '5 minutes ago'
  },
  {
    id: '2', 
    type: 'email',
    name: 'Email Integration',
    connected: false,
    status: 'disconnected'
  },
  {
    id: '3',
    type: 'facebook',
    name: 'Facebook Groups',
    connected: false,
    status: 'disconnected'
  },
];

export const mockValidatedIssues: ConstituentIssue[] = [
  {
    id: 'v1',
    title: 'Youth Sports Program Expansion',
    description: 'Expanding youth sports programs and facility improvements at local parks',
    type: 'community',
    status: 'validated',
    source: 'ai-detected',
    priority: 'high',
    supportPercentage: 82,
    createdAt: '2025-07-01',
    updatedAt: '2025-07-15'
  },
  {
    id: 'v2',
    title: 'Community Center Funding',
    description: 'Increased funding for community center improvements and programs',
    type: 'community',
    status: 'validated', 
    source: 'ai-detected',
    priority: 'high',
    supportPercentage: 74,
    createdAt: '2025-07-02',
    updatedAt: '2025-07-14'
  },
  {
    id: 'v3',
    title: 'Community Pool Reopening',
    description: 'Reopening community pool facility for summer recreation',
    type: 'community',
    status: 'validated',
    source: 'ai-detected',
    priority: 'high',
    supportPercentage: 70,
    createdAt: '2025-07-03',
    updatedAt: '2025-07-16'
  },
  {
    id: 'v4',
    title: 'Main Street Bike Lane Development',
    description: 'Installation of dedicated bike lanes along Main Street corridor',
    type: 'community',
    status: 'validated',
    source: 'ai-detected',
    priority: 'medium',
    supportPercentage: 65,
    createdAt: '2025-07-04',
    updatedAt: '2025-07-17'
  },
  {
    id: 'v5',
    title: 'Downtown Parking Solutions',
    description: 'Implementation of new parking meters and expanded public parking areas',
    type: 'community',
    status: 'validated',
    source: 'ai-detected',
    priority: 'medium',
    supportPercentage: 58,
    createdAt: '2025-07-05',
    updatedAt: '2025-07-18'
  }
];

export const mockTrendingIssues: ConstituentIssue[] = [
  {
    id: 't1',
    title: 'Extended Library Hours',
    description: 'Requests for extended evening and weekend library hours',
    type: 'trending',
    status: 'new',
    source: 'ai-detected',
    priority: 'medium',
    mentions: 12,
    timeframe: 'this week',
    createdAt: '2025-07-18',
    updatedAt: '2025-07-20'
  },
  {
    id: 't2',
    title: 'Dog Park Construction',
    description: 'Multiple requests for a dedicated dog park in the downtown area',
    type: 'trending',
    status: 'new',
    source: 'ai-detected',
    priority: 'medium',
    mentions: 8,
    timeframe: 'this week',
    createdAt: '2025-07-17',
    updatedAt: '2025-07-20'
  },
  {
    id: 't3',
    title: 'Food Truck Permit Simplification',
    description: 'Streamlining the permit process for food truck vendors',
    type: 'trending',
    status: 'new',
    source: 'ai-detected',
    priority: 'low',
    mentions: 6,
    timeframe: 'past 2 weeks',
    createdAt: '2025-07-10',
    updatedAt: '2025-07-19'
  },
  {
    id: 't4',
    title: 'Street Festival Organization',
    description: 'Community interest in organizing regular street festivals',
    type: 'trending',
    status: 'new',
    source: 'ai-detected',
    priority: 'low',
    mentions: 5,
    timeframe: 'past month',
    createdAt: '2025-06-25',
    updatedAt: '2025-07-15'
  }
];

export const mockIndividualIssues: ConstituentIssue[] = [
  {
    id: 'i1',
    title: 'Broken streetlight on Elm St',
    description: 'Streetlight has been out for a week, making intersection dangerous',
    type: 'individual',
    status: 'new',
    source: 'website',
    priority: 'high',
    constituent: {
      name: 'Maria Rodriguez',
      email: 'maria.r@email.com'
    },
    timeframe: '2 hours ago',
    createdAt: '2025-07-20T10:00:00Z',
    updatedAt: '2025-07-20T10:00:00Z'
  },
  {
    id: 'i2',
    title: 'Pothole on Oak Avenue',
    description: 'Large pothole near the school causing traffic issues',
    type: 'individual',
    status: 'new',
    source: 'website',
    priority: 'medium',
    constituent: {
      name: 'John Smith',
      email: 'j.smith@email.com',
      phone: '555-0123'
    },
    timeframe: '1 day ago',
    createdAt: '2025-07-19T14:30:00Z',
    updatedAt: '2025-07-19T14:30:00Z'
  },
  {
    id: 'i3',
    title: 'Noise complaint - construction hours',
    description: 'Construction starting too early in residential area',
    type: 'individual',
    status: 'in-progress',
    source: 'email',
    priority: 'low',
    constituent: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com'
    },
    timeframe: '3 days ago',
    createdAt: '2025-07-17T08:15:00Z',
    updatedAt: '2025-07-18T16:45:00Z'
  },
  {
    id: 'i4',
    title: 'Sidewalk accessibility issue',
    description: 'Broken sidewalk making it difficult for wheelchair access',
    type: 'individual',
    status: 'new',
    source: 'website',
    priority: 'high',
    constituent: {
      name: 'Michael Davis',
      email: 'mdavis@email.com'
    },
    timeframe: '4 hours ago',
    createdAt: '2025-07-20T08:00:00Z',
    updatedAt: '2025-07-20T08:00:00Z'
  },
  {
    id: 'i5',
    title: 'Tree trimming request',
    description: 'Overgrown tree blocking street signs on Maple Street',
    type: 'individual',
    status: 'new',
    source: 'website',
    priority: 'low',
    constituent: {
      name: 'Lisa Chen',
      email: 'lisa.chen@email.com'
    },
    timeframe: '1 week ago',
    createdAt: '2025-07-13T11:20:00Z',
    updatedAt: '2025-07-13T11:20:00Z'
  }
];

export const mockPriorityItems: PriorityItem[] = [
  // TODO Column
  {
    id: 'p1',
    title: 'Youth Sports Program Expansion',
    description: 'Expanding youth sports programs and facility improvements at local parks',
    type: 'community',
    status: 'validated',
    source: 'ai-detected',
    priority: 'high',
    supportPercentage: 82,
    createdAt: '2025-07-01',
    updatedAt: '2025-07-15',
    boardStatus: 'todo',
    addedToBoardAt: '2025-07-18T09:00:00Z',
    estimatedDuration: '3-4 months',
    publicNotes: 'Community strongly supports this initiative. Working with Parks Department on feasibility study.',
  },
  {
    id: 'p2',
    title: 'Broken streetlight on Elm St',
    description: 'Streetlight has been out for a week, making intersection dangerous',
    type: 'individual',
    status: 'new',
    source: 'website',
    priority: 'high',
    constituent: {
      name: 'Maria Rodriguez',
      email: 'maria.r@email.com'
    },
    timeframe: '2 hours ago',
    createdAt: '2025-07-20T10:00:00Z',
    updatedAt: '2025-07-20T10:00:00Z',
    boardStatus: 'todo',
    addedToBoardAt: '2025-07-20T11:00:00Z',
    estimatedDuration: '1-2 weeks',
    publicNotes: 'Reported broken streetlight creating safety hazard. Will coordinate with utilities department.',
  },
  // IN PROGRESS Column
  {
    id: 'p3',
    title: 'Community Center Funding',
    description: 'Increased funding for community center improvements and programs',
    type: 'community',
    status: 'validated',
    source: 'ai-detected',
    priority: 'high',
    supportPercentage: 74,
    createdAt: '2025-07-02',
    updatedAt: '2025-07-14',
    boardStatus: 'in-progress',
    addedToBoardAt: '2025-07-16T14:00:00Z',
    assignee: 'City Council Budget Committee',
    estimatedDuration: '2-3 months',
    publicNotes: 'Budget proposal submitted to council. Currently reviewing funding options and community impact assessment.',
  },
  {
    id: 'p4',
    title: 'Sidewalk accessibility issue',
    description: 'Broken sidewalk making it difficult for wheelchair access',
    type: 'individual',
    status: 'in-progress',
    source: 'website',
    priority: 'high',
    constituent: {
      name: 'Michael Davis',
      email: 'mdavis@email.com'
    },
    timeframe: '4 hours ago',
    createdAt: '2025-07-20T08:00:00Z',
    updatedAt: '2025-07-20T08:00:00Z',
    boardStatus: 'in-progress',
    addedToBoardAt: '2025-07-20T09:00:00Z',
    assignee: 'Public Works Department',
    estimatedDuration: '2-3 weeks',
    publicNotes: 'Site inspection completed. Contractor scheduled for accessibility improvements.',
  },
  // COMPLETED Column
  {
    id: 'p5',
    title: 'Community Pool Reopening',
    description: 'Reopening community pool facility for summer recreation',
    type: 'community',
    status: 'resolved',
    source: 'ai-detected',
    priority: 'high',
    supportPercentage: 70,
    createdAt: '2025-07-03',
    updatedAt: '2025-07-16',
    boardStatus: 'completed',
    addedToBoardAt: '2025-07-10T10:00:00Z',
    completedAt: '2025-07-19T16:00:00Z',
    assignee: 'Parks and Recreation',
    estimatedDuration: '1 month',
    actualDuration: '9 days',
    publicNotes: 'Pool reopened successfully on July 19th. Safety inspections passed, lifeguards hired and trained.',
  },
  {
    id: 'p6',
    title: 'Noise complaint - construction hours',
    description: 'Construction starting too early in residential area - RESOLVED',
    type: 'individual',
    status: 'resolved',
    source: 'email',
    priority: 'medium',
    constituent: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com'
    },
    timeframe: '3 days ago',
    createdAt: '2025-07-17T08:15:00Z',
    updatedAt: '2025-07-18T16:45:00Z',
    boardStatus: 'completed',
    addedToBoardAt: '2025-07-17T09:00:00Z',
    completedAt: '2025-07-18T17:00:00Z',
    assignee: 'Code Enforcement',
    estimatedDuration: '1 week',
    actualDuration: '1 day',
    publicNotes: 'Contacted construction company. New hours policy implemented: no work before 8 AM in residential areas.',
  },
];

// Enhanced comprehensive issues data for the Issues page
export const mockAllIssues: ConstituentIssue[] = [
  // From validated issues
  ...mockValidatedIssues,
  
  // From trending issues  
  ...mockTrendingIssues,
  
  // From individual issues
  ...mockIndividualIssues,
  
  // Additional issues from different sources to demonstrate scale and variety
  {
    id: 'e1',
    title: 'Parking meter hours extension downtown',
    description: 'Business owners requesting extended parking meter hours to support evening customers',
    type: 'community',
    status: 'new',
    source: 'email',
    priority: 'medium',
    supportPercentage: 45,
    createdAt: '2025-07-15T09:30:00Z',
    updatedAt: '2025-07-15T09:30:00Z',
    relatedIssues: ['1'] // Related to parking enforcement issue
  },
  
  {
    id: 'e2',
    title: 'Downtown parking availability concerns',
    description: 'Multiple reports of insufficient parking spaces during peak hours',
    type: 'trending',
    status: 'new',
    source: 'facebook',
    priority: 'medium',
    mentions: 7,
    timeframe: 'past week',
    createdAt: '2025-07-14T14:15:00Z',
    updatedAt: '2025-07-19T10:30:00Z',
    relatedIssues: ['1', 'e1'] // Related to other parking issues
  },
  
  {
    id: 'e3',
    title: 'Street light maintenance on Pine St',
    description: 'Flickering streetlight causing safety concerns for pedestrians',
    type: 'individual',
    status: 'new',
    source: 'website',
    priority: 'high',
    constituent: {
      name: 'David Wilson',
      email: 'david.w@email.com',
      phone: '555-0198'
    },
    timeframe: '1 hour ago',
    createdAt: '2025-07-20T11:00:00Z',
    updatedAt: '2025-07-20T11:00:00Z',
    relatedIssues: ['2'] // Related to street lighting issue
  },
  
  {
    id: 'e4',
    title: 'Community garden space request',
    description: 'Residents interested in creating community garden in vacant lot on Maple Ave',
    type: 'community',
    status: 'new',
    source: 'website',
    priority: 'low',
    supportPercentage: 35,
    createdAt: '2025-07-12T16:20:00Z',
    updatedAt: '2025-07-18T09:45:00Z'
  },
  
  {
    id: 'e5',
    title: 'Youth basketball court improvements',
    description: 'Request for resurfacing and new hoops at Jefferson Park basketball court',
    type: 'individual',
    status: 'new',
    source: 'website',
    priority: 'medium',
    constituent: {
      name: 'Carlos Rodriguez',
      email: 'carlos.r@email.com'
    },
    timeframe: '2 days ago',
    createdAt: '2025-07-18T13:30:00Z',
    updatedAt: '2025-07-18T13:30:00Z',
    relatedIssues: ['3'] // Related to youth sports/recreation
  },
  
  {
    id: 'e6',
    title: 'Crosswalk safety improvements',
    description: 'Petition for better crosswalk lighting and signage at Main St intersection',
    type: 'trending',
    status: 'new',
    source: 'ai-detected',
    priority: 'high',
    mentions: 9,
    timeframe: 'this week',
    createdAt: '2025-07-17T08:45:00Z',
    updatedAt: '2025-07-20T07:30:00Z'
  },
  
  {
    id: 'e7',
    title: 'Library WiFi connectivity issues',
    description: 'Patrons reporting slow or unreliable internet access at main library branch',
    type: 'individual',
    status: 'in-progress',
    source: 'email',
    priority: 'medium',
    constituent: {
      name: 'Jennifer Lee',
      email: 'j.lee@email.com'
    },
    timeframe: '4 days ago',
    createdAt: '2025-07-16T10:15:00Z',
    updatedAt: '2025-07-19T14:20:00Z'
  },
  
  {
    id: 'e8',
    title: 'Snow removal equipment upgrade',
    description: 'Community requests for better snow removal response and equipment',
    type: 'community',
    status: 'new',
    source: 'facebook',
    priority: 'low',
    supportPercentage: 28,
    createdAt: '2025-07-10T11:30:00Z',
    updatedAt: '2025-07-15T16:45:00Z'
  }
];

// Group issues by similarity (keyword-based grouping)
export const issueGroups = {
  'parking': ['1', 'e1', 'e2'],
  'lighting': ['2', 'e3'],
  'recreation': ['3', 'e5'],
  'safety': ['e6'],
  'infrastructure': ['4', '6', 'e7'],
  'community-services': ['5', 'e4', 'e8']
};

// Export functions to get data (simulates API calls)
export const getValidatedIssues = (): Promise<ConstituentIssue[]> => {
  return Promise.resolve(mockValidatedIssues);
};

export const getTrendingIssues = (): Promise<ConstituentIssue[]> => {
  return Promise.resolve(mockTrendingIssues);
};

export const getIndividualIssues = (): Promise<ConstituentIssue[]> => {
  return Promise.resolve(mockIndividualIssues);
};

export const getDataSources = (): Promise<DataSource[]> => {
  return Promise.resolve(mockDataSources);
};

export const getAllIssues = (): Promise<ConstituentIssue[]> => {
  return Promise.resolve([...mockValidatedIssues, ...mockTrendingIssues, ...mockIndividualIssues]);
};

// Priority board functions
export const getPriorityItems = (): Promise<PriorityItem[]> => {
  return Promise.resolve(mockPriorityItems);
};

export const updatePriorityItemStatus = (itemId: string, newStatus: 'todo' | 'in-progress' | 'completed'): Promise<PriorityItem> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const item = mockPriorityItems.find(p => p.id === itemId);
      if (item) {
        item.boardStatus = newStatus;
        item.updatedAt = new Date().toISOString();
        if (newStatus === 'completed' && !item.completedAt) {
          item.completedAt = new Date().toISOString();
        }
        resolve(item);
      }
    }, 500); // Simulate API delay
  });
};

export const addIssueToPriorities = (issue: ConstituentIssue): Promise<PriorityItem> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const priorityItem: PriorityItem = {
        ...issue,
        boardStatus: 'todo',
        addedToBoardAt: new Date().toISOString(),
        publicNotes: `Added to priorities board from ${issue.source} source.`,
      };
      mockPriorityItems.push(priorityItem);
      resolve(priorityItem);
    }, 300);
  });
};

// Enhanced function to get all issues with grouping information
export const getAllIssuesEnhanced = (): Promise<ConstituentIssue[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAllIssues);
    }, 300); // Simulate API delay
  });
};

// Function to get issues by source
export const getIssuesBySource = (source: string): Promise<ConstituentIssue[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = source === 'all' 
        ? mockAllIssues 
        : mockAllIssues.filter(issue => issue.source === source);
      resolve(filtered);
    }, 200);
  });
};

// Function to get issues by status
export const getIssuesByStatus = (status: string): Promise<ConstituentIssue[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = status === 'all' 
        ? mockAllIssues 
        : mockAllIssues.filter(issue => issue.status === status);
      resolve(filtered);
    }, 200);
  });
};

// Function to get related issues for an issue
export const getRelatedIssues = (issueId: string): ConstituentIssue[] => {
  const issue = mockAllIssues.find(i => i.id === issueId);
  if (!issue?.relatedIssues) return [];
  
  return mockAllIssues.filter(i => issue.relatedIssues?.includes(i.id));
};

// Function to move issues to priorities board
export const moveIssuesToPriorities = (issueIds: string[]): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would update the backend
      // For now, we'll just simulate the operation
      issueIds.forEach(id => {
        const issue = mockAllIssues.find(i => i.id === id);
        if (issue) {
          issue.status = 'in-progress'; // Mark as moved to priorities
        }
      });
      resolve();
    }, 500);
  });
};

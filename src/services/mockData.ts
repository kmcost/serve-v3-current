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
  {
    id: '4',
    type: 'sms',
    name: 'Text Messages',
    connected: false,
    status: 'disconnected'
  }
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

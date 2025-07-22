import { ConstituentIssue, DataSource, Poll, PriorityItem, StatusChange, generateUniqueId } from '../types/core';

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
    type: 'crm',
    name: 'CRM Integration',
    connected: false,
    status: 'disconnected'
  }
];

export const mockValidatedIssues: ConstituentIssue[] = [
  {
    id: 'v1',
    uniqueId: 'ISU-001',
    title: 'Youth Sports Program Expansion',
    description: 'Expanding youth sports programs and facility improvements at local parks',
    type: 'community',
    status: 'validated',
    source: 'ai-detected',
    priority: 'high',
    supportPercentage: 82,
    createdAt: '2025-07-01',
    updatedAt: '2025-07-15',
    tags: ['Parks & Recreation', 'Community Services'],
    location: 'Central Park District',
    timeline: [
      { id: '1', status: 'submitted', timestamp: '2025-07-01T09:00:00Z', changedBy: 'AI System' },
      { id: '2', status: 'reviewed', timestamp: '2025-07-02T14:30:00Z', changedBy: 'Parks Department' },
      { id: '3', status: 'validated', timestamp: '2025-07-15T10:00:00Z', changedBy: 'City Council', notes: 'Approved for community validation poll' }
    ],
    assignedTo: 'Parks & Recreation Department',
    internalNotes: ['Community strongly supports this initiative', 'Budget allocation approved'],
    estimatedResolution: '3-4 months'
  },
  {
    id: 'v2',
    uniqueId: 'ISU-002',
    title: 'Community Center Funding',
    description: 'Increased funding for community center improvements and programs',
    type: 'community',
    status: 'validated', 
    source: 'ai-detected',
    priority: 'high',
    supportPercentage: 74,
    createdAt: '2025-07-02',
    updatedAt: '2025-07-14',
    tags: ['Community Services', 'Budget & Finance'],
    location: 'Downtown Community Center',
    timeline: [
      { id: '1', status: 'submitted', timestamp: '2025-07-02T09:00:00Z', changedBy: 'AI System' },
      { id: '2', status: 'validated', timestamp: '2025-07-14T11:00:00Z', changedBy: 'Budget Committee' }
    ],
    assignedTo: 'Budget Committee',
    internalNotes: ['Funding proposal submitted', 'Community impact assessment completed'],
    estimatedResolution: '2-3 months'
  },
  {
    id: 'v3',
    uniqueId: 'ISU-003',
    title: 'Community Pool Reopening',
    description: 'Reopening community pool facility for summer recreation',
    type: 'community',
    status: 'validated',
    source: 'ai-detected',
    priority: 'high',
    supportPercentage: 70,
    createdAt: '2025-07-03',
    updatedAt: '2025-07-16',
    tags: ['Parks & Recreation', 'Public Safety'],
    location: 'Riverside Pool Complex',
    timeline: [
      { id: '1', status: 'submitted', timestamp: '2025-07-03T09:00:00Z', changedBy: 'AI System' },
      { id: '2', status: 'validated', timestamp: '2025-07-16T15:00:00Z', changedBy: 'Parks Department' }
    ],
    assignedTo: 'Parks & Recreation Department',
    internalNotes: ['Safety inspection scheduled', 'Lifeguard hiring in progress'],
    estimatedResolution: '1 month'
  },
  {
    id: 'v4',
    uniqueId: 'ISU-004',
    title: 'Main Street Bike Lane Development',
    description: 'Installation of dedicated bike lanes along Main Street corridor',
    type: 'community',
    status: 'validated',
    source: 'ai-detected',
    priority: 'medium',
    supportPercentage: 65,
    createdAt: '2025-07-04',
    updatedAt: '2025-07-17',
    tags: ['Transportation', 'Infrastructure & Roads'],
    location: 'Main Street Corridor',
    timeline: [
      { id: '1', status: 'submitted', timestamp: '2025-07-04T09:00:00Z', changedBy: 'AI System' },
      { id: '2', status: 'validated', timestamp: '2025-07-17T12:00:00Z', changedBy: 'Transportation Committee' }
    ],
    assignedTo: 'Transportation Department',
    internalNotes: ['Traffic impact study required', 'Public consultation scheduled'],
    estimatedResolution: '6-8 months'
  },
  {
    id: 'v5',
    uniqueId: 'ISU-005',
    title: 'Downtown Parking Solutions',
    description: 'Implementation of new parking meters and expanded public parking areas',
    type: 'community',
    status: 'validated',
    source: 'ai-detected',
    priority: 'medium',
    supportPercentage: 58,
    createdAt: '2025-07-05',
    updatedAt: '2025-07-18',
    tags: ['Transportation', 'Economic Development'],
    location: 'Downtown District',
    timeline: [
      { id: '1', status: 'submitted', timestamp: '2025-07-05T09:00:00Z', changedBy: 'AI System' },
      { id: '2', status: 'validated', timestamp: '2025-07-18T10:00:00Z', changedBy: 'Planning Committee' }
    ],
    assignedTo: 'Planning Department',
    internalNotes: ['Merchant feedback collected', 'Parking study completed'],
    estimatedResolution: '4-5 months'
  }
];

export const mockTrendingIssues: ConstituentIssue[] = [
  {
    id: 't1',
    uniqueId: 'ISU-006',
    title: 'Extended Library Hours',
    description: 'Requests for extended evening and weekend library hours',
    type: 'trending',
    status: undefined,
    source: 'ai-detected',
    priority: undefined,
    mentions: 12,
    timeframe: 'this week',
    createdAt: '2025-07-18',
    updatedAt: '2025-07-20',
    tags: ['Community Services', 'Education'],
    timeline: [
      { id: '1', status: 'submitted', timestamp: '2025-07-18T09:00:00Z', changedBy: 'AI System' }
    ],
    internalNotes: ['Multiple social media mentions', 'Library board notified'],
    estimatedResolution: '2-3 weeks'
  },
  {
    id: 't2',
    uniqueId: 'ISU-007',
    title: 'Dog Park Construction',
    description: 'Multiple requests for a dedicated dog park in the downtown area',
    type: 'trending',
    status: undefined,
    source: 'ai-detected',
    priority: 'medium',
    mentions: 8,
    timeframe: 'this week',
    createdAt: '2025-07-17',
    updatedAt: '2025-07-20',
    tags: ['Parks & Recreation', 'Community Services'],
    location: 'Downtown Area',
    timeline: [
      { id: '1', status: 'submitted', timestamp: '2025-07-17T09:00:00Z', changedBy: 'AI System' }
    ],
    internalNotes: ['Site survey needed', 'Pet owner community engaged'],
    estimatedResolution: '6-8 months'
  },
  {
    id: 't3',
    uniqueId: 'ISU-008',
    title: 'Food Truck Permit Simplification',
    description: 'Streamlining the permit process for food truck vendors',
    type: 'trending',
    status: 'in-progress',
    source: 'ai-detected',
    priority: 'low',
    mentions: 6,
    timeframe: 'past 2 weeks',
    createdAt: '2025-07-10',
    updatedAt: '2025-07-19',
    tags: ['Economic Development', 'Budget & Finance'],
    timeline: [
      { id: '1', status: 'submitted', timestamp: '2025-07-10T09:00:00Z', changedBy: 'AI System' },
      { id: '2', status: 'in-progress', timestamp: '2025-07-19T14:00:00Z', changedBy: 'Business Licensing' }
    ],
    assignedTo: 'Business Licensing Department',
    internalNotes: ['Vendor feedback collected', 'Process review initiated'],
    estimatedResolution: '1-2 months'
  },
  {
    id: 't4',
    uniqueId: 'ISU-009',
    title: 'Street Festival Organization',
    description: 'Community interest in organizing regular street festivals',
    type: 'trending',
    status: undefined,
    source: 'ai-detected',
    priority: 'low',
    mentions: 5,
    timeframe: 'past month',
    createdAt: '2025-06-25',
    updatedAt: '2025-07-15',
    tags: ['Community Services', 'Economic Development'],
    timeline: [
      { id: '1', status: 'submitted', timestamp: '2025-06-25T09:00:00Z', changedBy: 'AI System' }
    ],
    internalNotes: ['Local business interest high', 'Event planning committee contacted'],
    estimatedResolution: '3-4 months'
  }
];

export const mockIndividualIssues: ConstituentIssue[] = [
  {
    id: 'i1',
    uniqueId: 'ISU-010',
    title: 'Broken streetlight on Elm St',
    description: 'Streetlight has been out for a week, making intersection dangerous',
    type: 'individual',
    status: undefined,
    source: 'website',
    priority: undefined,
    constituent: {
      name: 'Maria Rodriguez',
      email: 'maria.r@email.com'
    },
    timeframe: '2 hours ago',
    createdAt: '2025-07-20T10:00:00Z',
    updatedAt: '2025-07-20T10:00:00Z',
    tags: ['Infrastructure & Roads', 'Public Safety'],
    location: 'Elm Street & Oak Avenue Intersection',
    timeline: [
      { id: '1', status: 'submitted', timestamp: '2025-07-20T10:00:00Z', changedBy: 'Maria Rodriguez' }
    ],
    internalNotes: ['Safety hazard reported', 'Utilities department contacted'],
    estimatedResolution: '1-2 weeks'
  },
  {
    id: 'i2',
    uniqueId: 'ISU-011',
    title: 'Pothole on Oak Avenue',
    description: 'Large pothole near the school causing traffic issues',
    type: 'individual',
    status: undefined,
    source: 'website',
    priority: undefined,
    constituent: {
      name: 'John Smith',
      email: 'j.smith@email.com',
      phone: '555-0123'
    },
    timeframe: '1 day ago',
    createdAt: '2025-07-19T14:30:00Z',
    updatedAt: '2025-07-19T14:30:00Z',
    tags: ['Infrastructure & Roads', 'Public Safety'],
    location: 'Oak Avenue near Elementary School',
    timeline: [
      { id: '1', status: 'submitted', timestamp: '2025-07-19T14:30:00Z', changedBy: 'John Smith' }
    ],
    internalNotes: ['School zone priority', 'Road crew scheduled'],
    estimatedResolution: '3-5 days'
  },
  {
    id: 'i3',
    uniqueId: 'ISU-012',
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
    updatedAt: '2025-07-18T16:45:00Z',
    tags: ['Public Safety', 'Community Services'],
    location: 'Maple Street Residential Area',
    timeline: [
      { id: '1', status: 'submitted', timestamp: '2025-07-17T08:15:00Z', changedBy: 'Sarah Johnson' },
      { id: '2', status: 'in-progress', timestamp: '2025-07-18T16:45:00Z', changedBy: 'Code Enforcement' }
    ],
    assignedTo: 'Code Enforcement',
    internalNotes: ['Contractor contacted', 'New hours policy needed'],
    estimatedResolution: '1 week'
  },
  {
    id: 'i4',
    uniqueId: 'ISU-013',
    title: 'Sidewalk accessibility issue',
    description: 'Broken sidewalk making it difficult for wheelchair access',
    type: 'individual',
    status: undefined,
    source: 'website',
    priority: undefined,
    constituent: {
      name: 'Michael Davis',
      email: 'mdavis@email.com'
    },
    timeframe: '4 hours ago',
    createdAt: '2025-07-20T08:00:00Z',
    updatedAt: '2025-07-20T08:00:00Z',
    tags: ['Infrastructure & Roads', 'Public Safety'],
    location: 'Pine Street Sidewalk',
    timeline: [
      { id: '1', status: 'submitted', timestamp: '2025-07-20T08:00:00Z', changedBy: 'Michael Davis' }
    ],
    internalNotes: ['ADA compliance issue', 'Priority repair needed'],
    estimatedResolution: '2-3 weeks'
  },
  {
    id: 'i5',
    uniqueId: 'ISU-014',
    title: 'Tree trimming request',
    description: 'Overgrown tree blocking street signs on Maple Street',
    type: 'individual',
    status: 'resolved',
    source: 'website',
    priority: 'low',
    constituent: {
      name: 'Lisa Chen',
      email: 'lisa.chen@email.com'
    },
    timeframe: '1 week ago',
    createdAt: '2024-11-13T11:20:00Z',
    updatedAt: '2024-11-13T11:20:00Z',
    tags: ['Parks & Recreation', 'Public Safety'],
    location: 'Maple Street',
    timeline: [
      { id: '1', status: 'submitted', timestamp: '2024-11-13T11:20:00Z', changedBy: 'Lisa Chen' },
      { id: '2', status: 'resolved', timestamp: '2024-11-20T10:00:00Z', changedBy: 'Parks Department' }
    ],
    assignedTo: 'Parks Department',
    internalNotes: ['Tree crew dispatched', 'Work completed successfully'],
    estimatedResolution: '1 week'
  }
];

export const mockPriorityItems: PriorityItem[] = [
  // TODO Column
  {
    id: 'p1',
    uniqueId: 'ISU-015',
    title: 'Youth Sports Program Expansion',
    description: 'Expanding youth sports programs and facility improvements at local parks',
    type: 'community',
    status: 'validated',
    source: 'ai-detected',
    priority: 'high',
    supportPercentage: 82,
    createdAt: '2025-07-01',
    updatedAt: '2025-07-15',
    tags: ['Parks & Recreation', 'Community Services'],
    location: 'Central Park District',
    timeline: [
      { id: '1', status: 'submitted', timestamp: '2025-07-01T09:00:00Z', changedBy: 'AI System' },
      { id: '2', status: 'validated', timestamp: '2025-07-15T10:00:00Z', changedBy: 'City Council' }
    ],
    assignedTo: 'Parks & Recreation Department',
    internalNotes: ['Community strongly supports this initiative', 'Working with Parks Department on feasibility study'],
    estimatedResolution: '3-4 months',
    boardStatus: 'todo',
    addedToBoardAt: '2025-07-18T09:00:00Z',
    estimatedDuration: '3-4 months',
    publicNotes: 'Community strongly supports this initiative. Working with Parks Department on feasibility study.',
  },
  {
    id: 'p2',
    uniqueId: 'ISU-016',
    title: 'Broken streetlight on Elm St',
    description: 'Streetlight has been out for a week, making intersection dangerous',
    type: 'individual',
    status: undefined,
    source: 'website',
    priority: undefined,
    constituent: {
      name: 'Maria Rodriguez',
      email: 'maria.r@email.com'
    },
    timeframe: '2 hours ago',
    createdAt: '2025-07-20T10:00:00Z',
    updatedAt: '2025-07-20T10:00:00Z',
    tags: ['Infrastructure & Roads', 'Public Safety'],
    location: 'Elm Street & Oak Avenue Intersection',
    timeline: [
      { id: '1', status: 'submitted', timestamp: '2025-07-20T10:00:00Z', changedBy: 'Maria Rodriguez' }
    ],
    internalNotes: ['Safety hazard reported', 'Utilities department contacted'],
    estimatedResolution: '1-2 weeks',
    boardStatus: 'todo',
    addedToBoardAt: '2025-07-20T11:00:00Z',
    estimatedDuration: '1-2 weeks',
    publicNotes: 'Reported broken streetlight creating safety hazard. Will coordinate with utilities department.',
  },
  // IN PROGRESS Column
  {
    id: 'p3',
    uniqueId: 'ISU-017',
    title: 'Community Center Funding',
    description: 'Increased funding for community center improvements and programs',
    type: 'community',
    status: 'validated',
    source: 'ai-detected',
    priority: 'high',
    supportPercentage: 74,
    createdAt: '2025-07-02',
    updatedAt: '2025-07-14',
    tags: ['Community Services', 'Budget & Finance'],
    location: 'Downtown Community Center',
    timeline: [
      { id: '1', status: 'submitted', timestamp: '2025-07-02T09:00:00Z', changedBy: 'AI System' },
      { id: '2', status: 'validated', timestamp: '2025-07-14T11:00:00Z', changedBy: 'Budget Committee' }
    ],
    assignedTo: 'Budget Committee',
    internalNotes: ['Funding proposal submitted', 'Community impact assessment completed'],
    estimatedResolution: '2-3 months',
    boardStatus: 'in-progress',
    addedToBoardAt: '2025-07-16T14:00:00Z',
    assignee: 'City Council Budget Committee',
    estimatedDuration: '2-3 months',
    publicNotes: 'Budget proposal submitted to council. Currently reviewing funding options and community impact assessment.',
  },
  {
    id: 'p4',
    uniqueId: 'ISU-018',
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
    tags: ['Infrastructure & Roads', 'Public Safety'],
    location: 'Pine Street Sidewalk',
    timeline: [
      { id: '1', status: 'submitted', timestamp: '2025-07-20T08:00:00Z', changedBy: 'Michael Davis' },
      { id: '2', status: 'in-progress', timestamp: '2025-07-21T09:00:00Z', changedBy: 'Public Works Department' }
    ],
    assignedTo: 'Public Works Department',
    estimatedDuration: '2-3 weeks',
    boardStatus: 'in-progress',
    addedToBoardAt: '2025-07-20T09:00:00Z',
    publicNotes: 'Site inspection completed. Contractor scheduled for accessibility improvements.',
  },
  // COMPLETED Column
  {
    id: 'p5',
    uniqueId: 'ISU-019',
    title: 'Community Pool Reopening',
    description: 'Reopening community pool facility for summer recreation',
    type: 'community',
    status: 'resolved',
    source: 'ai-detected',
    priority: 'high',
    supportPercentage: 70,
    createdAt: '2025-07-03',
    updatedAt: '2025-07-16',
    tags: ['Parks & Recreation', 'Public Safety'],
    location: 'Riverside Pool Complex',
    timeline: [
      { id: '1', status: 'submitted', timestamp: '2025-07-03T09:00:00Z', changedBy: 'AI System' },
      { id: '2', status: 'resolved', timestamp: '2025-07-19T16:00:00Z', changedBy: 'Parks and Recreation' }
    ],
    assignedTo: 'Parks and Recreation',
    internalNotes: ['Safety inspections passed', 'Lifeguards hired and trained'],
    estimatedResolution: '1 month',
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
    uniqueId: 'ISU-020',
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
    tags: ['Public Safety', 'Community Services'],
    location: 'Maple Street Residential Area',
    timeline: [
      { id: '1', status: 'submitted', timestamp: '2025-07-17T08:15:00Z', changedBy: 'Sarah Johnson' },
      { id: '2', status: 'resolved', timestamp: '2025-07-18T17:00:00Z', changedBy: 'Code Enforcement' }
    ],
    assignedTo: 'Code Enforcement',
    internalNotes: ['Contractor contacted', 'New hours policy implemented'],
    estimatedResolution: '1 week',
    boardStatus: 'completed',
    addedToBoardAt: '2025-07-17T09:00:00Z',
    completedAt: '2025-07-18T17:00:00Z',
    assignee: 'Code Enforcement',
    estimatedDuration: '1 week',
    actualDuration: '1 day',
    publicNotes: 'Contacted construction company. New hours policy implemented: no work before 8 AM in residential areas.',
  },
];

export const mockAllIssues: ConstituentIssue[] = [
  ...mockValidatedIssues,
  ...mockTrendingIssues,
  ...mockIndividualIssues,
];

export const getIssueById = (id: string): Promise<ConstituentIssue | PriorityItem | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allIssues = [...mockValidatedIssues, ...mockTrendingIssues, ...mockIndividualIssues];
      const regularIssue = allIssues.find(issue => issue.id === id);
      
      if (regularIssue) {
        resolve(regularIssue);
        return;
      }
      
      const priorityItem = mockPriorityItems.find(item => item.id === id);
      if (priorityItem) {
        resolve(priorityItem);
        return;
      }
      
      resolve(null);
    }, 200);
  });
};
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
    }, 500);
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

export const getAllIssuesEnhanced = (): Promise<ConstituentIssue[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allIssues = [...mockValidatedIssues, ...mockTrendingIssues, ...mockIndividualIssues];
      resolve(allIssues);
    }, 300);
  });
};

export const getIssuesBySource = (source: string): Promise<ConstituentIssue[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allIssues = [...mockValidatedIssues, ...mockTrendingIssues, ...mockIndividualIssues];
      const filtered = source === 'all' 
        ? allIssues 
        : allIssues.filter(issue => issue.source === source);
      resolve(filtered);
    }, 200);
  });
};

export const getIssuesByStatus = (status: string): Promise<ConstituentIssue[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allIssues = [...mockValidatedIssues, ...mockTrendingIssues, ...mockIndividualIssues];
      const filtered = status === 'all' 
        ? allIssues 
        : allIssues.filter(issue => issue.status === status);
      resolve(filtered);
    }, 200);
  });
};

export const getRelatedIssues = (issueId: string): ConstituentIssue[] => {
  const allIssues = [...mockValidatedIssues, ...mockTrendingIssues, ...mockIndividualIssues];
  const issue = allIssues.find(i => i.id === issueId);
  if (!issue?.relatedIssues) return [];
  
  return allIssues.filter(i => issue.relatedIssues?.includes(i.id));
};

export const moveIssuesToPriorities = (issueIds: string[]): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allIssues = [...mockValidatedIssues, ...mockTrendingIssues, ...mockIndividualIssues];
      issueIds.forEach(id => {
        const issue = allIssues.find(i => i.id === id);
        if (issue) {
          issue.status = 'in-progress';
        }
      });
      resolve();
    }, 500);
  });
};

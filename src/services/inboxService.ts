import { EnhancedMessage, MessageThread } from '@/types/inbox';
import { ConstituentIssue } from '@/types/core';

const mockMessages: EnhancedMessage[] = [
  {
    id: '1',
    from: 'Maria Rodriguez',
    email: 'maria.r@email.com',
    phone: '(510) 555-0123',
    subject: 'Broken streetlight on Elm St',
    message: 'There\'s a broken streetlight on Elm St between 5th and 6th. It\'s been out for a week and it\'s making that intersection really dangerous at night. I\'ve seen two near-miss accidents already. Can someone please get this fixed? I\'m happy to provide more details if needed.',
    preview: 'There\'s a broken streetlight on Elm St between 5th and 6th. It\'s been out for a week...',
    time: '2 hours ago',
    source: 'website',
    status: 'unread',
    priority: 'high',
    isRead: false,
    relatedIssues: ['issue-1'],
    metadata: {
      formData: {
        category: 'Infrastructure',
        location: 'Elm St & 5th Ave',
        urgency: 'High'
      }
    },
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    from: 'John Kim',
    email: 'john.kim@email.com',
    phone: '(510) 555-0456',
    subject: 'Parking enforcement complaint',
    message: 'The parking enforcement officers have been very aggressive lately. I got a ticket for being 2 minutes over the meter limit. This seems excessive and is hurting local businesses.',
    preview: 'The parking enforcement officers have been very aggressive lately. I got a ticket...',
    time: '4 hours ago',
    source: 'email',
    status: 'read',
    priority: 'medium',
    isRead: true,
    relatedMessages: ['3'],
    metadata: {
      emailHeaders: {
        'Message-ID': '<abc123@gmail.com>',
        'Thread-Index': 'AQHWqR4='
      }
    },
    createdAt: '2024-01-15T08:15:00Z',
    updatedAt: '2024-01-15T08:15:00Z'
  },
  {
    id: '3',
    from: 'John Kim',
    email: 'john.kim@email.com',
    phone: '(510) 555-0456',
    subject: 'Re: Parking enforcement complaint',
    message: 'I wanted to add that this happened on Main Street near the coffee shop. The officer didn\'t seem to care that I was only 2 minutes over.',
    preview: 'I wanted to add that this happened on Main Street near the coffee shop...',
    time: '3 hours ago',
    source: 'email',
    status: 'read',
    priority: 'medium',
    isRead: true,
    relatedMessages: ['2'],
    metadata: {
      emailHeaders: {
        'Message-ID': '<def456@gmail.com>',
        'Thread-Index': 'AQHWqR4=',
        'In-Reply-To': '<abc123@gmail.com>'
      }
    },
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z'
  },
  {
    id: '4',
    from: 'Lisa Thompson',
    email: 'lisa.t@email.com',
    subject: 'Dog park funding support',
    message: 'I wanted to follow up on the proposed dog park funding. Many residents in my neighborhood are very supportive of this initiative. We have 15 signatures already.',
    preview: 'I wanted to follow up on the proposed dog park funding. Many residents...',
    time: '1 day ago',
    source: 'facebook',
    status: 'responded',
    priority: 'medium',
    isRead: true,
    relatedIssues: ['issue-2'],
    metadata: {
      socialProfile: {
        name: 'Lisa Thompson',
        profileUrl: 'https://facebook.com/lisa.thompson'
      }
    },
    createdAt: '2024-01-14T16:20:00Z',
    updatedAt: '2024-01-14T16:20:00Z'
  },
  {
    id: '5',
    from: 'Robert Chen',
    email: 'rchen@oaklandresident.org',
    phone: '(510) 555-0789',
    subject: 'Community center hours extension',
    message: 'Could you please consider extending the community center hours? Many working parents can\'t use the facility with current hours.',
    preview: 'Could you please consider extending the community center hours? Many working...',
    time: '1 day ago',
    source: 'sms',
    status: 'issue-created',
    priority: 'high',
    isRead: true,
    relatedIssues: ['issue-3'],
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-14T14:30:00Z'
  },
  {
    id: '6',
    from: 'Patricia Williams',
    email: 'p.williams@email.com',
    phone: '(510) 555-0321',
    subject: 'Noise ordinance violation',
    message: 'There\'s a construction site that starts work at 6 AM every day, which violates the noise ordinance. This has been going on for 2 weeks.',
    preview: 'There\'s a construction site that starts work at 6 AM every day...',
    time: '2 days ago',
    source: 'website',
    status: 'unread',
    priority: 'high',
    isRead: false,
    metadata: {
      formData: {
        category: 'Noise Complaint',
        location: '123 Oak Street',
        timeOfDay: 'Early Morning'
      }
    },
    createdAt: '2024-01-13T11:45:00Z',
    updatedAt: '2024-01-13T11:45:00Z'
  }
];

export const getEnhancedMessages = async (): Promise<EnhancedMessage[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Sort messages: unread first, then by newest date
  const sortedMessages = [...mockMessages].sort((a, b) => {
    // First sort by read status (unread first)
    if (a.isRead !== b.isRead) {
      return a.isRead ? 1 : -1;
    }
    
    // Then sort by date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  
  return sortedMessages;
};

export const getMessageById = async (id: string): Promise<EnhancedMessage | null> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockMessages.find(msg => msg.id === id) || null;
};

export const getMessageThread = async (messageId: string): Promise<MessageThread | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const message = mockMessages.find(msg => msg.id === messageId);
  if (!message) return null;
  
  const relatedMessages = mockMessages.filter(msg => 
    msg.relatedMessages?.includes(messageId) || 
    message.relatedMessages?.includes(msg.id) ||
    msg.id === messageId
  );
  
  return {
    id: `thread-${messageId}`,
    messages: relatedMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
    participants: [...new Set(relatedMessages.map(msg => msg.from))],
    subject: message.subject,
    lastActivity: Math.max(...relatedMessages.map(msg => new Date(msg.updatedAt).getTime())).toString()
  };
};

export const createIssueFromMessage = async (messageId: string, issueData: Partial<ConstituentIssue>): Promise<ConstituentIssue> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const message = mockMessages.find(msg => msg.id === messageId);
  if (!message) throw new Error('Message not found');
  
  // Update message status
  message.status = 'issue-created';
  message.updatedAt = new Date().toISOString();
  
  const newIssue: ConstituentIssue = {
    id: `issue-${Date.now()}`,
    title: issueData.title || message.subject,
    description: issueData.description || message.message,
    type: issueData.type || 'individual',
    status: 'new',
    source: message.source,
    priority: message.priority,
    constituent: {
      name: message.from,
      email: message.email,
      phone: message.phone
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...issueData
  };
  
  // Add issue reference to message
  if (!message.relatedIssues) message.relatedIssues = [];
  message.relatedIssues.push(newIssue.id);
  
  return newIssue;
};

export const updateMessageStatus = async (messageId: string, status: EnhancedMessage['status']): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const message = mockMessages.find(msg => msg.id === messageId);
  if (message) {
    message.status = status;
    message.isRead = status !== 'unread';
    message.updatedAt = new Date().toISOString();
  }
};

export const bulkUpdateMessages = async (messageIds: string[], updates: Partial<EnhancedMessage>): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  messageIds.forEach(id => {
    const message = mockMessages.find(msg => msg.id === id);
    if (message) {
      Object.assign(message, updates);
      message.updatedAt = new Date().toISOString();
    }
  });
};

// Add this new function to handle website form submissions
export const addWebsiteMessage = async (message: EnhancedMessage): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Add the new message to the beginning of the array (most recent first)
  mockMessages.unshift(message);
};

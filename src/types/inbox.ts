
import { ConstituentIssue } from './core';

export interface EnhancedMessage {
  id: string;
  from: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  preview: string;
  time: string;
  source: 'website' | 'email' | 'facebook' | 'sms';
  status: 'unread' | 'read' | 'responded' | 'issue-created' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  isRead: boolean;
  hasAttachments?: boolean;
  relatedIssues?: string[];
  relatedMessages?: string[];
  metadata?: {
    formData?: Record<string, any>;
    emailHeaders?: Record<string, string>;
    socialProfile?: {
      name: string;
      profileUrl: string;
    };
    location?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface MessageThread {
  id: string;
  messages: EnhancedMessage[];
  participants: string[];
  subject: string;
  lastActivity: string;
}

export interface MessageFilters {
  searchTerm: string;
  sources: string[];
  statuses: string[];
  priorities: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

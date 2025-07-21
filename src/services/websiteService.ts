
import { EnhancedMessage } from '@/types/inbox';
import { addWebsiteMessage } from '@/services/inboxService';

export interface WebsiteContactFormData {
  name: string;
  email: string;
  phone?: string;
  category: 'General' | 'Infrastructure' | 'Public Safety' | 'Education' | 'Other';
  message: string;
}

export const submitWebsiteContactForm = async (formData: WebsiteContactFormData): Promise<EnhancedMessage> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newMessage: EnhancedMessage = {
    id: `web-${Date.now()}`,
    from: formData.name,
    email: formData.email,
    phone: formData.phone || undefined,
    subject: `Website Contact - ${formData.category}`,
    message: formData.message,
    preview: formData.message.substring(0, 100) + (formData.message.length > 100 ? '...' : ''),
    time: 'just now',
    source: 'website',
    status: 'unread',
    priority: 'medium',
    isRead: false,
    metadata: {
      formData: {
        category: formData.category,
        submittedVia: 'Campaign Website Contact Form'
      }
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // Add to inbox service
  await addWebsiteMessage(newMessage);
  
  return newMessage;
};

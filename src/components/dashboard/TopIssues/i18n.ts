// Internationalization constants and utilities for TopIssues
export const I18N_KEYS = {
  // Component titles and labels
  TITLE: 'topIssues.title',
  VIEW_ALL_LINK: 'topIssues.viewAllLink',
  VIEW_DETAILS_BUTTON: 'topIssues.viewDetailsButton',
  
  // States
  LOADING_LABEL: 'topIssues.loading.label',
  ERROR_TITLE: 'topIssues.error.title',
  ERROR_RETRY: 'topIssues.error.retry',
  EMPTY_MESSAGE: 'topIssues.empty.message',
  
  // Accessibility
  SUPPORT_PERCENTAGE: 'topIssues.accessibility.supportPercentage',
  ISSUE_LIST_LABEL: 'topIssues.accessibility.issueListLabel',
  VIEW_DETAILS_ARIA: 'topIssues.accessibility.viewDetailsAria',
  VIEW_ALL_ARIA: 'topIssues.accessibility.viewAllAria',
  LOADING_ARIA: 'topIssues.accessibility.loadingAria',
  
  // Navigation announcements
  NAVIGATION_FOCUS: 'topIssues.navigation.focus',
  NAVIGATION_FIRST: 'topIssues.navigation.first',
  NAVIGATION_LAST: 'topIssues.navigation.last',
} as const;

// Default English text content (fallback when i18n is not available)
export const DEFAULT_CONTENT = {
  [I18N_KEYS.TITLE]: 'Top 5 Issues',
  [I18N_KEYS.VIEW_ALL_LINK]: 'View All Issues',
  [I18N_KEYS.VIEW_DETAILS_BUTTON]: 'View Details',
  
  [I18N_KEYS.LOADING_LABEL]: 'Loading top issues',
  [I18N_KEYS.ERROR_TITLE]: 'Error loading issues',
  [I18N_KEYS.ERROR_RETRY]: 'Try again',
  [I18N_KEYS.EMPTY_MESSAGE]: 'No issues available at the moment.',
  
  [I18N_KEYS.SUPPORT_PERCENTAGE]: '{percentage} percent support',
  [I18N_KEYS.ISSUE_LIST_LABEL]: 'Top community issues by support percentage',
  [I18N_KEYS.VIEW_DETAILS_ARIA]: 'View details for {title}',
  [I18N_KEYS.VIEW_ALL_ARIA]: 'View all community issues',
  [I18N_KEYS.LOADING_ARIA]: 'Loading top issues',
  
  [I18N_KEYS.NAVIGATION_FOCUS]: 'Issue {current} of {total} focused',
  [I18N_KEYS.NAVIGATION_FIRST]: 'First issue focused',
  [I18N_KEYS.NAVIGATION_LAST]: 'Last issue focused',
} as const;

// Simple i18n utility function (can be replaced with proper i18n library)
export function t(key: string, params?: Record<string, string | number>): string {
  const text = DEFAULT_CONTENT[key as keyof typeof DEFAULT_CONTENT] || key;
  
  if (params) {
    return Object.entries(params).reduce((result, [paramKey, value]) => {
      return result.replace(`{${paramKey}}`, String(value));
    }, text);
  }
  
  return text;
}

// Text content helpers for specific use cases
export const getAriaLabel = {
  supportPercentage: (percentage: number) => 
    t(I18N_KEYS.SUPPORT_PERCENTAGE, { percentage }),
    
  viewDetails: (title: string) => 
    t(I18N_KEYS.VIEW_DETAILS_ARIA, { title }),
    
  navigationFocus: (current: number, total: number) => 
    t(I18N_KEYS.NAVIGATION_FOCUS, { current, total }),
} as const;
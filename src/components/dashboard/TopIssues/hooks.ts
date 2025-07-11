import React, { useState, useEffect, useCallback } from 'react';
import { Issue } from '@/types/issues';

// Performance monitoring hook for TopIssues component
export function useTopIssuesPerformance() {
  const [renderCount, setRenderCount] = useState(0);
  const [lastRenderTime, setLastRenderTime] = useState<number>(0);

  useEffect(() => {
    const startTime = performance.now();
    setRenderCount(prev => prev + 1);
    
    return () => {
      const endTime = performance.now();
      setLastRenderTime(endTime - startTime);
      
      // Log performance metrics in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`TopIssues render #${renderCount + 1} took ${endTime - startTime}ms`);
      }
    };
  });

  return {
    renderCount,
    lastRenderTime,
    performanceData: {
      averageRenderTime: lastRenderTime,
      totalRenders: renderCount,
    },
  };
}

// Advanced accessibility hook for keyboard navigation and screen readers
export function useTopIssuesAccessibility() {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [announcements, setAnnouncements] = useState<string>('');

  const handleKeyNavigation = useCallback((
    event: React.KeyboardEvent,
    itemCount: number,
    onItemSelect?: (index: number) => void
  ) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex(prev => {
          const next = prev < itemCount - 1 ? prev + 1 : 0;
          setAnnouncements(`Issue ${next + 1} of ${itemCount} focused`);
          return next;
        });
        break;
      
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex(prev => {
          const next = prev > 0 ? prev - 1 : itemCount - 1;
          setAnnouncements(`Issue ${next + 1} of ${itemCount} focused`);
          return next;
        });
        break;
      
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (focusedIndex >= 0 && onItemSelect) {
          onItemSelect(focusedIndex);
        }
        break;
      
      case 'Home':
        event.preventDefault();
        setFocusedIndex(0);
        setAnnouncements(`First issue focused`);
        break;
      
      case 'End':
        event.preventDefault();
        setFocusedIndex(itemCount - 1);
        setAnnouncements(`Last issue focused`);
        break;
    }
  }, [focusedIndex]);

  const announceChange = useCallback((message: string) => {
    setAnnouncements(message);
    // Clear announcement after screen reader has time to read it
    setTimeout(() => setAnnouncements(''), 1000);
  }, []);

  return {
    focusedIndex,
    announcements,
    handleKeyNavigation,
    announceChange,
    setFocusedIndex,
  };
}

// Data validation and sanitization hook
export function useTopIssuesValidation(issues: Issue[], loading: boolean) {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [sanitizedIssues, setSanitizedIssues] = useState<Issue[]>([]);

  useEffect(() => {
    if (loading) return;

    const errors: string[] = [];
    const sanitized: Issue[] = [];

    issues.forEach((issue, index) => {
      // Validate required fields
      if (!issue.id) {
        errors.push(`Issue at index ${index} missing required ID`);
        return;
      }
      
      if (!issue.title?.trim()) {
        errors.push(`Issue ${issue.id} missing required title`);
        return;
      }
      
      if (typeof issue.supportPercentage !== 'number' || 
          issue.supportPercentage < 0 || 
          issue.supportPercentage > 100) {
        errors.push(`Issue ${issue.id} has invalid support percentage`);
        return;
      }

      // Sanitize data
      const sanitizedIssue: Issue = {
        ...issue,
        title: issue.title.trim(),
        description: issue.description?.trim() || '',
        supportPercentage: Math.round(issue.supportPercentage),
      };

      sanitized.push(sanitizedIssue);
    });

    setValidationErrors(errors);
    setSanitizedIssues(sanitized);

    // Log validation errors in development
    if (process.env.NODE_ENV === 'development' && errors.length > 0) {
      console.warn('TopIssues validation errors:', errors);
    }
  }, [issues, loading]);

  return {
    validationErrors,
    sanitizedIssues,
    isValid: validationErrors.length === 0,
  };
}

// Loading state management hook with retry capability
export function useTopIssuesLoading(
  initialLoading: boolean = false,
  onRetry?: () => Promise<void>
) {
  const [loading, setLoading] = useState(initialLoading);
  const [retryCount, setRetryCount] = useState(0);
  const [lastRetryTime, setLastRetryTime] = useState<Date | null>(null);

  const retry = useCallback(async () => {
    if (!onRetry) return;
    
    setLoading(true);
    setRetryCount(prev => prev + 1);
    setLastRetryTime(new Date());
    
    try {
      await onRetry();
    } catch (error) {
      console.error('TopIssues retry failed:', error);
    } finally {
      setLoading(false);
    }
  }, [onRetry]);

  const canRetry = useCallback(() => {
    if (!lastRetryTime) return true;
    const timeSinceLastRetry = Date.now() - lastRetryTime.getTime();
    return timeSinceLastRetry > 5000; // 5 second cooldown
  }, [lastRetryTime]);

  return {
    loading,
    retryCount,
    lastRetryTime,
    retry,
    canRetry: canRetry(),
    setLoading,
  };
}
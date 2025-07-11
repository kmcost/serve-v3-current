import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Issue } from '@/types/issues';

// Advanced error recovery strategies
export interface ErrorRecoveryOptions {
  maxRetries?: number;
  retryDelay?: number;
  fallbackData?: Issue[];
  onRecoveryAttempt?: (attempt: number) => void;
  onRecoverySuccess?: () => void;
  onRecoveryFailure?: (error: Error) => void;
}

export function useErrorRecovery(options: ErrorRecoveryOptions = {}) {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    fallbackData = [],
    onRecoveryAttempt,
    onRecoverySuccess,
    onRecoveryFailure,
  } = options;

  const [retryCount, setRetryCount] = useState(0);
  const [isRecovering, setIsRecovering] = useState(false);
  const [lastError, setLastError] = useState<Error | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout>();

  const attemptRecovery = useCallback(async (recoveryFn: () => Promise<void>) => {
    if (retryCount >= maxRetries) {
      onRecoveryFailure?.(new Error(`Max retries (${maxRetries}) exceeded`));
      return false;
    }

    setIsRecovering(true);
    onRecoveryAttempt?.(retryCount + 1);

    try {
      await new Promise(resolve => setTimeout(resolve, retryDelay * (retryCount + 1)));
      await recoveryFn();
      
      setRetryCount(0);
      setLastError(null);
      setIsRecovering(false);
      onRecoverySuccess?.();
      return true;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(String(error));
      setLastError(errorObj);
      setRetryCount(prev => prev + 1);
      setIsRecovering(false);
      
      if (retryCount + 1 >= maxRetries) {
        onRecoveryFailure?.(errorObj);
        return false;
      }
      
      return false;
    }
  }, [retryCount, maxRetries, retryDelay, onRecoveryAttempt, onRecoverySuccess, onRecoveryFailure]);

  const reset = useCallback(() => {
    setRetryCount(0);
    setLastError(null);
    setIsRecovering(false);
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  return {
    attemptRecovery,
    reset,
    retryCount,
    isRecovering,
    lastError,
    canRetry: retryCount < maxRetries,
    fallbackData,
  };
}

// Advanced state management for TopIssues
export function useTopIssuesState(initialIssues?: Issue[]) {
  const [issues, setIssues] = useState<Issue[]>(initialIssues || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState({
    lastUpdated: new Date(),
    source: 'cache' as 'cache' | 'network' | 'fallback',
    version: 1,
  });

  const updateIssues = useCallback((newIssues: Issue[], source: 'cache' | 'network' | 'fallback' = 'network') => {
    setIssues(newIssues);
    setMetadata(prev => ({
      ...prev,
      lastUpdated: new Date(),
      source,
      version: prev.version + 1,
    }));
    setError(null);
  }, []);

  const setLoadingState = useCallback((isLoading: boolean) => {
    setLoading(isLoading);
    if (isLoading) {
      setError(null);
    }
  }, []);

  const setErrorState = useCallback((errorMessage: string) => {
    setError(errorMessage);
    setLoading(false);
  }, []);

  return {
    issues,
    loading,
    error,
    metadata,
    actions: {
      updateIssues,
      setLoadingState,
      setErrorState,
      setIssues,
    },
  };
}

// Performance optimization utilities
export function usePerformanceOptimization() {
  const renderTimeRef = useRef<number>(0);
  const mountTimeRef = useRef<number>(Date.now());
  
  useEffect(() => {
    renderTimeRef.current = Date.now();
  });

  const getPerformanceMetrics = useCallback(() => {
    return {
      componentAge: Date.now() - mountTimeRef.current,
      lastRenderTime: renderTimeRef.current,
      renderDuration: Date.now() - renderTimeRef.current,
    };
  }, []);

  const logPerformanceWarning = useCallback((threshold: number = 100) => {
    const duration = Date.now() - renderTimeRef.current;
    if (duration > threshold) {
      console.warn(`TopIssues render took ${duration}ms (threshold: ${threshold}ms)`);
    }
  }, []);

  return {
    getPerformanceMetrics,
    logPerformanceWarning,
  };
}
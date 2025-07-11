import React, { useMemo } from 'react';
import { topIssues, Issue, validateIssues } from '@/types/issues';
import { IssueCard } from './IssueCard';
import { IssueHeader } from './IssueHeader';
import { DESIGN_TOKENS, getSkeletonClasses, getErrorClasses, getEmptyStateClasses } from './styles';
import { 
  useTopIssuesPerformance, 
  useTopIssuesAccessibility, 
  useTopIssuesValidation 
} from './hooks';
import { useErrorRecovery, usePerformanceOptimization } from './advanced-hooks';
import { t, I18N_KEYS, getAriaLabel } from './i18n';

interface TopIssuesProps {
  issues?: Issue[];
  loading?: boolean;
  error?: string | null;
}

export const TopIssues = React.memo(function TopIssues({ 
  issues = topIssues, 
  loading = false, 
  error = null 
}: TopIssuesProps) {
  // Performance monitoring and optimization
  const { performanceData } = useTopIssuesPerformance();
  const { getPerformanceMetrics, logPerformanceWarning } = usePerformanceOptimization();
  
  // Error recovery
  const errorRecovery = useErrorRecovery({
    maxRetries: 3,
    retryDelay: 2000,
    fallbackData: topIssues.slice(0, 5),
  });
  
  // Accessibility features
  const { 
    focusedIndex, 
    announcements, 
    handleKeyNavigation, 
    announceChange 
  } = useTopIssuesAccessibility();
  
  // Data validation
  const { validationErrors, sanitizedIssues, isValid } = useTopIssuesValidation(issues || [], loading);
  
  // Use validated issues instead of raw issues
  const validatedIssues = useMemo(() => {
    const result = sanitizedIssues.slice(0, 5); // Ensure max 5 issues
    
    // Log performance warning if needed
    if (process.env.NODE_ENV === 'development') {
      logPerformanceWarning(50); // 50ms threshold
    }
    
    return result;
  }, [sanitizedIssues, logPerformanceWarning]);

  // Memoize loading skeleton to prevent unnecessary re-renders
  const loadingSkeleton = useMemo(() => (
    Array.from({ length: 5 }, (_, index) => (
      <div 
        key={`skeleton-${index}`}
        className={`${DESIGN_TOKENS.layout.card} ${DESIGN_TOKENS.states.loading}`}
        aria-hidden="true"
      >
        <div className={DESIGN_TOKENS.spacing.card}>
          <div className={getSkeletonClasses('w-32')}></div>
          <div className={getSkeletonClasses('w-3/4')}></div>
          <div className={getSkeletonClasses('w-full')}></div>
          <div className={getSkeletonClasses('w-full')} style={{ height: '2rem' }}></div>
        </div>
      </div>
    ))
  ), []);

  // Enhanced error retry handler
  const handleRetry = React.useCallback(async () => {
    await errorRecovery.attemptRecovery(async () => {
      // This would trigger a data refetch in a real application
      announceChange('Retrying to load issues...');
    });
  }, [errorRecovery, announceChange]);

  if (loading) {
    return (
      <section 
        className={`${DESIGN_TOKENS.spacing.component} ${DESIGN_TOKENS.spacing.header} ${DESIGN_TOKENS.layout.container}`}
        aria-live="polite"
        aria-busy="true"
        aria-label={t(I18N_KEYS.LOADING_ARIA)}
      >
        <IssueHeader />
        <div className={DESIGN_TOKENS.layout.cardGrid}>
          {loadingSkeleton}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section 
        className={`${DESIGN_TOKENS.spacing.component} ${DESIGN_TOKENS.spacing.header} ${DESIGN_TOKENS.layout.container}`}
        aria-live="assertive"
      >
        <IssueHeader />
        <div 
          className={getErrorClasses()}
          role="alert"
        >
          <p className="text-sm font-medium">{t(I18N_KEYS.ERROR_TITLE)}</p>
          <p className="text-xs mt-1">{error}</p>
          {errorRecovery.canRetry && (
            <button 
              onClick={handleRetry}
              disabled={errorRecovery.isRecovering}
              className="mt-3 text-xs underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
              aria-label="Retry loading issues"
            >
              {errorRecovery.isRecovering ? 'Retrying...' : t(I18N_KEYS.ERROR_RETRY)}
            </button>
          )}
        </div>
      </section>
    );
  }

  if (validatedIssues.length === 0) {
    return (
      <section 
        className={`${DESIGN_TOKENS.spacing.component} ${DESIGN_TOKENS.spacing.header} ${DESIGN_TOKENS.layout.container}`}
        aria-live="polite"
      >
        <IssueHeader />
        <div className={getEmptyStateClasses()}>
          <p className="text-sm">{t(I18N_KEYS.EMPTY_MESSAGE)}</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      className={`${DESIGN_TOKENS.spacing.component} ${DESIGN_TOKENS.spacing.header} ${DESIGN_TOKENS.layout.container}`}
      aria-labelledby="top-issues-heading"
      onKeyDown={(e) => handleKeyNavigation(e, validatedIssues.length)}
    >
      <IssueHeader />
      
      {/* Screen reader announcements */}
      {announcements && (
        <div 
          className="sr-only" 
          aria-live="polite" 
          aria-atomic="true"
        >
          {announcements}
        </div>
      )}
      
      {/* Validation errors in development */}
      {process.env.NODE_ENV === 'development' && validationErrors.length > 0 && (
        <div className="p-2 bg-warning/10 text-warning text-xs rounded">
          <details>
            <summary>Validation Issues ({validationErrors.length})</summary>
            <ul className="mt-2 space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </details>
        </div>
      )}
      
      <div 
        className={DESIGN_TOKENS.layout.cardGrid}
        role="list"
        aria-label={t(I18N_KEYS.ISSUE_LIST_LABEL)}
        aria-live="polite"
      >
        {validatedIssues.map((issue, index) => (
          <div 
            key={issue.id} 
            role="listitem"
            aria-posinset={index + 1}
            aria-setsize={validatedIssues.length}
            className={focusedIndex === index ? 'ring-2 ring-ring rounded-lg' : ''}
          >
            <IssueCard issue={issue} />
          </div>
        ))}
      </div>
      
      {/* Performance data in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="sr-only">
          Performance: {performanceData.totalRenders} renders, 
          last took {performanceData.averageRenderTime.toFixed(2)}ms
        </div>
      )}
    </section>
  );
});
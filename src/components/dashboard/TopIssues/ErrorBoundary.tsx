import React, { Component, ReactNode } from 'react';
import { DESIGN_TOKENS, getErrorClasses } from './styles';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export class TopIssuesErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('TopIssues Error Boundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <section 
          className={`${DESIGN_TOKENS.spacing.component} ${DESIGN_TOKENS.spacing.header} ${DESIGN_TOKENS.layout.container}`}
          aria-live="assertive"
        >
          <header className="flex items-center justify-between">
            <h2 className={DESIGN_TOKENS.typography.title}>Top 5 Issues</h2>
          </header>
          
          <div 
            className={getErrorClasses()}
            role="alert"
          >
            <p className="text-sm font-medium">Something went wrong loading the issues</p>
            <p className="text-xs mt-1">
              {this.state.error?.message || 'An unexpected error occurred. Please try refreshing the page.'}
            </p>
            <button 
              onClick={() => this.setState({ hasError: false })}
              className="mt-3 text-xs underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Try to reload the issues component"
            >
              Try again
            </button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
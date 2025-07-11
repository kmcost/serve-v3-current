# TopIssues Component System Documentation

## Overview

The TopIssues component system is a fully refactored, modular, and accessible component for displaying the top 5 community issues with their support percentages. This system has been designed with enterprise-level standards for maintainability, accessibility, performance, and internationalization.

## Architecture

### Component Structure
```
TopIssues/
├── TopIssues.tsx          # Main container component
├── IssueCard.tsx          # Individual issue display
├── SupportPercentage.tsx  # Percentage display component
├── IssueHeader.tsx        # Header with title and navigation
├── ErrorBoundary.tsx      # Error handling wrapper
├── styles.ts              # Design system constants
├── hooks.ts               # Performance and accessibility hooks
├── advanced-hooks.ts      # Error recovery and state management
├── i18n.ts               # Internationalization utilities
└── TESTING.md            # Testing guidelines
```

## Features

### ✅ Design System Integration
- Consistent use of semantic design tokens from `index.css`
- Theme-aware styling with HSL color values
- Responsive design patterns
- Consistent spacing and typography

### ✅ Performance Optimizations
- React.memo with custom comparison functions
- useMemo for expensive calculations
- Performance monitoring hooks
- Efficient re-render prevention
- Large dataset handling (limited to top 5)

### ✅ Accessibility (WCAG 2.1 AA)
- Comprehensive keyboard navigation
- Screen reader announcements
- Proper ARIA labels and roles
- Focus management
- Live regions for dynamic content
- Semantic HTML structure

### ✅ Error Handling
- Error boundary implementation
- Graceful degradation
- Retry mechanisms with cooldowns
- Validation and sanitization
- Development-time error reporting

### ✅ Internationalization Ready
- i18n key constants
- Text extraction utilities
- Parameter interpolation
- Fallback content system

### ✅ Testing Infrastructure
- Comprehensive testing guidelines
- Performance testing utilities
- Accessibility testing strategies
- Unit and integration test patterns

## Usage

### Basic Usage
```tsx
import { TopIssues } from '@/components/dashboard/TopIssues';

function Dashboard() {
  return <TopIssues />;
}
```

### Advanced Usage with Props
```tsx
import { TopIssues } from '@/components/dashboard/TopIssues';

function Dashboard() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <TopIssues 
      issues={issues}
      loading={loading}
      error={error}
    />
  );
}
```

### With Error Boundary
```tsx
import { TopIssues, TopIssuesErrorBoundary } from '@/components/dashboard/TopIssues';

function Dashboard() {
  return (
    <TopIssuesErrorBoundary
      onError={(error, errorInfo) => {
        console.error('TopIssues error:', error, errorInfo);
        // Send to error reporting service
      }}
    >
      <TopIssues />
    </TopIssuesErrorBoundary>
  );
}
```

## API Reference

### TopIssues Props
```typescript
interface TopIssuesProps {
  issues?: Issue[];           // Array of issues to display
  loading?: boolean;          // Loading state
  error?: string | null;      // Error message
}
```

### Issue Type
```typescript
interface Issue {
  id: number;
  title: string;
  supportPercentage: number;  // 0-100
  description: string;
  relatedPollId?: number;     // Optional poll link
}
```

## Hooks

### Performance Monitoring
```tsx
import { useTopIssuesPerformance } from '@/components/dashboard/TopIssues';

function MyComponent() {
  const { renderCount, lastRenderTime, performanceData } = useTopIssuesPerformance();
  // Monitor component performance
}
```

### Accessibility Features
```tsx
import { useTopIssuesAccessibility } from '@/components/dashboard/TopIssues';

function MyComponent() {
  const { 
    focusedIndex, 
    announcements, 
    handleKeyNavigation 
  } = useTopIssuesAccessibility();
  // Enhanced keyboard navigation and announcements
}
```

### Data Validation
```tsx
import { useTopIssuesValidation } from '@/components/dashboard/TopIssues';

function MyComponent() {
  const { 
    validationErrors, 
    sanitizedIssues, 
    isValid 
  } = useTopIssuesValidation(issues, loading);
  // Validate and sanitize issue data
}
```

### Error Recovery
```tsx
import { useErrorRecovery } from '@/components/dashboard/TopIssues/advanced-hooks';

function MyComponent() {
  const { 
    attemptRecovery, 
    canRetry, 
    isRecovering 
  } = useErrorRecovery({
    maxRetries: 3,
    retryDelay: 1000,
    onRecoverySuccess: () => console.log('Recovered!'),
  });
}
```

## Design System Integration

### Available Design Tokens
```typescript
import { DESIGN_TOKENS } from '@/components/dashboard/TopIssues';

// Spacing
DESIGN_TOKENS.spacing.component    // 'space-y-4'
DESIGN_TOKENS.spacing.card        // 'space-y-3'
DESIGN_TOKENS.spacing.content     // 'p-4'

// Layout
DESIGN_TOKENS.layout.container    // 'bg-white rounded-xl'
DESIGN_TOKENS.layout.card         // 'p-4 bg-card rounded-lg border'

// States
DESIGN_TOKENS.states.loading      // 'animate-pulse'
DESIGN_TOKENS.states.hover        // 'hover:bg-card/80 transition-colors'

// Typography
DESIGN_TOKENS.typography.title    // 'text-lg font-semibold text-foreground'
DESIGN_TOKENS.typography.percentage // 'text-xl sm:text-2xl font-bold text-primary'
```

## Internationalization

### Adding Translations
```typescript
import { t, I18N_KEYS } from '@/components/dashboard/TopIssues/i18n';

// Use in components
const title = t(I18N_KEYS.TITLE);
const supportLabel = t(I18N_KEYS.SUPPORT_PERCENTAGE, { percentage: 75 });
```

### Extending i18n
```typescript
// Replace the simple t() function with your i18n library
import { useTranslation } from 'react-i18next';

export function t(key: string, params?: Record<string, any>) {
  const { t: translate } = useTranslation();
  return translate(key, params);
}
```

## Performance Guidelines

1. **Data Limits**: Component automatically limits to 5 issues for optimal performance
2. **Memoization**: All sub-components use React.memo with optimized comparison functions
3. **Validation**: Data is validated and sanitized for consistency
4. **Monitoring**: Built-in performance monitoring in development mode

## Accessibility Guidelines

1. **Keyboard Navigation**: Full keyboard support with arrow keys, Enter, Space, Home, End
2. **Screen Readers**: Comprehensive ARIA labels and live region announcements
3. **Focus Management**: Visible focus indicators and logical tab order
4. **Semantic HTML**: Proper use of sections, headers, lists, and articles

## Testing Strategy

See [TESTING.md](./TESTING.md) for comprehensive testing guidelines including:
- Unit test patterns
- Integration test strategies
- Performance testing
- Accessibility testing
- Coverage requirements

## Browser Support

- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Graceful degradation for older browsers
- Progressive enhancement approach

## Contributing

1. Follow the established patterns in existing components
2. Maintain backward compatibility
3. Add tests for new features
4. Update documentation for API changes
5. Follow accessibility guidelines
6. Use the design system tokens

## Migration Guide

### From Legacy TopIssues
The new TopIssues component maintains 100% API compatibility with the previous version. No changes required for basic usage.

### Advanced Features
To use new features like error recovery or performance monitoring, import the additional hooks:

```tsx
// Old usage (still works)
import { TopIssues } from '@/components/dashboard/TopIssues';

// New advanced usage
import { 
  TopIssues, 
  useTopIssuesPerformance,
  useErrorRecovery 
} from '@/components/dashboard/TopIssues';
```

## Changelog

### Phase 4 (Current)
- ✅ Advanced error recovery mechanisms
- ✅ Internationalization preparation
- ✅ Comprehensive documentation
- ✅ Performance optimization utilities
- ✅ Enterprise-ready patterns

### Phase 3
- ✅ Testing infrastructure and guidelines
- ✅ Advanced accessibility features
- ✅ Performance monitoring hooks
- ✅ Keyboard navigation improvements

### Phase 2
- ✅ Design system integration
- ✅ Performance optimizations with React.memo
- ✅ Enhanced accessibility (ARIA, screen readers)
- ✅ Error boundaries and loading states

### Phase 1
- ✅ Modular component architecture
- ✅ Separation of concerns
- ✅ Type safety improvements
- ✅ Basic accessibility features
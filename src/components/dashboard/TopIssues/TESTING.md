# TopIssues Component Testing Guidelines

This document outlines testing strategies for the TopIssues component system.

## Test Categories

### Unit Tests
- **SupportPercentage**: Test percentage rendering and accessibility
- **IssueCard**: Test issue display, keyboard navigation, and links
- **IssueHeader**: Test title and navigation rendering
- **TopIssues**: Test component states (loading, error, empty, success)

### Integration Tests
- Navigation between components
- Error boundary functionality
- Accessibility features across components

### Performance Tests
- Render time monitoring
- Memory usage with large datasets
- Memoization effectiveness

### Accessibility Tests
- Screen reader announcements
- Keyboard navigation
- ARIA attributes and roles
- Focus management

## Required Testing Libraries

To implement these tests, install:
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest jsdom
```

## Test Setup

Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
```

Create `src/test/setup.ts`:
```typescript
import '@testing-library/jest-dom'
```

## Performance Testing

Use the `useTopIssuesPerformance` hook to monitor:
- Render counts
- Render times
- Memory usage
- Component re-render frequency

## Accessibility Testing

Use tools like:
- jest-axe for automated accessibility testing
- Manual keyboard navigation testing
- Screen reader testing with announcements

## Coverage Goals

- 90%+ line coverage
- All user interactions tested
- Error states and edge cases covered
- Performance regression prevention
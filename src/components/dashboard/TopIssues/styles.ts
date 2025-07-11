// Design system constants and styling utilities for TopIssues components
export const DESIGN_TOKENS = {
  spacing: {
    component: 'space-y-4',
    card: 'space-y-3',
    content: 'p-4',
    header: 'px-4 py-4',
  },
  layout: {
    container: 'bg-white rounded-xl',
    cardGrid: 'space-y-3',
    card: 'p-4 bg-card rounded-lg border',
  },
  states: {
    loading: 'animate-pulse',
    hover: 'hover:bg-card/80 transition-colors',
    focus: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  },
  typography: {
    title: 'text-lg font-semibold text-foreground',
    subtitle: 'font-medium text-foreground leading-tight',
    description: 'text-sm text-muted-foreground leading-relaxed',
    percentage: 'text-xl sm:text-2xl font-bold text-primary',
    link: 'text-primary hover:text-primary/80 text-sm font-medium',
  },
  interactive: {
    button: 'w-full flex items-center justify-center gap-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium',
    loadingPlaceholder: 'h-6 bg-muted rounded',
  },
  accessibility: {
    listContainer: 'role="list"',
    listItem: 'role="listitem"',
    article: 'role="article"',
    status: 'role="status"',
    alert: 'role="alert"',
  },
} as const;

// CSS class utilities for consistent styling
export const getSkeletonClasses = (width: string = 'w-32') => 
  `h-6 bg-muted rounded ${width}`;

export const getErrorClasses = () =>
  'p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20';

export const getEmptyStateClasses = () =>
  'p-8 text-center text-muted-foreground';

// Animation and transition utilities
export const TRANSITIONS = {
  default: 'transition-colors duration-200',
  hover: 'hover:bg-card/80 transition-colors',
  focus: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
} as const;

// Performance optimization helpers
export const PERFORMANCE_CONFIG = {
  // React.memo comparison function for issue objects
  issueComparison: (prevProps: any, nextProps: any) => {
    return (
      prevProps.issue?.id === nextProps.issue?.id &&
      prevProps.issue?.supportPercentage === nextProps.issue?.supportPercentage &&
      prevProps.issue?.title === nextProps.issue?.title &&
      prevProps.issue?.description === nextProps.issue?.description &&
      prevProps.issue?.relatedPollId === nextProps.issue?.relatedPollId
    );
  },
  // Memoization keys for useMemo
  issueListDeps: ['issues', 'loading', 'error'],
} as const;
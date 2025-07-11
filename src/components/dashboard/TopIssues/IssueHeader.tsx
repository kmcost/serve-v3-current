import { Link } from 'react-router-dom';

export function IssueHeader() {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold text-foreground">Top 5 Issues</h2>
      <Link 
        to="/issues" 
        className="text-primary hover:text-primary/80 text-sm font-medium"
        aria-label="View all community issues"
      >
        View All Issues
      </Link>
    </div>
  );
}
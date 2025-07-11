import React from 'react';
import { Link } from 'react-router-dom';
import { DESIGN_TOKENS, TRANSITIONS } from './styles';

export const IssueHeader = React.memo(function IssueHeader() {
  return (
    <header className="flex items-center justify-between">
      <h2 className={DESIGN_TOKENS.typography.title}>Top 5 Issues</h2>
      <Link 
        to="/issues" 
        className={`${DESIGN_TOKENS.typography.link} ${TRANSITIONS.focus}`}
        aria-label="View all community issues"
      >
        View All Issues
      </Link>
    </header>
  );
});
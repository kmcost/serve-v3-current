import React from 'react';
import { Link } from 'react-router-dom';
import { DESIGN_TOKENS, TRANSITIONS } from './styles';
import { t, I18N_KEYS } from './i18n';

export const IssueHeader = React.memo(function IssueHeader() {
  return (
    <header className="flex items-center justify-between">
      <h2 className={DESIGN_TOKENS.typography.title}>
        {t(I18N_KEYS.TITLE)}
      </h2>
      <Link 
        to="/issues" 
        className={`${DESIGN_TOKENS.typography.link} ${TRANSITIONS.focus}`}
        aria-label={t(I18N_KEYS.VIEW_ALL_ARIA)}
      >
        {t(I18N_KEYS.VIEW_ALL_LINK)}
      </Link>
    </header>
  );
});
import React from 'react';
import { DESIGN_TOKENS } from './styles';

interface SupportPercentageProps {
  percentage: number;
}

export const SupportPercentage = React.memo(function SupportPercentage({ 
  percentage 
}: SupportPercentageProps) {
  return (
    <div 
      className="flex items-center gap-1" 
      role="status" 
      aria-label={`${percentage} percent support`}
      aria-live="polite"
    >
      <span className={DESIGN_TOKENS.typography.percentage}>
        {percentage}%
      </span>
      <span className={DESIGN_TOKENS.typography.percentage}>
        support
      </span>
    </div>
  );
});
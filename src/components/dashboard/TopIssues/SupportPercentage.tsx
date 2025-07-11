import React from 'react';
import { DESIGN_TOKENS } from './styles';
import { getAriaLabel } from './i18n';

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
      aria-label={getAriaLabel.supportPercentage(percentage)}
      aria-live="polite"
    >
      <span className="text-sm text-muted-foreground font-medium">
        {percentage}% support
      </span>
    </div>
  );
});
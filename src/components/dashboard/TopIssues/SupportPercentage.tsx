interface SupportPercentageProps {
  percentage: number;
}

export function SupportPercentage({ percentage }: SupportPercentageProps) {
  return (
    <div className="flex items-center gap-1" role="status" aria-label={`${percentage} percent support`}>
      <span className="text-xl sm:text-2xl font-bold text-primary">
        {percentage}%
      </span>
      <span className="text-xl sm:text-2xl font-bold text-primary">
        support
      </span>
    </div>
  );
}
import { Badge } from '@/components/ui/badge';
import { getPollStatus } from '@/utils/pollUtils';

interface StatusBadgeProps {
  startDate: string;
  endDate: string;
  className?: string;
}

export function StatusBadge({ startDate, endDate, className }: StatusBadgeProps) {
  const status = getPollStatus(startDate, endDate);
  
  switch (status) {
    case 'Active':
      return <Badge variant="default" className={className}>In Progress</Badge>;
    case 'Not Started':
      return <Badge variant="outline" className={`bg-gray-800 text-white border-gray-800 hover:bg-gray-700 ${className}`}>Scheduled</Badge>;
    case 'Completed':
      return <Badge className={`bg-green-600 text-white hover:bg-green-600/80 ${className}`}>Done</Badge>;
    default:
      return <Badge variant="outline" className={className}>Unknown</Badge>;
  }
}
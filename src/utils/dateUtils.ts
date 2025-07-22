
import { differenceInHours, differenceInDays, format } from 'date-fns';

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  
  const hoursAgo = differenceInHours(now, date);
  const daysAgo = differenceInDays(now, date);
  
  // Less than 1 day ago - show hours
  if (hoursAgo < 24) {
    if (hoursAgo < 1) {
      return 'Less than an hour ago';
    }
    return hoursAgo === 1 ? '1 hour ago' : `${hoursAgo} hours ago`;
  }
  
  // Less than 7 days - show days
  if (daysAgo < 7) {
    return daysAgo === 1 ? '1 day ago' : `${daysAgo} days ago`;
  }
  
  // Between 7-14 days - show "Last Week"
  if (daysAgo < 14) {
    return 'Last Week';
  }
  
  // Between 14-30 days - show "This Month"
  if (daysAgo < 30) {
    return 'This Month';
  }
  
  // Anything beyond 30 days - show formatted date
  return format(date, 'MMM d, yyyy');
}

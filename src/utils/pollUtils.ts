export const getPollStatus = (startDate: string, endDate: string): 'Not Started' | 'Active' | 'Completed' => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (now < start) {
    return 'Not Started';
  } else if (now > end) {
    return 'Completed';
  } else {
    return 'Active';
  }
};

export const isPollStarted = (startDate: string): boolean => {
  const now = new Date();
  const start = new Date(startDate);
  return now >= start;
};

export const calculateTimeLeft = (endDate: string): string => {
  const now = new Date();
  const end = new Date(endDate);
  const diffInMs = end.getTime() - now.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays <= 0) {
    return '0 days remaining';
  } else if (diffInDays === 1) {
    return '1 day remaining';
  } else {
    return `${diffInDays} days remaining`;
  }
};
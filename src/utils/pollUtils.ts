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
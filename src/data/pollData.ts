// Mock data - in real app this would come from API

// Utility functions for poll status
export const getPollStatus = (startDate: string, endDate: string): "not_started" | "active" | "completed" | "expired" => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (now < start) return "not_started";
  if (now > end) return "completed";
  return "active";
};

export const getDaysLeft = (endDate: string, status: "not_started" | "active" | "completed" | "expired"): string => {
  if (status === "completed") return "Completed";
  if (status === "not_started") return "Not Started";
  
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return "Expired";
  if (diffDays === 0) return "Ends today";
  if (diffDays === 1) return "1 day left";
  return `${diffDays} days left`;
};

export const getResultsSummary = (poll: Poll): string => {
  const results = Object.entries(poll.results);
  const highest = results.reduce((max, [key, value]) => 
    value.percentage > max.percentage ? { key, ...value } : max, 
    { key: '', percentage: 0, count: 0 }
  );
  
  if (poll.type === "Poll") {
    if (highest.key === "yes") return `${highest.percentage}% of constituents support this`;
    if (highest.key === "no") return `${highest.percentage}% of constituents oppose this`;
  }
  
  return `${highest.percentage}% prefer ${highest.key.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
};

export const pollData = {
  1: {
    id: 1,
    title: "Should we extend parking meter hours downtown?",
    type: "Poll",
    question: "Do you support extending parking meter hours downtown from 6 PM to 8 PM on weekdays?",
    description: "This poll aims to gather community input on proposed changes to downtown parking meter hours to improve turnover and accessibility.",
    responses: 156,
    startDate: "2024-01-10",
    endDate: "2024-01-15",
    expectedResponses: 250,
    channels: ["Email", "SMS"],
    reach: "2,400 residents",
    results: {
      yes: { count: 104, percentage: 67 },
      no: { count: 52, percentage: 33 }
    },
    recentResponses: [
      { name: "John D.", response: "Yes", time: "2 hours ago", comment: "This will help with turnover" },
      { name: "Sarah M.", response: "No", time: "4 hours ago", comment: "Too restrictive for workers" },
      { name: "Mike R.", response: "Yes", time: "6 hours ago", comment: "Good for business" },
      { name: "Lisa K.", response: "No", time: "8 hours ago", comment: "Hurts downtown workers" }
    ],
    demographics: {
      byAge: [
        { range: "18-30", yes: 45, no: 25 },
        { range: "31-50", yes: 38, no: 18 },
        { range: "51+", yes: 21, no: 9 }
      ]
    }
  },
  2: {
    id: 2,
    title: "Community Center Improvements",
    type: "Survey",
    question: "What improvements would you like to see at the community center?",
    description: "Survey to gather input on potential community center upgrades and improvements.",
    responses: 89,
    startDate: "2024-01-15",
    endDate: "2024-01-20",
    expectedResponses: 150,
    channels: ["Email", "SMS"],
    reach: "1,243 residents",
    results: {
      fitness: { count: 35, percentage: 39 },
      programs: { count: 28, percentage: 31 },
      renovations: { count: 26, percentage: 30 }
    },
    recentResponses: [
      { name: "Alex P.", response: "Fitness equipment", time: "1 hour ago", comment: "Need better gym facilities" },
      { name: "Maria G.", response: "Youth programs", time: "3 hours ago", comment: "More activities for kids" }
    ],
    demographics: {
      byAge: [
        { range: "18-30", yes: 25, no: 8 },
        { range: "31-50", yes: 28, no: 12 },
        { range: "51+", yes: 9, no: 7 }
      ]
    }
  },
  3: {
    id: 3,
    title: "Should we add new bike lanes on Main Street?",
    type: "Poll",
    question: "Do you support adding new bike lanes on Main Street?",
    description: "Gathering community input on proposed bike lane installation along Main Street corridor.",
    responses: 203,
    startDate: "2024-01-18",
    endDate: "2024-01-22",
    expectedResponses: 250,
    channels: ["Facebook", "SMS", "Email"],
    reach: "2,100 residents",
    results: {
      yes: { count: 132, percentage: 65 },
      no: { count: 71, percentage: 35 }
    },
    recentResponses: [
      { name: "Tom W.", response: "Yes", time: "4 hours ago", comment: "Great for cyclists and environment" },
      { name: "Linda S.", response: "No", time: "6 hours ago", comment: "Will reduce parking spaces" }
    ],
    demographics: {
      byAge: [
        { range: "18-30", yes: 45, no: 15 },
        { range: "31-50", yes: 52, no: 28 },
        { range: "51+", yes: 35, no: 28 }
      ]
    }
  },
  4: {
    id: 4,
    title: "Reopen Community Pool",
    type: "Survey",
    question: "Should we reopen the community pool this summer?",
    description: "Survey to determine community interest in reopening the pool facility.",
    responses: 219,
    startDate: "2024-01-08",
    endDate: "2024-01-18",
    expectedResponses: 200,
    channels: ["Facebook", "Email", "SMS"],
    reach: "1,500 residents",
    results: {
      yes: { count: 154, percentage: 70 },
      no: { count: 65, percentage: 30 }
    },
    recentResponses: [
      { name: "Jennifer L.", response: "Yes", time: "1 day ago", comment: "Kids need summer activities" },
      { name: "Robert K.", response: "Yes", time: "2 days ago", comment: "Great for community health" }
    ],
    demographics: {
      byAge: [
        { range: "18-30", yes: 45, no: 15 },
        { range: "31-50", yes: 65, no: 25 },
        { range: "51+", yes: 44, no: 25 }
      ]
    }
  },
  5: {
    id: 5,
    title: "Weekend farmers market location",
    type: "Poll",
    question: "Where should we relocate the weekend farmers market?",
    description: "Poll to determine the best location for the weekend farmers market.",
    responses: 342,
    startDate: "2024-01-01",
    endDate: "2024-01-12",
    expectedResponses: 300,
    channels: ["Facebook", "Email"],
    reach: "2,800 residents",
    results: {
      downtown: { count: 189, percentage: 55 },
      park: { count: 103, percentage: 30 },
      school: { count: 50, percentage: 15 }
    },
    recentResponses: [
      { name: "Sarah M.", response: "Downtown Plaza", time: "2 weeks ago", comment: "More foot traffic downtown" },
      { name: "Mike R.", response: "City Park", time: "2 weeks ago", comment: "More parking available" }
    ],
    demographics: {
      byAge: [
        { range: "18-30", yes: 85, no: 25 },
        { range: "31-50", yes: 142, no: 48 },
        { range: "51+", yes: 115, no: 27 }
      ]
    }
  },
  6: {
    id: 6,
    title: "Public Library Hours Survey",
    type: "Survey", 
    question: "What library hours would work best for you?",
    description: "Survey to optimize public library operating hours based on community needs.",
    responses: 0,
    startDate: "2024-02-01",
    endDate: "2024-02-05",
    expectedResponses: 200,
    channels: ["Email", "Website"],
    reach: "1,200 residents",
    results: {
      extended: { count: 0, percentage: 0 },
      current: { count: 0, percentage: 0 },
      reduced: { count: 0, percentage: 0 }
    },
    recentResponses: [],
    demographics: {
      byAge: [
        { range: "18-30", yes: 45, no: 12 },
        { range: "31-50", yes: 58, no: 18 },
        { range: "51+", yes: 53, no: 15 }
      ]
    }
  }
};

export interface Poll {
  id: number;
  title: string;
  type: string;
  question: string;
  description: string;
  responses: number;
  startDate: string;
  endDate: string;
  expectedResponses: number;
  channels: string[];
  reach: string;
  results: Record<string, { count: number; percentage: number; }>;
  recentResponses: Array<{
    name: string;
    response: string;
    time: string;
    comment?: string;
  }>;
  demographics: {
    byAge: Array<{
      range: string;
      yes: number;
      no: number;
    }>;
  };
}
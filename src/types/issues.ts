export interface Issue {
  id: number;
  title: string;
  supportPercentage: number;
  description: string;
  relatedPollId?: number;
}

export const topIssues: Issue[] = [
  {
    id: 5,
    title: "Youth Sports Program Expansion",
    supportPercentage: 82,
    description: "Expanding youth sports programs and facility improvements at local parks",
    relatedPollId: 5
  },
  {
    id: 1,
    title: "Community Center Funding",
    supportPercentage: 74,
    description: "Increased funding for community center improvements and programs",
    relatedPollId: 2
  },
  {
    id: 3,
    title: "Community Pool Reopening",
    supportPercentage: 70,
    description: "Reopening community pool facility for summer recreation",
    relatedPollId: 4
  },
  {
    id: 2,
    title: "Main Street Bike Lane Development", 
    supportPercentage: 65,
    description: "Installation of dedicated bike lanes along Main Street corridor",
    relatedPollId: 3
  },
  {
    id: 4,
    title: "Downtown Parking Solutions",
    supportPercentage: 58,
    description: "Implementation of new parking meters and expanded public parking areas",
    relatedPollId: 1
  }
];
export interface PolicyPosition {
  id: string;
  title: string;
  description: string;
}

export const policyPositions: PolicyPosition[] = [
  {
    id: "transparency",
    title: "Transparency and Access in Local Government",
    description: "Government should be open, accessible, and accountable to the people it serves. I will work to ensure all meetings are well-publicized, documents are easily accessible online, and citizens have meaningful opportunities to participate in local decision-making processes."
  },
  {
    id: "smart-growth",
    title: "Smart Growth",
    description: "Our community needs thoughtful development that preserves our character while meeting housing and economic needs. I support mixed-use development, walkable neighborhoods, and protecting green spaces while ensuring adequate infrastructure supports growth."
  },
  {
    id: "strong-economy",
    title: "A Strong Economy for A Strong Future",
    description: "Small businesses are the backbone of our local economy. I will advocate for policies that reduce regulatory barriers, support local entrepreneurs, and create good-paying jobs while maintaining our community's unique character and quality of life."
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    description: "Reliable infrastructure is essential for our community's future. I will prioritize investments in roads, water systems, broadband access, and public transportation that support both current residents and sustainable growth for generations to come."
  }
];
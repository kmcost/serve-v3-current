// AI Poll Service - Mock intelligent recommendations
export interface QuestionAnalysis {
  originalQuestion: string;
  optimizedQuestion: string;
  reasoning: string;
  suggestedType: 'yes_no' | 'multiple_choice' | 'rating' | 'open_text';
  clarity: number; // 0-100
  bias: number; // 0-100
}

export interface AudienceTag {
  id: string;
  label: string;
  category: 'demographic' | 'geographic' | 'interest' | 'engagement';
  estimatedSize: number;
}

export interface AudienceRecommendation {
  tags: AudienceTag[];
  totalSize: number;
  reasoning: string;
}

export interface ChannelRecommendation {
  channels: string[];
  expectedResponses: number;
  totalCost: number;
  responseRate: number;
  reasoning: string;
}

export interface PollRecommendation {
  question: QuestionAnalysis;
  audience: AudienceRecommendation;
  channels: ChannelRecommendation;
  timeline: {
    duration: string;
    expectedCompletion: string;
  };
  roi: {
    costPerResponse: number;
    expectedInsight: string;
  };
}

// Mock AI analysis of questions
const analyzeQuestion = (question: string): QuestionAnalysis => {
  const lowercaseQ = question.toLowerCase();
  
  // Analyze question type and provide intelligent suggestions
  let suggestedType: QuestionAnalysis['suggestedType'] = 'yes_no';
  let optimizedQuestion = question.trim();
  let reasoning = '';
  
  // Always optimize - provide meaningful improvements for every question type
  if (lowercaseQ.includes('what') || lowercaseQ.includes('how') || lowercaseQ.includes('where')) {
    suggestedType = 'multiple_choice';
    if (lowercaseQ.includes('what')) {
      optimizedQuestion = question.replace(/what/i, 'Which of the following');
      reasoning = 'Converted open-ended question to multiple choice for better data analysis and clearer response options.';
    } else {
      // Improve how/where questions
      optimizedQuestion = optimizedQuestion.replace(/how do you feel about/i, 'What is your opinion on');
      optimizedQuestion = optimizedQuestion.replace(/where do you/i, 'Which location do you prefer for');
      reasoning = 'Restructured for clearer multiple choice format with specific options.';
    }
  } else if (lowercaseQ.includes('rate') || lowercaseQ.includes('satisfaction') || lowercaseQ.includes('quality')) {
    suggestedType = 'rating';
    if (!lowercaseQ.includes('scale') && !lowercaseQ.includes('1-5')) {
      optimizedQuestion += ' (on a scale of 1-5, where 1 = very poor and 5 = excellent)';
    }
    reasoning = 'Added clear rating scale definition for consistent responses and better data quality.';
  } else if (lowercaseQ.includes('should') || lowercaseQ.includes('support') || lowercaseQ.includes('favor') || lowercaseQ.includes('agree')) {
    suggestedType = 'yes_no';
    // Always improve yes/no questions for clarity and bias reduction
    optimizedQuestion = optimizedQuestion.replace(/do you support/i, 'Would you support');
    optimizedQuestion = optimizedQuestion.replace(/should we/i, 'Should the city');
    optimizedQuestion = optimizedQuestion.replace(/would you favor/i, 'Do you support');
    
    // Ensure proper punctuation
    if (!optimizedQuestion.endsWith('?')) {
      optimizedQuestion += '?';
    }
    reasoning = 'Improved wording for neutral tone and clearer yes/no decision format.';
  } else {
    // Handle other question types - always provide some optimization
    suggestedType = 'open_text';
    if (!optimizedQuestion.endsWith('?')) {
      optimizedQuestion += '?';
    }
    // Make questions more specific
    optimizedQuestion = optimizedQuestion.replace(/thoughts/i, 'specific feedback');
    optimizedQuestion = optimizedQuestion.replace(/opinions/i, 'views');
    reasoning = 'Enhanced specificity and clarity for more actionable open-ended responses.';
  }
  
  // Calculate quality scores based on question characteristics
  const wordCount = question.split(' ').length;
  const hasQuestionMark = question.includes('?');
  const clarity = Math.min(100, 
    (hasQuestionMark ? 85 : 70) + 
    (wordCount > 5 && wordCount < 20 ? 10 : 0) + 
    Math.random() * 10
  );
  const bias = Math.max(0, 
    (lowercaseQ.includes('don\'t') || lowercaseQ.includes('shouldn\'t') ? 40 : 0) +
    (wordCount > 25 ? 20 : 0) +
    Math.random() * 15
  );
  
  return {
    originalQuestion: question,
    optimizedQuestion,
    reasoning,
    suggestedType,
    clarity: Math.round(clarity),
    bias: Math.round(bias)
  };
};

// Comprehensive audience tag library
const AUDIENCE_TAGS: AudienceTag[] = [
  // Geographic
  { id: 'downtown', label: 'Downtown Area', category: 'geographic', estimatedSize: 2400 },
  { id: 'residential', label: 'Residential Neighborhoods', category: 'geographic', estimatedSize: 18500 },
  { id: 'suburban', label: 'Suburban Areas', category: 'geographic', estimatedSize: 8200 },
  
  // Demographics
  { id: 'young-adults', label: 'Young Adults (18-25)', category: 'demographic', estimatedSize: 3500 },
  { id: 'middle-age', label: 'Middle Age (26-55)', category: 'demographic', estimatedSize: 12000 },
  { id: 'seniors', label: 'Seniors (55+)', category: 'demographic', estimatedSize: 6800 },
  { id: 'parents', label: 'Parents with Children', category: 'demographic', estimatedSize: 9200 },
  
  // Interests & Occupations
  { id: 'business-owners', label: 'Business Owners', category: 'interest', estimatedSize: 1200 },
  { id: 'transit-users', label: 'Public Transit Users', category: 'interest', estimatedSize: 4800 },
  { id: 'students', label: 'Students', category: 'interest', estimatedSize: 2100 },
  { id: 'veterans', label: 'Veterans', category: 'interest', estimatedSize: 1800 },
  
  // Engagement
  { id: 'previous-respondents', label: 'Previous Poll Respondents', category: 'engagement', estimatedSize: 850 },
  { id: 'newsletter-subscribers', label: 'Newsletter Subscribers', category: 'engagement', estimatedSize: 2200 },
  { id: 'meeting-attendees', label: 'Community Meeting Attendees', category: 'engagement', estimatedSize: 650 }
];

// Mock audience intelligence with tag-based recommendations
const recommendAudience = (question: string): AudienceRecommendation => {
  const lowercaseQ = question.toLowerCase();
  const recommendedTags: AudienceTag[] = [];
  
  // Geographic targeting based on question content
  if (lowercaseQ.includes('downtown') || lowercaseQ.includes('parking') || lowercaseQ.includes('business')) {
    recommendedTags.push(AUDIENCE_TAGS.find(t => t.id === 'downtown')!);
    recommendedTags.push(AUDIENCE_TAGS.find(t => t.id === 'business-owners')!);
  } else if (lowercaseQ.includes('school') || lowercaseQ.includes('education') || lowercaseQ.includes('children')) {
    recommendedTags.push(AUDIENCE_TAGS.find(t => t.id === 'residential')!);
    recommendedTags.push(AUDIENCE_TAGS.find(t => t.id === 'parents')!);
  } else if (lowercaseQ.includes('transit') || lowercaseQ.includes('bus') || lowercaseQ.includes('train')) {
    recommendedTags.push(AUDIENCE_TAGS.find(t => t.id === 'transit-users')!);
    recommendedTags.push(AUDIENCE_TAGS.find(t => t.id === 'middle-age')!);
  } else if (lowercaseQ.includes('veteran') || lowercaseQ.includes('military')) {
    recommendedTags.push(AUDIENCE_TAGS.find(t => t.id === 'veterans')!);
    recommendedTags.push(AUDIENCE_TAGS.find(t => t.id === 'seniors')!);
  } else {
    // Default broad targeting
    recommendedTags.push(AUDIENCE_TAGS.find(t => t.id === 'previous-respondents')!);
    recommendedTags.push(AUDIENCE_TAGS.find(t => t.id === 'middle-age')!);
  }
  
  // Calculate total size (accounting for potential overlap)
  const totalSize = Math.round(recommendedTags.reduce((sum, tag) => sum + tag.estimatedSize, 0) * 0.8);
  
  return {
    tags: recommendedTags,
    totalSize,
    reasoning: `AI selected these audience segments based on question relevance and expected engagement levels.`
  };
};

// Mock channel optimization
const optimizeChannels = (audienceSize: number, questionType: string): ChannelRecommendation => {
  if (audienceSize > 15000) {
    return {
      channels: ['email', 'social', 'sms'],
      expectedResponses: Math.round(audienceSize * 0.28),
      totalCost: 140,
      responseRate: 28,
      reasoning: 'Multi-channel approach maximizes reach for large audiences. Social media adds viral potential.'
    };
  } else if (audienceSize > 5000) {
    return {
      channels: ['email', 'sms'],
      expectedResponses: Math.round(audienceSize * 0.35),
      totalCost: 120,
      responseRate: 35,
      reasoning: 'Email + SMS combination provides optimal cost-effectiveness with high engagement rates.'
    };
  } else {
    return {
      channels: ['email', 'phone'],
      expectedResponses: Math.round(audienceSize * 0.45),
      totalCost: 180,
      responseRate: 45,
      reasoning: 'Personalized approach with phone calls increases response quality for targeted audiences.'
    };
  }
};

// Main AI recommendation function
export const generatePollRecommendation = async (question: string): Promise<PollRecommendation> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const questionAnalysis = analyzeQuestion(question);
  const audienceRec = recommendAudience(question);
  const channelRec = optimizeChannels(audienceRec.totalSize, questionAnalysis.suggestedType);
  
  return {
    question: questionAnalysis,
    audience: audienceRec,
    channels: channelRec,
    timeline: {
      duration: '14 days',
      expectedCompletion: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()
    },
    roi: {
      costPerResponse: Math.round(channelRec.totalCost / channelRec.expectedResponses * 100) / 100,
      expectedInsight: `High-confidence actionable data based on AI-selected audience segments`
    }
  };
};
// AI Poll Service - Mock intelligent recommendations
export interface QuestionAnalysis {
  originalQuestion: string;
  optimizedQuestion: string;
  reasoning: string;
  suggestedType: 'yes_no' | 'multiple_choice' | 'rating' | 'open_text';
  clarity: number; // 0-100
  bias: number; // 0-100
}

export interface AudienceRecommendation {
  type: 'all' | 'downtown' | 'residential' | 'previous';
  name: string;
  size: number;
  reasoning: string;
  confidence: number; // 0-100
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
      reasoning = 'Converted open question to multiple choice for better data analysis and clearer response options';
    } else {
      // Improve how/where questions
      optimizedQuestion = optimizedQuestion.replace(/how do you feel about/i, 'What is your opinion on');
      optimizedQuestion = optimizedQuestion.replace(/where do you/i, 'Which location do you prefer for');
      reasoning = 'Restructured for clearer multiple choice format with specific options';
    }
  } else if (lowercaseQ.includes('rate') || lowercaseQ.includes('satisfaction') || lowercaseQ.includes('quality')) {
    suggestedType = 'rating';
    if (!lowercaseQ.includes('scale') && !lowercaseQ.includes('1-5')) {
      optimizedQuestion += ' (on a scale of 1-5, where 1 = very poor and 5 = excellent)';
    }
    reasoning = 'Added clear rating scale definition for consistent responses and better data quality';
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
    reasoning = 'Improved wording for neutral tone and clearer yes/no decision format';
  } else {
    // Handle other question types - always provide some optimization
    suggestedType = 'open_text';
    if (!optimizedQuestion.endsWith('?')) {
      optimizedQuestion += '?';
    }
    // Make questions more specific
    optimizedQuestion = optimizedQuestion.replace(/thoughts/i, 'specific feedback');
    optimizedQuestion = optimizedQuestion.replace(/opinions/i, 'views');
    reasoning = 'Enhanced specificity and clarity for more actionable open-ended responses';
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

// Mock audience intelligence
const recommendAudience = (question: string): AudienceRecommendation => {
  const lowercaseQ = question.toLowerCase();
  
  if (lowercaseQ.includes('downtown') || lowercaseQ.includes('parking') || lowercaseQ.includes('business')) {
    return {
      type: 'downtown',
      name: 'Downtown Area',
      size: 2400,
      reasoning: 'Downtown residents and businesses are directly affected by this topic and will provide the most relevant feedback.',
      confidence: 92
    };
  } else if (lowercaseQ.includes('school') || lowercaseQ.includes('education') || lowercaseQ.includes('children')) {
    return {
      type: 'residential',
      name: 'Residential Neighborhoods',
      size: 18500,
      reasoning: 'Families in residential areas are most impacted by school-related decisions.',
      confidence: 88
    };
  } else if (lowercaseQ.includes('traffic') || lowercaseQ.includes('road') || lowercaseQ.includes('infrastructure')) {
    return {
      type: 'all',
      name: 'All Constituents',
      size: 25000,
      reasoning: 'Infrastructure affects all residents and requires broad community input.',
      confidence: 85
    };
  } else {
    return {
      type: 'previous',
      name: 'Previous Poll Respondents',
      size: 850,
      reasoning: 'Engaged constituents who have previously participated are likely to provide thoughtful responses.',
      confidence: 75
    };
  }
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
  const channelRec = optimizeChannels(audienceRec.size, questionAnalysis.suggestedType);
  
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
      expectedInsight: `High-confidence actionable data with ${audienceRec.confidence}% relevance score`
    }
  };
};
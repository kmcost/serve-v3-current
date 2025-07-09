export interface Question {
  id: number;
  text: string;
  type: 'yes_no' | 'multiple_choice' | 'rating' | 'open_text';
  options: string[];
}

export interface CreatePollState {
  questions: Question[];
  audience: string;
  channels: string[];
}

export interface Step {
  id: number;
  name: string;
  description: string;
}

export const STEPS: Step[] = [
  { id: 1, name: 'Question Setup', description: 'Define your questions' },
  { id: 2, name: 'Audience', description: 'Select your audience' },
  { id: 3, name: 'Distribution', description: 'Choose channels' },
  { id: 4, name: 'Preview & Launch', description: 'Review and launch' }
];
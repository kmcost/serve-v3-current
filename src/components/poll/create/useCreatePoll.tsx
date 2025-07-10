import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Question, CreatePollState } from './types';

export const useCreatePoll = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, text: '', type: 'yes_no', options: [] }
  ]);
  const [audience, setAudience] = useState<string[]>([]);
  const [channels, setChannels] = useState<string[]>([]);

  // Check if we're customizing AI recommendations
  const isCustomizingRecommendations = Boolean(location.state?.question || location.state?.audience || location.state?.channels);

  // Initialize with AI recommendations if available
  useEffect(() => {
    const state = location.state as any;
    if (state?.question) {
      setQuestions([{ id: 1, text: state.question, type: 'yes_no', options: [] }]);
    }
    if (state?.audience) {
      setAudience(Array.isArray(state.audience) ? state.audience : [state.audience]);
    }
    if (state?.channels) {
      setChannels(state.channels);
    }
  }, [location.state]);

  const addQuestion = () => {
    setQuestions([...questions, { 
      id: questions.length + 1, 
      text: '', 
      type: 'yes_no', 
      options: [] 
    }]);
  };

  const updateQuestion = (id: number, field: string, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === id) {
        const updatedQuestion = { ...q, [field]: value };
        
        // Auto-populate defaults when changing question type
        if (field === 'type') {
          switch (value) {
            case 'multiple_choice':
              updatedQuestion.options = q.options.length === 0 ? ['', ''] : q.options;
              break;
            case 'rating':
              updatedQuestion.options = ['1', '5']; // min, max
              break;
            case 'yes_no':
            case 'open_text':
              updatedQuestion.options = [];
              break;
          }
        }
        
        return updatedQuestion;
      }
      return q;
    }));
  };

  const updateQuestionOptions = (id: number, options: string[]) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, options } : q
    ));
  };

  const addOption = (questionId: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      updateQuestionOptions(questionId, [...question.options, '']);
    }
  };

  const removeOption = (questionId: number, optionIndex: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.options.length > 2) {
      const newOptions = question.options.filter((_, index) => index !== optionIndex);
      updateQuestionOptions(questionId, newOptions);
    }
  };

  const updateOption = (questionId: number, optionIndex: number, value: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      const newOptions = [...question.options];
      newOptions[optionIndex] = value;
      updateQuestionOptions(questionId, newOptions);
    }
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isMultipleQuestions = questions.length > 1;

  return {
    currentStep,
    questions,
    audience,
    channels,
    isMultipleQuestions,
    isCustomizingRecommendations,
    setCurrentStep,
    setQuestions,
    setAudience,
    setChannels,
    addQuestion,
    updateQuestion,
    updateQuestionOptions,
    addOption,
    removeOption,
    updateOption,
    removeQuestion,
    nextStep,
    prevStep
  };
};
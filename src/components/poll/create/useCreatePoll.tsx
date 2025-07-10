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
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
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
    setCurrentStep,
    setQuestions,
    setAudience,
    setChannels,
    addQuestion,
    updateQuestion,
    removeQuestion,
    nextStep,
    prevStep
  };
};
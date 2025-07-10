import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, X, ChevronDown } from 'lucide-react';
import { Question } from './types';
import { useState } from 'react';

interface QuestionTypeConfigProps {
  question: Question;
  onAddOption: (questionId: number) => void;
  onRemoveOption: (questionId: number, optionIndex: number) => void;
  onUpdateOption: (questionId: number, optionIndex: number, value: string) => void;
}

export function QuestionTypeConfig({ 
  question, 
  onAddOption, 
  onRemoveOption, 
  onUpdateOption 
}: QuestionTypeConfigProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (question.type === 'yes_no' || question.type === 'open_text') {
    return null;
  }

  const renderMultipleChoiceConfig = () => (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Answer Options</Label>
      {question.options.map((option, index) => (
        <div key={index} className="flex gap-2">
          <Input
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => onUpdateOption(question.id, index, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && index === question.options.length - 1) {
                onAddOption(question.id);
              }
            }}
          />
          {question.options.length > 2 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveOption(question.id, index)}
              className="shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onAddOption(question.id)}
        className="gap-2"
      >
        <Plus className="h-4 w-4" />
        Add Option
      </Button>
    </div>
  );

  const renderRatingConfig = () => (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Rating Scale</Label>
      <div className="bg-muted/50 p-3 rounded-lg space-y-2">
        <div className="text-sm font-medium">1 (Strongly Disagree) to 5 (Strongly Agree)</div>
        <div className="text-xs text-muted-foreground">
          Respondents will rate their agreement with your question on a standard 1-5 scale.
        </div>
      </div>
    </div>
  );

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between p-0 h-auto font-normal"
        >
          <span className="text-sm font-medium">
            {question.type === 'multiple_choice' ? 'Configure Options' : 'Rating Scale Details'}
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 pt-3">
        {question.type === 'multiple_choice' && renderMultipleChoiceConfig()}
        {question.type === 'rating' && renderRatingConfig()}
      </CollapsibleContent>
    </Collapsible>
  );
}
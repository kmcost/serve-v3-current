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
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Label className="text-sm">From</Label>
          <Input
            type="number"
            value={question.options[0] || '1'}
            onChange={(e) => onUpdateOption(question.id, 0, e.target.value)}
            className="w-20"
            min="1"
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="text-sm">To</Label>
          <Input
            type="number"
            value={question.options[1] || '5'}
            onChange={(e) => onUpdateOption(question.id, 1, e.target.value)}
            className="w-20"
            min="2"
            max="10"
          />
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        Preview: {question.options[0] || '1'} - {question.options[1] || '5'} scale
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
            {question.type === 'multiple_choice' ? 'Configure Options' : 'Configure Rating Scale'}
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
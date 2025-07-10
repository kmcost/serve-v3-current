import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Plus } from 'lucide-react';
import { Question } from './types';
import { QuestionTypeConfig } from './QuestionTypeConfig';

interface QuestionSetupStepProps {
  questions: Question[];
  onAddQuestion: () => void;
  onUpdateQuestion: (id: number, field: string, value: string) => void;
  onRemoveQuestion: (id: number) => void;
  onAddOption: (questionId: number) => void;
  onRemoveOption: (questionId: number, optionIndex: number) => void;
  onUpdateOption: (questionId: number, optionIndex: number, value: string) => void;
}

export function QuestionSetupStep({ 
  questions, 
  onAddQuestion, 
  onUpdateQuestion, 
  onRemoveQuestion,
  onAddOption,
  onRemoveOption,
  onUpdateOption
}: QuestionSetupStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">What do you want to ask?</h2>
      </div>

      {questions.map((question, index) => (
        <div key={question.id} className="space-y-4 p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              Question {index + 1}
            </Label>
            {questions.length > 1 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onRemoveQuestion(question.id)}
              >
                Remove
              </Button>
            )}
          </div>
          
          <Textarea
            placeholder="Enter your question..."
            value={question.text}
            onChange={(e) => onUpdateQuestion(question.id, 'text', e.target.value)}
            className="min-h-[80px]"
          />

          <div>
            <Label className="text-base font-medium">Question Type</Label>
            <RadioGroup 
              value={question.type}
              onValueChange={(value) => onUpdateQuestion(question.id, 'type', value)}
              className="mt-5 space-y-3"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="yes_no" id={`yes_no_${question.id}`} />
                <Label htmlFor={`yes_no_${question.id}`}>Yes/No</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="multiple_choice" id={`mc_${question.id}`} />
                <Label htmlFor={`mc_${question.id}`}>Multiple Choice</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="rating" id={`rating_${question.id}`} />
                <Label htmlFor={`rating_${question.id}`}>Rating Scale (1-5)</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="open_text" id={`text_${question.id}`} />
                <Label htmlFor={`text_${question.id}`}>Open Text</Label>
              </div>
            </RadioGroup>
          </div>

          <QuestionTypeConfig
            question={question}
            onAddOption={onAddOption}
            onRemoveOption={onRemoveOption}
            onUpdateOption={onUpdateOption}
          />
        </div>
      ))}

      <Button 
        variant="outline" 
        onClick={onAddQuestion}
        className="gap-2"
      >
        <Plus className="h-4 w-4" />
        Add Another Question
      </Button>

    </div>
  );
}
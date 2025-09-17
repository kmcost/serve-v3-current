import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
interface QuestionInputProps {
  placeholder?: string;
  className?: string;
  showSuggestions?: boolean;
}
export function QuestionInput({
  placeholder = "What would you like to ask your constituents?",
  className = "",
  showSuggestions = true
}: QuestionInputProps) {
  const [question, setQuestion] = useState('');
  
  const suggestedQuestions = [
    "What issues do you as a constituent care about most?",
    "Would you support increased funding for our local library?",
    "What programs or services would you like to see offered in our schools?"
  ];

  const handleCreatePoll = () => {
    if (question.trim()) {
      window.location.href = `/polls/ai-recommendations?question=${encodeURIComponent(question)}`;
    }
  };

  return <div className={`space-y-4 ${className}`}>
      <Textarea 
        placeholder={placeholder} 
        value={question} 
        onChange={e => setQuestion(e.target.value)} 
        className="min-h-[100px] text-base resize-none" 
      />
      
      {/* Suggested Questions Pills */}
      {showSuggestions && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((suggestedQuestion, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors px-3 py-1 text-xs"
                onClick={() => setQuestion(suggestedQuestion)}
              >
                {suggestedQuestion}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      <Button size="lg" className="gap-2 w-full" onClick={handleCreatePoll} disabled={!question.trim()}>
        Create Poll
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>;
}
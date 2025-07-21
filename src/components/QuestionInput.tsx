
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ArrowRight, ChevronDown } from 'lucide-react';

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
  const [isOpen, setIsOpen] = useState(false);

  const handleCreatePoll = () => {
    if (question.trim()) {
      window.location.href = `/polls/ai-recommendations?question=${encodeURIComponent(question)}`;
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Textarea 
        placeholder={placeholder}
        value={question} 
        onChange={e => setQuestion(e.target.value)} 
        className="min-h-[100px] text-base resize-none" 
      />
      
      <Button 
        size="lg" 
        className="gap-2 w-full"
        onClick={handleCreatePoll}
        disabled={!question.trim()}
      >
        Create Poll
        <ArrowRight className="h-4 w-4" />
      </Button>
      
      {/* Collapsible Suggested Questions */}
      {showSuggestions && (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              Use Suggested Questions
              <ChevronDown 
                className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
              />
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-3 animate-accordion-down">
            <p className="text-sm text-muted-foreground">Suggested questions:</p>
            <div className="space-y-2">
              <button 
                onClick={() => setQuestion("What issues do you as a constituent care about most?")}
                className="w-full p-3 text-left text-sm bg-card border rounded-lg hover:bg-accent transition-colors"
              >
                What issues do you as a constituent care about most?
              </button>
              <button 
                onClick={() => setQuestion("Would you support increased funding for our local library?")}
                className="w-full p-3 text-left text-sm bg-card border rounded-lg hover:bg-accent transition-colors"
              >
                Would you support increased funding for our local library?
              </button>
              <button 
                onClick={() => setQuestion("What programs or services would you like to see offered in our schools?")}
                className="w-full p-3 text-left text-sm bg-card border rounded-lg hover:bg-accent transition-colors"
              >
                What programs or services would you like to see offered in our schools?
              </button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}

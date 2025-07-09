import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { STEPS } from './types';
interface StepNavigationProps {
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
  onLaunch: () => void;
  isMultipleQuestions: boolean;
}
export function StepNavigation({
  currentStep,
  onNext,
  onPrev,
  onLaunch,
  isMultipleQuestions
}: StepNavigationProps) {
  return <>
      {/* Mobile-First Progress Steps */}
      


      {/* Mobile-First Navigation */}
      <div className="flex justify-between gap-3">
        <Button variant="outline" onClick={onPrev} disabled={currentStep === 1} className="gap-2" size="lg">
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        
        {currentStep < 4 ? <Button onClick={onNext} className="gap-2" size="lg">
            Next
            <ArrowRight className="h-4 w-4" />
          </Button> : <Button onClick={onLaunch} className="gap-2" size="lg">
            Launch {isMultipleQuestions ? 'Survey' : 'Poll'}
            <ArrowRight className="h-4 w-4" />
          </Button>}
      </div>

      {/* Mobile Alternative Navigation */}
      <div className="sm:hidden text-center text-xs text-muted-foreground mt-4">
        Swipe left/right to navigate steps
      </div>
    </>;
}
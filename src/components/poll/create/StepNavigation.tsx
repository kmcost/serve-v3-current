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
  return (
    <>
      {/* Mobile-First Progress Steps */}
      <div className="flex items-center justify-center space-x-2 py-4">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-medium ${
              currentStep >= step.id 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {step.id}
            </div>
            <div className="ml-1 sm:ml-2 hidden md:block">
              <p className={`text-xs sm:text-sm font-medium ${
                currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step.name}
              </p>
            </div>
            {index < STEPS.length - 1 && (
              <div className={`w-4 sm:w-8 h-0.5 mx-1 sm:mx-2 ${
                currentStep > step.id ? 'bg-primary' : 'bg-muted'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Mobile Step Indicator */}
      <div className="md:hidden text-center">
        <p className="text-sm font-medium text-foreground">
          {STEPS[currentStep - 1]?.name}
        </p>
        <p className="text-xs text-muted-foreground">
          Step {currentStep} of {STEPS.length}
        </p>
      </div>

      {/* Mobile-First Navigation */}
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
        <Button 
          variant="outline" 
          onClick={onPrev}
          disabled={currentStep === 1}
          className="gap-2 order-2 sm:order-1"
          size="lg"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        
        {currentStep < 4 ? (
          <Button 
            onClick={onNext} 
            className="gap-2 order-1 sm:order-2"
            size="lg"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button 
            onClick={onLaunch}
            className="gap-2 order-1 sm:order-2"
            size="lg"
          >
            Launch {isMultipleQuestions ? 'Survey' : 'Poll'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Mobile Alternative Navigation */}
      <div className="sm:hidden text-center text-xs text-muted-foreground mt-4">
        Swipe left/right to navigate steps
      </div>
    </>
  );
}
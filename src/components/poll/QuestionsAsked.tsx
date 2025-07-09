import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Poll } from '@/data/pollData';

interface QuestionsAskedProps {
  poll: Poll;
}

export default function QuestionsAsked({ poll }: QuestionsAskedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Questions Asked</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Question</h3>
          <p className="text-muted-foreground">{poll.question}</p>
        </div>
        
        <div className="space-y-4">
          {Object.entries(poll.results).map(([key, value]) => (
            <div key={key}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                <span className="text-sm text-muted-foreground">
                  {value.count} votes ({value.percentage}%)
                </span>
              </div>
              <Progress value={value.percentage} className="h-3" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
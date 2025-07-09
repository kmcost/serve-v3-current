import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart3 } from 'lucide-react';
import { Poll } from '@/data/pollData';

interface PollResultsProps {
  poll: Poll;
}

export default function PollResults({ poll }: PollResultsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Poll Results
        </CardTitle>
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
        
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{poll.responses}</p>
            <p className="text-sm text-muted-foreground">Total Responses</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{poll.responseRate}</p>
            <p className="text-sm text-muted-foreground">Response Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">3</p>
            <p className="text-sm text-muted-foreground">Days Left</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
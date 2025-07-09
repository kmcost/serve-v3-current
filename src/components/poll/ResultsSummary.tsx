import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, TrendingUp } from 'lucide-react';
import { Poll, getResultsSummary } from '@/data/pollData';

interface ResultsSummaryProps {
  poll: Poll;
}

export default function ResultsSummary({ poll }: ResultsSummaryProps) {
  const summary = getResultsSummary(poll);
  
  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Results Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
              <TrendingUp className="h-4 w-4" />
              <span>Key Finding</span>
            </div>
            <p className="text-xl font-semibold text-green-800">{summary}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-green-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-700">{poll.responses}</p>
              <p className="text-sm text-muted-foreground">Total Responses</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-700">
                {Math.round((poll.responses / poll.expectedResponses) * 100)}%
              </p>
              <p className="text-sm text-muted-foreground">Participation Rate</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Poll } from '@/data/pollData';

interface RecentResponsesProps {
  poll: Poll;
}

export default function RecentResponses({ poll }: RecentResponsesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Responses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {poll.recentResponses.map((response, index) => (
            <div key={index} className="p-3 border rounded-lg space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{response.name}</span>
                  <Badge 
                    variant={response.response === 'Yes' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {response.response}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">{response.time}</span>
              </div>
              {response.comment && (
                <p className="text-sm text-muted-foreground italic leading-relaxed">"{response.comment}"</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
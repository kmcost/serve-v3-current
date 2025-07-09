import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Poll } from '@/data/pollData';

interface PollResultsProps {
  poll: Poll;
}

export default function PollResults({ poll }: PollResultsProps) {
  // Calculate days left from timeLeft string
  const getDaysLeft = (timeLeft: string) => {
    if (timeLeft === "Completed") return "0";
    const match = timeLeft.match(/(\d+)\s+days?/);
    if (match) return match[1];
    if (timeLeft.includes("week")) return "7";
    return "N/A";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Poll Results</CardTitle>
      </CardHeader>
      <CardContent>        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{poll.responses}</p>
            <p className="text-sm text-muted-foreground">Total Responses</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{poll.responseRate}</p>
            <p className="text-sm text-muted-foreground">Response Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">{getDaysLeft(poll.timeLeft)}</p>
            <p className="text-sm text-muted-foreground">Days Left</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
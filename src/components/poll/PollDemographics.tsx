import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Poll } from '@/data/pollData';
interface PollDemographicsProps {
  poll: Poll;
}
export default function PollDemographics({
  poll
}: PollDemographicsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Demographics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Response by Age Group</h4>
          <div className="space-y-3">
            {poll.demographics.byAge.map((ageGroup, index) => {
              const total = ageGroup.yes + ageGroup.no;
              const yesPercentage = total > 0 ? (ageGroup.yes / total) * 100 : 0;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">{ageGroup.range}</span>
                    <span className="text-muted-foreground">
                      {total} responses
                    </span>
                  </div>
                  <Progress value={yesPercentage} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{ageGroup.yes} Yes ({Math.round(yesPercentage)}%)</span>
                    <span>{ageGroup.no} No ({Math.round(100 - yesPercentage)}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
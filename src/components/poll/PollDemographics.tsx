import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Poll } from '@/data/pollData';

interface PollDemographicsProps {
  poll: Poll;
}

export default function PollDemographics({ poll }: PollDemographicsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Response Demographics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h4 className="font-medium text-sm sm:text-base">By Age Group</h4>
          {poll.demographics.byAge.map((age, index) => (
            <div key={index} className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{age.range}</span>
                <span className="text-muted-foreground">{age.yes + age.no} responses</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-green-600">Yes</span>
                    <span>{age.yes}</span>
                  </div>
                  <Progress value={(age.yes / (age.yes + age.no)) * 100} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-red-600">No</span>
                    <span>{age.no}</span>
                  </div>
                  <Progress value={(age.no / (age.yes + age.no)) * 100} className="h-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
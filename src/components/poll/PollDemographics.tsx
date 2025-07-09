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
          <h4 className="font-medium">By Age Group</h4>
          {poll.demographics.byAge.map((age, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{age.range}</span>
                <span>{age.yes + age.no} responses</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Yes</span>
                    <span>{age.yes}</span>
                  </div>
                  <Progress value={(age.yes / (age.yes + age.no)) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>No</span>
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
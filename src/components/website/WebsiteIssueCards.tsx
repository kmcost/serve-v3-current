import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { policyPositions } from '@/data/policyPositions';

export const WebsiteIssueCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {policyPositions.map((position) => (
        <Card key={position.id} className="bg-muted/30 border-muted">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">
              {position.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {position.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
import { Card, CardContent } from '@/components/ui/card';
import { Users, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { calculateImpactStats } from '@/services/statsService';

const iconMap = {
  Users,
  TrendingUp,
  CheckCircle,
  Clock
};

export function ImpactStats() {
  const stats = calculateImpactStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
        
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <IconComponent className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 
                  'text-muted-foreground'
                }`}>
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground ml-2">
                  from last period
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
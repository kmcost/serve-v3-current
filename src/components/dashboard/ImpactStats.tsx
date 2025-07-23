import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, FileText, Timer } from 'lucide-react';
import { calculateImpactStats } from '@/services/statsService';

const iconMap = {
  CheckCircle,
  Clock,
  FileText,
  Timer
};

const colorMap = {
  green: { bg: 'bg-green-100', text: 'text-green-600' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600' }
};

export function ImpactStats() {
  const stats = calculateImpactStats();

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((stat, index) => {
        const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
        const colors = colorMap[stat.color as keyof typeof colorMap];
        
        return (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 ${colors.bg} rounded-lg`}>
                  <IconComponent className={`h-5 w-5 ${colors.text}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
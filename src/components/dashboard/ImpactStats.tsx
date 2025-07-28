import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CheckCircle, Clock, FileText, Timer, TrendingUp, TrendingDown, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { calculateImpactStats } from '@/services/statsService';

const iconMap = {
  CheckCircle,
  Clock,
  FileText,
  Timer,
  TrendingUp
};

const colorMap = {
  green: { bg: 'bg-green-50 dark:bg-green-950/20', text: 'text-green-600 dark:text-green-400', border: 'border-green-200 dark:border-green-800' },
  blue: { bg: 'bg-blue-50 dark:bg-blue-950/20', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800' },
  orange: { bg: 'bg-orange-50 dark:bg-orange-950/20', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-800' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-950/20', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800' }
};

const trendIconMap = {
  up: ArrowUp,
  down: ArrowDown,
  neutral: Minus
};

const trendColorMap = {
  up: 'text-green-600 dark:text-green-400',
  down: 'text-red-600 dark:text-red-400',
  neutral: 'text-muted-foreground'
};

export function ImpactStats() {
  const stats = calculateImpactStats();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold text-foreground">Performance Dashboard</h2>
        <p className="text-sm text-muted-foreground">30-day performance compared to previous period</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat, index) => {
          const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
          const colors = colorMap[stat.color as keyof typeof colorMap];
          const TrendIcon = trendIconMap[stat.trend];
          const trendColor = trendColorMap[stat.trend];
          
          return (
            <Card key={index} className={`border-l-4 ${colors.border} hover:shadow-md transition-shadow`}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Top row - Icon and Title */}
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${colors.bg} rounded-lg`}>
                      <IconComponent className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                    </div>
                  </div>
                  
                  {/* Value and Trend */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <TrendIcon className={`h-4 w-4 ${trendColor}`} />
                      <span className={`font-medium ${trendColor}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  
                  {/* Period indicator */}
                  <div className="text-xs text-muted-foreground">
                    vs previous 30 days
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Performance Summary */}
      <Card className="bg-muted/30">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-muted-foreground">You're performing</span>
            </div>
            <span className="font-semibold text-green-600 dark:text-green-400">Above Average</span>
            <span className="text-muted-foreground">compared to other representatives</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
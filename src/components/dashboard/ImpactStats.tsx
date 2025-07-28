import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  green: {
    bg: 'bg-green-50 dark:bg-green-950/20',
    text: 'text-green-600 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800'
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800'
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-950/20',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-800'
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-950/20',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800'
  }
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
const performanceLevelMap = {
  excellent: {
    badge: 'Excellent',
    color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    indicator: 'bg-green-500'
  },
  good: {
    badge: 'Good',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    indicator: 'bg-blue-500'
  },
  'needs-improvement': {
    badge: 'Needs Focus',
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    indicator: 'bg-orange-500'
  }
};
export function ImpactStats() {
  const stats = calculateImpactStats();
  return <div className="space-y-4">
      {/* Header */}
      

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat, index) => {
        const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
        const colors = colorMap[stat.color as keyof typeof colorMap];
        const TrendIcon = trendIconMap[stat.trend];
        const trendColor = trendColorMap[stat.trend];
        const performance = performanceLevelMap[stat.performanceLevel];
        return <Card key={index} className={`border-l-4 ${colors.border} hover:shadow-md transition-shadow relative`}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Performance Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 ${colors.bg} rounded-lg`}>
                        <IconComponent className={`h-4 w-4 ${colors.text}`} />
                      </div>
                      <p className="text-sm font-medium text-foreground">{stat.title}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${performance.indicator}`}></div>
                  </div>
                  
                  {/* Main Value */}
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.benchmark}</p>
                  </div>
                  
                  {/* Trend and Performance */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <TrendIcon className={`h-3 w-3 ${trendColor}`} />
                      <span className={`text-sm font-medium ${trendColor}`}>
                        {stat.change}
                      </span>
                      <span className="text-xs text-muted-foreground">over 30 days</span>
                    </div>
                    <Badge variant="secondary" className={`text-xs ${performance.color} border-0`}>
                      {performance.badge}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>;
      })}
      </div>
      
      {/* Performance Summary */}
      <Card className="bg-white dark:bg-card border-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-foreground">You're performing</span>
            <span className="font-semibold text-foreground">Above Average</span>
            <span className="text-foreground">compared to other representatives</span>
          </div>
        </CardContent>
      </Card>
    </div>;
}
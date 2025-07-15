import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowLeft, ArrowRight, CheckCircle, Mail, MessageSquare, Share2, Phone, Clock, DollarSign, Brain, Info } from 'lucide-react';
import { generatePollRecommendation, PollRecommendation } from '@/services/aiPollService';
export default function AIRecommendations() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const question = searchParams.get('question') || '';
  const [recommendation, setRecommendation] = useState<PollRecommendation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!question) {
      navigate('/');
      return;
    }
    const generateRecommendation = async () => {
      try {
        setLoading(true);
        const rec = await generatePollRecommendation(question);
        setRecommendation(rec);
      } catch (err) {
        setError('Failed to generate recommendations. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    generateRecommendation();
  }, [question, navigate]);
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return Mail;
      case 'sms':
        return MessageSquare;
      case 'social':
        return Share2;
      case 'phone':
        return Phone;
      default:
        return Mail;
    }
  };
  const getChannelName = (channel: string) => {
    switch (channel) {
      case 'email':
        return 'Email';
      case 'sms':
        return 'SMS';
      case 'social':
        return 'Social Media';
      case 'phone':
        return 'Phone Calls';
      default:
        return channel;
    }
  };
  if (loading) {
    return <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center space-y-2">
                <p className="font-medium">Analyzing your question...</p>
                <p className="text-sm text-muted-foreground">
                  Our AI is optimizing audience targeting, channel selection, and question phrasing for maximum impact.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>;
  }
  if (error || !recommendation) {
    return <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Error</h1>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>;
  }
  return <div className="max-w-4xl mx-auto space-y-6">
      {/* Header - Mobile-First Layout */}
      <div className="space-y-3">
        <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="gap-2 self-start">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">AI-Powered Polling Strategy</h1>
          <p className="text-muted-foreground">Optimized poll strategy based on your question</p>
        </div>
      </div>

      {/* Question Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>
            Question Optimization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {recommendation.question.reasoning}
          </p>
          
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Question:</div>
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg text-sm font-medium">
              {recommendation.question.optimizedQuestion}
            </div>
          </div>

          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Clarity: {recommendation.question.clarity}%
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Low Bias: {100 - recommendation.question.bias}%
            </div>
          </div>

          <Button 
            onClick={() => navigate('/polls/edit', {
              state: {
                step: 1,
                question: recommendation.question.optimizedQuestion,
                audience: recommendation.audience.tags.map(t => t.id),
                channels: recommendation.channels.channels
              }
            })}
            className="w-full"
          >
            Edit
          </Button>
        </CardContent>
      </Card>

      {/* Strategy Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Audience */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Target Audience
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Total estimated residents in your selected audience segments. This number helps determine potential poll reach and response rates.
                  </p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {recommendation.audience.reasoning}
            </p>
            
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Target Population:</div>
              <div className="text-xl font-bold text-primary whitespace-nowrap">
                {recommendation.audience.totalSize.toLocaleString()} Residents
              </div>
            </div>
            <div className="flex flex-wrap gap-2 py-[4px]">
              {recommendation.audience.tags.map(tag => <Badge key={tag.id} className="bg-muted text-muted-foreground hover:bg-muted/80">
                  {tag.label}
                </Badge>)}
            </div>
            
            <Button 
              onClick={() => navigate('/polls/edit', {
                state: {
                  step: 2,
                  question: recommendation.question.optimizedQuestion,
                  audience: recommendation.audience.tags.map(t => t.id),
                  channels: recommendation.channels.channels
                }
              })}
              className="w-full"
            >
              Edit
            </Button>
          </CardContent>
        </Card>

        {/* Channels */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Distribution Channels
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    This estimate is based on your target audience size, selected distribution channels, and typical response rates for similar polls in your area.
                  </p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {recommendation.channels.reasoning}
            </p>
            
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Expected Engagement:</div>
              <div className="text-xl font-bold text-primary whitespace-nowrap">
                {recommendation.channels.expectedResponses} Responses
              </div>
            </div>
            <div className="flex gap-2 py-[4px]">
              {recommendation.channels.channels.map(channel => <Badge key={channel} className="bg-muted text-muted-foreground hover:bg-muted/80">
                  {getChannelName(channel)}
                </Badge>)}
            </div>
            
            <Button 
              onClick={() => navigate('/polls/edit', {
                state: {
                  step: 3,
                  question: recommendation.question.optimizedQuestion,
                  audience: recommendation.audience.tags.map(t => t.id),
                  channels: recommendation.channels.channels
                }
              })}
              className="w-full"
            >
              Edit
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>
            Expected Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div className="text-lg font-bold">{recommendation.timeline.duration}</div>
              <div className="text-sm text-muted-foreground">Duration</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div className="text-lg font-bold">{recommendation.channels.responseRate}%</div>
              <div className="text-sm text-muted-foreground">Response Rate</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div className="text-lg font-bold">${recommendation.channels.totalCost}</div>
              <div className="text-sm text-muted-foreground">Total Cost</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div className="text-lg font-bold">${recommendation.roi.costPerResponse}</div>
              <div className="text-sm text-muted-foreground">Cost/Response</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 flex-col sm:flex-row">
        <Button size="lg" onClick={() => navigate('/polls')} className="gap-2 flex-1 py-[16px]">
          <CheckCircle className="h-4 w-4" />
          Approve & Launch Poll
        </Button>
        
        <Button variant="outline" size="lg" onClick={() => navigate('/polls/edit', {
        state: {
          question: recommendation.question.optimizedQuestion,
          audience: recommendation.audience.tags.map(t => t.id),
          channels: recommendation.channels.channels
        }
      })} className="gap-2 flex-1 py-[16px]">
          Customize Poll
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>;
}
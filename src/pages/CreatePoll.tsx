import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  ArrowRight, 
  Plus, 
  Lightbulb,
  Users,
  Mail,
  MessageSquare,
  Phone,
  Share2,
  Eye
} from 'lucide-react';

const STEPS = [
  { id: 1, name: 'Question Setup', description: 'Define your questions' },
  { id: 2, name: 'Audience', description: 'Select your audience' },
  { id: 3, name: 'Distribution', description: 'Choose channels' },
  { id: 4, name: 'Preview & Launch', description: 'Review and launch' }
];

export default function CreatePoll() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [questions, setQuestions] = useState([
    { id: 1, text: '', type: 'yes_no', options: [] }
  ]);
  const [audience, setAudience] = useState('all');
  const [channels, setChannels] = useState<string[]>([]);

  const addQuestion = () => {
    setQuestions([...questions, { 
      id: questions.length + 1, 
      text: '', 
      type: 'yes_no', 
      options: [] 
    }]);
  };

  const updateQuestion = (id: number, field: string, value: string) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isMultipleQuestions = questions.length > 1;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/polls')}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Polls
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Create {isMultipleQuestions ? 'Survey' : 'Poll'}
          </h1>
          <p className="text-muted-foreground">
            {isMultipleQuestions ? 
              'Multi-question survey for detailed feedback' : 
              'Quick poll for simple questions'
            }
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 py-4">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              currentStep >= step.id 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {step.id}
            </div>
            <div className="ml-2 hidden sm:block">
              <p className={`text-sm font-medium ${
                currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step.name}
              </p>
            </div>
            {index < STEPS.length - 1 && (
              <div className={`w-12 h-0.5 mx-4 ${
                currentStep > step.id ? 'bg-primary' : 'bg-muted'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">What do you want to ask?</h2>
                <p className="text-muted-foreground">
                  Add your questions below. Multiple questions automatically create a survey.
                </p>
              </div>

              {questions.map((question, index) => (
                <div key={question.id} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">
                      Question {index + 1}
                    </Label>
                    {questions.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setQuestions(questions.filter(q => q.id !== question.id))}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  
                  <Textarea
                    placeholder="Enter your question..."
                    value={question.text}
                    onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                    className="min-h-[80px]"
                  />

                  <div>
                    <Label className="text-sm">Question Type</Label>
                    <RadioGroup 
                      value={question.type}
                      onValueChange={(value) => updateQuestion(question.id, 'type', value)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes_no" id={`yes_no_${question.id}`} />
                        <Label htmlFor={`yes_no_${question.id}`}>Yes/No</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="multiple_choice" id={`mc_${question.id}`} />
                        <Label htmlFor={`mc_${question.id}`}>Multiple Choice</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="rating" id={`rating_${question.id}`} />
                        <Label htmlFor={`rating_${question.id}`}>Rating Scale (1-5)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="open_text" id={`text_${question.id}`} />
                        <Label htmlFor={`text_${question.id}`}>Open Text</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              ))}

              <Button 
                variant="outline" 
                onClick={addQuestion}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Another Question
              </Button>

              {/* AI Suggestion */}
              <div className="bg-accent/50 border-l-4 border-l-primary p-4 rounded">
                <div className="flex gap-3">
                  <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">AI Suggestion</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on your question, we recommend phrasing it as: "Do you support extending parking meter hours downtown from 6 PM to 8 PM on weekdays?" This creates clearer expectations and actionable results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Who should we ask?</h2>
                <p className="text-muted-foreground">
                  Select your target audience for maximum relevant engagement.
                </p>
              </div>

              <RadioGroup value={audience} onValueChange={setAudience}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all" className="flex-1">
                      <div>
                        <p className="font-medium">All Constituents</p>
                        <p className="text-sm text-muted-foreground">~25,000 residents in District 3</p>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="downtown" id="downtown" />
                    <Label htmlFor="downtown" className="flex-1">
                      <div>
                        <p className="font-medium">Downtown Area</p>
                        <p className="text-sm text-muted-foreground">~2,400 residents and businesses</p>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="residential" id="residential" />
                    <Label htmlFor="residential" className="flex-1">
                      <div>
                        <p className="font-medium">Residential Neighborhoods</p>
                        <p className="text-sm text-muted-foreground">~18,500 residents</p>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="previous" id="previous" />
                    <Label htmlFor="previous" className="flex-1">
                      <div>
                        <p className="font-medium">Previous Poll Respondents</p>
                        <p className="text-sm text-muted-foreground">~850 engaged constituents</p>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              {/* AI Recommendation */}
              <div className="bg-accent/50 border-l-4 border-l-primary p-4 rounded">
                <div className="flex gap-3">
                  <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">AI Recommendation</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      For this parking topic, we recommend targeting <strong>downtown area residents and businesses</strong> (est. 2,400 people) because they're directly affected by parking meter changes and likely to provide relevant feedback.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Channels & Distribution</h2>
                <p className="text-muted-foreground">
                  Select how you want to reach your audience.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  {[
                    { id: 'email', icon: Mail, name: 'Email', reach: '~800 responses', cost: '$45' },
                    { id: 'sms', icon: MessageSquare, name: 'SMS', reach: '~400 responses', cost: '$75' },
                    { id: 'social', icon: Share2, name: 'Social Media', reach: '~300 responses', cost: '$25' },
                    { id: 'phone', icon: Phone, name: 'Phone Calls', reach: '~150 responses', cost: '$200' }
                  ].map((channel) => {
                    const Icon = channel.icon;
                    const isSelected = channels.includes(channel.id);
                    
                    return (
                      <div 
                        key={channel.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          isSelected ? 'border-primary bg-primary/5' : 'border-border hover:bg-accent/50'
                        }`}
                        onClick={() => {
                          if (isSelected) {
                            setChannels(channels.filter(c => c !== channel.id));
                          } else {
                            setChannels([...channels, channel.id]);
                          }
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-primary" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{channel.name}</p>
                              {isSelected && <Badge variant="default" className="text-xs">Selected</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {channel.reach} • {channel.cost}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Recommendation */}
              <div className="bg-accent/50 border-l-4 border-l-primary p-4 rounded">
                <div className="flex gap-3">
                  <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">AI Recommendation</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      For maximum engagement, we suggest combining <strong>Email + SMS</strong> (est. 1,200 responses, $120 total). This combination typically achieves 35-40% response rates for local government polls.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Preview & Launch</h2>
                <p className="text-muted-foreground">
                  Review your {isMultipleQuestions ? 'survey' : 'poll'} before launching.
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-sm text-muted-foreground">Type</Label>
                        <p className="font-medium">{isMultipleQuestions ? 'Survey' : 'Poll'}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Questions</Label>
                        <p className="font-medium">{questions.length} question{questions.length !== 1 ? 's' : ''}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Audience</Label>
                        <p className="font-medium">
                          {audience === 'all' && 'All Constituents (~25,000)'}
                          {audience === 'downtown' && 'Downtown Area (~2,400)'}
                          {audience === 'residential' && 'Residential (~18,500)'}
                          {audience === 'previous' && 'Previous Respondents (~850)'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Channels</Label>
                        <p className="font-medium">{channels.length || 'None selected'}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Estimated Responses</Label>
                        <p className="font-medium text-primary">~800-1,200 responses</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Total Cost</Label>
                        <p className="font-medium">$120</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Preview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="text-center space-y-3">
                          <h3 className="font-semibold">City of Oakland Survey</h3>
                          <p className="text-sm text-muted-foreground">From: Sarah Chen, District 3 Council Member</p>
                          <div className="space-y-2 text-left">
                            {questions.map((question, index) => (
                              <div key={question.id} className="p-2 bg-white rounded border">
                                <p className="text-sm font-medium">Q{index + 1}: {question.text || 'Your question here...'}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {question.type === 'yes_no' && 'Yes / No'}
                                  {question.type === 'multiple_choice' && 'Multiple choice options'}
                                  {question.type === 'rating' && 'Rating scale 1-5'}
                                  {question.type === 'open_text' && 'Open text response'}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={prevStep}
          disabled={currentStep === 1}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        
        {currentStep < 4 ? (
          <Button onClick={nextStep} className="gap-2">
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button 
            onClick={() => navigate('/polls')}
            className="gap-2 bg-success hover:bg-success/90"
          >
            Launch {isMultipleQuestions ? 'Survey' : 'Poll'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
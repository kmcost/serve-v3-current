import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Eye } from 'lucide-react';
import { Question } from './types';

interface PreviewStepProps {
  questions: Question[];
  audience: string;
  channels: string[];
  isMultipleQuestions: boolean;
}

export function PreviewStep({ questions, audience, channels, isMultipleQuestions }: PreviewStepProps) {
  const getAudienceName = (audienceValue: string) => {
    switch (audienceValue) {
      case 'all': return 'All Constituents (~25,000)';
      case 'downtown': return 'Downtown Area (~2,400)';
      case 'residential': return 'Residential (~18,500)';
      case 'previous': return 'Previous Respondents (~850)';
      default: return 'Unknown';
    }
  };

  const getQuestionTypeDisplay = (type: string) => {
    switch (type) {
      case 'yes_no': return 'Yes / No';
      case 'multiple_choice': return 'Multiple choice options';
      case 'rating': return 'Rating scale 1-5';
      case 'open_text': return 'Open text response';
      default: return type;
    }
  };

  return (
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
                <p className="font-medium">{getAudienceName(audience)}</p>
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
                  <p className="text-sm text-muted-foreground">From: Raymond Chen, District 3 Council Member</p>
                  <div className="space-y-2 text-left">
                    {questions.map((question, index) => (
                      <div key={question.id} className="p-2 bg-white rounded border">
                        <p className="text-sm font-medium">Q{index + 1}: {question.text || 'Your question here...'}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {getQuestionTypeDisplay(question.type)}
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
  );
}
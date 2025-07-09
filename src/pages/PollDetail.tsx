import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { pollData, getPollStatus } from '@/data/pollData';
import PollHeader from '@/components/poll/PollHeader';
import PollStatus from '@/components/poll/PollStatus';
import PollResults from '@/components/poll/PollResults';
import PollDemographics from '@/components/poll/PollDemographics';
import RecentResponses from '@/components/poll/RecentResponses';
import ResultsSummary from '@/components/poll/ResultsSummary';
import QuickActions from '@/components/poll/QuickActions';

export default function PollDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const poll = pollData[Number(id) as keyof typeof pollData];
  
  if (!poll) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-medium text-muted-foreground">Poll not found</p>
        <Button onClick={() => navigate('/polls')} className="mt-4">
          Back to Polls
        </Button>
      </div>
    );
  }

  const status = getPollStatus(poll.startDate, poll.endDate);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <PollHeader poll={poll} />

      {/* Mobile-first layout */}
      <div className="space-y-6">
        {/* Status Section - Always visible */}
        {status === 'completed' ? (
          <ResultsSummary poll={poll} />
        ) : (
          <PollStatus poll={poll} />
        )}

        {/* Main Content - Conditional based on status */}
        {status !== 'not_started' && (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <PollResults poll={poll} />
              <PollDemographics poll={poll} />
              <RecentResponses poll={poll} />
            </div>
            
            {/* Quick Actions Sidebar */}
            <div className="space-y-4">
              <QuickActions poll={poll} />
            </div>
          </div>
        )}

        {/* For not started polls, only show actions */}
        {status === 'not_started' && (
          <div className="max-w-md mx-auto">
            <QuickActions poll={poll} />
          </div>
        )}
      </div>
    </div>
  );
}
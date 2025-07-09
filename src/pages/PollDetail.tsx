import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { pollData } from '@/data/pollData';
import PollHeader from '@/components/poll/PollHeader';
import PollResults from '@/components/poll/PollResults';
import PollDemographics from '@/components/poll/PollDemographics';
import RecentResponses from '@/components/poll/RecentResponses';
import PollSidebar from '@/components/poll/PollSidebar';

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

  return (
    <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-6">
      <PollHeader poll={poll} />

      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
        {/* Mobile-first: Key info at top */}
        <div className="md:hidden">
          <PollSidebar poll={poll} />
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-4 sm:space-y-6">
          <PollResults poll={poll} />
          <PollDemographics poll={poll} />
          <RecentResponses poll={poll} />
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <PollSidebar poll={poll} />
        </div>
      </div>
    </div>
  );
}
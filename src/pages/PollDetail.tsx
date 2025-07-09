import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { pollData } from '@/data/pollData';
import PollHeader from '@/components/poll/PollHeader';
import PollResults from '@/components/poll/PollResults';
import QuestionsAsked from '@/components/poll/QuestionsAsked';
import RecentResponses from '@/components/poll/RecentResponses';
import PollSidebar from '@/components/poll/PollSidebar';
import { isPollStarted } from '@/utils/pollUtils';

export default function PollDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const poll = pollData[Number(id) as keyof typeof pollData];
  const pollStarted = poll ? isPollStarted(poll.startDate) : false;
  
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
    <div className="max-w-6xl mx-auto space-y-6">
      <PollHeader poll={poll} />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <PollResults poll={poll} />
          <QuestionsAsked poll={poll} />
          {pollStarted && <RecentResponses poll={poll} />}
        </div>

        {/* Sidebar */}
        <PollSidebar poll={poll} />
      </div>
    </div>
  );
}
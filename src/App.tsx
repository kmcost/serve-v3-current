import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import { UserRoleProvider } from '@/contexts/UserRoleContext';
import Layout from '@/components/Layout';

// Pages
import Dashboard from '@/pages/Dashboard';
import Issues from '@/pages/Issues';
import IssueDetail from '@/pages/IssueDetail';
import Priorities from '@/pages/Priorities';
import Polls from '@/pages/Polls';
import CreatePoll from '@/pages/CreatePoll';
import PollDetail from '@/pages/PollDetail';
import People from '@/pages/People';
import Inbox from '@/pages/Inbox';
import MessageDetail from '@/pages/MessageDetail';
import Settings from '@/pages/Settings';
import WebsitePreview from '@/pages/WebsitePreview';
import AIRecommendations from '@/pages/AIRecommendations';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Router>
          <UserRoleProvider>
            <Routes>
              <Route path="/" element={<Layout><Outlet /></Layout>}>
                <Route index element={<Dashboard />} />
                <Route path="issues" element={<Issues />} />
                <Route path="issues/:id" element={<IssueDetail />} />
                <Route path="priorities" element={<Priorities />} />
                <Route path="polls" element={<Polls />} />
                <Route path="polls/create" element={<CreatePoll />} />
                <Route path="polls/:id" element={<PollDetail />} />
                <Route path="people" element={<People />} />
                <Route path="inbox" element={<Inbox />} />
                <Route path="inbox/:id" element={<MessageDetail />} />
                <Route path="settings" element={<Settings />} />
                <Route path="website" element={<WebsitePreview />} />
                <Route path="ai-recommendations" element={<AIRecommendations />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </UserRoleProvider>
        </Router>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

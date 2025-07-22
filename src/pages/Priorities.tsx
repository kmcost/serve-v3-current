
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Eye, 
  Filter,
  BarChart3,
  Globe,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { KanbanBoard } from '@/components/kanban/KanbanBoard';
import { PublicBoardPreview } from '@/components/kanban/PublicBoardPreview';
import { getPriorityItems } from '@/services/mockData';
import { PriorityItem } from '@/types/core';

const Priorities = () => {
  const [priorityItems, setPriorityItems] = useState<PriorityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPriorityItems();
  }, []);

  const loadPriorityItems = async () => {
    try {
      const items = await getPriorityItems();
      setPriorityItems(items);
    } catch (error) {
      console.error('Failed to load priority items:', error);
    } finally {
      setLoading(false);
    }
  };

  const todoCount = priorityItems.filter(item => item.boardStatus === 'todo').length;
  const inProgressCount = priorityItems.filter(item => item.boardStatus === 'in-progress').length;
  const completedCount = priorityItems.filter(item => item.boardStatus === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Priorities Board</h1>
          <p className="text-muted-foreground">
            Manage and track community priorities with transparent progress
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <PublicBoardPreview items={priorityItems} />
          <Link to="/issues">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              Create Priority Issue
            </Button>
          </Link>
        </div>
      </div>

      {/* Public Notice Banner */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center space-x-3">
              <Globe className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-blue-800">
                  Public Transparency Board
                </h3>
                <p className="text-sm sm:text-base text-blue-700">
                  This priorities board is visible on your campaign website, showing constituents real progress on community issues
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Link to="/website-preview">
                <Button
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-100 w-full sm:w-auto"
                  size="sm"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Public Site
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">To Do</p>
                <p className="text-2xl font-bold">{todoCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ArrowRight className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{inProgressCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Board Actions */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter & Sort
        </Button>
        <Link to="/dashboard">
          <Button variant="outline" className="gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            Add from Dashboard
          </Button>
        </Link>
      </div>

      {/* Kanban Board */}
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <KanbanBoard />
      )}

      {/* Mobile instructions */}
      <div className="p-4 bg-gray-50 rounded-lg sm:hidden">
        <p className="text-sm text-muted-foreground text-center">
          💡 Tip: Swipe horizontally to scroll between board columns and drag cards to move them between stages
        </p>
      </div>
    </div>
  );
};

export default Priorities;

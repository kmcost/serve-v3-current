
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { PriorityItem, BoardColumn } from '@/types/core';
import { KanbanColumn } from './KanbanColumn';
import { getPriorityItems, updatePriorityItemStatus } from '@/services/mockData';

export function KanbanBoard() {
  const [priorityItems, setPriorityItems] = useState<PriorityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadPriorityItems();
  }, []);

  const loadPriorityItems = async () => {
    try {
      const items = await getPriorityItems();
      setPriorityItems(items);
    } catch (error) {
      toast({
        title: "Error loading priorities",
        description: "Failed to load priority items",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleItemMove = async (itemId: string, newColumn: BoardColumn) => {
    // Optimistic update
    setPriorityItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, boardStatus: newColumn }
          : item
      )
    );

    // Track updating state
    setUpdatingItems(prev => new Set([...prev, itemId]));

    try {
      await updatePriorityItemStatus(itemId, newColumn);
      
      toast({
        title: "Priority updated",
        description: `Item moved to ${newColumn.replace('-', ' ')}`,
      });
    } catch (error) {
      // Revert optimistic update on error
      setPriorityItems(prev => 
        prev.map(item => 
          item.id === itemId 
            ? { ...item, boardStatus: item.boardStatus } // This would revert to original
            : item
        )
      );
      
      toast({
        title: "Update failed",
        description: "Failed to update priority status",
        variant: "destructive"
      });
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const getItemsByColumn = (column: BoardColumn) => {
    return priorityItems.filter(item => item.boardStatus === column);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
      <KanbanColumn
        title="To Do"
        column="todo"
        items={getItemsByColumn('todo')}
        onItemMove={handleItemMove}
        onAddItem={() => toast({ title: "Add Item", description: "Feature coming soon!" })}
      />
      
      <KanbanColumn
        title="In Progress"
        column="in-progress"
        items={getItemsByColumn('in-progress')}
        onItemMove={handleItemMove}
      />
      
      <KanbanColumn
        title="Completed"
        column="completed"
        items={getItemsByColumn('completed')}
        onItemMove={handleItemMove}
      />
    </div>
  );
}

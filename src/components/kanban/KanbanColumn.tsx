
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Play, 
  CheckCircle,
  Plus
} from 'lucide-react';
import { PriorityItem, BoardColumn } from '@/types/core';
import { PriorityCard } from './PriorityCard';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  title: string;
  column: BoardColumn;
  items: PriorityItem[];
  onItemMove: (itemId: string, newColumn: BoardColumn) => void;
  onAddItem?: () => void;
}

export function KanbanColumn({ title, column, items, onItemMove, onAddItem }: KanbanColumnProps) {
  const [draggedOver, setDraggedOver] = useState(false);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

  const getColumnIcon = (column: BoardColumn) => {
    switch (column) {
      case 'todo': return <Clock className="h-5 w-5" />;
      case 'in-progress': return <Play className="h-5 w-5" />;
      case 'completed': return <CheckCircle className="h-5 w-5" />;
    }
  };

  const getColumnColor = (column: BoardColumn) => {
    switch (column) {
      case 'todo': return 'text-gray-600';
      case 'in-progress': return 'text-blue-600';
      case 'completed': return 'text-green-600';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDraggedOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    if (itemId && itemId !== draggedItemId) {
      onItemMove(itemId, column);
    }
    setDraggedOver(false);
    setDraggedItemId(null);
  };

  const handleItemDragStart = (item: PriorityItem) => (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', item.id);
    setDraggedItemId(item.id);
  };

  const handleItemDragEnd = () => {
    setDraggedItemId(null);
  };

  return (
    <div className="flex-shrink-0 w-80 sm:w-96">
      <Card className="h-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={getColumnColor(column)}>
                {getColumnIcon(column)}
              </div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <Badge variant="secondary" className="ml-2">
                {items.length}
              </Badge>
            </div>
            {onAddItem && column === 'todo' && (
              <button
                onClick={onAddItem}
                className="p-1 rounded hover:bg-gray-100"
                title="Add new priority"
              >
                <Plus className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </div>
        </CardHeader>
        
        <CardContent 
          className={cn(
            "pt-0 min-h-96 transition-colors",
            draggedOver && "bg-blue-50 border-blue-200"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="space-y-3">
            {items.map((item) => (
              <PriorityCard
                key={item.id}
                item={item}
                isDragging={draggedItemId === item.id}
                onDragStart={handleItemDragStart(item)}
                onDragEnd={handleItemDragEnd}
              />
            ))}
            
            {items.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-2">📋</div>
                <p className="text-sm">No items in {title.toLowerCase()}</p>
                {column === 'todo' && (
                  <p className="text-xs mt-1">Add priorities from Dashboard or Issues</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Check, X, Edit2, Plus } from 'lucide-react';

interface InlineTextEditorProps {
  value: string;
  onSave: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
  className?: string;
}

export function InlineTextEditor({ 
  value, 
  onSave, 
  multiline = false, 
  placeholder,
  className = "" 
}: InlineTextEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        {multiline ? (
          <Textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder={placeholder}
            className={className}
            rows={4}
          />
        ) : (
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder={placeholder}
            className={className}
          />
        )}
        <div className="flex gap-2">
          <Button size="sm" onClick={handleSave}>
            <Check className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="group cursor-pointer" onClick={() => setIsEditing(true)}>
      <div className="flex items-center gap-2">
        <span className={className}>{value || placeholder}</span>
        <Edit2 className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}

interface InlineSelectEditorProps {
  value: string;
  options: { value: string; label: string }[];
  onSave: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function InlineSelectEditor({ 
  value, 
  options, 
  onSave, 
  placeholder,
  className = "" 
}: InlineSelectEditorProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (newValue: string) => {
    onSave(newValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        <Select value={value} onValueChange={handleSave}>
          <SelectTrigger className={className}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="group cursor-pointer" onClick={() => setIsEditing(true)}>
      <div className="flex items-center gap-2">
        <span className={className}>{selectedOption?.label || placeholder}</span>
        <Edit2 className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}

interface InlineTagEditorProps {
  tags: string[];
  onSave: (tags: string[]) => void;
  className?: string;
}

export function InlineTagEditor({ tags, onSave, className = "" }: InlineTagEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()];
      onSave(updatedTags);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    onSave(updatedTags);
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Badge key={tag} className="gap-1 bg-white text-gray-700 border border-gray-300">
              {tag}
              <X 
                className="h-3 w-3 cursor-pointer hover:text-red-500" 
                onClick={() => handleRemoveTag(tag)}
              />
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add tag..."
            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            className="flex-1"
          />
          <Button size="sm" onClick={handleAddTag}>
            <Plus className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
            <Check className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="group cursor-pointer" onClick={() => setIsEditing(true)}>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Badge key={tag} className="gap-1 bg-white text-gray-700 border border-gray-300">
            {tag}
          </Badge>
        ))}
        <Edit2 className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}

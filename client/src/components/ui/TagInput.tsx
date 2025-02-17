import { useState, useRef, useEffect } from 'react';

interface TagInputProps {
  value: string;
  onChange: (value: string) => void;
  suggestions?: string[];
  label?: string;
  placeholder?: string;
}

export const TagInput = ({ value, onChange, suggestions = [], label, placeholder }: TagInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState<string[]>(value ? value.split(',').map(t => t.trim()) : []);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const filtered = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !tags.includes(suggestion)
    );
    setFilteredSuggestions(filtered);
  }, [inputValue, suggestions, tags]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(true);
  };

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      const newTags = [...tags, tag];
      setTags(newTags);
      onChange(newTags.join(', '));
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    onChange(newTags.join(', '));
  };

  return (
    <div className="space-y-1.5 select-none">
      {label && (
        <label className="text-sm font-medium text-foreground select-none">{label}</label>
      )}
      <div className="relative">
        <div className="flex flex-wrap gap-2 p-3 bg-muted border border-border rounded-lg min-h-[2.75rem]">
          {tags.map(tag => (
            <span
              key={tag}
              className="
                inline-flex items-center gap-1.5 
                px-2.5 py-1.5
                bg-primary/10 text-primary 
                rounded-lg
                animate-in fade-in slide-in-from-left-3
                hover:bg-primary/15 transition-colors
                text-sm font-medium
                select-none
              "
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-error transition-colors w-4 h-4 flex items-center justify-center rounded-full hover:bg-error/10 select-none"
              >
                ×
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={e => {
              if (e.key === 'Enter' && inputValue) {
                e.preventDefault();
                addTag(inputValue);
              }
            }}
            placeholder={placeholder}
            className="flex-1 min-w-[120px] bg-transparent border-none focus:outline-none p-1.5 text-foreground placeholder:text-muted-foreground select-text"
          />
        </div>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-2 bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg shadow-lg overflow-hidden select-none">
            {filteredSuggestions.map(suggestion => (
              <button
                key={suggestion}
                onClick={() => addTag(suggestion)}
                className="w-full px-4 py-2.5 text-left hover:bg-primary/5 transition-colors text-sm select-none"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 
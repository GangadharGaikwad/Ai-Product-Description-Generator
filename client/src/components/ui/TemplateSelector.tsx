import { Template } from '@/types';
import { templates } from '@/data/templates';

interface TemplateSelectorProps {
  onSelect: (template: Template) => void;
  selectedId: string | null;
}

export const TemplateSelector = ({ onSelect, selectedId }: TemplateSelectorProps) => {
  return (
    <div className="space-y-4 select-none">
      <h3 className="text-lg font-semibold text-foreground">Choose a Template</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => {
          const isSelected = selectedId === template.id;
          return (
            <button
              key={template.id}
              onClick={() => onSelect(template)}
              className={`p-4 rounded-xl border transition-all text-left group relative select-none
                ${isSelected 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary hover:bg-muted/50'}`}
            >
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <svg 
                    className="w-3 h-3 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>
              )}
              <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary">
                {template.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {template.description}
              </p>
              <div className="text-xs text-muted-foreground">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">Tone:</span>
                  <span className="capitalize">{template.settings.tone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Style:</span>
                  <span className="capitalize">{template.settings.writing_style}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}; 
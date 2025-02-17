interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  counter?: number;
  maxLength?: number;
}

export const TextArea = ({
  label,
  error,
  counter,
  maxLength,
  className = '',
  ...props
}: TextAreaProps) => {
  return (
    <div className="space-y-1.5 select-none">
      <div className="flex justify-between items-center">
        {label && (
          <label htmlFor={props.id} className="text-sm font-medium text-foreground select-none">
            {label}
          </label>
        )}
        {maxLength && counter}
      </div>
      <div className="relative group">
        <textarea
          className={`
            w-full px-4 py-3
            bg-muted
            border border-border
            rounded-lg
            text-foreground placeholder:text-muted-foreground
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50
            group-hover:border-primary/30
            min-h-[120px]
            text-sm
            resize-y
            select-text
            ${error ? 'border-error ring-error/20' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-error mt-1.5 select-none">{error}</p>
      )}
    </div>
  );
}; 
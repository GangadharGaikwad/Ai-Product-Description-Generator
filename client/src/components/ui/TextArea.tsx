interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  renderCounter?: (props: { current: number; max: number }) => React.ReactNode;
  maxLength?: number;
}

export const TextArea = ({
  label,
  error,
  renderCounter,
  maxLength,
  className = '',
  value = '',
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
        {maxLength && renderCounter && renderCounter({
          current: String(value).length,
          max: maxLength
        })}
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
          maxLength={maxLength}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-error mt-1.5 select-none">{error}</p>
      )}
    </div>
  );
}; 
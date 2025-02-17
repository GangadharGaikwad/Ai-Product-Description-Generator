interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  counter?: number;
  maxLength?: number;
}

export const Input = ({
  label,
  error,
  counter,
  maxLength,
  className = '',
  ...props
}: InputProps) => {
  return (
    <div className="space-y-1.5 select-none">
      <div className="flex justify-between items-center">
        {label && (
          <label htmlFor={props.id} className="text-sm font-medium text-foreground select-none">
            {label}
          </label>
        )}
        {maxLength && (
          <span className="text-xs text-muted-foreground select-none">
            {counter || 0}/{maxLength}
          </span>
        )}
      </div>
      <div className="relative group">
        <input
          className={`
            w-full px-4 py-2.5
            bg-muted
            border border-border
            rounded-lg
            text-foreground placeholder:text-muted-foreground
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50
            group-hover:border-primary/30
            text-sm
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
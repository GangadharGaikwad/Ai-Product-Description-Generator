interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
}

export const Select = ({
  label,
  options,
  error,
  className = '',
  ...props
}: SelectProps) => {
  return (
    <div className="space-y-1 select-none">
      {label && (
        <label htmlFor={props.id} className="form-label select-none">
          {label}
        </label>
      )}
      <select
        className={`form-input select-text ${error ? 'border-[var(--error-foreground)]' : ''} ${className}`}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value} className="select-text">
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-[var(--error-foreground)] select-none">{error}</p>
      )}
    </div>
  );
}; 
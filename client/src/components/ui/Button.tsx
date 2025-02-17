interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading,
  icon,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles = `
    relative overflow-hidden
    rounded-lg font-medium
    transition-all duration-300
    flex items-center justify-center gap-2
    active:scale-[0.98]
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:transform-none
  `;
  
  const variants = {
    primary: `
      bg-primary text-primary-foreground
      hover:bg-primary-hover hover:shadow-[0_8px_30px_rgb(99,102,241,0.2)]
      hover:-translate-y-0.5
    `,
    secondary: `
      bg-secondary text-secondary-foreground
      hover:bg-secondary/90 hover:shadow-[0_8px_30px_rgb(236,72,153,0.2)]
      hover:-translate-y-0.5
    `,
    outline: `
      border border-border bg-background/50
      hover:bg-muted/50 hover:border-primary/50
      text-foreground
      backdrop-blur-sm
    `
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">{props['aria-label'] || 'Loading...'}</span>
        </>
      ) : (
        <>
          {icon}
          <span className="text-sm">{children}</span>
        </>
      )}
    </button>
  );
}; 
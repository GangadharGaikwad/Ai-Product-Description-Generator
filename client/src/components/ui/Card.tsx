interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => (
  <div 
    className={`
      relative overflow-hidden
      bg-background/60 backdrop-blur-xl
      border border-border/50
      shadow-[0_8px_30px_rgb(0,0,0,0.04)]
      rounded-2xl
      p-6 sm:p-8
      transition-all duration-300
      hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]
      hover:border-border
      ${className}
    `}
  >
    {/* Add subtle gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.02] via-transparent to-accent/[0.02] pointer-events-none" />
    <div className="relative">{children}</div>
  </div>
); 
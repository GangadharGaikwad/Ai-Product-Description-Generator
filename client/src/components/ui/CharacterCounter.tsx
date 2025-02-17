interface CharacterCounterProps {
  current: number;
  max: number;
}

export const CharacterCounter = ({ current, max }: CharacterCounterProps) => {
  const percentage = (current / max) * 100;
  const isWarning = percentage >= 80;
  const isError = percentage >= 100;

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 rounded-full ${
            isError ? 'bg-error' : isWarning ? 'bg-secondary' : 'bg-primary'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <span className={`text-xs ${
        isError ? 'text-error' : isWarning ? 'text-secondary' : 'text-muted-foreground'
      }`}>
        {current}/{max}
      </span>
    </div>
  );
}; 
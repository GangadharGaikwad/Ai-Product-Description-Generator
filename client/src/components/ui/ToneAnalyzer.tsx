interface ToneAnalyzerProps {
  text: string;
}

export const ToneAnalyzer = ({ text }: ToneAnalyzerProps) => {
  const analyzeTone = () => {
    const tones = {
      professional: text.match(/professional|expertise|solution|effective/gi)?.length || 0,
      friendly: text.match(/friendly|welcome|help|support/gi)?.length || 0,
      persuasive: text.match(/best|perfect|exceptional|outstanding/gi)?.length || 0,
      technical: text.match(/technology|system|performance|specification/gi)?.length || 0,
    };

    const total = Object.values(tones).reduce((a, b) => a + b, 0);
    return Object.entries(tones).map(([tone, count]) => ({
      tone,
      percentage: total ? (count / total) * 100 : 0
    }));
  };

  return (
    <div className="space-y-3 select-none">
      <h4 className="text-sm font-medium text-foreground">Tone Analysis</h4>
      <div className="space-y-2">
        {analyzeTone().map(({ tone, percentage }) => (
          <div key={tone} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="capitalize text-muted-foreground">{tone}</span>
              <span className="text-muted-foreground">{percentage.toFixed(1)}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full bg-primary transition-all duration-500`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 
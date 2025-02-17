interface SeoScoreProps {
  text: string;
  keywords: string[];
}

export const SeoScore = ({ text, keywords }: SeoScoreProps) => {
  const calculateScore = () => {
    const scores = {
      keywordDensity: 0,
      readability: 0,
      length: 0,
      structure: 0
    };

    // Calculate keyword density
    const wordCount = text.split(/\s+/).length;
    const keywordMatches = keywords.reduce((count, keyword) => {
      const regex = new RegExp(keyword, 'gi');
      return count + (text.match(regex)?.length || 0);
    }, 0);
    scores.keywordDensity = Math.min((keywordMatches / wordCount) * 100, 100);

    // Calculate readability (simple version)
    const sentences = text.split(/[.!?]+/).length;
    const avgWordsPerSentence = wordCount / sentences;
    scores.readability = Math.max(100 - Math.abs(avgWordsPerSentence - 15) * 5, 0);

    // Calculate length score
    scores.length = Math.min((wordCount / 300) * 100, 100);

    // Calculate structure score
    scores.structure = text.includes('**') ? 100 : 50;

    return scores;
  };

  const scores = calculateScore();
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0) / 4;

  return (
    <div className="space-y-4 select-none">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-foreground">SEO Score</h4>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {Math.round(totalScore)}
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {Object.entries(scores).map(([key, score]) => (
          <div key={key} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="capitalize text-muted-foreground">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <span className="text-muted-foreground">{Math.round(score)}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  score >= 70 ? 'bg-green-500' : 
                  score >= 50 ? 'bg-yellow-500' : 
                  'bg-red-500'
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 
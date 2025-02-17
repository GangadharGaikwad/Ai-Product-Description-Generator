export const LoadingPlaceholder = () => (
  <div className="w-full max-w-3xl mx-auto p-6">
    <div className="animate-pulse space-y-6">
      <div className="h-8 bg-muted-foreground/20 rounded w-1/3"></div>
      <div className="space-y-4">
        <div className="h-10 bg-muted-foreground/20 rounded"></div>
        <div className="h-24 bg-muted-foreground/20 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-10 bg-muted-foreground/20 rounded"></div>
          <div className="h-10 bg-muted-foreground/20 rounded"></div>
          <div className="h-10 bg-muted-foreground/20 rounded"></div>
        </div>
        <div className="h-12 bg-muted-foreground/20 rounded"></div>
      </div>
    </div>
  </div>
); 
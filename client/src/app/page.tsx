import ProductDescriptionFormContainer from '@/components/ProductDescriptionFormContainer';

export default function Home() {
  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Title with gradient and glow effect */}
        <div className="text-center space-y-4 select-none">
          <h1 className="text-4xl sm:text-6xl font-bold relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary relative inline-block">
              AI Product Description
              <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-primary/30 via-accent/30 to-secondary/30 -z-10" />
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-primary to-accent relative inline-block mt-2">
              Generator
              <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-secondary/30 via-primary/30 to-accent/30 -z-10" />
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create compelling, SEO-optimized product descriptions in seconds using advanced AI
          </p>
        </div>

        {/* Main content */}
        <div className="relative">
          <ProductDescriptionFormContainer />
        </div>
      </div>
    </div>
  );
}

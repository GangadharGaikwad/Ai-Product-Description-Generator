import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { loadingScript } from './loading-script';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Product Description Generator",
  description: "Create compelling, SEO-optimized product descriptions with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: loadingScript }} />
      </head>
      <body suppressHydrationWarning className={inter.className}>
        <div className="fixed inset-0 overflow-hidden select-none">
          {/* Background patterns */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none select-none" />
          <div className="absolute inset-0 bg-dot-pattern opacity-[0.02] pointer-events-none select-none" />
          
          {/* Gradient blobs */}
          <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl opacity-20 animate-blob select-none" />
          <div className="absolute top-0 -right-4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000 select-none" />
          <div className="absolute -bottom-8 left-20 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000 select-none" />
          
          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-radial-gradient opacity-30 pointer-events-none select-none" />
        </div>

        {/* Main content wrapper */}
        <div className="relative min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
          {children}
        </div>
      </body>
    </html>
  );
}

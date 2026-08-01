import { ArrowRight, Layers, Zap, Shield } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 pt-32 pb-20 sm:px-6 lg:px-8 flex flex-col items-center text-center overflow-hidden">
        {/* Background gradient blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-8 animate-slide-up border border-border/50">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          Ready to build your next big idea
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          Build Faster with <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">SnapStack</span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-10 animate-slide-up" style={{ animationDelay: '200ms' }}>
          The ultimate foundation for modern web applications. Beautiful by default, responsive by design, and ready for your backend integration.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5">
            Start Designing
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-all border border-border">
            View Documentation
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/20 border-y border-border/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">A Solid Foundation</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to start building immediately without worrying about the setup.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Layers className="w-6 h-6 text-primary" />}
              title="Modern Tech Stack"
              description="Powered by Vite, React 19, and Tailwind CSS v4. The fastest way to build modern web apps."
              delay="0ms"
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-purple-500" />}
              title="Premium Design System"
              description="Beautiful components out of the box with glassmorphism, fluid animations, and a sleek dark mode."
              delay="100ms"
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6 text-emerald-500" />}
              title="Backend Ready"
              description="Structured perfectly to connect your APIs and backend logic whenever you are ready."
              delay="200ms"
            />
          </div>
        </div>
      </section>
    </div>
  );
}


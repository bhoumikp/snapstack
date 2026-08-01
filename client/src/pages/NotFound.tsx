import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="space-y-6 max-w-md animate-fade-in">
        <h1 className="text-9xl font-extrabold text-muted">404</h1>
        <h2 className="text-3xl font-bold tracking-tight">Page not found</h2>
        <p className="text-muted-foreground text-lg">
          Sorry, we couldn't find the page you're looking for. The link you followed may be broken, or the page may have been removed.
        </p>
        <div className="pt-6">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

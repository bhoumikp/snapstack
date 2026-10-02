import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow animate-fade-in">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

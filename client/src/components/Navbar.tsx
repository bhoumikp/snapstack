import { useState } from "react";
import { Link } from "react-router-dom";
import { Camera, Menu, X } from "lucide-react";
import { cn } from "../lib/cn";

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center gap-2 group transition-all">
                            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                <Camera className="w-5 h-5 text-primary" />
                            </div>
                            <span className="font-bold text-xl tracking-tight">SnapStack</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Home
                        </Link>
                        <Link to="/explore" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Explore
                        </Link>
                        <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            About
                        </Link>
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20">
                            Get Started
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-md text-muted-foreground hover:text-foreground focus:outline-none"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className={cn("md:hidden overflow-hidden transition-all duration-300 ease-in-out", isMobileMenuOpen ? "max-h-64 border-b border-border/50 bg-background/95 backdrop-blur-md" : "max-h-0")}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                        Home
                    </Link>
                    <Link to="/explore" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                        Explore
                    </Link>
                    <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                        About
                    </Link>
                </div>
                <div className="px-5 py-4 border-t border-border/50 flex flex-col gap-3">
                    <button className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
                        Get Started
                    </button>
                </div>
            </div>
        </header>
    )
}
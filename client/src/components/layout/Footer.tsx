import { Camera } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
    return(
        <footer className="border-t border-border/50 py-6 bg-card/30 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground font-medium text-sm">© 2026 SnapStack. All rights reserved.</span>
            </div>
            <div className="flex space-x-6">
                <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
                <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
            </div>
            </div>
      </footer>
    )
}
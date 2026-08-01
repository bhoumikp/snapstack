export default function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: string }) {
    return (
        <div
            className="p-6 rounded-2xl bg-card border border-border/50 hover:border-border transition-colors animate-slide-up group"
            style={{ animationDelay: delay }}
        >
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">
                {description}
            </p>
        </div>
    );
}

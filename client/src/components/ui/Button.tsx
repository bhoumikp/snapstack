import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'glow';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        'bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20',
    secondary:
        'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost:
        'bg-transparent text-text-secondary hover:bg-surface',
    danger:
        'bg-danger text-white hover:opacity-90',
    glow:
        'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5'
};

function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 font-medium transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
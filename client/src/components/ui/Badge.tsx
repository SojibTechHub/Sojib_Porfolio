import { cn } from '../../utils/helpers';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'accent' | 'success' | 'warning' | 'default';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className }) => {
  const variants = {
    accent: 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/20',
    success: 'bg-green-500/10 text-green-500 border-green-500/20',
    warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    default: 'bg-[var(--color-surface)] text-[var(--color-muted)] border-[var(--color-border)]',
  };
  return (
    <span className={cn('inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border', variants[variant], className)}>
      {children}
    </span>
  );
};

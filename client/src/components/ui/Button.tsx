import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children, variant = 'primary', size = 'md', loading, icon, className, disabled, ...props
}) => {
  const base = 'inline-flex items-center justify-center gap-2 rounded-xl font-medium focus-ring transition-all duration-200';
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg' };
  const variants = {
    primary: 'bg-[var(--color-accent)] text-white hover:opacity-90 shadow-lg shadow-[var(--color-accent)]/20',
    secondary: 'bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-border)]',
    ghost: 'text-[var(--color-text)] hover:bg-[var(--color-surface)]',
    outline: 'border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(base, sizes[size], variants[variant], loading && 'opacity-70', className)}
      disabled={loading || disabled}
      {...(props as any)}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
      ) : icon}
      {children}
    </motion.button>
  );
};

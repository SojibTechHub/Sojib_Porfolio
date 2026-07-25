import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className, glass, hover, onClick }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      className={cn(
        'rounded-2xl p-6 border border-[var(--color-border)]',
        glass ? 'glass' : 'bg-[var(--color-surface)]',
        hover && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

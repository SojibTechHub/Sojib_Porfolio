import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setLoading } from '../../store/uiSlice';

export const LoadingScreen = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((s: RootState) => s.ui.isLoading);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => dispatch(setLoading(false)), 300);
          return 100;
        }
        return p + Math.random() * 15;
      });
    }, 150);
    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--color-bg)]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-display font-bold gradient-text mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Sojib
          </motion.h1>
          <div className="w-48 h-1 bg-[var(--color-border)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[var(--color-accent)] rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="mt-4 text-sm text-[var(--color-muted)]">Loading...</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

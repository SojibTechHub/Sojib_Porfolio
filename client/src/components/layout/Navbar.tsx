import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { RootState } from '../../store/store';
import { setScrolled, toggleMobileMenu, setMobileMenu } from '../../store/uiSlice';
import { useTheme } from '../../hooks/useTheme';
import { NAV_LINKS } from '../../utils/constants';
import { Button } from '../ui/Button';
import { cn } from '../../utils/helpers';

export const Navbar = () => {
  const dispatch = useDispatch();
  const { isScrolled, showMobileMenu, activeSection } = useSelector((s: RootState) => s.ui);
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const current = window.scrollY;
      dispatch(setScrolled(current > 50));
      lastScroll = current;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);

  const scrollTo = useCallback((href: string) => {
    dispatch(setMobileMenu(false));
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [dispatch]);

  return (
    <motion.nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'glass shadow-lg' : 'bg-transparent'
      )}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button onClick={() => scrollTo('#hero')} className="text-xl md:text-2xl font-display font-bold gradient-text">
            Sojib <span className="text-[var(--color-muted)] hidden sm:inline">Ahmed</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={cn(
                  'text-sm font-medium transition-colors duration-200',
                  activeSection === link.href.replace('#', '')
                    ? 'text-[var(--color-accent)]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                )}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className="p-2 rounded-lg hover:bg-[var(--color-border)] transition-colors focus-ring"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Button size="sm" onClick={() => scrollTo('#contact')} className="hidden md:flex">
              Hire Me
            </Button>
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="p-2 rounded-lg hover:bg-[var(--color-border)] transition-colors md:hidden focus-ring"
              aria-label="Toggle menu"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            className="md:hidden glass border-t border-[var(--color-border)]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-4 py-6 space-y-4">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={cn(
                    'block w-full text-left py-2 text-lg font-medium transition-colors',
                    activeSection === link.href.replace('#', '')
                      ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)]'
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.label}
                </motion.button>
              ))}
              <Button className="w-full" onClick={() => scrollTo('#contact')}>Hire Me</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

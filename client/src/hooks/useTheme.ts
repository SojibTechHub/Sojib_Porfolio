import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { toggleTheme, setTheme } from '../store/uiSlice';

export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((s: RootState) => s.ui.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return {
    theme,
    isDark: theme === 'dark',
    toggle: () => dispatch(toggleTheme()),
    setTheme: (t: 'dark' | 'light') => dispatch(setTheme(t)),
  };
};

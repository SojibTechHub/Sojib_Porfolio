import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  theme: 'dark' | 'light';
  isScrolled: boolean;
  showMobileMenu: boolean;
  activeSection: string;
  isLoading: boolean;
}

const getInitialTheme = (): 'dark' | 'light' => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  return 'dark';
};

const initialState: UIState = {
  theme: getInitialTheme(),
  isScrolled: false,
  showMobileMenu: false,
  activeSection: 'hero',
  isLoading: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', state.theme);
    },
    setTheme(state, action: PayloadAction<'dark' | 'light'>) {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    setScrolled(state, action: PayloadAction<boolean>) {
      state.isScrolled = action.payload;
    },
    toggleMobileMenu(state) {
      state.showMobileMenu = !state.showMobileMenu;
    },
    setMobileMenu(state, action: PayloadAction<boolean>) {
      state.showMobileMenu = action.payload;
    },
    setActiveSection(state, action: PayloadAction<string>) {
      state.activeSection = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { toggleTheme, setTheme, setScrolled, toggleMobileMenu, setMobileMenu, setActiveSection, setLoading } = uiSlice.actions;
export default uiSlice.reducer;

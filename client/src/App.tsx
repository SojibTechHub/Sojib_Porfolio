import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import Lenis from 'lenis';
import 'react-toastify/dist/ReactToastify.css';

import { store } from './store/store';
import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';
import { ScrollToTop } from './components/common/ScrollToTop';
import { CustomCursor } from './components/common/CustomCursor';
import { LoadingScreen } from './components/common/LoadingScreen';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { BlogPost } from './pages/BlogPost';
import { NotFound } from './pages/NotFound';
import { AdminLogin } from './pages/AdminLogin';
import { AdminLayout } from './pages/Admin';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminProjects } from './pages/AdminProjects';
import { AdminSkills } from './pages/AdminSkills';
import { AdminExperience } from './pages/AdminExperience';
import { AdminBlog } from './pages/AdminBlog';
import { AdminMessages } from './pages/AdminMessages';
import { AdminTestimonials } from './pages/AdminTestimonials';
import { AdminSettings } from './pages/AdminSettings';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 300000, retry: 1, refetchOnWindowFocus: false },
  },
});

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

const AppContent = () => {
  useTheme();
  useScrollSpy();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, duration: 1.2 });
    lenisRef.current = lenis;
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="blog/:slug" element={<BlogPost />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="experience" element={<AdminExperience />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        theme="dark"
        toastClassName="!bg-[var(--color-surface)] !border !border-[var(--color-border)] !text-[var(--color-text)]"
        bodyClassName="!text-sm"
        autoClose={4000}
        hideProgressBar
        closeOnClick
      />
    </>
  );
};

const PublicLayout = () => (
  <>
    <Navbar />
    <AnimatePresence mode="wait">
      <Routes>
        <Route index element={<Home />} />
        <Route path="blog/:slug" element={<BlogPost />} />
      </Routes>
    </AnimatePresence>
    <Footer />
  </>
);

const App = () => (
  <HelmetProvider>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </HelmetProvider>
);

export default App;

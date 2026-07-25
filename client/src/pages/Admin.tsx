import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, FolderOpen, Layers, Briefcase, MessageSquare, FileText, Settings, LogOut, Menu, X, ChevronLeft, MessageCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { cn } from '../utils/helpers';

const sidebarLinks = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { label: 'Skills', href: '/admin/skills', icon: Layers },
  { label: 'Experience', href: '/admin/experience', icon: Briefcase },
  { label: 'Blog', href: '/admin/blog', icon: FileText },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageCircle },
  { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const logout = () => {
    localStorage.removeItem('adminToken');
    toast.success('Logged out');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex">
      <aside className={cn(
        'fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[var(--color-surface)] border-r border-[var(--color-border)] transition-transform duration-300',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-16'
      )}>
        <div className="p-4 flex items-center justify-between border-b border-[var(--color-border)]">
          {sidebarOpen && <span className="text-lg font-display font-bold gradient-text">Admin</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-[var(--color-border)]">
            {sidebarOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
          </button>
        </div>
        <nav className="p-3 space-y-1">
          {sidebarLinks.map((link) => {
            const active = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                  active
                    ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface2)]'
                )}
              >
                <link.icon size={18} />
                {sidebarOpen && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-4 left-3 right-3">
          <button onClick={logout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 w-full transition-all">
            <LogOut size={18} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {!sidebarOpen && (
        <button onClick={() => setSidebarOpen(true)} className="fixed lg:hidden bottom-4 left-4 z-50 p-3 rounded-full bg-[var(--color-accent)] text-white shadow-lg">
          <Menu size={20} />
        </button>
      )}

      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

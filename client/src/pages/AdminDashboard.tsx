import { useQuery } from '@tanstack/react-query';
import { FolderOpen, MessageSquare, FileText, Layers, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAdminStats } from '../api/adminApi';
import { Card } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import { SEO } from '../components/common/SEO';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({ queryKey: ['adminStats'], queryFn: getAdminStats });
  const stats = data?.data;

  const statCards = [
    { label: 'Projects', value: stats?.totalProjects, icon: FolderOpen, color: 'from-blue-500 to-blue-600', href: '/admin/projects' },
    { label: 'Unread Messages', value: stats?.unreadMessages, icon: MessageSquare, color: 'from-green-500 to-green-600', href: '/admin/messages' },
    { label: 'Blog Posts', value: stats?.totalBlogPosts, icon: FileText, color: 'from-purple-500 to-purple-600', href: '/admin/blog' },
    { label: 'Skills', value: stats?.totalSkills, icon: Layers, color: 'from-orange-500 to-orange-600', href: '/admin/skills' },
  ];

  return (
    <>
      <SEO title="Admin Dashboard" />
      <div>
        <h1 className="text-2xl font-display font-bold mb-8">Dashboard</h1>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Skeleton className="h-32" count={4} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((card) => (
              <Card key={card.label} hover onClick={() => navigate(card.href)} className="relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--color-muted)] mb-1">{card.label}</p>
                    <p className="text-3xl font-display font-bold">{card.value ?? 0}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} opacity-20`}>
                    <card.icon size={28} className="text-white" />
                  </div>
                </div>
                <ArrowRight size={16} className="absolute bottom-4 right-4 text-[var(--color-muted)]" />
              </Card>
            ))}
          </div>
        )}

        <Card>
          <h2 className="text-lg font-display font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'New Project', href: '/admin/projects' },
              { label: 'New Blog Post', href: '/admin/blog' },
              { label: 'View Messages', href: '/admin/messages' },
              { label: 'Edit Profile', href: '/admin/settings' },
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.href)}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-sm font-medium transition-all text-left"
              >
                {action.label}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};

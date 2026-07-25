import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { getAdminProjects, createAdminProject, updateAdminProject, deleteAdminProject } from '../api/adminApi';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Skeleton } from '../components/ui/Skeleton';
import { SEO } from '../components/common/SEO';
import { Project } from '../types';

const emptyProject = {
  title: '', description: '', longDescription: '', techStack: [],
  thumbnail: '', images: [], liveUrl: '', githubUrl: '',
  category: 'fullstack', featured: false, visible: true, order: 0,
};

export const AdminProjects = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<any>(emptyProject);

  const { data, isLoading } = useQuery({ queryKey: ['adminProjects'], queryFn: getAdminProjects });
  const projects: Project[] = data?.data || [];

  const createMutation = useMutation({
    mutationFn: createAdminProject,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['adminProjects'] }); toast.success('Project created'); setShowModal(false); setForm(emptyProject); },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Failed to create'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateAdminProject(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['adminProjects'] }); toast.success('Project updated'); setShowModal(false); setEditing(null); setForm(emptyProject); },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Failed to update'),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAdminProject,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['adminProjects'] }); toast.success('Project deleted'); },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Failed to delete'),
  });

  const openEdit = (project: Project) => {
    setEditing(project);
    setForm(project);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      updateMutation.mutate({ id: editing._id, data: form });
    } else {
      createMutation.mutate(form);
    }
  };

  return (
    <>
      <SEO title="Manage Projects" />
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-display font-bold">Projects</h1>
          <Button onClick={() => { setEditing(null); setForm(emptyProject); setShowModal(true); }} icon={<Plus size={16} />}>
            Add Project
          </Button>
        </div>

        {isLoading ? (
          <Skeleton className="h-16" count={5} />
        ) : projects.length === 0 ? (
          <Card><p className="text-[var(--color-muted)] text-center py-8">No projects yet. Create your first project!</p></Card>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => (
              <Card key={project._id} className="flex items-center gap-4 py-4">
                <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-[var(--color-accent)]/20 to-purple-500/20 flex items-center justify-center text-sm font-bold shrink-0">
                  {project.title[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{project.title}</p>
                  <p className="text-xs text-[var(--color-muted)]">{project.category} · {project.techStack.length} technologies</p>
                </div>
                <div className="flex items-center gap-2">
                  {project.featured && <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">Featured</span>}
                  {project.visible ? <Eye size={14} className="text-[var(--color-muted)]" /> : <EyeOff size={14} className="text-[var(--color-muted)]" />}
                  <button onClick={() => openEdit(project)} className="p-2 rounded-lg hover:bg-[var(--color-border)]"><Edit2 size={14} /></button>
                  <button onClick={() => { if (confirm('Delete this project?')) deleteMutation.mutate(project._id); }} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500"><Trash2 size={14} /></button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => { setShowModal(false); setEditing(null); }} title={editing ? 'Edit Project' : 'Add Project'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <textarea className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" placeholder="Short description" rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
          <textarea className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" placeholder="Long description" rows={3} value={form.longDescription} onChange={e => setForm({ ...form, longDescription: e.target.value })} />
          <input className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" placeholder="Thumbnail URL" value={form.thumbnail} onChange={e => setForm({ ...form, thumbnail: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <input className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" placeholder="Live URL" value={form.liveUrl} onChange={e => setForm({ ...form, liveUrl: e.target.value })} />
            <input className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" placeholder="GitHub URL" value={form.githubUrl} onChange={e => setForm({ ...form, githubUrl: e.target.value })} />
          </div>
          <select className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            <option value="fullstack">Fullstack</option>
            <option value="frontend">Frontend</option>
            <option value="api">API</option>
            <option value="opensource">Open Source</option>
            <option value="mobile">Mobile</option>
          </select>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.visible} onChange={e => setForm({ ...form, visible: e.target.checked })} /> Visible</label>
          </div>
          <Button type="submit" loading={createMutation.isPending || updateMutation.isPending} className="w-full">
            {editing ? 'Update Project' : 'Create Project'}
          </Button>
        </form>
      </Modal>
    </>
  );
};

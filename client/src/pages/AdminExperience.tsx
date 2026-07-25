import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, Briefcase, GraduationCap } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../api/axiosInstance';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Skeleton } from '../components/ui/Skeleton';
import { SEO } from '../components/common/SEO';
import { Experience } from '../types';

const emptyExp = { type: 'work', title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '' };

export const AdminExperience = () => {
  const qc = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [form, setForm] = useState<any>(emptyExp);

  const { data, isLoading } = useQuery({ queryKey: ['adminExperience'], queryFn: () => api.get('/experience').then(r => r.data) });
  const allExp: Experience[] = data?.data?.experience || [];

  const create = useMutation({ mutationFn: (d: any) => api.post('/admin/experience', d), onSuccess: () => { qc.invalidateQueries({ queryKey: ['adminExperience'] }); toast.success('Created'); setShowModal(false); }, onError: (e: any) => toast.error(e.response?.data?.message) });
  const update = useMutation({ mutationFn: ({ id, data }: any) => api.put(`/admin/experience/${id}`, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ['adminExperience'] }); toast.success('Updated'); setShowModal(false); setEditing(null); }, onError: (e: any) => toast.error(e.response?.data?.message) });
  const remove = useMutation({ mutationFn: (id: string) => api.delete(`/admin/experience/${id}`), onSuccess: () => { qc.invalidateQueries({ queryKey: ['adminExperience'] }); toast.success('Deleted'); }, onError: (e: any) => toast.error(e.response?.data?.message) });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) update.mutate({ id: editing._id, data: form });
    else create.mutate(form);
  };

  return (
    <>
      <SEO title="Experience" />
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-display font-bold">Experience & Education</h1>
          <Button onClick={() => { setEditing(null); setForm(emptyExp); setShowModal(true); }} icon={<Plus size={16} />}>Add Entry</Button>
        </div>
        {isLoading ? <Skeleton className="h-16" count={4} /> : allExp.length === 0 ? (
          <Card><p className="text-[var(--color-muted)] text-center py-8">No entries yet.</p></Card>
        ) : (
          <div className="space-y-3">
            {allExp.map((exp) => (
              <Card key={exp._id} className="flex items-center gap-4 py-4">
                {exp.type === 'work' ? <Briefcase size={20} className="text-[var(--color-accent)]" /> : <GraduationCap size={20} className="text-green-500" />}
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{exp.title}</p>
                  <p className="text-xs text-[var(--color-muted)]">{exp.company} · {exp.startDate} — {exp.current ? 'Present' : exp.endDate}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditing(exp); setForm(exp); setShowModal(true); }} className="p-2 rounded-lg hover:bg-[var(--color-border)]"><Edit2 size={14} /></button>
                  <button onClick={() => { if (confirm('Delete?')) remove.mutate(exp._id); }} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500"><Trash2 size={14} /></button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => { setShowModal(false); setEditing(null); }} title={editing ? 'Edit Entry' : 'Add Entry'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
            <option value="work">Work</option>
            <option value="education">Education</option>
          </select>
          <input className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" placeholder="Title / Degree" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <input className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" placeholder="Company / School" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
          <input className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <input className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" placeholder="Start date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} required />
            <input className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" placeholder="End date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} disabled={form.current} />
          </div>
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.current} onChange={e => setForm({ ...form, current: e.target.checked })} /> Currently here</label>
          <textarea className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" placeholder="Description" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <Button type="submit" loading={create.isPending || update.isPending} className="w-full">{editing ? 'Update' : 'Create'}</Button>
        </form>
      </Modal>
    </>
  );
};

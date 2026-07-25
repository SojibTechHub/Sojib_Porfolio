import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';
import { toast } from 'react-toastify';
import { getAdminTestimonials, createAdminTestimonial, updateAdminTestimonial, deleteAdminTestimonial } from '../api/adminApi';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Skeleton } from '../components/ui/Skeleton';
import { SEO } from '../components/common/SEO';
import { Testimonial } from '../types';

const emptyTestimonial = { name: '', role: '', company: '', avatar: '', rating: 5, review: '', visible: true, order: 0 };

export const AdminTestimonials = () => {
  const qc = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<any>(emptyTestimonial);

  const { data, isLoading } = useQuery({ queryKey: ['adminTestimonials'], queryFn: getAdminTestimonials });
  const testimonials: Testimonial[] = data?.data || [];

  const create = useMutation({ mutationFn: createAdminTestimonial, onSuccess: () => { qc.invalidateQueries({ queryKey: ['adminTestimonials'] }); toast.success('Testimonial created'); setShowModal(false); }, onError: (e: any) => toast.error(e.response?.data?.message) });
  const update = useMutation({ mutationFn: ({ id, data }: any) => updateAdminTestimonial(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ['adminTestimonials'] }); toast.success('Updated'); setShowModal(false); setEditing(null); }, onError: (e: any) => toast.error(e.response?.data?.message) });
  const remove = useMutation({ mutationFn: deleteAdminTestimonial, onSuccess: () => { qc.invalidateQueries({ queryKey: ['adminTestimonials'] }); toast.success('Deleted'); }, onError: (e: any) => toast.error(e.response?.data?.message) });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) update.mutate({ id: editing._id, data: form });
    else create.mutate(form);
  };

  return (
    <>
      <SEO title="Testimonials" />
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-display font-bold">Testimonials</h1>
          <Button onClick={() => { setEditing(null); setForm(emptyTestimonial); setShowModal(true); }} icon={<Plus size={16} />}>Add Testimonial</Button>
        </div>
        {isLoading ? <Skeleton className="h-16" count={3} /> : testimonials.length === 0 ? (
          <Card><p className="text-[var(--color-muted)] text-center py-8">No testimonials yet.</p></Card>
        ) : (
          <div className="space-y-3">
            {testimonials.map((t) => (
              <Card key={t._id} className="flex items-center gap-4 py-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-purple-500 flex items-center justify-center text-sm font-bold text-white shrink-0">
                  {t.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{t.name}</p>
                  <p className="text-xs text-[var(--color-muted)]">{t.role}{t.company ? ` at ${t.company}` : ''}</p>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} className={i < t.rating ? 'text-yellow-500 fill-yellow-500' : 'text-[var(--color-border)]'} />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditing(t); setForm(t); setShowModal(true); }} className="p-2 rounded-lg hover:bg-[var(--color-border)]"><Edit2 size={14} /></button>
                  <button onClick={() => { if (confirm('Delete?')) remove.mutate(t._id); }} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500"><Trash2 size={14} /></button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => { setShowModal(false); setEditing(null); }} title={editing ? 'Edit Testimonial' : 'Add Testimonial'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <input className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" placeholder="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
          </div>
          <input className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" placeholder="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
          <textarea className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" placeholder="Review text" rows={3} value={form.review} onChange={e => setForm({ ...form, review: e.target.value })} required />
          <div>
            <label className="text-sm text-[var(--color-muted)] block mb-1">Rating (1-5)</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((r) => (
                <button key={r} type="button" onClick={() => setForm({ ...form, rating: r })} className={`p-2 rounded-lg ${form.rating >= r ? 'text-yellow-500' : 'text-[var(--color-muted)]'}`}>
                  <Star size={20} className={form.rating >= r ? 'fill-yellow-500' : ''} />
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.visible} onChange={e => setForm({ ...form, visible: e.target.checked })} /> Visible</label>
          <Button type="submit" loading={create.isPending || update.isPending} className="w-full">{editing ? 'Update' : 'Create'}</Button>
        </form>
      </Modal>
    </>
  );
};

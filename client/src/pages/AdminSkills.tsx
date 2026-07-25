import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { getAdminSkills, createAdminSkill, updateAdminSkill, deleteAdminSkill } from '../api/adminApi';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Skeleton } from '../components/ui/Skeleton';
import { SEO } from '../components/common/SEO';
import { Skill } from '../types';

const emptySkill = { name: '', iconName: '', category: 'frontend', proficiency: 80, yearsExp: 1, order: 0 };

export const AdminSkills = () => {
  const qc = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [form, setForm] = useState<any>(emptySkill);

  const { data, isLoading } = useQuery({ queryKey: ['adminSkills'], queryFn: getAdminSkills });
  const skills: Skill[] = data?.data || [];

  const create = useMutation({ mutationFn: createAdminSkill, onSuccess: () => { qc.invalidateQueries({ queryKey: ['adminSkills'] }); toast.success('Skill created'); setShowModal(false); }, onError: (e: any) => toast.error(e.response?.data?.message) });
  const update = useMutation({ mutationFn: ({ id, data }: any) => updateAdminSkill(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ['adminSkills'] }); toast.success('Skill updated'); setShowModal(false); setEditing(null); }, onError: (e: any) => toast.error(e.response?.data?.message) });
  const remove = useMutation({ mutationFn: deleteAdminSkill, onSuccess: () => { qc.invalidateQueries({ queryKey: ['adminSkills'] }); toast.success('Skill deleted'); }, onError: (e: any) => toast.error(e.response?.data?.message) });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) update.mutate({ id: editing._id, data: form });
    else create.mutate(form);
  };

  return (
    <>
      <SEO title="Manage Skills" />
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-display font-bold">Skills</h1>
          <Button onClick={() => { setEditing(null); setForm(emptySkill); setShowModal(true); }} icon={<Plus size={16} />}>Add Skill</Button>
        </div>
        {isLoading ? <Skeleton className="h-16" count={6} /> : skills.length === 0 ? (
          <Card><p className="text-[var(--color-muted)] text-center py-8">No skills yet.</p></Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {skills.map((skill) => (
              <Card key={skill._id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">{skill.name}</p>
                  <p className="text-xs text-[var(--color-muted)]">{skill.category} · {skill.proficiency}% · {skill.yearsExp}yr</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditing(skill); setForm(skill); setShowModal(true); }} className="p-2 rounded-lg hover:bg-[var(--color-border)]"><Edit2 size={14} /></button>
                  <button onClick={() => { if (confirm('Delete?')) remove.mutate(skill._id); }} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500"><Trash2 size={14} /></button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => { setShowModal(false); setEditing(null); }} title={editing ? 'Edit Skill' : 'Add Skill'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" placeholder="Skill name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <input className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" placeholder="Icon name" value={form.iconName} onChange={e => setForm({ ...form, iconName: e.target.value })} />
          <select className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">Database</option>
            <option value="devops">DevOps</option>
            <option value="tools">Tools</option>
          </select>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm text-[var(--color-muted)]">Proficiency (%)</label><input type="number" className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" value={form.proficiency} onChange={e => setForm({ ...form, proficiency: +e.target.value })} min={0} max={100} /></div>
            <div><label className="text-sm text-[var(--color-muted)]">Years Exp</label><input type="number" className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" value={form.yearsExp} onChange={e => setForm({ ...form, yearsExp: +e.target.value })} min={0} /></div>
          </div>
          <Button type="submit" loading={create.isPending || update.isPending} className="w-full">{editing ? 'Update' : 'Create'}</Button>
        </form>
      </Modal>
    </>
  );
};

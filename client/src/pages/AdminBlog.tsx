import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, FileText } from 'lucide-react';
import { toast } from 'react-toastify';
import { getAdminBlogs, createAdminBlog, updateAdminBlog, deleteAdminBlog } from '../api/adminApi';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Skeleton } from '../components/ui/Skeleton';
import { SEO } from '../components/common/SEO';
import { Blog } from '../types';

const emptyBlog = { title: '', content: '', excerpt: '', coverImage: '', category: 'general', tags: [], published: false };

export const AdminBlog = () => {
  const qc = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [form, setForm] = useState<any>(emptyBlog);
  const [tagInput, setTagInput] = useState('');

  const { data, isLoading } = useQuery({ queryKey: ['adminBlogs'], queryFn: getAdminBlogs });
  const blogs: Blog[] = data?.data || [];

  const create = useMutation({ mutationFn: createAdminBlog, onSuccess: () => { qc.invalidateQueries({ queryKey: ['adminBlogs'] }); toast.success('Blog created'); setShowModal(false); setForm(emptyBlog); }, onError: (e: any) => toast.error(e.response?.data?.message) });
  const update = useMutation({ mutationFn: ({ id, data }: any) => updateAdminBlog(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ['adminBlogs'] }); toast.success('Blog updated'); setShowModal(false); setEditing(null); setForm(emptyBlog); }, onError: (e: any) => toast.error(e.response?.data?.message) });
  const remove = useMutation({ mutationFn: deleteAdminBlog, onSuccess: () => { qc.invalidateQueries({ queryKey: ['adminBlogs'] }); toast.success('Blog deleted'); }, onError: (e: any) => toast.error(e.response?.data?.message) });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) update.mutate({ id: editing._id, data: form });
    else create.mutate(form);
  };

  const addTag = () => {
    if (tagInput && !form.tags.includes(tagInput)) {
      setForm({ ...form, tags: [...form.tags, tagInput] });
      setTagInput('');
    }
  };

  return (
    <>
      <SEO title="Manage Blog" />
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-display font-bold">Blog Posts</h1>
          <Button onClick={() => { setEditing(null); setForm(emptyBlog); setShowModal(true); }} icon={<Plus size={16} />}>New Post</Button>
        </div>
        {isLoading ? <Skeleton className="h-16" count={4} /> : blogs.length === 0 ? (
          <Card><p className="text-[var(--color-muted)] text-center py-8">No blog posts yet.</p></Card>
        ) : (
          <div className="space-y-3">
            {blogs.map((blog) => (
              <Card key={blog._id} className="flex items-center gap-4 py-4">
                <FileText size={20} className="text-[var(--color-accent)] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{blog.title}</p>
                  <p className="text-xs text-[var(--color-muted)]">{blog.category} · {blog.published ? 'Published' : 'Draft'} · {new Date(blog.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditing(blog); setForm(blog); setShowModal(true); }} className="p-2 rounded-lg hover:bg-[var(--color-border)]"><Edit2 size={14} /></button>
                  <button onClick={() => { if (confirm('Delete?')) remove.mutate(blog._id); }} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500"><Trash2 size={14} /></button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => { setShowModal(false); setEditing(null); }} title={editing ? 'Edit Post' : 'New Post'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <textarea className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" placeholder="Content (HTML)" rows={8} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
          <input className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" placeholder="Excerpt" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} />
          <input className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" placeholder="Cover image URL" value={form.coverImage} onChange={e => setForm({ ...form, coverImage: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <input className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
            <div className="flex gap-2">
              <input className="flex-1 px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]" placeholder="Add tag" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} />
              <button type="button" onClick={addTag} className="px-3 py-2 rounded-xl bg-[var(--color-accent)] text-white text-sm">Add</button>
            </div>
          </div>
          {form.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {form.tags.map((t: string) => (
                <span key={t} className="px-2 py-1 text-xs rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center gap-1">
                  {t}
                  <button type="button" onClick={() => setForm({ ...form, tags: form.tags.filter((x: string) => x !== t) })} className="hover:text-red-500">&times;</button>
                </span>
              ))}
            </div>
          )}
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} /> Published</label>
          <Button type="submit" loading={create.isPending || update.isPending} className="w-full">{editing ? 'Update' : 'Create'}</Button>
        </form>
      </Modal>
    </>
  );
};

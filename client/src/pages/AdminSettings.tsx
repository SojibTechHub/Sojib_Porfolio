import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getAdminProfile, updateAdminProfile, changePassword } from '../api/adminApi';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { TextArea } from '../components/ui/Input';
import { Skeleton } from '../components/ui/Skeleton';
import { SEO } from '../components/common/SEO';

export const AdminSettings = () => {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['adminProfile'], queryFn: getAdminProfile });
  const profile = data?.data;

  const [form, setForm] = useState({
    name: '', role: '', bio: '', location: '', email: '', phone: '', birthDate: '',
    github: '', linkedin: '', twitter: '', discord: '', fiverr: '', availability: true,
  });
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '' });

  useEffect(() => {
    if (profile) setForm({ ...form, ...profile });
  }, [profile]);

  const updateMutation = useMutation({
    mutationFn: updateAdminProfile,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['adminProfile'] }); toast.success('Profile updated'); },
    onError: (e: any) => toast.error(e.response?.data?.message),
  });

  const pwMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => { toast.success('Password changed'); setPwForm({ currentPassword: '', newPassword: '' }); },
    onError: (e: any) => toast.error(e.response?.data?.message),
  });

  if (isLoading) return <Skeleton className="h-96" />;

  return (
    <>
      <SEO title="Settings" />
      <div>
        <h1 className="text-2xl font-display font-bold mb-6">Settings</h1>

        <div className="space-y-6 max-w-2xl">
          <Card>
            <h2 className="text-lg font-display font-bold mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <Input label="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
              </div>
              <TextArea label="Bio" rows={3} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
                <Input label="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              <Input label="Birth Date" value={form.birthDate} onChange={e => setForm({ ...form, birthDate: e.target.value })} />
              </div>
              <Input label="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <label className="flex items-center gap-2"><input type="checkbox" checked={form.availability} onChange={e => setForm({ ...form, availability: e.target.checked })} /> Available for work</label>
              <Button onClick={() => updateMutation.mutate(form)} loading={updateMutation.isPending}>Save Changes</Button>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-display font-bold mb-4">Social Links</h2>
            <div className="space-y-4">
              {(['github', 'linkedin', 'twitter', 'discord', 'fiverr'] as const).map((s) => (
                <Input key={s} label={s.charAt(0).toUpperCase() + s.slice(1)} value={form[s]} onChange={e => setForm({ ...form, [s]: e.target.value })} />
              ))}
              <Button onClick={() => updateMutation.mutate(form)} loading={updateMutation.isPending}>Save Social Links</Button>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-display font-bold mb-4">Change Password</h2>
            <div className="space-y-4">
              <Input label="Current Password" type="password" value={pwForm.currentPassword} onChange={e => setPwForm({ ...pwForm, currentPassword: e.target.value })} />
              <Input label="New Password" type="password" value={pwForm.newPassword} onChange={e => setPwForm({ ...pwForm, newPassword: e.target.value })} />
              <Button onClick={() => pwMutation.mutate(pwForm)} loading={pwMutation.isPending}>Change Password</Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

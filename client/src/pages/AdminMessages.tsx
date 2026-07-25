import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Mail, MailOpen, Trash2, ChevronDown } from 'lucide-react';
import { toast } from 'react-toastify';
import { getAdminMessages, markMessageRead, deleteAdminMessage } from '../api/adminApi';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Skeleton } from '../components/ui/Skeleton';
import { SEO } from '../components/common/SEO';
import { Message } from '../types';
import { formatDate } from '../utils/helpers';

export const AdminMessages = () => {
  const qc = useQueryClient();
  const [selected, setSelected] = useState<Message | null>(null);

  const { data, isLoading } = useQuery({ queryKey: ['adminMessages'], queryFn: getAdminMessages });
  const messages: Message[] = data?.data || [];

  const markRead = useMutation({
    mutationFn: markMessageRead,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['adminMessages'] }),
  });

  const remove = useMutation({
    mutationFn: deleteAdminMessage,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['adminMessages'] }); toast.success('Message deleted'); },
    onError: (e: any) => toast.error(e.response?.data?.message),
  });

  const openMessage = (msg: Message) => {
    setSelected(msg);
    if (!msg.read) markRead.mutate(msg._id);
  };

  return (
    <>
      <SEO title="Messages" />
      <div>
        <h1 className="text-2xl font-display font-bold mb-6">Messages</h1>
        {isLoading ? <Skeleton className="h-16" count={5} /> : messages.length === 0 ? (
          <Card><p className="text-[var(--color-muted)] text-center py-8">No messages yet.</p></Card>
        ) : (
          <div className="space-y-2">
            {messages.map((msg) => (
              <Card key={msg._id} hover className="flex items-center gap-4 py-3" onClick={() => openMessage(msg)}>
                {msg.read ? <MailOpen size={18} className="text-[var(--color-muted)] shrink-0" /> : <Mail size={18} className="text-[var(--color-accent)] shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium text-sm ${!msg.read ? 'text-[var(--color-text)]' : 'text-[var(--color-muted)]'}`}>{msg.name}</span>
                    <span className="text-xs text-[var(--color-muted)]">{msg.subject}</span>
                  </div>
                  <p className="text-xs text-[var(--color-muted)] truncate">{msg.message}</p>
                </div>
                <span className="text-xs text-[var(--color-muted)] shrink-0">{formatDate(msg.createdAt)}</span>
                <button onClick={(e) => { e.stopPropagation(); if (confirm('Delete?')) remove.mutate(msg._id); }} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500"><Trash2 size={14} /></button>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected ? `Message from ${selected.name}` : ''}>
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-[var(--color-muted)]">Name:</span> <span className="font-medium">{selected.name}</span></div>
              <div><span className="text-[var(--color-muted)]">Email:</span> <span className="font-medium">{selected.email}</span></div>
              <div><span className="text-[var(--color-muted)]">Subject:</span> <span className="font-medium">{selected.subject}</span></div>
              <div><span className="text-[var(--color-muted)]">Budget:</span> <span className="font-medium">{selected.budget || 'Not specified'}</span></div>
            </div>
            <div><span className="text-[var(--color-muted)] text-sm">Date:</span> <span className="text-sm">{formatDate(selected.createdAt)}</span></div>
            <div className="pt-4 border-t border-[var(--color-border)]">
              <p className="text-sm whitespace-pre-wrap">{selected.message}</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

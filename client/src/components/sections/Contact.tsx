import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, MapPin, Clock, Send, Phone, Github, Linkedin, MessageCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { submitContact } from '../../api/contactApi';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Button } from '../ui/Button';
import { Input, TextArea } from '../ui/Input';
import { Card } from '../ui/Card';
import { contactSchema, ContactFormData } from '../../utils/validators';
import { BUDGET_OPTIONS, SOCIAL_LINKS } from '../../utils/constants';

const Confetti = () => (
  <div className="fixed inset-0 pointer-events-none z-50">
    {Array.from({ length: 30 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full"
        style={{
          background: ['#818CF8', '#A78BFA', '#22C55E', '#F59E0B', '#EF4444'][i % 5],
          left: `${Math.random() * 100}%`,
          top: -10,
        }}
        initial={{ y: -10, x: 0, rotate: 0, opacity: 1 }}
        animate={{
          y: typeof window !== 'undefined' ? window.innerHeight + 10 : 1000,
          x: Math.random() * 200 - 100,
          rotate: Math.random() * 720,
          opacity: 0,
        }}
        transition={{ duration: 1.5 + Math.random(), delay: Math.random() * 0.5, ease: 'easeIn' }}
      />
    ))}
  </div>
);

export const Contact = () => {
  const [budget, setBudget] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const { ref, isVisible, variants } = useScrollAnimation('up');

  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: () => {
      toast.success('Message sent successfully! I will get back to you soon.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      reset();
      setBudget('');
    },
    onError: () => toast.error('Failed to send message. Please try again later.'),
  });

  const onSubmit = useCallback((data: ContactFormData) => {
    mutation.mutate({ ...data, budget });
  }, [mutation, budget]);

  return (
    <section id="contact" className="section-padding relative">
      {showConfetti && <Confetti />}
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Get In <span className="gradient-text">Touch</span>
        </h2>
        <p className="text-[var(--color-muted)] mb-8 max-w-2xl">
          Have a project in mind? Let us build something great together.
        </p>

        <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
          <div className="md:col-span-2 space-y-6">
            <Card glass className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[var(--color-accent)]/10 shrink-0">
                  <Mail size={20} className="text-[var(--color-accent)]" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Email</h4>
                  <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-sm text-[var(--color-accent)] hover:underline">{SOCIAL_LINKS.email}</a>
                  <p className="text-xs text-[var(--color-muted)] mt-0.5">Reply within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[var(--color-accent)]/10 shrink-0">
                  <Phone size={20} className="text-[var(--color-accent)]" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Phone / WhatsApp</h4>
                  <a href={`tel:${SOCIAL_LINKS.phone}`} className="text-sm text-[var(--color-accent)] hover:underline">{SOCIAL_LINKS.phone}</a>
                  <p className="text-xs text-[var(--color-muted)] mt-0.5">Available on calls & WhatsApp</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[var(--color-accent)]/10 shrink-0">
                  <MapPin size={20} className="text-[var(--color-accent)]" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Location</h4>
                  <p className="text-sm text-[var(--color-muted)]">Rangpur, Bangladesh</p>
                  <p className="text-xs text-[var(--color-muted)] mt-0.5">Available for remote work worldwide</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[var(--color-accent)]/10 shrink-0">
                  <Clock size={20} className="text-[var(--color-accent)]" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Availability</h4>
                  <p className="text-sm text-green-500 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-slow" />
                    Available for work
                  </p>
                </div>
              </div>
            </Card>

            <Card glass>
              <h4 className="font-semibold text-sm mb-3">Connect with me</h4>
              <div className="flex flex-wrap gap-3">
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all">
                  <Github size={18} />
                </a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all">
                  <Linkedin size={18} />
                </a>
                <a href={`mailto:${SOCIAL_LINKS.email}`} className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all">
                  <Mail size={18} />
                </a>
              </div>
            </Card>
          </div>

          <div className="md:col-span-3">
            <Card glass>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Name" placeholder="Your name" error={errors.name?.message} {...register('name')} />
                  <Input label="Email" type="email" placeholder="your@email.com" error={errors.email?.message} {...register('email')} />
                </div>
                <Input label="Subject" placeholder="What is this about?" error={errors.subject?.message} {...register('subject')} />
                <TextArea label="Message" rows={5} placeholder="Tell me about your project..." error={errors.message?.message} {...register('message')} />

                <div>
                  <label className="block text-sm font-medium text-[var(--color-muted)] mb-2">Budget Range</label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGET_OPTIONS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBudget(b === budget ? '' : b)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                          budget === b
                            ? 'bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/20'
                            : 'bg-[var(--color-surface)] text-[var(--color-muted)] border border-[var(--color-border)] hover:border-[var(--color-accent)]'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <Button type="submit" loading={mutation.isPending} icon={<Send size={16} />} className="w-full">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

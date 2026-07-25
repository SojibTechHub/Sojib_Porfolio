import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { getBlogBySlug } from '../api/blogApi';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { SEO } from '../components/common/SEO';
import { formatDate } from '../utils/helpers';

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => getBlogBySlug(slug!),
    enabled: !!slug,
  });

  const blog = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 px-4 max-w-3xl mx-auto">
        <Skeleton className="h-8 w-32 mb-8" />
        <Skeleton className="h-64 mb-8" />
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-1/2 mb-8" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold mb-4">Post not found</h2>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  const shareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  return (
    <>
      <SEO title={blog.title} description={blog.excerpt} image={blog.coverImage} />
      <div className="min-h-screen pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] mb-8 transition-colors">
              <ArrowLeft size={16} /> Back to Home
            </button>

            <div className="aspect-video rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/20 to-purple-500/20 mb-8 overflow-hidden">
              {blog.coverImage ? (
                <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-8xl font-display font-bold text-[var(--color-accent)]/20">{blog.title[0]}</span>
                </div>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{blog.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-muted)] mb-8">
              <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(blog.createdAt)}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {blog.readTime} min read</span>
              <span className="px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs">{blog.category}</span>
              <button onClick={shareLink} className="flex items-center gap-1 hover:text-[var(--color-accent)] transition-colors ml-auto">
                <Share2 size={14} /> Share
              </button>
            </div>

            <div
              className="prose prose-invert max-w-none text-[var(--color-text)] leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-[var(--color-border)]">
              {blog.tags?.map((tag: string) => (
                <span key={tag} className="px-3 py-1 text-xs rounded-full bg-[var(--color-surface)] text-[var(--color-muted)] border border-[var(--color-border)]">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        </article>
      </div>
    </>
  );
};

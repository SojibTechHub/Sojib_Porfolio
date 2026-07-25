import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { getBlogs } from '../../api/blogApi';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Skeleton } from '../ui/Skeleton';
import { Blog } from '../../types';
import { formatDate, truncate } from '../../utils/helpers';

export const BlogSection = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({ queryKey: ['blogs'], queryFn: () => getBlogs(1), staleTime: 300000 });
  const { ref, isVisible, variants } = useScrollAnimation('up');

  const blogs: Blog[] = data?.data?.blogs || [];

  return (
    <section id="blog" className="section-padding">
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Latest <span className="gradient-text">Blog Posts</span>
        </h2>
        <p className="text-[var(--color-muted)] mb-8 max-w-2xl">Thoughts, tutorials, and insights on web development.</p>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-64" count={3} />
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-[var(--color-muted)]">No blog posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Card key={blog._id} hover onClick={() => navigate(`/blog/${blog.slug}`)} className="cursor-pointer">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-[var(--color-accent)]/20 to-purple-500/20 mb-4 flex items-center justify-center overflow-hidden">
                  {blog.coverImage ? (
                    <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <span className="text-4xl font-display font-bold text-[var(--color-accent)]/30">{blog.title[0]}</span>
                  )}
                </div>
                <Badge variant="accent" className="mb-2">{blog.category}</Badge>
                <h3 className="text-lg font-display font-bold mb-2 line-clamp-2">{blog.title}</h3>
                <p className="text-sm text-[var(--color-muted)] mb-4 line-clamp-2">{truncate(blog.excerpt, 120)}</p>
                <div className="flex items-center gap-4 text-xs text-[var(--color-muted)]">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(blog.createdAt)}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {blog.readTime} min read</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

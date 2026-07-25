import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import api from '../../api/axiosInstance';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { Testimonial } from '../../types';
import { getInitials } from '../../utils/helpers';

export const Testimonials = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => api.get('/testimonials').then(r => r.data),
    staleTime: 300000,
  });
  const { ref, isVisible, variants } = useScrollAnimation('fade');

  const testimonials: Testimonial[] = data?.data || [];

  return (
    <section id="testimonials" className="section-padding">
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Client <span className="gradient-text">Testimonials</span>
        </h2>
        <p className="text-[var(--color-muted)] mb-8 max-w-2xl">What people say about working with me.</p>

        {isLoading ? (
          <Skeleton className="h-48" count={3} />
        ) : testimonials.length === 0 ? (
          <p className="text-[var(--color-muted)]">No testimonials yet.</p>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true, bulletClass: 'swiper-pagination-bullet !bg-[var(--color-accent)]' }}
            className="pb-12"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t._id}>
                <Card glass className="h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-purple-500 flex items-center justify-center text-sm font-bold text-white">
                      {t.avatar ? <img src={t.avatar} alt={t.name} className="w-full h-full rounded-full object-cover" /> : getInitials(t.name)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{t.name}</h4>
                      <p className="text-xs text-[var(--color-muted)]">{t.role}{t.company ? ` at ${t.company}` : ''}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className={i < t.rating ? 'text-yellow-500 fill-yellow-500' : 'text-[var(--color-muted)]'} />
                    ))}
                  </div>
                  <p className="text-sm text-[var(--color-muted)] italic">"{t.review}"</p>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </motion.div>
    </section>
  );
};

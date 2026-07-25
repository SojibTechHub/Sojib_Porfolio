import { motion } from 'framer-motion';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';
import { STATS } from '../../utils/constants';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const StatItem = ({ label, value, suffix }: { label: string; value: number; suffix: string }) => {
  const { count, ref } = useAnimatedCounter(value);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-display font-bold gradient-text">
        {count}{suffix}
      </div>
      <div className="text-sm text-[var(--color-muted)] mt-1">{label}</div>
    </div>
  );
};

export const StatsBar = () => {
  const { ref, isVisible, variants } = useScrollAnimation('fade', 0.2);

  return (
    <section className="relative -mt-20 z-20">
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-4"
      >
        <div className="glass rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

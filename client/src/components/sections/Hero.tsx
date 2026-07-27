import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, FileDown, ExternalLink, Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { ROLES, SOCIAL_LINKS } from '../../utils/constants';
import { MeshGradient } from '../common/MeshGradient';

export const Hero = () => {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <MeshGradient />

      <div className="hidden md:flex flex-col items-center gap-5 fixed left-8 top-1/2 -translate-y-1/2 z-20">
        {[
          { icon: Github, href: SOCIAL_LINKS.github, label: 'GitHub' },
          { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
          { icon: Mail, href: `mailto:${SOCIAL_LINKS.email}`, label: 'Email' },
        ].map((s, i) => (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-all duration-300"
            aria-label={s.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 + i * 0.1 }}
            whileHover={{ scale: 1.1 }}
          >
            <s.icon size={20} />
          </motion.a>
        ))}
        <div className="w-px h-16 bg-gradient-to-b from-[var(--color-accent)] to-transparent mt-2" />
      </div>

      <div className="flex md:hidden items-center justify-center gap-4 fixed bottom-8 left-1/2 -translate-x-1/2 z-20 bg-[var(--color-surface)]/80 backdrop-blur-lg rounded-2xl px-5 py-3 border border-[var(--color-border)] shadow-xl">
        {[
          { icon: Github, href: SOCIAL_LINKS.github, label: 'GitHub' },
          { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
          { icon: Mail, href: `mailto:${SOCIAL_LINKS.email}`, label: 'Email' },
          { icon: MessageCircle, href: `tel:${SOCIAL_LINKS.phone}`, label: 'WhatsApp' },
        ].map((s, i) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-all duration-200 active:scale-95"
            aria-label={s.label}
          >
            <s.icon size={18} />
          </a>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-8 shadow-lg shadow-green-500/5">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse-slow" />
            <span className="text-sm text-green-500 font-medium">Open to work</span>
          </div>
        </motion.div>

        <motion.p
          className="text-sm md:text-base font-mono text-[var(--color-muted)] mb-2 tracking-widest uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Hello, I am
        </motion.p>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight leading-none mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="gradient-text">Sojib Ahmed</span>
        </motion.h1>

        <motion.div
          className="text-xl sm:text-2xl md:text-3xl font-heading font-semibold mb-6 h-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <TypeAnimation
            sequence={ROLES.flatMap(r => [r, 2000])}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-[var(--color-text)]"
          />
        </motion.div>

        <motion.p
          className="text-base md:text-lg text-[var(--color-muted)] max-w-xl mx-auto mb-10 text-balance"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          From Rangpur, Bangladesh — I build fullstack web apps with React, Node.js, and MongoDB.
          Passionate about clean code and great user experiences.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Button size="lg" onClick={() => scrollTo('projects')}>
            <ExternalLink size={18} /> View Projects
          </Button>
          <Button size="lg" variant="outline" onClick={() => scrollTo('cv')}>
            <FileDown size={18} /> Download CV
          </Button>
          <Button size="lg" variant="secondary" onClick={() => scrollTo('contact')}>
            Contact Me
          </Button>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          {['React', 'Node.js', 'MongoDB', 'TypeScript', 'Tailwind', 'Express'].map((tech) => (
            <motion.span
              key={tech}
              className="px-4 py-2 text-sm rounded-full glass text-[var(--color-muted)] border border-[var(--color-border)]"
              whileHover={{ scale: 1.05, borderColor: 'var(--color-accent)' }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
        onClick={() => scrollTo('about')}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown size={24} />
      </motion.button>
    </section>
  );
};

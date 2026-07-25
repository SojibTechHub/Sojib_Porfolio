import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '../../utils/constants';

const footerLinks = {
  navigation: [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ],
  services: [
    { label: 'Web Development', href: '#contact' },
    { label: 'Fullstack Apps', href: '#projects' },
    { label: 'UI/UX Implementation', href: '#projects' },
    { label: 'API Development', href: '#skills' },
  ],
  contact: [
    { label: SOCIAL_LINKS.email, href: `mailto:${SOCIAL_LINKS.email}` },
    { label: SOCIAL_LINKS.phone, href: `tel:${SOCIAL_LINKS.phone}` },
    { label: 'Rangpur, Bangladesh', href: '#' },
  ],
};

const socialLinks = [
  { icon: Github, href: SOCIAL_LINKS.github, label: 'GitHub' },
  { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${SOCIAL_LINKS.email}`, label: 'Email' },
];

export const Footer = () => {
  const { ref, isVisible, variants } = useScrollAnimation('up', 0.1);

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface2)]">
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-display font-bold gradient-text mb-3">Sojib Ahmed</h3>
            <p className="text-sm text-[var(--color-muted)] mb-4">
              MERN Stack Developer from Rangpur, Bangladesh. Building modern web applications with passion.
            </p>
            <span className="inline-flex items-center gap-2 text-xs text-green-500 bg-green-500/10 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-slow" />
              Available for work
            </span>
          </div>

          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-4 capitalize">
                {key}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-muted)]">
            &copy; {new Date().getFullYear()} Sojib Ahmed. Built with MERN Stack.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface)] transition-all"
                aria-label={link.label}
              >
                <link.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

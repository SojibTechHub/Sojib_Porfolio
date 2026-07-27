import { motion } from 'framer-motion';
import { MapPin, Download, Github, Linkedin, Mail, Phone, Cake, GraduationCap } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { SOCIAL_LINKS } from '../../utils/constants';

const highlights = [
  'Passionate MERN Stack Developer from Rangpur, Bangladesh',
  'Built 10+ fullstack web applications from scratch',
  'Expert in React, Node.js, MongoDB, and TypeScript',
  'SSC GPA 4.50 in Science from Rowmari High School',
  'Currently studying HSC 2nd Year (Science)',
  'Available for freelance and full-time opportunities',
];

const education = [
  { degree: 'Higher Secondary (HSC)', school: '2nd Year Running, Science', period: '2024 — Present', desc: 'Science Group' },
  { degree: 'Secondary School Certificate (SSC)', school: 'Rowmari High School', period: '2022 — 2024', desc: 'Science Group · GPA: 4.50 out of 5.00' },
];

const familyBackground = "Born on July 7, 2008, I'm from a modest farming family in Rangpur, Bangladesh. My father is a primary school teacher and my mother is a homemaker. Growing up in a close-knit community with five siblings (three brothers and two sisters), I learned the value of perseverance and community from an early age."; 

const interests = "Outside of programming, I'm an avid basketball fan and actively play twice a week with my friends. I also enjoy sketching and digital art, where I explore creative expression through various graphic design tools. Traveling through Bangladesh's coastal regions, especially the scenic Cantoment, has been a great passion, offering new perspectives and cultural insights that often inspire my work.";

export const About = () => {
  const { ref, isVisible, variants } = useScrollAnimation('up');

  return (
    <section id="about" className="section-padding">
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          About <span className="gradient-text">Me</span>
        </h2>
        <p className="text-[var(--color-muted)] mb-12 max-w-2xl">
          Get to know me better — my background, skills, and what drives me as a developer.
        </p>

        <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
          <div className="md:col-span-2 space-y-6">
            <div className="glass rounded-3xl p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-[var(--color-border)]/70">
              <div className="relative mx-auto mb-6 w-36 h-36 sm:w-44 sm:h-44">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--color-accent)] via-purple-500 to-cyan-500 blur-2xl opacity-40 animate-pulse-slow" />
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-purple-600 p-1">
                  <img
                    src="/assets/images/profile-card.jpg"
                    alt="Sojib Ahmed - MERN Stack Developer"
                    className="w-full h-full rounded-full object-cover ring-2 ring-white/80 shadow-2xl shadow-[var(--color-accent)]/20"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="w-full h-full rounded-full bg-gradient-to-br from-[var(--color-accent)] to-purple-500 flex items-center justify-center text-4xl font-display font-bold text-white">SA</div>';
                      }
                    }}
                  />
                </div>
              </div>
              <h3 className="text-xl font-display font-bold">Sojib Ahmed</h3>
              <Badge variant="accent" className="mt-2">MERN Stack Developer</Badge>
              <div className="space-y-1.5 mt-3 text-sm text-[var(--color-muted)]">
                <div className="flex items-center justify-center gap-2">
                  <MapPin size={14} />
                  <span>Rangpur, Bangladesh</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Cake size={14} />
                  <span>July 7, 2008</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-slow" />
                  <span className="text-green-500 font-medium">Open to work</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  { label: 'Projects', value: '10+' },
                  { label: 'Experience', value: '2+ yrs' },
                  { label: 'SSC GPA', value: '4.50' },
                  { label: 'Technologies', value: '12+' },
                ].map((s) => (
                  <div key={s.label} className="bg-[var(--color-surface)] rounded-xl p-3 border border-[var(--color-border)]">
                    <div className="text-lg font-bold gradient-text">{s.value}</div>
                    <div className="text-xs text-[var(--color-muted)]">{s.label}</div>
                  </div>
                ))}
              </div>

              <a href={`${import.meta.env.VITE_API_URL || '/api'}/cv/download`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" icon={<Download size={16} />} className="w-full mt-5">
                  Download CV
                </Button>
              </a>

              <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
                <p className="text-sm font-medium text-[var(--color-muted)] mb-3">Connect on Social</p>
                <div className="flex justify-center gap-3">
                  <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all" aria-label="GitHub">
                    <Github size={16} />
                  </a>
                  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all" aria-label="LinkedIn">
                    <Linkedin size={16} />
                  </a>
                  <a href={`mailto:${SOCIAL_LINKS.email}`} className="p-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all" aria-label="Email">
                    <Mail size={16} />
                  </a>
                  <a href={`tel:${SOCIAL_LINKS.phone}`} className="p-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all" aria-label="Phone">
                    <Phone size={16} />
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                  Coding Journey
                </h3>
                <p className="text-[var(--color-text)] leading-relaxed mb-4">
                  I began my programming journey during my SSC years at Rowmari High School, where I discovered the magic of creating web pages with HTML and CSS. Initially drawn to the visual aspect of design, I quickly fell in love with how code could bring ideas to life. My first real project was a simple personal blog site, which sparked my interest in fullstack development.
                </p>
                <p className="text-[var(--color-text)] leading-relaxed mb-4">
                  During my free time between classes and homework, I started learning JavaScript and React, gradually building more complex applications. My passion for building complete solutions led me to explore Node.js and MongoDB, eventually mastering the entire MERN stack. Each project teaches me something new, and I approach every challenge with a problem-solving mindset.
                </p>
                <div className="bg-[var(--color-surface)] rounded-xl p-4 border border-[var(--color-border)] mt-4">
                  <h4 className="text-sm font-semibold mb-2 text-[var(--color-accent)]">Early Learnings</h4>
                  <ul className="space-y-1 text-xs text-[var(--color-muted)]">
                    <li>• Started with basic web development and progressively advanced to complex fullstack solutions</li>
                    <li>• Developed problem-solving habits through competitive programming</li>
                    <li>• Learned the importance of clean, maintainable code</li>
                    <li>• Discovered the power of community and collaboration through open source</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                  Background Story
                </h3>
                <p className="text-[var(--color-text)] leading-relaxed mb-4">
                  {familyBackground}
                </p>
                <p className="text-[var(--color-text)] leading-relaxed mb-4">
                  {interests}
                </p>
                <div className="bg-gradient-to-r from-[var(--color-accent)]/10 to-purple-500/10 rounded-xl p-4 border border-[var(--color-border)] mt-4">
                  <h4 className="text-sm font-semibold mb-2 text-[var(--color-accent)]">What Drives Me</h4>
                  <p className="text-xs text-[var(--color-text)] leading-relaxed">
                    I believe that code is a language that transcends borders and cultures. As a developer from Bangladesh, I want to create solutions that not only solve technical problems but also make a positive impact on communities. My goal is to bridge the gap between technology and accessible education, making quality web development resources available to everyone regardless of their background or location.
                  </p>
                </div>
              </div>
            </div>
          </div>

            <div className="md:col-span-3 space-y-8">
              <div>
                <p className="text-[var(--color-text)] leading-relaxed mb-4 text-lg">
                  Hello! I am <span className="font-semibold gradient-text">Sojib Ahmed</span>, a passionate MERN Stack Developer from
                  {' '}<span className="font-semibold">Rangpur, Bangladesh</span>. I specialize in building modern, scalable fullstack
                  web applications using React, Node.js, MongoDB, and TypeScript.
                </p>
                <p className="text-[var(--color-text)] leading-relaxed mb-4">
                  I started my coding journey during my SSC years at Rowmari High School, where I discovered my passion for web
                  development. Since then, I have built 10+ projects and continue to learn and grow every day. I love turning
                  complex problems into simple, beautiful, and intuitive solutions.
                </p>
                <ul className="space-y-2">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
                  <GraduationCap size={18} className="text-[var(--color-accent)]" />
                  Education
                </h3>
                <div className="space-y-4">
                  {education.map((edu, i) => (
                    <div key={i} className="relative pl-6 border-l-2 border-[var(--color-border)]">
                      <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                      <h4 className="font-semibold">{edu.degree}</h4>
                      <p className="text-sm text-[var(--color-accent)]">{edu.school} · {edu.period}</p>
                      <p className="text-sm text-[var(--color-muted)] mt-1">{edu.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    );
  };

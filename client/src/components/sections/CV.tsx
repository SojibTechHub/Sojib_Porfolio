import { motion } from 'framer-motion';
import { FileDown, FileText, Phone, Mail, MapPin, Cake } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { SOCIAL_LINKS } from '../../utils/constants';

export const CV = () => {
  const { ref, isVisible, variants } = useScrollAnimation('up');

  const cvUrl = `${import.meta.env.VITE_API_URL || '/api'}/cv/download`;

  return (
    <section id="cv" className="section-padding">
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          My <span className="gradient-text">Resume</span>
        </h2>
        <p className="text-[var(--color-muted)] mb-8 max-w-2xl">Download my CV or preview it below.</p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="overflow-hidden">
              <div className="aspect-[1/1.4] bg-[var(--color-surface)] rounded-xl p-8 border border-[var(--color-border)]">
                <div className="h-full flex flex-col">
                  <div className="bg-gradient-to-r from-[var(--color-accent)] to-purple-500 -mx-8 -mt-8 px-8 pt-8 pb-6 rounded-t-xl">
                    <h3 className="text-2xl font-display font-bold text-white">Sojib Ahmed</h3>
                    <p className="text-white/80">MERN Stack Developer</p>
                    <div className="flex items-center gap-4 mt-2 text-white/60 text-sm">
                      <span className="flex items-center gap-1"><Mail size={12} /> {SOCIAL_LINKS.email}</span>
                      <span className="flex items-center gap-1"><Phone size={12} /> {SOCIAL_LINKS.phone}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-white/60 text-sm">
                      <span className="flex items-center gap-1"><MapPin size={12} /> Rangpur, Bangladesh</span>
                      <span className="flex items-center gap-1"><Cake size={12} /> July 7, 2008</span>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-5 gap-6 mt-6">
                    <div className="col-span-2 space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-3">Skills</h4>
                        {[
                          { name: 'React.js', pct: '92' },
                          { name: 'Node.js', pct: '85' },
                          { name: 'MongoDB', pct: '82' },
                          { name: 'TypeScript', pct: '78' },
                          { name: 'Tailwind CSS', pct: '90' },
                          { name: 'Express.js', pct: '88' },
                        ].map((s) => (
                          <div key={s.name} className="mb-2.5">
                            <div className="text-xs text-[var(--color-text)] mb-1 flex justify-between">
                              <span>{s.name}</span>
                              <span className="text-[var(--color-muted)]">{s.pct}%</span>
                            </div>
                            <div className="h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-[var(--color-accent)] to-purple-500 rounded-full" style={{ width: s.pct + '%' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-2">Languages</h4>
                        <p className="text-xs text-[var(--color-text)]">Bengali (Native)</p>
                        <p className="text-xs text-[var(--color-text)]">English (Professional working)</p>
                      </div>
                    </div>
                    <div className="col-span-3 space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-3">Experience</h4>
                        <div className="space-y-3">
                          {[
                            { role: 'Fullstack Developer (Freelance)', company: 'Self-Employed', period: '2024 — Present' },
                          ].map((exp, i) => (
                            <div key={i}>
                              <p className="text-sm font-semibold text-[var(--color-text)]">{exp.role}</p>
                              <p className="text-xs text-[var(--color-accent)]">{exp.company} · {exp.period}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-3">Education</h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-semibold text-[var(--color-text)]">Higher Secondary (HSC)</p>
                            <p className="text-xs text-[var(--color-accent)]">2nd Year Running, Science · 2024 — Present</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[var(--color-text)]">Secondary School (SSC)</p>
                            <p className="text-xs text-[var(--color-accent)]">Rowmari High School · GPA: 4.50 · 2022 — 2024</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-2">Social</h4>
                        <p className="text-xs text-[var(--color-text)]">GitHub: github.com/sojibahmedshorif25-ai</p>
                        <p className="text-xs text-[var(--color-text)]">LinkedIn: linkedin.com/in/sojib-ahmed-shorif</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="text-center">
              <FileText size={40} className="text-[var(--color-accent)] mx-auto mb-4" />
              <h3 className="font-display font-bold mb-2">Download Resume</h3>
              <p className="text-sm text-[var(--color-muted)] mb-4">PDF format, updated regularly</p>
              <Button variant="primary" className="w-full" icon={<FileDown size={16} />}>
                <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="text-white no-underline">
                  Download PDF
                </a>
              </Button>
              <p className="text-xs text-[var(--color-muted)] mt-3">Last updated: July 2026</p>
            </Card>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getSkills } from '../../api/skillsApi';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { Skill } from '../../types';
import { skillCategories } from '../../utils/constants';

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  devops: 'Deployment',
  tools: 'Tools',
};

const fallbackSkills: Skill[] = [
  { _id: 'skill-js', name: 'JavaScript', iconName: 'javascript', category: 'frontend', proficiency: 95, yearsExp: 4, order: 1 },
  { _id: 'skill-ts', name: 'TypeScript', iconName: 'typescript', category: 'frontend', proficiency: 92, yearsExp: 3, order: 2 },
  { _id: 'skill-react', name: 'React.js', iconName: 'react', category: 'frontend', proficiency: 94, yearsExp: 4, order: 3 },
  { _id: 'skill-next', name: 'Next.js', iconName: 'nextjs', category: 'frontend', proficiency: 90, yearsExp: 2, order: 4 },
  { _id: 'skill-tailwind', name: 'Tailwind CSS', iconName: 'tailwind', category: 'frontend', proficiency: 93, yearsExp: 3, order: 5 },
  { _id: 'skill-node', name: 'Node.js', iconName: 'node', category: 'backend', proficiency: 92, yearsExp: 4, order: 6 },
  { _id: 'skill-nest', name: 'NestJS', iconName: 'nestjs', category: 'backend', proficiency: 86, yearsExp: 2, order: 7 },
  { _id: 'skill-fastapi', name: 'FastAPI', iconName: 'fastapi', category: 'backend', proficiency: 82, yearsExp: 2, order: 8 },
  { _id: 'skill-mongo', name: 'MongoDB', iconName: 'mongodb', category: 'database', proficiency: 89, yearsExp: 3, order: 9 },
  { _id: 'skill-mongoose', name: 'Mongoose', iconName: 'mongoose', category: 'database', proficiency: 87, yearsExp: 3, order: 10 },
  { _id: 'skill-firestore', name: 'Firebase Firestore', iconName: 'firestore', category: 'database', proficiency: 84, yearsExp: 2, order: 11 },
  { _id: 'skill-cloudflare', name: 'Cloudflare', iconName: 'cloudflare', category: 'devops', proficiency: 80, yearsExp: 2, order: 12 },
  { _id: 'skill-firebase-hosting', name: 'Firebase Hosting', iconName: 'firebase', category: 'devops', proficiency: 82, yearsExp: 2, order: 13 },
  { _id: 'skill-vercel', name: 'Vercel', iconName: 'vercel', category: 'devops', proficiency: 85, yearsExp: 2, order: 14 },
  { _id: 'skill-railway', name: 'Railway', iconName: 'railway', category: 'devops', proficiency: 78, yearsExp: 1, order: 15 },
  { _id: 'skill-rest', name: 'REST API', iconName: 'rest', category: 'tools', proficiency: 91, yearsExp: 4, order: 16 },
  { _id: 'skill-graphql', name: 'GraphQL', iconName: 'graphql', category: 'tools', proficiency: 84, yearsExp: 2, order: 17 },
  { _id: 'skill-postman', name: 'Postman', iconName: 'postman', category: 'tools', proficiency: 88, yearsExp: 3, order: 18 },
  { _id: 'skill-hoppscotch', name: 'Hoppscotch', iconName: 'hoppscotch', category: 'tools', proficiency: 82, yearsExp: 2, order: 19 },
  { _id: 'skill-git', name: 'Git', iconName: 'git', category: 'tools', proficiency: 90, yearsExp: 4, order: 20 },
  { _id: 'skill-github', name: 'GitHub', iconName: 'github', category: 'tools', proficiency: 91, yearsExp: 4, order: 21 },
  { _id: 'skill-uiux', name: 'UI/UX Design', iconName: 'design', category: 'tools', proficiency: 88, yearsExp: 3, order: 22 },
  { _id: 'skill-figma', name: 'Figma', iconName: 'figma', category: 'tools', proficiency: 86, yearsExp: 3, order: 23 },
];

const SkillIcon = ({ iconName }: { iconName: string }) => {
  const commonClasses = 'h-10 w-10 rounded-xl p-2 shadow-sm ring-1 ring-white/10';

  switch (iconName) {
    case 'javascript':
      return <div className={`${commonClasses} bg-amber-500/15 text-amber-400`}><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor"><path d="M3 3h18v18H3z" fill="none"/><path d="M12 6c-3.9 0-7 2.1-7 6 0 2.6 1.4 4.3 3.8 5.2l.7.3-.3.9c-.1.3-.2.6-.2.9 0 .5.3.8.8.8.5 0 .8-.3 1-.9l.3-1.1c.4-.2.8-.5 1.1-.8.7.3 1.4.5 2.2.5 3.9 0 7-2.1 7-6 0-3.4-2.6-5.7-6.3-5.7H12Zm0 2.3c2.6 0 4.3 1.3 4.3 3.4 0 2.3-1.5 3.4-3.8 3.4-1.3 0-2.2-.2-3.1-.6.4-1.2.7-2.3.9-3.4.3-1.2.6-2.4 1.2-3.3.1 0 .2-.1.3-.1h.2Z"/></svg></div>;
    case 'typescript':
      return <div className={`${commonClasses} bg-sky-500/15 text-sky-400`}><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor"><path d="M3 3h18v18H3z" fill="none"/><path d="M14.7 8.7h-5.4v2.2h2.3v8.1h2.8V10.9h2.3V8.7ZM7.7 8.7H5.4v10.3h2.3V8.7Z"/></svg></div>;
    case 'react':
      return <div className={`${commonClasses} bg-cyan-500/15 text-cyan-400`}><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor"><path d="M12 5.2c-3.1 0-5.8 1.6-7.4 4.2 1.6 2.6 4.3 4.2 7.4 4.2s5.8-1.6 7.4-4.2C17.8 6.8 15.1 5.2 12 5.2Zm0 6.8c-1.5 0-2.8-1.2-2.8-2.8S10.5 6.4 12 6.4s2.8 1.2 2.8 2.8S13.5 12 12 12Zm0 5.3c-3.1 0-5.8-1.6-7.4-4.2 1.6-2.6 4.3-4.2 7.4-4.2 3.1 0 5.8 1.6 7.4 4.2-1.6 2.6-4.3 4.2-7.4 4.2Z"/></svg></div>;
    case 'nextjs':
      return <div className={`${commonClasses} bg-slate-700/90 text-white`}><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor"><path d="M12 2 2 20h4l6-10.3L18 20h4L12 2Zm0 6.2 2.2 3.8-2.2 3.8-2.2-3.8L12 8.2Z"/></svg></div>;
    case 'tailwind':
      return <div className={`${commonClasses} bg-cyan-500/15 text-cyan-400`}><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor"><path d="M5.5 7.8C7.4 5.2 9.7 4.1 12.2 4.1c2.8 0 4.6 1.3 5.4 3.9-.9-1.3-2.1-1.9-3.8-1.9-2.3 0-3.8 1.3-4.6 3.8-.7 2.1-.2 4.4 1.4 5.7 1.1.9 2.9 1.2 4.3.8.7-.2 1.3-.5 1.9-.9-.6.8-1.4 1.5-2.4 1.9-1.9.8-4.1.8-5.7-.1-2.3-1.4-3.4-4.4-2.3-7.2Zm3.6 6.1c.7.4 1.4.6 2.3.6 1.3 0 2.3-.7 3.1-1.9-.8 1.2-1.8 1.8-3.2 1.8-1.4 0-2.2-.6-2.2-1.5 0-.6.3-1 0-1.9Z"/></svg></div>;
    case 'node':
      return <div className={`${commonClasses} bg-emerald-500/15 text-emerald-400`}><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor"><path d="M12 4 4 7.5v9L12 20l8-3.5v-9L12 4Zm0 2.2 5.7 2.5L12 11.2 6.3 8.7 12 6.2Zm-6.8 4.5 5.4 2.4v5.1l-5.4-2.4v-5.1Zm7.6 7.5v-5.1l5.4-2.4v5.1l-5.4 2.4Z"/></svg></div>;
    case 'nestjs':
      return <div className={`${commonClasses} bg-rose-500/15 text-rose-400`}><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor"><path d="M12 3 4 7v10l8 4 8-4V7l-8-4Zm0 2.2 5.8 2.9v7.8L12 18.8 6.2 15.9V8.1L12 5.2Z"/></svg></div>;
    case 'fastapi':
      return <div className={`${commonClasses} bg-blue-500/15 text-blue-400`}><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor"><path d="M12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8Zm1.2 4.2h-1.4l-2.6 6.5h1.9l.6-1.5h2.3l.6 1.5h2l-2.4-6.5Zm-1.2 2.2 1 2.4h-2l1-2.4Z"/></svg></div>;
    case 'mongodb':
      return <div className={`${commonClasses} bg-emerald-500/15 text-emerald-400`}><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor"><path d="M12 3c-2.2 0-4 1.6-4 3.8 0 1.4.8 2.6 2.1 3.3v7.1c0 1.8 1.2 3.1 3 3.1 1.5 0 2.8-.9 3.3-2.3-.8.4-1.8.6-2.8.6-2.5 0-4.5-1.5-4.5-3.6V10.1c1.3-.7 2.1-2 2.1-3.3 0-2.2-1.8-3.8-4-3.8-1.8 0-3.3 1-3.9 2.4.6-.3 1.3-.4 2-.4 1.9 0 3.4 1.3 3.4 3 0 .5-.1 1-.3 1.4.9-.6 1.6-1.6 1.6-2.7 0-1.8-1.5-3.2-3.4-3.2Z"/></svg></div>;
    case 'mongoose':
      return <div className={`${commonClasses} bg-stone-500/15 text-stone-400`}><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor"><path d="M10 4h4v16h-4z"/><path d="M6 7h4v10H6z"/><path d="M14 7h4v10h-4z"/></svg></div>;
    case 'firestore':
      return <div className={`${commonClasses} bg-orange-500/15 text-orange-400`}><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor"><path d="M6 4h12v16H6z" fill="none"/><path d="M8 6h8v12H8z"/><path d="M8 10h8v2H8z"/></svg></div>;
    case 'cloudflare':
      return <div className={`${commonClasses} bg-orange-500/15 text-orange-400`}><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor"><path d="M12 4 5 18h14L12 4Zm0 3.3 4.8 8.9H7.2L12 7.3Z"/></svg></div>;
    case 'firebase':
      return <div className={`${commonClasses} bg-yellow-500/15 text-yellow-400`}><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor"><path d="M7.2 14.6 12 4l4.8 10.6-2.4 4.8H9.6l-2.4-4.8Zm1.9-1.2 1.8-3.4 1.8 3.4H9.1Zm1.8 4.6h2.2l1-1.9h-4.2l1 1.9Z"/></svg></div>;
    case 'vercel':
      return <div className={`${commonClasses} bg-slate-800/90 text-white`}><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor"><path d="M12 4l8 14H4l8-14Z"/></svg></div>;
    case 'railway':
      return <div className={`${commonClasses} bg-violet-500/15 text-violet-400`}><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor"><path d="M12 4 6 8v8l6 4 6-4V8l-6-4Zm0 2.3 3.8 2.5v4.4L12 15.7 8.2 11.2V8.8L12 6.3Z"/></svg></div>;
    case 'rest':
      return <div className={`${commonClasses} bg-indigo-500/15 text-indigo-400`}><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor"><path d="M6 6h12v2H6zM6 11h12v2H6zM6 16h8v2H6z"/></svg></div>;
    case 'graphql':
      return <div className={`${commonClasses} bg-pink-500/15 text-pink-400`}><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor"><path d="M12 3.5 4 7v10l8 3.5 8-3.5V7l-8-3.5Zm0 2 5.7 2.5L12 10.8 6.3 8 12 5.5Zm-6.8 4.2 5.4 2.4v4.7l-5.4-2.4V9.7Zm7.6 7.1v-4.7l5.4-2.4v4.7l-5.4 2.4Z"/></svg></div>;
    case 'postman':
      return <div className={`${commonClasses} bg-orange-500/15 text-orange-400`}><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor"><path d="M12 4c-2.8 0-5 2.2-5 5 0 .7.1 1.3.3 1.9l1.6 4.4c.3.8 1 1.3 1.8 1.3h3.6c.8 0 1.5-.5 1.8-1.3l1.6-4.4c.2-.6.3-1.2.3-1.9 0-2.8-2.2-5-5-5Zm0 2c1.7 0 3 1.3 3 3 0 .5-.1 1-.3 1.4l-.4 1.2H9.7l-.4-1.2A3 3 0 0 1 9 9c0-1.7 1.3-3 3-3Z"/></svg></div>;
    case 'hoppscotch':
      return <div className={`${commonClasses} bg-teal-500/15 text-teal-400`}><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor"><path d="M6 5h12v2H6zM6 11h12v2H6zM6 17h8v2H6z"/></svg></div>;
    case 'git':
      return <div className={`${commonClasses} bg-orange-600/15 text-orange-500`}><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor"><path d="M12 3 4 7v10l8 4 8-4V7l-8-4Zm0 2.2 5.6 2.8L12 10.8 6.4 8l5.6-2.8Zm-6.7 4.1 5.6 2.8v5.5L5.3 14.8V9.3Zm7.4 8.3v-5.5l5.6-2.8v5.5l-5.6 2.8Z"/></svg></div>;
    case 'github':
      return <div className={`${commonClasses} bg-slate-800/90 text-white`}><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.4-1-.9-1.3-.9-1.3-.8-.5.1-.5.1-.5.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .5-1.2-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1 .8-.2 1.7-.3 2.5-.3s1.7.1 2.5.3c2-.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .3.3.6.9.6 1.8v2.7c0 .3.2.6.7.5A10 10 0 0 0 22 12c0-5.5-4.5-10-10-10Z"/></svg></div>;
    case 'design':
      return <div className={`${commonClasses} bg-pink-500/15 text-pink-400`}><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor"><path d="M12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8Zm0 2.2c3.2 0 5.8 2.6 5.8 5.8 0 3.2-2.6 5.8-5.8 5.8s-5.8-2.6-5.8-5.8c0-3.2 2.6-5.8 5.8-5.8Zm-1.5 2.2h3c.6 0 1.1.5 1.1 1.1v3c0 .6-.5 1.1-1.1 1.1h-3c-.6 0-1.1-.5-1.1-1.1v-3c0-.6.5-1.1 1.1-1.1Zm0 1.2v2.8h2.8V9.6h-2.8Z"/></svg></div>;
    case 'figma':
      return <div className={`${commonClasses} bg-violet-500/15 text-violet-400`}><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor"><path d="M8 2h4v4H8zM12 6h4v4h-4zM8 10h4v4H8zM12 14h4v4h-4zM8 18h4v4H8z"/></svg></div>;
    default:
      return <div className={`${commonClasses} bg-[var(--color-accent)]/15 text-[var(--color-accent)]`}><span className="text-sm font-semibold">{iconName}</span></div>;
  }
};

const SkillBar = ({ name, proficiency, iconName }: { name: string; proficiency: number; iconName: string }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <SkillIcon iconName={iconName} />
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-foreground)]">{name}</h3>
            <p className="text-xs text-[var(--color-muted)]">{proficiency}% proficiency</p>
          </div>
        </div>
      </div>
      <div className="h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--color-accent)] to-purple-500 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export const Skills = () => {
  const [activeTab, setActiveTab] = useState('frontend');
  const { data, isLoading } = useQuery({ queryKey: ['skills'], queryFn: getSkills, staleTime: 300000 });
  const { ref, isVisible, variants } = useScrollAnimation('up');

  const mergedSkills = useMemo(() => {
    const apiSkills: Skill[] = data?.data?.skills || [];
    const existingNames = new Set(apiSkills.map((skill) => skill.name.toLowerCase()));
    const extras = fallbackSkills.filter((skill) => !existingNames.has(skill.name.toLowerCase()));
    return [...apiSkills, ...extras];
  }, [data?.data?.skills]);

  const grouped = useMemo(() => {
    return mergedSkills.reduce<Record<string, Skill[]>>((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {});
  }, [mergedSkills]);

  const currentSkills = grouped[activeTab] || [];

  return (
    <section id="skills" className="section-padding">
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          My <span className="gradient-text">Skills</span>
        </h2>
        <p className="text-[var(--color-muted)] mb-8 max-w-2xl">A concise view of the technologies I use to design, build, and ship modern digital experiences.</p>

        <div className="mb-8 rounded-2xl border border-[var(--color-border)]/70 bg-[var(--color-surface)]/70 p-2 shadow-sm">
          <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto scrollbar-none snap-x snap-mandatory -mx-2 px-2 md:mx-0 md:px-0">
            {skillCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`snap-start shrink-0 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === cat
                    ? 'bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/20'
                    : 'text-[var(--color-muted)] hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-text)]'
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <Skeleton className="h-40" count={6} />
          </div>
        ) : currentSkills.length === 0 ? (
          <p className="text-[var(--color-muted)]">No skills in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentSkills.map((skill: Skill) => (
              <Card key={skill._id} hover className="h-full rounded-2xl border border-[var(--color-border)]/70 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface)]/70">
                <SkillBar name={skill.name} proficiency={skill.proficiency} iconName={skill.iconName || 'default'} />
              </Card>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

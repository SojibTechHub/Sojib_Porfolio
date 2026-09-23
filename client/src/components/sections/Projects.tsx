import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';
import { getProjects } from '../../api/projectsApi';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Skeleton } from '../ui/Skeleton';
import { Modal } from '../ui/Modal';
import { Project } from '../../types';

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Fullstack', value: 'fullstack' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'API', value: 'api' },
  { label: 'Open Source', value: 'opensource' },
  { label: 'Mobile', value: 'mobile' },
];

const PROJECTS = [
  {
    _id: '1',
    title: 'Job Finder Platform',
    slug: 'job-finder-platform',
    description: 'A fullstack job search and recruitment platform where employers can post jobs and candidates can apply.',
    longDescription: '<p>A comprehensive job search and recruitment platform built with the MERN stack. Employers can create company profiles, post job listings, and manage applications. Job seekers can create profiles, upload resumes, search and filter jobs, and apply with one click.</p><h3>Key Features</h3><ul><li>User authentication (Employer & Job Seeker roles)</li><li>Job posting with rich text descriptions</li><li>Resume upload and management</li><li>Advanced job search and filtering</li><li>Real-time application tracking</li><li>Responsive design</li></ul>',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'Tailwind CSS'],
    images: ['https://picsum.photos/seed/jobfinder1/800/450', 'https://picsum.photos/seed/jobfinder2/800/450'],
    liveUrl: 'https://job-finder-client.vercel.app',
    githubUrl: 'https://github.com/sojibahmedshorif25-ai/Job-Finder-Client.git',
    caseStudyUrl: '',
    thumbnail: 'https://picsum.photos/seed/jobfinder-thumb/800/450',
    challenges: 'The main challenge was creating a scalable job matching algorithm. I implemented a weighted scoring system based on skills, experience, and location to provide more accurate matches. Another challenge was optimizing the resume parsing API integration for efficient text extraction.',
    improvements: 'Future plans include adding AI-powered interview preparation tools, integrating video interviews, and building a salary prediction feature based on market trends and historical data.',
    featured: true,
    visible: true,
    order: 0,
    category: 'fullstack',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    title: 'Pet Adoption Platform',
    slug: 'pet-adoption-platform',
    description: 'A fullstack pet adoption platform connecting rescue animals with loving homes.',
    longDescription: '<p>A heartwarming fullstack application that connects rescue animals with loving families. Built with React and Node.js, this platform allows shelters to list animals available for adoption and users to find their perfect companion.</p><h3>Key Features</h3><ul><li>Pet listing with photos and details</li><li>Adoption application system</li><li>Shelter management dashboard</li><li>Advanced search by breed, age, size</li><li>Responsive and accessible design</li></ul>',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Cloudinary', 'Tailwind CSS'],
    images: ['https://picsum.photos/seed/petadoption1/800/450', 'https://picsum.photos/seed/petadoption2/800/450'],
    liveUrl: 'https://pet-adoption-client-rho-jet.vercel.app',
    githubUrl: 'https://github.com/sojibahmedshorif25-ai/Pet-Adoption-Client.git',
    caseStudyUrl: '',
    thumbnail: 'https://picsum.photos/seed/petadoption-thumb/800/450',
    challenges: 'The biggest challenge was creating an efficient pet matching experience that felt personal while staying simple for shelters and adopters to use.',
    improvements: 'Future enhancements will include a smarter matching flow, virtual pet tours, and better admin reporting for shelters.',
    featured: false,
    visible: true,
    order: 1,
    category: 'fullstack',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '3',
    title: 'Books Platform',
    slug: 'books-platform',
    description: 'A modern books platform for browsing, discovering, and exploring books in a clean and engaging experience.',
    longDescription: '<p>The Books Platform is a polished web app focused on helping users discover and explore books through a simple, modern interface. It is designed to make browsing content feel effortless and engaging.</p><h3>Key Features</h3><ul><li>Clean browsing experience for books</li><li>Modern responsive design</li><li>Easy-to-use interface for discovery</li><li>Fast performance and smooth navigation</li></ul>',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    images: ['https://picsum.photos/seed/books1/800/450', 'https://picsum.photos/seed/books2/800/450'],
    liveUrl: 'https://books-platfrom-48rm.vercel.app',
    githubUrl: 'https://github.com/sojibahmedshorif25-ai/Books-Platfrom.git',
    caseStudyUrl: '',
    thumbnail: 'https://picsum.photos/seed/books-thumb/800/450',
    challenges: 'The main challenge was creating a refined browsing experience that felt modern and lightweight while still being easy to navigate.',
    improvements: 'Future plans include richer book details, search filters, and personalized recommendations.',
    featured: true,
    visible: true,
    order: 2,
    category: 'fullstack',
    createdAt: new Date().toISOString(),
  },
];

const categoryColors: Record<string, 'accent' | 'success' | 'warning' | 'default'> = {
  fullstack: 'accent',
  frontend: 'success',
  api: 'warning',
  opensource: 'accent',
  mobile: 'default',
};

const ProjectCard = ({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Card hover glass onClick={onClick} className="group relative overflow-hidden h-full flex flex-col cursor-pointer">
      <div className="aspect-video rounded-xl bg-gradient-to-br from-[var(--color-accent)]/20 to-purple-500/20 mb-4 flex items-center justify-center overflow-hidden relative">
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--color-accent)]/30 via-purple-500/20 to-[var(--color-accent)]/10">
            <span className="text-5xl md:text-6xl font-display font-bold text-[var(--color-accent)]/30 group-hover:scale-110 transition-transform duration-500">{project.title[0]}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="flex items-start justify-between mb-2 gap-2 flex-wrap">
        <Badge variant={categoryColors[project.category] || 'default'}>{project.category}</Badge>
        {project.featured && <Badge variant="success">Featured</Badge>}
      </div>
      <h3 className="text-lg font-display font-bold mb-1 group-hover:text-[var(--color-accent)] transition-colors">{project.title}</h3>
      <p className="text-sm text-[var(--color-muted)] mb-4 line-clamp-2 flex-1">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.slice(0, 5).map((tech) => (
          <span key={tech} className="px-2.5 py-1 text-xs rounded-lg bg-[var(--color-surface)] text-[var(--color-muted)] border border-[var(--color-border)]">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-4 pt-3 border-t border-[var(--color-border)]">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] hover:underline group/link">
            <ExternalLink size={14} /> Live Demo <ChevronRight size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">
            <Github size={14} /> Source
          </a>
        )}
      </div>
    </Card>
  </motion.div>
);

const toArray = (d: unknown): Project[] => {
  if (Array.isArray(d)) return d as Project[];
  if (d && typeof d === 'object' && 'data' in (d as object)) return toArray((d as { data: unknown }).data);
  if (d && typeof d === 'object' && 'projects' in (d as object)) return toArray((d as { projects: unknown }).projects);
  return [];
};

export const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<Project | null>(null);
  const { ref, isVisible, variants } = useScrollAnimation('fade');
  const { data, isLoading } = useQuery({ queryKey: ['projects'], queryFn: getProjects, staleTime: 300000 });

  const projects: Project[] = isLoading ? [] : (toArray(data).length > 0 ? toArray(data) : PROJECTS);
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
  const featured = projects.filter(p => p.featured);

  return (
    <section id="projects" className="section-padding">
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          My <span className="gradient-text">Projects</span>
        </h2>
        <p className="text-[var(--color-muted)] mb-8 max-w-2xl">
          A selection of fullstack projects I have built. Each project represents real-world solutions.
        </p>

        <div className="flex flex-nowrap md:flex-wrap gap-2 mb-8 overflow-x-auto scrollbar-none snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`snap-start shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                filter === cat.value
                  ? 'bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/20'
                  : 'bg-[var(--color-surface)] text-[var(--color-muted)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-text)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[var(--color-muted)] text-lg">No projects in this category yet.</p>
            <button onClick={() => setFilter('all')} className="mt-4 text-[var(--color-accent)] hover:underline text-sm">
              View all projects
            </button>
          </div>
        ) : (
          <>
            {featured.length > 0 && filter === 'all' && (
              <div className="mb-10">
                <h3 className="text-lg font-semibold mb-4 text-[var(--color-muted)] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                  Featured Projects
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featured.map((project, i) => (
                    <ProjectCard key={project._id} project={project} onClick={() => setSelected(project)} index={i} />
                  ))}
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <ProjectCard key={project._id} project={project} onClick={() => setSelected(project)} index={i} />
              ))}
            </div>
          </>
        )}
      </motion.div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.title} size="lg">
        {selected && (
          <div className="space-y-6">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-[var(--color-accent)]/20 to-purple-500/20 flex items-center justify-center overflow-hidden">
              {selected.thumbnail ? (
                <img src={selected.thumbnail} alt={selected.title} className="w-full h-full object-cover rounded-xl" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--color-accent)]/20 to-purple-500/20">
                  <span className="text-7xl font-display font-bold text-[var(--color-accent)]/20">{selected.title[0]}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant={categoryColors[selected.category] || 'default'}>{selected.category}</Badge>
              {selected.featured && <Badge variant="success">Featured</Badge>}
            </div>

            <div
              className="text-[var(--color-text)] leading-relaxed space-y-3"
              dangerouslySetInnerHTML={{ __html: selected.longDescription || selected.description }}
            />

            <div>
              <h4 className="font-semibold mb-3 text-sm text-[var(--color-muted)] uppercase tracking-wider">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {selected.techStack.map((t) => (
                  <span key={t} className="px-3 py-1.5 text-sm rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {selected.challenges && (
              <div>
                <h4 className="font-semibold mb-3 text-sm text-[var(--color-muted)] uppercase tracking-wider">Challenges Faced</h4>
                <p className="text-sm text-[var(--color-text)] leading-relaxed">{selected.challenges}</p>
              </div>
            )}

            {selected.improvements && (
              <div>
                <h4 className="font-semibold mb-3 text-sm text-[var(--color-muted)] uppercase tracking-wider">Future Plans & Improvements</h4>
                <p className="text-sm text-[var(--color-text)] leading-relaxed">{selected.improvements}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-4 pt-4 border-t border-[var(--color-border)]">
              {selected.liveUrl && (
                <a href={selected.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[var(--color-accent)] text-white px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity font-medium">
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
              {selected.githubUrl && (
                <a href={selected.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[var(--color-surface)] border border-[var(--color-border)] px-5 py-2.5 rounded-xl hover:border-[var(--color-accent)] transition-colors font-medium">
                  <Github size={16} /> View Source
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

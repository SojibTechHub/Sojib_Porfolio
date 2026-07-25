export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  techStack: string[];
  thumbnail: string;
  images: string[];
  liveUrl: string;
  githubUrl: string;
  caseStudyUrl: string;
  category: string;
  featured: boolean;
  visible: boolean;
  order: number;
  createdAt: string;
  challenges?: string;
  improvements?: string;
}

export interface Skill {
  _id: string;
  name: string;
  iconName: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools';
  proficiency: number;
  yearsExp: number;
  order: number;
}

export interface Experience {
  _id: string;
  type: 'work' | 'education';
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  review: string;
  visible: boolean;
  order: number;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  published: boolean;
  readTime: number;
  author: string;
  createdAt: string;
}

export interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  budget: string;
  read: boolean;
  createdAt: string;
}

export interface Profile {
  _id: string;
  name: string;
  role: string;
  bio: string;
  location: string;
  availability: boolean;
  photo: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  twitter: string;
  discord: string;
  fiverr: string;
  cvUrl?: string;
  birthDate?: string;
}

export interface AdminStats {
  totalProjects: number;
  unreadMessages: number;
  totalBlogPosts: number;
  totalSkills: number;
}

import 'dotenv/config';
import connectDB from './config/db.js';
import mongoose from 'mongoose';
import Admin from './models/Admin.js';
import Project from './models/Project.js';
import Skill from './models/Skill.js';
import Experience from './models/Experience.js';
import Testimonial from './models/Testimonial.js';
import Blog from './models/Blog.js';
import Profile from './models/Profile.js';

const seed = async () => {
  await connectDB();
  await mongoose.connection.dropDatabase();

  await Admin.create({ email: 'admin@portfolio.com', password: 'admin123' });

  await Profile.create({
    name: 'Sojib Ahmed',
    role: 'MERN Stack Developer',
    bio: 'I am a passionate MERN Stack Developer from Rangpur, Bangladesh. I build modern, scalable fullstack web applications using React, Node.js, MongoDB, and TypeScript. I love turning complex problems into simple, beautiful, and intuitive solutions. Currently exploring advanced React patterns and cloud deployment.',
    location: 'Rangpur, Bangladesh',
    availability: true,
    email: 'sojibahmedshorif998@gmail.com',
    phone: '01942791004',
    birthDate: 'July 7, 2008',
    photo: 'https://res.cloudinary.com/wb19kgrx/image/upload/f_auto,q_auto/WhatsApp_Image_2026-07-09_at_8.49.09_PM_yzinhu',
    github: 'https://github.com/sojibahmedshorif25-ai',
    linkedin: 'https://www.linkedin.com/in/sojib-ahmed-shorif',
    twitter: '',
    discord: '',
    fiverr: '',
  });

  const projects = await Project.insertMany([
    {
      title: 'Job Finder Platform',
      description: 'A fullstack job search and recruitment platform where employers can post jobs and candidates can apply. Features include resume upload, job filtering, and real-time application tracking.',
      longDescription: '<h2>Job Finder Platform</h2><p>A comprehensive job search and recruitment platform built with the MERN stack. Employers can create company profiles, post job listings, and manage applications. Job seekers can create profiles, upload resumes, search and filter jobs, and apply with one click.</p><h3>Key Features</h3><ul><li>User authentication (Employer & Job Seeker roles)</li><li>Job posting with rich text descriptions</li><li>Resume upload and management</li><li>Advanced job search and filtering</li><li>Real-time application tracking</li><li>Responsive design</li></ul>',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'Tailwind CSS'],
      thumbnail: '',
      images: [],
      liveUrl: 'https://job-finder-client.vercel.app',
      githubUrl: 'https://github.com/sojibahmedshorif25-ai/Job-Finder-Client.git',
      category: 'fullstack',
      featured: true,
      visible: true,
      order: 0,
    },
    {
      title: 'Pet Adoption Platform',
      description: 'A fullstack pet adoption platform connecting rescue animals with loving homes. Users can browse pets, submit adoption applications, and shelters can manage listings.',
      longDescription: '<h2>Pet Adoption Platform</h2><p>A heartwarming fullstack application that connects rescue animals with loving families. Built with React and Node.js, this platform allows shelters to list animals available for adoption and users to find their perfect companion.</p><h3>Key Features</h3><ul><li>Pet listing with photos and details</li><li>Adoption application system</li><li>Shelter management dashboard</li><li>Advanced search by breed, age, size</li><li>Responsive and accessible design</li></ul>',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Cloudinary', 'Tailwind CSS'],
      thumbnail: '',
      images: [],
      liveUrl: 'https://pet-adoption-client-rho-jet.vercel.app',
      githubUrl: 'https://github.com/sojibahmedshorif25-ai/Pet-Adoption-Client.git',
      category: 'fullstack',
      featured: false,
      visible: true,
      order: 1,
    },
    {
      title: 'Books Platform',
      description: 'A modern books platform for browsing, discovering, and exploring books in a clean and engaging experience.',
      longDescription: '<h2>Books Platform</h2><p>The Books Platform is a polished web app focused on helping users discover and explore books through a simple, modern interface. It is designed to make browsing content feel effortless and engaging.</p><h3>Key Features</h3><ul><li>Clean browsing experience for books</li><li>Modern responsive design</li><li>Easy-to-use interface for discovery</li><li>Fast performance and smooth navigation</li></ul>',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      thumbnail: '',
      images: [],
      liveUrl: 'https://books-platfrom-48rm.vercel.app',
      githubUrl: 'https://github.com/sojibahmedshorif25-ai/Books-Platfrom.git',
      category: 'fullstack',
      featured: true,
      visible: true,
      order: 2,
    },
  ]);

  await Skill.insertMany([
    { name: 'React.js', iconName: 'react', category: 'frontend', proficiency: 92, yearsExp: 2 },
    { name: 'TypeScript', iconName: 'typescript', category: 'frontend', proficiency: 78, yearsExp: 1 },
    { name: 'Tailwind CSS', iconName: 'tailwindcss', category: 'frontend', proficiency: 90, yearsExp: 2 },
    { name: 'Next.js', iconName: 'nextjs', category: 'frontend', proficiency: 70, yearsExp: 1 },
    { name: 'Node.js', iconName: 'nodejs', category: 'backend', proficiency: 85, yearsExp: 2 },
    { name: 'Express.js', iconName: 'express', category: 'backend', proficiency: 88, yearsExp: 2 },
    { name: 'REST API', iconName: 'api', category: 'backend', proficiency: 85, yearsExp: 2 },
    { name: 'MongoDB', iconName: 'mongodb', category: 'database', proficiency: 82, yearsExp: 2 },
    { name: 'Firebase', iconName: 'firebase', category: 'database', proficiency: 65, yearsExp: 1 },
    { name: 'Git & GitHub', iconName: 'git', category: 'tools', proficiency: 88, yearsExp: 2 },
    { name: 'Vercel', iconName: 'vercel', category: 'devops', proficiency: 80, yearsExp: 2 },
    { name: 'Figma', iconName: 'figma', category: 'tools', proficiency: 70, yearsExp: 1 },
  ]);

  await Experience.insertMany([
    {
      type: 'education',
      title: 'Higher Secondary (HSC)',
      company: '2nd Year Running',
      location: 'Rangpur, Bangladesh',
      startDate: '2024',
      endDate: '',
      current: true,
      description: 'Currently studying Science at the Higher Secondary level.',
    },
    {
      type: 'education',
      title: 'Secondary School Certificate (SSC)',
      company: 'Rowmari High School',
      location: 'Rowmari, Rangpur, Bangladesh',
      startDate: '2022',
      endDate: '2024',
      current: false,
      description: 'Science Group · GPA: 4.50 out of 5.00',
    },
  ]);

  await Testimonial.insertMany([
    { name: 'Md. Hasan Ali', role: 'Client', company: '', avatar: '', rating: 5, review: 'Sojib built an amazing job finder platform for us. His React skills are top-notch and he delivered everything on time. Highly recommended!', visible: true },
    { name: 'Fatema Khatun', role: 'Project Partner', company: '', avatar: '', rating: 5, review: 'Working with Sojib on the pet adoption project was a great experience. He writes clean code and has excellent problem-solving abilities.', visible: true },
    { name: 'Rakib Hasan', role: 'Fellow Developer', company: '', avatar: '', rating: 4, review: 'Sojib is a talented MERN stack developer. His understanding of fullstack architecture and attention to detail really stand out.', visible: true },
  ]);

  await Blog.insertMany([
    {
      title: 'Getting Started with MERN Stack',
      content: '<h2>Introduction</h2><p>The MERN stack is a powerful combination for building modern web applications. In this post, I will walk you through setting up your first MERN application.</p><h2>What is MERN?</h2><p>MERN stands for MongoDB, Express.js, React, and Node.js. Each technology plays a specific role in the stack.</p><h2>Setting Up Your Project</h2><p>Start by creating a new React app with Vite, set up your Express server, connect MongoDB with Mongoose, and build your first API endpoint.</p><h2>Conclusion</h2><p>The MERN stack is an excellent choice for fullstack JavaScript development.</p>',
      excerpt: 'Learn how to build your first fullstack application with MongoDB, Express, React, and Node.js from scratch.',
      coverImage: '', category: 'Development', tags: ['MERN', 'React', 'Node.js', 'MongoDB'], published: true, readTime: 5, author: 'Sojib Ahmed',
    },
    {
      title: 'Why React is My Go-To Framework',
      content: '<h2>Introduction</h2><p>React has been my primary framework for building user interfaces. Here is why I choose it for almost every project.</p><h2>Component-Based Architecture</h2><p>React\'s component model makes code reusable and maintainable. Each piece of UI is isolated and testable.</p><h2>Rich Ecosystem</h2><p>From React Router to TanStack Query, the ecosystem provides solutions for every need.</p><h2>Conclusion</h2><p>React\'s simplicity, performance, and community make it the best choice for modern web development.</p>',
      excerpt: 'Discover why React remains my top choice for building modern, scalable web applications.',
      coverImage: '', category: 'React', tags: ['React', 'JavaScript', 'Frontend'], published: true, readTime: 4, author: 'Sojib Ahmed',
    },
  ]);

  console.log('Database seeded successfully!');
  console.log('Admin login: admin@portfolio.com / admin123');
  process.exit(0);
};

seed();

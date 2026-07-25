import api from './axiosInstance';

export const adminLogin = (email: string, password: string) =>
  api.post('/auth/login', { email, password }).then(r => r.data);

export const getAdminStats = () => api.get('/admin/stats').then(r => r.data);

// Projects
export const getAdminProjects = () => api.get('/admin/projects').then(r => r.data);
export const createAdminProject = (data: any) => api.post('/admin/projects', data).then(r => r.data);
export const updateAdminProject = (id: string, data: any) => api.put(`/admin/projects/${id}`, data).then(r => r.data);
export const deleteAdminProject = (id: string) => api.delete(`/admin/projects/${id}`).then(r => r.data);

// Skills
export const getAdminSkills = () => api.get('/admin/skills').then(r => r.data);
export const createAdminSkill = (data: any) => api.post('/admin/skills', data).then(r => r.data);
export const updateAdminSkill = (id: string, data: any) => api.put(`/admin/skills/${id}`, data).then(r => r.data);
export const deleteAdminSkill = (id: string) => api.delete(`/admin/skills/${id}`).then(r => r.data);

// Experience
export const getAdminExperience = () => api.get('/admin/experience').then(r => r.data);
export const createAdminExperience = (data: any) => api.post('/admin/experience', data).then(r => r.data);
export const updateAdminExperience = (id: string, data: any) => api.put(`/admin/experience/${id}`, data).then(r => r.data);
export const deleteAdminExperience = (id: string) => api.delete(`/admin/experience/${id}`).then(r => r.data);

// Testimonials
export const getAdminTestimonials = () => api.get('/admin/testimonials').then(r => r.data);
export const createAdminTestimonial = (data: any) => api.post('/admin/testimonials', data).then(r => r.data);
export const updateAdminTestimonial = (id: string, data: any) => api.put(`/admin/testimonials/${id}`, data).then(r => r.data);
export const deleteAdminTestimonial = (id: string) => api.delete(`/admin/testimonials/${id}`).then(r => r.data);

// Blogs
export const getAdminBlogs = () => api.get('/admin/blogs').then(r => r.data);
export const createAdminBlog = (data: any) => api.post('/admin/blogs', data).then(r => r.data);
export const updateAdminBlog = (id: string, data: any) => api.put(`/admin/blogs/${id}`, data).then(r => r.data);
export const deleteAdminBlog = (id: string) => api.delete(`/admin/blogs/${id}`).then(r => r.data);

// Messages
export const getAdminMessages = () => api.get('/admin/messages').then(r => r.data);
export const markMessageRead = (id: string) => api.put(`/admin/messages/${id}`).then(r => r.data);
export const deleteAdminMessage = (id: string) => api.delete(`/admin/messages/${id}`).then(r => r.data);

// Profile
export const getAdminProfile = () => api.get('/admin/profile').then(r => r.data);
export const updateAdminProfile = (data: any) => api.put('/admin/profile', data).then(r => r.data);
export const changePassword = (data: { currentPassword: string; newPassword: string }) =>
  api.put('/admin/settings/password', data).then(r => r.data);

// Upload
export const uploadImage = (file: File) => {
  const fd = new FormData();
  fd.append('image', file);
  return api.post('/admin/upload/image', fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
};

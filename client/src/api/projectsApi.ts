import api from './axiosInstance';

export const getProjects = () => api.get('/projects').then(r => r.data);
export const getFeaturedProjects = () => api.get('/projects/featured').then(r => r.data);
export const getProjectById = (id: string) => api.get(`/projects/${id}`).then(r => r.data);

import api from './axiosInstance';

export const getBlogs = (page = 1) => api.get(`/blogs?page=${page}`).then(r => r.data);
export const getBlogBySlug = (slug: string) => api.get(`/blogs/${slug}`).then(r => r.data);

import api from './axiosInstance';

export const getSkills = () => api.get('/skills').then(r => r.data);

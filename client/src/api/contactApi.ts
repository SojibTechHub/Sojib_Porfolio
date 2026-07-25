import api from './axiosInstance';

export const submitContact = (data: { name: string; email: string; subject: string; message: string; budget?: string }) =>
  api.post('/contact', data).then(r => r.data);

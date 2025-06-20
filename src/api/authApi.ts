
import api from '../services/api';

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: { username: string; email: string; password: string }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  }
};

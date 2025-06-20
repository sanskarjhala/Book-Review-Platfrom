
import api from '../services/api';

export const userApi = {
  getUserProfile: async (userId: string) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  updateUserProfile: async (userId: string, userData: any) => {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  }
};

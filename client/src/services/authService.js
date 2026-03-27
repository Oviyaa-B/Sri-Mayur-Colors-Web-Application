import apiClient from './api';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to login' };
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  }
};

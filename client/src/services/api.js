/**
 * Centralized API Service
 * All API calls should go through this service
 */

import axios from 'axios';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const TIMEOUT = 30000; // 30 seconds

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // Handle unauthorized
        console.error('Unauthorized access');
      } else if (status === 500) {
        console.error('Server error');
      }
    } else if (error.request) {
      console.error('Network error - please check your connection');
    }
    return Promise.reject(error);
  }
);

/**
 * Inquiry API Service
 * Handles all inquiry-related API calls
 */
export const inquiryService = {
  /**
   * Create a new bulk inquiry
   * @param {Object} inquiryData - Inquiry form data
   */
  createInquiry: async (inquiryData) => {
    try {
      const response = await apiClient.post('/inquiries', inquiryData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create inquiry' };
    }
  },

  /**
   * Get all inquiries
   */
  getAllInquiries: async () => {
    try {
      const response = await apiClient.get('/inquiries');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch inquiries' };
    }
  },

  /**
   * Get single inquiry by ID
   * @param {string} id - Inquiry ID
   */
  getInquiryById: async (id) => {
    try {
      const response = await apiClient.get(`/inquiries/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch inquiry' };
    }
  },

  /**
   * Update inquiry status
   * @param {string} id - Inquiry ID
   * @param {Object} updateData - Data to update
   */
  updateInquiryStatus: async (id, updateData) => {
    try {
      const response = await apiClient.put(`/inquiries/${id}`, updateData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update inquiry' };
    }
  },

  /**
   * Delete an inquiry
   * @param {string} id - Inquiry ID
   */
  deleteInquiry: async (id) => {
    try {
      const response = await apiClient.delete(`/inquiries/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete inquiry' };
    }
  },

  /**
   * Search inquiries
   * @param {string} query - Search query
   */
  searchInquiries: async (query) => {
    try {
      const response = await apiClient.get(`/inquiries/search?q=${query}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to search inquiries' };
    }
  },
};

/**
 * Health Check Service
 */
export const healthService = {
  checkServerHealth: async () => {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Server unavailable' };
    }
  },
};

export default apiClient;


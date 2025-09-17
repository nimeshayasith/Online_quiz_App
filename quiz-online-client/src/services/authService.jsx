// src/services/authService.js
import api from './api';
import { STORAGE_KEYS } from '../utils/constants';

export const authService = {
  // Register new user
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 
                    error.response?.data || 
                    'Registration failed';
      throw new Error(message);
    }
  },

  // Login user
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      const userData = response.data;
      
      // Store user data
      this.setUserData(userData);
      
      return userData;
    } catch (error) {
      const message = error.response?.data?.message || 
                    error.response?.data || 
                    'Login failed';
      throw new Error(message);
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.QUIZ_PROGRESS);
  },

  // Get current user from storage
  getCurrentUser() {
    try {
      const userData = localStorage.getItem(STORAGE_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  // Set user data in storage
  setUserData(userData) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    if (userData.token) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, userData.token);
    }
  },

  // Get auth token
  getAuthToken() {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  // Check if user is authenticated
  isAuthenticated() {
    const user = this.getCurrentUser();
    const token = this.getAuthToken();
    return !!(user && token);
  },

  // Check if user is admin
  isAdmin() {
    const user = this.getCurrentUser();
    return user?.role === 'ADMIN';
  },

  // Check if user is student
  isStudent() {
    const user = this.getCurrentUser();
    return user?.role === 'STUDENT';
  },

  // Get all users (admin only)
  async getAllUsers() {
    try {
      const response = await api.get('/auth/users');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  },

  // Get all students
  async getAllStudents() {
    try {
      const response = await api.get('/auth/students');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch students');
    }
  },

  // Get all admins
  async getAllAdmins() {
    try {
      const response = await api.get('/auth/admins');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch admins');
    }
  },

  // Check email availability
  async checkEmailExists(email) {
    try {
      const response = await api.get(`/auth/check-email?email=${encodeURIComponent(email)}`);
      return response.data;
    } catch (error) {
      return false;
    }
  },

  // Check username availability
  async checkUsernameExists(userName) {
    try {
      const response = await api.get(`/auth/check-username?userName=${encodeURIComponent(userName)}`);
      return response.data;
    } catch (error) {
      return false;
    }
  },

  // Update user profile
  async updateProfile(userId, updateData) {
    try {
      const response = await api.put(`/auth/user/${userId}`, updateData);
      
      // Update stored user data if it's the current user
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.userId === userId) {
        this.setUserData({ ...currentUser, ...response.data });
      }
      
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update profile';
      throw new Error(message);
    }
  },

  // Delete user account
  async deleteAccount(userId) {
    try {
      await api.delete(`/auth/user/${userId}`);
      
      // If deleting current user, logout
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.userId === userId) {
        this.logout();
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete account';
      throw new Error(message);
    }
  }
};
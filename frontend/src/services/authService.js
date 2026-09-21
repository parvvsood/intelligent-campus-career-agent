import api from './api';

const TOKEN_KEY = 'campus_career_token';
const USER_KEY = 'campus_career_user';

export const authService = {
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    if (response.data?.token) {
      this.setSession(response.data.token, response.data.user);
    }
    return response.data;
  },

  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    if (response.data?.token) {
      this.setSession(response.data.token, response.data.user);
    }
    return response.data;
  },

  async getCurrentUser() {
    const token = this.getToken();
    if (!token) return null;
    try {
      const response = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data?.user) {
        this.setUser(response.data.user);
        return response.data.user;
      }
    } catch (err) {
      console.warn('Failed to fetch user session:', err);
    }
    return this.getUser();
  },

  setSession(token, user) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser() {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserSession() {
      const stored = authService.getUser();
      if (stored) {
        setUser(stored);
      }
      try {
        const freshUser = await authService.getCurrentUser();
        if (freshUser) {
          setUser(freshUser);
        }
      } catch (e) {
        console.warn('Session verification warning:', e);
      } finally {
        setLoading(false);
      }
    }
    loadUserSession();
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    authService.setUser(userData);
  };

  const logoutUser = () => {
    authService.logout();
    setUser(null);
  };

  const updateUserProfile = (updatedProfile) => {
    setUser(prev => {
      const newUser = { ...prev, ...updatedProfile };
      authService.setUser(newUser);
      return newUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUser: loginUser, logoutUser, updateUserProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { api } from '@/lib/api';

interface AuthContextType {
  isAuthenticated: boolean;
  userId: number | null;
  email: string | null;
  username: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedEmail = localStorage.getItem('userEmail');
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');

    if (token) {
      setIsAuthenticated(true);
      if (storedUserId) setUserId(parseInt(storedUserId, 10));
      if (storedEmail) setEmail(storedEmail);
      if (storedUsername) setUsername(storedUsername);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.login(email, password);
      setIsAuthenticated(true);
      setUserId(response.data.userId);
      setEmail(response.data.email);
      setUsername(response.data.username);
      
      // Store user info in localStorage
      localStorage.setItem('userEmail', response.data.email);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('userId', response.data.userId.toString());
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const logout = async () => {
    await api.logout();
    setIsAuthenticated(false);
    setUserId(null);
    setEmail(null);
    setUsername(null);
    
    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      await api.register(username, email, password);
      // Auto-login after registration
      await login(email, password);
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, email, username, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

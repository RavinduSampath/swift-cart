import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { authService, userStorage, tokenManager } from '@/services';
import type { ApiError, User } from '@/services/types';

interface AuthContextType {
  isAuthenticated: boolean;
  userId: number | null;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
  validateSession: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from storage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = userStorage.getUser<{ userId: number; username: string; email: string; role?: string }>();
        const token = tokenManager.getToken();
        
        if (storedUser && token) {
          // Optionally validate token with backend
          try {
            await authService.validateToken(token);
            setIsAuthenticated(true);
            setUserId(storedUser.userId);
            setUser({
              id: storedUser.userId,
              username: storedUser.username,
              email: storedUser.email,
              role: storedUser.role as 'USER' | 'ADMIN' | undefined,
            });
          } catch {
            // Token is invalid, clear auth
            authService.logout();
            setIsAuthenticated(false);
            setUserId(null);
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await authService.loginWithCredentials(email, password);
      
      if (response.data) {
        setIsAuthenticated(true);
        setUserId(response.data.userId);
        setUser({
          id: response.data.userId,
          username: response.data.username,
          email: response.data.email,
          role: response.data.role,
        });
      }
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Login failed');
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setIsAuthenticated(false);
    setUserId(null);
    setUser(null);
  }, []);

  const register = useCallback(async (username: string, email: string, password: string) => {
    try {
      const response = await authService.registerWithCredentials(username, email, password);
      
      if (response.data) {
        setIsAuthenticated(true);
        setUserId(response.data.userId);
        setUser({
          id: response.data.userId,
          username: response.data.username,
          email: response.data.email,
          role: response.data.role,
        });
      }
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Registration failed');
    }
  }, []);

  const validateSession = useCallback(async (): Promise<boolean> => {
    const token = tokenManager.getToken();
    if (!token) {
      return false;
    }

    try {
      await authService.validateToken(token);
      return true;
    } catch {
      logout();
      return false;
    }
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userId,
        user,
        isLoading,
        login,
        logout,
        register,
        validateSession,
      }}
    >
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

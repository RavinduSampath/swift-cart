import axios from 'axios';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import type { ApiResponse, ApiError } from './types';

// Configuration constants
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://3.109.183.201';
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

// Create axios instance with default configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY);
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      
      // Handle 401 Unauthorized - redirect to login
      if (status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        
        // Only redirect if not already on login page
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
      
      // Handle 403 Forbidden
      if (status === 403) {
        console.error('Access denied: You do not have permission to access this resource');
      }
      
      // Handle 500 Internal Server Error
      if (status >= 500) {
        console.error('Server error: Please try again later');
      }

      // Create typed error response
      const apiError: ApiError = {
        message: error.response.data?.message || error.message || 'An error occurred',
        status: status,
        errors: error.response.data?.errors,
      };
      
      return Promise.reject(apiError);
    }
    
    // Handle network errors
    if (error.request) {
      const apiError: ApiError = {
        message: 'Network error: Unable to connect to server',
        status: 0,
      };
      return Promise.reject(apiError);
    }
    
    // Handle other errors
    const apiError: ApiError = {
      message: error.message || 'An unexpected error occurred',
    };
    return Promise.reject(apiError);
  }
);

// Type-safe HTTP client wrapper
export const httpClient = {
  /**
   * GET request
   */
  get: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.get<ApiResponse<T>>(url, config);
    return response.data;
  },

  /**
   * POST request
   */
  post: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.post<ApiResponse<T>>(url, data, config);
    return response.data;
  },

  /**
   * PUT request
   */
  put: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.put<ApiResponse<T>>(url, data, config);
    return response.data;
  },

  /**
   * PATCH request
   */
  patch: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  },

  /**
   * DELETE request
   */
  delete: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.delete<ApiResponse<T>>(url, config);
    return response.data;
  },
};

// Token management utilities
export const tokenManager = {
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};

// User storage utilities
export const userStorage = {
  getUser: <T>(): T | null => {
    const userStr = localStorage.getItem(USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr) as T;
      } catch {
        return null;
      }
    }
    return null;
  },

  setUser: <T>(user: T): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser: (): void => {
    localStorage.removeItem(USER_KEY);
  },

  clearAuth: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

// Request cancellation utility
export const createCancelToken = () => {
  const controller = new AbortController();
  return {
    signal: controller.signal,
    cancel: () => controller.abort(),
  };
};

// Export axios instance for advanced usage
export { axiosInstance };
export default httpClient;

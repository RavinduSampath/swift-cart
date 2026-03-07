import { httpClient, tokenManager, userStorage } from './httpClient';
import type {
  ApiResponse,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  TokenValidationResponse,
  User,
} from './types';

export const authService = {
  /**
   * Register a new user
   */
  register: async (request: RegisterRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await httpClient.post<AuthResponse>('/auth/register', request);
    
    // Store token and user data on successful registration
    if (response.data?.token) {
      tokenManager.setToken(response.data.token);
      userStorage.setUser({
        userId: response.data.userId,
        username: response.data.username,
        email: response.data.email,
        role: response.data.role,
      });
    }
    
    return response;
  },

  /**
   * Login user
   */
  login: async (request: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await httpClient.post<AuthResponse>('/auth/login', request);
    
    // Store token and user data on successful login
    if (response.data?.token) {
      tokenManager.setToken(response.data.token);
      userStorage.setUser({
        userId: response.data.userId,
        username: response.data.username,
        email: response.data.email,
        role: response.data.role,
      });
    }
    
    return response;
  },

  /**
   * Login with email and password (convenience method)
   */
  loginWithCredentials: async (
    email: string,
    password: string
  ): Promise<ApiResponse<AuthResponse>> => {
    return authService.login({ email, password });
  },

  /**
   * Register with individual parameters (convenience method)
   */
  registerWithCredentials: async (
    username: string,
    email: string,
    password: string
  ): Promise<ApiResponse<AuthResponse>> => {
    return authService.register({ username, email, password });
  },

  /**
   * Validate JWT token
   */
  validateToken: async (token?: string): Promise<ApiResponse<TokenValidationResponse>> => {
    const tokenToValidate = token || tokenManager.getToken();
    return httpClient.get<TokenValidationResponse>(
      `/auth/validate?token=${tokenToValidate}`
    );
  },

  /**
   * Get user by ID
   */
  getUserById: async (id: number): Promise<ApiResponse<User>> => {
    return httpClient.get<User>(`/auth/${id}`);
  },

  /**
   * Logout user - clears local storage and tokens
   */
  logout: (): void => {
    userStorage.clearAuth();
  },

  /**
   * Check if user is currently authenticated
   */
  isAuthenticated: (): boolean => {
    return tokenManager.isAuthenticated();
  },

  /**
   * Get current user from storage
   */
  getCurrentUser: (): { userId: number; username: string; email: string; role?: string } | null => {
    return userStorage.getUser();
  },

  /**
   * Get current auth token
   */
  getToken: (): string | null => {
    return tokenManager.getToken();
  },

  /**
   * Refresh token if applicable (placeholder for future implementation)
   */
  refreshToken: async (): Promise<ApiResponse<AuthResponse> | null> => {
    // Backend doesn't currently support refresh tokens
    // This is a placeholder for future implementation
    const currentToken = tokenManager.getToken();
    if (!currentToken) {
      return null;
    }
    
    // For now, validate the existing token
    try {
      await authService.validateToken(currentToken);
      return null; // Token is still valid
    } catch {
      // Token is invalid, clear auth
      authService.logout();
      return null;
    }
  },
};

export default authService;

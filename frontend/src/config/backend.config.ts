const API_GATEWAY_BASE_URL = 'http://3.109.183.201';

export const BACKEND_CONFIG = {
  GATEWAY_URL: API_GATEWAY_BASE_URL,

  // All services are now routed through the Gateway
  PRODUCT_SERVICE: {
    baseUrl: `${API_GATEWAY_BASE_URL}/products`, 
    endpoints: {
      getAllProducts: '/',
      getProductById: (id: number) => `/${id}`,
      createProduct: '/',
      deleteProduct: (id: number) => `/${id}`,
    }
  },

  IDENTITY_SERVICE: {
    baseUrl: `${API_GATEWAY_BASE_URL}/auth`,
    endpoints: {
      login: '/login',
      register: '/register',
      validateToken: '/validate',
      getUserById: (id: number) => `/${id}`,
    }
  },

  CART_SERVICE: {
    baseUrl: `${API_GATEWAY_BASE_URL}/cart`,
    endpoints: {
      getCart: (userId: number) => `/${userId}`,
      addToCart: '/add',
      updateCart: '/update',
      removeFromCart: (itemId: number) => `/${itemId}`,
      clearCart: (userId: number) => `/${userId}/clear`,
    }
  },

  REVIEW_SERVICE: {
    baseUrl: `${API_GATEWAY_BASE_URL}/reviews`,
    endpoints: {
      getReviews: (productId: number) => `/product/${productId}`,
      addReview: '/',
      updateReview: (id: number) => `/${id}`,
      deleteReview: (id: number) => `/${id}`,
    }
  },

  ORDER_SERVICE: {
    baseUrl: `${API_GATEWAY_BASE_URL}/orders`,
    endpoints: {
      checkout: '/checkout',
      getOrderDetails: (orderId: number) => `/${orderId}`,
    }
  }
};

// API Request/Response Interceptors
export const APIHeaders = {
  getHeaders: (token?: string) => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }
};

export const API_TIMEOUT = 30000;

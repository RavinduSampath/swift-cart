// Mock API Service - Frontend Only (No Backend Required)
import {
  mockProducts,
  getStoredCart,
  saveCart,
  getStoredUser,
  saveUser,
  clearUser,
  getStoredReviews,
  saveReviews,
  type Product,
  type Review,
  type CartItem
} from './mockData';

// Re-export types
export type { Product, Review, CartItem } from './mockData';

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  totalPrice: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface AuthResponse {
  token: string;
  userId: number;
  username: string;
  email: string;
}

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API Service
class ApiService {
  // Product APIs
  async getAllProducts(): Promise<ApiResponse<Product[]>> {
    await delay();
    return {
      data: mockProducts,
      message: 'Products fetched successfully',
      success: true
    };
  }

  async getProductById(id: number): Promise<ApiResponse<Product>> {
    await delay();
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return {
      data: product,
      message: 'Product fetched successfully',
      success: true
    };
  }

  // Cart APIs
  async getCart(userId: number): Promise<ApiResponse<Cart>> {
    await delay();
    const items = getStoredCart();
    const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    return {
      data: {
        id: 1,
        userId,
        items,
        totalPrice
      },
      message: 'Cart fetched successfully',
      success: true
    };
  }

  async addToCart(
    userId: number,
    productId: number,
    quantity: number
  ): Promise<ApiResponse<Cart>> {
    await delay();
    const cart = getStoredCart();
    const product = mockProducts.find(p => p.id === productId);
    
    if (!product) {
      throw new Error('Product not found');
    }

    const existingItemIndex = cart.findIndex(item => item.product.id === productId);
    
    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({
        id: Date.now(),
        product,
        quantity
      });
    }

    saveCart(cart);
    const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return {
      data: {
        id: 1,
        userId,
        items: cart,
        totalPrice
      },
      message: 'Product added to cart successfully',
      success: true
    };
  }

  async updateCartItemQuantity(
    userId: number,
    itemId: number,
    quantity: number
  ): Promise<ApiResponse<Cart>> {
    await delay();
    const cart = getStoredCart();
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex >= 0) {
      if (quantity <= 0) {
        cart.splice(itemIndex, 1);
      } else {
        cart[itemIndex].quantity = quantity;
      }
    }

    saveCart(cart);
    const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return {
      data: {
        id: 1,
        userId,
        items: cart,
        totalPrice
      },
      message: 'Cart updated successfully',
      success: true
    };
  }

  async removeFromCart(userId: number, itemId: number): Promise<ApiResponse<Cart>> {
    await delay();
    const cart = getStoredCart().filter(item => item.id !== itemId);
    saveCart(cart);
    const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return {
      data: {
        id: 1,
        userId,
        items: cart,
        totalPrice
      },
      message: 'Item removed from cart',
      success: true
    };
  }

  async clearCart(_userId: number): Promise<ApiResponse<void>> {
    await delay();
    saveCart([]);
    return {
      data: undefined as any,
      message: 'Cart cleared successfully',
      success: true
    };
  }

  // Review APIs
  async getReviewsByProduct(productId: number): Promise<ApiResponse<Review[]>> {
    await delay();
    const allReviews = getStoredReviews();
    const productReviews = allReviews.filter(r => r.productId === productId);
    
    return {
      data: productReviews,
      message: 'Reviews fetched successfully',
      success: true
    };
  }

  async addReview(
    productId: number,
    _userId: number,
    rating: number,
    comment: string
  ): Promise<ApiResponse<Review>> {
    await delay();
    const allReviews = getStoredReviews();
    const user = getStoredUser();
    
    const newReview: Review = {
      id: Date.now(),
      productId,
      userName: user?.username || 'Anonymous',
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };

    allReviews.push(newReview);
    saveReviews(allReviews);

    return {
      data: newReview,
      message: 'Review added successfully',
      success: true
    };
  }

  // Auth APIs
  async login(email: string, _password: string): Promise<ApiResponse<AuthResponse>> {
    await delay(500);
    
    // Mock login - accept any email/password for demo
    const mockUser = {
      token: `mock_token_${Date.now()}`,
      userId: Math.floor(Math.random() * 1000),
      username: email.split('@')[0],
      email
    };

    saveUser(mockUser);

    return {
      data: mockUser,
      message: 'Login successful',
      success: true
    };
  }

  async register(
    username: string,
    email: string,
    _password: string
  ): Promise<ApiResponse<AuthResponse>> {
    await delay(500);
    
    // Mock registration - accept any credentials for demo
    const mockUser = {
      token: `mock_token_${Date.now()}`,
      userId: Math.floor(Math.random() * 1000),
      username,
      email
    };

    saveUser(mockUser);

    return {
      data: mockUser,
      message: 'Registration successful',
      success: true
    };
  }

  async logout(): Promise<void> {
    await delay(200);
    clearUser();
  }
}

export const api = new ApiService();

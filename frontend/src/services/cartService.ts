import { httpClient, createCancelToken } from './httpClient';
import type { ApiResponse, Cart, AddToCartRequest, UpdateCartItemRequest } from './types';

export const cartService = {
  /**
   * Get user's cart
   */
  getCart: async (userId: number, signal?: AbortSignal): Promise<ApiResponse<Cart>> => {
    return httpClient.get<Cart>(`/cart/${userId}`, { signal });
  },

  /**
   * Add item to cart
   */
  addToCart: async (request: AddToCartRequest): Promise<ApiResponse<Cart>> => {
    return httpClient.post<Cart>('/cart/add', request);
  },

  /**
   * Add item to cart with individual parameters (convenience method)
   */
  addItemToCart: async (
    userId: number,
    productId: number,
    quantity: number = 1
  ): Promise<ApiResponse<Cart>> => {
    return cartService.addToCart({ userId, productId, quantity });
  },

  /**
   * Update cart item quantity
   */
  updateCartItemQuantity: async (
    request: UpdateCartItemRequest
  ): Promise<ApiResponse<Cart>> => {
    return httpClient.put<Cart>('/cart/update', request);
  },

  /**
   * Remove item from cart
   */
  removeFromCart: async (
    userId: number,
    itemId: number
  ): Promise<ApiResponse<Cart>> => {
    return httpClient.delete<Cart>(`/cart/${userId}/item/${itemId}`);
  },

  /**
   * Clear entire cart
   */
  clearCart: async (userId: number): Promise<ApiResponse<void>> => {
    return httpClient.delete<void>(`/cart/${userId}/clear`);
  },

  /**
   * Get cart item count
   */
  getCartItemCount: async (userId: number): Promise<number> => {
    try {
      const response = await cartService.getCart(userId);
      return response.data?.items?.reduce((count, item) => count + item.quantity, 0) ?? 0;
    } catch {
      return 0;
    }
  },

  /**
   * Get cart total price
   */
  getCartTotal: async (userId: number): Promise<number> => {
    try {
      const response = await cartService.getCart(userId);
      return response.data?.totalPrice ?? 0;
    } catch {
      return 0;
    }
  },

  /**
   * Create a cancel token for request cancellation
   */
  createCancelToken,
};

export default cartService;

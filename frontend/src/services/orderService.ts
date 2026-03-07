import { httpClient, createCancelToken } from './httpClient';
import type {
  ApiResponse,
  Order,
  PlaceOrderRequest,
  ShippingAddress,
} from './types';

export const orderService = {
  /**
   * Place a new order (checkout)
   */
  checkout: async (request: PlaceOrderRequest): Promise<ApiResponse<Order>> => {
    return httpClient.post<Order>('/orders/checkout', request);
  },

  /**
   * Place order with individual parameters (convenience method)
   */
  placeOrder: async (
    userId: number,
    cartId: number,
    shippingAddress: ShippingAddress,
    paymentMethod: string = 'CARD'
  ): Promise<ApiResponse<Order>> => {
    return orderService.checkout({
      userId,
      cartId,
      shippingAddress,
      paymentMethod,
    });
  },

  /**
   * Get order by ID
   */
  getOrderById: async (
    orderId: number,
    signal?: AbortSignal
  ): Promise<ApiResponse<Order>> => {
    return httpClient.get<Order>(`/orders/${orderId}`, { signal });
  },

  /**
   * Get all orders for a user
   */
  getUserOrders: async (
    userId: number,
    signal?: AbortSignal
  ): Promise<ApiResponse<Order[]>> => {
    return httpClient.get<Order[]>(`/orders/user/${userId}`, { signal });
  },

  /**
   * Get order history with pagination (if backend supports)
   */
  getOrderHistory: async (
    userId: number,
    page: number = 0,
    size: number = 10,
    signal?: AbortSignal
  ): Promise<ApiResponse<{ content: Order[]; totalPages: number; totalElements: number }>> => {
    return httpClient.get(
      `/orders/user/${userId}?page=${page}&size=${size}`,
      { signal }
    );
  },

  /**
   * Cancel an order (if backend supports)
   */
  cancelOrder: async (orderId: number): Promise<ApiResponse<Order>> => {
    return httpClient.put<Order>(`/orders/${orderId}/cancel`, {});
  },

  /**
   * Get order tracking info (if backend supports)
   */
  getOrderTracking: async (
    orderId: number,
    signal?: AbortSignal
  ): Promise<ApiResponse<{ status: string; trackingNumber?: string; estimatedDelivery?: string }>> => {
    return httpClient.get(`/orders/${orderId}/tracking`, { signal });
  },

  /**
   * Create a cancel token for request cancellation
   */
  createCancelToken,
};

export default orderService;

import { httpClient, createCancelToken } from './httpClient';
import type {
  ApiResponse,
  PaymentIntent,
  Payment,
  CreatePaymentIntentRequest,
  ProcessPaymentRequest,
} from './types';

export const paymentService = {
  /**
   * Create a Stripe payment intent
   */
  createPaymentIntent: async (
    request: CreatePaymentIntentRequest
  ): Promise<ApiResponse<PaymentIntent>> => {
    return httpClient.post<PaymentIntent>('/payments/create-intent', request);
  },

  /**
   * Create payment intent with individual parameters (convenience method)
   */
  createIntent: async (
    orderId: number,
    amount: number,
    currency: string = 'USD'
  ): Promise<ApiResponse<PaymentIntent>> => {
    return paymentService.createPaymentIntent({
      orderId,
      amount,
      currency,
    });
  },

  /**
   * Process a payment
   */
  processPayment: async (
    request: ProcessPaymentRequest
  ): Promise<ApiResponse<Payment>> => {
    return httpClient.post<Payment>('/payments/process', request);
  },

  /**
   * Process payment with individual parameters (convenience method)
   */
  confirmPayment: async (
    paymentIntentId: string,
    paymentMethodId: string
  ): Promise<ApiResponse<Payment>> => {
    return paymentService.processPayment({
      paymentIntentId,
      paymentMethodId,
    });
  },

  /**
   * Get payment by order ID
   */
  getPaymentByOrderId: async (
    orderId: number,
    signal?: AbortSignal
  ): Promise<ApiResponse<Payment>> => {
    return httpClient.get<Payment>(`/payments/order/${orderId}`, { signal });
  },

  /**
   * Get payment by ID
   */
  getPaymentById: async (
    paymentId: number,
    signal?: AbortSignal
  ): Promise<ApiResponse<Payment>> => {
    return httpClient.get<Payment>(`/payments/${paymentId}`, { signal });
  },

  /**
   * Get all payments for a user (if backend supports)
   */
  getUserPayments: async (
    userId: number,
    signal?: AbortSignal
  ): Promise<ApiResponse<Payment[]>> => {
    return httpClient.get<Payment[]>(`/payments/user/${userId}`, { signal });
  },

  /**
   * Refund a payment (if backend supports)
   */
  refundPayment: async (
    paymentId: number,
    amount?: number
  ): Promise<ApiResponse<Payment>> => {
    return httpClient.post<Payment>(`/payments/${paymentId}/refund`, {
      amount,
    });
  },

  /**
   * Create a cancel token for request cancellation
   */
  createCancelToken,
};

export default paymentService;

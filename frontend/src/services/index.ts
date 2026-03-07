// Export all services
export { authService } from './authService';
export { productService } from './productService';
export { cartService } from './cartService';
export { orderService } from './orderService';
export { reviewService } from './reviewService';
export { paymentService } from './paymentService';

// Export HTTP client and utilities
export {
  httpClient,
  tokenManager,
  userStorage,
  createCancelToken,
  axiosInstance,
} from './httpClient';

// Export all types
export type {
  // API Types
  ApiResponse,
  ApiError,
  
  // User & Auth Types
  User,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  TokenValidationResponse,
  
  // Product Types
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  
  // Cart Types
  CartItem,
  Cart,
  AddToCartRequest,
  UpdateCartItemRequest,
  
  // Order Types
  OrderItem,
  Order,
  OrderStatus,
  ShippingAddress,
  PlaceOrderRequest,
  
  // Review Types
  Review,
  CreateReviewRequest,
  UpdateReviewRequest,
  
  // Payment Types
  PaymentIntent,
  PaymentStatus,
  Payment,
  CreatePaymentIntentRequest,
  ProcessPaymentRequest,
  
  // Shipping Types
  ShippingInfo,
  ShippingStatus,
  
  // Notification Types
  Notification,
  NotificationType,
  
  // Inventory Types
  InventoryItem,
  InventoryUpdateRequest,
  
  // Warranty Types
  Warranty,
  WarrantyStatus,
  WarrantyType,
  WarrantyClaimRequest,
} from './types';

// Default export for convenience
import { authService } from './authService';
import { productService } from './productService';
import { cartService } from './cartService';
import { orderService } from './orderService';
import { reviewService } from './reviewService';
import { paymentService } from './paymentService';

export default {
  auth: authService,
  products: productService,
  cart: cartService,
  orders: orderService,
  reviews: reviewService,
  payments: paymentService,
};

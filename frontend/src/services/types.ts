// API Response wrapper matching backend format
export interface ApiResponse<T> {
  message: string;
  data: T;
  success?: boolean;
}

// Error response from backend
export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

// ============ User & Auth Types ============

export interface User {
  id: number;
  username: string;
  email: string;
  role?: 'USER' | 'ADMIN';
  createdAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userId: number;
  username: string;
  email: string;
  role?: 'USER' | 'ADMIN';
}

export interface TokenValidationResponse {
  valid: boolean;
  userId?: number;
  username?: string;
  email?: string;
}

// ============ Product Types ============

export interface Product {
  id: number;
  brand: string;
  modelName: string;
  referenceNumber: string;
  movementType: string;
  caseSizeMm: number;
  caseMaterial: string;
  strapMaterial: string;
  waterResistance: string;
  price: number;
  stock: number;
  description: string;
  imageUrls: string[];
  rating: number;
  reviewCount: number;
}

export interface CreateProductRequest {
  brand: string;
  modelName: string;
  referenceNumber: string;
  movementType: string;
  caseSizeMm: number;
  caseMaterial: string;
  strapMaterial: string;
  waterResistance: string;
  price: number;
  stock: number;
  description: string;
  imageUrls: string[];
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: number;
}

// ============ Cart Types ============

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  totalPrice: number;
}

export interface AddToCartRequest {
  userId: number;
  productId: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  userId: number;
  itemId: number;
  quantity: number;
}

// ============ Order Types ============

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  paymentId?: number;
  createdAt: string;
  updatedAt?: string;
}

export type OrderStatus = 
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface PlaceOrderRequest {
  userId: number;
  cartId: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}

// ============ Review Types ============

export interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateReviewRequest {
  productId: number;
  userId: number;
  rating: number;
  comment: string;
}

export interface UpdateReviewRequest {
  rating?: number;
  comment?: string;
}

// ============ Payment Types ============

export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
}

export type PaymentStatus = 
  | 'PENDING'
  | 'PROCESSING'
  | 'SUCCEEDED'
  | 'FAILED'
  | 'CANCELLED'
  | 'REFUNDED';

export interface Payment {
  id: number;
  orderId: number;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: string;
  stripePaymentIntentId?: string;
  createdAt: string;
}

export interface CreatePaymentIntentRequest {
  orderId: number;
  amount: number;
  currency?: string;
}

export interface ProcessPaymentRequest {
  paymentIntentId: string;
  paymentMethodId: string;
}

// ============ Shipping Types ============

export interface ShippingInfo {
  id: number;
  orderId: number;
  carrier: string;
  trackingNumber: string;
  status: ShippingStatus;
  estimatedDelivery?: string;
  shippedAt?: string;
  deliveredAt?: string;
}

export type ShippingStatus = 
  | 'PREPARING'
  | 'SHIPPED'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'FAILED';

// ============ Notification Types ============

export interface Notification {
  id: number;
  userId: number;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export type NotificationType = 
  | 'ORDER_PLACED'
  | 'ORDER_SHIPPED'
  | 'ORDER_DELIVERED'
  | 'PAYMENT_RECEIVED'
  | 'REVIEW_RESPONSE'
  | 'PROMOTION';

// ============ Inventory Types ============

export interface InventoryItem {
  id: number;
  productId: number;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  lastUpdated: string;
}

export interface InventoryUpdateRequest {
  productId: number;
  quantity: number;
  operation: 'ADD' | 'SUBTRACT' | 'SET';
}

// ============ Warranty Types ============

export interface Warranty {
  id: number;
  orderId: number;
  productId: number;
  startDate: string;
  endDate: string;
  status: WarrantyStatus;
  type: WarrantyType;
}

export type WarrantyStatus = 'ACTIVE' | 'EXPIRED' | 'CLAIMED' | 'VOID';
export type WarrantyType = 'STANDARD' | 'EXTENDED' | 'PREMIUM';

export interface WarrantyClaimRequest {
  warrantyId: number;
  reason: string;
  description: string;
}

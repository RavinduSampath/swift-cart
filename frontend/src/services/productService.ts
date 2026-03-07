import { httpClient, createCancelToken } from './httpClient';
import type {
  ApiResponse,
  Product,
  CreateProductRequest,
} from './types';

export const productService = {
  /**
   * Get all products
   */
  getAllProducts: async (signal?: AbortSignal): Promise<ApiResponse<Product[]>> => {
    return httpClient.get<Product[]>('/products', { signal });
  },

  /**
   * Get product by ID
   */
  getProductById: async (
    id: number,
    signal?: AbortSignal
  ): Promise<ApiResponse<Product>> => {
    return httpClient.get<Product>(`/products/${id}`, { signal });
  },

  /**
   * Create a new product (Admin only)
   */
  createProduct: async (
    request: CreateProductRequest
  ): Promise<ApiResponse<Product>> => {
    return httpClient.post<Product>('/products', request);
  },

  /**
   * Update an existing product (Admin only)
   */
  updateProduct: async (
    id: number,
    request: Partial<CreateProductRequest>
  ): Promise<ApiResponse<Product>> => {
    return httpClient.put<Product>(`/products/${id}`, request);
  },

  /**
   * Delete a product (Admin only)
   */
  deleteProduct: async (id: number): Promise<ApiResponse<void>> => {
    return httpClient.delete<void>(`/products/${id}`);
  },

  /**
   * Search products by query (if backend supports)
   */
  searchProducts: async (
    query: string,
    signal?: AbortSignal
  ): Promise<ApiResponse<Product[]>> => {
    return httpClient.get<Product[]>(`/products/search?q=${encodeURIComponent(query)}`, {
      signal,
    });
  },

  /**
   * Get products by brand (if backend supports)
   */
  getProductsByBrand: async (
    brand: string,
    signal?: AbortSignal
  ): Promise<ApiResponse<Product[]>> => {
    return httpClient.get<Product[]>(
      `/products/brand/${encodeURIComponent(brand)}`,
      { signal }
    );
  },

  /**
   * Get products with pagination (if backend supports)
   */
  getProductsPaginated: async (
    page: number = 0,
    size: number = 10,
    signal?: AbortSignal
  ): Promise<ApiResponse<{ content: Product[]; totalPages: number; totalElements: number }>> => {
    return httpClient.get(`/products?page=${page}&size=${size}`, { signal });
  },

  /**
   * Create a cancel token for request cancellation
   */
  createCancelToken,
};

export default productService;

import { httpClient, createCancelToken } from './httpClient';
import type {
  ApiResponse,
  Review,
  CreateReviewRequest,
  UpdateReviewRequest,
} from './types';

export const reviewService = {
  /**
   * Get all reviews for a product
   */
  getProductReviews: async (
    productId: number,
    signal?: AbortSignal
  ): Promise<ApiResponse<Review[]>> => {
    return httpClient.get<Review[]>(`/reviews/product/${productId}`, { signal });
  },

  /**
   * Get all reviews by a user
   */
  getUserReviews: async (
    userId: number,
    signal?: AbortSignal
  ): Promise<ApiResponse<Review[]>> => {
    return httpClient.get<Review[]>(`/reviews/user/${userId}`, { signal });
  },

  /**
   * Get a specific review by ID
   */
  getReviewById: async (
    reviewId: number,
    signal?: AbortSignal
  ): Promise<ApiResponse<Review>> => {
    return httpClient.get<Review>(`/reviews/${reviewId}`, { signal });
  },

  /**
   * Create a new review
   */
  createReview: async (request: CreateReviewRequest): Promise<ApiResponse<Review>> => {
    return httpClient.post<Review>('/reviews', request);
  },

  /**
   * Create review with individual parameters (convenience method)
   */
  addReview: async (
    productId: number,
    userId: number,
    rating: number,
    comment: string
  ): Promise<ApiResponse<Review>> => {
    return reviewService.createReview({
      productId,
      userId,
      rating,
      comment,
    });
  },

  /**
   * Update an existing review
   */
  updateReview: async (
    reviewId: number,
    request: UpdateReviewRequest
  ): Promise<ApiResponse<Review>> => {
    return httpClient.put<Review>(`/reviews/${reviewId}`, request);
  },

  /**
   * Delete a review
   */
  deleteReview: async (reviewId: number): Promise<ApiResponse<void>> => {
    return httpClient.delete<void>(`/reviews/${reviewId}`);
  },

  /**
   * Get average rating for a product (calculated client-side)
   */
  getProductAverageRating: async (productId: number): Promise<number> => {
    try {
      const response = await reviewService.getProductReviews(productId);
      const reviews = response.data || [];
      if (reviews.length === 0) return 0;
      
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      return totalRating / reviews.length;
    } catch {
      return 0;
    }
  },

  /**
   * Create a cancel token for request cancellation
   */
  createCancelToken,
};

export default reviewService;

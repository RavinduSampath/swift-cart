import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Star, ShoppingCart, ChevronLeft, Clock, Package } from 'lucide-react';
import { api } from '@/lib/api';
import type { Product, Review } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userId, isAuthenticated } = useAuth();
  const toast = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    if (id) {
      loadProductDetails(parseInt(id));
      loadReviews(parseInt(id));
    }
  }, [id]);

  const loadProductDetails = async (productId: number) => {
    try {
      const response = await api.getProductById(productId);
      setProduct(response.data);
    } catch (error) {
      console.error('Failed to load product:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async (productId: number) => {
    try {
      const response = await api.getReviewsByProduct(productId);
      setReviews(response.data || []);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    }
  };

  const handleAddToCart = async () => {
    if (!userId || !product) {
      toast.warning('Please login', 'You need to login to add items to cart');
      return;
    }
    try {
      await api.addToCart(userId, product.id, quantity);
      toast.success('Added to cart!', `${quantity} item(s) added to your cart`);
      setTimeout(() => navigate('/cart'), 1000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add', 'Could not add product to cart');
    }
  };

  const handleSubmitReview = async () => {
    if (!userId || !product || !isAuthenticated) {
      toast.warning('Please login', 'You need to login to submit a review');
      return;
    }
    if (!newReview.comment.trim()) {
      toast.warning('Add a comment', 'Please write a review comment');
      return;
    }
    try {
      await api.addReview(product.id, userId, newReview.rating, newReview.comment);
      toast.success('Review submitted!', 'Thank you for your review');
      setNewReview({ rating: 5, comment: '' });
      loadReviews(product.id);
    } catch (error) {
      console.error('Failed to submit review:', error);
      toast.error('Failed to submit', 'Could not submit your review');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/products')}
            className="text-blue-600 hover:text-blue-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const images = product.imageUrls.length > 0
    ? product.imageUrls
    : ['https://via.placeholder.com/600x600?text=Watch'];

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/products')}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
      >
        <ChevronLeft className="w-5 h-5" />
        Back to Products
      </button>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="bg-slate-100 rounded-lg overflow-hidden mb-4">
            <img
              src={images[selectedImage]}
              alt={product.modelName}
              className="w-full h-96 object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    selectedImage === idx ? 'border-blue-600' : 'border-slate-200'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <div className="mb-4">
            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded">
              {product.brand}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {product.brand} {product.modelName}
          </h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(Number(averageRating))
                      ? 'text-yellow-400 fill-current'
                      : 'text-slate-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-slate-600">
                {averageRating} ({reviews.length} reviews)
              </span>
            </div>
          </div>

          <p className="text-4xl font-bold text-slate-900 mb-6">
            ${product.price.toLocaleString()}
          </p>

          {/* Specifications */}
          <div className="bg-slate-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-lg mb-4">Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600">Reference</p>
                <p className="font-semibold">{product.referenceNumber}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Movement</p>
                <p className="font-semibold">{product.movementType}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Case Size</p>
                <p className="font-semibold">{product.caseSizeMm}mm</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Case Material</p>
                <p className="font-semibold">{product.caseMaterial}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Strap Material</p>
                <p className="font-semibold">{product.strapMaterial}</p>
              </div>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <div>
              <label className="text-sm text-slate-600 block mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-20 border border-slate-300 rounded-md px-3 py-2"
              />
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          </div>

          {/* Additional Info */}
          <div className="space-y-3 border-t pt-6">
            <div className="flex items-center gap-3 text-slate-600">
              <Package className="w-5 h-5" />
              <span>Free shipping on orders over $500</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <Clock className="w-5 h-5" />
              <span>2-year international warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Customer Reviews</h2>

        {/* Add Review Form */}
        {isAuthenticated && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="font-semibold text-lg mb-4">Write a Review</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Rating
              </label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                className="border border-slate-300 rounded-md px-3 py-2"
              >
                {[5, 4, 3, 2, 1].map((num) => (
                  <option key={num} value={num}>
                    {num} Star{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Comment
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="w-full border border-slate-300 rounded-md px-3 py-2"
                rows={4}
                placeholder="Share your experience with this watch..."
              />
            </div>
            <button
              onClick={handleSubmitReview}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Submit Review
            </button>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-slate-600">No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-slate-900">
                      {review.userName || 'Anonymous'}
                    </span>
                  </div>
                  <span className="text-sm text-slate-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-slate-700">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

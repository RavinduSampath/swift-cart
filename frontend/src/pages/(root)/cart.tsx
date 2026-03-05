import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { api } from '@/lib/api';
import type { Cart as CartType, CartItem } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

const Cart = () => {
  const navigate = useNavigate();
  const { userId, isAuthenticated } = useAuth();
  const toast = useToast();
  const [cart, setCart] = useState<CartType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !userId) {
      navigate('/login');
      return;
    }
    loadCart();
  }, [userId, isAuthenticated]);

  const loadCart = async () => {
    if (!userId) return;
    try {
      const response = await api.getCart(userId);
      setCart(response.data);
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearCart = async () => {
    if (!userId) return;
    if (!confirm('Are you sure you want to clear your cart?')) return;

    try {
      await api.clearCart(userId);
      setCart(null);
      toast.success('Cart cleared', 'All items removed from your cart');
    } catch (error) {
      console.error('Failed to clear cart:', error);
      toast.error('Failed to clear cart', 'Please try again.');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const isEmpty = !cart || !cart.items || cart.items.length === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Shopping Cart</h1>
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Continue Shopping
        </button>
      </div>

      {isEmpty ? (
        /* Empty Cart */
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <ShoppingBag className="w-24 h-24 mx-auto text-slate-300 mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
          <p className="text-slate-600 mb-6">Add some watches to get started!</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Browse Watches
          </button>
        </div>
      ) : (
        /* Cart with Items */
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item: CartItem) => {
              const product = item.product;
              if (!product) return null;

              const imageUrl = product.imageUrls && product.imageUrls[0]
                ? product.imageUrls[0]
                : 'https://via.placeholder.com/200x200?text=Watch';

              return (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="w-32 h-32 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={imageUrl}
                        alt={product.modelName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-bold text-lg text-slate-900 mb-1">
                            {product.brand} {product.modelName}
                          </h3>
                          <p className="text-sm text-slate-600 mb-2">
                            Ref: {product.referenceNumber}
                          </p>
                          <div className="flex gap-2 mb-3">
                            <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">
                              {product.movementType}
                            </span>
                            <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">
                              {product.caseSizeMm}mm
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-slate-900">
                            ${product.price.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-slate-600">Quantity:</span>
                          <span className="font-semibold">{item.quantity}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-semibold text-slate-900">
                            Subtotal: ${(product.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${cart.totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax</span>
                  <span className="font-semibold">
                    ${(cart.totalPrice * 0.1).toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-3 mt-3">
                  <div className="flex justify-between text-lg font-bold text-slate-900">
                    <span>Total</span>
                    <span>${(cart.totalPrice * 1.1).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold mb-3 transition"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={handleClearCart}
                className="w-full flex items-center justify-center gap-2 border-2 border-red-200 text-red-600 hover:bg-red-50 py-3 rounded-lg font-semibold transition"
              >
                <Trash2 className="w-5 h-5" />
                Clear Cart
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-slate-200 space-y-2 text-sm text-slate-600">
                <p className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Secure checkout
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Free shipping over $500
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  2-year warranty
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

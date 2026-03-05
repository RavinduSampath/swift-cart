import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Filter } from 'lucide-react';
import { api } from '@/lib/api';
import type { Product } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string>(searchParams.get('brand') || '');
  const [priceRange, setPriceRange] = useState<string>('');
  const [movement, setMovement] = useState<string>('');
  const { userId } = useAuth();
  const toast = useToast();

  // Sync brand from URL query param
  useEffect(() => {
    const brandParam = searchParams.get('brand') || '';
    setSelectedBrand(brandParam);
  }, [searchParams]);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedBrand, priceRange, movement, products]);

  const loadProducts = async () => {
    try {
      const response = await api.getAllProducts();
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (selectedBrand) {
      filtered = filtered.filter(p => p.brand === selectedBrand);
    }

    if (movement) {
      filtered = filtered.filter(p => p.movementType === movement);
    }

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(p => {
        if (max) {
          return p.price >= min && p.price <= max;
        }
        return p.price >= min;
      });
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = async (productId: number) => {
    if (!userId) {
      toast.warning('Please login', 'You need to login to add items to cart');
      return;
    }
    try {
      await api.addToCart(userId, productId, 1);
      toast.success('Added to cart!', 'Product added to your cart successfully');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add', 'Could not add product to cart');
    }
  };

  const clearFilters = () => {
    setSelectedBrand('');
    setPriceRange('');
    setMovement('');
  };

  // Get unique brands
  const brands = Array.from(new Set(products.map(p => p.brand)));
  const movements = Array.from(new Set(products.map(p => p.movementType)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Luxury Watches</h1>
        <p className="text-slate-600">Discover our complete collection of premium timepieces</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </h2>
              {(selectedBrand || priceRange || movement) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-slate-900 mb-3">Brand</h3>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-slate-900 mb-3">Price Range</h3>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Prices</option>
                <option value="0-1000">Under $1,000</option>
                <option value="1000-5000">$1,000 - $5,000</option>
                <option value="5000-10000">$5,000 - $10,000</option>
                <option value="10000-999999">$10,000+</option>
              </select>
            </div>

            {/* Movement Type Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-slate-900 mb-3">Movement</h3>
              <select
                value={movement}
                onChange={(e) => setMovement(e.target.value)}
                className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                {movements.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                Showing <span className="font-semibold">{filteredProducts.length}</span> of {products.length} watches
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-slate-600">Loading watches...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-xl text-slate-600">No watches found matching your filters</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;

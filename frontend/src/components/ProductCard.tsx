import { Link } from 'react-router';
import { ShoppingCart, Star } from 'lucide-react';
import type { Product } from '@/lib/api';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: number) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const imageUrl = product.imageUrls && product.imageUrls.length > 0
    ? product.imageUrls[0]
    : 'https://via.placeholder.com/400x400?text=Watch';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/products/${product.id}`}>
        <div className="relative h-64 overflow-hidden bg-slate-100">
          <img
            src={imageUrl}
            alt={product.modelName}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {product.brand}
          </div>
        </div>
      </Link>

      <div className="p-5">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-bold text-slate-900 hover:text-blue-600 transition mb-1">
            {product.brand} {product.modelName}
          </h3>
        </Link>
        
        <p className="text-sm text-slate-600 mb-2">Ref: {product.referenceNumber}</p>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">
            {product.movementType}
          </span>
          <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">
            {product.caseSizeMm}mm
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-slate-900">
              ${product.price.toLocaleString()}
            </p>
            <div className="flex items-center mt-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-slate-600 ml-1">4.8 (24)</span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              onAddToCart?.(product.id);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
            title="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

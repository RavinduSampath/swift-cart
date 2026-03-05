import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowRight,
  Shield,
  Truck,
  Clock,
  Star,
  Award,
  Gem,
  Eye,
  ChevronRight,
} from 'lucide-react';
import { api } from '@/lib/api';
import type { Product } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth();
  const toast = useToast();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await api.getAllProducts();
      const all = response.data;
      setFeaturedProducts(all.slice(0, 6));
      setNewArrivals(all.slice(6, 10));
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
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

  const brands = [
    'Rolex',
    'Omega',
    'TAG Heuer',
    'Seiko',
    'Cartier',
    'Breitling',
    'IWC',
    'Patek Philippe',
  ];

  return (
    <div className="overflow-hidden">
      {/* ───────────────────── HERO ───────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-slate-950 text-white">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1920&h=1080&fit=crop&q=80"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-500/10 text-amber-400 rounded-full px-4 py-1.5 text-sm font-medium backdrop-blur-sm animate-fade-in">
              <Gem className="w-4 h-4" />
              Est. 2024 — Trusted by 50,000+ collectors
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
              The Art of
              <span className="block bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
                Fine Horology
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-lg leading-relaxed">
              Explore an exclusive selection of the world's most sought-after timepieces — each one authenticated, hand-inspected, and delivered with white-glove service.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/products"
                className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
              >
                Explore Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="group border-2 border-white/20 hover:border-white/60 backdrop-blur-sm px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-2"
              >
                Our Story
                <ChevronRight className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>

            {/* Trust stats */}
            <div className="flex gap-8 pt-4">
              {[
                { label: 'Watches Sold', value: '12K+' },
                { label: 'Happy Clients', value: '50K+' },
                { label: 'Brands', value: '20+' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/20 to-blue-500/20 rounded-full blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=600&fit=crop&q=80"
                alt="Luxury Watch"
                className="relative w-[440px] h-[440px] object-cover rounded-2xl shadow-2xl ring-1 ring-white/10"
              />
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-5 py-4 shadow-2xl">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Starting From</p>
                <p className="text-2xl font-bold text-amber-400">$2,499</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* ───────────────────── BRAND MARQUEE ───────────────────── */}
      <section className="py-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center flex-wrap gap-x-12 gap-y-4">
            {brands.map((brand) => (
              <Link
                key={brand}
                to={`/products?brand=${encodeURIComponent(brand)}`}
                className="text-lg font-semibold tracking-widest text-slate-400 uppercase select-none hover:text-amber-600 transition-colors duration-300"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── VALUE PROPS ───────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: 'Authenticity Certified',
                desc: 'Every piece verified by Swiss-trained horologists',
                gradient: 'from-blue-500 to-blue-700',
                bg: 'bg-blue-50',
              },
              {
                icon: Truck,
                title: 'White-Glove Delivery',
                desc: 'Free insured shipping on all orders over $500',
                gradient: 'from-emerald-500 to-emerald-700',
                bg: 'bg-emerald-50',
              },
              {
                icon: Award,
                title: '2-Year Warranty',
                desc: 'Comprehensive international coverage included',
                gradient: 'from-amber-500 to-amber-700',
                bg: 'bg-amber-50',
              },
              {
                icon: Star,
                title: 'Concierge Support',
                desc: 'Dedicated specialists available around the clock',
                gradient: 'from-violet-500 to-violet-700',
                bg: 'bg-violet-50',
              },
            ].map(({ icon: Icon, title, desc, gradient, bg }) => (
              <div
                key={title}
                className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 hover:border-slate-200 hover:-translate-y-1"
              >
                <div
                  className={`${bg} w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-7 h-7 bg-gradient-to-br ${gradient} bg-clip-text`} style={{ color: gradient.includes('blue') ? '#3b82f6' : gradient.includes('emerald') ? '#10b981' : gradient.includes('amber') ? '#f59e0b' : '#8b5cf6' }} />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── FEATURED COLLECTION ───────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
            <div>
              <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">
                Curated Selection
              </p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                Featured Collection
              </h2>
              <p className="text-lg text-slate-500 mt-3 max-w-xl">
                Handpicked masterpieces from the world&apos;s most prestigious maisons — each one a statement of excellence.
              </p>
            </div>
            <Link
              to="/products"
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold group transition"
            >
              View all
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full border-2 border-slate-200" />
                <div className="absolute inset-0 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
              </div>
              <p className="text-slate-500">Loading timepieces...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ───────────────────── EDITORIAL BANNER ───────────────────── */}
      <section className="relative py-32 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1509941943102-10c232535736?w=1920&h=800&fit=crop&q=80"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-slate-950/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest">
              The SwiftCart Difference
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Where Passion Meets{' '}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                Precision
              </span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-lg">
              Every timepiece in our collection passes a rigorous 114-point inspection. We partner directly with authorized dealers and brands to guarantee authenticity and provenance.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              {[
                { icon: Eye, label: '114-Point Inspection' },
                { icon: Shield, label: 'Certified Authentic' },
                { icon: Clock, label: 'Lifetime Service' },
                { icon: Gem, label: 'Premium Packaging' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-200">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── NEW ARRIVALS ───────────────────── */}
      {newArrivals.length > 0 && (
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
              <div>
                <p className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-3">
                  Just In
                </p>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                  New Arrivals
                </h2>
                <p className="text-lg text-slate-500 mt-3 max-w-xl">
                  The latest additions to our ever-growing catalog of exceptional timepieces.
                </p>
              </div>
              <Link
                to="/products"
                className="mt-6 md:mt-0 inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold group transition"
              >
                See all new
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────────────────── TESTIMONIAL ───────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-6 h-6 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <blockquote className="text-2xl sm:text-3xl font-semibold text-slate-900 leading-snug mb-8">
            &ldquo;SwiftCart transformed how I shop for luxury watches. The authentication process is flawless and the white-glove service is unmatched. My Omega arrived in immaculate condition.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-lg font-bold text-slate-700">
              A
            </div>
            <div className="text-left">
              <p className="font-semibold text-slate-900">Adrian K.</p>
              <p className="text-sm text-slate-500">Verified Buyer — Omega Seamaster</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── NEWSLETTER CTA ───────────────────── */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <Gem className="w-10 h-10 text-amber-400 mx-auto mb-6" />
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
            Join the Inner Circle
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto">
            Be the first to know about exclusive new arrivals, private sales, and curated insights from the world of luxury horology.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent backdrop-blur-sm"
            />
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-slate-500 mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;

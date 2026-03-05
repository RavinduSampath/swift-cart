import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { User, Mail, Shield, ShoppingBag, Star, Clock, Edit2, Save, X, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { getStoredUser, saveUser, getStoredCart, getStoredReviews } from '@/lib/mockData';

interface UserProfile {
  userId: number;
  username: string;
  email: string;
  token: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  memberSince?: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const toast = useToast();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
  });

  // Stats
  const [cartItemCount, setCartItemCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadProfile();
  }, [isAuthenticated]);

  const loadProfile = () => {
    const stored = getStoredUser();
    if (stored) {
      const profile: UserProfile = {
        ...stored,
        phone: stored.phone || '',
        address: stored.address || '',
        city: stored.city || '',
        country: stored.country || '',
        memberSince: stored.memberSince || new Date().toISOString().split('T')[0],
      };
      setUser(profile);
      setEditForm({
        username: profile.username,
        email: profile.email,
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || '',
        country: profile.country || '',
      });

      // Load stats
      const cart = getStoredCart();
      setCartItemCount(cart.reduce((sum, item) => sum + item.quantity, 0));
      const reviews = getStoredReviews();
      setReviewCount(reviews.length);
    }
  };

  const handleSave = () => {
    if (!user) return;
    if (!editForm.username.trim() || !editForm.email.trim()) {
      toast.warning('Required fields', 'Username and email are required');
      return;
    }
    const updated = {
      ...user,
      ...editForm,
    };
    saveUser(updated);
    setUser(updated);
    setEditing(false);
    toast.success('Profile updated', 'Your profile has been saved successfully');
  };

  const handleCancel = () => {
    if (user) {
      setEditForm({
        username: user.username,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        country: user.country || '',
      });
    }
    setEditing(false);
  };

  const handleLogout = () => {
    logout();
    toast.info('Logged out', 'You have been logged out successfully');
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
        <p className="text-slate-600 mt-1">Manage your account details and preferences</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column — Avatar & Quick Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Avatar Card */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-28 h-28 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl font-bold text-blue-600">
                {user.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">{user.username}</h2>
            <p className="text-slate-500 text-sm">{user.email}</p>
            <div className="mt-3 inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
              <Shield className="w-3 h-3" />
              Verified Member
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Account Overview</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Cart Items</p>
                  <p className="font-semibold text-slate-900">{cartItemCount}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 w-10 h-10 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Reviews Written</p>
                  <p className="font-semibold text-slate-900">{reviewCount}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Member Since</p>
                  <p className="font-semibold text-slate-900">
                    {new Date(user.memberSince || '').toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-3">
            <h3 className="font-semibold text-slate-900 mb-2">Quick Actions</h3>
            <button
              onClick={() => navigate('/cart')}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-3 text-slate-700 transition"
            >
              <ShoppingBag className="w-4 h-4" />
              View Cart
            </button>
            <button
              onClick={() => navigate('/products')}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-3 text-slate-700 transition"
            >
              <Star className="w-4 h-4" />
              Browse Watches
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-50 flex items-center gap-3 text-red-600 transition"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </div>

        {/* Right Column — Profile Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Personal Information</h3>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1 border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Username */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <User className="w-4 h-4" />
                  Username
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="px-4 py-2 bg-slate-50 rounded-lg text-slate-900">{user.username}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                {editing ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="px-4 py-2 bg-slate-50 rounded-lg text-slate-900">{user.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Phone</label>
                {editing ? (
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <p className="px-4 py-2 bg-slate-50 rounded-lg text-slate-900">
                    {user.phone || <span className="text-slate-400 italic">Not provided</span>}
                  </p>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Country</label>
                {editing ? (
                  <input
                    type="text"
                    value={editForm.country}
                    onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your country"
                  />
                ) : (
                  <p className="px-4 py-2 bg-slate-50 rounded-lg text-slate-900">
                    {user.country || <span className="text-slate-400 italic">Not provided</span>}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">City</label>
                {editing ? (
                  <input
                    type="text"
                    value={editForm.city}
                    onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your city"
                  />
                ) : (
                  <p className="px-4 py-2 bg-slate-50 rounded-lg text-slate-900">
                    {user.city || <span className="text-slate-400 italic">Not provided</span>}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-slate-700 mb-2 block">Address</label>
                {editing ? (
                  <input
                    type="text"
                    value={editForm.address}
                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full address"
                  />
                ) : (
                  <p className="px-4 py-2 bg-slate-50 rounded-lg text-slate-900">
                    {user.address || <span className="text-slate-400 italic">Not provided</span>}
                  </p>
                )}
              </div>
            </div>

            {/* User ID & Account Info */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-4">Account Details</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-slate-500 mb-1">User ID</p>
                  <p className="font-semibold text-slate-900">#{user.userId}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-slate-500 mb-1">Account Status</p>
                  <p className="font-semibold text-green-600">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

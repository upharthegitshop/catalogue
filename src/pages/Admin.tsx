import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { DUMMY_PRODUCTS } from '../data/products';
import {
  LogIn,
  Store,
  PlusCircle,
  Package,
  Gift,
  Trash2,
  Loader2,
  ImagePlus,
  IndianRupee,
  TrendingUp,
  ShoppingBag,
} from 'lucide-react';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCostPrice, setProductCostPrice] = useState('');
  const [productSellingPrice, setProductSellingPrice] = useState('');
  const [productImage, setProductImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if already authenticated
    const auth = sessionStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadProducts();
    }
  }, []);

  const loadProducts = () => {
    // In production, fetch from API
    setProducts(DUMMY_PRODUCTS);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Demo credentials - in production, verify with backend
    if (email === 'admin123@gmail.com' && password === 'admin@123') {
      sessionStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      loadProducts();
    } else {
      setError('Invalid credentials');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !productDescription || !productCostPrice || !productSellingPrice || !productImage) {
      setMessage({ type: 'error', text: 'Please fill all fields' });
      return;
    }

    setUploading(true);
    setMessage({ type: '', text: '' });

    // Simulate upload
    setTimeout(() => {
      const newProduct: Product = {
        id: String(Date.now()),
        name: productName,
        description: productDescription,
        image_url: imagePreview,
        costPrice: Number(productCostPrice),
        sellingPrice: Number(productSellingPrice),
      };
      setProducts([newProduct, ...products]);
      setProductName('');
      setProductDescription('');
      setProductCostPrice('');
      setProductSellingPrice('');
      setProductImage(null);
      setImagePreview('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      setMessage({ type: 'success', text: 'Product added successfully!' });
      setUploading(false);
    }, 1000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="modal-backdrop min-h-screen flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-3xl w-full max-w-md text-center shadow-2xl">
          <div className="mb-6">
            <h1 className="font-display text-4xl font-semibold brand-gradient">Uphar</h1>
            <span className="text-xs text-[var(--accent-light)] uppercase tracking-[0.2em] font-medium block mt-2">
              Admin Portal
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-8">Sign in to manage your catalogue</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="form-input"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="form-input"
              required
            />
            <button type="submit" className="btn btn-primary w-full mt-3 gap-2">
              <LogIn size={18} strokeWidth={2.5} /> Sign In
            </button>
          </form>

          {error && (
            <p className="mt-5 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">{error}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 py-5" style={{ background: 'linear-gradient(135deg, #7a4d6a 0%, #9c6b8a 100%)' }}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-baseline gap-3">
            <h1 className="font-display text-2xl font-semibold text-white">Uphar</h1>
            <span className="text-[0.65rem] text-white/70 uppercase tracking-[0.15em] font-medium">
              Admin
            </span>
          </div>
          <Link to="/" className="btn bg-white/20 text-white border-0 hover:bg-white/30 gap-2">
            <Store size={18} strokeWidth={2} /> View Shop
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="max-w-6xl mx-auto px-6 space-y-10">
          {/* Upload Form */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
              <div className="mb-8 pb-5 border-b border-gray-100">
                <h2 className="font-display text-xl font-semibold text-[var(--charcoal)] flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[var(--primary-light)] flex items-center justify-center">
                    <PlusCircle size={20} className="text-[var(--primary)]" strokeWidth={2} />
                  </span>
                  Add New Product
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--accent)] mb-3">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g., Handcrafted Candle Set"
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--accent)] mb-3">
                    Description
                  </label>
                  <textarea
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    placeholder="Describe your product beautifully..."
                    rows={3}
                    className="form-input resize-y min-h-[90px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--accent)] mb-3">
                      Cost Price (₹)
                    </label>
                    <div className="relative">
                      <IndianRupee size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        value={productCostPrice}
                        onChange={(e) => setProductCostPrice(e.target.value)}
                        placeholder="450"
                        className="form-input pl-10"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--accent)] mb-3">
                      Selling Price (₹)
                    </label>
                    <div className="relative">
                      <IndianRupee size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        value={productSellingPrice}
                        onChange={(e) => setProductSellingPrice(e.target.value)}
                        placeholder="699"
                        className="form-input pl-10"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--accent)] mb-3">
                    Product Image
                  </label>
                  <div 
                    className="file-upload group" 
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                      required={!imagePreview}
                    />
                    <div className="w-14 h-14 rounded-2xl bg-[var(--primary-light)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <ImagePlus size={26} className="text-[var(--primary)]" strokeWidth={1.5} />
                    </div>
                    <span className="text-sm text-gray-500 font-medium">Drop image or click to upload</span>
                    <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                  </div>
                  {imagePreview && (
                    <div className="mt-5 relative inline-block">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-w-[200px] max-h-[150px] rounded-2xl object-cover shadow-md"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={uploading}
                  className="btn btn-primary w-full gap-2 mt-2"
                >
                  {uploading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Gift size={18} strokeWidth={2} /> Add Product
                    </>
                  )}
                </button>

                {message.text && (
                  <p
                    className={`mt-5 p-4 text-sm rounded-xl flex items-center gap-2 ${
                      message.type === 'success'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {message.text}
                  </p>
                )}
              </form>
            </section>

            {/* Products List */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="mb-6 pb-5 border-b border-gray-100">
                <h2 className="font-display text-xl font-semibold text-[var(--charcoal)] flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[var(--primary-light)] flex items-center justify-center">
                    <Package size={20} className="text-[var(--primary)]" strokeWidth={2} />
                  </span>
                  Your Products
                </h2>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-gradient-to-br from-[var(--primary-light)] to-white p-4 rounded-xl border border-[var(--primary-light)]">
                  <div className="flex items-center gap-2 mb-1">
                    <ShoppingBag size={16} className="text-[var(--primary)]" />
                    <span className="text-xs text-gray-500">Products</span>
                  </div>
                  <p className="text-2xl font-bold text-[var(--primary)]">{products.length}</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-white p-4 rounded-xl border border-amber-100">
                  <div className="flex items-center gap-2 mb-1">
                    <IndianRupee size={16} className="text-amber-600" />
                    <span className="text-xs text-gray-500">Total Cost</span>
                  </div>
                  <p className="text-2xl font-bold text-amber-600">₹{products.reduce((sum, p) => sum + p.costPrice, 0).toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-white p-4 rounded-xl border border-green-100">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp size={16} className="text-green-600" />
                    <span className="text-xs text-gray-500">Profit</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">₹{products.reduce((sum, p) => sum + (p.sellingPrice - p.costPrice), 0).toLocaleString()}</p>
                </div>
              </div>

              {/* Products Table */}
              <div className="max-h-[380px] overflow-auto rounded-xl border border-gray-100">
                {products.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <Gift size={28} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">No products yet</p>
                    <p className="text-gray-400 text-sm mt-1">Add your first gift to get started!</p>
                  </div>
                ) : (
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Product</th>
                        <th className="text-right py-3 px-3 font-medium text-gray-500">Cost</th>
                        <th className="text-right py-3 px-3 font-medium text-gray-500">Price</th>
                        <th className="text-right py-3 px-3 font-medium text-gray-500">Margin</th>
                        <th className="py-3 px-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {products.map((product) => {
                        const margin = product.sellingPrice - product.costPrice;
                        const marginPercent = ((margin / product.costPrice) * 100).toFixed(0);
                        return (
                          <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={product.image_url}
                                  alt={product.name}
                                  className="w-11 h-11 object-cover rounded-lg shadow-sm flex-shrink-0"
                                />
                                <div className="min-w-0">
                                  <p className="font-medium text-[var(--charcoal)] truncate max-w-[140px]">{product.name}</p>
                                </div>
                              </div>
                            </td>
                            <td className="text-right py-3 px-3 text-gray-500">₹{product.costPrice}</td>
                            <td className="text-right py-3 px-3 font-semibold text-[var(--charcoal)]">₹{product.sellingPrice}</td>
                            <td className="text-right py-3 px-3">
                              <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-xs font-medium">
                                +{marginPercent}%
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <button
                                onClick={() => handleDelete(product.id)}
                                className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 flex items-center justify-center transition-colors"
                                title="Delete product"
                              >
                                <Trash2 size={15} strokeWidth={2} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
        </div>
      </main>
    </>
  );
};

export default Admin;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ShoppingBag, CheckCircle, Info, Sparkles, Package } from 'lucide-react';
import { db } from '../../services/db';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

export const Products: React.FC = () => {
  const products = db.getProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedQuantityFilter, setSelectedQuantityFilter] = useState<'All' | 'Small' | 'Bulk'>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderQty, setOrderQty] = useState<number>(1);
  const [addedMessage, setAddedMessage] = useState<string | null>(null);

  const categories = ['All', 'Chemical Fertilizers', 'Organic Fertilizers', 'Specialized Blends'];
  const types = ['All', 'Nitrogenous', 'Phosphatic', 'Potassic', 'Complex / NPK', 'Organic'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesType = selectedType === 'All' || p.type === selectedType;
    const matchesQty = selectedQuantityFilter === 'All' || 
      (selectedQuantityFilter === 'Bulk' && p.isBulkAvailable) ||
      (selectedQuantityFilter === 'Small' && !p.isBulkAvailable);
    return matchesSearch && matchesCat && matchesType && matchesQty;
  });

  const handleAddToCart = (product: Product, qty: number) => {
    addToCart(product, qty);
    setAddedMessage(`Added ${qty} x ${product.name} to cart!`);
    setTimeout(() => setAddedMessage(null), 3000);
  };

  const handleBuyNow = (product: Product, qty: number) => {
    addToCart(product, qty);
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-gov-navy to-gov-green text-white p-8 rounded-2xl shadow-lg border border-gov-gold/30">
        <div className="max-w-3xl space-y-2">
          <span className="px-3 py-1 bg-gov-gold text-gov-navy font-extrabold text-xs rounded-full uppercase tracking-wider">
            Official E-Commerce Store
          </span>
          <h2 className="text-3xl font-extrabold">Fertilizer & Product Catalogue</h2>
          <p className="text-sm text-slate-200">
            Purchase high-purity fertilizer online with flexible quantity options ranging from individual 1kg/25kg/50kg bags to 1 Metric Ton bulk jumbo containers. Guaranteed prices and fast dispatch via SFCL distribution depots.
          </p>
        </div>
      </div>

      {addedMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold rounded-xl flex items-center space-x-2 animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>{addedMessage}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by product name or code..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-gov-navy focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-gov-navy focus:outline-none"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-gov-navy focus:outline-none"
            >
              {types.map(t => (
                <option key={t} value={t}>{t === 'All' ? 'All Nutrient Types' : t}</option>
              ))}
            </select>
          </div>

          {/* Quantity Scale Filter */}
          <div>
            <select
              value={selectedQuantityFilter}
              onChange={e => setSelectedQuantityFilter(e.target.value as any)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-gov-navy focus:outline-none"
            >
              <option value="All">All Quantities (Small to Bulk)</option>
              <option value="Small">Small Quantities Only (&lt; 100kg)</option>
              <option value="Bulk">Bulk Quantity Orders (Metric Tons)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="h-48 relative overflow-hidden bg-slate-100 cursor-pointer" onClick={() => { setSelectedProduct(product); setOrderQty(1); }}>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
                <span className="absolute top-2 left-2 px-2.5 py-1 bg-gov-navy/90 text-white font-bold text-[10px] rounded-full">
                  {product.code}
                </span>
                {product.isBulkAvailable && (
                  <span className="absolute top-2 right-2 px-2.5 py-1 bg-amber-500 text-white font-bold text-[10px] rounded-full shadow">
                    Bulk Available
                  </span>
                )}
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold text-gov-goldDark">{product.category}</span>
                  <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{product.status}</span>
                </div>
                <h3 className="font-bold text-base text-slate-900 line-clamp-1">{product.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{product.description}</p>
                <div className="pt-2 text-xs text-slate-700 space-y-1 font-mono">
                  <div>Package: <strong className="text-slate-900">{product.packageSize}</strong></div>
                  <div>Stock: <strong className="text-slate-900">{product.availableStock.toLocaleString()} {product.unit}s</strong></div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Unit Price</span>
                <span className="text-xl font-extrabold text-gov-green">
                  LKR {product.pricePerUnit.toLocaleString()}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => { setSelectedProduct(product); setOrderQty(1); }}
                  className="p-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition"
                  title="View Specs"
                >
                  <Info className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleAddToCart(product, 1)}
                  className="px-3 py-2 bg-gov-green hover:bg-gov-greenDark text-white text-xs font-bold rounded-xl transition flex items-center space-x-1"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
                <button
                  onClick={() => handleBuyNow(product, 1)}
                  className="px-3 py-2 bg-gov-navy hover:bg-gov-navyDark text-white text-xs font-bold rounded-xl transition"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200">
            <div className="p-6 bg-gov-navy text-white flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-gov-gold uppercase tracking-wider">{selectedProduct.code}</span>
                <h3 className="text-xl font-bold">{selectedProduct.name}</h3>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="text-white/80 hover:text-white font-bold text-xl">✕</button>
            </div>
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="flex flex-col sm:flex-row gap-6">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full sm:w-48 h-48 rounded-xl object-cover" />
                <div className="space-y-3 flex-1">
                  <p className="text-sm text-slate-600">{selectedProduct.description}</p>
                  <div className="p-3 bg-slate-50 rounded-xl border text-xs space-y-1">
                    <div><strong>Category:</strong> {selectedProduct.category}</div>
                    <div><strong>Nutrient Type:</strong> {selectedProduct.type}</div>
                    <div><strong>Package Unit:</strong> {selectedProduct.packageSize}</div>
                    <div><strong>Effective Price Date:</strong> {selectedProduct.effectiveDate}</div>
                    <div><strong>Bulk Ordering Available:</strong> {selectedProduct.isBulkAvailable ? 'YES (Pallets & Jumbo Bags)' : 'NO'}</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                <h4 className="font-bold text-xs text-gov-navy uppercase tracking-wider">Technical Specifications & Lab Analysis</h4>
                <p className="text-xs text-slate-700 leading-relaxed font-mono">{selectedProduct.specifications}</p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Order Quantity ({selectedProduct.unit})</label>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setOrderQty(Math.max(1, orderQty - 1))}
                      className="w-8 h-8 rounded-lg bg-slate-200 font-bold text-sm"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={orderQty}
                      min={1}
                      max={selectedProduct.maxQuantity}
                      onChange={e => setOrderQty(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 text-center py-1 border border-slate-300 rounded-lg text-sm font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => setOrderQty(orderQty + 1)}
                      className="w-8 h-8 rounded-lg bg-slate-200 font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 uppercase block">Subtotal Payable</span>
                  <span className="text-2xl font-extrabold text-gov-green">
                    LKR {(selectedProduct.pricePerUnit * orderQty).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-100 border-t flex justify-end space-x-3">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 bg-slate-300 text-slate-800 text-xs font-bold rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleAddToCart(selectedProduct, orderQty);
                  setSelectedProduct(null);
                }}
                className="px-5 py-2 bg-gov-green hover:bg-gov-greenDark text-white text-xs font-bold rounded-xl shadow"
              >
                Add To Cart
              </button>
              <button
                onClick={() => {
                  handleBuyNow(selectedProduct, orderQty);
                  setSelectedProduct(null);
                }}
                className="px-5 py-2 bg-gov-navy hover:bg-gov-navyDark text-white text-xs font-bold rounded-xl shadow"
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

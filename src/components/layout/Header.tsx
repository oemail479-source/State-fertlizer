import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, Search, Globe, Shield, User as UserIcon, 
  Menu, X, PhoneCall, Mail, Building2, ChevronDown, LogOut 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';

export const Header: React.FC = () => {
  const { user, loginAs, logout, demoUsers } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { totalItemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navItems = [
    { label: t('home'), path: '/' },
    { label: t('about'), path: '/about' },
    { label: t('products'), path: '/products' },
    { label: t('priceList'), path: '/fertilizer-prices' },
    { label: t('bungalows'), path: '/circuit-bungalows' },
    { label: t('procurement'), path: '/procurement' },
    { label: t('lab'), path: '/testing-lab' },
    { label: t('news'), path: '/news' },
    { label: t('contact'), path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header id="site-header" className="sticky top-0 z-40 bg-white shadow-md">
      {/* Government Top Bar */}
      <div className="bg-gov-navy text-white py-1.5 px-4 text-xs font-medium border-b border-gov-gold/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Sri Lanka Govt Seal & Ministry Info */}
          <div className="flex items-center space-x-2">
            <span className="inline-block w-3.5 h-3.5 rounded-full bg-gov-gold shrink-0"></span>
            <span className="tracking-wide">{t('govtSeal')}</span>
          </div>

          {/* Admin Login Button, Facebook Link, and Language Switcher */}
          <div className="flex items-center space-x-3">
            <a
              href="https://facebook.com/statefertilizersrilanka"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 bg-blue-700/80 hover:bg-blue-600 px-2.5 py-1 rounded text-xs font-semibold text-white transition border border-blue-400/40"
              title="Official Facebook Page"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </a>
            <div>
              <button
                onClick={() => navigate('/admin/login')}
                className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded text-xs font-semibold text-gov-gold transition border border-gov-gold/40"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </button>
            </div>
            <div className="flex items-center space-x-1 bg-black/20 px-2 py-0.5 rounded text-xs">
              <Globe className="w-3.5 h-3.5 text-gov-gold" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded ${language === 'en' ? 'bg-gov-gold text-gov-navy font-bold' : 'hover:text-gov-gold'}`}
              >
                EN
              </button>
              <span>|</span>
              <button
                onClick={() => setLanguage('si')}
                className={`px-1.5 py-0.5 rounded ${language === 'si' ? 'bg-gov-gold text-gov-navy font-bold' : 'hover:text-gov-gold'}`}
              >
                සිං
              </button>
              <span>|</span>
              <button
                onClick={() => setLanguage('ta')}
                className={`px-1.5 py-0.5 rounded ${language === 'ta' ? 'bg-gov-gold text-gov-navy font-bold' : 'hover:text-gov-gold'}`}
              >
                தமிழ்
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Branding Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Title */}
        <Link to="/" className="flex items-center space-x-3 group">
          <img src="/logo.svg" alt="State Fertilizer Company Limited" className="h-14 w-auto rounded-xl shadow-md border border-gov-navy/20 transition transform group-hover:scale-105" />
          <div>
            <h1 className="text-lg md:text-xl font-extrabold text-gov-navy tracking-tight group-hover:text-gov-green transition leading-none">
              STATE FERTILIZER COMPANY LIMITED
            </h1>
            <p className="text-xs font-semibold text-gov-goldDark mt-1 tracking-wide">
              රජයේ පොහොර - රටම අස්වද්දන්න • රාජ්‍ය පොහොර සමාගම
            </p>
          </div>
        </Link>

        {/* Right Search, Cart & Admin Button */}
        <div className="hidden lg:flex items-center space-x-4">
          <form onSubmit={handleSearchSubmit} className="relative" role="search" aria-label="Site search">
            <input
              type="text"
              aria-label="Search site"
              placeholder="Search site, products, tenders..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-64 pl-9 pr-4 py-1.5 text-xs border border-slate-300 rounded-full focus:ring-2 focus:ring-gov-navy focus:outline-none bg-slate-50"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2" />
          </form>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative p-2 text-slate-700 hover:text-gov-green transition bg-slate-100 hover:bg-emerald-50 rounded-full"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow">
                {totalItemCount}
              </span>
            )}
          </Link>

          {/* Admin Portal Button */}
          <Link
            to="/admin"
            className="flex items-center space-x-1.5 px-4 py-2 bg-gov-navy hover:bg-gov-navyDark text-white text-xs font-bold rounded-lg shadow-sm transition"
          >
            <UserIcon className="w-4 h-4 text-gov-gold" />
            <span>Admin Portal</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center space-x-2">
          <Link to="/cart" className="relative p-2 text-slate-700">
            <ShoppingBag className="w-6 h-6" />
            {totalItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-rose-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItemCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-gov-navy"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-gov-navy text-white hidden lg:block border-t border-gov-gold/20" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 flex items-center space-x-1 flex-nowrap overflow-hidden">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider transition whitespace-nowrap ${
                isActive(item.path)
                  ? 'bg-gov-green text-white border-b-2 border-gov-gold'
                  : 'hover:bg-white/10 hover:text-gov-gold'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 text-white p-4 border-t border-slate-800 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              placeholder="Search site..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </form>

          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 text-sm font-semibold rounded ${
                isActive(item.path) ? 'bg-gov-green text-white' : 'hover:bg-slate-800'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-bold bg-gov-gold text-gov-navy rounded text-center"
          >
            Admin Portal
          </Link>
        </div>
      )}

      {/* Admin login is a separate page at /admin/login */}
    </header>
  );
};

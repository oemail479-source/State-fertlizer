import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, Calendar, FileText, DollarSign, FlaskConical, 
  ChevronRight, ArrowRight, Award, ShieldCheck, Newspaper, 
  Users, CheckCircle2, TrendingUp, Sparkles, AlertCircle 
} from 'lucide-react';
import { db } from '../../services/db';
import { useLanguage } from '../../context/LanguageContext';

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const products = db.getProducts().filter(p => p.isFeatured).slice(0, 4);
  const news = db.getNews();
  const tenders = db.getTenders().filter(t => t.status === 'Open' || t.status === 'Closing Soon').slice(0, 3);

  // Hero slideshow images
  const slides = [
    {
      title: 'Powering Sri Lanka’s Agricultural Prosperity',
      subtitle: 'Guaranteed high-purity fertilizer supply for Maha Season 2026/2027 across all 25 districts.',
      ctaText: 'Explore Fertilizer Catalogue',
      ctaLink: '/products',
      bgImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80'
    },
    {
      title: 'Seamless Digital Circuit Bungalow Reservations',
      subtitle: 'Reserve official guest rooms in Polonnaruwa and Nuwara Eliya with live room-level availability.',
      ctaText: 'Reserve Room Online',
      ctaLink: '/circuit-bungalows',
      bgImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80'
    },
    {
      title: 'Transparent E-Procurement & Tender Documents',
      subtitle: 'Access national tenders and securely purchase tender documentation online.',
      ctaText: 'View Open Tenders',
      ctaLink: '/procurement',
      bgImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-20">
      {/* Hero Slideshow Banner */}
      <section className="relative h-[480px] bg-slate-900 overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentSlide ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.bgImage}
              alt={slide.title}
              className="w-full h-full object-cover opacity-40 scale-105 transition-transform duration-10000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gov-navyDark via-gov-navy/80 to-transparent flex items-center">
              <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="max-w-2xl space-y-4 animate-in fade-in slide-in-from-left duration-500">
                  <span className="inline-block px-3 py-1 bg-gov-gold text-gov-navy font-extrabold text-xs rounded-full uppercase tracking-wider shadow">
                    State Fertilizer Company Limited
                  </span>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-md">
                    {slide.title}
                  </h2>
                  <p className="text-sm md:text-base text-slate-200 leading-relaxed font-normal">
                    {slide.subtitle}
                  </p>
                  <div className="pt-3 flex flex-wrap gap-3">
                    <Link
                      to={slide.ctaLink}
                      className="px-6 py-3 bg-gov-green hover:bg-gov-greenDark text-white font-bold text-sm rounded-xl shadow-lg flex items-center space-x-2 transition border border-gov-gold/40"
                    >
                      <span>{slide.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/fertilizer-prices"
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl backdrop-blur transition border border-white/30"
                    >
                      Official Price List
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === currentSlide ? 'w-8 bg-gov-gold' : 'w-2.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Prominent Quick Service Access Bar (Required by RFP) */}
      <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            to="/products"
            className="p-4 bg-white hover:bg-emerald-50 rounded-2xl shadow-lg border border-slate-200 flex flex-col items-center text-center group transition transform hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-emerald-100 text-gov-green rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <span className="font-bold text-xs text-slate-800 group-hover:text-gov-green">
              Buy Fertilizer
            </span>
            <span className="text-[10px] text-slate-500 mt-0.5">Small & Bulk</span>
          </Link>

          <Link
            to="/circuit-bungalows"
            className="p-4 bg-white hover:bg-blue-50 rounded-2xl shadow-lg border border-slate-200 flex flex-col items-center text-center group transition transform hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="font-bold text-xs text-slate-800 group-hover:text-blue-700">
              Book Bungalow
            </span>
            <span className="text-[10px] text-slate-500 mt-0.5">Polonnaruwa & Nuwara Eliya</span>
          </Link>

          <Link
            to="/procurement"
            className="p-4 bg-white hover:bg-amber-50 rounded-2xl shadow-lg border border-slate-200 flex flex-col items-center text-center group transition transform hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition">
              <FileText className="w-6 h-6" />
            </div>
            <span className="font-bold text-xs text-slate-800 group-hover:text-amber-700">
              Open Tenders
            </span>
            <span className="text-[10px] text-slate-500 mt-0.5">Paid Doc Download</span>
          </Link>

          <Link
            to="/fertilizer-prices"
            className="p-4 bg-white hover:bg-purple-50 rounded-2xl shadow-lg border border-slate-200 flex flex-col items-center text-center group transition transform hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="font-bold text-xs text-slate-800 group-hover:text-purple-700">
              Price List
            </span>
            <span className="text-[10px] text-slate-500 mt-0.5">Official Rates</span>
          </Link>

          <Link
            to="/testing-lab"
            className="p-4 bg-white hover:bg-teal-50 rounded-2xl shadow-lg border border-slate-200 flex flex-col items-center text-center group transition transform hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition">
              <FlaskConical className="w-6 h-6" />
            </div>
            <span className="font-bold text-xs text-slate-800 group-hover:text-teal-700">
              Testing Lab
            </span>
            <span className="text-[10px] text-slate-500 mt-0.5">Quality Assurance</span>
          </Link>

          <Link
            to="/order-tracking"
            className="p-4 bg-white hover:bg-rose-50 rounded-2xl shadow-lg border border-slate-200 flex flex-col items-center text-center group transition transform hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-rose-100 text-rose-700 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="font-bold text-xs text-slate-800 group-hover:text-rose-700">
              Track Order
            </span>
            <span className="text-[10px] text-slate-500 mt-0.5">Real-time Timeline</span>
          </Link>
        </div>
      </section>

      {/* Welcome & Chairman Message Section */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-6 bg-gov-green rounded-full"></span>
            <h3 className="text-xl font-bold text-gov-navy">Welcome to State Fertilizer Company Limited</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            State Fertilizer Company Limited (SFCL) operates under the purview of the Ministry of Agriculture. Established with a national mandate to ensure affordable, high-purity fertilizer inputs for Sri Lankan farmers, SFCL imports, formulates, tests, and distributes agricultural soil nutrients across the nation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-gov-green shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs text-gov-navy">National Food Security</h4>
                <p className="text-xs text-slate-600">Continuous buffer stock management for paddy and vegetable sectors.</p>
              </div>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-gov-goldDark shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs text-gov-navy">ISO Quality Assurance</h4>
                <p className="text-xs text-slate-600">Rigorous laboratory screening for heavy metals and purity levels.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chairman Message Card */}
        <div className="bg-gradient-to-br from-gov-navy to-slate-900 text-white p-6 rounded-2xl shadow-lg border border-gov-gold/30 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gov-gold">Institutional Leadership</span>
              <Award className="w-5 h-5 text-gov-gold" />
            </div>
            <h4 className="font-bold text-base text-white">Chairman's Statement</h4>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "Through digital innovation, we are empowering Sri Lanka's agricultural ecosystem with direct access to quality fertilizer, transparent procurement, and modernized public services."
            </p>
          </div>
          <div className="pt-6 border-t border-white/10 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gov-gold text-gov-navy font-bold flex items-center justify-center text-sm">
              SF
            </div>
            <div>
              <p className="text-xs font-bold text-white">Senior Executive Directorate</p>
              <p className="text-[10px] text-gov-gold">State Fertilizer Co. Ltd</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Highlights */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gov-navy">Product & Fertilizer Highlights</h3>
            <p className="text-xs text-slate-500">Order online in smaller quantities or bulk tons with instant bank gateway payment</p>
          </div>
          <Link to="/products" className="text-xs font-bold text-gov-green hover:underline flex items-center space-x-1">
            <span>View Catalogue</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(prod => (
            <div key={prod.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="h-40 relative overflow-hidden bg-slate-100">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2 right-2 px-2.5 py-1 bg-gov-navy/90 text-white font-bold text-[10px] rounded-full">
                    {prod.category}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{prod.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{prod.description}</p>
                  <div className="text-xs text-slate-600 font-medium">
                    Package: <span className="font-bold text-slate-800">{prod.packageSize}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Official Price</span>
                  <span className="text-base font-extrabold text-gov-green">
                    LKR {prod.pricePerUnit.toLocaleString()}
                  </span>
                </div>
                <Link
                  to="/products"
                  className="px-3 py-1.5 bg-gov-navy hover:bg-gov-navyDark text-white text-xs font-bold rounded-lg transition"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest News & Active Tenders Dual Grid */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-40 lg:mb-56">
        {/* News Column */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <Newspaper className="w-5 h-5 text-gov-navy" />
              <h3 className="font-bold text-lg text-gov-navy">Latest News & Bulletins</h3>
            </div>
            <Link to="/news" className="text-xs font-bold text-gov-green hover:underline">View All</Link>
          </div>

          <div className="space-y-4">
            {news.map(item => (
              <div key={item.id} className="flex gap-4 items-start p-2 rounded-xl hover:bg-slate-50 transition">
                <img src={item.image} alt={item.titleEn} className="w-20 h-20 rounded-lg object-cover shrink-0" />
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gov-goldDark uppercase">{item.category} • {item.publishedDate}</span>
                  <h4 className="font-bold text-xs text-slate-900 hover:text-gov-green cursor-pointer">
                    {item.titleEn}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{item.summaryEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tenders Column */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-lg text-gov-navy">Active Tender Notices</h3>
            </div>
            <Link to="/procurement" className="text-xs font-bold text-gov-green hover:underline">Procurement Portal</Link>
          </div>

          <div className="space-y-3">
            {tenders.map(tnd => (
              <div key={tnd.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-gov-gold transition space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-600">{tnd.tenderRef}</span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    tnd.status === 'Open' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {tnd.status}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{tnd.title}</h4>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>Closing: <strong className="text-slate-800">{tnd.closingDate}</strong></span>
                  <Link to="/procurement" className="text-gov-green font-bold hover:underline">
                    View Documents →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

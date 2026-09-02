import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, BarChart2, X } from 'lucide-react';
import { db } from '../../services/db';

export const Footer: React.FC = () => {
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const analytics = db.getVisitorAnalytics();
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-6 border-t-4 border-gov-gold">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {/* Col 1: About SFCL */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <img src="/logo.svg" alt="State Fertilizer Logo" className="h-12 w-auto rounded-lg shadow-sm" />
            <div>
              <h3 className="font-bold text-white text-sm">STATE FERTILIZER CO. LTD</h3>
              <p className="text-xs text-gov-gold">Government of Sri Lanka</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            State Fertilizer Company Limited is the premier government enterprise dedicated to national food security, raw fertilizer import, blending, quality testing, and island-wide distribution to Sri Lankan farmers.
          </p>
          <div className="flex gap-2">
            {[['Facebook', 'https://facebook.com/statefertilizersrilanka'], ['X', 'https://x.com'], ['YouTube', 'https://youtube.com'], ['LinkedIn', 'https://linkedin.com']].map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer" className="px-2 py-1 border border-slate-700 rounded text-[10px] hover:text-gov-gold hover:border-gov-gold">{label}</a>)}
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Digital Services
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/products" className="hover:text-gov-gold transition flex items-center space-x-1">
                <span>• Buy Fertilizer Online</span>
              </Link>
            </li>
            <li>
              <Link to="/fertilizer-prices" className="hover:text-gov-gold transition flex items-center space-x-1">
                <span>• Official Fertilizer Price List</span>
              </Link>
            </li>
            <li>
              <Link to="/circuit-bungalows" className="hover:text-gov-gold transition flex items-center space-x-1">
                <span>• Circuit Bungalow Reservation</span>
              </Link>
            </li>
            <li>
              <Link to="/procurement" className="hover:text-gov-gold transition flex items-center space-x-1">
                <span>• Tender Opportunities & Paid Documents</span>
              </Link>
            </li>
            <li>
              <Link to="/order-tracking" className="hover:text-gov-gold transition flex items-center space-x-1">
                <span>• Order Tracking Portal</span>
              </Link>
            </li>
            <li>
              <Link to="/testing-lab" className="hover:text-gov-gold transition flex items-center space-x-1">
                <span>• Fertilizer Testing Laboratory</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Public Disclosure */}
        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Public Disclosure
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/about" className="hover:text-gov-gold">• Organization Functions & Board</Link></li>
            <li><Link to="/rti" className="hover:text-gov-gold">• Right to Information (RTI)</Link></li>
            <li><Link to="/vacancies" className="hover:text-gov-gold">• Career Vacancies</Link></li>
            <li><Link to="/gallery" className="hover:text-gov-gold">• Photo & Video Gallery</Link></li>
            <li><Link to="/faq" className="hover:text-gov-gold">• Frequently Asked Questions (FAQ)</Link></li>
            <li><Link to="/sitemap" className="hover:text-gov-gold">• Complete Site Map</Link></li>
          </ul>
        </div>

        {/* Col 4: Contact & Visitor Analytics */}
        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Head Office & Contact
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-400 mb-4">
            <li className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-gov-gold shrink-0 mt-0.5" />
              <span>SFCL Complex, Station Road, Hunupitiya, Peliyagoda, Sri Lanka</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gov-gold shrink-0" />
              <span>+94 11 292 2100 / +94 11 292 2105</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gov-gold shrink-0" />
              <span>info@sfcl.gov.lk</span>
            </li>
          </ul>
          <div className="border border-slate-700 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between"><span className="font-bold text-white text-xs">Visitor analytics</span><span className="flex items-center gap-1 text-[10px] text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />{analytics.liveOnline} online</span></div>
            <div className="grid grid-cols-2 gap-2 text-[10px]"><span>Today<br /><strong className="text-gov-gold text-sm">{analytics.todayVisits.toLocaleString()}</strong></span><span>Total hits<br /><strong className="text-gov-gold text-sm">{analytics.pageViews.toLocaleString()}</strong></span></div>
            <button onClick={() => setAnalyticsOpen(true)} className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-[10px] font-bold flex items-center justify-center gap-1"><BarChart2 className="w-3 h-3" /> View analytics</button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <p>© 2026 State Fertilizer Company Limited. All Rights Reserved. Govt. of Sri Lanka.</p>
        <div className="flex items-center space-x-4">
          <span>•</span>
          <span>Last Updated: August 31, 2026</span>
        </div>
      </div>
      {analyticsOpen && <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"><div className="bg-white text-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4"><div className="flex justify-between"><h3 className="font-bold text-gov-navy">Visitor analytics</h3><button onClick={() => setAnalyticsOpen(false)}><X className="w-5 h-5" /></button></div><div className="grid grid-cols-2 gap-3"><div className="bg-emerald-50 rounded-xl p-3"><span className="text-xs">Live online</span><strong className="block text-2xl text-emerald-700">{analytics.liveOnline}</strong></div><div className="bg-amber-50 rounded-xl p-3"><span className="text-xs">Today's visits</span><strong className="block text-2xl text-amber-700">{analytics.todayVisits.toLocaleString()}</strong></div><div className="bg-slate-100 rounded-xl p-3"><span className="text-xs">Total visitors</span><strong className="block text-2xl text-gov-navy">{analytics.totalVisitors.toLocaleString()}</strong></div><div className="bg-slate-100 rounded-xl p-3"><span className="text-xs">Page views</span><strong className="block text-2xl text-gov-navy">{analytics.pageViews.toLocaleString()}</strong></div></div><p className="text-[11px] text-slate-500">Last updated {new Date(analytics.lastUpdated).toLocaleString()}</p></div></div>}
    </footer>
  );
};

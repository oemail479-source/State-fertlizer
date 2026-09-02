import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, MapPin, ShieldCheck, ExternalLink, BarChart2 } from 'lucide-react';

export const Footer: React.FC = () => {
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

          {/* Visitor widget moved to a floating component under the header */}
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
    </footer>
  );
};

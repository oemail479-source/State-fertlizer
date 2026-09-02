import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Users, Award, Shield, FlaskConical, FileText, 
  HelpCircle, Image as ImageIcon, Briefcase, ChevronRight, CheckCircle 
} from 'lucide-react';
import { db } from '../../services/db';

export const AboutUs: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-gradient-to-r from-gov-navy to-slate-900 text-white p-8 rounded-2xl shadow-lg border border-gov-gold/30">
        <span className="px-3 py-1 bg-gov-gold text-gov-navy font-extrabold text-xs rounded-full uppercase tracking-wider">
          State Fertilizer Company Limited
        </span>
        <h2 className="text-3xl font-extrabold mt-2">About Our Organization</h2>
        <p className="text-sm text-slate-200 mt-1 max-w-3xl">
          Premier state enterprise under the Ministry of Agriculture committed to agricultural development and soil fertility management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border space-y-3">
          <div className="flex items-center space-x-2 text-gov-green">
            <Award className="w-6 h-6" />
            <h3 className="text-xl font-bold">Our Vision</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            "To be the leader in agricultural soil nutrient management in Sri Lanka, ensuring sustainable crop productivity and national food security."
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border space-y-3">
          <div className="flex items-center space-x-2 text-gov-navy">
            <Shield className="w-6 h-6 text-gov-gold" />
            <h3 className="text-xl font-bold">Our Mission</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            "To import, manufacture, blend, test, and distribute high quality fertilizers at fair prices through a transparent island-wide network."
          </p>
        </div>
      </div>
    </div>
  );
};

export const TestingLab: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-gradient-to-r from-teal-800 to-gov-navy text-white p-8 rounded-2xl shadow-lg border border-teal-500/30">
        <span className="px-3 py-1 bg-teal-400 text-teal-950 font-extrabold text-xs rounded-full uppercase tracking-wider">
          Central ISO Quality Assurance
        </span>
        <h2 className="text-3xl font-extrabold mt-2">Fertilizer Testing Laboratory</h2>
        <p className="text-sm text-slate-200 mt-1 max-w-3xl">
          State-of-the-art analytical testing facilities located in Peliyagoda providing chemical purity, heavy metal screening, and microbial analysis.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border space-y-4">
        <h3 className="text-lg font-bold text-gov-navy">Testing Services & Parameters</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
          <li className="p-3 bg-slate-50 rounded-xl border font-semibold">• Total Nitrogen & Free Acid Determination</li>
          <li className="p-3 bg-slate-50 rounded-xl border font-semibold">• Water Soluble P2O5 & Heavy Metals (Cd, Pb, As)</li>
          <li className="p-3 bg-slate-50 rounded-xl border font-semibold">• Moisture Content & Biuret Spectrometry</li>
          <li className="p-3 bg-slate-50 rounded-xl border font-semibold">• Organic Compost Pathogen & C:N Ratio Analysis</li>
        </ul>
      </div>
    </div>
  );
};

export const RTISection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-gradient-to-r from-gov-navy to-slate-900 text-white p-8 rounded-2xl shadow-lg border border-gov-gold/30">
        <h2 className="text-3xl font-extrabold">Right to Information (RTI)</h2>
        <p className="text-sm text-slate-200 mt-1">
          Under RTI Act No. 12 of 2016. Designated Information Officers and application procedure.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border space-y-4 text-xs">
        <h3 className="font-bold text-base text-gov-navy">RTI Information Officer Contact</h3>
        <div className="p-4 bg-slate-50 rounded-xl space-y-1">
          <p><strong>Designated Information Officer:</strong> Additional General Manager (Legal & Admin)</p>
          <p><strong>Address:</strong> SFCL Head Office, Station Road, Hunupitiya, Peliyagoda</p>
          <p><strong>Email:</strong> rti@sfcl.gov.lk | <strong>Tel:</strong> +94 11 292 2100</p>
        </div>
      </div>
    </div>
  );
};

export const VacanciesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-gradient-to-r from-gov-navy to-gov-green text-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-extrabold">Career Vacancies</h2>
        <p className="text-sm text-slate-200 mt-1">Join the State Fertilizer Company Limited team.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border space-y-4 text-xs">
        <div className="p-4 bg-slate-50 rounded-xl border flex justify-between items-center">
          <div>
            <h4 className="font-bold text-sm text-slate-900">Senior Chemist — Quality Testing Lab</h4>
            <p className="text-slate-500">Closing Date: September 20, 2026</p>
          </div>
          <button className="px-4 py-2 bg-gov-navy text-white font-bold rounded-xl">Download Gazette PDF</button>
        </div>
      </div>
    </div>
  );
};

export const FAQPage: React.FC = () => {
  const faqs = db.getFAQs();
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-gradient-to-r from-gov-navy to-slate-900 text-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-extrabold">Frequently Asked Questions</h2>
      </div>

      <div className="space-y-4">
        {faqs.map(f => (
          <div key={f.id} className="bg-white p-6 rounded-2xl border space-y-2">
            <h4 className="font-bold text-base text-gov-navy">{f.questionEn}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{f.answerEn}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const GalleryPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-gradient-to-r from-gov-navy to-gov-green text-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-extrabold">Image & Video Gallery</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { title: 'Hunupitiya Blending Plant Inspection', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80' },
          { title: 'Polonnaruwa Circuit Bungalow Grounds', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80' },
          { title: 'Maha Season Paddy Field Inspection', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80' }
        ].map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl border overflow-hidden shadow-sm">
            <img src={item.img} alt={item.title} className="w-full h-44 object-cover" />
            <div className="p-3 text-xs font-bold text-slate-900">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SiteMapPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-white p-8 rounded-2xl border space-y-4 text-xs">
        <h2 className="text-2xl font-bold text-gov-navy">SFCL Website Site Map</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-bold text-gov-green uppercase">Main Services</h4>
            <ul className="space-y-1 mt-2 text-slate-600">
              <li><Link to="/">• Home</Link></li>
              <li><Link to="/products">• Online Fertilizer Sales</Link></li>
              <li><Link to="/circuit-bungalows">• Circuit Bungalow Booking</Link></li>
              <li><Link to="/procurement">• Procurement & Tenders</Link></li>
              <li><Link to="/fertilizer-prices">• Fertilizer Price List</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gov-navy uppercase">Corporate Info</h4>
            <ul className="space-y-1 mt-2 text-slate-600">
              <li><Link to="/about">• About SFCL</Link></li>
              <li><Link to="/testing-lab">• Testing Laboratory</Link></li>
              <li><Link to="/rti">• Right to Information</Link></li>
              <li><Link to="/vacancies">• Careers & Vacancies</Link></li>
              <li><Link to="/contact">• Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gov-navy uppercase">Administration</h4>
            <ul className="space-y-1 mt-2 text-slate-600">
              <li><Link to="/admin">• Secure Admin Portal</Link></li>
              <li><Link to="/cart">• Shopping Cart</Link></li>
              <li><Link to="/order-tracking">• Order Tracking</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

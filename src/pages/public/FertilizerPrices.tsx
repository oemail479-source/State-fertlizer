import React, { useState } from 'react';
import { Search, Printer, Download, DollarSign, Calendar, Info } from 'lucide-react';
import { db } from '../../services/db';

export const FertilizerPrices: React.FC = () => {
  const products = db.getProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-gradient-to-r from-gov-navy to-gov-green text-white p-8 rounded-2xl shadow-lg border border-gov-gold/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="px-3 py-1 bg-gov-gold text-gov-navy font-extrabold text-xs rounded-full uppercase tracking-wider">
            Government Gazette Gazette Notification
          </span>
          <h2 className="text-3xl font-extrabold mt-2">Official Fertilizer Price List</h2>
          <p className="text-sm text-slate-200 mt-1">
            Official maximum retail price index for agricultural fertilizers across Sri Lanka. Effective Date: August 01, 2026.
          </p>
        </div>
        <div className="flex space-x-3">
          <button onClick={() => window.print()} className="px-4 py-2.5 bg-white text-gov-navy text-xs font-bold rounded-xl shadow flex items-center space-x-1.5">
            <Printer className="w-4 h-4" />
            <span>Print Gazette</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search price list by product name or code..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border rounded-xl"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="px-3 py-2 text-xs border rounded-xl"
        >
          <option value="All">All Categories</option>
          <option value="Chemical Fertilizers">Chemical Fertilizers</option>
          <option value="Organic Fertilizers">Organic Fertilizers</option>
          <option value="Specialized Blends">Specialized Blends</option>
        </select>
      </div>

      {/* Price Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-gov-navy text-white font-bold uppercase tracking-wider">
            <tr>
              <th className="p-4">Product Code</th>
              <th className="p-4">Fertilizer Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Package Size</th>
              <th className="p-4">Official Price (LKR)</th>
              <th className="p-4">Effective Date</th>
              <th className="p-4">Stock Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-gov-navy">{p.code}</td>
                <td className="p-4 font-bold text-slate-900">{p.name}</td>
                <td className="p-4 text-slate-600">{p.category}</td>
                <td className="p-4 font-semibold text-slate-800">{p.packageSize}</td>
                <td className="p-4 font-extrabold text-gov-green text-sm">LKR {p.pricePerUnit.toLocaleString()}</td>
                <td className="p-4 text-slate-500">{p.effectiveDate}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

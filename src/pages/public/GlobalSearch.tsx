import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ChevronRight, FileText, ShoppingBag, Calendar, HelpCircle } from 'lucide-react';
import { db } from '../../services/db';

export const GlobalSearch: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const products = db.getProducts().filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()));
  const tenders = db.getTenders().filter(t => t.title.toLowerCase().includes(query.toLowerCase()) || t.tenderRef.toLowerCase().includes(query.toLowerCase()));
  const news = db.getNews().filter(n => n.titleEn.toLowerCase().includes(query.toLowerCase()) || n.contentEn.toLowerCase().includes(query.toLowerCase()));
  const faqs = db.getFAQs().filter(f => f.questionEn.toLowerCase().includes(query.toLowerCase()) || f.answerEn.toLowerCase().includes(query.toLowerCase()));

  const totalResults = products.length + tenders.length + news.length + faqs.length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-2">
        <h2 className="text-2xl font-bold text-gov-navy">Unicode Site-Wide Search Results</h2>
        <p className="text-xs text-slate-500">
          Showing results for query: <strong className="text-slate-900 font-mono text-sm">"{query}"</strong> ({totalResults} matches found)
        </p>
      </div>

      {totalResults === 0 ? (
        <div className="p-8 bg-amber-50 rounded-2xl border text-center text-amber-900 text-xs">
          No records matched your search query. Try searching for "Urea", "Tender", "Bungalow", or "Lab".
        </div>
      ) : (
        <div className="space-y-6">
          {/* Products Results */}
          {products.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border space-y-3">
              <h3 className="font-bold text-sm text-gov-navy uppercase tracking-wider flex items-center space-x-2">
                <ShoppingBag className="w-4 h-4 text-gov-green" />
                <span>Product Catalogue Matches ({products.length})</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {products.map(p => (
                  <Link key={p.id} to="/products" className="p-3 bg-slate-50 rounded-xl border hover:border-gov-green transition flex justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900">{p.name}</h4>
                      <p className="text-[11px] text-slate-500">{p.packageSize}</p>
                    </div>
                    <span className="font-bold text-gov-green">LKR {p.pricePerUnit.toLocaleString()}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Tenders Results */}
          {tenders.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border space-y-3">
              <h3 className="font-bold text-sm text-gov-navy uppercase tracking-wider flex items-center space-x-2">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>Procurement Tender Matches ({tenders.length})</span>
              </h3>
              <div className="space-y-2 text-xs">
                {tenders.map(t => (
                  <Link key={t.id} to="/procurement" className="p-3 bg-slate-50 rounded-xl border hover:border-amber-500 transition block">
                    <span className="font-mono text-slate-500 font-bold">{t.tenderRef}</span>
                    <h4 className="font-bold text-slate-900">{t.title}</h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

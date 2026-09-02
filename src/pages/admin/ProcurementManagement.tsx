import React, { useState } from 'react';
import { FileText, Plus, Lock, Download, DollarSign } from 'lucide-react';
import { db } from '../../services/db';

export const ProcurementManagement: React.FC = () => {
  const tenders = db.getTenders();
  const purchases = db.getPurchasedTenders();

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border">
        <div>
          <h2 className="text-2xl font-bold text-gov-navy">Procurement & Tender Administration</h2>
          <p className="text-xs text-slate-500">Publish tender notices, set paid document access fees, and inspect tender document purchases.</p>
        </div>
        <button className="px-4 py-2 bg-gov-green hover:bg-gov-greenDark text-white text-xs font-bold rounded-xl flex items-center space-x-1">
          <Plus className="w-4 h-4" />
          <span>Publish New Tender</span>
        </button>
      </div>

      {/* Tender List */}
      <div className="bg-white rounded-2xl border overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead className="bg-gov-navy text-white font-bold uppercase tracking-wider">
            <tr>
              <th className="p-4">Tender Ref</th>
              <th className="p-4">Tender Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Closing Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Paid Documents</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {tenders.map(t => (
              <tr key={t.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-gov-navy">{t.tenderRef}</td>
                <td className="p-4 font-bold text-slate-900">{t.title}</td>
                <td className="p-4">{t.category}</td>
                <td className="p-4 font-mono">{t.closingDate}</td>
                <td className="p-4 font-bold text-emerald-600">{t.status}</td>
                <td className="p-4">{t.documents.filter(d => d.isPaid).length} Paid Doc(s)</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tender Document Purchases Audit Log */}
      <div className="bg-white p-6 rounded-2xl border space-y-4">
        <h3 className="font-bold text-base text-slate-900 border-b pb-2">Paid Tender Document Purchase Receipts ({purchases.length})</h3>
        {purchases.length === 0 ? (
          <p className="text-xs text-slate-500">No tender document purchases recorded yet. Evaluators can test the paid tender workflow on the public Procurement page.</p>
        ) : (
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 font-bold text-slate-700 uppercase">
                <tr>
                  <th className="p-3">Purchased At</th>
                  <th className="p-3">Buyer / Company</th>
                  <th className="p-3">Tender Ref</th>
                  <th className="p-3">Fee Paid</th>
                  <th className="p-3">Transaction ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {purchases.map(p => (
                  <tr key={p.id}>
                    <td className="p-3 font-mono">{p.purchasedAt}</td>
                    <td className="p-3 font-bold">{p.buyerName} ({p.companyName})</td>
                    <td className="p-3 font-mono">{p.tenderRef}</td>
                    <td className="p-3 font-extrabold text-gov-green">LKR {p.amount.toLocaleString()}</td>
                    <td className="p-3 font-mono text-slate-600">{p.transactionId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

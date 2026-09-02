import React, { useState } from 'react';
import { BarChart3, Printer, Download, Search, ShieldCheck, Filter } from 'lucide-react';
import { db } from '../../services/db';

export const ReportsAudit: React.FC = () => {
  const auditLogs = db.getAuditLogs();
  const txns = db.getPaymentTransactions();

  const [activeTab, setActiveTab] = useState<'audit' | 'sales' | 'payments' | 'bookings'>('audit');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('2026-08-01');
  const [endDate, setEndDate] = useState('2026-08-31');

  const filteredLogs = auditLogs.filter(l => 
    l.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.module.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border">
        <div>
          <h2 className="text-2xl font-bold text-gov-navy">Reports & Comprehensive Audit Trail</h2>
          <p className="text-xs text-slate-500">Executive financial reporting, payment reconciliation, visitor logs, and immutable security audit records.</p>
        </div>
        <button onClick={() => window.print()} className="px-4 py-2 bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center space-x-1">
          <Printer className="w-4 h-4" />
          <span>Print Report Gazette</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-xl transition ${activeTab === 'audit' ? 'bg-gov-navy text-white' : 'bg-white border text-slate-700'}`}
        >
          Security Audit Logs ({auditLogs.length})
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`px-4 py-2 rounded-xl transition ${activeTab === 'payments' ? 'bg-gov-navy text-white' : 'bg-white border text-slate-700'}`}
        >
          Payment Gateway Transactions
        </button>
      </div>

      {activeTab === 'audit' && (
        <div className="bg-white p-6 rounded-2xl border space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4 text-xs">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search audit trail by user, action, or module..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border rounded-xl"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
            <div className="flex gap-2 items-center">
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="p-2 border rounded-xl" />
              <span>to</span>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="p-2 border rounded-xl" />
            </div>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-gov-navy text-white font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">User & Role</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Module</th>
                  <th className="p-3">IP Address</th>
                  <th className="p-3">Activity Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono text-slate-500">{log.timestamp}</td>
                    <td className="p-3 font-bold text-slate-900">{log.user} ({log.role})</td>
                    <td className="p-3 font-semibold text-gov-navy">{log.action}</td>
                    <td className="p-3"><span className="px-2 py-0.5 bg-slate-100 font-bold rounded">{log.module}</span></td>
                    <td className="p-3 font-mono text-slate-500">{log.ipAddress}</td>
                    <td className="p-3 text-slate-700">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'payments' && (
        <div className="bg-white p-6 rounded-2xl border space-y-4 text-xs">
          <h3 className="font-bold text-base text-slate-900 border-b pb-2">IPG Payment Transactions Log</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-100 font-bold text-slate-700 uppercase">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Transaction ID</th>
                  <th className="p-3">Reference</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Module</th>
                  <th className="p-3">Bank Gateway</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {txns.map(t => (
                  <tr key={t.id}>
                    <td className="p-3 font-mono text-slate-500">{t.timestamp}</td>
                    <td className="p-3 font-mono font-bold text-gov-navy">{t.transactionId}</td>
                    <td className="p-3 font-mono">{t.orderOrBookingRef}</td>
                    <td className="p-3 font-bold">{t.customerName}</td>
                    <td className="p-3">{t.module}</td>
                    <td className="p-3 font-semibold text-slate-800">{t.gateway}</td>
                    <td className="p-3 font-extrabold text-gov-green">LKR {t.amount.toLocaleString()}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 font-bold rounded-full ${
                        t.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-800' :
                        t.status === 'REFUNDED' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

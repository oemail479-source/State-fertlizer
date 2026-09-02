import React, { useState } from 'react';
import { Network, RefreshCw, CheckCircle2, Server, Database, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import { db } from '../../services/db';
import { ERPSyncLog } from '../../types';

export const IntegrationsManagement: React.FC = () => {
  const [erpLogs, setErpLogs] = useState<ERPSyncLog[]>(() => db.getERPSyncLogs());
  const [syncSuccessMessage, setSyncSuccessMessage] = useState<string | null>(null);

  const handleTriggerSync = () => {
    const res = db.syncERPNow();
    setErpLogs(res.syncedLogs);
    setSyncSuccessMessage(`Successfully synchronized ${res.successCount} pending website transactions to SFCL Web-based ERP System!`);
    setTimeout(() => setSyncSuccessMessage(null), 4000);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-gov-navy to-slate-900 text-white p-8 rounded-2xl shadow-lg border border-gov-gold/30">
        <span className="px-3 py-1 bg-gov-gold text-gov-navy font-extrabold text-xs rounded-full uppercase tracking-wider">
          Enterprise Integration Engine
        </span>
        <h2 className="text-3xl font-extrabold mt-2">ERP & Solution Architecture Dashboard</h2>
        <p className="text-sm text-slate-200 mt-1 max-w-3xl">
          Real-time payment synchronization with SFCL web-based ERP system for dealership management and future e-Procurement API readiness layer.
        </p>
      </div>

      {syncSuccessMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 font-bold text-xs rounded-xl flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{syncSuccessMessage}</span>
        </div>
      )}

      {/* Solution Architecture Diagram Card (Required by Requirement 63) */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h3 className="text-lg font-bold text-gov-navy">Platform Solution Architecture Diagram</h3>
            <p className="text-xs text-slate-500">Visual topology depicting public website, REST API services, payment gateways, ERP, and e-Procurement layers.</p>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full">
            All Adapters Active
          </span>
        </div>

        {/* Visual Diagram Workflow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center text-xs">
          <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-700 flex flex-col items-center justify-center space-y-1">
            <span className="font-bold text-gov-gold">Public Website Portal</span>
            <span className="text-[10px] text-slate-400">React + TypeScript SPA</span>
          </div>

          <div className="flex items-center justify-center text-slate-400">
            <ArrowRight className="w-6 h-6 hidden md:block" />
            <span className="md:hidden">↓</span>
          </div>

          <div className="p-4 bg-gov-navy text-white rounded-xl border border-gov-gold/40 flex flex-col items-center justify-center space-y-1">
            <span className="font-bold text-white">REST API Service Layer</span>
            <span className="text-[10px] text-slate-300">Auth, RBAC & Audit Middleware</span>
          </div>

          <div className="flex items-center justify-center text-slate-400">
            <ArrowRight className="w-6 h-6 hidden md:block" />
            <span className="md:hidden">↓</span>
          </div>

          <div className="p-4 bg-emerald-900 text-white rounded-xl border border-emerald-700 flex flex-col items-center justify-center space-y-1">
            <span className="font-bold text-emerald-200">Database & Storage Layer</span>
            <span className="text-[10px] text-emerald-400">Relational Data Engine</span>
          </div>
        </div>

        <div className="pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
            <strong className="text-amber-900 block">Bank Payment Gateways (IPG)</strong>
            <p className="text-slate-600 text-[11px]">BOC IPG, People's Bank IPG, and Visa/Mastercard 3D-Secure endpoints.</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 space-y-1">
            <strong className="text-blue-900 block">SFCL Web-Based ERP System</strong>
            <p className="text-slate-600 text-[11px]">Dealerships, Govijana Sewa discounted payment synchronization queue.</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-200 space-y-1">
            <strong className="text-purple-900 block">Future e-Procurement Readiness</strong>
            <p className="text-slate-600 text-[11px]">RESTful API schema adapter for future national e-Procurement integration.</p>
          </div>
        </div>
      </div>

      {/* ERP Synchronization Dashboard */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b pb-4">
          <div>
            <h3 className="text-lg font-bold text-gov-navy">ERP Payment Synchronization Queue</h3>
            <p className="text-xs text-slate-500">Communicates online customer payments to SFCL web-based ERP for financial reconciliation.</p>
          </div>
          <button
            onClick={handleTriggerSync}
            className="px-5 py-2.5 bg-gov-green hover:bg-gov-greenDark text-white font-bold text-xs rounded-xl shadow transition flex items-center space-x-2"
          >
            <Zap className="w-4 h-4 text-gov-gold" />
            <span>Sync Now (Execute ERP Queue)</span>
          </button>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 font-bold text-slate-700 uppercase">
              <tr>
                <th className="p-3">Sync ID</th>
                <th className="p-3">Order Number</th>
                <th className="p-3">Transaction Amount</th>
                <th className="p-3">ERP Status</th>
                <th className="p-3">Generated ERP Reference</th>
                <th className="p-3">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {erpLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-slate-500">
                    No ERP sync records logged yet. Complete an e-commerce order on the website to populate the ERP sync queue.
                  </td>
                </tr>
              ) : (
                erpLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono">{log.id}</td>
                    <td className="p-3 font-mono font-bold text-gov-navy">{log.orderNumber}</td>
                    <td className="p-3 font-extrabold text-gov-green">LKR {log.amount.toLocaleString()}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 font-bold rounded-full ${
                        log.status === 'Synced' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-800 font-bold">{log.erpReference || 'Pending Trigger'}</td>
                    <td className="p-3 font-mono text-slate-500">{log.syncedAt}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ShoppingBag, RefreshCw, CheckCircle2, Truck, DollarSign, ExternalLink } from 'lucide-react';
import { db } from '../../services/db';
import { Order } from '../../types';

export const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(() => db.getOrders());
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const refreshData = () => {
    setOrders(db.getOrders());
  };

  const handleUpdateStatus = (orderId: string, status: Order['orderStatus']) => {
    db.updateOrderStatus(orderId, status);
    refreshData();
    setSelectedOrder(null);
  };

  const handleSyncERP = (orderId: string) => {
    db.syncERPNow();
    refreshData();
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border">
        <div>
          <h2 className="text-2xl font-bold text-gov-navy">Customer Orders & Sales Dashboard</h2>
          <p className="text-xs text-slate-500">View customer online orders, update status timeline, and monitor ERP payment synchronization.</p>
        </div>
        <button onClick={refreshData} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-xl flex items-center space-x-1">
          <RefreshCw className="w-4 h-4" />
          <span>Refresh List</span>
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead className="bg-gov-navy text-white font-bold uppercase tracking-wider">
            <tr>
              <th className="p-4">Order No</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Payment Method</th>
              <th className="p-4">Order Status</th>
              <th className="p-4">ERP Sync</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {orders.map(ord => (
              <tr key={ord.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-gov-navy">{ord.orderNumber}</td>
                <td className="p-4">
                  <strong className="text-slate-900 block">{ord.customerName}</strong>
                  <span className="text-slate-500">{ord.customerMobile}</span>
                </td>
                <td className="p-4 font-extrabold text-gov-green">LKR {ord.totalAmount.toLocaleString()}</td>
                <td className="p-4">{ord.paymentMethod}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                    ord.orderStatus === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                    ord.orderStatus === 'Processing' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {ord.orderStatus}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                    ord.erpSyncStatus === 'Synced' ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                  }`}>
                    {ord.erpSyncStatus === 'Synced' ? `Synced (${ord.erpReference})` : 'Pending ERP'}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  {ord.erpSyncStatus !== 'Synced' && (
                    <button onClick={() => handleSyncERP(ord.id)} className="px-2.5 py-1 bg-emerald-600 text-white font-bold rounded">
                      Sync ERP
                    </button>
                  )}
                  <button onClick={() => setSelectedOrder(ord)} className="px-3 py-1.5 bg-gov-navy text-white font-bold rounded">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View & Update Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="font-mono text-slate-500 font-bold">{selectedOrder.orderNumber}</span>
                <h3 className="text-lg font-bold text-slate-900">Order & Customer Details</h3>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="font-bold text-lg">✕</button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-1 border">
              <div><strong>Customer:</strong> {selectedOrder.customerName} ({selectedOrder.customerNic})</div>
              <div><strong>Address:</strong> {selectedOrder.deliveryAddress}</div>
              <div><strong>Payment:</strong> {selectedOrder.paymentMethod} (Txn: {selectedOrder.transactionId})</div>
              <div><strong>ERP Status:</strong> {selectedOrder.erpSyncStatus}</div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold uppercase text-slate-700">Update Order Status Timeline:</h4>
              <div className="grid grid-cols-2 gap-2">
                {['Confirmed', 'Processing', 'Ready', 'Completed'].map(st => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedOrder.id, st as any)}
                    className="py-2 bg-slate-100 hover:bg-gov-navy hover:text-white font-bold rounded-lg transition"
                  >
                    Mark {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

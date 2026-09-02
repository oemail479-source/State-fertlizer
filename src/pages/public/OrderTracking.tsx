import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, CheckCircle2, Clock, Truck, Package, ShoppingBag, FileText } from 'lucide-react';
import { db } from '../../services/db';
import { Order } from '../../types';

export const OrderTracking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [orderNo, setOrderNo] = useState(searchParams.get('ord') || 'SFCL-ORD-2026-00891');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const orders = db.getOrders();
    const found = orders.find(o => o.orderNumber.toLowerCase() === orderNo.trim().toLowerCase());
    setSearchedOrder(found || null);
  };

  useEffect(() => {
    if (searchParams.get('ord')) {
      const orders = db.getOrders();
      const found = orders.find(o => o.orderNumber.toLowerCase() === searchParams.get('ord')?.toLowerCase());
      setSearchedOrder(found || null);
      setSearched(true);
    }
  }, [searchParams]);

  const steps = [
    { title: 'Order Placed', desc: 'Order details recorded in system' },
    { title: 'Payment Confirmed', desc: 'IPG transaction verified' },
    { title: 'Order Confirmed', desc: 'SFCL depot allocation complete' },
    { title: 'Processing', desc: 'Bagging & quality testing check' },
    { title: 'Ready', desc: 'Ready for transport or depot pickup' },
    { title: 'Completed', desc: 'Delivered to customer' }
  ];

  const getStepIndex = (status: Order['orderStatus']) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Payment Successful': return 1;
      case 'Confirmed': return 2;
      case 'Processing': return 3;
      case 'Ready': return 4;
      case 'Completed': return 5;
      default: return 1;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-gradient-to-r from-gov-navy to-gov-green text-white p-8 rounded-2xl shadow-lg border border-gov-gold/30">
        <h2 className="text-3xl font-extrabold">Online Order Tracking Portal</h2>
        <p className="text-sm text-slate-200 mt-1">
          Enter your official SFCL Order Number to view real-time delivery status, payment verification, and ERP synchronization logs.
        </p>
      </div>

      {/* Search Input Form */}
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Enter Order Number (e.g. SFCL-ORD-2026-00891)"
            value={orderNo}
            onChange={e => setOrderNo(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-gov-navy focus:outline-none font-mono"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-gov-green hover:bg-gov-greenDark text-white font-bold text-sm rounded-xl shadow transition"
        >
          Track Order
        </button>
      </form>

      {/* Search Result */}
      {searched && (
        searchedOrder ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-8 animate-in fade-in">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-slate-200">
              <div>
                <span className="text-xs font-mono font-bold text-slate-500 uppercase">SFCL Official Order</span>
                <h3 className="text-2xl font-mono font-extrabold text-gov-navy">{searchedOrder.orderNumber}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Placed on: {searchedOrder.createdAt}</p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                  Status: {searchedOrder.orderStatus}
                </span>
                <p className="text-xs font-bold text-slate-700 mt-1">ERP Ref: {searchedOrder.erpReference || 'Synced'}</p>
              </div>
            </div>

            {/* Visual Timeline Bar */}
            <div className="space-y-4">
              <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">Fulfillment Timeline Progress</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {steps.map((step, idx) => {
                  const currentIdx = getStepIndex(searchedOrder.orderStatus);
                  const isDone = idx <= currentIdx;
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border text-center transition ${
                        isDone ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      <div className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center font-bold text-xs mb-2 ${
                        isDone ? 'bg-gov-green text-white' : 'bg-slate-200 text-slate-500'
                      }`}>
                        {isDone ? '✓' : idx + 1}
                      </div>
                      <h5 className="font-bold text-xs">{step.title}</h5>
                      <p className="text-[10px] mt-0.5 opacity-80">{step.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Items & Customer details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">Customer & Delivery Info</h4>
                <div className="p-4 bg-slate-50 rounded-xl text-xs space-y-1.5 border">
                  <div><strong>Customer:</strong> {searchedOrder.customerName} ({searchedOrder.customerNic})</div>
                  <div><strong>Mobile:</strong> {searchedOrder.customerMobile}</div>
                  <div><strong>Email:</strong> {searchedOrder.customerEmail}</div>
                  <div><strong>Delivery Destination:</strong> {searchedOrder.deliveryAddress}</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">Financial & Payment Details</h4>
                <div className="p-4 bg-slate-50 rounded-xl text-xs space-y-1.5 border">
                  <div><strong>Payment Gateway:</strong> {searchedOrder.paymentMethod}</div>
                  <div><strong>Transaction ID:</strong> {searchedOrder.transactionId}</div>
                  <div><strong>Payment Status:</strong> <span className="font-bold text-emerald-600">{searchedOrder.paymentStatus}</span></div>
                  <div><strong>Total Amount Paid:</strong> <span className="font-extrabold text-gov-green">LKR {searchedOrder.totalAmount.toLocaleString()}</span></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl text-center space-y-2">
            <p className="font-bold text-base">Order Not Found</p>
            <p className="text-xs">No order record matched order number "{orderNo}". Please verify your order number reference from your payment receipt.</p>
          </div>
        )
      )}
    </div>
  );
};

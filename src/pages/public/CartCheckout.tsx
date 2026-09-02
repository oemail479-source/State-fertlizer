import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, CreditCard, CheckCircle2, ArrowRight, ShieldCheck, Printer, FileText } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { MockPaymentModal } from '../../components/payment/MockPaymentModal';
import { db } from '../../services/db';
import { Order } from '../../types';

export const CartCheckout: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState('Kamal Gunaratne');
  const [customerNic, setCustomerNic] = useState('197823490182');
  const [customerEmail, setCustomerEmail] = useState('kamal.g@agri-farm.lk');
  const [customerMobile, setCustomerMobile] = useState('+94 77 456 7890');
  const [deliveryAddress, setDeliveryAddress] = useState('No. 12, Agronomy Estate Road, Anuradhapura');
  const [paymentGateway, setPaymentGateway] = useState<'BOC IPG' | 'People\'s Bank IPG' | 'Visa' | 'Mastercard'>('BOC IPG');

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const deliveryFee = items.length > 0 ? 3500 : 0;
  const totalPayable = subtotal + deliveryFee;

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerNic || !customerMobile || !customerEmail) {
      setErrorMessage('Please fill in all mandatory customer information fields.');
      return;
    }
    setErrorMessage(null);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (txnId: string) => {
    setIsPaymentModalOpen(false);

    // Create Order in DB
    const newOrder = db.createOrder({
      customerName,
      customerNic,
      customerEmail,
      customerMobile,
      deliveryAddress,
      items: items.map(i => ({
        productId: i.productId,
        productName: i.productName,
        unitPrice: i.unitPrice,
        quantity: i.quantity,
        unit: i.unit,
        total: i.total
      })),
      subtotal,
      deliveryFee,
      totalAmount: totalPayable,
      paymentMethod: paymentGateway,
      paymentStatus: 'Successful',
      orderStatus: 'Confirmed',
      transactionId: txnId
    });

    clearCart();
    setCompletedOrder(newOrder);
  };

  const handlePaymentFailure = (reason: string) => {
    setIsPaymentModalOpen(false);
    setErrorMessage(`Payment Failed: ${reason}`);
  };

  if (completedOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-emerald-200 space-y-6">
          <div className="flex items-center space-x-3 text-emerald-600 border-b border-slate-100 pb-4">
            <CheckCircle2 className="w-10 h-10" />
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Payment Successful & Order Confirmed!</h2>
              <p className="text-xs text-slate-500">Official Receipt generated for State Fertilizer Company Limited</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <p className="text-slate-500 uppercase">Order Reference</p>
              <p className="text-base font-mono font-bold text-gov-navy">{completedOrder.orderNumber}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase">Payment Transaction ID</p>
              <p className="text-base font-mono font-bold text-emerald-700">{completedOrder.transactionId}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase">Customer Name & NIC</p>
              <p className="font-semibold text-slate-800">{completedOrder.customerName} ({completedOrder.customerNic})</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase">Payment Method</p>
              <p className="font-semibold text-slate-800">{completedOrder.paymentMethod} — LKR {completedOrder.totalAmount.toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">Ordered Items Summary</h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 font-bold text-slate-700">
                  <tr>
                    <th className="p-3">Product Name</th>
                    <th className="p-3">Qty</th>
                    <th className="p-3">Unit Price</th>
                    <th className="p-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {completedOrder.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-3 font-semibold text-slate-900">{item.productName}</td>
                      <td className="p-3">{item.quantity} {item.unit}</td>
                      <td className="p-3">LKR {item.unitPrice.toLocaleString()}</td>
                      <td className="p-3 text-right font-bold text-slate-900">LKR {item.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 border-t justify-between items-center">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl shadow flex items-center space-x-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Receipt</span>
            </button>

            <div className="flex space-x-3">
              <Link
                to={`/order-tracking?ord=${completedOrder.orderNumber}`}
                className="px-5 py-2.5 bg-gov-green hover:bg-gov-greenDark text-white text-xs font-bold rounded-xl shadow flex items-center space-x-1"
              >
                <span>Track Order Live</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setCompletedOrder(null)}
                className="px-5 py-2.5 bg-gov-navy text-white text-xs font-bold rounded-xl"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Your Shopping Cart is Empty</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Browse our fertilizer product catalogue to order small or bulk quantities for your farm or estate.
        </p>
        <Link
          to="/products"
          className="inline-block px-6 py-3 bg-gov-navy hover:bg-gov-navyDark text-white font-bold text-sm rounded-xl shadow"
        >
          Go To Product Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-extrabold text-gov-navy">Checkout & Order Confirmation</h2>
        <p className="text-xs text-slate-500">Review shopping cart items and complete online payment</p>
      </div>

      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 font-semibold text-xs rounded-xl">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Cart Items & Customer Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cart Items Table */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <h3 className="font-bold text-base text-slate-900 border-b pb-2 flex items-center justify-between">
              <span>Shopping Cart Items ({items.length})</span>
              <button onClick={clearCart} className="text-xs text-rose-600 hover:underline font-semibold">Clear Cart</button>
            </h3>

            <div className="divide-y divide-slate-100">
              {items.map(item => (
                <div key={item.productId} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center space-x-3">
                    <img src={item.product.image} alt={item.productName} className="w-14 h-14 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{item.productName}</h4>
                      <p className="text-[11px] text-slate-500">{item.unit} • LKR {item.unitPrice.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 self-end sm:self-center">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-7 h-7 bg-slate-200 rounded text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-bold text-xs">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-7 h-7 bg-slate-200 rounded text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold text-xs text-gov-green w-24 text-right">
                      LKR {item.total.toLocaleString()}
                    </span>
                    <button onClick={() => removeFromCart(item.productId)} className="text-slate-400 hover:text-rose-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Details Form */}
          <form onSubmit={handleStartPayment} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <h3 className="font-bold text-base text-slate-900 border-b pb-2">Customer & Delivery Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Customer Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gov-navy focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">National Identity Card (NIC) / Reg No *</label>
                <input
                  type="text"
                  required
                  value={customerNic}
                  onChange={e => setCustomerNic(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gov-navy focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mobile Telephone Number *</label>
                <input
                  type="text"
                  required
                  value={customerMobile}
                  onChange={e => setCustomerMobile(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gov-navy focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gov-navy focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Delivery Address / Depot Pickup Point *</label>
                <textarea
                  rows={2}
                  required
                  value={deliveryAddress}
                  onChange={e => setDeliveryAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gov-navy focus:outline-none"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Right Col: Order Summary & Gateway Selection */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <h3 className="font-bold text-base text-slate-900 border-b pb-2">Order Price Summary</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal</span>
                <span className="font-mono font-bold">LKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Regional Depot Transport Fee</span>
                <span className="font-mono font-bold">LKR {deliveryFee.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t flex justify-between text-base font-extrabold text-slate-900">
                <span>Total Amount Payable</span>
                <span className="text-gov-green font-mono">LKR {totalPayable.toLocaleString()}</span>
              </div>
            </div>

            {/* Select Gateway */}
            <div className="pt-4 border-t space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase">Select Bank Payment Gateway</label>
              <div className="space-y-2 text-xs">
                {[
                  { id: 'BOC IPG', name: 'Bank of Ceylon (BOC IPG)', color: 'border-amber-600 bg-amber-50' },
                  { id: 'People\'s Bank IPG', name: 'People\'s Bank IPG', color: 'border-red-600 bg-red-50' },
                  { id: 'Visa', name: 'Visa International Card', color: 'border-blue-600 bg-blue-50' },
                  { id: 'Mastercard', name: 'Mastercard International', color: 'border-orange-600 bg-orange-50' }
                ].map(gw => (
                  <label
                    key={gw.id}
                    className={`flex items-center space-x-3 p-3 rounded-xl border-2 cursor-pointer transition ${
                      paymentGateway === gw.id ? `${gw.color} font-bold text-slate-900` : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="gateway"
                      value={gw.id}
                      checked={paymentGateway === gw.id}
                      onChange={() => setPaymentGateway(gw.id as any)}
                      className="text-gov-navy focus:ring-gov-navy"
                    />
                    <span>{gw.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={handleStartPayment}
              className="w-full py-3 bg-gov-green hover:bg-gov-greenDark text-white font-bold text-sm rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
            >
              <CreditCard className="w-5 h-5" />
              <span>Proceed to {paymentGateway}</span>
            </button>

            <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 flex items-center space-x-2 border">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>SFCL Official Encrypted Gateway. Instant receipt generated upon transaction success.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mock Payment Gateway Modal */}
      <MockPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={totalPayable}
        gateway={paymentGateway}
        description="Fertilizer Products Purchase"
        referenceNo={`ORD-${Date.now().toString().slice(-6)}`}
        onSuccess={handlePaymentSuccess}
        onFailure={handlePaymentFailure}
      />
    </div>
  );
};

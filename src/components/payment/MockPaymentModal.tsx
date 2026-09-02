import React, { useState } from 'react';
import { CreditCard, CheckCircle2, XCircle, AlertCircle, Lock, ShieldCheck } from 'lucide-react';

interface MockPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  gateway: 'BOC IPG' | 'People\'s Bank IPG' | 'Visa' | 'Mastercard';
  description: string;
  referenceNo: string;
  onSuccess: (transactionId: string) => void;
  onFailure: (reason: string) => void;
}

export const MockPaymentModal: React.FC<MockPaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  gateway,
  description,
  referenceNo,
  onSuccess,
  onFailure
}) => {
  const [cardNumber, setCardNumber] = useState('4532 8910 4421 9901');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('882');
  const [cardHolder, setCardHolder] = useState('A.B. CUMARATUNGA');
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSimulate = (outcome: 'SUCCESS' | 'FAILED' | 'CANCELLED') => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      if (outcome === 'SUCCESS') {
        const txnId = `TXN-${gateway.replace(/[^A-Z]/g, '')}-${Date.now()}`;
        onSuccess(txnId);
      } else if (outcome === 'FAILED') {
        onFailure('Payment declined by card issuer bank (Insufficient funds / Invalid OTP simulation)');
      } else {
        onClose();
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
        {/* Header with Bank / IPG branding */}
        <div className={`p-5 text-white ${gateway.includes('BOC') ? 'bg-amber-700' : gateway.includes('People') ? 'bg-red-800' : 'bg-gov-navy'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">{gateway} Secure Checkout</h3>
                <p className="text-xs text-white/80">3D-Secure 2.0 Encrypted Payment Gateway</p>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-white/20 text-xs font-semibold rounded-full border border-white/30">
              DEMO IPG
            </span>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Payment For</p>
            <p className="font-semibold text-slate-800">{description}</p>
            <p className="text-xs text-slate-500 font-mono mt-0.5">Ref: {referenceNo}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Payable</p>
            <p className="text-2xl font-extrabold text-gov-green">
              LKR {amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Card Form Simulation */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Cardholder Name</label>
            <input
              type="text"
              value={cardHolder}
              onChange={e => setCardHolder(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-gov-navy focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Card Number</label>
            <div className="relative">
              <input
                type="text"
                value={cardNumber}
                onChange={e => setCardNumber(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-gov-navy focus:outline-none font-mono"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Expiry Date</label>
              <input
                type="text"
                value={expiry}
                onChange={e => setExpiry(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-gov-navy focus:outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">CVV Code</label>
              <input
                type="password"
                value={cvv}
                onChange={e => setCvv(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-gov-navy focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Evaluator Controls */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800">
                <strong>Evaluator Control:</strong> Select the simulated bank response outcome below to test end-to-end exception workflows.
              </p>
            </div>

            {processing ? (
              <div className="flex items-center justify-center py-4 space-x-3">
                <div className="w-6 h-6 border-3 border-gov-navy border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-semibold text-slate-700">Communicating with {gateway} Server...</span>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleSimulate('SUCCESS')}
                  className="flex items-center justify-center space-x-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>SUCCESS</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSimulate('FAILED')}
                  className="flex items-center justify-center space-x-1.5 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl shadow transition"
                >
                  <XCircle className="w-4 h-4" />
                  <span>FAIL</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSimulate('CANCELLED')}
                  className="flex items-center justify-center space-x-1.5 px-4 py-2.5 bg-slate-600 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl transition"
                >
                  <span>CANCEL</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted Transaction</span>
          </span>
          <span>SFCL Official IPG Gateway Engine</span>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  FileText, Lock, Unlock, Download, ShieldCheck, 
  Search, Filter, CheckCircle2, DollarSign, Calendar 
} from 'lucide-react';
import { db } from '../../services/db';
import { Tender, TenderDocument } from '../../types';
import { MockPaymentModal } from '../../components/payment/MockPaymentModal';

export const Procurement: React.FC = () => {
  const tenders = db.getTenders();
  const purchases = db.getPurchasedTenders();

  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<TenderDocument | null>(null);
  const [buyerName, setBuyerName] = useState('Anura Kumara (Lanka Logistics Corp)');
  const [buyerEmail, setBuyerEmail] = useState('a.kumara@logistics.lk');
  const [buyerMobile, setBuyerMobile] = useState('+94 77 555 1234');
  const [companyName, setCompanyName] = useState('Lanka Logistics & Trade Services (Pvt) Ltd');
  const [paymentGateway, setPaymentGateway] = useState<'People\'s Bank IPG' | 'BOC IPG'>('People\'s Bank IPG');

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [unlockedDocId, setUnlockedDocId] = useState<string | null>(null);

  const isDocUnlocked = (doc: TenderDocument) => {
    if (!doc.isPaid || doc.documentFee === 0) return true;
    if (unlockedDocId === doc.id) return true;
    return purchases.some(p => p.documentId === doc.id && p.buyerEmail === buyerEmail);
  };

  const handleDocumentClick = (tender: Tender, doc: TenderDocument) => {
    setSelectedTender(tender);
    setSelectedDocument(doc);

    if (isDocUnlocked(doc)) {
      handleDownload(doc);
    } else {
      setIsPaymentModalOpen(true);
    }
  };

  const handleDownload = (doc: TenderDocument) => {
    // Simulate File Download
    const element = document.createElement('a');
    const file = new Blob([`SFCL OFFICIAL TENDER DOCUMENT\n\nTender Document: ${doc.title}\nFee: LKR ${doc.documentFee}\nDownloaded At: ${new Date().toLocaleString()}\nVerified Encrypted Download Payload`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = doc.fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePaymentSuccess = (txnId: string) => {
    setIsPaymentModalOpen(false);
    if (!selectedTender || !selectedDocument) return;

    db.recordTenderPurchase({
      tenderId: selectedTender.id,
      tenderRef: selectedTender.tenderRef,
      documentId: selectedDocument.id,
      buyerName,
      buyerEmail,
      buyerMobile,
      companyName,
      amount: selectedDocument.documentFee,
      transactionId: txnId
    });

    setUnlockedDocId(selectedDocument.id);
    handleDownload(selectedDocument);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-gov-navy to-slate-900 text-white p-8 rounded-2xl shadow-lg border border-gov-gold/30">
        <span className="px-3 py-1 bg-gov-gold text-gov-navy font-extrabold text-xs rounded-full uppercase tracking-wider">
          Public Procurement & Tenders Portal
        </span>
        <h2 className="text-3xl font-extrabold mt-2">Active Tenders & Paid Document Portal</h2>
        <p className="text-sm text-slate-200 mt-1 max-w-3xl">
          State Fertilizer Company Limited publishes official procurement notices. Under pre-bid regulations, paid bidding documents unlock instantly following online bank IPG verification.
        </p>
      </div>

      {/* Tenders Listing */}
      <div className="space-y-6">
        {tenders.map(tender => (
          <div key={tender.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4 hover:shadow-md transition">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-3 border-b">
              <div>
                <span className="text-xs font-mono font-bold text-gov-goldDark">{tender.tenderRef}</span>
                <h3 className="text-xl font-bold text-slate-900">{tender.title}</h3>
              </div>
              <span className={`px-3 py-1 text-xs font-bold rounded-full self-start sm:self-center ${
                tender.status === 'Open' ? 'bg-emerald-100 text-emerald-800' :
                tender.status === 'Closing Soon' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
              }`}>
                {tender.status}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{tender.description}</p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
              <span>Category: <strong className="text-slate-800">{tender.category}</strong></span>
              <span>•</span>
              <span>Published: <strong className="text-slate-800">{tender.publishedDate}</strong></span>
              <span>•</span>
              <span>Closing Date: <strong className="text-rose-700 font-bold">{tender.closingDate}</strong></span>
            </div>

            {/* Documents Grid */}
            <div className="pt-3 space-y-2">
              <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">Associated Tender Documents</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tender.documents.map(doc => {
                  const unlocked = isDocUnlocked(doc);
                  return (
                    <div
                      key={doc.id}
                      className={`p-4 rounded-xl border flex items-center justify-between transition ${
                        unlocked ? 'bg-emerald-50/60 border-emerald-200' : 'bg-amber-50/60 border-amber-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${unlocked ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {unlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                        </div>
                        <div>
                          <h5 className="font-bold text-xs text-slate-900">{doc.title}</h5>
                          <p className="text-[11px] text-slate-500">{doc.fileName} ({doc.fileSize})</p>
                          <span className={`text-[10px] font-bold ${doc.isPaid ? 'text-amber-800' : 'text-emerald-700'}`}>
                            {doc.isPaid ? `Payment Required: LKR ${doc.documentFee.toLocaleString()}` : 'FREE Open Document'}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDocumentClick(tender, doc)}
                        className={`px-3.5 py-2 text-xs font-bold rounded-xl shadow transition flex items-center space-x-1.5 ${
                          unlocked
                            ? 'bg-gov-green hover:bg-gov-greenDark text-white'
                            : 'bg-amber-600 hover:bg-amber-700 text-white'
                        }`}
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{unlocked ? 'Download' : `Pay LKR ${doc.documentFee.toLocaleString()}`}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tender Document Payment Modal */}
      {selectedDocument && (
        <MockPaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          amount={selectedDocument.documentFee}
          gateway={paymentGateway}
          description={`Tender Document Fee: ${selectedDocument.title}`}
          referenceNo={selectedTender?.tenderRef || `TND-${Date.now()}`}
          onSuccess={handlePaymentSuccess}
          onFailure={reason => alert(`Payment Failed: ${reason}`)}
        />
      )}
    </div>
  );
};

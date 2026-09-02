import React, { useState } from 'react';
import { HelpCircle, RefreshCw, Send, CheckCircle2 } from 'lucide-react';
import { db } from '../../services/db';
import { Inquiry } from '../../types';

export const InquiryManagement: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => db.getInquiries());
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [officerName, setOfficerName] = useState('Bandara Herath');
  const [responseText, setResponseText] = useState('Official SFCL response provided to customer.');

  const refreshData = () => {
    setInquiries(db.getInquiries());
  };

  const handleRespond = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry) return;

    db.updateInquiry(selectedInquiry.id, {
      status: 'Responded',
      assignedOfficer: officerName,
      response: responseText,
      respondedAt: new Date().toLocaleString()
    });

    refreshData();
    setSelectedInquiry(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border">
        <div>
          <h2 className="text-2xl font-bold text-gov-navy">Inquiry & Helpdesk Management</h2>
          <p className="text-xs text-slate-500">Track public inquiries, assign responsible officers, and dispatch email/SMS responses.</p>
        </div>
        <button onClick={refreshData} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-xl flex items-center space-x-1">
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Queue</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead className="bg-gov-navy text-white font-bold uppercase tracking-wider">
            <tr>
              <th className="p-4">Ref No</th>
              <th className="p-4">Customer Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Status</th>
              <th className="p-4">Assigned Officer</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {inquiries.map(inq => (
              <tr key={inq.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-gov-navy">{inq.referenceNo}</td>
                <td className="p-4 font-bold text-slate-900">{inq.name} ({inq.mobile})</td>
                <td className="p-4">{inq.category}</td>
                <td className="p-4 font-semibold text-slate-800">{inq.subject}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                    inq.status === 'Responded' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {inq.status}
                  </span>
                </td>
                <td className="p-4">{inq.assignedOfficer || 'Unassigned'}</td>
                <td className="p-4 text-right">
                  <button onClick={() => setSelectedInquiry(inq)} className="px-3 py-1.5 bg-gov-navy text-white font-bold rounded-lg">
                    Respond
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="font-mono text-slate-500 font-bold">{selectedInquiry.referenceNo}</span>
                <h3 className="text-lg font-bold text-slate-900">Respond to Inquiry</h3>
              </div>
              <button onClick={() => setSelectedInquiry(null)} className="font-bold text-lg">✕</button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-1 border">
              <div><strong>From:</strong> {selectedInquiry.name} ({selectedInquiry.email})</div>
              <div><strong>Subject:</strong> {selectedInquiry.subject}</div>
              <div><strong>Message:</strong> {selectedInquiry.message}</div>
            </div>

            <form onSubmit={handleRespond} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Assign Officer</label>
                <input
                  type="text"
                  required
                  value={officerName}
                  onChange={e => setOfficerName(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Response Message</label>
                <textarea
                  rows={3}
                  required
                  value={responseText}
                  onChange={e => setResponseText(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <button type="submit" className="w-full py-2.5 bg-gov-green text-white font-bold rounded-xl shadow">
                Send Response & Update Ticket
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, CheckCircle2, XCircle, Clock, 
  RefreshCw, DollarSign, Filter, Building, BedDouble 
} from 'lucide-react';
import { db } from '../../services/db';
import { BungalowBooking } from '../../types';

export const BookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<BungalowBooking[]>(() => db.getBookings());
  const [filterBungalow, setFilterBungalow] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const [selectedBooking, setSelectedBooking] = useState<BungalowBooking | null>(null);
  const [rejectionReason, setRejectionReason] = useState('Room required for emergency national agricultural inspection team');
  const [refundAmount, setRefundAmount] = useState<number>(0);

  const refreshData = () => {
    setBookings(db.getBookings());
  };

  const handleApprove = (bookingId: string) => {
    db.updateBookingStatus(bookingId, 'Approved');
    refreshData();
    setSelectedBooking(null);
  };

  const handleReject = (bookingId: string) => {
    if (!rejectionReason) return;
    db.updateBookingStatus(bookingId, 'Rejected', rejectionReason);
    refreshData();
    setSelectedBooking(null);
  };

  const handleProcessRefund = (booking: BungalowBooking) => {
    db.processRefund(booking.id, booking.totalFee);
    refreshData();
    setSelectedBooking(null);
  };

  const filteredBookings = bookings.filter(b => {
    const matchBung = filterBungalow === 'All' || b.bungalowName.includes(filterBungalow);
    const matchStatus = filterStatus === 'All' || b.status === filterStatus;
    return matchBung && matchStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border">
        <div>
          <h2 className="text-2xl font-bold text-gov-navy">Circuit Bungalow Booking Management</h2>
          <p className="text-xs text-slate-500">Manage room-level availability, review internal requests, approve/reject bookings, and process refunds.</p>
        </div>
        <button onClick={refreshData} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-xl flex items-center space-x-1">
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Queue</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border flex flex-col sm:flex-row gap-4 text-xs">
        <select value={filterBungalow} onChange={e => setFilterBungalow(e.target.value)} className="px-3 py-2 border rounded-xl">
          <option value="All">All Circuit Bungalows</option>
          <option value="Polonnaruwa">Polonnaruwa Circuit Bungalow</option>
          <option value="Nuwara-Eliya">Nuwara-Eliya Circuit Bungalow</option>
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 border rounded-xl">
          <option value="All">All Booking Statuses</option>
          <option value="Pending Internal Approval">Pending Internal Approval</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Refunded">Refunded</option>
        </select>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead className="bg-gov-navy text-white font-bold uppercase tracking-wider">
            <tr>
              <th className="p-4">Ref No</th>
              <th className="p-4">Bungalow & Room</th>
              <th className="p-4">Primary Guest</th>
              <th className="p-4">Type</th>
              <th className="p-4">Dates</th>
              <th className="p-4">Total Fee</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredBookings.map(b => (
              <tr key={b.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-gov-navy">{b.bookingRef}</td>
                <td className="p-4">
                  <strong className="text-slate-900 block">{b.bungalowName}</strong>
                  <span className="text-slate-500">{b.roomName}</span>
                </td>
                <td className="p-4">
                  <strong className="text-slate-900 block">{b.guestName}</strong>
                  <span className="text-slate-500">{b.guestMobile}</span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                    b.isInternal ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                  }`}>
                    {b.isInternal ? 'Internal Officer' : 'Public Guest'}
                  </span>
                </td>
                <td className="p-4 font-mono">{b.checkInDate} to {b.checkOutDate}</td>
                <td className="p-4 font-extrabold text-gov-green">LKR {b.totalFee.toLocaleString()}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                    b.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                    b.status === 'Pending Internal Approval' ? 'bg-amber-100 text-amber-800' :
                    b.status === 'Rejected' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setSelectedBooking(b)}
                    className="px-3 py-1.5 bg-gov-navy text-white font-bold rounded-lg"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="font-mono text-slate-500 font-bold">{selectedBooking.bookingRef}</span>
                <h3 className="text-lg font-bold text-slate-900">Manage Booking Request</h3>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="font-bold text-lg">✕</button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-1.5 border">
              <div><strong>Bungalow:</strong> {selectedBooking.bungalowName} ({selectedBooking.roomName})</div>
              <div><strong>Guest:</strong> {selectedBooking.guestName} ({selectedBooking.guestNic})</div>
              <div><strong>Dates:</strong> {selectedBooking.checkInDate} to {selectedBooking.checkOutDate}</div>
              {selectedBooking.isInternal && (
                <div><strong>Purpose:</strong> {selectedBooking.purpose} ({selectedBooking.department})</div>
              )}
              <div><strong>Fee:</strong> LKR {selectedBooking.totalFee.toLocaleString()}</div>
            </div>

            {selectedBooking.status === 'Pending Internal Approval' && (
              <div className="space-y-3 pt-2">
                <label className="block font-bold text-slate-700">Rejection Reason (If rejecting):</label>
                <textarea
                  rows={2}
                  value={rejectionReason}
                  onChange={e => setRejectionReason(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleApprove(selectedBooking.id)}
                    className="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
                  >
                    Approve Reservation
                  </button>
                  <button
                    onClick={() => handleReject(selectedBooking.id)}
                    className="py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl"
                  >
                    Reject Request
                  </button>
                </div>
              </div>
            )}

            {selectedBooking.status === 'Approved' && (
              <div className="pt-2">
                <button
                  onClick={() => handleProcessRefund(selectedBooking)}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl"
                >
                  Cancel & Process Refund (LKR {selectedBooking.totalFee.toLocaleString()})
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

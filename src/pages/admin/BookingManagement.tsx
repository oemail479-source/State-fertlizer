import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, CheckCircle2, XCircle, Clock,
  RefreshCw, Building, BedDouble, Plus, Settings2
} from 'lucide-react';
import { db } from '../../services/db';
import { Bungalow, BungalowBooking, BungalowRoom } from '../../types';

export const BookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<BungalowBooking[]>(() => db.getBookings());
  const [bungalows, setBungalows] = useState<Bungalow[]>(() => db.getBungalows());
  const [filterBungalow, setFilterBungalow] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const [selectedBooking, setSelectedBooking] = useState<BungalowBooking | null>(null);
  const [rejectionReason, setRejectionReason] = useState('Room required for emergency national agricultural inspection team');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isInternalBooking, setIsInternalBooking] = useState(true);
  const [newBookingBungalowId, setNewBookingBungalowId] = useState(() => bungalows[0]?.id || '');
  const [newBookingRoomId, setNewBookingRoomId] = useState(() => bungalows[0]?.rooms[0]?.id || '');
  const [newBooking, setNewBooking] = useState({
    checkInDate: '2026-09-15', checkOutDate: '2026-09-17', guestName: '', guestNic: '',
    guestEmail: '', guestMobile: '', department: '', purpose: ''
  });
  const [editingRoom, setEditingRoom] = useState<{ bungalowId: string; room: BungalowRoom } | null>(null);

  const refreshData = () => {
    setBookings(db.getBookings());
    setBungalows(db.getBungalows());
  };

  const selectedNewBungalow = bungalows.find(bungalow => bungalow.id === newBookingBungalowId) || bungalows[0];
  const selectedNewRoom = selectedNewBungalow?.rooms.find(room => room.id === newBookingRoomId) || selectedNewBungalow?.rooms[0];

  const handleCreateBooking = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedNewBungalow || !selectedNewRoom) return;
    const start = new Date(newBooking.checkInDate);
    const end = new Date(newBooking.checkOutDate);
    const numberOfNights = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)));
    db.createBooking({
      bungalowId: selectedNewBungalow.id, bungalowName: selectedNewBungalow.name,
      roomId: selectedNewRoom.id, roomName: selectedNewRoom.roomName,
      guestName: newBooking.guestName, guestNic: newBooking.guestNic,
      guestEmail: newBooking.guestEmail, guestMobile: newBooking.guestMobile,
      isInternal: isInternalBooking,
      department: isInternalBooking ? newBooking.department : undefined,
      purpose: isInternalBooking ? newBooking.purpose : undefined,
      checkInDate: newBooking.checkInDate, checkOutDate: newBooking.checkOutDate,
      numberOfNights, totalFee: selectedNewRoom.pricePerNight * numberOfNights,
      status: isInternalBooking ? 'Pending Internal Approval' : 'Approved', refundStatus: 'None'
    });
    refreshData();
    setIsCreateModalOpen(false);
    setNewBooking({ checkInDate: '2026-09-15', checkOutDate: '2026-09-17', guestName: '', guestNic: '', guestEmail: '', guestMobile: '', department: '', purpose: '' });
  };

  const handleSaveRoom = (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingRoom) return;
    const bungalow = bungalows.find(item => item.id === editingRoom.bungalowId);
    if (!bungalow) return;
    db.saveBungalow({
      ...bungalow,
      rooms: bungalow.rooms.map(room => room.id === editingRoom.room.id ? editingRoom.room : room)
    });
    refreshData();
    setEditingRoom(null);
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
        <div className="flex gap-2">
          <button onClick={() => setIsCreateModalOpen(true)} className="px-4 py-2 bg-gov-green hover:bg-gov-greenDark text-white text-xs font-bold rounded-xl flex items-center space-x-1">
            <Plus className="w-4 h-4" />
            <span>New Booking</span>
          </button>
          <button onClick={refreshData} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-xl flex items-center space-x-1">
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Queue</span>
          </button>
        </div>
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

      <section className="bg-white rounded-2xl border p-6 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gov-navy">Room Availability & Rates</h3>
          <p className="text-xs text-slate-500">Change whether a room can be reserved and keep its nightly LKR rate current.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {bungalows.map(bungalow => (
            <div key={bungalow.id} className="border rounded-xl p-4 space-y-3">
              <h4 className="font-bold text-slate-900">{bungalow.name}</h4>
              {bungalow.rooms.map(room => (
                <div key={room.id} className="flex items-center justify-between gap-3 border-t pt-3 text-xs">
                  <div><strong className="block">{room.roomNumber} · {room.roomName}</strong><span className="text-slate-500">LKR {room.pricePerNight.toLocaleString()} / night</span></div>
                  <div className="flex items-center gap-2"><span className={`px-2 py-1 rounded-full font-bold ${room.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : room.status === 'Maintenance' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'}`}>{room.status}</span><button onClick={() => setEditingRoom({ bungalowId: bungalow.id, room: { ...room } })} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg" title="Edit room availability"><Settings2 className="w-4 h-4" /></button></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

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

      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <form onSubmit={handleCreateBooking} className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3"><div><h3 className="text-lg font-bold text-gov-navy">Add Manual Booking</h3><p className="text-slate-500">Create a reservation for a public guest or internal member.</p></div><button type="button" onClick={() => setIsCreateModalOpen(false)} className="font-bold text-lg">✕</button></div>
            <div className="flex gap-2"><button type="button" onClick={() => setIsInternalBooking(true)} className={`flex-1 py-2 rounded-lg font-bold ${isInternalBooking ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-100'}`}>Internal Member</button><button type="button" onClick={() => setIsInternalBooking(false)} className={`flex-1 py-2 rounded-lg font-bold ${!isInternalBooking ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-slate-100'}`}>Public Guest</button></div>
            <div className="grid grid-cols-2 gap-3"><label>Check-in<input required type="date" value={newBooking.checkInDate} onChange={e => setNewBooking({ ...newBooking, checkInDate: e.target.value })} className="w-full mt-1 p-2 border rounded-lg" /></label><label>Check-out<input required type="date" value={newBooking.checkOutDate} onChange={e => setNewBooking({ ...newBooking, checkOutDate: e.target.value })} className="w-full mt-1 p-2 border rounded-lg" /></label></div>
            <div className="grid grid-cols-2 gap-3"><label>Bungalow<select value={newBookingBungalowId} onChange={e => { setNewBookingBungalowId(e.target.value); const bungalow = bungalows.find(item => item.id === e.target.value); setNewBookingRoomId(bungalow?.rooms[0]?.id || ''); }} className="w-full mt-1 p-2 border rounded-lg">{bungalows.map(bungalow => <option key={bungalow.id} value={bungalow.id}>{bungalow.name}</option>)}</select></label><label>Room<select value={newBookingRoomId} onChange={e => setNewBookingRoomId(e.target.value)} className="w-full mt-1 p-2 border rounded-lg">{selectedNewBungalow?.rooms.map(room => <option key={room.id} value={room.id} disabled={room.status !== 'Available'}>{room.roomName} ({room.status})</option>)}</select></label></div>
            <div className="grid grid-cols-2 gap-3"><label>Guest name<input required value={newBooking.guestName} onChange={e => setNewBooking({ ...newBooking, guestName: e.target.value })} className="w-full mt-1 p-2 border rounded-lg" /></label><label>NIC / ID<input required value={newBooking.guestNic} onChange={e => setNewBooking({ ...newBooking, guestNic: e.target.value })} className="w-full mt-1 p-2 border rounded-lg" /></label><label>Email<input required type="email" value={newBooking.guestEmail} onChange={e => setNewBooking({ ...newBooking, guestEmail: e.target.value })} className="w-full mt-1 p-2 border rounded-lg" /></label><label>Mobile<input required value={newBooking.guestMobile} onChange={e => setNewBooking({ ...newBooking, guestMobile: e.target.value })} className="w-full mt-1 p-2 border rounded-lg" /></label></div>
            {isInternalBooking && <div className="grid grid-cols-2 gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl"><label>Department<input required value={newBooking.department} onChange={e => setNewBooking({ ...newBooking, department: e.target.value })} className="w-full mt-1 p-2 border rounded-lg bg-white" /></label><label>Purpose of visit<input required value={newBooking.purpose} onChange={e => setNewBooking({ ...newBooking, purpose: e.target.value })} className="w-full mt-1 p-2 border rounded-lg bg-white" /></label></div>}
            <div className="p-3 bg-slate-50 rounded-xl border font-bold flex justify-between"><span>Calculated fee</span><span className="text-gov-green">LKR {selectedNewRoom ? selectedNewRoom.pricePerNight.toLocaleString() : '0'} / night</span></div>
            <div className="flex justify-end gap-2 border-t pt-4"><button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 bg-slate-200 rounded-lg">Cancel</button><button type="submit" className="px-5 py-2 bg-gov-green text-white font-bold rounded-lg">Create {isInternalBooking ? 'Internal Request' : 'Booking'}</button></div>
          </form>
        </div>
      )}

      {editingRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"><form onSubmit={handleSaveRoom} className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 space-y-4 text-xs"><div className="flex justify-between items-center"><h3 className="text-lg font-bold text-gov-navy">Update Room Availability</h3><button type="button" onClick={() => setEditingRoom(null)} className="font-bold text-lg">✕</button></div><p className="font-semibold">{editingRoom.room.roomNumber} · {editingRoom.room.roomName}</p><label className="block font-bold">Availability<select value={editingRoom.room.status} onChange={e => setEditingRoom({ ...editingRoom, room: { ...editingRoom.room, status: e.target.value as BungalowRoom['status'] } })} className="w-full mt-1 p-2 border rounded-lg"><option>Available</option><option>Maintenance</option><option>Blocked</option></select></label><label className="block font-bold">Nightly rate (LKR)<input required type="number" min="0" value={editingRoom.room.pricePerNight} onChange={e => setEditingRoom({ ...editingRoom, room: { ...editingRoom.room, pricePerNight: Number(e.target.value) } })} className="w-full mt-1 p-2 border rounded-lg" /></label><button type="submit" className="w-full py-2.5 bg-gov-green text-white font-bold rounded-lg">Save Availability</button></form></div>
      )}
    </div>
  );
};

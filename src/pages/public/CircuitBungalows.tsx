import React, { useState } from 'react';
import { 
  Calendar, MapPin, Phone, Users, CheckCircle2, Clock, 
  CreditCard, ShieldAlert, Sparkles, Building, BedDouble, Info 
} from 'lucide-react';
import { db } from '../../services/db';
import { Bungalow, BungalowRoom, BungalowBooking } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { MockPaymentModal } from '../../components/payment/MockPaymentModal';

export const CircuitBungalows: React.FC = () => {
  const { user } = useAuth();
  const bungalows = db.getBungalows();

  const [selectedBungalowId, setSelectedBungalowId] = useState<string>(bungalows[0].id);
  const [selectedRoom, setSelectedRoom] = useState<BungalowRoom | null>(null);
  const [calendarRoomId, setCalendarRoomId] = useState<string>('');
  const [calendarMonth, setCalendarMonth] = useState('2026-09');

  // Booking Form State
  const [checkInDate, setCheckInDate] = useState('2026-09-15');
  const [checkOutDate, setCheckOutDate] = useState('2026-09-17');
  const [isInternalBooking, setIsInternalBooking] = useState(user?.role === 'Internal User');
  const [guestName, setGuestName] = useState(user?.name || 'Kumara Ranasinghe');
  const [guestNic, setGuestNic] = useState('198423910823');
  const [guestEmail, setGuestEmail] = useState(user?.email || 'k.ranasinghe@agri-corp.lk');
  const [guestMobile, setGuestMobile] = useState('+94 77 234 5678');
  const [department, setDepartment] = useState('Agronomy Division');
  const [purpose, setPurpose] = useState('Maha Harvest Soil & Regional Field Officer Inspection');
  const [paymentGateway, setPaymentGateway] = useState<'BOC IPG' | 'People\'s Bank IPG'>('BOC IPG');

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [completedBooking, setCompletedBooking] = useState<BungalowBooking | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const activeBungalow = bungalows.find(b => b.id === selectedBungalowId) || bungalows[0];
  const calendarRoom = activeBungalow.rooms.find(room => room.id === calendarRoomId) || activeBungalow.rooms[0];
  const calendarDays = Array.from({ length: new Date(Number(calendarMonth.slice(0, 4)), Number(calendarMonth.slice(5, 7)), 0).getDate() }, (_, index) => `${calendarMonth}-${String(index + 1).padStart(2, '0')}`);
  const bookings = db.getBookings();
  const isBooked = (date: string) => bookings.some(booking => booking.roomId === calendarRoom?.id && booking.status !== 'Rejected' && booking.status !== 'Cancelled' && date >= booking.checkInDate && date < booking.checkOutDate);

  // Calculate nights
  const calculateNights = () => {
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diff = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights();
  const totalFee = selectedRoom ? selectedRoom.pricePerNight * nights : 0;

  const handleBookClick = (room: BungalowRoom) => {
    setSelectedRoom(room);
    setErrorMessage(null);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom) return;

    if (isInternalBooking) {
      // Create Internal Temporary Booking Request
      const newBooking = db.createBooking({
        bungalowId: activeBungalow.id,
        bungalowName: activeBungalow.name,
        roomId: selectedRoom.id,
        roomName: selectedRoom.roomName,
        guestName,
        guestNic,
        guestEmail,
        guestMobile,
        isInternal: true,
        department,
        purpose,
        checkInDate,
        checkOutDate,
        numberOfNights: nights,
        totalFee,
        status: 'Pending Internal Approval',
        refundStatus: 'None'
      });
      setCompletedBooking(newBooking);
    } else {
      // Trigger Payment Modal for External User
      setIsPaymentModalOpen(true);
    }
  };

  const handlePaymentSuccess = (txnId: string) => {
    setIsPaymentModalOpen(false);
    if (!selectedRoom) return;

    const newBooking = db.createBooking({
      bungalowId: activeBungalow.id,
      bungalowName: activeBungalow.name,
      roomId: selectedRoom.id,
      roomName: selectedRoom.roomName,
      guestName,
      guestNic,
      guestEmail,
      guestMobile,
      isInternal: false,
      checkInDate,
      checkOutDate,
      numberOfNights: nights,
      totalFee,
      status: 'Approved',
      paymentTransactionId: txnId,
      refundStatus: 'None'
    });

    setCompletedBooking(newBooking);
  };

  if (completedBooking) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 space-y-6">
          <div className="flex items-center space-x-3 border-b pb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${
              completedBooking.isInternal ? 'bg-amber-600' : 'bg-emerald-600'
            }`}>
              {completedBooking.isInternal ? <Clock className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {completedBooking.isInternal ? 'Temporary Booking Submitted — Pending Approval' : 'Bungalow Booking Confirmed!'}
              </h2>
              <p className="text-xs text-slate-500">Official SFCL Circuit Bungalow Reservation Slip</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border">
            <div>
              <p className="text-slate-500 uppercase">Booking Reference</p>
              <p className="text-base font-mono font-bold text-gov-navy">{completedBooking.bookingRef}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase">Reservation Status</p>
              <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                completedBooking.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {completedBooking.status}
              </span>
            </div>
            <div>
              <p className="text-slate-500 uppercase">Circuit Bungalow & Room</p>
              <p className="font-bold text-slate-900">{completedBooking.bungalowName}</p>
              <p className="text-slate-600">{completedBooking.roomName}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase">Check-In / Check-Out</p>
              <p className="font-bold text-slate-900">{completedBooking.checkInDate} to {completedBooking.checkOutDate} ({completedBooking.numberOfNights} Nights)</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase">Primary Guest</p>
              <p className="font-semibold text-slate-800">{completedBooking.guestName} ({completedBooking.guestNic})</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase">Total Fee</p>
              <p className="font-extrabold text-gov-green text-sm">LKR {completedBooking.totalFee.toLocaleString()}</p>
            </div>
          </div>

          {completedBooking.isInternal && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
              <strong className="block">Internal Approval Workflow Note:</strong>
              <p>Your temporary booking request has been dispatched to the SFCL Booking Officer queue. Once reviewed and approved by administration, an SMS notification and formal approval clearance will be issued.</p>
            </div>
          )}

          <div className="flex justify-between items-center pt-4 border-t">
            <button onClick={() => window.print()} className="px-5 py-2 bg-slate-800 text-white text-xs font-bold rounded-xl">
              Print Confirmation
            </button>
            <button onClick={() => setCompletedBooking(null)} className="px-5 py-2 bg-gov-navy text-white text-xs font-bold rounded-xl">
              Make Another Reservation
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-gov-navy to-slate-900 text-white p-8 rounded-2xl shadow-lg border border-gov-gold/30">
        <span className="px-3 py-1 bg-gov-gold text-gov-navy font-extrabold text-xs rounded-full uppercase tracking-wider">
          Official Holiday & Inspection Accommodations
        </span>
        <h2 className="text-3xl font-extrabold mt-2">Circuit Bungalow Reservation Portal</h2>
        <p className="text-sm text-slate-200 mt-1 max-w-3xl">
          SFCL operates modern circuit bungalows in Polonnaruwa and Nuwara-Eliya. Managing room-level availability for public guests and official internal department travel.
        </p>
      </div>

      {/* Bungalow Selector Tabs */}
      <div className="flex flex-wrap gap-4 border-b border-slate-200 pb-2">
        {bungalows.map(b => (
          <button
            key={b.id}
            onClick={() => { setSelectedBungalowId(b.id); setSelectedRoom(null); }}
            className={`px-6 py-3 font-bold text-sm rounded-xl transition flex items-center space-x-2 ${
              selectedBungalowId === b.id
                ? 'bg-gov-navy text-white shadow'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Building className="w-4 h-4 text-gov-gold" />
            <span>{b.name}</span>
          </button>
        ))}
      </div>

      {/* Selected Bungalow Overview Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <img src={activeBungalow.image} alt={activeBungalow.name} className="w-full h-64 rounded-xl object-cover" />
        <div className="lg:col-span-2 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs font-bold text-gov-goldDark uppercase tracking-wider">{activeBungalow.location}</span>
            <h3 className="text-2xl font-extrabold text-gov-navy">{activeBungalow.name}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{activeBungalow.description}</p>
            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4 text-gov-gold shrink-0" />
                <span>{activeBungalow.address}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4 text-gov-gold shrink-0" />
                <span>{activeBungalow.contactNumber}</span>
              </div>
            </div>
          </div>

          {/* Booking Category Switcher (Public vs Internal) */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800">Booking Category Mode</span>
              <p className="text-[11px] text-slate-500">
                {isInternalBooking
                  ? 'Internal Officer Temporary Booking (Requires Admin Approval)'
                  : 'Public Online Booking (Direct IPG Payment Confirmation)'}
              </p>
            </div>
            <button
              onClick={() => setIsInternalBooking(!isInternalBooking)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
                isInternalBooking ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-emerald-100 text-emerald-900 border-emerald-300'
              }`}
            >
              Switch to {isInternalBooking ? 'Public Guest Mode' : 'Internal Officer Mode'}
            </button>
          </div>
        </div>
      </div>

      <section className="bg-white rounded-2xl border p-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-3"><div><h3 className="text-xl font-bold text-gov-navy">Monthly Room Availability</h3><p className="text-xs text-slate-500">Select a green date to use it as your check-in date.</p></div><div className="flex gap-2"><select value={calendarRoom?.id} onChange={e => setCalendarRoomId(e.target.value)} className="p-2 border rounded-lg text-xs">{activeBungalow.rooms.map(room => <option key={room.id} value={room.id}>{room.roomNumber} - {room.roomName}</option>)}</select><input type="month" value={calendarMonth} onChange={e => setCalendarMonth(e.target.value)} className="p-2 border rounded-lg text-xs" /></div></div>
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-500">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <span key={day} className="p-2">{day}</span>)}{Array.from({ length: new Date(`${calendarMonth}-01`).getDay() }).map((_, index) => <span key={`empty-${index}`} />)}{calendarDays.map(date => <button key={date} type="button" disabled={!calendarRoom || calendarRoom.status !== 'Available' || isBooked(date)} onClick={() => { setCheckInDate(date); const next = new Date(`${date}T00:00:00`); next.setDate(next.getDate() + 1); setCheckOutDate(next.toISOString().slice(0, 10)); setSelectedRoom(calendarRoom); }} className={`p-2 rounded-lg font-bold ${isBooked(date) ? 'bg-rose-100 text-rose-700 cursor-not-allowed' : calendarRoom?.status !== 'Available' ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-200'}`}>{Number(date.slice(-2))}</button>)}</div><div className="flex gap-4 text-[10px] font-bold"><span className="text-emerald-700">Available</span><span className="text-rose-700">Booked</span><span className="text-slate-500">{calendarRoom?.status}</span></div>
      </section>

      {/* Room Level Availability Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gov-navy flex items-center space-x-2">
          <BedDouble className="w-5 h-5 text-gov-green" />
          <span>Room-Level Availability & Rates</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeBungalow.rooms.map(room => (
            <div key={room.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="h-44 relative overflow-hidden bg-slate-100">
                  <img src={room.image} alt={room.roomName} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 px-2.5 py-1 bg-gov-navy/90 text-white font-bold text-[10px] rounded-full">
                    {room.roomNumber}
                  </span>
                  <span className="absolute top-2 right-2 px-2 py-0.5 bg-emerald-600 text-white font-bold text-[10px] rounded-full">
                    {room.status}
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  <h4 className="font-bold text-base text-slate-900">{room.roomName}</h4>
                  <div className="text-xs text-slate-600 space-y-1">
                    <div>Capacity: <strong>Up to {room.capacity} Guests</strong></div>
                    <div>Bed Configuration: <strong>{room.bedType}</strong></div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {room.amenities.map(a => (
                      <span key={a} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded font-medium">
                        • {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Nightly Rate</span>
                  <span className="text-lg font-extrabold text-gov-green">
                    LKR {room.pricePerNight.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => handleBookClick(room)}
                  className="px-4 py-2 bg-gov-green hover:bg-gov-greenDark text-white text-xs font-bold rounded-xl shadow transition"
                >
                  Select & Reserve
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reservation Form Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200">
            <div className="p-6 bg-gov-navy text-white flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-gov-gold uppercase">{activeBungalow.name}</span>
                <h3 className="text-xl font-bold">{selectedRoom.roomName}</h3>
              </div>
              <button onClick={() => setSelectedRoom(null)} className="text-white/80 hover:text-white font-bold text-xl">✕</button>
            </div>

            <form onSubmit={handleSubmitBooking} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Check-In Date *</label>
                  <input
                    type="date"
                    required
                    value={checkInDate}
                    onChange={e => setCheckInDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Check-Out Date *</label>
                  <input
                    type="date"
                    required
                    value={checkOutDate}
                    onChange={e => setCheckOutDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Guest Name *</label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">NIC Number *</label>
                  <input
                    type="text"
                    required
                    value={guestNic}
                    onChange={e => setGuestNic(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={guestEmail}
                    onChange={e => setGuestEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile *</label>
                  <input
                    type="text"
                    required
                    value={guestMobile}
                    onChange={e => setGuestMobile(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              {isInternalBooking ? (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-3">
                  <span className="font-bold text-amber-900">Internal Booking Details</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1">SFCL Department *</label>
                      <input
                        type="text"
                        required
                        value={department}
                        onChange={e => setDepartment(e.target.value)}
                        className="w-full px-3 py-1.5 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Purpose of Visit *</label>
                      <input
                        type="text"
                        required
                        value={purpose}
                        onChange={e => setPurpose(e.target.value)}
                        className="w-full px-3 py-1.5 border rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Select Payment Gateway</label>
                  <select
                    value={paymentGateway}
                    onChange={e => setPaymentGateway(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="BOC IPG">Bank of Ceylon (BOC IPG)</option>
                    <option value="People's Bank IPG">People's Bank IPG</option>
                  </select>
                </div>
              )}

              <div className="p-4 bg-slate-50 rounded-xl border flex justify-between items-center text-sm font-bold">
                <span>Total Calculated Fee ({nights} Nights)</span>
                <span className="text-gov-green text-base">LKR {totalFee.toLocaleString()}</span>
              </div>

              <div className="pt-4 border-t flex justify-end space-x-3">
                <button type="button" onClick={() => setSelectedRoom(null)} className="px-4 py-2 bg-slate-200 rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-gov-green text-white font-bold rounded-xl shadow">
                  {isInternalBooking ? 'Submit Temporary Request' : `Pay LKR ${totalFee.toLocaleString()}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal for External Public User */}
      {selectedRoom && (
        <MockPaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          amount={totalFee}
          gateway={paymentGateway}
          description={`${activeBungalow.name} - ${selectedRoom.roomName}`}
          referenceNo={`BOK-${Date.now().toString().slice(-6)}`}
          onSuccess={handlePaymentSuccess}
          onFailure={reason => alert(`Payment Failed: ${reason}`)}
        />
      )}
    </div>
  );
};

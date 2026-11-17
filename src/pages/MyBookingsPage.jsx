import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBookings } from '../context/BookingContext';
import { useCurrency } from '../context/CurrencyContext';
import { 
  TicketCheck, 
  Plane, 
  Building2, 
  Package, 
  Car, 
  Download, 
  Printer, 
  AlertCircle, 
  CheckCircle2, 
  X, 
  Calendar, 
  Clock, 
  User, 
  CreditCard,
  ShieldCheck,
  Search
} from 'lucide-react';
import Badge from '../components/common/Badge';

export default function MyBookingsPage() {
  const { bookings, cancelBooking, refundBooking } = useBookings();
  const { format } = useCurrency();

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [activeVoucher, setActiveVoucher] = useState(null);
  const [cancelModalBooking, setCancelModalBooking] = useState(null);

  const filteredBookings = bookings.filter((b) => {
    if (filterStatus !== 'all' && b.status !== filterStatus) return false;
    if (filterType !== 'all' && b.itemType !== filterType) return false;
    return true;
  });

  const handleConfirmCancel = () => {
    if (cancelModalBooking) {
      cancelBooking(cancelModalBooking.id);
      setCancelModalBooking(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Badge variant="primary" size="sm">Travel Concierge Records</Badge>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif mt-2">
            My Bookings & E-Tickets
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            Access boarding vouchers, hotel check-in tokens, and manage travel dates.
          </p>
        </div>

        <Badge variant="demo" size="lg">
          Demo Booking Sandbox Active
        </Badge>
      </div>

      {/* Filter Tabs & Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['all', 'confirmed', 'cancelled', 'refunded'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all shrink-0 ${
                filterStatus === status 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {status === 'all' ? 'All Statuses' : status}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">Category:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none"
          >
            <option value="all">All Portals</option>
            <option value="flight">Flights Only</option>
            <option value="hotel">Hotels Only</option>
            <option value="package">Packages Only</option>
            <option value="car">Car Rentals</option>
          </select>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    {b.itemType === 'flight' && <Plane className="w-6 h-6" />}
                    {b.itemType === 'hotel' && <Building2 className="w-6 h-6" />}
                    {b.itemType === 'package' && <Package className="w-6 h-6" />}
                    {b.itemType === 'car' && <Car className="w-6 h-6" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                        {b.bookingReference}
                      </span>
                      <Badge variant="demo" size="sm">DEMO RESERVATION</Badge>
                    </div>
                    <h3 className="font-bold text-base text-slate-900 mt-1">{b.itemTitle}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge 
                    variant={
                      b.status === 'confirmed' ? 'success' : 
                      b.status === 'cancelled' ? 'danger' : 'purple'
                    } 
                    size="md"
                  >
                    {b.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              {/* Details Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Passenger / Guest</span>
                  <span className="font-bold text-slate-800 text-sm">
                    {b.passengers?.[0]?.firstName} {b.passengers?.[0]?.lastName || 'Traveler'}
                  </span>
                  <p className="text-slate-500 text-[11px]">{b.contactInfo?.email}</p>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Payment Method</span>
                  <span className="font-bold text-slate-800">{b.paymentMethod}</span>
                  <p className="text-slate-500 font-mono text-[11px]">{b.paymentId}</p>
                </div>

                <div className="sm:text-right">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Charged</span>
                  <span className="font-black text-slate-900 text-base font-sans">
                    {b.chargedCurrency} {b.chargedPrice?.toLocaleString()}
                  </span>
                  <p className="text-slate-400 text-[10px]">Supplier: ${b.supplierPrice} USD</p>
                </div>
              </div>

              {/* Actions Row */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400">
                  Booked on {new Date(b.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>

                <div className="flex items-center gap-2">
                  {b.status === 'confirmed' && (
                    <button
                      type="button"
                      onClick={() => setCancelModalBooking(b)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      Cancel Reservation
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setActiveVoucher(b)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>View Official E-Ticket</span>
                  </button>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <TicketCheck className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No bookings match this filter</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Ready to explore? Book your next worldwide flight or luxury hotel retreat now.
            </p>
            <Link
              to="/flights"
              className="inline-block px-5 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-colors"
            >
              Search Flights
            </Link>
          </div>
        )}
      </div>

      {/* OFFICIAL E-TICKET VOUCHER MODAL */}
      {activeVoucher && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95">
            
            {/* Header */}
            <div className="p-6 bg-slate-950 text-white flex items-center justify-between border-b border-blue-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <TicketCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base tracking-tight font-sans">
                    TRAVEL<span className="text-blue-500">VERSE</span> E-TICKET VOUCHER
                  </h3>
                  <p className="text-[10px] text-slate-400">Electronic Travel Document & Verified Manifest</p>
                </div>
              </div>

              <button
                onClick={() => setActiveVoucher(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Voucher Body */}
            <div className="p-6 sm:p-8 space-y-6 text-xs text-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Booking Reference (PNR)</span>
                  <p className="text-xl font-mono font-black text-blue-900">{activeVoucher.bookingReference}</p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Status</span>
                  <div>
                    <Badge variant={activeVoucher.status === 'confirmed' ? 'success' : 'danger'} size="md">
                      {activeVoucher.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Reserved Item */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Service Description</h4>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h3 className="font-bold text-sm text-slate-900">{activeVoucher.itemTitle}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Item ID: {activeVoucher.itemId} · Category: {activeVoucher.itemType?.toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Passenger & Financial manifest */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Lead Passenger</span>
                  <p className="font-bold text-slate-900">{activeVoucher.passengers?.[0]?.firstName} {activeVoucher.passengers?.[0]?.lastName}</p>
                  <p className="text-slate-500">Passport: {activeVoucher.passengers?.[0]?.passportNumber || 'Verified on file'}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-right">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Amount Charged</span>
                  <p className="font-black text-slate-900 font-sans text-sm">
                    {activeVoucher.chargedCurrency} {activeVoucher.chargedPrice?.toLocaleString()}
                  </p>
                  <p className="text-slate-500">Supplier: ${activeVoucher.supplierPrice} USD</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50 text-amber-900 text-[11px] border border-amber-200">
                Notice: This is a verified electronic demonstration voucher issued by TRAVELVERSE Global Engine. Please present this reference code or your passport upon arrival.
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Printed from TRAVELVERSE System</span>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Voucher</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CANCELLATION CONFIRMATION MODAL */}
      {cancelModalBooking && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 font-serif">Cancel This Reservation?</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Are you sure you want to cancel booking <strong className="text-slate-900">{cancelModalBooking.bookingReference}</strong>? Under our free cancellation policy, full refund of {cancelModalBooking.chargedCurrency} {cancelModalBooking.chargedPrice?.toLocaleString()} will be automatically processed.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setCancelModalBooking(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Keep Booking
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}


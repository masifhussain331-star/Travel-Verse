import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingContext';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';
import { CURRENCIES } from '../data/exchangeRates';
import Badge from '../components/common/Badge';
import BookingCheckoutModal from '../components/common/BookingCheckoutModal';
import {
  User,
  Calendar,
  Clock,
  Heart,
  MapPin,
  CreditCard,
  FileText,
  TicketCheck,
  Plane,
  Building2,
  Package,
  Car,
  Award,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Star,
  Trash2,
  ArrowRight,
  Printer,
  Download,
  Menu,
  Sparkles,
  Globe,
  Phone,
  Mail,
  BookOpen,
  UserCheck,
  TrendingUp,
} from 'lucide-react';
import {
  fetchProfile,
  updateProfile as apiUpdateProfile,
  fetchBookings as apiFetchBookings,
  fetchWishlist as apiFetchWishlist,
  fetchPaymentHistory as apiFetchPaymentHistory,
  cancelBooking as apiCancelBooking,
} from '../services/customerService';
import { isSupabaseConfigured } from '../services/supabase';

// ─── Helpers ────────────────────────────────────────────────────────────────

function typeIcon(type, className = 'w-5 h-5') {
  if (type === 'flight') return <Plane className={className} />;
  if (type === 'hotel') return <Building2 className={className} />;
  if (type === 'package') return <Package className={className} />;
  if (type === 'car') return <Car className={className} />;
  return <Globe className={className} />;
}

function statusBadgeVariant(status) {
  if (status === 'confirmed') return 'success';
  if (status === 'cancelled') return 'danger';
  if (status === 'refunded') return 'purple';
  return 'default';
}

function isFutureDate(dateStr) {
  if (!dateStr) return false;
  return new Date(dateStr) > new Date();
}

function fmtDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// ─── Spinner ────────────────────────────────────────────────────────────────
function MiniSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-10 h-10 rounded-xl bg-blue-600/10 border-2 border-blue-500/20 flex items-center justify-center text-blue-600 animate-spin">
        <Globe className="w-5 h-5" />
      </div>
    </div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────
function EmptyState({ icon: Icon, title, description, ctaText, ctaLink }) {
  return (
    <div className="bg-white rounded-3xl p-14 text-center border border-slate-200 shadow-sm space-y-4 max-w-md mx-auto">
      <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      {description && <p className="text-xs text-slate-500 leading-relaxed">{description}</p>}
      {ctaText && ctaLink && (
        <Link
          to={ctaLink}
          className="inline-block px-5 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-colors mt-2"
        >
          {ctaText}
        </Link>
      )}
    </div>
  );
}

// ─── TABS config ─────────────────────────────────────────────────────────────
const TABS = [
  { id: 'overview',     label: 'Overview',           icon: TrendingUp },
  { id: 'profile',      label: 'Profile',             icon: User },
  { id: 'upcoming',     label: 'Upcoming Trips',      icon: Calendar },
  { id: 'bookings',     label: 'Past Bookings',       icon: Clock },
  { id: 'saved',        label: 'Saved Destinations',  icon: MapPin },
  { id: 'wishlist',     label: 'Wishlist',            icon: Heart },
  { id: 'payments',     label: 'Payment History',     icon: CreditCard },
  { id: 'details',      label: 'Booking Details',     icon: FileText },
];

// ─── E-TICKET VOUCHER MODAL ──────────────────────────────────────────────────
function ETicketModal({ booking, onClose }) {
  if (!booking) return null;
  return (
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
              <p className="text-[10px] text-slate-400">Electronic Travel Document &amp; Verified Manifest</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6 text-xs text-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Booking Reference (PNR)</span>
              <p className="text-xl font-mono font-black text-blue-900">{booking.bookingReference}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Status</span>
              <div className="mt-0.5">
                <Badge variant={statusBadgeVariant(booking.status)} size="md">
                  {booking.status?.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>

          {/* Service */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Service Description</h4>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  {typeIcon(booking.itemType, 'w-4 h-4')}
                </div>
                <h3 className="font-bold text-sm text-slate-900">{booking.itemTitle}</h3>
              </div>
              <p className="text-xs text-slate-500">
                Item ID: {booking.itemId} · Category: {booking.itemType?.toUpperCase()}
              </p>
              {booking.itemDetails && (
                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-700">
                  {booking.itemType === 'flight' && (
                    <>
                      {booking.itemDetails.airline && <span><b>Airline:</b> {booking.itemDetails.airline}</span>}
                      {booking.itemDetails.flightNumber && <span><b>Flight:</b> {booking.itemDetails.flightNumber}</span>}
                      {booking.itemDetails.origin && booking.itemDetails.destination && (
                        <span><b>Route:</b> {booking.itemDetails.origin} → {booking.itemDetails.destination}</span>
                      )}
                      {booking.itemDetails.departureDate && <span><b>Date:</b> {fmtDate(booking.itemDetails.departureDate)}</span>}
                      {booking.itemDetails.departureTime && <span><b>Dep:</b> {booking.itemDetails.departureTime}</span>}
                      {booking.itemDetails.arrivalTime && <span><b>Arr:</b> {booking.itemDetails.arrivalTime}</span>}
                      {booking.itemDetails.cabinClass && <span><b>Cabin:</b> {booking.itemDetails.cabinClass}</span>}
                      {booking.itemDetails.seat && <span><b>Seat:</b> {booking.itemDetails.seat}</span>}
                      {booking.itemDetails.baggage && <span className="col-span-2"><b>Baggage:</b> {booking.itemDetails.baggage}</span>}
                    </>
                  )}
                  {booking.itemType === 'hotel' && (
                    <>
                      {booking.itemDetails.roomName && <span className="col-span-2"><b>Room:</b> {booking.itemDetails.roomName}</span>}
                      {booking.itemDetails.checkIn && <span><b>Check-in:</b> {fmtDate(booking.itemDetails.checkIn)}</span>}
                      {booking.itemDetails.checkOut && <span><b>Check-out:</b> {fmtDate(booking.itemDetails.checkOut)}</span>}
                      {booking.itemDetails.nights && <span><b>Nights:</b> {booking.itemDetails.nights}</span>}
                      {booking.itemDetails.guests && <span><b>Guests:</b> {booking.itemDetails.guests}</span>}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Passenger & Payment */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Lead Passenger</span>
              <p className="font-bold text-slate-900">
                {booking.passengers?.[0]?.firstName} {booking.passengers?.[0]?.lastName}
              </p>
              <p className="text-slate-500 text-[11px]">
                {booking.passengers?.[0]?.passport
                  ? `Passport: ${booking.passengers[0].passport}`
                  : 'Verified on file'}
              </p>
              {booking.passengers?.length > 1 && (
                <p className="text-blue-600 text-[11px] font-semibold">
                  +{booking.passengers.length - 1} more traveler{booking.passengers.length > 2 ? 's' : ''}
                </p>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-right">
              <span className="text-[10px] font-bold uppercase text-slate-400">Amount Charged</span>
              <p className="font-black text-slate-900 font-sans text-sm">
                {booking.chargedCurrency} {booking.chargedPrice?.toLocaleString()}
              </p>
              <p className="text-slate-500 text-[11px]">Supplier: ${booking.supplierPrice} USD</p>
              <p className="text-slate-400 text-[10px]">{booking.paymentMethod}</p>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px]">
            <b>Cancellation Policy:</b> Free cancellation before departure. Full refund processed within 5–7 business days to your original payment method.
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 text-amber-900 text-[11px] border border-amber-200">
            Notice: This is a verified electronic demonstration voucher issued by TRAVELVERSE Global Engine. Present this reference code or your passport upon arrival.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Printed from TRAVELVERSE System · {fmtDate(new Date().toISOString())}</span>
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
  );
}

// ─── CANCEL MODAL ────────────────────────────────────────────────────────────
function CancelModal({ booking, onConfirm, onClose }) {
  if (!booking) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 font-serif">Cancel This Reservation?</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Are you sure you want to cancel booking{' '}
          <strong className="text-slate-900">{booking.bookingReference}</strong>? Under our free
          cancellation policy, a full refund of{' '}
          <strong>{booking.chargedCurrency} {booking.chargedPrice?.toLocaleString()}</strong> will be
          automatically processed within 5–7 business days.
        </p>
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
          >
            Keep Booking
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
          >
            Confirm Cancellation
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── BOOKING DETAIL PANEL (inline expandable) ────────────────────────────────
function BookingDetailPanel({ booking, onClose, onViewTicket, onCancel }) {
  if (!booking) return null;
  const details = booking.itemDetails || {};

  return (
    <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50/40 p-5 space-y-5 text-xs">
      <div className="flex items-center justify-between">
        <span className="font-bold text-slate-800 text-sm">Booking Details</span>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-200 text-slate-500">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Reference & Status */}
      <div className="flex flex-wrap gap-4">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Booking Reference</span>
          <span className="font-mono font-black text-blue-800 text-base">{booking.bookingReference}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Status</span>
          <Badge variant={statusBadgeVariant(booking.status)} size="md">{booking.status?.toUpperCase()}</Badge>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Booked On</span>
          <span className="font-semibold text-slate-700">{fmtDate(booking.createdAt)}</span>
        </div>
      </div>

      {/* Itinerary Details */}
      {Object.keys(details).length > 0 && (
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold block mb-2">Itinerary Details</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {booking.itemType === 'flight' && (
              <>
                {details.airline && <div className="bg-white rounded-xl p-3 border border-slate-200"><span className="text-[10px] text-slate-400 block">Airline</span><span className="font-semibold">{details.airline}</span></div>}
                {details.flightNumber && <div className="bg-white rounded-xl p-3 border border-slate-200"><span className="text-[10px] text-slate-400 block">Flight No.</span><span className="font-semibold font-mono">{details.flightNumber}</span></div>}
                {details.origin && details.destination && <div className="bg-white rounded-xl p-3 border border-slate-200"><span className="text-[10px] text-slate-400 block">Route</span><span className="font-semibold">{details.origin} → {details.destination}</span></div>}
                {details.departureDate && <div className="bg-white rounded-xl p-3 border border-slate-200"><span className="text-[10px] text-slate-400 block">Date</span><span className="font-semibold">{fmtDate(details.departureDate)}</span></div>}
                {details.departureTime && <div className="bg-white rounded-xl p-3 border border-slate-200"><span className="text-[10px] text-slate-400 block">Departure</span><span className="font-semibold">{details.departureTime}</span></div>}
                {details.arrivalTime && <div className="bg-white rounded-xl p-3 border border-slate-200"><span className="text-[10px] text-slate-400 block">Arrival</span><span className="font-semibold">{details.arrivalTime}</span></div>}
                {details.cabinClass && <div className="bg-white rounded-xl p-3 border border-slate-200"><span className="text-[10px] text-slate-400 block">Class</span><span className="font-semibold">{details.cabinClass}</span></div>}
                {details.seat && <div className="bg-white rounded-xl p-3 border border-slate-200"><span className="text-[10px] text-slate-400 block">Seat</span><span className="font-semibold">{details.seat}</span></div>}
                {details.baggage && <div className="bg-white rounded-xl p-3 border border-slate-200 col-span-2 sm:col-span-3"><span className="text-[10px] text-slate-400 block">Baggage Allowance</span><span className="font-semibold">{details.baggage}</span></div>}
              </>
            )}
            {booking.itemType === 'hotel' && (
              <>
                {details.hotelName && <div className="bg-white rounded-xl p-3 border border-slate-200 col-span-2"><span className="text-[10px] text-slate-400 block">Hotel</span><span className="font-semibold">{details.hotelName}</span></div>}
                {details.city && <div className="bg-white rounded-xl p-3 border border-slate-200"><span className="text-[10px] text-slate-400 block">City</span><span className="font-semibold">{details.city}, {details.country}</span></div>}
                {details.roomName && <div className="bg-white rounded-xl p-3 border border-slate-200 col-span-2"><span className="text-[10px] text-slate-400 block">Room Type</span><span className="font-semibold">{details.roomName}</span></div>}
                {details.checkIn && <div className="bg-white rounded-xl p-3 border border-slate-200"><span className="text-[10px] text-slate-400 block">Check-in</span><span className="font-semibold">{fmtDate(details.checkIn)}</span></div>}
                {details.checkOut && <div className="bg-white rounded-xl p-3 border border-slate-200"><span className="text-[10px] text-slate-400 block">Check-out</span><span className="font-semibold">{fmtDate(details.checkOut)}</span></div>}
                {details.nights && <div className="bg-white rounded-xl p-3 border border-slate-200"><span className="text-[10px] text-slate-400 block">Nights</span><span className="font-semibold">{details.nights}</span></div>}
                {details.guests && <div className="bg-white rounded-xl p-3 border border-slate-200"><span className="text-[10px] text-slate-400 block">Guests</span><span className="font-semibold">{details.guests}</span></div>}
              </>
            )}
          </div>
        </div>
      )}

      {/* Passenger Manifest */}
      {booking.passengers?.length > 0 && (
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold block mb-2">Passenger Manifest</span>
          <div className="space-y-2">
            {booking.passengers.map((p, i) => (
              <div key={i} className="bg-white rounded-xl p-3 border border-slate-200 flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">{i + 1}</div>
                <div>
                  <span className="font-semibold text-slate-900">{p.firstName} {p.lastName}</span>
                  {p.passport && <span className="text-slate-400 ml-2 font-mono text-[10px]">({p.passport})</span>}
                  {p.meal && <span className="block text-slate-500 text-[10px]">Meal: {p.meal}</span>}
                  {p.email && <span className="block text-slate-500 text-[10px]">{p.email}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment Details */}
      <div>
        <span className="text-[10px] text-slate-400 uppercase font-bold block mb-2">Payment Details</span>
        <div className="bg-white rounded-xl p-4 border border-slate-200 grid grid-cols-2 gap-3">
          <div><span className="text-[10px] text-slate-400 block">Method</span><span className="font-semibold">{booking.paymentMethod || '—'}</span></div>
          <div><span className="text-[10px] text-slate-400 block">Payment ID</span><span className="font-mono text-[11px] text-slate-700">{booking.paymentId || '—'}</span></div>
          <div><span className="text-[10px] text-slate-400 block">Charged</span><span className="font-black text-slate-900 font-sans">{booking.chargedCurrency} {booking.chargedPrice?.toLocaleString()}</span></div>
          <div><span className="text-[10px] text-slate-400 block">Supplier Rate</span><span className="font-semibold">${booking.supplierPrice} USD</span></div>
          {booking.exchangeRate && <div className="col-span-2"><span className="text-[10px] text-slate-400 block">Exchange Rate</span><span className="font-semibold">1 USD = {booking.exchangeRate} {booking.chargedCurrency}</span></div>}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200">
        <button
          onClick={onViewTicket}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
        >
          <TicketCheck className="w-3.5 h-3.5" />
          <span>View E-Ticket</span>
        </button>
        {booking.status === 'confirmed' && (
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200"
          >
            Cancel Booking
          </button>
        )}
      </div>
    </div>
  );
}

// ─── TAB: OVERVIEW ───────────────────────────────────────────────────────────
function OverviewTab({ user, bookings, wishlistCount, format, setActiveTab }) {
  const totalSpentUSD = bookings.reduce((sum, b) => sum + (b.supplierPrice || 0), 0);
  const upcomingTrips = bookings.filter(
    (b) => b.status === 'confirmed' && isFutureDate(b.itemDetails?.departureDate || b.itemDetails?.checkIn)
  );
  const recentActivity = [...bookings].slice(0, 5);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Bookings', value: bookings.length, icon: TicketCheck, color: 'blue', badge: 'Bookings' },
          { label: 'Voyager Points', value: (user?.points || 12450).toLocaleString(), icon: Award, color: 'amber', badge: 'Points' },
          { label: 'Wishlist Items', value: wishlistCount, icon: Heart, color: 'rose', badge: 'Wishlist' },
          { label: 'Total Invested', value: format(totalSpentUSD), icon: CreditCard, color: 'emerald', badge: 'Spent' },
        ].map(({ label, value, icon: Icon, color, badge }) => (
          <div key={label} className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <div className={`flex items-center justify-between text-${color}-600 mb-2`}>
              <Icon className="w-5 h-5" />
              <span className={`text-[10px] bg-${color}-50 text-${color}-700 font-bold px-2 py-0.5 rounded-full`}>{badge}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-sans truncate">{value}</div>
            <p className="text-xs text-slate-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Upcoming Trips */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-serif">Upcoming Trips</h2>
            <p className="text-xs text-slate-400">Your confirmed future reservations</p>
          </div>
          <button
            onClick={() => setActiveTab('upcoming')}
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            View All →
          </button>
        </div>
        {upcomingTrips.length === 0 ? (
          <p className="text-xs text-slate-400 py-4 text-center">No upcoming trips. <button onClick={() => setActiveTab('bookings')} className="text-blue-600 font-semibold hover:underline">Browse your bookings</button>.</p>
        ) : (
          <div className="space-y-3">
            {upcomingTrips.slice(0, 3).map((b) => (
              <div key={b.id} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  {typeIcon(b.itemType, 'w-4 h-4')}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm text-slate-900 truncate">{b.itemTitle}</p>
                  <p className="text-[11px] text-slate-400 font-mono">{b.bookingReference}</p>
                </div>
                <Badge variant="success" size="sm">{b.status}</Badge>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-serif">Recent Activity</h2>
            <p className="text-xs text-slate-400">Latest bookings and transactions</p>
          </div>
          <button onClick={() => setActiveTab('bookings')} className="text-xs font-bold text-blue-600 hover:underline">
            View All ({bookings.length}) →
          </button>
        </div>
        {recentActivity.length === 0 ? (
          <p className="text-xs text-slate-400 py-4 text-center">No activity yet. <Link to="/flights" className="text-blue-600 font-semibold hover:underline">Start exploring!</Link></p>
        ) : (
          <div className="space-y-3">
            {recentActivity.map((b) => (
              <div key={b.id} className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  {typeIcon(b.itemType, 'w-4 h-4')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-slate-900 truncate">{b.itemTitle}</p>
                  <p className="text-[11px] text-slate-400">{fmtDate(b.createdAt)} · {b.chargedCurrency} {b.chargedPrice?.toLocaleString()}</p>
                </div>
                <Badge variant={statusBadgeVariant(b.status)} size="sm">{b.status}</Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── TAB: PROFILE ────────────────────────────────────────────────────────────
function ProfileTab({ user, updateProfile, format }) {
  const [form, setForm] = useState({
    full_name: user?.full_name || '',
    phone: user?.phone || '',
    passport_number: user?.passport_number || '',
    nationality: user?.nationality || '',
    date_of_birth: user?.date_of_birth || '',
    address: user?.address || '',
    emergency_contact: user?.emergency_contact || '',
    avatar_url: user?.avatar_url || '',
    preferred_currency: user?.preferred_currency || 'PKR',
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await apiUpdateProfile(user?.id, form);
    updateProfile(form);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const field = (name, label, type = 'text', extra = {}) => (
    <div>
      <label className="block text-xs font-bold text-slate-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600 bg-white"
        {...extra}
      />
    </div>
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 max-w-3xl">
      <div className="pb-4 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900 font-serif">Traveler Profile Settings</h2>
          <p className="text-xs text-slate-400">Your details are auto-filled when booking tickets</p>
        </div>
      </div>

      {/* Avatar Preview */}
      <div className="flex items-center gap-4">
        <img
          src={form.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
          alt="Avatar"
          className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-200"
        />
        <div className="flex-1">
          <label className="block text-xs font-bold text-slate-700 mb-1">Avatar URL</label>
          <input
            type="url"
            name="avatar_url"
            value={form.avatar_url}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
          />
        </div>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Profile details updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {field('full_name', 'Full Legal Name')}
          {field('phone', 'Mobile Phone', 'tel')}
          {field('passport_number', 'Passport / CNIC Number', 'text', { className: 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600 uppercase' })}
          {field('nationality', 'Nationality')}
          {field('date_of_birth', 'Date of Birth', 'date')}
          {field('emergency_contact', 'Emergency Contact')}
        </div>

        {field('address', 'Home Address')}

        {/* Email (read-only) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
          <input
            type="email"
            value={user?.email || ''}
            readOnly
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-100 text-xs text-slate-500 bg-slate-50"
          />
        </div>

        {/* Currency Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Currency</label>
          <select
            name="preferred_currency"
            value={form.preferred_currency}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600 bg-white"
          >
            {Object.values(CURRENCIES).map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code} — {c.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
        >
          {saving ? 'Saving…' : 'Save Profile Changes'}
        </button>
      </form>
    </div>
  );
}

// ─── TAB: UPCOMING TRIPS ─────────────────────────────────────────────────────
function UpcomingTripsTab({ bookings, cancelBooking, format }) {
  const [ticketBooking, setTicketBooking] = useState(null);
  const [cancelModal, setCancelModal] = useState(null);

  const upcoming = bookings.filter(
    (b) => b.status === 'confirmed' && isFutureDate(b.itemDetails?.departureDate || b.itemDetails?.checkIn)
  );

  const handleConfirmCancel = () => {
    if (cancelModal) {
      cancelBooking(cancelModal.id);
      setCancelModal(null);
    }
  };

  if (upcoming.length === 0) {
    return (
      <EmptyState
        icon={Calendar}
        title="No Upcoming Trips"
        description="You have no confirmed future reservations. Start planning your next adventure!"
        ctaText="Browse Flights"
        ctaLink="/flights"
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500"><span className="font-bold text-slate-800">{upcoming.length}</span> confirmed upcoming reservation{upcoming.length !== 1 ? 's' : ''}</p>
      </div>

      {upcoming.map((b) => {
        const dateLabel = b.itemDetails?.departureDate || b.itemDetails?.checkIn;
        const imgMap = {
          flight: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=80',
          hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
          package: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&auto=format&fit=crop&q=80',
          car: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&auto=format&fit=crop&q=80',
        };
        const img = imgMap[b.itemType] || imgMap.flight;

        return (
          <div key={b.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
            <div className="relative w-full md:w-52 h-40 md:h-auto flex-shrink-0 overflow-hidden">
              <img src={img} alt={b.itemTitle} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase flex items-center gap-1">
                {typeIcon(b.itemType, 'w-3 h-3')} {b.itemType}
              </div>
            </div>
            <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200">
                    {b.bookingReference}
                  </span>
                  <Badge variant="success" size="sm">Confirmed</Badge>
                </div>
                <h3 className="font-bold text-base text-slate-900 font-serif">{b.itemTitle}</h3>
                {dateLabel && (
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {fmtDate(dateLabel)}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-black text-slate-900 font-sans">
                  {b.chargedCurrency} {b.chargedPrice?.toLocaleString()}
                </span>
                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={() => setCancelModal(b)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setTicketBooking(b)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                  >
                    <TicketCheck className="w-3.5 h-3.5" />
                    <span>E-Ticket</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <ETicketModal booking={ticketBooking} onClose={() => setTicketBooking(null)} />
      <CancelModal
        booking={cancelModal}
        onConfirm={handleConfirmCancel}
        onClose={() => setCancelModal(null)}
      />
    </div>
  );
}

// ─── TAB: PAST BOOKINGS ──────────────────────────────────────────────────────
function PastBookingsTab({ bookings, cancelBooking, format }) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [ticketBooking, setTicketBooking] = useState(null);
  const [cancelModal, setCancelModal] = useState(null);

  const filtered = bookings.filter((b) => {
    if (filterStatus !== 'all' && b.status !== filterStatus) return false;
    if (filterType !== 'all' && b.itemType !== filterType) return false;
    return true;
  });

  const handleConfirmCancel = () => {
    if (cancelModal) {
      cancelBooking(cancelModal.id);
      setCancelModal(null);
      setExpandedId(null);
    }
  };

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['all', 'confirmed', 'cancelled', 'refunded'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all shrink-0 ${
                filterStatus === s ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {s === 'all' ? 'All Statuses' : s}
            </button>
          ))}
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none"
        >
          <option value="all">All Categories</option>
          <option value="flight">Flights</option>
          <option value="hotel">Hotels</option>
          <option value="package">Packages</option>
          <option value="car">Car Rentals</option>
        </select>
      </div>

      {/* Bookings List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={TicketCheck}
          title="No bookings match this filter"
          description="Try adjusting the status or category filters above, or book a new trip!"
          ctaText="Search Flights"
          ctaLink="/flights"
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((b) => (
            <div key={b.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    {typeIcon(b.itemType)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200">
                        {b.bookingReference}
                      </span>
                      {b.isDemo && <Badge variant="demo" size="sm">DEMO</Badge>}
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 mt-0.5">{b.itemTitle}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={statusBadgeVariant(b.status)} size="md">{b.status?.toUpperCase()}</Badge>
                  <button
                    onClick={() => setExpandedId(expandedId === b.id ? null : b.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    {expandedId === b.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Guest / Passenger</span>
                  <span className="font-semibold text-slate-800">{b.passengers?.[0]?.firstName} {b.passengers?.[0]?.lastName || 'Traveler'}</span>
                  <p className="text-slate-400 text-[11px]">{b.contactInfo?.email}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Payment</span>
                  <span className="font-semibold text-slate-800">{b.paymentMethod}</span>
                  <p className="text-slate-400 font-mono text-[11px]">{b.paymentId}</p>
                </div>
                <div className="sm:text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Charged</span>
                  <span className="font-black text-slate-900 font-sans text-sm">{b.chargedCurrency} {b.chargedPrice?.toLocaleString()}</span>
                  <p className="text-slate-400 text-[10px]">Supplier: ${b.supplierPrice} USD</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400">Booked on {fmtDate(b.createdAt)}</span>
                <div className="flex items-center gap-2">
                  {b.status === 'confirmed' && (
                    <button
                      onClick={() => setCancelModal(b)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={() => setTicketBooking(b)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1"
                  >
                    <Printer className="w-3 h-3" />
                    <span>E-Ticket</span>
                  </button>
                </div>
              </div>

              {/* Expandable detail panel */}
              {expandedId === b.id && (
                <BookingDetailPanel
                  booking={b}
                  onClose={() => setExpandedId(null)}
                  onViewTicket={() => setTicketBooking(b)}
                  onCancel={() => setCancelModal(b)}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <ETicketModal booking={ticketBooking} onClose={() => setTicketBooking(null)} />
      <CancelModal
        booking={cancelModal}
        onConfirm={handleConfirmCancel}
        onClose={() => setCancelModal(null)}
      />
    </div>
  );
}

// ─── TAB: SAVED DESTINATIONS ─────────────────────────────────────────────────
function SavedDestinationsTab({ wishlist, removeFromWishlist, format }) {
  const [checkoutItem, setCheckoutItem] = useState(null);

  if (wishlist.length === 0) {
    return (
      <EmptyState
        icon={MapPin}
        title="No Saved Destinations"
        description="Explore our world-class destinations and save your favorites for later."
        ctaText="Explore Destinations"
        ctaLink="/destinations"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all group flex flex-col"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.image || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&auto=format&fit=crop&q=80'}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-md"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                {item.type}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col space-y-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-blue-700 font-semibold mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
              </div>
              <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Est. Rate</span>
                  <span className="text-lg font-black text-slate-900 font-sans">{format(item.priceUSD)}</span>
                </div>
                <button
                  onClick={() => setCheckoutItem({ type: item.type, item: { id: item.id, title: item.title, name: item.title }, priceUSD: item.priceUSD })}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  Book Now <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <BookingCheckoutModal
        isOpen={Boolean(checkoutItem)}
        onClose={() => setCheckoutItem(null)}
        bookingItem={checkoutItem}
      />
    </div>
  );
}

// ─── TAB: WISHLIST ───────────────────────────────────────────────────────────
function WishlistTab({ wishlist, toggleWishlist, isWishlisted, removeFromWishlist, format }) {
  const [checkoutItem, setCheckoutItem] = useState(null);

  if (wishlist.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="Your Wishlist is Empty"
        description="Tap the heart icon on any hotel, flight, or package to save it here."
        ctaText="Browse Hotels"
        ctaLink="/hotels"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all group flex flex-col"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80'}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-rose-600/90 text-white hover:bg-rose-700 transition-all shadow-md"
                title="Remove from Wishlist"
              >
                <Heart className="w-4 h-4 fill-white" />
              </button>
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                {item.type}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col space-y-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-blue-700 font-semibold mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                {item.rating && (
                  <div className="flex items-center gap-1 mt-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-slate-800">{item.rating}</span>
                    <span className="text-[11px] text-slate-400">/ 5.0</span>
                  </div>
                )}
              </div>
              <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Starting From</span>
                  <span className="text-lg font-black text-slate-900 font-sans">{format(item.priceUSD)}</span>
                </div>
                <button
                  onClick={() => setCheckoutItem({ type: item.type, item: { id: item.id, title: item.title, name: item.title }, priceUSD: item.priceUSD })}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  Book Now <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <BookingCheckoutModal
        isOpen={Boolean(checkoutItem)}
        onClose={() => setCheckoutItem(null)}
        bookingItem={checkoutItem}
      />
    </div>
  );
}

// ─── TAB: PAYMENT HISTORY ────────────────────────────────────────────────────
function PaymentHistoryTab({ payments, format }) {
  if (payments.length === 0) {
    return (
      <EmptyState
        icon={CreditCard}
        title="No Payment History"
        description="Your confirmed bookings and transaction records will appear here."
        ctaText="Browse Packages"
        ctaLink="/packages"
      />
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-slate-900 font-serif">Payment History</h2>
          <p className="text-xs text-slate-400 mt-0.5">{payments.length} transaction{payments.length !== 1 ? 's' : ''} on record</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {['Date', 'Booking Ref', 'Item', 'Method', 'Amount', 'Status'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {payments.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 text-slate-600">{fmtDate(p.created_at)}</td>
                <td className="px-4 py-3 font-mono text-blue-700 font-bold">{p.booking_reference || p.id}</td>
                <td className="px-4 py-3 text-slate-800 font-semibold max-w-[180px] truncate">{p.item_title}</td>
                <td className="px-4 py-3 text-slate-600">{p.payment_method}</td>
                <td className="px-4 py-3 font-black text-slate-900 font-sans">
                  {p.currency} {Number(p.amount).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant={p.status === 'completed' ? 'success' : p.status === 'refunded' ? 'purple' : 'danger'}
                    size="sm"
                  >
                    {p.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── TAB: BOOKING DETAILS ────────────────────────────────────────────────────
function BookingDetailsTab({ bookings, cancelBooking }) {
  const [selectedId, setSelectedId] = useState(bookings[0]?.id || '');
  const [ticketBooking, setTicketBooking] = useState(null);
  const [cancelModal, setCancelModal] = useState(null);

  const selected = bookings.find((b) => b.id === selectedId);

  const handleConfirmCancel = () => {
    if (cancelModal) {
      cancelBooking(cancelModal.id);
      setCancelModal(null);
    }
  };

  if (bookings.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No Booking Details"
        description="Once you make a booking, all your detailed information will appear here."
        ctaText="Search Flights"
        ctaLink="/flights"
      />
    );
  }

  return (
    <div className="space-y-5">
      {/* Selector */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">Select Booking</label>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full max-w-md px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600 bg-white"
        >
          {bookings.map((b) => (
            <option key={b.id} value={b.id}>
              {b.bookingReference} — {b.itemTitle}
            </option>
          ))}
        </select>
      </div>

      {selected && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                {typeIcon(selected.itemType, 'w-6 h-6')}
              </div>
              <div>
                <h2 className="font-bold text-base text-slate-900 font-serif">{selected.itemTitle}</h2>
                <span className="font-mono text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200">
                  {selected.bookingReference}
                </span>
              </div>
            </div>
            <Badge variant={statusBadgeVariant(selected.status)} size="md">{selected.status?.toUpperCase()}</Badge>
          </div>

          <BookingDetailPanel
            booking={selected}
            onClose={() => {}}
            onViewTicket={() => setTicketBooking(selected)}
            onCancel={() => setCancelModal(selected)}
          />
        </div>
      )}

      <ETicketModal booking={ticketBooking} onClose={() => setTicketBooking(null)} />
      <CancelModal
        booking={cancelModal}
        onConfirm={handleConfirmCancel}
        onClose={() => setCancelModal(null)}
      />
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function CustomerDashboardPage() {
  const { user, isAdmin, updateProfile } = useAuth();
  const { bookings: ctxBookings, cancelBooking: ctxCancel } = useBookings();
  const { wishlist: ctxWishlist, wishlistCount, toggleWishlist, isWishlisted, removeFromWishlist } = useWishlist();
  const { format, currentCurrency } = useCurrency();
  const navigate = useNavigate();

  // Active tab state
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data state (Supabase or context fallback)
  const [bookings, setBookings] = useState(ctxBookings);
  const [wishlist, setWishlist] = useState(ctxWishlist);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sync with context whenever context changes (local storage updates)
  useEffect(() => { setBookings(ctxBookings); }, [ctxBookings]);
  useEffect(() => { setWishlist(ctxWishlist); }, [ctxWishlist]);

  // Fetch Supabase data if configured
  useEffect(() => {
    if (!user?.id || !isSupabaseConfigured) return;
    setLoading(true);
    Promise.all([
      apiFetchBookings(user.id),
      apiFetchWishlist(user.id),
      apiFetchPaymentHistory(user.id),
    ]).then(([bks, wl, pays]) => {
      if (bks?.length) setBookings(bks);
      if (wl?.length) setWishlist(wl);
      setPayments(pays || []);
    }).finally(() => setLoading(false));
  }, [user?.id]);

  // Derive payments from bookings if not fetched from Supabase
  useEffect(() => {
    if (!isSupabaseConfigured && bookings.length) {
      setPayments(bookings.map((b) => ({
        id: b.paymentId || `PAY-${b.id}`,
        booking_reference: b.bookingReference,
        item_title: b.itemTitle,
        item_type: b.itemType,
        payment_method: b.paymentMethod || 'Card on file',
        amount: b.chargedPrice,
        currency: b.chargedCurrency,
        amount_usd: b.supplierPrice,
        status: b.status === 'cancelled' ? 'refunded' : 'completed',
        created_at: b.createdAt,
      })));
    }
  }, [bookings]);

  const handleCancelBooking = useCallback((bookingId) => {
    ctxCancel(bookingId);
    apiCancelBooking(bookingId);
  }, [ctxCancel]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
            alt={user?.full_name}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-blue-500/30"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-300/30">
                {user?.loyaltyTier || 'Platinum Voyager'}
              </span>
              {isAdmin && <Badge variant="warning" size="sm">Admin Role Active</Badge>}
              {isSupabaseConfigured && <Badge variant="real" size="sm">Live Data</Badge>}
              {!isSupabaseConfigured && <Badge variant="demo" size="sm">Demo Mode</Badge>}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif mt-1">
              Welcome back, {user?.full_name?.split(' ')[0] || 'Traveler'}!
            </h1>
            <p className="text-xs text-blue-200 mt-0.5">
              Account ID: <span className="font-mono">{user?.id}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {isAdmin && (
            <Link
              to="/admin"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Center</span>
            </Link>
          )}
          <Link
            to="/flights"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Book New Trip</span>
          </Link>
        </div>
      </div>

      {/* Layout */}
      <div className="flex gap-6 items-start">

        {/* ── Sidebar (desktop) ── */}
        <aside className="hidden lg:flex flex-col w-56 shrink-0 bg-white rounded-3xl border border-slate-200 shadow-sm p-3 sticky top-6">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 pt-2 pb-3">Dashboard</p>
          <nav className="space-y-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleTabChange(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all text-left ${
                  activeTab === id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{label}</span>
                {id === 'upcoming' && bookings.filter(b => b.status === 'confirmed' && isFutureDate(b.itemDetails?.departureDate || b.itemDetails?.checkIn)).length > 0 && (
                  <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === id ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'}`}>
                    {bookings.filter(b => b.status === 'confirmed' && isFutureDate(b.itemDetails?.departureDate || b.itemDetails?.checkIn)).length}
                  </span>
                )}
                {id === 'wishlist' && wishlistCount > 0 && (
                  <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === id ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-600'}`}>
                    {wishlistCount}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* ── Mobile tab strip ── */}
        <div className="lg:hidden w-full">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-2 flex items-center gap-2 overflow-x-auto mb-5">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleTabChange(id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  activeTab === id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Content ── */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <MiniSpinner />
          ) : (
            <>
              {activeTab === 'overview' && (
                <OverviewTab
                  user={user}
                  bookings={bookings}
                  wishlistCount={wishlistCount}
                  format={format}
                  setActiveTab={setActiveTab}
                />
              )}
              {activeTab === 'profile' && (
                <ProfileTab user={user} updateProfile={updateProfile} format={format} />
              )}
              {activeTab === 'upcoming' && (
                <UpcomingTripsTab bookings={bookings} cancelBooking={handleCancelBooking} format={format} />
              )}
              {activeTab === 'bookings' && (
                <PastBookingsTab bookings={bookings} cancelBooking={handleCancelBooking} format={format} />
              )}
              {activeTab === 'saved' && (
                <SavedDestinationsTab wishlist={wishlist} removeFromWishlist={removeFromWishlist} format={format} />
              )}
              {activeTab === 'wishlist' && (
                <WishlistTab
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                  isWishlisted={isWishlisted}
                  removeFromWishlist={removeFromWishlist}
                  format={format}
                />
              )}
              {activeTab === 'payments' && (
                <PaymentHistoryTab payments={payments} format={format} />
              )}
              {activeTab === 'details' && (
                <BookingDetailsTab bookings={bookings} cancelBooking={handleCancelBooking} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingContext';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';
import {
  User,
  TicketCheck,
  Heart,
  Award,
  CreditCard,
  ShieldCheck,
  Settings,
  CheckCircle2,
  Plane,
  Building2,
  Package,
  Car,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import Badge from '../components/common/Badge';

export default function UserDashboardPage() {
  const { user, updateProfile, isAdmin } = useAuth();
  const { bookings } = useBookings();
  const { wishlistCount } = useWishlist();
  const { format, currentCurrency } = useCurrency();

  // Profile Form state
  const [fullName, setFullName] = useState(user?.full_name || 'Zainab Fatima');
  const [phone, setPhone] = useState(user?.phone || '+92 300 1234567');
  const [passportNumber, setPassportNumber] = useState(user?.passport_number || 'PK9823411');
  const [nationality, setNationality] = useState(user?.nationality || 'Pakistani');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const totalSpentUSD = bookings.reduce((sum, b) => sum + (b.supplierPrice || 0), 0);

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile({
      full_name: fullName,
      phone,
      passport_number: passportNumber,
      nationality
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
            alt={user?.full_name}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-blue-500/30"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-300/30">
                {user?.loyaltyTier || 'Platinum Voyager'}
              </span>
              {isAdmin && (
                <Badge variant="warning" size="sm">Role Active</Badge>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif mt-1">
              Welcome back, {user?.full_name || 'Traveler'}!
            </h1>
            <p className="text-xs text-blue-200 mt-0.5">
              Member Account ID: <span className="font-mono">{user?.id || 'usr-demo-786'}</span> · Default: <strong>PKR (₨)</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/bookings"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            Manage Bookings
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Center</span>
            </Link>
          )}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-blue-600 mb-2">
            <TicketCheck className="w-5 h-5" />
            <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full">Bookings</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-sans">{bookings.length}</div>
          <p className="text-xs text-slate-400 mt-0.5">Total booked trips</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-amber-500 mb-2">
            <Award className="w-5 h-5" />
            <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded-full">Voyager Points</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-sans">{user?.points || 12450}</div>
          <p className="text-xs text-slate-400 mt-0.5">Ready for flight discounts</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-rose-500 mb-2">
            <Heart className="w-5 h-5" />
            <span className="text-[10px] bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded-full">Wishlist</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-sans">{wishlistCount}</div>
          <p className="text-xs text-slate-400 mt-0.5">Saved for next journey</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-emerald-600 mb-2">
            <CreditCard className="w-5 h-5" />
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">Total Invested</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 font-sans">{format(totalSpentUSD)}</div>
          <p className="text-xs text-slate-400 mt-0.5">In PKR across verified suppliers</p>
        </div>
      </div>

      {/* Main 2-Column: Recent Bookings & Profile Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Recent Bookings */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-serif">Recent Itineraries & Vouchers</h2>
              <p className="text-xs text-slate-400">All reservations with guaranteed provider confirmation</p>
            </div>
            <Link to="/bookings" className="text-xs font-bold text-blue-600 hover:underline">
              View All ({bookings.length}) →
            </Link>
          </div>

          <div className="space-y-4">
            {bookings.slice(0, 3).map((booking) => (
              <div
                key={booking.id}
                className="p-4 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    {booking.itemType === 'flight' && <Plane className="w-5 h-5" />}
                    {booking.itemType === 'hotel' && <Building2 className="w-5 h-5" />}
                    {booking.itemType === 'package' && <Package className="w-5 h-5" />}
                    {booking.itemType === 'car' && <Car className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900">{booking.itemTitle}</h4>
                      <Badge variant="demo" size="sm">Demo</Badge>
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                      Ref: {booking.bookingReference} · Paid: {booking.chargedCurrency} {booking.chargedPrice?.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Badge variant={booking.status === 'confirmed' ? 'success' : 'warning'} size="sm">
                    {booking.status}
                  </Badge>
                  <Link
                    to="/bookings"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-white"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Profile Editor */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100 flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-serif">Traveler Profile Settings</h2>
              <p className="text-xs text-slate-400">Used for auto-filling passenger tickets</p>
            </div>
          </div>

          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Profile details updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Passport / CNIC Number</label>
              <input
                type="text"
                required
                value={passportNumber}
                onChange={(e) => setPassportNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600 uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nationality</label>
              <input
                type="text"
                required
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Currency</label>
              <input
                type="text"
                disabled
                value={`PKR (₨) — Display Default`}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-500 bg-slate-100"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              Save Profile Changes
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}


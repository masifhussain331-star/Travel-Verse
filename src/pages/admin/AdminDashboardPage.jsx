import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useBookings } from '../../context/BookingContext';
import { useCurrency } from '../../context/CurrencyContext';
import { FLIGHTS_SEED } from '../../data/flightsData';
import { HOTELS_DATA } from '../../data/hotelsData';
import { PACKAGES_DATA } from '../../data/packagesData';
import {
  ShieldCheck,
  BarChart3,
  TicketCheck,
  Users,
  Plane,
  Building2,
  Package,
  CreditCard,
  RotateCcw,
  Search,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import Badge from '../../components/common/Badge';

export default function AdminDashboardPage() {
  const { user, isAdmin, toggleAdminRole } = useAuth();
  const { bookings, cancelBooking, refundBooking } = useBookings();
  const { format, currentCurrency } = useCurrency();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'bookings' | 'customers' | 'flights' | 'hotels' | 'packages' | 'transactions'
  const [searchTerm, setSearchTerm] = useState('');
  const [flightList, setFlightList] = useState(FLIGHTS_SEED);
  const [hotelList, setHotelList] = useState(HOTELS_DATA);
  const [packageList, setPackageList] = useState(PACKAGES_DATA);
  const [selectedBookingForAction, setSelectedBookingForAction] = useState(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  // Analytics Metrics
  const totalRevenueUSD = bookings.reduce((sum, b) => sum + (b.supplierPrice || 0), 0);
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const cancelledCount = bookings.filter(b => b.status === 'cancelled').length;
  const refundedCount = bookings.filter(b => b.status === 'refunded').length;

  const demoCustomers = [
    { id: 'usr-1', name: 'Zainab Fatima', email: 'traveler@travelverse.com', phone: '+92 300 1234567', tier: 'Platinum Voyager', totalSpentUSD: 2375, bookingsCount: 2 },
    { id: 'usr-2', name: 'Hamza Tariq', email: 'hamza@travelverse.com', phone: '+92 321 4455667', tier: 'Gold Explorer', totalSpentUSD: 1450, bookingsCount: 1 },
    { id: 'usr-3', name: 'Dr. Sarah Jenkins', email: 'sarah.j@travelverse.com', phone: '+44 20 7946 0912', tier: 'Diamond Elite', totalSpentUSD: 4890, bookingsCount: 3 },
    { id: 'usr-4', name: 'Ali Rehman', email: 'ali.rehman@travelverse.com', phone: '+92 333 9988776', tier: 'Silver Voyager', totalSpentUSD: 850, bookingsCount: 1 }
  ];

  const handleIssueRefund = (bookingId) => {
    refundBooking(bookingId);
    setActionSuccessMsg(`Booking ${bookingId} successfully refunded and ledger updated.`);
    setTimeout(() => setActionSuccessMsg(''), 4000);
  };

  const handleCancelBooking = (bookingId) => {
    cancelBooking(bookingId);
    setActionSuccessMsg(`Booking ${bookingId} marked as cancelled.`);
    setTimeout(() => setActionSuccessMsg(''), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="warning" size="sm">Executive Administration Portal</Badge>
              <span className="text-xs text-slate-400 font-mono">TRAVELVERSE Master v2.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif mt-1">
              Global Platform Command Center
            </h1>
            <p className="text-xs text-blue-200 mt-0.5">
              Live operations oversight, revenue analysis, airline schedules, and customer manifest management.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleAdminRole}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-colors"
          >
            Role: {isAdmin ? 'Admin' : 'Customer'} (Toggle)
          </button>
        </div>
      </div>

      {actionSuccessMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Navigation Tabs Bar */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview Analytics', icon: BarChart3 },
          { id: 'bookings', label: `Bookings (${bookings.length})`, icon: TicketCheck },
          { id: 'customers', label: `Customers (${demoCustomers.length})`, icon: Users },
          { id: 'flights', label: `Flight Schedules (${flightList.length})`, icon: Plane },
          { id: 'hotels', label: `Hotels (${hotelList.length})`, icon: Building2 },
          { id: 'packages', label: `Tour Packages (${packageList.length})`, icon: Package },
          { id: 'transactions', label: 'Transactions & Refunds', icon: CreditCard }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW ANALYTICS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">

          {/* Top Analytics Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-blue-600">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Revenue</span>
                <span className="p-2 rounded-xl bg-blue-50 text-blue-700">
                  <TrendingUp className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-sans">
                {format(totalRevenueUSD)}
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                Supplier USD: ${totalRevenueUSD.toLocaleString()}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-emerald-600">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Confirmed Bookings</span>
                <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                  <TicketCheck className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-sans">
                {confirmedCount}
              </div>
              <p className="text-[11px] text-emerald-600 font-semibold">
                98.4% fulfillment rate
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-purple-600">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Registered Travelers</span>
                <span className="p-2 rounded-xl bg-purple-50 text-purple-700">
                  <Users className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-sans">
                14,820
              </div>
              <p className="text-[11px] text-purple-600 font-semibold">
                +420 new members this week
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-amber-600">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Partner Carriers</span>
                <span className="p-2 rounded-xl bg-amber-50 text-amber-700">
                  <Plane className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-sans">
                500+
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                NDC Live APIs Connected
              </p>
            </div>
          </div>

          {/* Revenue Chart Visualizer */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">Revenue Performance by Sector</h3>
                <p className="text-xs text-slate-400">Monthly gross booking volume in PKR & USD</p>
              </div>
              <span className="text-xs bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full">
                FY 2026 Live Ledger
              </span>
            </div>

            {/* Visual Bar Chart */}
            <div className="space-y-4">
              {[
                { sector: 'International Flights (Emirates, Qatar, PIA, Saudia)', percent: 54, amountUSD: 48500, color: 'bg-blue-600' },
                { sector: '5-Star Luxury Hotels & Resorts (Dubai, Paris, Istanbul)', percent: 28, amountUSD: 24800, color: 'bg-sky-500' },
                { sector: 'Bespoke Travel Tour Packages (Hunza, Bali, Maldives)', percent: 14, amountUSD: 12200, color: 'bg-emerald-500' },
                { sector: 'VIP Car Rentals & Chauffeurs', percent: 4, amountUSD: 3600, color: 'bg-amber-500' }
              ].map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>{item.sector}</span>
                    <span className="font-mono text-slate-900">{format(item.amountUSD)} ({item.percent}%)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${item.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: BOOKINGS MANAGEMENT */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-serif">Master Bookings Ledger</h3>
              <p className="text-xs text-slate-400">Total {bookings.length} reservations recorded in database</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 uppercase font-bold text-[10px] border-b border-slate-100">
                <tr>
                  <th className="p-4">Reference</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Title / Route</th>
                  <th className="p-4">Lead Traveler</th>
                  <th className="p-4">Charged (PKR)</th>
                  <th className="p-4">Supplier (USD)</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono font-bold text-blue-700">{b.bookingReference}</td>
                    <td className="p-4 uppercase text-[10px] font-bold text-slate-500">{b.itemType}</td>
                    <td className="p-4 font-semibold text-slate-900 max-w-xs truncate">{b.itemTitle}</td>
                    <td className="p-4 text-slate-700">{b.passengers?.[0]?.firstName} {b.passengers?.[0]?.lastName}</td>
                    <td className="p-4 font-black font-sans text-slate-900">{b.chargedCurrency} {b.chargedPrice?.toLocaleString()}</td>
                    <td className="p-4 text-slate-500 font-mono">${b.supplierPrice}</td>
                    <td className="p-4">
                      <Badge variant={b.status === 'confirmed' ? 'success' : b.status === 'cancelled' ? 'danger' : 'purple'} size="sm">
                        {b.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {b.status === 'confirmed' && (
                        <>
                          <button
                            onClick={() => handleCancelBooking(b.id)}
                            className="px-2.5 py-1 text-[11px] font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleIssueRefund(b.id)}
                            className="px-2.5 py-1 text-[11px] font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg"
                          >
                            Refund
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOMER MANAGEMENT */}
      {activeTab === 'customers' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 font-serif">Customer Roster & Loyalty Tiers</h3>
            <p className="text-xs text-slate-400">Registered travelers and verified VIP accounts</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 uppercase font-bold text-[10px] border-b border-slate-100">
                <tr>
                  <th className="p-4">Customer Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Loyalty Tier</th>
                  <th className="p-4">Bookings</th>
                  <th className="p-4">Total Spent (PKR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {demoCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{cust.name}</td>
                    <td className="p-4 text-slate-600">{cust.email}</td>
                    <td className="p-4 text-slate-600 font-mono">{cust.phone}</td>
                    <td className="p-4">
                      <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
                        {cust.tier}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-slate-800">{cust.bookingsCount} trips</td>
                    <td className="p-4 font-black text-blue-700 font-sans">{format(cust.totalSpentUSD)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: FLIGHT MANAGEMENT */}
      {activeTab === 'flights' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-serif">Flight Inventory & Schedules</h3>
              <p className="text-xs text-slate-400">Manage flight inventory, schedules, and carrier fares</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 uppercase font-bold text-[10px] border-b border-slate-100">
                <tr>
                  <th className="p-4">Flight #</th>
                  <th className="p-4">Airline</th>
                  <th className="p-4">Route</th>
                  <th className="p-4">Timings</th>
                  <th className="p-4">Seats Left</th>
                  <th className="p-4">Tariff (PKR)</th>
                  <th className="p-4">Supplier (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {flightList.map((fl) => (
                  <tr key={fl.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono font-bold text-blue-700">{fl.flightNumber}</td>
                    <td className="p-4 font-bold text-slate-900">{fl.airline}</td>
                    <td className="p-4 text-slate-700">{fl.origin} → {fl.destination}</td>
                    <td className="p-4 font-mono text-slate-600">{fl.departureTime} - {fl.arrivalTime}</td>
                    <td className="p-4 font-bold text-emerald-600">{fl.availableSeats} seats</td>
                    <td className="p-4 font-black font-sans text-slate-900">{format(fl.basePriceUSD)}</td>
                    <td className="p-4 font-mono text-slate-500">${fl.basePriceUSD}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: HOTEL MANAGEMENT */}
      {activeTab === 'hotels' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 font-serif">Hotel Properties & Room Rates</h3>
            <p className="text-xs text-slate-400">Luxury resorts connected to TRAVELVERSE inventory</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 uppercase font-bold text-[10px] border-b border-slate-100">
                <tr>
                  <th className="p-4">Property</th>
                  <th className="p-4">City</th>
                  <th className="p-4">Stars</th>
                  <th className="p-4">Guest Rating</th>
                  <th className="p-4">Starting Rate (PKR)</th>
                  <th className="p-4">Supplier (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {hotelList.map((htl) => (
                  <tr key={htl.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{htl.name}</td>
                    <td className="p-4 text-slate-600">{htl.city}, {htl.country}</td>
                    <td className="p-4 text-amber-500 font-bold">{htl.starRating} ★</td>
                    <td className="p-4 font-bold text-blue-700">★ {htl.userRating}</td>
                    <td className="p-4 font-black font-sans text-slate-900">{format(htl.pricePerNightUSD)}</td>
                    <td className="p-4 font-mono text-slate-500">${htl.pricePerNightUSD}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: PACKAGE MANAGEMENT */}
      {activeTab === 'packages' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 font-serif">Curated Tour Packages</h3>
            <p className="text-xs text-slate-400">All-inclusive expeditions & holiday schedules</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 uppercase font-bold text-[10px] border-b border-slate-100">
                <tr>
                  <th className="p-4">Package Title</th>
                  <th className="p-4">Destination</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Group Size</th>
                  <th className="p-4">Price (PKR)</th>
                  <th className="p-4">Supplier (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {packageList.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{pkg.title}</td>
                    <td className="p-4 text-slate-600">{pkg.destination}</td>
                    <td className="p-4 text-blue-700 font-semibold">{pkg.duration}</td>
                    <td className="p-4 text-slate-600">{pkg.groupSize}</td>
                    <td className="p-4 font-black font-sans text-slate-900">{format(pkg.pricePerPersonUSD)}</td>
                    <td className="p-4 font-mono text-slate-500">${pkg.pricePerPersonUSD}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 7: TRANSACTIONS & REFUNDS */}
      {activeTab === 'transactions' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 font-serif">Financial Transactions & Refund Ledger</h3>
            <p className="text-xs text-slate-400">All payment authorizations and refund settlements</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 uppercase font-bold text-[10px] border-b border-slate-100">
                <tr>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Booking Ref</th>
                  <th className="p-4">Payment Method</th>
                  <th className="p-4">Amount (PKR)</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Refund Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-800">{b.paymentId}</td>
                    <td className="p-4 font-mono text-blue-700 font-semibold">{b.bookingReference}</td>
                    <td className="p-4 text-slate-700">{b.paymentMethod}</td>
                    <td className="p-4 font-black font-sans text-slate-900">{b.chargedCurrency} {b.chargedPrice?.toLocaleString()}</td>
                    <td className="p-4">
                      <Badge variant={b.status === 'refunded' ? 'purple' : b.status === 'confirmed' ? 'success' : 'danger'} size="sm">
                        {b.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      {b.status === 'confirmed' ? (
                        <button
                          onClick={() => handleIssueRefund(b.id)}
                          className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs"
                        >
                          Execute Refund
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-semibold">Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}


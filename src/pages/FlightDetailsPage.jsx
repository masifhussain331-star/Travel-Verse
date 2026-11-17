import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import { FLIGHTS_SEED } from '../data/flightsData';
import BookingCheckoutModal from '../components/common/BookingCheckoutModal';
import { 
  Plane, 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  Luggage, 
  Wifi, 
  Tv, 
  Coffee, 
  Zap, 
  CheckCircle2, 
  Lock,
  Sparkles,
  Check
} from 'lucide-react';
import Badge from '../components/common/Badge';

export default function FlightDetailsPage() {
  const { id } = useParams();
  const { format, currentCurrency } = useCurrency();
  const [selectedSeat, setSelectedSeat] = useState('14A (Window)');
  const [selectedMeal, setSelectedMeal] = useState('Halal Muslim Meal (MOML)');
  const [selectedExtraBags, setSelectedExtraBags] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Find flight by ID or fallback
  const flight = FLIGHTS_SEED.find(f => f.id === id) || FLIGHTS_SEED[0];

  const extraOptions = [
    { id: 'bag-23kg', label: '+1 Additional 23 kg Checked Bag', priceUSD: 45 },
    { id: 'bag-32kg', label: '+1 Heavy 32 kg Checked Bag', priceUSD: 70 }
  ];

  const extraBaggageUSD = selectedExtraBags.reduce((sum, bagId) => {
    const found = extraOptions.find(b => b.id === bagId);
    return sum + (found?.priceUSD || 0);
  }, 0);

  const taxesUSD = Math.round(flight.basePriceUSD * 0.12);
  const totalUSD = flight.basePriceUSD + taxesUSD + extraBaggageUSD;

  const toggleExtraBag = (bagId) => {
    if (selectedExtraBags.includes(bagId)) {
      setSelectedExtraBags(selectedExtraBags.filter(b => b !== bagId));
    } else {
      setSelectedExtraBags([...selectedExtraBags, bagId]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button */}
      <Link
        to="/flights"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Flight Search Results</span>
      </Link>

      {/* Main Flight Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full border border-blue-400/30 uppercase">
                {flight.cabinClass} Class
              </span>
              <Badge variant="demo" size="sm">
                <Sparkles className="w-3 h-3 text-amber-700" />
                <span>Demo Carrier Feed</span>
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-serif mt-2">
              {flight.airline} · {flight.flightNumber}
            </h1>
            <p className="text-xs sm:text-sm text-blue-200 mt-1">
              Direct routing from {flight.originCity} ({flight.origin}) to {flight.destinationCity} ({flight.destination})
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block uppercase font-bold">Total Fare ({currentCurrency})</span>
            <span className="text-3xl font-black text-white font-sans">{format(totalUSD)}</span>
            <span className="text-xs text-slate-300 block">Supplier: ${totalUSD} USD</span>
          </div>
        </div>
      </div>

      {/* Grid: Route Details & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Flight Timeline Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Flight Schedule & Routing</span>
            </h2>

            <div className="space-y-6 border-l-2 border-blue-200 pl-4 ml-2">
              <div className="relative">
                <span className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-slate-900">{flight.departureTime}</span>
                  <span className="text-sm font-bold text-blue-700">{flight.origin} - {flight.originName}</span>
                </div>
                <p className="text-xs text-slate-500">{flight.originCity}, Terminal 1 · Scheduled On-Time</p>
              </div>

              <div className="py-2 text-xs text-slate-500 flex items-center gap-2">
                <Plane className="w-4 h-4 text-blue-500" />
                <span>Flight Duration: {flight.duration} · {flight.aircraft}</span>
              </div>

              <div className="relative">
                <span className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-600 ring-4 ring-emerald-100"></span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-slate-900">{flight.arrivalTime}</span>
                  <span className="text-sm font-bold text-blue-700">{flight.destination} - {flight.destinationName}</span>
                </div>
                <p className="text-xs text-slate-500">{flight.destinationCity}, Terminal 3 · Baggage Hall</p>
              </div>
            </div>
          </div>

          {/* Baggage Information & Add-ons */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Luggage className="w-5 h-5 text-blue-600" />
              <span>Baggage Policy & Additional Luggage</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Included Cabin Bag</span>
                <p className="text-base font-bold text-slate-900 mt-1">{flight.baggage.carryOn}</p>
                <p className="text-xs text-slate-500">1 piece up to 7 kg + personal laptop briefcase</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Included Checked Baggage</span>
                <p className="text-base font-bold text-slate-900 mt-1">{flight.baggage.checked}</p>
                <p className="text-xs text-slate-500">Free standard allowance checked to final destination</p>
              </div>
            </div>

            {/* Extra Baggage Add-ons */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Need Extra Baggage Allowance?
              </h4>
              <div className="space-y-2">
                {extraOptions.map((opt) => {
                  const isSelected = selectedExtraBags.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => toggleExtraBag(opt.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected 
                          ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' 
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                          isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-xs font-bold text-slate-900">{opt.label}</span>
                      </div>
                      <span className="text-xs font-bold text-blue-700 font-sans">
                        +{format(opt.priceUSD)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* In-Flight Services */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center gap-2">
                <Wifi className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-semibold text-slate-700">Wi-Fi Access</span>
              </div>
              <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center gap-2">
                <Tv className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-semibold text-slate-700">ICE Entertainment</span>
              </div>
              <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center gap-2">
                <Coffee className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-semibold text-slate-700">Halal Meals</span>
              </div>
              <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-semibold text-slate-700">USB Power</span>
              </div>
            </div>
          </div>

          {/* Seat Layout Selection */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Seat Map Selection</h2>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                Assigned: {selectedSeat}
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap gap-2">
              {['12A (Window)', '12B', '12C (Aisle)', '14A (Window)', '14B', '14C (Aisle)', '15D (Aisle)', '15E', '15F (Window)'].map((seat) => (
                <button
                  key={seat}
                  type="button"
                  onClick={() => setSelectedSeat(seat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedSeat === seat
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {seat}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Pricing & Checkout */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 sticky top-24">
          <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
            Fare Summary
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Base Airfare (Adult x 1)</span>
              <span>{format(flight.basePriceUSD)} (${flight.basePriceUSD} USD)</span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Taxes, Security & Carrier Fees</span>
              <span>{format(taxesUSD)} (${taxesUSD} USD)</span>
            </div>

            {extraBaggageUSD > 0 && (
              <div className="flex justify-between text-blue-700 font-semibold">
                <span>Selected Extra Baggage</span>
                <span>+{format(extraBaggageUSD)}</span>
              </div>
            )}

            <div className="pt-3 border-t border-slate-200 flex justify-between font-black text-slate-900 text-base">
              <span>Total Price</span>
              <span className="text-blue-700 font-sans text-xl">{format(totalUSD)}</span>
            </div>

            <p className="text-[10px] text-slate-400">
              Default currency: <strong>PKR</strong>. All conversions calculated at institutional spot exchange rates.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setCheckoutOpen(true)}
            className="w-full py-3.5 bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>Book Flight Now</span>
          </button>

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-[11px] text-emerald-800 space-y-1">
            <div className="flex items-center gap-1 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Free Cancellation Window</span>
            </div>
            <p>
              Cancel within 24 hours of booking for a full 100% refund without penalty fees.
            </p>
          </div>
        </div>

      </div>

      {/* Booking Checkout Modal */}
      <BookingCheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        bookingItem={{
          type: 'flight',
          item: flight,
          priceUSD: totalUSD
        }}
      />

    </div>
  );
}

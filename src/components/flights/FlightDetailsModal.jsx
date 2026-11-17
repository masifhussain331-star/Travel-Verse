import React, { useState } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { 
  X, 
  Plane, 
  Clock, 
  Luggage, 
  ShieldCheck, 
  CheckCircle2, 
  Wifi, 
  Tv, 
  Coffee, 
  Zap, 
  ArrowRight,
  Sparkles,
  Plus,
  Check
} from 'lucide-react';
import Badge from '../common/Badge';

export default function FlightDetailsModal({ flight, isOpen, onClose, onProceedToBooking }) {
  const { format, currentCurrency } = useCurrency();
  const [selectedSeat, setSelectedSeat] = useState('14A (Window)');
  const [selectedMeal, setSelectedMeal] = useState('Halal Muslim Meal (MOML)');
  const [selectedExtraBags, setSelectedExtraBags] = useState([]);
  const [activeTab, setActiveTab] = useState('itinerary'); // 'itinerary' | 'baggage' | 'seats'

  if (!isOpen || !flight) return null;

  // Extra baggage calculation
  const extraBaggagePriceUSD = selectedExtraBags.reduce((sum, bagId) => {
    const opt = flight.baggage?.extraBaggageOptions?.find(b => b.id === bagId);
    return sum + (opt?.priceUSD || 0);
  }, 0);

  const baseUSD = flight.basePriceUSD || 300;
  const taxesUSD = Math.round(baseUSD * 0.12);
  const totalUSD = baseUSD + taxesUSD + extraBaggagePriceUSD;

  const toggleExtraBag = (bagId) => {
    if (selectedExtraBags.includes(bagId)) {
      setSelectedExtraBags(selectedExtraBags.filter(b => b !== bagId));
    } else {
      setSelectedExtraBags([...selectedExtraBags, bagId]);
    }
  };

  const handleContinue = () => {
    onProceedToBooking({
      ...flight,
      selectedSeat,
      selectedMeal,
      selectedExtraBags,
      extraBaggagePriceUSD,
      totalUSD
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-slate-950 via-blue-950 to-blue-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-extrabold tracking-wider bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded-full border border-blue-400/30">
                Verified Flight Itinerary
              </span>

              {flight.isDemo ? (
                <Badge variant="demo" size="sm">
                  <Sparkles className="w-3 h-3 text-amber-700" />
                  <span>Demo Feed</span>
                </Badge>
              ) : (
                <Badge variant="real" size="sm">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" />
                  <span>Verified GDS Live</span>
                </Badge>
              )}
            </div>

            <h2 className="text-xl font-bold mt-1 text-white font-sans">
              {flight.airline} · {flight.flightNumber}
            </h2>
            <p className="text-xs text-blue-200">
              {flight.originCity} ({flight.origin}) to {flight.destinationCity} ({flight.destination}) · {flight.cabinClass}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
          {[
            { id: 'itinerary', label: 'Route Itinerary', icon: Plane },
            { id: 'baggage', label: 'Baggage Allowance & Add-ons', icon: Luggage },
            { id: 'seats', label: 'Seat & Meal Selection', icon: Coffee }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold border-b-2 transition-all ${
                  active 
                    ? 'border-blue-600 text-blue-700 bg-white rounded-t-xl' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Content Body */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
          
          {/* TAB 1: ITINERARY */}
          {activeTab === 'itinerary' && (
            <div className="space-y-5">
              {/* Departure & Arrival Cards */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-black text-slate-900">{flight.departureTime}</span>
                    <p className="text-xs font-bold text-blue-700">{flight.origin} - {flight.originName}</p>
                    <p className="text-[11px] text-slate-500">Terminal 1</p>
                  </div>

                  <div className="flex flex-col items-center px-4">
                    <span className="text-xs font-semibold text-slate-500">{flight.duration}</span>
                    <div className="w-32 h-0.5 bg-blue-300 relative my-1">
                      <Plane className="w-4 h-4 text-blue-600 absolute left-1/2 -top-2 -translate-x-1/2" />
                    </div>
                    <span className="text-[11px] text-emerald-600 font-semibold">{flight.stopDetails}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-2xl font-black text-slate-900">{flight.arrivalTime}</span>
                    <p className="text-xs font-bold text-blue-700">{flight.destination} - {flight.destinationName}</p>
                    <p className="text-[11px] text-slate-500">Terminal 3</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-3 border-t border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">AIRCRAFT</span>
                    <span className="font-bold text-slate-800">{flight.aircraft}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">CABIN CLASS</span>
                    <span className="font-bold text-slate-800">{flight.cabinClass}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">PROVIDER FEED</span>
                    <span className="font-bold text-blue-700">{flight.providerSource}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">EMISSIONS</span>
                    <span className="font-bold text-slate-800">{flight.co2Emissions || '150 kg CO₂e'}</span>
                  </div>
                </div>
              </div>

              {/* In-Flight Perks */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  In-Flight Entertainment & Amenities
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold text-slate-700">In-Flight Wi-Fi</span>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center gap-2">
                    <Tv className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold text-slate-700">Audio & Video</span>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold text-slate-700">Halal Meal & Drinks</span>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold text-slate-700">USB Power Port</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BAGGAGE INFORMATION & SELECTION */}
          {activeTab === 'baggage' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-blue-700 font-bold mb-1">
                    <Luggage className="w-4 h-4" />
                    <span className="text-xs uppercase">Included Cabin Bag</span>
                  </div>
                  <p className="text-lg font-black text-slate-900">{flight.baggage?.carryOn || '7 kg'}</p>
                  <p className="text-xs text-slate-500">1 standard cabin bag (55x40x20cm) + personal laptop bag</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold mb-1">
                    <Luggage className="w-4 h-4" />
                    <span className="text-xs uppercase">Included Checked Baggage</span>
                  </div>
                  <p className="text-lg font-black text-slate-900">{flight.baggage?.checked || '30 kg'}</p>
                  <p className="text-xs text-slate-500">Included free with your fare without excess fees</p>
                </div>
              </div>

              {/* Extra Baggage Selection */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Need Extra Luggage Allowance? (Optional Add-ons)
                </h4>
                <div className="space-y-2">
                  {flight.baggage?.extraBaggageOptions?.map((opt) => {
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
                          <div>
                            <p className="text-xs font-bold text-slate-900">{opt.label}</p>
                            <p className="text-[11px] text-slate-400">Guaranteed baggage tag with airline</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-blue-700 font-sans">
                            +{format(opt.priceUSD)}
                          </span>
                          <span className="text-[10px] text-slate-400 block">${opt.priceUSD} USD</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SEAT & MEAL SELECTION */}
          {activeTab === 'seats' && (
            <div className="space-y-5">
              {/* Meal Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Complimentary Meal Preference
                </label>
                <select
                  value={selectedMeal}
                  onChange={(e) => setSelectedMeal(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600"
                >
                  {flight.mealOptions?.map((meal, idx) => (
                    <option key={idx} value={meal}>
                      {meal}
                    </option>
                  ))}
                </select>
              </div>

              {/* Seat Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Seat Location Preference
                  </label>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg">
                    Assigned: {selectedSeat}
                  </span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap gap-2">
                  {['12A (Window)', '12B (Middle)', '12C (Aisle)', '14A (Window)', '14C (Aisle)', '15D (Aisle)', '15E (Middle)', '15F (Window)'].map((seat) => (
                    <button
                      key={seat}
                      type="button"
                      onClick={() => setSelectedSeat(seat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        selectedSeat === seat 
                          ? 'bg-blue-600 text-white shadow-sm' 
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {seat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Fare & Price Breakdown Bar */}
          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs space-y-1.5">
            <div className="flex justify-between text-slate-600">
              <span>Base Airfare (1 Passenger)</span>
              <span>{format(baseUSD)} (${baseUSD} USD)</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Airport & Government Security Charges</span>
              <span>{format(taxesUSD)} (${taxesUSD} USD)</span>
            </div>
            {extraBaggagePriceUSD > 0 && (
              <div className="flex justify-between text-blue-700 font-semibold">
                <span>Selected Additional Baggage ({selectedExtraBags.length} piece)</span>
                <span>+{format(extraBaggagePriceUSD)} (${extraBaggagePriceUSD} USD)</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
              <span>Verified Total Tariff ({currentCurrency})</span>
              <span className="text-blue-700 font-sans text-base">{format(totalUSD)}</span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Fare Due</span>
            <span className="text-xl font-black text-slate-900 font-sans">{format(totalUSD)}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleContinue}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <span>Continue to Passenger Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

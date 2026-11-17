import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AIRPORTS } from '../../data/airports';
import { 
  PlaneTakeoff, 
  PlaneLanding, 
  ArrowRightLeft, 
  Calendar, 
  Users, 
  Search, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

export default function FlightSearchForm({
  initialOrigin = 'ISB',
  initialDestination = 'DXB',
  initialTripType = 'round-trip',
  initialCabin = 'Economy',
  onSearch = null,
  compact = false
}) {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState(initialTripType);
  const [origin, setOrigin] = useState(initialOrigin);
  const [destination, setDestination] = useState(initialDestination);
  const [departureDate, setDepartureDate] = useState('2026-12-05');
  const [returnDate, setReturnDate] = useState('2026-12-15');
  const [cabinClass, setCabinClass] = useState(initialCabin);
  const [adults, setAdults] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [passengerDropdown, setPassengerDropdown] = useState(false);

  // Quick swap origin and destination
  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const searchParams = {
      origin,
      destination,
      tripType,
      departureDate,
      returnDate: tripType === 'round-trip' ? returnDate : '',
      cabinClass,
      passengers: adults + childrenCount
    };

    if (onSearch) {
      onSearch(searchParams);
    } else {
      const query = new URLSearchParams(searchParams).toString();
      navigate(`/flights?${query}`);
    }
  };

  return (
    <div className={`w-full ${compact ? '' : 'glass-card p-6 sm:p-8 rounded-3xl shadow-xl border border-white/60'}`}>
      
      {/* Top Controls: Trip Type & Cabin Class */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setTripType('round-trip')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              tripType === 'round-trip' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Round-trip
          </button>
          <button
            type="button"
            onClick={() => setTripType('one-way')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              tripType === 'one-way' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            One-way
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Cabin Class Selector */}
          <select
            value={cabinClass}
            onChange={(e) => setCabinClass(e.target.value)}
            className="text-xs font-semibold text-slate-700 bg-slate-100/90 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Economy">Economy</option>
            <option value="Premium Economy">Premium Economy</option>
            <option value="Business">Business Class</option>
            <option value="First">First Class</option>
          </select>
        </div>
      </div>

      {/* Main Search Grid */}
      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        
        {/* Origin Airport */}
        <div className="md:col-span-3 relative">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 ml-1">
            Leaving From
          </label>
          <div className="relative">
            <PlaneTakeoff className="w-5 h-5 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full pl-11 pr-3 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none appearance-none cursor-pointer"
            >
              {AIRPORTS.map((a) => (
                <option key={a.code} value={a.code}>
                  {a.city} ({a.code}) - {a.country}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="md:col-span-1 flex justify-center -my-2 md:my-0">
          <button
            type="button"
            onClick={handleSwap}
            className="p-2.5 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 border border-slate-200 transition-transform active:rotate-180 hover:scale-105"
            title="Swap Origin and Destination"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Destination Airport */}
        <div className="md:col-span-3 relative">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 ml-1">
            Going To
          </label>
          <div className="relative">
            <PlaneLanding className="w-5 h-5 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full pl-11 pr-3 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none appearance-none cursor-pointer"
            >
              {AIRPORTS.map((a) => (
                <option key={a.code} value={a.code}>
                  {a.city} ({a.code}) - {a.country}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Departure & Return Dates */}
        <div className="md:col-span-3 grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 ml-1">
              Depart
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full pl-9 pr-2 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 ml-1">
              Return
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="date"
                value={returnDate}
                disabled={tripType === 'one-way'}
                onChange={(e) => setReturnDate(e.target.value)}
                className={`w-full pl-9 pr-2 py-3 rounded-2xl border text-xs font-semibold text-slate-900 focus:outline-none ${
                  tripType === 'one-way' 
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed' 
                    : 'bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-600'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Passengers & Search Button */}
        <div className="md:col-span-2 flex flex-col justify-end">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 ml-1">
            Passengers
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setPassengerDropdown(!passengerDropdown)}
              className="w-full flex items-center justify-between px-3 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800"
            >
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-600" />
                <span>{adults + childrenCount} Traveler{adults + childrenCount > 1 ? 's' : ''}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {passengerDropdown && (
              <div className="absolute right-0 bottom-full mb-2 w-56 rounded-2xl bg-white shadow-2xl border border-slate-100 p-4 z-50">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-800">Adults</p>
                      <p className="text-[10px] text-slate-400">Age 12+</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-slate-900 w-4 text-center">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(Math.min(9, adults + 1))}
                        className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div>
                      <p className="text-xs font-bold text-slate-800">Children</p>
                      <p className="text-[10px] text-slate-400">Age 2-11</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                        className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-slate-900 w-4 text-center">{childrenCount}</span>
                      <button
                        type="button"
                        onClick={() => setChildrenCount(Math.min(6, childrenCount + 1))}
                        className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPassengerDropdown(false)}
                    className="w-full mt-2 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg hover:bg-blue-100"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </form>

      {/* Action Bar */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Instant Worldwide Flight Feeds · Best Price Guarantee in PKR</span>
        </div>

        <button
          type="button"
          onClick={handleFormSubmit}
          className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 hover:from-blue-800 hover:to-sky-600 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Search className="w-4 h-4" />
          <span>Search Flights</span>
        </button>
      </div>

    </div>
  );
}


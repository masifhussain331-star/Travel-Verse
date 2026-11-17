import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Calendar, 
  Users, 
  Search, 
  MapPin, 
  ChevronDown 
} from 'lucide-react';

export default function HotelSearchForm({
  initialDestination = 'Dubai',
  initialCheckIn = '2026-12-05',
  initialCheckOut = '2026-12-09',
  onSearch = null,
  compact = false
}) {
  const navigate = useNavigate();
  const [destination, setDestination] = useState(initialDestination);
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [guestDropdown, setGuestDropdown] = useState(false);

  const popularDestinations = [
    'Dubai, UAE',
    'Istanbul, Turkey',
    'Skardu, Pakistan',
    'Paris, France',
    'Maldives',
    'Bali, Indonesia',
    'London, UK',
    'Singapore'
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const searchParams = {
      destination,
      checkIn,
      checkOut,
      guests,
      rooms
    };

    if (onSearch) {
      onSearch(searchParams);
    } else {
      const query = new URLSearchParams(searchParams).toString();
      navigate(`/hotels?${query}`);
    }
  };

  return (
    <div className={`w-full ${compact ? '' : 'glass-card p-6 sm:p-8 rounded-3xl shadow-xl border border-white/60'}`}>
      
      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        
        {/* Destination */}
        <div className="md:col-span-4 relative">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 ml-1">
            Destination / Hotel Name
          </label>
          <div className="relative">
            <MapPin className="w-5 h-5 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full pl-11 pr-3 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none appearance-none cursor-pointer"
            >
              {popularDestinations.map((d) => (
                <option key={d} value={d.split(',')[0].trim()}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Check-in Date */}
        <div className="md:col-span-3">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 ml-1">
            Check-In Date
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full pl-9 pr-2 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Check-out Date */}
        <div className="md:col-span-3">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 ml-1">
            Check-Out Date
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full pl-9 pr-2 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Guests & Rooms */}
        <div className="md:col-span-2 relative">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 ml-1">
            Rooms & Guests
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setGuestDropdown(!guestDropdown)}
              className="w-full flex items-center justify-between px-3 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800"
            >
              <div className="flex items-center gap-1.5 truncate">
                <Users className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="truncate">{guests} Guests, {rooms} Rm</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {guestDropdown && (
              <div className="absolute right-0 bottom-full mb-2 w-56 rounded-2xl bg-white shadow-2xl border border-slate-100 p-4 z-50">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-800">Guests</p>
                      <p className="text-[10px] text-slate-400">Total travelers</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-slate-900 w-4 text-center">{guests}</span>
                      <button
                        type="button"
                        onClick={() => setGuests(Math.min(10, guests + 1))}
                        className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div>
                      <p className="text-xs font-bold text-slate-800">Rooms</p>
                      <p className="text-[10px] text-slate-400">Total rooms</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setRooms(Math.max(1, rooms - 1))}
                        className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-slate-900 w-4 text-center">{rooms}</span>
                      <button
                        type="button"
                        onClick={() => setRooms(Math.min(5, rooms + 1))}
                        className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setGuestDropdown(false)}
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
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          <span>Verified Luxury Properties · Instant Booking Vouchers · Free Cancellation Options</span>
        </div>

        <button
          type="button"
          onClick={handleFormSubmit}
          className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 hover:from-blue-800 hover:to-sky-600 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Search className="w-4 h-4" />
          <span>Search Hotels</span>
        </button>
      </div>

    </div>
  );
}


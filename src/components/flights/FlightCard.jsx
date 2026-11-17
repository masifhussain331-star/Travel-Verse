import React, { useState } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { useWishlist } from '../../context/WishlistContext';
import { 
  Plane, 
  Clock, 
  Luggage, 
  Heart, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles,
  Coffee,
  ShieldCheck,
  ChevronDown,
  Info
} from 'lucide-react';
import Badge from '../common/Badge';

export default function FlightCard({ flight, onSelect, onViewDetails }) {
  const { format, currentCurrency } = useCurrency();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [expanded, setExpanded] = useState(false);

  const saved = isWishlisted(flight.id);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist({
      id: flight.id,
      type: 'flight',
      title: `${flight.airline} ${flight.flightNumber} (${flight.origin} → ${flight.destination})`,
      location: `${flight.originCity} to ${flight.destinationCity}`,
      priceUSD: flight.basePriceUSD,
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=80',
      rating: flight.rating
    });
  };

  return (
    <div className="group bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-blue-300">
      
      {/* Top Header: Airline & Provider Distinction Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-50 to-sky-100 flex items-center justify-center text-blue-700 font-extrabold text-sm border border-blue-100">
            {flight.airlineCode || 'TV'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-sm">{flight.airline}</h3>
              <span className="text-xs text-slate-400 font-mono font-medium">({flight.flightNumber})</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              {flight.aircraft} · <strong className="text-blue-700">{flight.cabinClass}</strong>
            </p>
          </div>
        </div>

        {/* Clear Demonstration vs Real Provider Distinction */}
        <div className="flex flex-wrap items-center gap-2">
          {flight.isDemo ? (
            <Badge variant="demo" size="sm" className="shadow-2xs">
              <Sparkles className="w-3 h-3 text-amber-700" />
              <span>Demo Feed</span>
            </Badge>
          ) : (
            <Badge variant="real" size="sm" className="shadow-2xs">
              <ShieldCheck className="w-3 h-3 text-emerald-700" />
              <span>Verified GDS Live</span>
            </Badge>
          )}

          {flight.refundable ? (
            <Badge variant="success" size="sm">
              <CheckCircle2 className="w-3 h-3" />
              <span>Refundable</span>
            </Badge>
          ) : (
            <Badge variant="warning" size="sm">Non-refundable</Badge>
          )}

          <button
            type="button"
            onClick={handleWishlistClick}
            className={`p-2 rounded-full border transition-colors ${
              saved 
                ? 'bg-rose-50 border-rose-200 text-rose-600' 
                : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50'
            }`}
            title={saved ? 'Remove from Wishlist' : 'Save to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-rose-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Flight Path & Timings */}
      <div className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        
        {/* Origin */}
        <div className="sm:col-span-3 text-left">
          <span className="text-2xl font-black text-slate-900 tracking-tight font-sans">
            {flight.departureTime}
          </span>
          <div className="text-sm font-bold text-blue-700">{flight.origin}</div>
          <div className="text-xs text-slate-500 truncate">{flight.originCity}</div>
        </div>

        {/* Flight Route Path */}
        <div className="sm:col-span-6 flex flex-col items-center justify-center px-2">
          <div className="text-[11px] font-semibold text-slate-500 mb-1 flex items-center gap-1">
            <Clock className="w-3 h-3 text-blue-500" />
            <span>{flight.duration}</span>
          </div>

          <div className="w-full flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-blue-600 bg-white shrink-0"></span>
            <div className="relative flex-1 h-0.5 bg-slate-200">
              <Plane className="w-4 h-4 text-blue-600 absolute left-1/2 -top-2 -translate-x-1/2" />
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
          </div>

          <div className="text-[11px] font-medium text-slate-600 mt-1.5 text-center">
            {flight.stops === 0 ? (
              <span className="text-emerald-600 font-bold">Direct Non-stop</span>
            ) : (
              <span className="text-amber-800 font-semibold">{flight.stopDetails}</span>
            )}
          </div>
        </div>

        {/* Destination */}
        <div className="sm:col-span-3 text-right">
          <span className="text-2xl font-black text-slate-900 tracking-tight font-sans">
            {flight.arrivalTime}
          </span>
          <div className="text-sm font-bold text-blue-700">{flight.destination}</div>
          <div className="text-xs text-slate-500 truncate">{flight.destinationCity}</div>
        </div>
      </div>

      {/* Baggage & Service Amenities Strip */}
      <div className="py-2.5 px-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5 font-medium">
            <Luggage className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Cabin: <strong>{flight.baggage?.carryOn || '7 kg'}</strong></span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5 font-medium">
            <span>Checked: <strong>{flight.baggage?.checked || '30 kg'}</strong></span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5 font-medium text-emerald-700">
            <Coffee className="w-3.5 h-3.5" />
            <span>Halal Meal Included</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1"
        >
          <span>{expanded ? 'Hide Segments' : 'View Flight Segments'}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Expandable Segments View */}
      {expanded && flight.segments && (
        <div className="mt-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-xs space-y-3 animate-in fade-in duration-200">
          <div className="font-bold text-blue-900 flex items-center justify-between">
            <span>Route Segment Breakdown</span>
            <span className="text-[11px] font-normal text-slate-500">Provided by {flight.providerSource}</span>
          </div>

          <div className="space-y-3">
            {flight.segments.map((seg, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white border border-blue-200/60 space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>Segment {idx + 1}: {seg.flightNumber} ({seg.aircraft})</span>
                  <span className="text-blue-700">{seg.duration}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 text-[11px]">
                  <span>{seg.departureAirport} ({seg.departureTime})</span>
                  <span>→</span>
                  <span>{seg.arrivalAirport} ({seg.arrivalTime})</span>
                </div>
                {seg.layoverDuration && (
                  <div className="mt-1 pt-1 border-t border-slate-100 text-[10px] text-amber-700 font-semibold">
                    Layover in {seg.layoverCity}: {seg.layoverDuration}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pricing & Booking CTA */}
      <div className="pt-4 mt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Seats left indicator */}
        <div className="flex items-center gap-2 text-xs text-slate-500 w-full sm:w-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>{flight.availableSeats} Seats left at this fare class</span>
        </div>

        {/* Price & Action Buttons */}
        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
          <div className="text-right">
            <div className="text-xl sm:text-2xl font-black text-slate-950 font-sans tracking-tight">
              {format(flight.basePriceUSD)}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">
              Supplier Tariff: ${flight.basePriceUSD} USD · Taxes included
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onViewDetails(flight)}
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Details
            </button>
            <button
              type="button"
              onClick={() => onSelect(flight)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95"
            >
              <span>Select</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

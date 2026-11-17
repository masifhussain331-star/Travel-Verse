import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import FlightSearchForm from '../components/flights/FlightSearchForm';
import FlightCard from '../components/flights/FlightCard';
import FlightDetailsModal from '../components/flights/FlightDetailsModal';
import BookingCheckoutModal from '../components/common/BookingCheckoutModal';
import { flightService, PROVIDER_MODES } from '../services/flightService';
import { findAirport } from '../data/airports';
import { AIRLINES } from '../data/airlines';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  Plane, 
  Calendar,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
  Info,
  CheckCircle2,
  Luggage,
  Sun,
  Sunset,
  Moon
} from 'lucide-react';
import Badge from '../components/common/Badge';

export default function FlightSearchPage() {
  const [searchParams] = useSearchParams();
  const { currentCurrency, format } = useCurrency();

  // Search parameters from URL
  const originQuery = searchParams.get('origin') || 'ISB';
  const destinationQuery = searchParams.get('destination') || 'DXB';
  const cabinQuery = searchParams.get('cabinClass') || 'Economy';
  const tripTypeQuery = searchParams.get('tripType') || 'round-trip';
  const passengersQuery = parseInt(searchParams.get('passengers') || '1', 10);
  const departureDateQuery = searchParams.get('departureDate') || '2026-12-05';
  const returnDateQuery = searchParams.get('returnDate') || '';

  // Service Layer State
  const [providerMode, setProviderMode] = useState(PROVIDER_MODES.DEMO);
  const [flights, setFlights] = useState([]);
  
  const queryKey = `${originQuery}-${destinationQuery}-${departureDateQuery}-${returnDateQuery}-${tripTypeQuery}-${passengersQuery}-${cabinQuery}-${providerMode}`;
  const [lastQuery, setLastQuery] = useState(queryKey);
  const [loadingState, setLoadingState] = useState(false);
  const loading = loadingState || lastQuery !== queryKey;

  // Filters State
  const [selectedStops, setSelectedStops] = useState('all'); // 'all', '0', '1'
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [maxPriceUSD, setMaxPriceUSD] = useState(1500);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState('all'); // 'all', 'morning', 'afternoon', 'evening'
  const [refundableOnly, setRefundableOnly] = useState(false);
  const [baggageIncludedOnly, setBaggageIncludedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('price-low'); // 'price-low', 'fastest', 'rating', 'earliest'

  // Modals State
  const [selectedFlightForDetails, setSelectedFlightForDetails] = useState(null);
  const [checkoutFlight, setCheckoutFlight] = useState(null);

  // Fetch flights through Flight Service Layer
  useEffect(() => {
    let isMounted = true;

    flightService.searchFlights({
      origin: originQuery,
      destination: destinationQuery,
      departureDate: departureDateQuery,
      returnDate: returnDateQuery,
      tripType: tripTypeQuery,
      passengers: passengersQuery,
      cabinClass: cabinQuery,
      providerMode
    }).then((res) => {
      if (isMounted) {
        setFlights(res.flights);
        setLastQuery(queryKey);
        setLoadingState(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [queryKey, originQuery, destinationQuery, departureDateQuery, returnDateQuery, tripTypeQuery, passengersQuery, cabinQuery, providerMode]);


  const originAirport = findAirport(originQuery) || { city: originQuery, code: originQuery, name: `${originQuery} Airport` };
  const destAirport = findAirport(destinationQuery) || { city: destinationQuery, code: destinationQuery, name: `${destinationQuery} Airport` };

  // Filter and sort
  const filteredFlights = useMemo(() => {
    return flights
      .filter((f) => {
        // Stops
        if (selectedStops !== 'all') {
          if (parseInt(selectedStops, 10) !== f.stops) return false;
        }

        // Airlines
        if (selectedAirlines.length > 0) {
          if (!selectedAirlines.includes(f.airlineCode)) return false;
        }

        // Max price
        if (f.basePriceUSD > maxPriceUSD) return false;

        // Refundable
        if (refundableOnly && !f.refundable) return false;

        // Baggage
        if (baggageIncludedOnly && !f.baggage?.checked) return false;

        // Time of Day
        if (selectedTimeOfDay !== 'all') {
          const hour = parseInt(f.departureTime.split(':')[0], 10);
          if (selectedTimeOfDay === 'morning' && (hour < 0 || hour >= 12)) return false;
          if (selectedTimeOfDay === 'afternoon' && (hour < 12 || hour >= 18)) return false;
          if (selectedTimeOfDay === 'evening' && hour < 18) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.basePriceUSD - b.basePriceUSD;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'fastest') return parseInt(a.duration) - parseInt(b.duration);
        if (sortBy === 'earliest') return a.departureTime.localeCompare(b.departureTime);
        return 0;
      });
  }, [flights, selectedStops, selectedAirlines, maxPriceUSD, refundableOnly, baggageIncludedOnly, selectedTimeOfDay, sortBy]);

  const handleAirlineToggle = (code) => {
    if (selectedAirlines.includes(code)) {
      setSelectedAirlines(selectedAirlines.filter(c => c !== code));
    } else {
      setSelectedAirlines([...selectedAirlines, code]);
    }
  };

  const handleResetFilters = () => {
    setSelectedStops('all');
    setSelectedAirlines([]);
    setMaxPriceUSD(1500);
    setSelectedTimeOfDay('all');
    setRefundableOnly(false);
    setBaggageIncludedOnly(false);
    setSortBy('price-low');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Search Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm">Worldwide Flights</Badge>
              <span className="text-xs text-blue-200 font-mono">
                {originAirport.code} ⇄ {destAirport.code}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif mt-1">
              Flights from {originAirport.city} ({originAirport.code}) to {destAirport.city} ({destAirport.code})
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              {departureDateQuery} · {passengersQuery} Traveler(s) · {cabinQuery} Class · Rates in <strong>{currentCurrency}</strong>
            </p>
          </div>

          {/* Provider Mode Switcher */}
          <div className="flex items-center gap-2 bg-white/10 p-1 rounded-2xl border border-white/15 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setProviderMode(PROVIDER_MODES.DEMO)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                providerMode === PROVIDER_MODES.DEMO
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Demo Simulation</span>
            </button>

            <button
              type="button"
              onClick={() => setProviderMode(PROVIDER_MODES.LIVE)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                providerMode === PROVIDER_MODES.LIVE
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Live GDS Mode</span>
            </button>
          </div>
        </div>

        <FlightSearchForm
          initialOrigin={originQuery}
          initialDestination={destinationQuery}
          initialCabin={cabinQuery}
          initialTripType={tripTypeQuery}
          compact={true}
        />
      </div>

      {/* Flexible 3-Day Pricing Calendar Matrix */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between overflow-x-auto gap-2">
        <div className="flex items-center gap-1 text-xs font-bold text-slate-400 pl-2 shrink-0">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span>Fare Matrix:</span>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-center">
          <button
            type="button"
            className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 text-center transition-colors shrink-0 bg-slate-50"
          >
            <span className="text-[10px] text-slate-400 block font-medium">Dec 04 · Day Before</span>
            <span className="text-xs font-bold text-slate-800 font-sans">{format(305)}</span>
          </button>

          <button
            type="button"
            className="p-2.5 rounded-xl border-2 border-blue-600 bg-blue-50/60 text-center shrink-0 shadow-xs"
          >
            <span className="text-[10px] text-blue-700 block font-bold">Dec 05 · Selected Date</span>
            <span className="text-xs font-black text-blue-900 font-sans">{format(295)} (Best)</span>
          </button>

          <button
            type="button"
            className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 text-center transition-colors shrink-0 bg-slate-50"
          >
            <span className="text-[10px] text-slate-400 block font-medium">Dec 06 · Day After</span>
            <span className="text-xs font-bold text-slate-800 font-sans">{format(320)}</span>
          </button>
        </div>

        <span className="text-[11px] text-emerald-600 font-semibold pr-2 hidden sm:block">
          ✓ Lowest fare locked
        </span>
      </div>

      {/* Main Grid: Filters Sidebar + Results List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Filter Sidebar */}
        <aside className="lg:col-span-4 xl:col-span-3 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span>Filter Flights</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Stops Filter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Flight Stops
            </label>
            <div className="space-y-2">
              {[
                { label: 'All Itineraries', value: 'all' },
                { label: 'Non-stop Direct', value: '0' },
                { label: '1 Stop max', value: '1' }
              ].map((opt) => (
                <label key={opt.value} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="stopsFilter"
                    checked={selectedStops === opt.value}
                    onChange={() => setSelectedStops(opt.value)}
                    className="accent-blue-600"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Departure Time of Day */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Departure Time
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'morning', label: 'Morning', icon: Sun },
                { id: 'afternoon', label: 'Afternoon', icon: Sunset },
                { id: 'evening', label: 'Night', icon: Moon }
              ].map((time) => {
                const Icon = time.icon;
                const isSelected = selectedTimeOfDay === time.id;
                return (
                  <button
                    key={time.id}
                    type="button"
                    onClick={() => setSelectedTimeOfDay(isSelected ? 'all' : time.id)}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      isSelected 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 mx-auto mb-1" />
                    <span className="text-[10px] font-bold block">{time.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Max Price Slider */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
              <span className="uppercase text-slate-400">Max Budget</span>
              <span className="text-blue-700 font-sans">{format(maxPriceUSD)}</span>
            </div>
            <input
              type="range"
              min="100"
              max="2000"
              step="50"
              value={maxPriceUSD}
              onChange={(e) => setMaxPriceUSD(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>{format(100)}</span>
              <span>{format(2000)}</span>
            </div>
          </div>

          {/* Airlines Filter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Airlines
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {AIRLINES.map((airline) => (
                <label key={airline.code} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAirlines.includes(airline.code)}
                    onChange={() => handleAirlineToggle(airline.code)}
                    className="rounded accent-blue-600"
                  />
                  <span className="truncate">{airline.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Baggage & Refund Checkboxes */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={baggageIncludedOnly}
                onChange={(e) => setBaggageIncludedOnly(e.target.checked)}
                className="rounded accent-blue-600"
              />
              <span>Checked Baggage Included</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={refundableOnly}
                onChange={(e) => setRefundableOnly(e.target.checked)}
                className="rounded accent-blue-600"
              />
              <span>Refundable Tickets Only</span>
            </label>
          </div>

          {/* Provenance Notice */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Info className="w-3.5 h-3.5 text-blue-600" />
              <span>Provider Feed Distinction</span>
            </div>
            <p className="leading-relaxed">
              Active mode: <strong>{providerMode === PROVIDER_MODES.LIVE ? 'Live GDS Sandbox' : 'Demo Simulation Engine'}</strong>. Supplier fares remain locked in USD at checkout with transparent PKR conversion.
            </p>
          </div>
        </aside>

        {/* Right Flight Cards List */}
        <main className="lg:col-span-8 xl:col-span-9 space-y-4">
          
          {/* Sorting Header Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-semibold text-slate-700 flex items-center gap-2">
              <span>Showing <strong className="text-slate-900">{filteredFlights.length}</strong> matching flights</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-slate-400 text-[11px]">Direct Partner Inventory</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="price-low">Cheapest First</option>
                <option value="fastest">Fastest Duration</option>
                <option value="rating">Top Airline Rating</option>
                <option value="earliest">Earliest Departure</option>
              </select>
            </div>
          </div>

          {/* Loading or Results */}
          {loading ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto animate-spin">
                <Plane className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-800">
                Fetching Real-Time Fares from {originAirport.code} to {destAirport.code}...
              </p>
              <p className="text-xs text-slate-400">Verifying live seat inventory with partner carriers</p>
            </div>
          ) : filteredFlights.length > 0 ? (
            <div className="space-y-4">
              {filteredFlights.map((flight) => (
                <FlightCard
                  key={flight.id}
                  flight={flight}
                  onSelect={(fl) => setCheckoutFlight(fl)}
                  onViewDetails={(fl) => setSelectedFlightForDetails(fl)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-14 text-center border border-slate-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Plane className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No flights matched your filter parameters</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your price range or clearing selected airline filters to view all available schedules.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </main>
      </div>

      {/* Flight Details Modal with Baggage Add-ons */}
      <FlightDetailsModal
        flight={selectedFlightForDetails}
        isOpen={Boolean(selectedFlightForDetails)}
        onClose={() => setSelectedFlightForDetails(null)}
        onProceedToBooking={(fl) => {
          setSelectedFlightForDetails(null);
          setCheckoutFlight(fl);
        }}
      />

      {/* Booking Checkout Modal */}
      <BookingCheckoutModal
        isOpen={Boolean(checkoutFlight)}
        onClose={() => setCheckoutFlight(null)}
        bookingItem={checkoutFlight ? {
          type: 'flight',
          item: checkoutFlight,
          priceUSD: checkoutFlight.totalUSD || checkoutFlight.basePriceUSD
        } : null}
      />

    </div>
  );
}

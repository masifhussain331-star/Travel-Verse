import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import HotelSearchForm from '../components/hotels/HotelSearchForm';
import HotelCard from '../components/hotels/HotelCard';
import { hotelService, HOTEL_PROVIDER_MODES, calculateNights } from '../services/hotelService';
import { 
  Building2, 
  SlidersHorizontal, 
  RotateCcw, 
  Star, 
  MapPin, 
  Info,
  CheckCircle2,
  Calendar,
  Users,
  Sparkles,
  ShieldCheck,
  Search
} from 'lucide-react';
import Badge from '../components/common/Badge';

export default function HotelSearchPage() {
  const [searchParams] = useSearchParams();
  const { currentCurrency, format } = useCurrency();

  const destQuery = searchParams.get('destination') || '';
  const checkInQuery = searchParams.get('checkIn') || '2026-12-05';
  const checkOutQuery = searchParams.get('checkOut') || '2026-12-09';
  const guestsQuery = parseInt(searchParams.get('guests') || '2', 10);
  const roomsQuery = parseInt(searchParams.get('rooms') || '1', 10);

  // Service Layer State
  const [providerMode, setProviderMode] = useState(HOTEL_PROVIDER_MODES.DEMO);
  const [hotels, setHotels] = useState([]);
  
  const queryKey = `${destQuery}-${checkInQuery}-${checkOutQuery}-${guestsQuery}-${roomsQuery}-${providerMode}`;
  const [lastQuery, setLastQuery] = useState(queryKey);
  const [loadingState, setLoadingState] = useState(false);
  const loading = loadingState || lastQuery !== queryKey;

  // Filter States
  const [selectedStar, setSelectedStar] = useState('all');
  const [maxPriceUSD, setMaxPriceUSD] = useState(1200);
  const [sortBy, setSortBy] = useState('rating'); // 'rating', 'price-low', 'price-high', 'reviews'
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [freeCancellationOnly, setFreeCancellationOnly] = useState(false);

  const nightsCount = calculateNights(checkInQuery, checkOutQuery);

  const amenitiesList = [
    'Infinity Pool',
    'Private Beachfront',
    'Spa',
    'Free High-Speed Wi-Fi',
    'Butler Service',
    'Aquaventure Waterpark'
  ];

  // Fetch hotels via Service
  useEffect(() => {
    let isMounted = true;

    hotelService.searchHotels({
      destination: destQuery,
      checkIn: checkInQuery,
      checkOut: checkOutQuery,
      guests: guestsQuery,
      rooms: roomsQuery,
      providerMode
    }).then((res) => {
      if (isMounted) {
        setHotels(res.hotels);
        setLastQuery(queryKey);
        setLoadingState(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [queryKey, destQuery, checkInQuery, checkOutQuery, guestsQuery, roomsQuery, providerMode]);

  const handleAmenityToggle = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const filteredHotels = useMemo(() => {
    return hotels
      .filter((h) => {
        if (selectedStar !== 'all') {
          if (h.starRating !== parseInt(selectedStar, 10)) return false;
        }

        if (h.pricePerNightUSD > maxPriceUSD) return false;

        if (freeCancellationOnly && !h.cancellationPolicy.toLowerCase().includes('free cancellation')) {
          return false;
        }

        if (selectedAmenities.length > 0) {
          const hasAll = selectedAmenities.every(req => 
            h.amenities.some(a => a.toLowerCase().includes(req.toLowerCase()))
          );
          if (!hasAll) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.userRating - a.userRating;
        if (sortBy === 'price-low') return a.pricePerNightUSD - b.pricePerNightUSD;
        if (sortBy === 'price-high') return b.pricePerNightUSD - a.pricePerNightUSD;
        if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
        return 0;
      });
  }, [hotels, selectedStar, maxPriceUSD, freeCancellationOnly, selectedAmenities, sortBy]);

  const handleResetFilters = () => {
    setSelectedStar('all');
    setMaxPriceUSD(1200);
    setSelectedAmenities([]);
    setFreeCancellationOnly(false);
    setSortBy('rating');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm">Worldwide Resorts & Hotels</Badge>
              <span className="text-xs text-blue-200">
                {destQuery ? `Destination: ${destQuery}` : 'All Destinations'} · {nightsCount} Night(s) Stay
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif mt-1">
              Find Luxury Hotels & 5-Star Sanctuaries
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              {checkInQuery} to {checkOutQuery} · {guestsQuery} Guests, {roomsQuery} Room(s) · Guaranteed Fares in <strong>{currentCurrency}</strong>
            </p>
          </div>

          {/* Provider Mode Switcher */}
          <div className="flex items-center gap-2 bg-white/10 p-1 rounded-2xl border border-white/15 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setProviderMode(HOTEL_PROVIDER_MODES.DEMO)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                providerMode === HOTEL_PROVIDER_MODES.DEMO
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Demo Simulation</span>
            </button>

            <button
              type="button"
              onClick={() => setProviderMode(HOTEL_PROVIDER_MODES.LIVE)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                providerMode === HOTEL_PROVIDER_MODES.LIVE
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Live Hotelbeds</span>
            </button>
          </div>
        </div>

        <HotelSearchForm
          initialDestination={destQuery || 'Dubai'}
          initialCheckIn={checkInQuery}
          initialCheckOut={checkOutQuery}
          compact={true}
        />
      </div>

      {/* Main Grid: Filters + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Filter Sidebar */}
        <aside className="lg:col-span-4 xl:col-span-3 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span>Filter Hotels</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Star Rating */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Star Rating
            </label>
            <div className="space-y-2">
              {[
                { label: 'All Star Classes', value: 'all' },
                { label: '5-Star Luxury', value: '5' },
                { label: '4-Star Premium', value: '4' }
              ].map((opt) => (
                <label key={opt.value} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="starFilter"
                    checked={selectedStar === opt.value}
                    onChange={() => setSelectedStar(opt.value)}
                    className="accent-blue-600"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Max Price Slider */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
              <span className="uppercase text-slate-400">Nightly Budget</span>
              <span className="text-blue-700 font-sans">{format(maxPriceUSD)}</span>
            </div>
            <input
              type="range"
              min="100"
              max="1500"
              step="50"
              value={maxPriceUSD}
              onChange={(e) => setMaxPriceUSD(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>{format(100)}</span>
              <span>{format(1500)}</span>
            </div>
          </div>

          {/* Facilities / Amenities */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Facilities & Amenities
            </label>
            <div className="space-y-2">
              {amenitiesList.map((amenity) => (
                <label key={amenity} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="rounded accent-blue-600"
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Cancellation Policy Checkbox */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={freeCancellationOnly}
                onChange={(e) => setFreeCancellationOnly(e.target.checked)}
                className="rounded accent-blue-600"
              />
              <span>Free Cancellation Only</span>
            </label>
          </div>

          {/* Provenance Notice */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Info className="w-3.5 h-3.5 text-blue-600" />
              <span>Provider Feed Distinction</span>
            </div>
            <p className="leading-relaxed">
              Active mode: <strong>{providerMode === HOTEL_PROVIDER_MODES.LIVE ? 'Hotelbeds Direct GDS' : 'Demo Hotel Simulation'}</strong>. Tariffs include all local tourism dirhams, municipality fees, and taxes.
            </p>
          </div>
        </aside>

        {/* Right Hotel Cards List */}
        <main className="lg:col-span-8 xl:col-span-9 space-y-4">
          
          {/* Sorting Header Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-semibold text-slate-700 flex items-center gap-2">
              <span>Showing <strong className="text-slate-900">{filteredHotels.length}</strong> luxury properties</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-slate-400 text-[11px]">Best Price Guarantee in PKR</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="rating">Top Guest Rating</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>
          </div>

          {/* Results List or Loading */}
          {loading ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto animate-spin">
                <Building2 className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-800">
                Searching Worldwide Luxury Resorts & Suites...
              </p>
              <p className="text-xs text-slate-400">Verifying live room inventory with partner suppliers</p>
            </div>
          ) : filteredHotels.length > 0 ? (
            <div className="space-y-6">
              {filteredHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No hotels matched your search criteria</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your price range or clearing amenities filters to see available resorts.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              >
                Reset Filters
              </button>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}

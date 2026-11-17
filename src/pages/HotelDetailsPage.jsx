import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import { useWishlist } from '../context/WishlistContext';
import { HOTELS_DATA } from '../data/hotelsData';
import BookingCheckoutModal from '../components/common/BookingCheckoutModal';
import { 
  Building2, 
  MapPin, 
  Star, 
  Heart, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft,
  Calendar,
  Users,
  Lock,
  Sparkles,
  Bed,
  Maximize2,
  Coffee,
  Check
} from 'lucide-react';
import Badge from '../components/common/Badge';

export default function HotelDetailsPage() {
  const { id } = useParams();
  const { format, currentCurrency } = useCurrency();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const hotel = HOTELS_DATA.find(h => h.id === id) || HOTELS_DATA[0];
  const saved = isWishlisted(hotel.id);

  const [activeImage, setActiveImage] = useState(hotel.heroImage);
  const [selectedRoom, setSelectedRoom] = useState(hotel.rooms[0] || null);
  const [includeBreakfast, setIncludeBreakfast] = useState(true);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const nights = 4; // Default stay period for demo verification
  const roomBaseUSD = selectedRoom?.priceUSD || hotel.pricePerNightUSD;
  const breakfastPriceUSD = includeBreakfast ? 35 : 0;
  const nightlyTotalUSD = roomBaseUSD + breakfastPriceUSD;
  const totalStayUSD = nightlyTotalUSD * nights;

  const handleBookRoom = (room) => {
    setSelectedRoom(room);
    setCheckoutOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button */}
      <Link
        to="/hotels"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Hotel Search Results</span>
      </Link>

      {/* Hotel Title Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(hotel.starRating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-500">{hotel.starRating}-Star Luxury Property</span>

            {hotel.isDemo ? (
              <Badge variant="demo" size="sm">
                <Sparkles className="w-3 h-3 text-amber-700" />
                <span>Demo Inventory</span>
              </Badge>
            ) : (
              <Badge variant="real" size="sm">
                <ShieldCheck className="w-3 h-3 text-emerald-700" />
                <span>Verified Hotelbeds GDS</span>
              </Badge>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif">
            {hotel.name}
          </h1>

          <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
            <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>{hotel.address}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5">
              <span className="text-sm font-bold text-slate-900 bg-blue-50 text-blue-800 px-2.5 py-1 rounded-xl border border-blue-200">
                ★ {hotel.userRating} / 5.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Based on {hotel.reviewCount} verified guest stays</p>
          </div>

          <button
            type="button"
            onClick={() => toggleWishlist({
              id: hotel.id,
              type: 'hotel',
              title: hotel.name,
              location: `${hotel.city}, ${hotel.country}`,
              priceUSD: hotel.pricePerNightUSD,
              image: hotel.heroImage,
              rating: hotel.userRating
            })}
            className={`p-3 rounded-2xl border transition-all ${
              saved ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50'
            }`}
            title={saved ? 'Remove from Wishlist' : 'Save to Wishlist'}
          >
            <Heart className={`w-5 h-5 ${saved ? 'fill-rose-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* High-Resolution Photo Gallery Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Large Image */}
        <div className="lg:col-span-8 h-96 lg:h-[480px] rounded-3xl overflow-hidden shadow-sm relative group">
          <img
            src={activeImage}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
          />
          <div className="absolute bottom-4 left-4 bg-slate-950/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-xl">
            {hotel.name} · Official Gallery
          </div>
        </div>

        {/* Thumbnail Stack */}
        <div className="lg:col-span-4 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible">
          {hotel.gallery.slice(0, 3).map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImage(img)}
              className={`relative h-28 lg:h-36 flex-1 rounded-2xl overflow-hidden border-2 transition-all shrink-0 w-40 lg:w-full ${
                activeImage === img ? 'border-blue-600 ring-2 ring-blue-500/30' : 'border-transparent opacity-80 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Details & Room Selection Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Description, Amenities, Rooms & Reviews */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Property Overview */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-serif">Property Overview</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {hotel.description}
            </p>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Key Resort Facilities & Experiences
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {hotel.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cancellation & House Rules Card */}
          <div className="p-5 rounded-3xl bg-emerald-50/70 border border-emerald-200/80 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Cancellation & Booking Flexibility Policy</span>
            </div>
            <p className="text-emerald-800 leading-relaxed">
              {hotel.cancellationPolicy}
            </p>
            <div className="pt-1 flex items-center gap-4 text-emerald-700 text-[11px] font-semibold">
              <span>Check-in: 15:00</span>
              <span>•</span>
              <span>Check-out: 12:00 (Noon)</span>
              <span>•</span>
              <span>Late check-out available on request</span>
            </div>
          </div>

          {/* Room Selection Section */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-serif">Select Your Room / Suite</h2>
                <p className="text-xs text-slate-500">Live room inventory with guaranteed instant confirmation</p>
              </div>
              <Badge variant="success" size="sm">Price Match Guarantee</Badge>
            </div>

            <div className="space-y-4">
              {hotel.rooms.map((room) => {
                const isSelected = selectedRoom?.id === room.id;
                const roomNightsUSD = room.priceUSD * nights;
                return (
                  <div
                    key={room.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row gap-5 items-center justify-between ${
                      isSelected 
                        ? 'border-blue-600 bg-blue-50/30 ring-1 ring-blue-500/20' 
                        : 'border-slate-200 bg-slate-50/50 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full sm:w-40 h-32 object-cover rounded-xl shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-base text-slate-900">{room.name}</h4>
                          {isSelected && (
                            <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full">
                              Selected
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1 font-medium">
                            <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                            <span>{room.size}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 font-medium">
                            <Bed className="w-3.5 h-3.5 text-blue-600" />
                            <span>{room.bedType}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 font-medium">
                            <Users className="w-3.5 h-3.5 text-blue-600" />
                            <span>{room.capacity}</span>
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-2.5">
                          {room.amenities.map((ra, idx) => (
                            <span key={idx} className="text-[10px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md">
                              {ra}
                            </span>
                          ))}
                        </div>

                        {room.freeCancellation && (
                          <span className="inline-block text-[11px] text-emerald-600 font-bold mt-2">
                            ✓ Free cancellation included
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right w-full md:w-auto flex md:flex-col items-center md:items-end justify-between pt-3 md:pt-0 border-t md:border-t-0 border-slate-200">
                      <div>
                        <span className="text-2xl font-black text-slate-900 font-sans block">
                          {format(room.priceUSD)}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          ${room.priceUSD} USD / night · Total for {nights}N: <strong className="text-slate-700">{format(roomNightsUSD)}</strong>
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleBookRoom(room)}
                        className="mt-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
                      >
                        Reserve Room
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Verified Guest Reviews & Score Breakdown */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-serif">Verified Guest Reviews</h2>
                <p className="text-xs text-slate-500">Real feedback from authenticated TRAVELVERSE guests</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-blue-700 font-sans">
                  {hotel.userRating}
                </span>
                <span className="text-xs text-slate-400 font-medium">/ 5.0 Exceptional ({hotel.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Score Breakdown Bars */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              {Object.entries(hotel.ratingBreakdown || {}).map(([key, val]) => (
                <div key={key} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block capitalize">{key}</span>
                  <span className="text-sm font-black text-slate-900 font-sans">{val}</span>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(val / 5) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reviews List */}
            <div className="space-y-4 pt-2">
              {hotel.reviews?.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{rev.author}</h4>
                      <p className="text-[11px] text-slate-400">{rev.location} · Stayed {rev.date}</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{rev.rating}.0</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sticky Card: Pricing & Guarantees */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 sticky top-24">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Prices starting from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900 font-sans">
                {format(nightlyTotalUSD)}
              </span>
              <span className="text-xs text-slate-500">/ night</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Supplier Base Rate: ${roomBaseUSD} USD · Total for {nights} Nights: <strong className="text-blue-700 font-sans">{format(totalStayUSD)}</strong>
            </p>
          </div>

          {/* Meal Plan Add-on Toggle */}
          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between text-xs cursor-pointer"
            onClick={() => setIncludeBreakfast(!includeBreakfast)}
          >
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-blue-600" />
              <div>
                <p className="font-bold text-slate-900">Gourmet Buffet Breakfast</p>
                <p className="text-[10px] text-slate-500">International halal buffet spread</p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
              includeBreakfast ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'
            }`}>
              {includeBreakfast && <Check className="w-3.5 h-3.5" />}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>TRAVELVERSE Hotel Guarantee</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Instant electronic voucher issued immediately. No hidden resort fees or foreign transaction penalties.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleBookRoom(selectedRoom || hotel.rooms[0])}
            className="w-full py-3.5 bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Lock className="w-4 h-4" />
            <span>Select Room & Complete Booking</span>
          </button>
        </div>

      </div>

      {/* Booking Checkout Modal */}
      <BookingCheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        bookingItem={{
          type: 'hotel',
          item: {
            ...hotel,
            selectedRoom,
            nights,
            includeBreakfast
          },
          priceUSD: totalStayUSD
        }}
      />

    </div>
  );
}

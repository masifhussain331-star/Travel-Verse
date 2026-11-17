import React from 'react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../../context/CurrencyContext';
import { useWishlist } from '../../context/WishlistContext';
import { 
  Star, 
  MapPin, 
  Heart, 
  ShieldCheck, 
  ChevronRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import Badge from '../common/Badge';

export default function HotelCard({ hotel }) {
  const { format, currentCurrency } = useCurrency();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const saved = isWishlisted(hotel.id);
  const nights = hotel.stayDetails?.nights || 1;
  const totalStayUSD = hotel.pricePerNightUSD * nights;

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      id: hotel.id,
      type: 'hotel',
      title: hotel.name,
      location: `${hotel.city}, ${hotel.country}`,
      priceUSD: hotel.pricePerNightUSD,
      image: hotel.heroImage,
      rating: hotel.userRating
    });
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row hover:border-blue-300">
      
      {/* Cover Image & Badges */}
      <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden shrink-0">
        <img
          src={hotel.heroImage}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden"></div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
            saved 
              ? 'bg-rose-500 text-white' 
              : 'bg-white/80 hover:bg-white text-slate-700 hover:text-rose-600'
          }`}
          title={saved ? 'Remove from Wishlist' : 'Save to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${saved ? 'fill-white' : ''}`} />
        </button>

        {/* Star Rating Badge */}
        <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-amber-400 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-white/10">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span>{hotel.starRating} Star Luxury</span>
        </div>

        {/* Provider Source Overlay on Bottom Left */}
        <div className="absolute bottom-3 left-3">
          {hotel.isDemo ? (
            <Badge variant="demo" size="sm" className="shadow-md">
              <Sparkles className="w-3 h-3 text-amber-700" />
              <span>Demo Inventory</span>
            </Badge>
          ) : (
            <Badge variant="real" size="sm" className="shadow-md">
              <ShieldCheck className="w-3 h-3 text-emerald-700" />
              <span>Verified Hotelbeds</span>
            </Badge>
          )}
        </div>
      </div>

      {/* Hotel Info & Content */}
      <div className="p-6 md:w-3/5 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Location & Reviews */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 text-xs text-blue-700 font-semibold truncate">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{hotel.city}, {hotel.country}</span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs font-bold text-slate-900 bg-blue-50 text-blue-800 px-2 py-0.5 rounded-lg border border-blue-200">
                ★ {hotel.userRating}
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">({hotel.reviewCount} reviews)</span>
            </div>
          </div>

          <Link to={`/hotels/${hotel.id}`}>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
              {hotel.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {hotel.description}
          </p>

          {/* Cancellation Policy Pill */}
          <div className="mt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">{hotel.cancellationPolicy.split('.')[0]}</span>
          </div>

          {/* Key Amenities */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {hotel.amenities.slice(0, 4).map((amenity, i) => (
              <span
                key={i}
                className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg"
              >
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 4 && (
              <span className="text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                +{hotel.amenities.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Reservation Action */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-slate-900 font-sans">
                {format(hotel.pricePerNightUSD)}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ night</span>
            </div>
            <div className="text-[10px] text-slate-400">
              Supplier: ${hotel.pricePerNightUSD} USD · Total for {nights} night(s): <strong className="text-slate-600">{format(totalStayUSD)}</strong>
            </div>
          </div>

          <Link
            to={`/hotels/${hotel.id}`}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95"
          >
            <span>View Rooms & Book</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
}

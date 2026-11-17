import React from 'react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../../context/CurrencyContext';
import { useWishlist } from '../../context/WishlistContext';
import { 
  Clock, 
  MapPin, 
  Users, 
  Star, 
  Heart, 
  CheckCircle2, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function PackageCard({ pkg }) {
  const { format } = useCurrency();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const saved = isWishlisted(pkg.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      id: pkg.id,
      type: 'package',
      title: pkg.title,
      location: pkg.destination,
      priceUSD: pkg.pricePerPersonUSD,
      image: pkg.heroImage,
      rating: pkg.rating
    });
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col hover:border-blue-300">
      
      {/* Cover Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={pkg.heroImage}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
            saved ? 'bg-rose-500 text-white' : 'bg-white/80 hover:bg-white text-slate-700 hover:text-rose-600'
          }`}
          title={saved ? 'Remove from Wishlist' : 'Save to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${saved ? 'fill-white' : ''}`} />
        </button>

        {/* Category Pill */}
        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-md">
          {pkg.category}
        </div>

        {/* Duration & Destination Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1 font-semibold">
            <Clock className="w-3.5 h-3.5 text-sky-300" />
            <span>{pkg.duration}</span>
          </div>

          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-white/20">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-bold">{pkg.rating}</span>
            <span className="text-slate-300">({pkg.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Package Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-blue-700 font-semibold mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{pkg.destination}</span>
          </div>

          <Link to={`/packages/${pkg.id}`}>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
              {pkg.title}
            </h3>
          </Link>

          {/* Highlights checklist */}
          <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
            {pkg.inclusions.slice(0, 3).map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="truncate">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price & CTA */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-bold">From</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-slate-900 font-sans">
                {format(pkg.pricePerPersonUSD)}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">/ person</span>
            </div>
          </div>

          <Link
            to={`/packages/${pkg.id}`}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 hover:scale-105"
          >
            <span>View Itinerary</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
}


import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PACKAGES_DATA } from '../data/packagesData';
import { useCurrency } from '../context/CurrencyContext';
import { useWishlist } from '../context/WishlistContext';
import BookingCheckoutModal from '../components/common/BookingCheckoutModal';
import { 
  Clock, 
  MapPin, 
  Users, 
  Star, 
  Heart, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  ArrowLeft,
  Lock,
  Sparkles
} from 'lucide-react';
import Badge from '../components/common/Badge';

export default function PackageDetailPage() {
  const { id } = useParams();
  const { format, currentCurrency } = useCurrency();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const pkg = PACKAGES_DATA.find(p => p.id === id || p.slug === id) || PACKAGES_DATA[0];
  const saved = isWishlisted(pkg.id);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button */}
      <Link
        to="/packages"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Tour Packages</span>
      </Link>

      {/* Hero Banner */}
      <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
        <img
          src={pkg.heroImage}
          alt={pkg.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

        <div className="absolute top-6 right-6 flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleWishlist({
              id: pkg.id,
              type: 'package',
              title: pkg.title,
              location: pkg.destination,
              priceUSD: pkg.pricePerPersonUSD,
              image: pkg.heroImage,
              rating: pkg.rating
            })}
            className={`p-3 rounded-2xl backdrop-blur-md shadow-md ${
              saved ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-700 hover:text-rose-600'
            }`}
          >
            <Heart className={`w-5 h-5 ${saved ? 'fill-white' : ''}`} />
          </button>
        </div>

        <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
          <Badge variant="primary" size="sm">{pkg.category}</Badge>
          <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight">
            {pkg.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-blue-200">
            <span className="flex items-center gap-1 font-semibold">
              <Clock className="w-4 h-4" />
              <span>{pkg.duration}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{pkg.destination}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{pkg.groupSize}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content & Itinerary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Itinerary & Inclusions */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Day-by-Day Itinerary */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 font-serif">Comprehensive Day-by-Day Itinerary</h2>

            <div className="space-y-6">
              {pkg.itinerary.map((item) => (
                <div key={item.day} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center shrink-0 shadow-md">
                      {item.day}
                    </span>
                    <div className="w-0.5 flex-1 bg-blue-100 my-1"></div>
                  </div>

                  <div className="pb-4">
                    <h4 className="font-bold text-sm text-slate-900">
                      Day {item.day}: {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 font-serif">What's Included & Excluded</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Package Inclusions</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-3 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Package Exclusions</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Pricing & Booking Action */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 sticky top-24">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Package Price</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900 font-sans">
                {format(pkg.pricePerPersonUSD)}
              </span>
              <span className="text-xs text-slate-500">/ person</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Supplier Rate: ${pkg.pricePerPersonUSD} USD · All taxes & guide fees included
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>TRAVELVERSE Guarantee</span>
            </div>
            <p className="text-slate-600 text-[11px]">
              Lock your departure date today with a 100% refundable booking guarantee up to 14 days before departure.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setCheckoutOpen(true)}
            className="w-full py-3.5 bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <Lock className="w-4 h-4" />
            <span>Book This Tour Package</span>
          </button>
        </div>

      </div>

      {/* Booking Checkout Modal */}
      <BookingCheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        bookingItem={{
          type: 'package',
          item: pkg,
          priceUSD: pkg.pricePerPersonUSD
        }}
      />

    </div>
  );
}


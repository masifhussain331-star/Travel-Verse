import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';
import BookingCheckoutModal from '../components/common/BookingCheckoutModal';
import { 
  Heart, 
  Trash2, 
  ArrowRight, 
  Star, 
  MapPin, 
  Plane, 
  Building2, 
  Package,
  ShoppingBag
} from 'lucide-react';
import Badge from '../components/common/Badge';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { format } = useCurrency();
  const [checkoutItem, setCheckoutItem] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Badge variant="primary" size="sm">Saved Travel Dream Book</Badge>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif mt-2">
            My Saved Wishlist ({wishlist.length})
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            Keep track of your dream hotels, curated tour expeditions, and flights before prices change.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/destinations"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-colors"
          >
            Explore More Destinations
          </Link>
        </div>
      </div>

      {/* Wishlist Grid */}
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=80'}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-md"
                  title="Remove from Wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  {item.type}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-blue-700 font-semibold mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.location}</span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Estimated Rate</span>
                    <span className="text-xl font-black text-slate-900 font-sans">
                      {format(item.priceUSD)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCheckoutItem({
                      type: item.type,
                      item: { id: item.id, title: item.title, name: item.title },
                      priceUSD: item.priceUSD
                    })}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Your wishlist is currently empty</h3>
          <p className="text-xs text-slate-500">
            Save your favorite flight connections, 5-star island resorts, and tour packages to review them later.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link
              to="/flights"
              className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-colors"
            >
              Search Flights
            </Link>
            <Link
              to="/hotels"
              className="px-4 py-2 bg-slate-100 text-slate-800 font-bold text-xs rounded-xl hover:bg-slate-200 transition-colors"
            >
              Browse Hotels
            </Link>
          </div>
        </div>
      )}

      {/* Booking Checkout Modal */}
      <BookingCheckoutModal
        isOpen={Boolean(checkoutItem)}
        onClose={() => setCheckoutItem(null)}
        bookingItem={checkoutItem}
      />

    </div>
  );
}


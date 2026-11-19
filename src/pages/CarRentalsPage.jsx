import React, { useState, useMemo } from 'react';
import { CARS_DATA } from '../data/carsData';
import { useCurrency } from '../context/CurrencyContext';
import CarCard from '../components/cars/CarCard';
import BookingCheckoutModal from '../components/common/BookingCheckoutModal';
import {
  Car,
  MapPin,
  Calendar,
  ShieldCheck,
  Sparkles,
  Search,
  CheckCircle2
} from 'lucide-react';
import Badge from '../components/common/Badge';

export default function CarRentalsPage() {
  const { format, currentCurrency } = useCurrency();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [checkoutCar, setCheckoutCar] = useState(null);

  const categories = [
    'all',
    'Luxury Sedan',
    'Full-size SUV',
    'Premium Adventure SUV',
    'Luxury VIP MPV',
    'Economy & Comfort'
  ];

  const locations = [
    'all',
    'Islamabad (ISB)',
    'Dubai (DXB)',
    'London (LHR)',
    'Istanbul (IST)',
    'Skardu (KDU)'
  ];

  const filteredCars = useMemo(() => {
    return CARS_DATA.filter((car) => {
      if (selectedCategory !== 'all' && car.category !== selectedCategory) return false;
      if (selectedLocation !== 'all' && !car.locations.includes(selectedLocation)) return false;
      return true;
    });
  }, [selectedCategory, selectedLocation]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="max-w-2xl space-y-3">
          <Badge variant="primary" size="sm">Worldwide Car Rentals & Chauffeurs</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
            Drive in Elegance, Comfort & Confidence
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
            Available cars includes BMW, Mercedes, Benz & some others.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              {cat === 'all' ? 'All Vehicle Classes' : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc === 'all' ? 'All Pickup Hubs' : loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onReserve={(c) => setCheckoutCar(c)}
          />
        ))}
      </div>

      {/* Booking Modal */}
      <BookingCheckoutModal
        isOpen={Boolean(checkoutCar)}
        onClose={() => setCheckoutCar(null)}
        bookingItem={checkoutCar ? {
          type: 'car',
          item: checkoutCar,
          priceUSD: checkoutCar.pricePerDayUSD
        } : null}
      />

    </div>
  );
}


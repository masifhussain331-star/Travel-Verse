import React from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { 
  Users, 
  Luggage, 
  Gauge, 
  Fuel, 
  ShieldCheck, 
  CheckCircle2, 
  Star,
  ChevronRight
} from 'lucide-react';
import Badge from '../common/Badge';

export default function CarCard({ car, onReserve }) {
  const { format } = useCurrency();

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:border-blue-300">
      
      {/* Photo & Category */}
      <div className="relative h-48 bg-slate-100 overflow-hidden p-4 flex items-center justify-center">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
          {car.category}
        </div>
        <div className="absolute top-4 right-4 bg-amber-400 text-slate-950 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
          <Star className="w-3 h-3 fill-slate-950" />
          <span>{car.rating}</span>
        </div>
      </div>

      {/* Info & Specs */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {car.name}
          </h3>
          <p className="text-xs text-slate-400 mb-3">{car.brand} or similar guarantee</p>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>{car.seats} Seats</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Luggage className="w-3.5 h-3.5 text-blue-600" />
              <span>{car.luggage}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-blue-600" />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-blue-600" />
              <span>{car.fuelType}</span>
            </div>
          </div>

          {/* Features list */}
          <div className="space-y-1 mb-4">
            {car.features.slice(0, 2).map((feat, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & Reservation Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-slate-900 font-sans">
                {format(car.pricePerDayUSD)}
              </span>
              <span className="text-[11px] text-slate-500">/ day</span>
            </div>
            <div className="text-[10px] text-slate-400">
              Supplier: ${car.pricePerDayUSD} USD
            </div>
          </div>

          <button
            type="button"
            onClick={() => onReserve(car)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1 hover:scale-105"
          >
            <span>Book Car</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}


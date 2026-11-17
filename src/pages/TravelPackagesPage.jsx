import React, { useState, useMemo } from 'react';
import { PACKAGES_DATA } from '../data/packagesData';
import { useCurrency } from '../context/CurrencyContext';
import PackageCard from '../components/packages/PackageCard';
import { 
  Package, 
  SlidersHorizontal, 
  RotateCcw, 
  Clock, 
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import Badge from '../components/common/Badge';

export default function TravelPackagesPage() {
  const { format, currentCurrency } = useCurrency();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [maxPriceUSD, setMaxPriceUSD] = useState(1500);

  const categories = [
    'all',
    'Luxury & Adventure',
    'Nature & Cultural Heritage',
    'Cultural & Romantic',
    'Relaxation & Island Escape'
  ];

  const filteredPackages = useMemo(() => {
    return PACKAGES_DATA.filter((pkg) => {
      if (selectedCategory !== 'all' && pkg.category !== selectedCategory) return false;
      if (pkg.pricePerPersonUSD > maxPriceUSD) return false;
      return true;
    });
  }, [selectedCategory, maxPriceUSD]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="max-w-2xl space-y-3">
          <Badge variant="primary" size="sm">Bespoke Holiday Expeditions</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
            Curated Global Travel Packages
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
            All-inclusive holiday itineraries designed with 5-star accommodations, private luxury airport transfers, VIP sightseeing access, and expert local hosts.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Budget Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedCategory === cat 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Packages' : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-bold uppercase">Max: {format(maxPriceUSD)}</span>
          <input
            type="range"
            min="400"
            max="1500"
            step="50"
            value={maxPriceUSD}
            onChange={(e) => setMaxPriceUSD(Number(e.target.value))}
            className="w-32 accent-blue-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPackages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>

    </div>
  );
}


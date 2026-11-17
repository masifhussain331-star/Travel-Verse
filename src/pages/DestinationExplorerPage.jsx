import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { useCurrency } from '../context/CurrencyContext';
import { 
  Compass, 
  Search, 
  MapPin, 
  Star, 
  Calendar, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Badge from '../components/common/Badge';

export default function DestinationExplorerPage() {
  const { format } = useCurrency();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('all');

  const continents = ['all', 'Middle East', 'Europe', 'Asia'];

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS_DATA.filter((dest) => {
      if (selectedContinent !== 'all') {
        if (!dest.continent.toLowerCase().includes(selectedContinent.toLowerCase())) return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          dest.name.toLowerCase().includes(q) ||
          dest.country.toLowerCase().includes(q) ||
          dest.overview.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [searchQuery, selectedContinent]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4">
          <Badge variant="primary" size="sm">Worldwide Destination Explorer</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
            Curated Guides to the World’s Greatest Wonders
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
            From the futuristic towers of Dubai and historic minarets of Istanbul to the majesty of the Karakorams and romantic Seine sunsets in Paris.
          </p>

          {/* Search bar inside banner */}
          <div className="pt-2 relative max-w-md">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destination, country or attraction..."
              className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-xs sm:text-sm text-white placeholder-blue-200 focus:outline-none focus:bg-white/20"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {continents.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedContinent(c)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold capitalize transition-all shrink-0 ${
              selectedContinent === c
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {c === 'all' ? 'All Regions' : c}
          </button>
        ))}
      </div>

      {/* Destination Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDestinations.map((dest) => (
          <div
            key={dest.id}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col hover:border-blue-300"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={dest.heroImage}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

              <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
                {dest.country}
              </div>

              <div className="absolute top-4 right-4 bg-slate-950/70 backdrop-blur-md text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{dest.rating}</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-bold font-serif">{dest.name}</h3>
                <p className="text-xs text-slate-300 line-clamp-1">{dest.tagline}</p>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {dest.overview}
              </p>

              <div className="space-y-2 text-xs pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Best Season:</span>
                  <span className="font-semibold text-slate-800">{dest.bestTimeToVisit.split('(')[0]}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Daily Budget:</span>
                  <span className="font-bold text-blue-700 font-sans">{format(dest.averageDailyBudgetUSD)} / day</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to={`/destinations/${dest.slug}`}
                  className="w-full py-2.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Explore Travel Guide & Itineraries</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}


import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { useCurrency } from '../context/CurrencyContext';
import { 
  MapPin, 
  ArrowLeft, 
  Calendar, 
  CreditCard, 
  Globe, 
  Clock, 
  Plane, 
  Building2, 
  Package, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Badge from '../components/common/Badge';

export default function DestinationDetailPage() {
  const { slug } = useParams();
  const { format } = useCurrency();

  const destination = DESTINATIONS_DATA.find(d => d.slug === slug) || DESTINATIONS_DATA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Back button */}
      <Link
        to="/destinations"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Destinations</span>
      </Link>

      {/* Hero Panorama */}
      <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

        <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
          <Badge variant="primary" size="sm">{destination.continent} Explorer</Badge>
          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight">
            {destination.name}, {destination.country}
          </h1>
          <p className="text-sm sm:text-base text-blue-200 max-w-2xl">
            {destination.tagline}
          </p>
        </div>
      </div>

      {/* Quick Facts Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <Calendar className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase text-slate-400">Best Season</span>
          </div>
          <p className="text-xs font-bold text-slate-800">{destination.bestTimeToVisit}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <CreditCard className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase text-slate-400">Local Currency</span>
          </div>
          <p className="text-xs font-bold text-slate-800">{destination.currency}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <Globe className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase text-slate-400">Languages</span>
          </div>
          <p className="text-xs font-bold text-slate-800">{destination.languages}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase text-slate-400">Time Zone</span>
          </div>
          <p className="text-xs font-bold text-slate-800">{destination.timeZone}</p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Overview & Attractions */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Overview */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-serif">About {destination.name}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {destination.overview}
            </p>
          </div>

          {/* Visa Guidelines */}
          <div className="bg-amber-50/70 border border-amber-200/80 p-6 rounded-3xl space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Visa & Entry Information</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              {destination.visaInfo}
            </p>
          </div>

          {/* Must-Visit Attractions */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 font-serif">Top Highlights & Must-Visit Attractions</h2>

            <div className="space-y-4">
              {destination.topAttractions.map((att, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">{att.name}</h3>
                  </div>
                  <p className="text-xs text-slate-600 pl-7">{att.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Action Column: Travel Deals */}
        <div className="lg:col-span-4 space-y-4 sticky top-24">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 pb-2 border-b border-slate-100">
              Travel Deals to {destination.name}
            </h3>

            <Link
              to={`/flights?destination=${destination.slug === 'dubai' ? 'DXB' : destination.slug === 'istanbul' ? 'IST' : destination.slug === 'paris' ? 'CDG' : 'ISB'}`}
              className="w-full p-4 rounded-2xl bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200 flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-3">
                <Plane className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-bold text-slate-900">Find Flights</p>
                  <p className="text-slate-500 text-[11px]">Compare 500+ carriers</p>
                </div>
              </div>
              <span className="font-bold text-blue-700">Search →</span>
            </Link>

            <Link
              to={`/hotels?destination=${destination.name}`}
              className="w-full p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-bold text-slate-900">Luxury Hotels & Resorts</p>
                  <p className="text-slate-500 text-[11px]">Best price in PKR guaranteed</p>
                </div>
              </div>
              <span className="font-bold text-blue-700">Browse →</span>
            </Link>

            <Link
              to="/packages"
              className="w-full p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-bold text-slate-900">All-Inclusive Tour Packages</p>
                  <p className="text-slate-500 text-[11px]">Itinerary with private transfers</p>
                </div>
              </div>
              <span className="font-bold text-blue-700">Explore →</span>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}


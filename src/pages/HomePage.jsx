import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCurrency } from '../context/CurrencyContext';
import FlightSearchForm from '../components/flights/FlightSearchForm';
import HotelSearchForm from '../components/hotels/HotelSearchForm';
import FlightCard from '../components/flights/FlightCard';
import HotelCard from '../components/hotels/HotelCard';
import PackageCard from '../components/packages/PackageCard';
import CarCard from '../components/cars/CarCard';
import FlightDetailsModal from '../components/flights/FlightDetailsModal';
import BookingCheckoutModal from '../components/common/BookingCheckoutModal';
import { FLIGHTS_SEED } from '../data/flightsData';
import { HOTELS_DATA } from '../data/hotelsData';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { PACKAGES_DATA } from '../data/packagesData';
import { CARS_DATA } from '../data/carsData';
import { 
  Plane, 
  Building2, 
  Compass, 
  Package, 
  Car, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Clock, 
  ArrowRight, 
  Star, 
  Globe2,
  CheckCircle2,
  Headphones,
  Quote,
  Send,
  Lock,
  ThumbsUp,
  MapPin
} from 'lucide-react';
import Badge from '../components/common/Badge';

export default function HomePage() {
  const { currentCurrency, currencyData, format } = useCurrency();
  const [activeTab, setActiveTab] = useState('flights'); // 'flights' | 'hotels' | 'packages' | 'cars'
  
  // Modals state
  const [selectedFlightForDetails, setSelectedFlightForDetails] = useState(null);
  const [checkoutItem, setCheckoutItem] = useState(null);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSelectFlight = (flight) => {
    setCheckoutItem({
      type: 'flight',
      item: flight,
      priceUSD: flight.basePriceUSD
    });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 4000);
    }
  };

  const testimonials = [
    {
      id: 1,
      name: 'Zainab Fatima',
      city: 'Islamabad, Pakistan',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      trip: 'Emirates EK 612 (ISB → DXB)',
      rating: 5,
      comment: 'Booked flights from Islamabad to Dubai with Emirates. Having the price in PKR exactly matching what was charged without bank surprise foreign fees was fantastic. E-ticket issued in seconds!'
    },
    {
      id: 2,
      name: 'Hamza & Sarah Tariq',
      city: 'Lahore, Pakistan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      trip: 'Karakoram & Hunza Expedition',
      rating: 5,
      comment: 'The 8-day Northern Pakistan tour package was magical! The 4x4 Land Cruiser, Serena Shigar Palace stay, and local guide exceeded all our expectations. Truly a 5-star experience.'
    },
    {
      id: 3,
      name: 'Dr. Marcus Vance',
      city: 'London, UK',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      trip: 'Four Seasons Istanbul at the Bosphorus',
      rating: 5,
      comment: 'Seamless hotel room selection and guaranteed cancellation policy. The TRAVELVERSE interface is significantly more elegant and responsive than legacy booking platforms.'
    }
  ];

  const quickDeals = [
    { label: 'ISB → Dubai (DXB)', priceUSD: 295, path: '/flights?origin=ISB&destination=DXB' },
    { label: 'LHE → Istanbul (IST)', priceUSD: 410, path: '/flights?origin=LHE&destination=IST' },
    { label: 'Atlantis The Royal', priceUSD: 520, path: '/hotels/HTL-DXB-ATLANTIS' },
    { label: 'Hunza Odyssey (8D/7N)', priceUSD: 520, path: '/packages/PKG-HUNZA-EXPEDITION' }
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. LARGE LUXURY TRAVEL HERO */}
      <section className="relative min-h-[680px] flex items-center justify-center pt-8 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image with Deep Navy Gradient Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&auto=format&fit=crop&q=80"
            alt="World Travel"
            className="w-full h-full object-cover scale-105 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-blue-950/80 to-slate-900/95"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/25 via-transparent to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto w-full text-center space-y-6">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 text-xs font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Discover the World · Travel Without Limits</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="text-white font-bold">Guaranteed Fares in {currentCurrency} ({currencyData.symbol})</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]"
          >
            Discover the World. <br />
            <span className="bg-gradient-to-r from-sky-300 via-blue-200 to-amber-200 bg-clip-text text-transparent font-serif italic">
              Travel Without Limits.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 font-normal leading-relaxed"
          >
            Worldwide flight bookings, handpicked 5-star sanctuaries, curated holiday tours, and executive car rentals at transparent institutional rates in PKR and global currencies.
          </motion.p>

          {/* Quick Shortcuts Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-2 text-xs"
          >
            <span className="text-slate-400 font-semibold hidden sm:inline">Popular Fares:</span>
            {quickDeals.map((deal, idx) => (
              <Link
                key={idx}
                to={deal.path}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white border border-white/15 backdrop-blur-md transition-all flex items-center gap-1.5"
              >
                <span>{deal.label}</span>
                <span className="text-amber-300 font-bold font-sans">({format(deal.priceUSD)})</span>
              </Link>
            ))}
          </motion.div>

          {/* Search Tabs & Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-2 max-w-5xl mx-auto text-left"
          >
            {/* Tabs selector */}
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-3 px-2">
              <button
                type="button"
                onClick={() => setActiveTab('flights')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-sm ${
                  activeTab === 'flights'
                    ? 'bg-blue-600 text-white shadow-blue-500/30'
                    : 'bg-white/20 backdrop-blur-md text-white hover:bg-white/30'
                }`}
              >
                <Plane className="w-4 h-4" />
                <span>Flights</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('hotels')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-sm ${
                  activeTab === 'hotels'
                    ? 'bg-blue-600 text-white shadow-blue-500/30'
                    : 'bg-white/20 backdrop-blur-md text-white hover:bg-white/30'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Hotels</span>
              </button>

              <Link
                to="/packages"
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all shadow-sm"
              >
                <Package className="w-4 h-4" />
                <span>Packages</span>
              </Link>

              <Link
                to="/cars"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all shadow-sm"
              >
                <Car className="w-4 h-4" />
                <span>Car Rentals</span>
              </Link>
            </div>

            {/* Active Search Widget */}
            <div className="animate-in fade-in duration-300">
              {activeTab === 'flights' ? (
                <FlightSearchForm />
              ) : (
                <HotelSearchForm />
              )}
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. TRUST STATS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl sm:text-4xl font-black text-slate-900 font-sans">500+</p>
            <p className="text-xs text-slate-500 mt-1 font-semibold">IATA Partner Airlines</p>
          </div>
          <div>
            <p className="text-2xl sm:text-4xl font-black text-slate-900 font-sans">120,000+</p>
            <p className="text-xs text-slate-500 mt-1 font-semibold">5-Star Verified Hotels</p>
          </div>
          <div>
            <p className="text-2xl sm:text-4xl font-black text-blue-600 font-sans">PKR ₨</p>
            <p className="text-xs text-slate-500 mt-1 font-semibold">Zero Hidden Markup</p>
          </div>
          <div>
            <p className="text-2xl sm:text-4xl font-black text-emerald-600 font-sans">24 / 7</p>
            <p className="text-xs text-slate-500 mt-1 font-semibold">Live Dedicated Concierge</p>
          </div>
        </div>
      </section>

      {/* 3. POPULAR WORLDWIDE DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              <Compass className="w-4 h-4" />
              <span>Worldwide Explorer</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1 font-serif">
              Trending Global Destinations
            </h2>
            <p className="text-xs text-slate-500 mt-1">Discover iconic architecture, tropical beaches, and high Himalayan peaks</p>
          </div>
          <Link
            to="/destinations"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 group"
          >
            <span>Explore all destination guides</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS_DATA.slice(0, 6).map((dest) => (
            <Link
              key={dest.id}
              to={`/destinations/${dest.slug}`}
              className="group relative h-80 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-200/80"
            >
              <img
                src={dest.heroImage}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

              <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
                {dest.country}
              </div>

              <div className="absolute top-4 right-4 bg-slate-950/70 backdrop-blur-md text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{dest.rating}</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <h3 className="text-xl font-bold font-serif tracking-tight">{dest.name}</h3>
                <p className="text-xs text-slate-300 line-clamp-1">{dest.tagline}</p>
                <div className="pt-2 flex items-center justify-between text-xs text-sky-200">
                  <span>Best: {dest.bestTimeToVisit.split('(')[0]}</span>
                  <span className="font-bold text-white group-hover:underline flex items-center gap-1">
                    Guide & Deals →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED REAL-TIME FLIGHT OFFERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              <Plane className="w-4 h-4" />
              <span>Real-Time Guaranteed Deals</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1 font-serif">
              Featured Flights from Pakistan & Hubs
            </h2>
            <p className="text-xs text-slate-500 mt-1">Direct partner schedules with Emirates, Qatar Airways, PIA, and Turkish Airlines</p>
          </div>
          <Link
            to="/flights"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 group"
          >
            <span>Search all 500+ flights</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="space-y-4">
          {FLIGHTS_SEED.slice(0, 4).map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              onSelect={handleSelectFlight}
              onViewDetails={setSelectedFlightForDetails}
            />
          ))}
        </div>
      </section>

      {/* 5. HANDPICKED LUXURY HOTELS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              <Building2 className="w-4 h-4" />
              <span>5-Star Sanctuaries</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1 font-serif">
              Handpicked Luxury Resorts & Hotels
            </h2>
            <p className="text-xs text-slate-500 mt-1">Direct room inventory with verified reviews and free cancellation windows</p>
          </div>
          <Link
            to="/hotels"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 group"
          >
            <span>Browse all hotels</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {HOTELS_DATA.slice(0, 4).map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>

      {/* 6. CURATED ALL-INCLUSIVE PACKAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              <Package className="w-4 h-4" />
              <span>All-Inclusive Holidays</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1 font-serif">
              Curated Travel Packages & Tours
            </h2>
            <p className="text-xs text-slate-500 mt-1">Bespoke itineraries with private chauffeurs, 5-star heritage hotels, and guided excursions</p>
          </div>
          <Link
            to="/packages"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 group"
          >
            <span>View all packages</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGES_DATA.slice(0, 3).map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* 7. VERIFIED CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <Badge variant="primary" size="sm">Verified Traveler Experiences</Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif">
            Loved by Discerning Global Voyagers
          </h2>
          <p className="text-xs text-slate-500 max-w-lg mx-auto">
            Read authentic reviews from international travelers booking flights, resorts, and expeditions across the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-blue-100" />
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500/20"
                />
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{t.name}</h4>
                  <p className="text-[11px] text-slate-400">{t.city}</p>
                  <p className="text-[10px] text-blue-600 font-semibold">{t.trip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. WHY CHOOSE TRAVELVERSE */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-950 to-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-3xl max-w-7xl mx-auto my-12 relative overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif">
              Why Discerning Travelers Choose TRAVELVERSE
            </h2>
            <p className="text-xs sm:text-sm text-blue-200 max-w-2xl mx-auto">
              We bridge the world's most prestigious travel suppliers with transparent local currency pricing in PKR, zero hidden markup fees, and unconditional support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-sky-300 flex items-center justify-center">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base">Direct Supplier Rates</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Preserving original supplier wholesale rates in USD and EUR with live, transparent conversion to PKR.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base">Instant E-Tickets</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Confirmed reservations with carrier PNR codes and hotel booking vouchers instantly issued upon checkout.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base">24/7 Human Concierge</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dedicated travel desk based in Islamabad and Dubai available via phone, live chat, and WhatsApp support.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base">IATA Accredited</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Full compliance with international air transport standards, automated refunds, and consumer protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. NEWSLETTER & FARE ALERTS CLUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 rounded-3xl p-8 sm:p-14 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
              Private Voyager Club
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-serif">
              Unlock Exclusive Flight & Resort Tariffs
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Join 50,000+ members receiving weekly flash fare notifications in PKR, secret promo codes, and luxury hotel upgrade vouchers.
            </p>
          </div>

          <div className="w-full lg:max-w-md">
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-4 py-3 rounded-2xl bg-white text-slate-900 placeholder-slate-400 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs rounded-2xl shadow-lg transition-transform hover:scale-105 shrink-0 flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Join Club</span>
              </button>
            </form>

            {newsletterSubscribed && (
              <div className="mt-3 p-3 bg-white/20 backdrop-blur-md rounded-xl text-xs text-white flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>You're in! Check your inbox for your first member voucher code.</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FLIGHT DETAILS MODAL */}
      <FlightDetailsModal
        flight={selectedFlightForDetails}
        isOpen={Boolean(selectedFlightForDetails)}
        onClose={() => setSelectedFlightForDetails(null)}
        onProceedToBooking={(fl) => {
          setSelectedFlightForDetails(null);
          handleSelectFlight(fl);
        }}
      />

      {/* CHECKOUT & BOOKING MODAL */}
      <BookingCheckoutModal
        isOpen={Boolean(checkoutItem)}
        onClose={() => setCheckoutItem(null)}
        bookingItem={checkoutItem}
      />

    </div>
  );
}

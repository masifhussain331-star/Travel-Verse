import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Award, 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  Plane, 
  Building2 
} from 'lucide-react';
import Badge from '../components/common/Badge';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <Badge variant="primary" size="sm">Our Story & Heritage</Badge>
          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight">
            Discover the World. <br />
            <span className="bg-gradient-to-r from-sky-300 to-amber-200 bg-clip-text text-transparent italic">
              Travel Without Limits.
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
            TRAVELVERSE was founded on a simple yet revolutionary principle: providing travelers worldwide and across Pakistan with honest, transparent pricing in local currency (PKR), direct connection to premier airlines, and uncompromised luxury accommodations.
          </p>
        </div>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">Uncompromising Transparency</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            No unexpected currency exchange penalties, hidden booking markups, or phantom fees. What you see is what you pay in PKR and supplier USD.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">Direct Carrier Integration</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Direct NDC partnerships with Emirates, Qatar Airways, PIA, Turkish Airlines, and top hotel chains ensure your seats and suites are locked immediately upon checkout.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">24/7 Human Traveler Care</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We don’t abandon you to endless automated phone trees. Our senior travel advisors in Islamabad and Dubai assist you at every step of your international voyage.
          </p>
        </div>
      </div>

      {/* Story & Global Hubs */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 font-serif">Redefining Global Travel Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-slate-600 leading-relaxed">
          <p>
            Traditional travel platforms in developing markets frequently burden customers with opaque foreign transaction markups, delayed ticket confirmations, and absent customer support when flights get rescheduled. TRAVELVERSE was engineered by senior full-stack architects and travel industry veterans to replace fragmentation with absolute reliability.
          </p>
          <p>
            Whether embarking on an adventure across the Karakorams in Skardu, experiencing the luxury of Atlantis The Royal in Dubai, or embarking on a romantic honeymoon in the Maldives, TRAVELVERSE delivers an elevated booking journey designed to inspire.
          </p>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <span>✓ IATA Licensed Agency</span>
            <span>✓ 256-Bit SSL Payment Engine</span>
            <span>✓ Over 250,000 Happy Travelers</span>
          </div>

          <Link
            to="/flights"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            Start Your Journey Now
          </Link>
        </div>
      </div>

    </div>
  );
}


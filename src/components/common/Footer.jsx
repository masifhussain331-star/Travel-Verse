import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  CreditCard, 
  Send, 
  CheckCircle2, 
  Plane, 
  Building2, 
  Compass, 
  Award,
  Clock,
  Sparkles
} from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export default function Footer() {
  const { currentCurrency, exchangeTimestamp } = useCurrency();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800/80">
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">100% Secure Checkout</h4>
              <p className="text-xs text-slate-400">256-Bit SSL Bank Grade Encryption</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Best Price Guarantee</h4>
              <p className="text-xs text-slate-400">Transparent rates in PKR & USD</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="w-10 h-10 rounded-xl bg-amber-600/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">24/7 Global Concierge</h4>
              <p className="text-xs text-slate-400">Instant dedicated traveler support</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="w-10 h-10 rounded-xl bg-purple-600/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">IATA Certified Network</h4>
              <p className="text-xs text-slate-400">500+ global partner airlines</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-slate-800/80">
          
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-sky-400 flex items-center justify-center text-white">
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                TRAVEL<span className="text-blue-500">VERSE</span>
              </span>
            </Link>

            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Discover the World. Travel Without Limits. TRAVELVERSE is the next-generation global travel ecosystem offering real-time flight bookings, 5-star handpicked hotels, curated expedition packages, and car rentals.
            </p>

            <div className="pt-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-2">Subscribe for Private Deals</h5>
              <form onSubmit={handleNewsletterSubmit} className="flex max-w-sm gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Join</span>
                </button>
              </form>
              {subscribed && (
                <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Welcome aboard! Check your inbox for exclusive travel offers.</span>
                </div>
              )}
            </div>
          </div>

          {/* Travel Solutions */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Travel Portals</h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/flights" className="hover:text-blue-400 transition-colors">Worldwide Flights</Link>
              </li>
              <li>
                <Link to="/hotels" className="hover:text-blue-400 transition-colors">Luxury Hotels & Resorts</Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-blue-400 transition-colors">Curated Travel Packages</Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-blue-400 transition-colors">Destination Guides & Explorer</Link>
              </li>
              <li>
                <Link to="/cars" className="hover:text-blue-400 transition-colors">Worldwide Car Rentals</Link>
              </li>
            </ul>
          </div>

          {/* Customer Space */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Member Account</h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/dashboard" className="hover:text-blue-400 transition-colors">User Dashboard</Link>
              </li>
              <li>
                <Link to="/bookings" className="hover:text-blue-400 transition-colors">My Bookings & E-Tickets</Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-blue-400 transition-colors">Saved Wishlist</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-400 transition-colors">Sign In</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-blue-400 transition-colors">Create Free Account</Link>
              </li>
              <li>
                <Link to="/admin" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1">
                  <span>Admin Management</span>
                  <span className="text-[10px] bg-amber-500/20 px-1 rounded">Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Company & Legal</h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">About TRAVELVERSE</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact & 24/7 Support</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-400 transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy & Data Policy</Link>
              </li>
            </ul>

            <div className="mt-4 pt-3 border-t border-slate-900 text-[11px] text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>+92 51 111 872 835</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>concierge@travelverse.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Currency Notice & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p>
              © 2026 TRAVELVERSE Global Ltd. All rights reserved. Default display currency is PKR (₨).
            </p>
            <p className="text-[11px] text-slate-600 mt-1">
              Active currency: <strong className="text-slate-400">{currentCurrency}</strong>. Supplier tariffs are preserved in supplier currencies (USD/EUR) and converted at institutional foreign exchange rates.
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              Live Booking Engine
            </span>
            <span>•</span>
            <Link to="/terms" className="hover:text-white transition-colors">Legal Terms</Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}


import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Send, 
  Clock, 
  CheckCircle2, 
  Headphones, 
  Globe, 
  ChevronDown 
} from 'lucide-react';
import Badge from '../components/common/Badge';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bookingRef, setBookingRef] = useState('');
  const [subject, setSubject] = useState('Flight Booking Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: 'How does currency conversion work on TRAVELVERSE?',
      a: 'TRAVELVERSE defaults to Pakistani Rupees (PKR ₨) for all prices across the platform. Original supplier fares are locked in USD, EUR, or AED and converted using institutional exchange rates updated multiple times daily with zero hidden markup fees.'
    },
    {
      q: 'What is the cancellation and refund policy?',
      a: 'Flights marked as "Refundable" allow full or partial refunds depending on carrier rules. Most reservations have an initial 24-hour zero-fee cancellation window. Refunds are automatically credited back to your original payment method.'
    },
    {
      q: 'What does the DEMO status on bookings mean?',
      a: 'During testing or when live provider sandbox mode is active, bookings are created with full fidelity (seat maps, ticket references, vouchers) without debiting your real credit card or bank account.'
    },
    {
      q: 'Can I add baggage or special dietary meals to my flight?',
      a: 'Yes! Baggage allowances and halal/special meal preferences can be designated directly during the passenger checkout step or updated through My Bookings.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setBookingRef('');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="max-w-2xl space-y-3">
          <Badge variant="primary" size="sm">24/7 Global Travel Desk</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
            We’re Here for Your Every Journey
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
            Need help rescheduling an international flight, arranging VIP airport transfers, or managing visa paperwork? Our dedicated travel concierge team is on standby 24/7.
          </p>
        </div>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Direct Phone Support</h3>
          <p className="text-xs text-slate-500">24/7 Priority booking hotline</p>
          <p className="text-sm font-bold text-blue-700 font-mono">+92 51 111 872 835</p>
          <p className="text-xs text-slate-400">Toll-free in Pakistan & UAE</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Email Concierge</h3>
          <p className="text-xs text-slate-500">Fast 15-minute response time</p>
          <p className="text-sm font-bold text-emerald-700 font-mono">concierge@travelverse.com</p>
          <p className="text-xs text-slate-400">For bookings & VIP bespoke requests</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Headquarters</h3>
          <p className="text-xs text-slate-500">Islamabad & Dubai Global Hubs</p>
          <p className="text-xs font-semibold text-slate-800">
            Level 14, Centaurus Executive Towers, Islamabad, Pakistan
          </p>
          <p className="text-xs text-slate-400">DIFC Gate Precinct 4, Dubai, UAE</p>
        </div>
      </div>

      {/* Main 2-Column: Inquiry Form & FAQs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 font-serif">Send Us a Direct Message</h2>
            <p className="text-xs text-slate-500">Submit ticket inquiries or request custom tour itineraries</p>
          </div>

          {submitted && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Thank you! Your inquiry has been routed to our senior travel desk. A representative will contact you shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Zainab Fatima"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Booking Reference (Optional)</label>
                <input
                  type="text"
                  value={bookingRef}
                  onChange={(e) => setBookingRef(e.target.value)}
                  placeholder="e.g. TV-FL-8921"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600 uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Topic</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600 bg-white"
                >
                  <option value="Flight Booking Inquiry">Flight Booking / Rescheduling</option>
                  <option value="Hotel Reservation">Hotel Reservation Assistance</option>
                  <option value="Bespoke Tour Package">Custom Bespoke Tour Package</option>
                  <option value="Corporate / Group Travel">Corporate & Group Travel</option>
                  <option value="Refund & Billing">Refund / Billing Request</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Message *</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your travel dates, preferred destination, or booking question..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </form>
        </div>

        {/* Right Column: FAQs */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 font-serif">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400">Quick answers to common booking & currency queries</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 transition-all cursor-pointer"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </div>
                {activeFaq === idx && (
                  <p className="text-xs text-slate-600 mt-2 pt-2 border-t border-slate-200 leading-relaxed animate-in fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}


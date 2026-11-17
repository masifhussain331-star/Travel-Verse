import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, ArrowLeft } from 'lucide-react';
import Badge from '../components/common/Badge';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>

      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <Badge variant="primary" size="sm">Legal Documentation</Badge>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif mt-2">
            Terms & Conditions of Service
          </h1>
          <p className="text-xs text-slate-400 mt-1">Effective Date: November 2026 · TRAVELVERSE Global Network</p>
        </div>

        <div className="space-y-6 text-xs text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing and using TRAVELVERSE, booking flights, hotels, vacation packages, or car rentals, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please refrain from using our booking services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">2. Currency & Pricing Integrity</h2>
            <p>
              The primary display currency of TRAVELVERSE is the Pakistani Rupee (PKR ₨). All supplier tariffs originated by partner airlines, hotel groups, or tour operators in USD, EUR, or other supplier currencies are converted at fair institutional exchange rates. Displayed rates reflect estimated converted amounts at the time of quotation. No hidden charges or unauthorized card surcharges are applied.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">3. Demonstration & Sandbox Bookings</h2>
            <p>
              To ensure customer comfort and enable functional testing of the platform, demo inventory items and simulated booking flows are clearly labeled with a [DEMO] badge. Demo transactions create valid simulation vouchers without debiting real bank accounts or creating non-refundable carrier liabilities.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">4. Cancellation & Refund Policies</h2>
            <p>
              Flight cancellations are governed by carrier fare rules. Bookings designated as "Refundable" may be cancelled within the designated notice window through the My Bookings portal. Refunds are calculated net of applicable airline administrative fees and returned to the original payment method within 5 to 7 business days.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">5. Passenger Documentation & Visas</h2>
            <p>
              Travelers are solely responsible for possessing valid passports (with at least 6 months remaining validity), required transit and entry visas, health declarations, and immigration clearances. TRAVELVERSE destination guides provide informational visa summaries but do not replace official consular advisories.
            </p>
          </section>
        </div>
      </div>

    </div>
  );
}


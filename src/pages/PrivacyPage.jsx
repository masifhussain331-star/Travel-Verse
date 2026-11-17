import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, ArrowLeft } from 'lucide-react';
import Badge from '../components/common/Badge';

export default function PrivacyPage() {
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
          <Badge variant="success" size="sm">Data Protection & Security</Badge>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif mt-2">
            Privacy & Data Security Policy
          </h1>
          <p className="text-xs text-slate-400 mt-1">Compliance: Global GDPR Standards & Electronic Transactions Ordinance</p>
        </div>

        <div className="space-y-6 text-xs text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">1. Information We Collect</h2>
            <p>
              We collect passenger details required to fulfill travel reservations, including legal names as shown on official passports, date of birth, contact email, telephone numbers, passport expiration dates, and special service dietary requests.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">2. Payment Security & Encryption</h2>
            <p>
              All payment transactions are encrypted using TLS 1.3 and 256-Bit SSL protocols. Full credit card numbers are never stored in plain text on our servers. Sensitive payment tokens are processed via PCI-DSS compliant payment gateways.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">3. Carrier & Hotel Manifest Transmission</h2>
            <p>
              Your personal information is shared strictly with confirmed travel service providers (airlines, hotels, transport operators) to issue verified airline tickets and secure hotel reservations. We do not sell your personal data to third-party marketing brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">4. Your Data Rights</h2>
            <p>
              You may request access to, correction of, or permanent deletion of your stored profile data at any time by accessing your User Dashboard or writing to concierge@travelverse.com.
            </p>
          </section>
        </div>
      </div>

    </div>
  );
}


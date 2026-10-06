import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function LegalPage({ type = 'terms' }) {
  const isPrivacy = type === 'privacy';

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900 font-serif">
          {isPrivacy ? 'Privacy & Data Protection Policy' : 'Terms of Use & RERA Disclaimers'}
        </h1>
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <h2 className="text-lg font-bold text-slate-900">1. RERA Compliance and Due Diligence</h2>
          <p>
            True Realty Venture is a technology-enabled real estate marketing platform operating in compliance with the Real Estate (Regulation and Development) Act, 2016. All project details, prices, and specifications are directly synchronized from developer filings and state RERA directories.
          </p>
          <h2 className="text-lg font-bold text-slate-900">2. Lead Handling & Privacy Protection</h2>
          <p>
            We respect client privacy. User information submitted via website CTAs, enquiry forms, and callback requests is strictly used to connect prospective buyers with verified developers and licensed real estate consultants. We never sell customer records to third-party telemarketers.
          </p>
          <h2 className="text-lg font-bold text-slate-900">3. Independent Verification Recommended</h2>
          <p>
            While True Realty Venture verifies builder credentials and RERA registrations, prospective buyers are urged to inspect title deeds, encumbrance certificates, and sanctioned layouts independently before making financial disbursements.
          </p>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Building2, ShieldCheck, Award, Users, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>About True Realty Venture</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-serif text-slate-900">
            Pioneering Transparent Indian Real Estate
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
            Empowering property purchasers, global investors, and corporate tenants with 100% verified titles, zero-brokerage new launches, and institutional-grade advisory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2 text-center">
            <div className="text-3xl font-black text-primary-700 font-serif">₹ 4,500+ Cr</div>
            <div className="font-bold text-sm text-slate-800">Gross Transaction Value</div>
            <p className="text-xs text-slate-500">Transacted across residential & commercial assets</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2 text-center">
            <div className="text-3xl font-black text-gold-500 font-serif">12,500+</div>
            <div className="font-bold text-sm text-slate-800">Delighted Homeowners</div>
            <p className="text-xs text-slate-500">Guided from shortlisting to key handover</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2 text-center">
            <div className="text-3xl font-black text-emerald-600 font-serif">100% RERA</div>
            <div className="font-bold text-sm text-slate-800">Zero Unregistered Inventory</div>
            <p className="text-xs text-slate-500">Rigorous legal due diligence on every project</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Our Founding Vision</h2>
          <p>
            Established to remove opacity from the Indian real estate market, True Realty Venture fuses cutting-edge technology with seasoned on-ground real estate consultants. We believe that purchasing a home or securing an investment property should be seamless, transparent, and joyful.
          </p>
          <p>
            We curate properties directly from authorized builders, verify state RERA approvals, carpet area ratios, and escrow bank accounts before listing them on our platform.
          </p>
        </div>
      </div>
    </div>
  );
}

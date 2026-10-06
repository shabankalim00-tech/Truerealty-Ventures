import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  PhoneCall,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      {/* Upper Info Row */}
      <div className="border-b border-slate-800/80 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-primary-900/60 border border-primary-500/20 flex items-center justify-center text-primary-400">
              <ShieldCheck className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">100% RERA Verified</h4>
              <p className="text-xs text-slate-500">Every project & builder vetted for title clearances</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-primary-900/60 border border-primary-500/20 flex items-center justify-center text-primary-400">
              <Award className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">Zero Buyer Commission</h4>
              <p className="text-xs text-slate-500">Direct developer pricing on all new launches</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-primary-900/60 border border-primary-500/20 flex items-center justify-center text-primary-400">
              <PhoneCall className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">Expert Advisory</h4>
              <p className="text-xs text-slate-500">Free site visit assistance & home loan desk</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-primary-900/60 border border-primary-500/20 flex items-center justify-center text-primary-400">
              <Building2 className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">30+ Top Developers</h4>
              <p className="text-xs text-slate-500">Authorized primary sales channel partner</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-5">
              <img
                src="/logo.jpg"
                alt="True Realty Venture"
                className="h-20 sm:h-24 w-auto object-contain rounded-2xl shadow-md ring-1 ring-slate-800 hover:opacity-95 transition"
              />
            </Link>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm mb-6">
              True Realty Venture is India's premier real estate consultancy and digital marketplace, dedicated to guiding homebuyers and investors toward verified, high-yielding residential and commercial properties.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-slate-300">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
                <span>10/502 Vipul Lavanya Sector 81 Gurugram 122004</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <PhoneCall className="w-4 h-4 text-gold-500 shrink-0" />
                <a href="tel:+919220805059" className="hover:text-gold-400 transition">
                  Mobile: +91 9220805059
                </a>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <a href="mailto:truerealtyventures@gmail.com" className="hover:text-gold-400 transition">
                  truerealtyventures@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 1: Properties */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Properties
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/properties?propertyType=Apartment" className="hover:text-white transition">Apartments & Flats</Link></li>
              <li><Link to="/properties?propertyType=Villa" className="hover:text-white transition">Luxury Villas</Link></li>
              <li><Link to="/properties?propertyType=Penthouse" className="hover:text-white transition">Sky Penthouses</Link></li>
              <li><Link to="/properties?propertyType=Builder+Floor" className="hover:text-white transition">Builder Floors</Link></li>
              <li><Link to="/properties?propertyType=Commercial+Office" className="hover:text-white transition">Commercial Offices</Link></li>
              <li><Link to="/properties?propertyType=Retail+Shop" className="hover:text-white transition">High-Street Retail</Link></li>
              <li><Link to="/properties?propertyType=Plot" className="hover:text-white transition">Residential Plots</Link></li>
            </ul>
          </div>

          {/* Column 2: Top Cities */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Popular Cities
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/city/gurgaon" className="hover:text-white transition">Properties in Gurgaon</Link></li>
              <li><Link to="/city/noida" className="hover:text-white transition">Properties in Noida</Link></li>
              <li><Link to="/city/delhi" className="hover:text-white transition">Properties in Delhi</Link></li>
              <li><Link to="/city/mumbai" className="hover:text-white transition">Properties in Mumbai</Link></li>
              <li><Link to="/city/bangalore" className="hover:text-white transition">Properties in Bangalore</Link></li>
              <li><Link to="/city/hyderabad" className="hover:text-white transition">Properties in Hyderabad</Link></li>
              <li><Link to="/city/pune" className="hover:text-white transition">Properties in Pune</Link></li>
            </ul>
          </div>

          {/* Column 3: Company & Resources */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link to="/properties" className="hover:text-white transition">Explore Properties</Link></li>
              <li><Link to="/projects" className="hover:text-white transition">New Project Launches</Link></li>
              <li><Link to="/developers" className="hover:text-white transition">Verified Builders</Link></li>
              <li><Link to="/blog" className="hover:text-white transition">Real Estate News & Tips</Link></li>
            </ul>
          </div>
        </div>

        {/* Legal & Disclaimers */}
        <div className="mt-12 pt-8 border-t border-slate-900 text-[11px] leading-relaxed text-slate-500">
          <p className="mb-3">
            <strong>RERA Disclaimer:</strong> True Realty Venture operates as an authorized digital real estate marketing platform and property consultant. We do not sell or represent unauthorized real estate developments. All project details, pricing, floor plans, and amenities are sourced from developer filings and official RERA portals. Prospective buyers are advised to independently inspect RERA certificates before making investment commitments.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-slate-900 text-xs">
            <p>&copy; {new Date().getFullYear()} True Realty Venture Pvt Ltd. All rights reserved.</p>
            <div className="flex space-x-6 mt-3 sm:mt-0">
              <Link to="/privacy-policy" className="hover:text-slate-300">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-slate-300">Terms of Use</Link>
              <Link to="/disclaimer" className="hover:text-slate-300">Disclaimer</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

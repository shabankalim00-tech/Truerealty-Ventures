import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Building2,
  Building,
  Home,
  Layers,
  Sparkles,
  ShieldCheck,
  Award,
  Users,
  Compass,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  MapPin,
  Calendar,
  Briefcase,
  Store,
  Warehouse,
  Trees,
} from 'lucide-react';
import SearchBox from '../components/home/SearchBox';
import PropertyCard from '../components/cards/PropertyCard';
import ProjectCard from '../components/cards/ProjectCard';
import LeadModal from '../components/common/LeadModal';
import api from '../services/api';

const CATEGORIES = [
  { name: 'Apartments', type: 'Apartment', icon: Building2, count: '140+ Listings' },
  { name: 'Luxury Villas', type: 'Villa', icon: Home, count: '45+ Listings' },
  { name: 'Builder Floors', type: 'Builder Floor', icon: Layers, count: '60+ Listings' },
  { name: 'Penthouses', type: 'Penthouse', icon: Sparkles, count: '25+ Listings' },
  { name: 'Commercial Offices', type: 'Commercial Office', icon: Briefcase, count: '35+ Listings' },
  { name: 'Retail Shops', type: 'Retail Shop', icon: Store, count: '30+ Listings' },
  { name: 'Residential Plots', type: 'Plot', icon: Compass, count: '50+ Listings' },
  { name: 'Farmhouses', type: 'Farmhouse', icon: Trees, count: '20+ Listings' },
];

export default function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [newProjects, setNewProjects] = useState([]);
  const [popularCities, setPopularCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const handler = (e) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  useEffect(() => {
    if (videoRef.current && !prefersReducedMotion && !videoFailed) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Hero video autoplay play() failed or deferred:', err);
        });
      }
    }
  }, [prefersReducedMotion, videoFailed]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const [propsRes, prjsRes, citiesRes] = await Promise.all([
          api.get('/properties?featured=true&limit=6'),
          api.get('/projects?featured=true&limit=6'),
          api.get('/cities?popular=true'),
        ]);

        if (propsRes.success) setFeaturedProperties(propsRes.data.properties || []);
        if (prjsRes.success) setNewProjects(prjsRes.data.projects || []);
        if (citiesRes.success) setPopularCities(citiesRes.data.cities || []);
      } catch (err) {
        console.error('Error fetching homepage data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const handleEnquire = (property) => {
    setSelectedProperty(property);
    setLeadModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative isolate min-h-[580px] lg:min-h-[660px] flex items-center justify-center bg-slate-950 text-white overflow-hidden py-16 px-4">
        {/* Background Video / Static Fallback */}
        {prefersReducedMotion || videoFailed ? (
          <img
            src="/videos/hero-poster.jpg"
            alt="True Realty Venture Luxury Real Estate & Premium Villas"
            className="absolute inset-0 z-0 h-full w-full object-cover object-center"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/videos/hero-poster.jpg"
            onError={() => {
              console.warn('Hero video failed to load, falling back to static poster');
              setVideoFailed(true);
            }}
            className="absolute inset-0 z-0 h-full w-full object-cover object-center"
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
            <source src="/videos/hero-background-720p.mp4" type="video/mp4" />
          </video>
        )}

        {/* Cinematic gradient overlay for contrast and readability */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-slate-950/40" />

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto w-full text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-gold-400 text-xs font-semibold backdrop-blur-md shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Over 300+ Verified RERA Properties & 100+ Projects</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-serif tracking-tight max-w-4xl mx-auto leading-tight drop-shadow-md">
            Find a Place You'll <span className="text-gold-400 italic">Love</span> to Call Home
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-light drop-shadow-sm">
            Discover verified properties, new projects and trusted real-estate opportunities across India's premier micro-markets.
          </p>

          {/* Search Box Component */}
          <div className="pt-4">
            <SearchBox cities={popularCities} />
          </div>
        </div>
      </section>

      {/* 2. PROPERTY CATEGORIES */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary-700">
              Browse by Asset Class
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif mt-1">
              Explore Property Categories
            </h2>
          </div>
          <Link
            to="/properties"
            className="mt-3 md:mt-0 inline-flex items-center text-xs font-bold text-primary-700 hover:text-primary-800"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                to={`/properties?propertyType=${encodeURIComponent(cat.type)}`}
                className="group bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-primary-500/40 transition text-center flex flex-col items-center justify-center space-y-2"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-700 group-hover:bg-primary-700 group-hover:text-white flex items-center justify-center transition">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="font-bold text-xs text-slate-900 group-hover:text-primary-700 transition">
                  {cat.name}
                </div>
                <div className="text-[10px] text-slate-400 font-medium">{cat.count}</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-700">
                Handpicked Collections
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif mt-1">
                Featured Verified Properties
              </h2>
            </div>
            <Link
              to="/properties"
              className="mt-3 md:mt-0 inline-flex items-center text-xs font-bold text-primary-700 hover:text-primary-800"
            >
              <span>Explore All 300+ Properties</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProperties.map((prop) => (
              <PropertyCard
                key={prop._id}
                property={prop}
                onEnquireClick={handleEnquire}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. POPULAR LOCATIONS */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
              Prime Indian Real Estate Corridors
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-serif mt-1">
              Explore Popular Cities
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Browse price trends, verified projects, and top residential addresses across India.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {popularCities.map((city) => (
              <Link
                key={city._id || city.slug}
                to={`/city/${city.slug}`}
                className="group relative h-40 rounded-2xl overflow-hidden border border-slate-800 shadow-md hover:border-gold-500/60 transition"
              >
                <img
                  src={city.image || 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400'}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 property-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-transparent p-4 flex flex-col justify-end">
                  <h3 className="text-base font-bold text-white group-hover:text-gold-400 transition">
                    {city.name}
                  </h3>
                  <span className="text-[11px] text-slate-300 font-medium">
                    Avg ₹{city.averagePricePerSqFt?.toLocaleString('en-IN')}/sq.ft
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/cities"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition"
            >
              <span>Explore All 20 Major Cities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>


      {/* 7. TRUST SECTION */}
      <section className="py-16 bg-slate-100/70 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-700">
              The True Realty Venture Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif mt-1">
              Why Discerning Buyers Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Verified Properties</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Every title and document checked against legal parameters and official RERA records.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Trusted Developers</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Direct partnerships with Tier-1 builders guaranteeing transparent execution and timely possession.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Expert Assistance</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dedicated real estate consultants offering personalized unit shortlisting and price negotiations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Secure Enquiries</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Direct communication without middleman leaks or intrusive spam callers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Site Visit Assistance</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Complimentary guided chauffeur site visits and model apartment walkthroughs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL HIGH-CONVERTING CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-900 via-primary-800 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black font-serif">
            Looking for Your Next Property?
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto font-light">
            Connect with our certified property advisors for unlisted inventory, bespoke payment plans, and priority launch allotments.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/properties"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gold-400 hover:bg-gold-500 text-slate-950 shadow-xl transition"
            >
              Explore Properties
            </Link>
            <button
              onClick={() => {
                setSelectedProperty(null);
                setLeadModalOpen(true);
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/10 hover:bg-white/20 border border-white/20 text-white transition backdrop-blur-md"
            >
              Talk to an Expert
            </button>
          </div>
        </div>
      </section>

      {/* Global Lead Modal */}
      <LeadModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        title={selectedProperty ? `Enquire About ${selectedProperty.title}` : 'Talk to a Real Estate Specialist'}
        propertyId={selectedProperty?._id}
      />
    </div>
  );
}

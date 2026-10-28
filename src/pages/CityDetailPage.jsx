import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  TrendingUp,
  Building,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Search,
} from 'lucide-react';
import PropertyCard from '../components/cards/PropertyCard';
import ProjectCard from '../components/cards/ProjectCard';
import DeveloperCard from '../components/cards/DeveloperCard';
import api from '../services/api';

export default function CityDetailPage() {
  const { citySlug } = useParams();
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/cities/${citySlug}`);
        if (res.success) {
          setCityData(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCity();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [citySlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!cityData || !cityData.city) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800">City Not Found</h2>
        <Link to="/cities" className="mt-4 text-primary-600 font-bold hover:underline">
          Browse All Cities
        </Link>
      </div>
    );
  }

  const { city, localities, properties, projects, developers } = cityData;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* City Hero */}
      <div className="relative min-h-[380px] flex items-end bg-slate-950 text-white overflow-hidden py-12">
        <img
          src={city.image || 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200'}
          alt={city.name}
          className="absolute inset-0 w-full h-full object-cover opacity-65 property-image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gold-400">
            <span>{city.state}, India</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-serif text-white">
            Properties in {city.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-light">
            {city.description}
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-200">
            <span className="bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700">
              Avg Rate: ₹{city.averagePricePerSqFt?.toLocaleString('en-IN')}/sq.ft
            </span>
            <span className="bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700">
              Growth: {city.priceTrends?.growthRate || '+8.4% YoY'}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Popular Localities Section */}
        {localities && localities.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-serif">
              Popular Localities in {city.name}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {localities.map((loc) => (
                <Link
                  key={loc._id}
                  to={`/location/${city.slug}/${loc.slug}`}
                  className="p-3.5 rounded-xl bg-slate-50 hover:bg-primary-50 border border-slate-100 hover:border-primary-200 transition group flex flex-col justify-between"
                >
                  <span className="font-bold text-xs text-slate-800 group-hover:text-primary-700">
                    {loc.name}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1">
                    Avg ₹{loc.priceRange?.avgPerSqFt?.toLocaleString('en-IN')}/sq.ft
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Featured Properties in this City */}
        {properties && properties.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900 font-serif">
                Featured Properties in {city.name}
              </h2>
              <Link
                to={`/properties?city=${city.slug}`}
                className="text-xs font-bold text-primary-700 hover:text-primary-800 flex items-center"
              >
                <span>View All in {city.name}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((prop) => (
                <PropertyCard key={prop._id} property={prop} />
              ))}
            </div>
          </div>
        )}

        {/* Featured Projects in this City */}
        {projects && projects.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900 font-serif">
                New Project Launches in {city.name}
              </h2>
              <Link
                to={`/projects?city=${city.slug}`}
                className="text-xs font-bold text-primary-700 hover:text-primary-800 flex items-center"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((prj) => (
                <ProjectCard key={prj._id} project={prj} />
              ))}
            </div>
          </div>
        )}

        {/* Active Developers in this City */}
        {developers && developers.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 font-serif">
              Top Builders in {city.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {developers.map((dev) => (
                <DeveloperCard key={dev._id} developer={dev} />
              ))}
            </div>
          </div>
        )}

        {/* FAQs */}
        {city.faqs && city.faqs.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 font-serif flex items-center">
              <HelpCircle className="w-5 h-5 text-primary-600 mr-2" />
              Frequently Asked Questions About {city.name} Real Estate
            </h2>
            <div className="space-y-3 pt-2">
              {city.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">{faq.question}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

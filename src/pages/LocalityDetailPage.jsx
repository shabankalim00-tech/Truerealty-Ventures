import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, CheckCircle2, Building, ArrowRight, HelpCircle } from 'lucide-react';
import PropertyCard from '../components/cards/PropertyCard';
import ProjectCard from '../components/cards/ProjectCard';
import api from '../services/api';
import { formatPrice } from '../utils/formatters';

export default function LocalityDetailPage() {
  const { citySlug, localitySlug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocality = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/locations/${citySlug}/${localitySlug}`);
        if (res.success) {
          setData(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLocality();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [citySlug, localitySlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data || !data.locality) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Locality Not Found</h2>
        <Link to="/cities" className="mt-4 text-primary-600 font-bold hover:underline">
          Browse Cities
        </Link>
      </div>
    );
  }

  const { city, locality, properties, projects } = data;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex items-center space-x-2 text-xs text-gold-400">
            <Link to={`/city/${city.slug}`} className="hover:underline">
              {city.name}
            </Link>
            <span>/</span>
            <span>Locality Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-serif">
            Properties & Projects in {locality.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-light">
            {locality.description}
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-200 pt-2">
            <span className="bg-slate-800 px-3 py-1 rounded-lg">
              Price Range: {formatPrice(locality.priceRange?.min)} - {formatPrice(locality.priceRange?.max)}
            </span>
            <span className="bg-slate-800 px-3 py-1 rounded-lg">
              Avg Rate: ₹{locality.priceRange?.avgPerSqFt?.toLocaleString('en-IN')}/sq.ft
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Connectivity & Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-slate-900">Connectivity Highlights</h3>
            <div className="space-y-2">
              {locality.connectivity?.map((c, i) => (
                <div key={i} className="flex items-center space-x-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-slate-900">Social Infrastructure</h3>
            <div className="space-y-2">
              {locality.amenities?.map((a, i) => (
                <div key={i} className="flex items-center space-x-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-primary-600 shrink-0" />
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Properties */}
        {properties.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 font-serif">
              Properties for Sale in {locality.name} ({properties.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((prop) => (
                <PropertyCard key={prop._id} property={prop} />
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 font-serif">
              New Projects in {locality.name} ({projects.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((prj) => (
                <ProjectCard key={prj._id} project={prj} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

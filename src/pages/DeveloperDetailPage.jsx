import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Building2,
  Star,
  MapPin,
  Calendar,
  Globe,
  Mail,
  Phone,
  ShieldCheck,
  Award,
} from 'lucide-react';
import PropertyCard from '../components/cards/PropertyCard';
import ProjectCard from '../components/cards/ProjectCard';
import api from '../services/api';

export default function DeveloperDetailPage() {
  const { slug } = useParams();
  const [developer, setDeveloper] = useState(null);
  const [projects, setProjects] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/developers/${slug}`);
        if (res.success && res.data.developer) {
          setDeveloper(res.data.developer);
          setProjects(res.data.projects || []);
          setProperties(res.data.properties || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDeveloper();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!developer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Developer Profile Not Found</h2>
        <Link to="/developers" className="mt-4 text-primary-600 font-bold hover:underline">
          Browse All Developers
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Developer Header Profile Card */}
      <div className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src={developer.logo || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300'}
              alt={developer.name}
              className="w-28 h-28 rounded-2xl object-cover border-2 border-slate-700 shadow-xl"
            />
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h1 className="text-3xl sm:text-4xl font-black font-serif">{developer.name}</h1>
                {developer.verified && (
                  <span className="inline-flex items-center text-xs font-bold bg-emerald-600 text-white px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified Partner
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-300">
                <span className="flex items-center">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400 mr-1" />
                  <strong>{developer.rating || 4.8}</strong> / 5.0 Rating
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 text-primary-400 mr-1" />
                  Est. {developer.establishedYear || 1998}
                </span>
                <span className="flex items-center">
                  <Award className="w-4 h-4 text-gold-400 mr-1" />
                  {developer.totalDeliveredSqFt || '15M+ Sq.Ft. Delivered'}
                </span>
              </div>

              {developer.locations && (
                <div className="flex items-center justify-center md:justify-start text-xs text-slate-400 pt-1">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  <span>Operating in: {developer.locations.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* About Company */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 font-serif">About {developer.name}</h2>
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
            {developer.description}
          </p>
        </div>

        {/* Projects By This Developer */}
        {projects.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 font-serif">
              Projects by {developer.name} ({projects.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((prj) => (
                <ProjectCard key={prj._id} project={prj} />
              ))}
            </div>
          </div>
        )}

        {/* Properties By This Developer */}
        {properties.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 font-serif">
              Available Units for Sale ({properties.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((prop) => (
                <PropertyCard key={prop._id} property={prop} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

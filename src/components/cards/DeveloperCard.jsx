import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Star, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export default function DeveloperCard({ developer }) {
  if (!developer) return null;

  return (
    <div className="group bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={developer.logo || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200'}
            alt={developer.name}
            className="w-14 h-14 rounded-xl object-cover border border-slate-200 group-hover:scale-105 transition"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1.5">
              <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-700 transition truncate">
                {developer.name}
              </h3>
              {developer.verified && (
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" title="Verified Developer" />
              )}
            </div>
            <div className="flex items-center text-xs text-slate-500 mt-0.5">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 mr-1 shrink-0" />
              <span className="font-semibold text-slate-800">{developer.rating || 4.8}</span>
              <span className="mx-1 text-slate-300">•</span>
              <span>Est. {developer.establishedYear || 1998}</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {developer.description}
        </p>

        <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl text-xs mb-4">
          <div>
            <span className="text-slate-400 block text-[11px]">Projects:</span>
            <span className="font-bold text-slate-900">{developer.projectsCount || 12}+ Active</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Delivered:</span>
            <span className="font-bold text-slate-900">{developer.totalDeliveredSqFt || '10M+ Sq.Ft.'}</span>
          </div>
        </div>

        {developer.locations && developer.locations.length > 0 && (
          <div className="flex items-center text-xs text-slate-500 mb-4">
            <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
            <span className="truncate">{developer.locations.join(', ')}</span>
          </div>
        )}
      </div>

      <Link
        to={`/developer/${developer.slug}`}
        className="flex items-center justify-center space-x-1.5 py-2.5 px-4 text-xs font-bold text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-xl transition"
      >
        <span>View Developer Projects</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

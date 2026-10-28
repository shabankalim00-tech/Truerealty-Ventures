import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Building, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

export default function ProjectCard({ project }) {
  if (!project) return null;

  const image =
    project.images && project.images.length > 0
      ? project.images[0]
      : 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Project Visual */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <Link to={`/project/${project.slug}`}>
            <img
              src={image}
              alt={project.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 property-image"
              loading="lazy"
            />
          </Link>

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
            {project.featured && (
              <span className="inline-flex items-center text-[10px] font-black uppercase tracking-wider bg-gold-500 text-slate-950 px-2.5 py-1 rounded-md shadow-sm">
                <Sparkles className="w-3 h-3 mr-1" /> New Launch
              </span>
            )}
            <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-2.5 py-1 rounded-md shadow-sm">
              <ShieldCheck className="w-3 h-3 mr-1" /> RERA
            </span>
          </div>

          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-3 pt-5 flex justify-between items-end">
            <div>
              <span className="text-[11px] font-medium text-slate-300">Starting From</span>
              <div className="text-xl font-extrabold text-white font-serif">
                {formatPrice(project.priceMin)} - {formatPrice(project.priceMax)}
              </div>
            </div>
            {(project.pricePerSqFtDisplay || project.pricePerSqFt) && (
              <span className="text-[10px] font-bold text-gold-300 bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded-md border border-gold-500/30 shrink-0">
                {project.pricePerSqFtDisplay || `₹${project.pricePerSqFt.toLocaleString('en-IN')}/sq.ft`}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center space-x-2 text-[11px] font-bold text-primary-700 uppercase tracking-wider mb-1 truncate">
            <Building className="w-3 h-3 shrink-0" />
            <span>{project.developer?.name || 'Premier Builder'}</span>
          </div>

          <Link to={`/project/${project.slug}`}>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-700 transition line-clamp-1 mb-1.5">
              {project.name}
            </h3>
          </Link>

          <div className="flex items-center text-xs text-slate-500 mb-3.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
            <span className="truncate">
              {project.locality?.name ? `${project.locality.name}, ` : ''}
              {project.city?.name || 'NCR'}
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
            {project.sizeRange && (
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Sizes (Sq.Ft):</span>
                <span className="font-semibold text-slate-800">{project.sizeRange}</span>
              </div>
            )}
            {(project.pricePerSqFtDisplay || project.pricePerSqFt) && (
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Rate / Sq.Ft:</span>
                <span className="font-bold text-primary-700">
                  {project.pricePerSqFtDisplay || `₹${project.pricePerSqFt.toLocaleString('en-IN')} / sq.ft`}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Configurations:</span>
              <span className="font-semibold text-slate-800">
                {project.configurations?.join(', ') || '2, 3, 4 BHK'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Possession:</span>
              <span className="font-semibold text-emerald-700 flex items-center">
                <Calendar className="w-3 h-3 mr-1" /> {project.possession}
              </span>
            </div>
            {project.reraNumber && (
              <div className="flex justify-between items-center">
                <span className="text-slate-400">RERA No:</span>
                <span className="font-mono text-[11px] text-slate-700 truncate max-w-[150px]">
                  {project.reraNumber}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5 pt-0">
        <Link
          to={`/project/${project.slug}`}
          className="w-full flex items-center justify-center space-x-1.5 py-2.5 px-4 text-xs font-bold text-white bg-primary-700 hover:bg-primary-800 rounded-xl transition shadow-sm"
        >
          <span>View Project Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

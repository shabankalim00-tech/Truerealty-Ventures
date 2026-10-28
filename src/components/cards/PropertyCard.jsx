import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  ShieldCheck,
  CheckCircle2,
  Scale,
  Sparkles,
  PhoneCall,
} from 'lucide-react';
import { formatPrice, formatArea } from '../../utils/formatters';
import { useCompare } from '../../context/CompareContext';
import api from '../../services/api';

export default function PropertyCard({ property, onEnquireClick }) {
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!property) return null;

  const inCompare = isInCompare(property._id);

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setSaving(true);
      if (isSaved) {
        await api.delete(`/favorites/${property._id}`);
        setIsSaved(false);
      } else {
        await api.post('/favorites', { propertyId: property._id });
        setIsSaved(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleCompareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(property._id);
    } else {
      const res = addToCompare(property);
      if (!res.success) {
        alert(res.message);
      }
    }
  };

  const primaryImage =
    property.images && property.images.length > 0
      ? property.images[0]
      : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Top Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <Link to={`/properties/${property.slug}`}>
            <img
              src={primaryImage}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 property-image"
              loading="lazy"
            />
          </Link>

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
            {property.featured && (
              <span className="inline-flex items-center text-[10px] font-black uppercase tracking-wider bg-gold-500 text-slate-950 px-2.5 py-1 rounded-md shadow-sm">
                <Sparkles className="w-3 h-3 mr-1" /> Featured
              </span>
            )}
            {property.verified && (
              <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-2.5 py-1 rounded-md shadow-sm">
                <ShieldCheck className="w-3 h-3 mr-1" /> Verified RERA
              </span>
            )}
            <span className="inline-flex items-center text-[10px] font-semibold bg-slate-900/80 backdrop-blur-sm text-white px-2 py-1 rounded-md">
              {property.propertyType}
            </span>
          </div>

          {/* Action Buttons Top Right */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              onClick={handleFavoriteClick}
              disabled={saving}
              className={`p-2 rounded-full backdrop-blur-md shadow-md transition ${
                isSaved
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/90 text-slate-700 hover:text-rose-500 hover:bg-white'
              }`}
              title={isSaved ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleCompareClick}
              className={`p-2 rounded-full backdrop-blur-md shadow-md transition ${
                inCompare
                  ? 'bg-primary-600 text-white'
                  : 'bg-white/90 text-slate-700 hover:text-primary-600 hover:bg-white'
              }`}
              title={inCompare ? 'Remove from comparison' : 'Add to comparison'}
            >
              <Scale className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Gradient with Price Tag */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent p-3 pt-5 flex justify-between items-end">
            <div>
              <span className="text-[11px] font-medium text-slate-300">
                {property.transactionType === 'Rent' ? 'Rent Price' : 'Total Price'}
              </span>
              <div className="text-xl font-extrabold text-white font-serif">
                {formatPrice(property.price, property.transactionType)}
              </div>
            </div>
            {property.pricePerSqFt > 0 && property.transactionType !== 'Rent' && (
              <span className="text-[11px] font-semibold text-gold-400 bg-slate-900/60 px-2 py-0.5 rounded">
                ₹{property.pricePerSqFt.toLocaleString('en-IN')}/sq.ft
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5">
          {/* Developer / Project Tag */}
          {property.developer?.name && (
            <div className="text-[11px] font-bold text-primary-700 uppercase tracking-wider mb-1 truncate">
              {property.developer.name}
            </div>
          )}

          {/* Title */}
          <Link to={`/properties/${property.slug}`}>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-700 transition line-clamp-1 mb-1.5">
              {property.title}
            </h3>
          </Link>

          {/* Location */}
          <div className="flex items-center text-xs text-slate-500 mb-3.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
            <span className="truncate">
              {property.locality?.name ? `${property.locality.name}, ` : ''}
              {property.city?.name || 'NCR'}
            </span>
          </div>

          {/* Key Specs Bar */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
            {property.bedrooms > 0 ? (
              <div className="flex items-center space-x-1.5">
                <Bed className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                <span className="font-semibold">{property.bedrooms} BHK</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1.5">
                <span className="font-semibold text-slate-500">Commercial</span>
              </div>
            )}

            <div className="flex items-center space-x-1.5">
              <Bath className="w-3.5 h-3.5 text-primary-600 shrink-0" />
              <span className="font-semibold">{property.bathrooms || 1} Baths</span>
            </div>

            <div className="flex items-center space-x-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-primary-600 shrink-0" />
              <span className="font-semibold truncate">{formatArea(property.area)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Actions Bottom */}
      <div className="p-4 sm:p-5 pt-0 flex items-center gap-2 border-t border-slate-100 mt-2">
        <Link
          to={`/properties/${property.slug}`}
          className="flex-1 py-2 px-3 text-center text-xs font-bold text-primary-800 bg-primary-50 hover:bg-primary-100 rounded-lg transition"
        >
          View Details
        </Link>
        <button
          onClick={() => {
            if (onEnquireClick) onEnquireClick(property);
            else window.location.href = `/properties/${property.slug}#enquire`;
          }}
          className="flex-1 py-2 px-3 text-center text-xs font-bold text-slate-900 bg-gold-400 hover:bg-gold-500 rounded-lg transition shadow-sm"
        >
          Enquire Now
        </button>
      </div>
    </div>
  );
}

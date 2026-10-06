import React from 'react';
import {
  Filter,
  RotateCcw,
  Check,
  Building2,
  Home,
  IndianRupee,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const PROPERTY_TYPES = [
  'Apartment',
  'Villa',
  'Builder Floor',
  'Penthouse',
  'Commercial Office',
  'Retail Shop',
  'Plot',
  'Farmhouse',
];

const BEDROOMS = ['1', '2', '3', '4+'];

const FURNISHING_TYPES = ['Furnished', 'Semi-Furnished', 'Unfurnished'];

const POSSESSION_TYPES = ['Ready to Move', 'Under Construction', 'Immediate'];

const AMENITIES_LIST = [
  'Clubhouse',
  'Swimming Pool',
  'Gymnasium',
  '24x7 Security',
  'Power Backup',
  'Reserved Parking',
  'Lift',
  'Children Play Area',
];

export default function FilterPanel({
  filters,
  onChange,
  onReset,
  cities = [],
  totalResults = 0,
}) {
  const handleTypeToggle = (type) => {
    let current = filters.propertyType ? filters.propertyType.split(',') : [];
    if (current.includes(type)) {
      current = current.filter((t) => t !== type);
    } else {
      current.push(type);
    }
    onChange('propertyType', current.join(','));
  };

  const handleAmenityToggle = (amenity) => {
    let current = filters.amenities ? filters.amenities.split(',') : [];
    if (current.includes(amenity)) {
      current = current.filter((a) => a !== amenity);
    } else {
      current.push(amenity);
    }
    onChange('amenities', current.join(','));
  };

  const activeTypes = filters.propertyType ? filters.propertyType.split(',') : [];
  const activeAmenities = filters.amenities ? filters.amenities.split(',') : [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-primary-600" />
          <h3 className="font-bold text-slate-900 text-sm">Filters</h3>
          <span className="text-[11px] font-semibold bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full">
            {totalResults} results
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-slate-500 hover:text-rose-600 flex items-center transition"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset
        </button>
      </div>

      {/* Transaction Type Tab */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
          Transaction Type
        </label>
        <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
          {['Buy', 'Rent'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onChange('transactionType', t)}
              className={`py-2 text-xs font-bold rounded-lg transition ${
                (filters.transactionType || 'Buy').toLowerCase() === t.toLowerCase()
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* City */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
          City / Location
        </label>
        <select
          value={filters.city || ''}
          onChange={(e) => onChange('city', e.target.value)}
          className="w-full text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none"
        >
          <option value="">All Cities</option>
          {cities.map((c) => (
            <option key={c._id || c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Bedrooms (BHK) */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
          Bedrooms (BHK)
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {BEDROOMS.map((bhk) => {
            const isSelected = filters.bedrooms === bhk.replace('+', '');
            return (
              <button
                key={bhk}
                type="button"
                onClick={() => onChange('bedrooms', isSelected ? '' : bhk.replace('+', ''))}
                className={`py-2 text-xs font-bold rounded-xl border transition ${
                  isSelected
                    ? 'bg-primary-700 text-white border-primary-700'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {bhk} BHK
              </button>
            );
          })}
        </div>
      </div>

      {/* Property Types Checkboxes */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
          Property Type
        </label>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {PROPERTY_TYPES.map((type) => {
            const isChecked = activeTypes.includes(type);
            return (
              <label
                key={type}
                className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer hover:text-slate-900"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleTypeToggle(type)}
                  className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4 border-slate-300"
                />
                <span>{type}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
          Price Range (₹)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice || ''}
            onChange={(e) => onChange('minPrice', e.target.value)}
            className="w-full text-xs border border-slate-300 rounded-xl px-2.5 py-2"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice || ''}
            onChange={(e) => onChange('maxPrice', e.target.value)}
            className="w-full text-xs border border-slate-300 rounded-xl px-2.5 py-2"
          />
        </div>
      </div>

      {/* Furnishing */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
          Furnishing
        </label>
        <select
          value={filters.furnishing || ''}
          onChange={(e) => onChange('furnishing', e.target.value)}
          className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2"
        >
          <option value="">Any Furnishing</option>
          {FURNISHING_TYPES.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Possession */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
          Possession Status
        </label>
        <select
          value={filters.possession || ''}
          onChange={(e) => onChange('possession', e.target.value)}
          className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2"
        >
          <option value="">Any Possession</option>
          {POSSESSION_TYPES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Amenities */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
          Amenities
        </label>
        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
          {AMENITIES_LIST.map((amenity) => {
            const isChecked = activeAmenities.includes(amenity);
            return (
              <label
                key={amenity}
                className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4 border-slate-300"
                />
                <span>{amenity}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Verified RERA only toggle */}
      <div className="pt-2 border-t border-slate-100">
        <label className="flex items-center justify-between text-xs font-semibold text-slate-800 cursor-pointer">
          <span className="flex items-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1.5" />
            Verified RERA Properties Only
          </span>
          <input
            type="checkbox"
            checked={filters.rera === 'true' || filters.rera === true}
            onChange={(e) => onChange('rera', e.target.checked ? 'true' : '')}
            className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 border-slate-300"
          />
        </label>
      </div>
    </div>
  );
}

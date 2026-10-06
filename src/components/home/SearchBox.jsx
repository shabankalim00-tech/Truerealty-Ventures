import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, IndianRupee, Layers, Sparkles } from 'lucide-react';

const PROPERTY_TYPES = [
  'All Types',
  'Apartment',
  'Villa',
  'Builder Floor',
  'Penthouse',
  'Commercial Office',
  'Retail Shop',
  'Plot',
];

const BUDGET_OPTIONS = [
  { label: 'Any Budget', min: '', max: '' },
  { label: 'Under ₹ 50 Lacs', min: '0', max: '5000000' },
  { label: '₹ 50 Lacs - ₹ 1 Cr', min: '5000000', max: '10000000' },
  { label: '₹ 1 Cr - ₹ 2.5 Cr', min: '10000000', max: '25000000' },
  { label: '₹ 2.5 Cr - ₹ 5 Cr', min: '25000000', max: '50000000' },
  { label: '₹ 5 Cr + (Ultra Luxury)', min: '50000000', max: '' },
];

const BEDROOM_OPTIONS = ['Any BHK', '1 BHK', '2 BHK', '3 BHK', '4+ BHK'];

export default function SearchBox({ cities = [] }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Buy'); // Buy, Rent, Commercial, New Projects
  const [city, setCity] = useState('');
  const [propertyType, setPropertyType] = useState('All Types');
  const [budgetIndex, setBudgetIndex] = useState(0);
  const [bedrooms, setBedrooms] = useState('Any BHK');

  const handleSearch = (e) => {
    e.preventDefault();

    if (activeTab === 'New Projects') {
      const params = new URLSearchParams();
      if (city) params.set('city', city);
      const budget = BUDGET_OPTIONS[budgetIndex];
      if (budget.min) params.set('minPrice', budget.min);
      if (budget.max) params.set('maxPrice', budget.max);
      navigate(`/projects?${params.toString()}`);
      return;
    }

    const params = new URLSearchParams();
    if (activeTab === 'Rent') {
      params.set('transactionType', 'Rent');
    } else {
      params.set('transactionType', 'Buy');
    }

    if (activeTab === 'Commercial') {
      params.set('propertyType', 'Commercial Office,Retail Shop');
    } else if (propertyType !== 'All Types') {
      params.set('propertyType', propertyType);
    }

    if (city) params.set('city', city);

    const budget = BUDGET_OPTIONS[budgetIndex];
    if (budget.min) params.set('minPrice', budget.min);
    if (budget.max) params.set('maxPrice', budget.max);

    if (bedrooms !== 'Any BHK') {
      const bNum = bedrooms.split(' ')[0].replace('+', '');
      params.set('bedrooms', bNum);
    }

    navigate(`/properties?${params.toString()}`);
  };

  const handlePopularSearchClick = (url) => {
    navigate(url);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Category Tabs */}
      <div className="flex items-center space-x-1 sm:space-x-2 bg-slate-950/80 p-1.5 rounded-t-2xl w-fit backdrop-blur-md border-t border-x border-slate-700/60">
        {['Buy', 'Rent', 'Commercial', 'New Projects'].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
              activeTab === tab
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Filter Form Box */}
      <div className="bg-white rounded-b-2xl rounded-tr-2xl sm:rounded-tr-2xl p-4 sm:p-6 shadow-2xl border border-slate-200/80">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Location Field */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center">
              <MapPin className="w-3.5 h-3.5 text-primary-600 mr-1" /> Location / City
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Major Cities</option>
              {cities.map((c) => (
                <option key={c._id || c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Property Type Field */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center">
              <Home className="w-3.5 h-3.5 text-primary-600 mr-1" /> Property Type
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              disabled={activeTab === 'Commercial'}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60"
            >
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Range Field */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center">
              <IndianRupee className="w-3.5 h-3.5 text-primary-600 mr-1" /> Budget
            </label>
            <select
              value={budgetIndex}
              onChange={(e) => setBudgetIndex(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {BUDGET_OPTIONS.map((b, idx) => (
                <option key={idx} value={idx}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>

          {/* Bedrooms / Search Button Combo */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center">
              <Layers className="w-3.5 h-3.5 text-primary-600 mr-1" /> Bedrooms
            </label>
            <div className="flex gap-2">
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                disabled={activeTab === 'Commercial'}
                className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60"
              >
                {BEDROOM_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="w-1/2 bg-primary-700 hover:bg-primary-800 text-white font-bold px-4 py-2.5 rounded-xl flex items-center justify-center space-x-1.5 shadow-md transition"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </form>

        {/* Popular Searches */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-slate-600 flex items-center">
            <Sparkles className="w-3.5 h-3.5 text-gold-500 mr-1" /> Popular Searches:
          </span>
          <button
            onClick={() => handlePopularSearchClick('/properties?city=gurgaon&bedrooms=2')}
            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-primary-50 text-slate-700 hover:text-primary-700 transition"
          >
            2 BHK in Gurgaon
          </button>
          <button
            onClick={() => handlePopularSearchClick('/properties?city=noida&propertyType=Apartment')}
            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-primary-50 text-slate-700 hover:text-primary-700 transition"
          >
            Luxury Apartments in Noida
          </button>
          <button
            onClick={() => handlePopularSearchClick('/projects?city=delhi')}
            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-primary-50 text-slate-700 hover:text-primary-700 transition"
          >
            New Projects in Delhi
          </button>
          <button
            onClick={() => handlePopularSearchClick('/properties?city=gurgaon&propertyType=Commercial+Office')}
            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-primary-50 text-slate-700 hover:text-primary-700 transition"
          >
            Commercial Property in Gurgaon
          </button>
        </div>
      </div>
    </div>
  );
}

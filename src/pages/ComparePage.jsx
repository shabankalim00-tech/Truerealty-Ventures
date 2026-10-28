import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, X, ArrowRight, ShieldCheck, Check, Minus } from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import { formatPrice, formatArea } from '../utils/formatters';

export default function ComparePage() {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();

  if (compareItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mx-auto">
            <Scale className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-serif">No Properties to Compare</h2>
          <p className="text-xs text-slate-500">
            You can add up to 4 properties from search results or listing cards to evaluate them side-by-side.
          </p>
          <Link
            to="/properties"
            className="inline-flex items-center space-x-1.5 px-6 py-3 rounded-xl bg-primary-700 text-white font-bold text-xs uppercase"
          >
            <span>Browse Properties</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 font-serif">
              Property Comparison ({compareItems.length}/4)
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Side-by-side analysis of pricing, amenities, floor area, and developer credentials.
            </p>
          </div>
          <button
            onClick={clearCompare}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 underline"
          >
            Clear All
          </button>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <tbody>
              {/* Row 1: Images & Titles */}
              <tr className="border-b border-slate-100">
                <td className="p-4 font-bold text-xs text-slate-400 uppercase w-44 bg-slate-50">
                  Property
                </td>
                {compareItems.map((item) => (
                  <td key={item._id} className="p-4 align-top w-64">
                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-2 bg-slate-100">
                      <img
                        src={item.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400'}
                        alt=""
                        className="w-full h-full object-cover property-image"
                      />
                      <button
                        onClick={() => removeFromCompare(item._id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/70 text-white hover:bg-rose-600 transition"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <Link
                      to={`/properties/${item.slug}`}
                      className="font-bold text-sm text-slate-900 hover:text-primary-700 line-clamp-1"
                    >
                      {item.title}
                    </Link>
                  </td>
                ))}
              </tr>

              {/* Price */}
              <tr className="border-b border-slate-100">
                <td className="p-4 font-bold text-xs text-slate-500 uppercase bg-slate-50">Price</td>
                {compareItems.map((item) => (
                  <td key={item._id} className="p-4 font-extrabold text-base text-slate-900 font-serif">
                    {formatPrice(item.price, item.transactionType)}
                  </td>
                ))}
              </tr>

              {/* Price per sq.ft */}
              <tr className="border-b border-slate-100">
                <td className="p-4 font-bold text-xs text-slate-500 uppercase bg-slate-50">
                  Price / Sq.Ft
                </td>
                {compareItems.map((item) => (
                  <td key={item._id} className="p-4 text-xs font-semibold text-primary-700">
                    {item.pricePerSqFt ? `₹ ${item.pricePerSqFt.toLocaleString('en-IN')}` : 'N/A'}
                  </td>
                ))}
              </tr>

              {/* Super Area */}
              <tr className="border-b border-slate-100">
                <td className="p-4 font-bold text-xs text-slate-500 uppercase bg-slate-50">Area</td>
                {compareItems.map((item) => (
                  <td key={item._id} className="p-4 text-xs font-bold text-slate-800">
                    {formatArea(item.area)}
                  </td>
                ))}
              </tr>

              {/* Configuration */}
              <tr className="border-b border-slate-100">
                <td className="p-4 font-bold text-xs text-slate-500 uppercase bg-slate-50">
                  Bedrooms / Type
                </td>
                {compareItems.map((item) => (
                  <td key={item._id} className="p-4 text-xs text-slate-700">
                    {item.bedrooms > 0 ? `${item.bedrooms} BHK ` : ''}
                    {item.propertyType}
                  </td>
                ))}
              </tr>

              {/* Bathrooms */}
              <tr className="border-b border-slate-100">
                <td className="p-4 font-bold text-xs text-slate-500 uppercase bg-slate-50">
                  Bathrooms
                </td>
                {compareItems.map((item) => (
                  <td key={item._id} className="p-4 text-xs text-slate-700">
                    {item.bathrooms || 1}
                  </td>
                ))}
              </tr>

              {/* Floor */}
              <tr className="border-b border-slate-100">
                <td className="p-4 font-bold text-xs text-slate-500 uppercase bg-slate-50">Floor</td>
                {compareItems.map((item) => (
                  <td key={item._id} className="p-4 text-xs text-slate-700">
                    Floor {item.floor} of {item.totalFloors}
                  </td>
                ))}
              </tr>

              {/* Possession */}
              <tr className="border-b border-slate-100">
                <td className="p-4 font-bold text-xs text-slate-500 uppercase bg-slate-50">
                  Possession
                </td>
                {compareItems.map((item) => (
                  <td key={item._id} className="p-4 text-xs font-semibold text-emerald-700">
                    {item.possession}
                  </td>
                ))}
              </tr>

              {/* RERA */}
              <tr className="border-b border-slate-100">
                <td className="p-4 font-bold text-xs text-slate-500 uppercase bg-slate-50">RERA No.</td>
                {compareItems.map((item) => (
                  <td key={item._id} className="p-4 text-[11px] font-mono text-slate-600 truncate max-w-xs">
                    {item.reraNumber}
                  </td>
                ))}
              </tr>

              {/* Developer */}
              <tr className="border-b border-slate-100">
                <td className="p-4 font-bold text-xs text-slate-500 uppercase bg-slate-50">
                  Developer
                </td>
                {compareItems.map((item) => (
                  <td key={item._id} className="p-4 text-xs font-bold text-slate-900">
                    {item.developer?.name || 'Authorized Builder'}
                  </td>
                ))}
              </tr>

              {/* Location */}
              <tr className="border-b border-slate-100">
                <td className="p-4 font-bold text-xs text-slate-500 uppercase bg-slate-50">
                  Location
                </td>
                {compareItems.map((item) => (
                  <td key={item._id} className="p-4 text-xs text-slate-600">
                    {item.locality?.name}, {item.city?.name}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

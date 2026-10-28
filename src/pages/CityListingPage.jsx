import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import api from '../services/api';

export default function CityListingPage() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/cities').then((res) => {
      if (res.success) setCities(res.data.cities || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
            Major Cities & Micro-Markets
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Explore property price trends, verified projects, and top residential addresses across India.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-44 bg-white rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cities.map((city) => (
              <Link
                key={city._id || city.slug}
                to={`/city/${city.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={city.image || 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600'}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 property-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="text-xl font-bold font-serif">{city.name}</h3>
                    <span className="text-[11px] text-slate-300 font-medium">{city.state}</span>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Median Rate:</span>
                    <span className="font-bold text-slate-900">
                      ₹{city.averagePricePerSqFt?.toLocaleString('en-IN')}/sq.ft
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-primary-700 pt-2 border-t border-slate-100 group-hover:text-primary-800">
                    <span>Explore City Localities</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

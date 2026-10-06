import React, { useState, useEffect } from 'react';
import { Building2, Search, Star, MapPin } from 'lucide-react';
import DeveloperCard from '../components/cards/DeveloperCard';
import api from '../services/api';

export default function DeveloperListingPage() {
  const [developers, setDevelopers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/developers?search=${encodeURIComponent(search)}&limit=36`);
        if (res.success) {
          setDevelopers(res.data.developers || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDevelopers();
  }, [search]);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
              Premier Real Estate Developers
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Browse top verified builders, architectural portfolios, and active project launches.
            </p>
          </div>

          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search developer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs bg-white shadow-sm focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-64 animate-pulse border border-slate-200"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {developers.map((dev) => (
              <DeveloperCard key={dev._id} developer={dev} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

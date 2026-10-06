import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import PropertyCard from '../components/cards/PropertyCard';
import api from '../services/api';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/favorites')
      .then((res) => {
        if (res.success && res.data.favorites) {
          setFavorites(res.data.favorites);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 font-serif">
            My Shortlisted Properties ({favorites.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Access your saved homes, compare configurations, and get dedicated callback priority.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-serif">Your Wishlist is Empty</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Explore our verified inventory and tap the heart icon on any property to save it here.
            </p>
            <Link
              to="/properties"
              className="inline-flex items-center space-x-1.5 px-6 py-3 rounded-xl bg-primary-700 text-white font-bold text-xs uppercase"
            >
              <span>Explore Verified Properties</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((prop) => (
              <PropertyCard key={prop._id} property={prop} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

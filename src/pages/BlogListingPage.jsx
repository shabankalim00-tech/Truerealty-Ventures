import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, BookOpen, Search } from 'lucide-react';
import api from '../services/api';
import { formatDate } from '../utils/formatters';

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Market Trends',
    'Investment Guide',
    'Home Buying Tips',
    'Legal & Tax',
    'City Insights',
    'Interior Design',
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
        const res = await api.get(`/blog${query}`);
        if (res.success) {
          setBlogs(res.data.articles || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [category]);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>True Realty Venture Research Desk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
            Real Estate Insights & Buyer Guides
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Market analytics, legal checklists, infrastructure reports, and expert home loan advice.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                (category === '' && c === 'All') || category === c
                  ? 'bg-primary-700 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-white rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((b) => (
              <article
                key={b._id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Link to={`/blog/${b.slug}`}>
                      <img
                        src={b.featuredImage || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'}
                        alt={b.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 text-white backdrop-blur-md">
                      {b.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-3 text-xs text-slate-400">
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        {formatDate(b.publishedAt)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        {b.readTimeMinutes || 5} min read
                      </span>
                    </div>

                    <Link to={`/blog/${b.slug}`}>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-700 transition line-clamp-2 leading-snug">
                        {b.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {b.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/blog/${b.slug}`}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-primary-700 group-hover:text-primary-800"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

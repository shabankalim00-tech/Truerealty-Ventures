import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Building, Search, Filter, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from '../components/cards/ProjectCard';
import api from '../services/api';

export default function ProjectListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);

  const currentCity = searchParams.get('city') || '';
  const currentStatus = searchParams.get('status') || '';
  const currentSearch = searchParams.get('search') || '';

  useEffect(() => {
    api.get('/cities').then((res) => {
      if (res.success) setCities(res.data.cities || []);
    });
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/projects?${searchParams.toString()}`);
        if (res.success) {
          setProjects(res.data.projects || []);
          if (res.pagination) setPagination(res.pagination);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams]);

  const handleFilterChange = (key, val) => {
    const newParams = new URLSearchParams(searchParams);
    if (val) newParams.set(key, val);
    else newParams.delete(key);
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-primary-700 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>Direct Developer Allotments</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
              New Residential & Commercial Projects
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Discover verified master-planned townships, sky towers, and luxury gated communities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={currentCity}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="text-xs font-semibold bg-white border border-slate-300 rounded-xl px-3 py-2.5 shadow-sm"
            >
              <option value="">All Cities</option>
              {cities.map((c) => (
                <option key={c._id || c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={currentStatus}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="text-xs font-semibold bg-white border border-slate-300 rounded-xl px-3 py-2.5 shadow-sm"
            >
              <option value="">All Statuses</option>
              <option value="UNDER_CONSTRUCTION">Under Construction</option>
              <option value="READY_TO_MOVE">Ready to Move</option>
              <option value="UPCOMING">Upcoming Launch</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-slate-200"></div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <p className="text-base text-slate-600 font-medium">No projects found for selected filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((prj) => (
              <ProjectCard key={prj._id} project={prj} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
            <button
              disabled={pagination.page <= 1}
              onClick={() => handleFilterChange('page', String(pagination.page - 1))}
              className="flex items-center space-x-1 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <span className="text-xs font-semibold text-slate-600">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => handleFilterChange('page', String(pagination.page + 1))}
              className="flex items-center space-x-1 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Grid,
  List,
  Map as MapIcon,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Search,
  Building2,
  X,
} from 'lucide-react';
import PropertyCard from '../components/cards/PropertyCard';
import FilterPanel from '../components/properties/FilterPanel';
import LeadModal from '../components/common/LeadModal';
import api from '../services/api';

export default function PropertyListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, totalPages: 1 });
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // grid, list, map
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Extract filter params
  const currentFilters = {
    city: searchParams.get('city') || '',
    locality: searchParams.get('locality') || '',
    propertyType: searchParams.get('propertyType') || '',
    transactionType: searchParams.get('transactionType') || 'Buy',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    bathrooms: searchParams.get('bathrooms') || '',
    furnishing: searchParams.get('furnishing') || '',
    possession: searchParams.get('possession') || '',
    amenities: searchParams.get('amenities') || '',
    rera: searchParams.get('rera') || '',
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || 'relevance',
    page: searchParams.get('page') || '1',
  };

  // Fetch Cities list for filter dropdown
  useEffect(() => {
    api.get('/cities').then((res) => {
      if (res.success) setCities(res.data.cities || []);
    });
  }, []);

  // Fetch properties whenever searchParams change
  useEffect(() => {
    const fetchFilteredProperties = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/properties?${searchParams.toString()}`);
        if (res.success) {
          setProperties(res.data.properties || []);
          if (res.pagination) setPagination(res.pagination);
        }
      } catch (err) {
        console.error('Error fetching properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProperties();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams]);

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set('page', '1'); // Reset to page 1 on filter change
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams({ transactionType: 'Buy' }));
  };

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
  };

  const handleEnquire = (property) => {
    setSelectedProperty(property);
    setLeadModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumbs & Search Title */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
              {currentFilters.city
                ? `Properties in ${currentFilters.city.toUpperCase()}`
                : 'Verified Properties for Sale & Rent'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Showing {pagination.total} verified real estate listings matching your criteria
            </p>
          </div>

          {/* Controls: Sorting & View Mode */}
          <div className="flex items-center space-x-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center space-x-1.5 px-3 py-2 text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded-xl shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-primary-600" />
              <span>Filters</span>
            </button>

            {/* Sort Selector */}
            <select
              value={currentFilters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="newest">Sort: Newest Listed</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="area">Area: High to Low</option>
            </select>

            {/* View Modes */}
            <div className="hidden sm:flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'grid' ? 'bg-primary-50 text-primary-700 font-bold' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'list' ? 'bg-primary-50 text-primary-700 font-bold' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'map' ? 'bg-primary-50 text-primary-700 font-bold' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Map View"
              >
                <MapIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Left Filter Sidebar + Right Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Left Filter Panel */}
          <div className="hidden lg:block lg:col-span-1 sticky top-24">
            <FilterPanel
              filters={currentFilters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
              cities={cities}
              totalResults={pagination.total}
            />
          </div>

          {/* Right Results Section */}
          <div className="lg:col-span-3 space-y-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl h-80 animate-pulse border border-slate-200"
                  ></div>
                ))}
              </div>
            ) : properties.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 font-serif">
                  No Properties Match Your Search Criteria
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try widening your budget, changing the location, or resetting your filter criteria to view more options.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-xl bg-primary-700 text-white font-bold text-xs uppercase tracking-wider"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'map' ? (
              /* Map View (Interactive OpenStreetMap Container) */
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-4">
                <div className="h-[500px] w-full rounded-xl overflow-hidden bg-slate-100 relative">
                  <iframe
                    title="Properties Map View"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=76.85%2C28.35%2C77.45%2C28.75&layer=mapnik`}
                    className="border-0 w-full h-full"
                  ></iframe>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {properties.slice(0, 6).map((prop) => (
                    <PropertyCard
                      key={prop._id}
                      property={prop}
                      onEnquireClick={handleEnquire}
                    />
                  ))}
                </div>
              </div>
            ) : (
              /* Grid / List Results */
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'flex flex-col space-y-4'
                }
              >
                {properties.map((prop) => (
                  <PropertyCard
                    key={prop._id}
                    property={prop}
                    onEnquireClick={handleEnquire}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
                <button
                  disabled={pagination.page <= 1}
                  onClick={() => handlePageChange(pagination.page - 1)}
                  className="flex items-center space-x-1 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <span className="text-xs font-semibold text-slate-600">
                  Page <strong className="text-slate-900">{pagination.page}</strong> of{' '}
                  <strong className="text-slate-900">{pagination.totalPages}</strong>
                </span>

                <button
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => handlePageChange(pagination.page + 1)}
                  className="flex items-center space-x-1 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 transition"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Filter */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 p-4 flex justify-end">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl relative space-y-4">
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-500 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
            <FilterPanel
              filters={currentFilters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
              cities={cities}
              totalResults={pagination.total}
            />
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 rounded-xl bg-primary-700 text-white font-bold text-xs uppercase"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Global Lead Modal */}
      <LeadModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        title={selectedProperty ? `Enquire About ${selectedProperty.title}` : 'Property Enquiry'}
        propertyId={selectedProperty?._id}
      />
    </div>
  );
}

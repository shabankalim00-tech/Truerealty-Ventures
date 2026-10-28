import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  Compass,
  Building2,
  ShieldCheck,
  Heart,
  Share2,
  PhoneCall,
  MessageSquare,
  CheckCircle2,
  Layers,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import EMICalculator from '../components/common/EMICalculator';
import PropertyCard from '../components/cards/PropertyCard';
import LeadModal from '../components/common/LeadModal';
import api from '../services/api';
import { formatPrice, formatArea } from '../utils/formatters';
import { useAuth } from '../context/AuthContext';

export default function PropertyDetailPage() {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { isAuthenticated } = useAuth();

  // Enquiry inline form state
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: 'I am interested in this property. Please send me floor plans and brochure.',
  });
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [enquiryLoading, setEnquiryLoading] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setSelectedImageIndex(0);
        const res = await api.get(`/properties/${slug}`);
        if (res.success && res.data.property) {
          setProperty(res.data.property);
          setSimilarProperties(res.data.similarProperties || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const images = property?.images && property.images.length > 0
    ? property.images
    : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200'];

  const handleInlineEnquiry = async (e) => {
    e.preventDefault();
    if (!property) return;
    try {
      setEnquiryLoading(true);
      await api.post('/leads', {
        ...enquiryForm,
        property: property._id,
        project: property.project?._id,
        source: 'Property Page',
      });
      setEnquirySubmitted(true);
    } catch (err) {
      alert(err.message || 'Submission error');
    } finally {
      setEnquiryLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Property Not Found</h2>
        <Link to="/properties" className="mt-4 text-primary-600 font-bold hover:underline">
          Browse All Properties
        </Link>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hi True Realty Venture, I am interested in "${property.title}" listed for ${formatPrice(property.price)}. Please share details.`
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Breadcrumbs Bar */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <Link to="/properties" className="hover:text-primary-600">Properties</Link>
          <span>/</span>
          <Link to={`/city/${property.city?.slug}`} className="hover:text-primary-600">
            {property.city?.name}
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium truncate max-w-xs">{property.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title & Quick Actions Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-primary-50 text-primary-800">
                {property.propertyType}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified RERA
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {property.reraNumber}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif">
              {property.title}
            </h1>
            <div className="flex items-center text-xs sm:text-sm text-slate-500 mt-2">
              <MapPin className="w-4 h-4 text-primary-600 mr-1 shrink-0" />
              <span>{property.address || `${property.locality?.name}, ${property.city?.name}`}</span>
            </div>
          </div>

          <div className="flex flex-col sm:items-end">
            <span className="text-xs font-semibold text-slate-400">Total Price</span>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 font-serif">
              {formatPrice(property.price, property.transactionType)}
            </div>
            {property.pricePerSqFt > 0 && property.transactionType !== 'Rent' && (
              <span className="text-xs font-bold text-primary-700 mt-0.5">
                ₹{property.pricePerSqFt.toLocaleString('en-IN')} / sq.ft
              </span>
            )}
          </div>
        </div>

        {/* Full Property Image Hero Section */}
        <div className="mb-10">
          <div className="relative w-full h-[400px] sm:h-[480px] md:h-[540px] lg:h-[580px] rounded-3xl overflow-hidden bg-slate-100 shadow-xl border border-slate-200">
            {/* Full Hero Image (Fills container completely) */}
            <img
              src={images[selectedImageIndex] || images[0]}
              alt={`${property.title} view ${selectedImageIndex + 1}`}
              className="w-full h-full object-cover select-none transition-transform duration-700 hover:scale-105 property-image"
            />
            {/* Subtle Vignette Overlay for Badges */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-slate-950/10 pointer-events-none" />

            {/* Badges & Actions Overlay */}
            <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-900 bg-white/95 backdrop-blur-md border border-slate-200 shadow-md">
                Official Visual {images.length > 1 ? `(${selectedImageIndex + 1}/${images.length})` : ''}
              </span>
            </div>

            <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
              <button
                type="button"
                onClick={handleShare}
                className="p-2.5 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-md border border-slate-200 backdrop-blur-md transition hover:scale-105"
                title="Share Property"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Gallery Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2 scrollbar-thin">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative flex-shrink-0 w-24 h-16 sm:w-32 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    selectedImageIndex === idx
                      ? 'border-primary-600 ring-2 ring-primary-500/30 scale-105 shadow-md'
                      : 'border-slate-200 hover:border-slate-400 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${property.title} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover property-image"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm mb-10">
          <button
            onClick={() => setLeadModalOpen(true)}
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gold-400 hover:bg-gold-500 text-slate-900 font-bold text-xs uppercase tracking-wider shadow-sm transition"
          >
            Contact Agent
          </button>

          <button
            onClick={() => setLeadModalOpen(true)}
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition"
          >
            Schedule Site Visit
          </button>

          <a
            href={`https://wa.me/918796869292?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition flex items-center justify-center space-x-1.5"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Enquiry</span>
          </a>

          <a
            href="tel:+919220805059"
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-1.5"
          >
            <PhoneCall className="w-4 h-4" />
            <span>+91 9220805059</span>
          </a>
        </div>

        {/* Two-Column Body: Left Information + Right Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Specs & Detailed Sections */}
          <div className="lg:col-span-8 space-y-10">
            {/* Quick Specs Grid */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 font-serif mb-6">Property Overview</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <span className="text-slate-400 block text-xs">Bedrooms</span>
                  <div className="flex items-center space-x-1.5 mt-1 font-extrabold text-slate-800">
                    <Bed className="w-4 h-4 text-primary-600" />
                    <span>{property.bedrooms > 0 ? `${property.bedrooms} BHK` : 'N/A'}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block text-xs">Bathrooms</span>
                  <div className="flex items-center space-x-1.5 mt-1 font-extrabold text-slate-800">
                    <Bath className="w-4 h-4 text-primary-600" />
                    <span>{property.bathrooms || 1} Baths</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block text-xs">Super Area</span>
                  <div className="flex items-center space-x-1.5 mt-1 font-extrabold text-slate-800">
                    <Maximize2 className="w-4 h-4 text-primary-600" />
                    <span>{formatArea(property.area)}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block text-xs">Possession</span>
                  <div className="flex items-center space-x-1.5 mt-1 font-extrabold text-emerald-700">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span>{property.possession}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block text-xs">Floor</span>
                  <div className="mt-1 font-semibold text-slate-800 text-sm">
                    {property.floor} of {property.totalFloors} Floors
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block text-xs">Furnishing</span>
                  <div className="mt-1 font-semibold text-slate-800 text-sm">
                    {property.furnishing}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block text-xs">Facing</span>
                  <div className="mt-1 font-semibold text-slate-800 text-sm">
                    {property.facing}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block text-xs">Transaction</span>
                  <div className="mt-1 font-semibold text-slate-800 text-sm">
                    For {property.transactionType}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-serif">Description</h3>
              <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-serif">Amenities & Facilities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities?.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 p-3 bg-slate-50 rounded-xl text-xs font-semibold text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* OpenStreetMap Location */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-serif">Location & Connectivity</h3>
              <p className="text-xs text-slate-500">
                Exact geographic coordinates mapped in {property.locality?.name}, {property.city?.name}.
              </p>
              <div className="h-72 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <iframe
                  title="OpenStreetMap Property View"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.longitude - 0.02}%2C${property.latitude - 0.02}%2C${property.longitude + 0.02}%2C${property.latitude + 0.02}&layer=mapnik&marker=${property.latitude}%2C${property.longitude}`}
                  className="border-0 w-full h-full"
                ></iframe>
              </div>
            </div>

            {/* Developer Details */}
            {property.developer && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-6">
                <img
                  src={property.developer.logo || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200'}
                  alt={property.developer.name}
                  className="w-20 h-20 rounded-2xl object-cover border border-slate-200"
                />
                <div className="flex-1 text-center sm:text-left space-y-1">
                  <div className="text-xs font-bold text-primary-700 uppercase tracking-wider">
                    Developed By
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">{property.developer.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {property.developer.description}
                  </p>
                  <Link
                    to={`/developer/${property.developer.slug}`}
                    className="inline-flex items-center text-xs font-bold text-primary-700 hover:text-primary-800 pt-2"
                  >
                    <span>View All Builder Projects</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            )}

            {/* EMI Calculator */}
            <EMICalculator initialAmount={property.price * 0.8} />

            {/* Similar Properties */}
            {similarProperties.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 font-serif">Similar Properties</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {similarProperties.map((simProp) => (
                    <PropertyCard key={simProp._id} property={simProp} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Right Consultation Form */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-4">
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
                <img
                  src={property.agent?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100'}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    {property.agent?.name ? property.agent.name.replace(/Estate360(\s+Super\s+Admin)?/gi, 'True Realty Venture') : 'True Realty Venture'}
                  </h4>
                  <span className="text-[11px] font-medium text-emerald-700 flex items-center">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Certified Estate Advisor
                  </span>
                </div>
              </div>

              <h4 className="text-base font-bold text-slate-900 font-serif">
                Direct Developer Enquiry
              </h4>
              <p className="text-xs text-slate-500">
                Get genuine price sheet, inventory list, and zero-brokerage assistance.
              </p>

              {enquirySubmitted ? (
                <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-600" />
                  <p className="font-bold text-sm">Enquiry Registered!</p>
                  <p>Our executive will connect with you via WhatsApp/Phone shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleInlineEnquiry} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={enquiryForm.name}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number *"
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={enquiryForm.email}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <textarea
                      rows="2"
                      value={enquiryForm.message}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={enquiryLoading}
                    className="w-full py-3 rounded-xl bg-gold-400 hover:bg-gold-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-md disabled:opacity-60"
                  >
                    {enquiryLoading ? 'Submitting...' : 'Request Instant Callback'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Enquiry CTA for Mobile (Requirement #11) */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 p-3 flex sm:hidden items-center justify-between z-40 shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-400 block">Total Price</span>
          <span className="text-base font-extrabold text-slate-900 font-serif">
            {formatPrice(property.price, property.transactionType)}
          </span>
        </div>
        <div className="flex space-x-2">
          <a
            href={`https://wa.me/918796869292?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-emerald-600 text-white"
          >
            <MessageSquare className="w-5 h-5" />
          </a>
          <button
            onClick={() => setLeadModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gold-400 text-slate-900 font-bold text-xs uppercase tracking-wider"
          >
            Enquire Now
          </button>
        </div>
      </div>

      <LeadModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        title={`Enquire About ${property.title}`}
        propertyId={property._id}
        projectId={property.project?._id}
      />
    </div>
  );
}

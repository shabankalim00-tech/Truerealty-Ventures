import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Download,
  PhoneCall,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Maximize2,
  Navigation,
} from 'lucide-react';
import PropertyCard from '../components/cards/PropertyCard';
import ProjectCard from '../components/cards/ProjectCard';
import LeadModal from '../components/common/LeadModal';
import api from '../services/api';
import { formatPrice, formatArea } from '../utils/formatters';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [units, setUnits] = useState([]);
  const [similarProjects, setSimilarProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFloorIndex, setActiveFloorIndex] = useState(0);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setSelectedImageIndex(0);
        const res = await api.get(`/projects/${slug}`);
        if (res.success && res.data.project) {
          setProject(res.data.project);
          setUnits(res.data.units || []);
          setSimilarProjects(res.data.similarProjects || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Project Not Found</h2>
        <Link to="/projects" className="mt-4 text-primary-600 font-bold hover:underline">
          Browse All Projects
        </Link>
      </div>
    );
  }

  const primaryImage =
    project.images && project.images.length > 0
      ? project.images[0]
      : 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200';

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Project Hero Banner */}
      <div className="relative min-h-[440px] flex items-end bg-slate-950 text-white overflow-hidden py-12">
        <img
          src={project.images?.[selectedImageIndex] || primaryImage}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover opacity-65 property-image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider bg-gold-500 text-slate-950">
                  {project.projectType}
                </span>
                <span className="px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" /> RERA Registered
                </span>
                <span className="text-xs text-slate-400 font-mono">{project.reraNumber}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-serif text-white">
                {project.name}
              </h1>

              <div className="flex items-center text-sm text-slate-300">
                <MapPin className="w-4 h-4 text-gold-400 mr-1.5 shrink-0" />
                <span>{project.address || `${project.locality?.name}, ${project.city?.name}`}</span>
              </div>

              {/* Multi-view Selector */}
              {project.images && project.images.length > 1 && (
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs font-semibold text-slate-300">Gallery Views:</span>
                  {project.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedImageIndex === idx
                          ? 'bg-gold-400 text-slate-950 shadow-md scale-105'
                          : 'bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 backdrop-blur-sm'
                      }`}
                    >
                      View {idx + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-xs text-slate-400 block font-medium">Investment Starts from</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-gold-400 font-serif">
                {project.priceMin && project.priceMin > 0 ? (
                  project.priceMax && project.priceMax > project.priceMin ? (
                    `${formatPrice(project.priceMin)} - ${formatPrice(project.priceMax)}`
                  ) : (
                    `${formatPrice(project.priceMin)} onwards`
                  )
                ) : (
                  project.customPriceDisplay || 'Price on Request'
                )}
              </div>
              {project.returnsInfo ? (
                <div className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/30">
                  {project.returnsInfo}
                </div>
              ) : null}
              <div className="text-[11px] font-medium text-amber-300 italic">
                ** Prices and availability are subject to change.
              </div>
              <button
                onClick={() => setLeadModalOpen(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-gold-400 hover:bg-gold-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-md mt-2"
              >
                Download Official Brochure
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Project Overview Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 font-serif">Project Overview</h2>
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
            {project.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 pt-4 border-t border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block">Investment Type</span>
              <span className="font-extrabold text-primary-700 text-sm mt-0.5 block">
                {project.projectType || 'Commercial'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Unit Sizes</span>
              <span className="font-extrabold text-slate-800 text-sm mt-0.5 block">
                {project.sizeRange || 'Custom Layouts'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Configurations</span>
              <span className="font-extrabold text-slate-800 text-sm mt-0.5 block">
                {project.configurations?.join(', ')}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Possession</span>
              <span className="font-extrabold text-emerald-700 text-sm mt-0.5 block">
                {project.possession}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Total Area</span>
              <span className="font-extrabold text-slate-800 text-sm mt-0.5 block">
                {project.totalAreaAcres || 4} Acres
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">RERA Status</span>
              <span className="font-extrabold text-emerald-700 text-sm mt-0.5 block">
                Approved
              </span>
            </div>
          </div>
        </div>

        {/* Floor-wise Rates & Size Breakdown (WeGrow Infraventures Verified Data) */}
        {project.floorRates && project.floorRates.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-serif">
                  Floor-wise Rates & Size Breakdown
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Detailed square foot rates, sizes, and layout utilities for {project.name}.
                </p>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/60 self-start sm:self-auto">
                Verified Market Rates
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Level / Floor</th>
                    <th className="py-3 px-4">Rate per Sq. Ft.</th>
                    <th className="py-3 px-4">Unit Size (Sq. Ft.)</th>
                    <th className="py-3 px-4">Recommended Usage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {project.floorRates.map((fr, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{fr.floor}</td>
                      <td className="py-3.5 px-4 font-extrabold text-gold-600 font-mono text-sm">{fr.rate}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-700">{fr.size}</td>
                      <td className="py-3.5 px-4 text-slate-500">{fr.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Floor Plans Section */}
        {project.floorPlans && project.floorPlans.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 font-serif">
              Master Layouts & Floor Plans
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.floorPlans.map((fp, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFloorIndex(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    activeFloorIndex === idx
                      ? 'bg-primary-700 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {fp.title}
                </button>
              ))}
            </div>

            {project.floorPlans[activeFloorIndex] && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900">
                    {project.floorPlans[activeFloorIndex].title}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block">Super Built-up Area:</span>
                      <span className="font-bold text-slate-900 text-sm">
                        {project.floorPlans[activeFloorIndex].superArea} sq.ft.
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Carpet Area:</span>
                      <span className="font-bold text-slate-900 text-sm">
                        {project.floorPlans[activeFloorIndex].carpetArea} sq.ft.
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Bedrooms:</span>
                      <span className="font-bold text-slate-900 text-sm">
                        {project.floorPlans[activeFloorIndex].bedrooms} BHK
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Pricing:</span>
                      <span className="font-extrabold text-gold-600 text-sm">
                        {formatPrice(project.floorPlans[activeFloorIndex].price)}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Status:</span>
                      <span className="font-extrabold text-emerald-600 text-sm">
                        Available on Request
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setLeadModalOpen(true)}
                    className="px-6 py-2.5 rounded-xl bg-primary-700 text-white font-bold text-xs uppercase"
                  >
                    Request Floor Plan PDF
                  </button>
                </div>
                <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 aspect-[4/3] flex items-center justify-center p-2">
                  <img
                    src={project.floorPlans[activeFloorIndex].image}
                    alt={project.floorPlans[activeFloorIndex].title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Amenities */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 font-serif">Project Amenities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.amenities?.map((amenity, idx) => (
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

        {/* Nearby Landmarks */}
        {project.nearbyLandmarks && project.nearbyLandmarks.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 font-serif">
              Location & Strategic Connectivity
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.nearbyLandmarks.map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{item.name}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-primary-100 text-primary-800">
                      {item.category}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium">{item.distance}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Available Units in this Project */}
        {units.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 font-serif">
              Available Units in {project.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {units.map((unit) => (
                <PropertyCard key={unit._id} property={unit} />
              ))}
            </div>
          </div>
        )}

        {/* Similar Projects */}
        {similarProjects.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 font-serif">Similar Projects Nearby</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProjects.map((p) => (
                <ProjectCard key={p._id} project={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <LeadModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        title={`Enquire About ${project.name}`}
        projectId={project._id}
      />
    </div>
  );
}

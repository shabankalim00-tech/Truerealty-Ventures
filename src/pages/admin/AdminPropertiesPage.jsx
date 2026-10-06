import React, { useState, useEffect } from 'react';
import {
  Building2,
  Plus,
  Search,
  Edit2,
  Trash2,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  X,
  ExternalLink,
} from 'lucide-react';
import api from '../../services/api';
import { formatPrice } from '../../utils/formatters';

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: 'Apartment',
    transactionType: 'Buy',
    price: '',
    area: '',
    bedrooms: '3',
    bathrooms: '3',
    city: '',
    address: '',
    possession: 'Ready to Move',
    reraNumber: 'PRM/KA/RERA/2026/8941',
    images: '',
    featured: false,
    verified: true,
    status: 'PUBLISHED',
  });

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/properties?search=${encodeURIComponent(search)}&limit=50`);
      if (res.success) {
        setProperties(res.data.properties || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [search]);

  useEffect(() => {
    api.get('/cities').then((res) => {
      if (res.success && res.data.cities) {
        setCities(res.data.cities);
        if (res.data.cities.length > 0 && !formData.city) {
          setFormData((prev) => ({ ...prev, city: res.data.cities[0]._id }));
        }
      }
    });
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: 'Luxury high-rise residential apartment with panoramic green view, modular Italian kitchen and clubhouse privileges.',
      propertyType: 'Apartment',
      transactionType: 'Buy',
      price: '15000000',
      area: '1850',
      bedrooms: '3',
      bathrooms: '3',
      city: cities[0]?._id || '',
      address: 'Sector 65, Golf Course Extension Road',
      possession: 'Ready to Move',
      reraNumber: 'RERA/GUR/2026/4102',
      images: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
      featured: true,
      verified: true,
      status: 'PUBLISHED',
    });
    setModalOpen(true);
  };

  const handleEdit = (prop) => {
    setEditingId(prop._id);
    setFormData({
      title: prop.title,
      description: prop.description,
      propertyType: prop.propertyType,
      transactionType: prop.transactionType,
      price: prop.price,
      area: prop.area,
      bedrooms: prop.bedrooms,
      bathrooms: prop.bathrooms,
      city: prop.city?._id || prop.city,
      address: prop.address || '',
      possession: prop.possession,
      reraNumber: prop.reraNumber || '',
      images: Array.isArray(prop.images) ? prop.images.join(', ') : (prop.images || ''),
      featured: prop.featured || false,
      verified: prop.verified || true,
      status: prop.status || 'PUBLISHED',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property listing?')) return;
    try {
      const res = await api.delete(`/properties/${id}`);
      if (res.success) {
        setProperties((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        images: typeof formData.images === 'string'
          ? formData.images.split(',').map((u) => u.trim()).filter(Boolean)
          : formData.images,
      };

      if (editingId) {
        const res = await api.put(`/properties/${editingId}`, payload);
        if (res.success) {
          setModalOpen(false);
          fetchProperties();
        }
      } else {
        const res = await api.post('/properties', payload);
        if (res.success) {
          setModalOpen(false);
          fetchProperties();
        }
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
            Property Inventory Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Publish, edit, feature, and verify properties on the marketplace.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-64 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search properties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs bg-white"
            />
          </div>
          <button
            onClick={handleOpenCreate}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-gold-400 hover:bg-gold-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create Property</span>
          </button>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold text-[10px]">
              <tr>
                <th className="p-4">Property</th>
                <th className="p-4">Type</th>
                <th className="p-4">Price</th>
                <th className="p-4">City</th>
                <th className="p-4">Badges</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {properties.map((prop) => (
                <tr key={prop._id} className="hover:bg-slate-50 transition">
                  <td className="p-4">
                    <div className="font-bold text-slate-900 line-clamp-1 max-w-sm">{prop.title}</div>
                    <div className="text-slate-400 text-[10px] mt-0.5">
                      {prop.bedrooms > 0 ? `${prop.bedrooms} BHK • ` : ''}
                      {prop.area} sq.ft.
                    </div>
                  </td>
                  <td className="p-4 text-slate-600">{prop.propertyType}</td>
                  <td className="p-4 font-bold text-slate-900 font-serif">
                    {formatPrice(prop.price, prop.transactionType)}
                  </td>
                  <td className="p-4 text-slate-600">{prop.city?.name || 'NCR'}</td>
                  <td className="p-4 space-x-1">
                    {prop.featured && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                        Featured
                      </span>
                    )}
                    {prop.verified && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-900">
                        Verified
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-800">
                      {prop.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(prop)}
                      className="p-1.5 text-slate-600 hover:text-primary-700 rounded-lg hover:bg-slate-100"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(prop._id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 p-4 flex items-center justify-center">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-slate-900 font-serif">
              {editingId ? 'Edit Property Listing' : 'Publish New Property'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Ultra-Luxury 3 BHK Apartment in Golf Course Road"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Property Type
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Builder Floor">Builder Floor</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Commercial Office">Commercial Office</option>
                    <option value="Retail Shop">Retail Shop</option>
                    <option value="Plot">Plot</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Transaction Type
                  </label>
                  <select
                    value={formData.transactionType}
                    onChange={(e) => setFormData({ ...formData, transactionType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Buy">Buy</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Super Area (Sq.Ft) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    City *
                  </label>
                  <select
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    {cities.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Property Photos (Image URLs, comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="https://.../photo1.jpg, https://.../photo2.jpg"
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Paste real photos from Google Drive direct links, Cloudinary, Imgur, or Unsplash.
                </p>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                ></textarea>
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded text-primary-600"
                  />
                  <span>Mark as Featured</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.verified}
                    onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                    className="rounded text-emerald-600"
                  />
                  <span>Mark as Verified RERA</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary-700 text-white font-bold hover:bg-primary-800"
                >
                  {editingId ? 'Save Changes' : 'Publish Property'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

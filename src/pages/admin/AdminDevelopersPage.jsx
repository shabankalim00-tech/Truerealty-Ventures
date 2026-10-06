import React, { useState, useEffect } from 'react';
import { Building2, Plus, Search, Edit2, Trash2, ShieldCheck, X } from 'lucide-react';
import api from '../../services/api';

export default function AdminDevelopersPage() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    establishedYear: 2000,
    locations: 'Gurgaon, Delhi NCR, Noida',
    rating: 4.8,
  });

  const fetchDevs = async () => {
    try {
      setLoading(true);
      const res = await api.get('/developers?limit=50');
      if (res.success) setDevelopers(res.data.developers || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevs();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      name: '',
      description: 'Marquee real estate developer with on-time execution record.',
      establishedYear: 2000,
      locations: 'Gurgaon, Delhi NCR, Noida',
      rating: 4.8,
    });
    setModalOpen(true);
  };

  const handleEdit = (d) => {
    setEditingId(d._id);
    setFormData({
      name: d.name,
      description: d.description,
      establishedYear: d.establishedYear,
      locations: d.locations?.join(', ') || '',
      rating: d.rating,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this developer?')) return;
    try {
      const res = await api.delete(`/developers/${id}`);
      if (res.success) {
        setDevelopers((prev) => prev.filter((d) => d._id !== id));
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      locations: formData.locations.split(',').map((l) => l.trim()),
    };
    try {
      if (editingId) {
        const res = await api.put(`/developers/${editingId}`, payload);
        if (res.success) {
          setModalOpen(false);
          fetchDevs();
        }
      } else {
        const res = await api.post('/developers', payload);
        if (res.success) {
          setModalOpen(false);
          fetchDevs();
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
            Developers & Builders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage developer relationships, verified brand logos, and track records.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-gold-400 hover:bg-gold-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Developer</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold text-[10px]">
              <tr>
                <th className="p-4">Developer</th>
                <th className="p-4">Established</th>
                <th className="p-4">Operating Locations</th>
                <th className="p-4">Rating</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {developers.map((d) => (
                <tr key={d._id} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-bold text-slate-900 text-sm">{d.name}</td>
                  <td className="p-4 text-slate-600">{d.establishedYear}</td>
                  <td className="p-4 text-slate-600">{d.locations?.join(', ')}</td>
                  <td className="p-4 font-bold text-amber-600">⭐ {d.rating}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(d)}
                      className="p-1.5 text-slate-600 hover:text-primary-700 rounded-lg hover:bg-slate-100"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(d._id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
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

      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 p-4 flex items-center justify-center">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-4">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-slate-900 font-serif">
              {editingId ? 'Edit Developer' : 'Add Developer'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Developer Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Established Year
                  </label>
                  <input
                    type="number"
                    value={formData.establishedYear}
                    onChange={(e) => setFormData({ ...formData, establishedYear: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Rating (1-5)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Operating Cities (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.locations}
                  onChange={(e) => setFormData({ ...formData, locations: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-primary-700 text-white font-bold hover:bg-primary-800"
                >
                  Save Developer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

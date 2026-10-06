import React, { useState, useEffect } from 'react';
import { Building, Plus, Search, Edit2, Trash2, ShieldCheck, Sparkles, X } from 'lucide-react';
import api from '../../services/api';
import { formatPrice } from '../../utils/formatters';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [cities, setCities] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    priceMin: '8500000',
    priceMax: '25000000',
    city: '',
    developer: '',
    possession: 'Ready to Move',
    reraNumber: 'RERA/GUR/PRJ/2026/1029',
    featured: true,
    status: 'READY_TO_MOVE',
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/projects?search=${encodeURIComponent(search)}&limit=50`);
      if (res.success) setProjects(res.data.projects || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [search]);

  useEffect(() => {
    Promise.all([api.get('/cities'), api.get('/developers')]).then(([cRes, dRes]) => {
      if (cRes.success) setCities(cRes.data.cities || []);
      if (dRes.success) setDevelopers(dRes.data.developers || []);
    });
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      name: '',
      description: 'Iconic master-planned residential project with 75% lush greens and panoramic city vistas.',
      priceMin: '8500000',
      priceMax: '25000000',
      city: cities[0]?._id || '',
      developer: developers[0]?._id || '',
      possession: 'Ready to Move',
      reraNumber: 'RERA/GUR/PRJ/2026/1029',
      featured: true,
      status: 'READY_TO_MOVE',
    });
    setModalOpen(true);
  };

  const handleEdit = (prj) => {
    setEditingId(prj._id);
    setFormData({
      name: prj.name,
      description: prj.description,
      priceMin: prj.priceMin,
      priceMax: prj.priceMax,
      city: prj.city?._id || prj.city,
      developer: prj.developer?._id || prj.developer,
      possession: prj.possession,
      reraNumber: prj.reraNumber,
      featured: prj.featured || false,
      status: prj.status || 'READY_TO_MOVE',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      const res = await api.delete(`/projects/${id}`);
      if (res.success) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await api.put(`/projects/${editingId}`, formData);
        if (res.success) {
          setModalOpen(false);
          fetchProjects();
        }
      } else {
        const res = await api.post('/projects', formData);
        if (res.success) {
          setModalOpen(false);
          fetchProjects();
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
            New Projects Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Maintain new builder launches, floor plans, and RERA compliance data.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenCreate}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-gold-400 hover:bg-gold-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Project Launch</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold text-[10px]">
              <tr>
                <th className="p-4">Project Name</th>
                <th className="p-4">Developer</th>
                <th className="p-4">Price Range</th>
                <th className="p-4">City</th>
                <th className="p-4">RERA</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {projects.map((prj) => (
                <tr key={prj._id} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-bold text-slate-900">{prj.name}</td>
                  <td className="p-4 text-slate-600">{prj.developer?.name || 'Authorized Builder'}</td>
                  <td className="p-4 font-bold text-slate-900 font-serif">
                    {formatPrice(prj.priceMin)} - {formatPrice(prj.priceMax)}
                  </td>
                  <td className="p-4 text-slate-600">{prj.city?.name}</td>
                  <td className="p-4 font-mono text-[11px] text-slate-500">{prj.reraNumber}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">
                      {prj.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(prj)}
                      className="p-1.5 text-slate-600 hover:text-primary-700 rounded-lg hover:bg-slate-100"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(prj._id)}
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
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-4">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-slate-900 font-serif">
              {editingId ? 'Edit Project' : 'Add New Project'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Min Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.priceMin}
                    onChange={(e) => setFormData({ ...formData, priceMin: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Max Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.priceMax}
                    onChange={(e) => setFormData({ ...formData, priceMax: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                  RERA Registration Number
                </label>
                <input
                  type="text"
                  required
                  value={formData.reraNumber}
                  onChange={(e) => setFormData({ ...formData, reraNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
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
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

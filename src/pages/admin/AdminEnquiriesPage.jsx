import React, { useState, useEffect } from 'react';
import { MessageSquare, Search, Phone, Mail, CheckCircle2, Clock } from 'lucide-react';
import api from '../../services/api';
import { formatDate } from '../../utils/formatters';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await api.get('/enquiries?limit=50');
      if (res.success) setEnquiries(res.data.enquiries || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await api.patch(`/enquiries/${id}/status`, { status });
      if (res.success) fetchEnquiries();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
          Inbound Website Enquiries
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Direct property queries, brochure downloads, and callback requests.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold text-[10px]">
              <tr>
                <th className="p-4">Contact</th>
                <th className="p-4">Property / Target</th>
                <th className="p-4">Type</th>
                <th className="p-4">Message</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {enquiries.map((e) => (
                <tr key={e._id} className="hover:bg-slate-50 transition">
                  <td className="p-4">
                    <div className="font-bold text-slate-900 text-sm">{e.name}</div>
                    <div className="text-slate-500 font-mono text-[11px] mt-0.5">{e.phone}</div>
                    {e.email && <div className="text-slate-400 text-[10px]">{e.email}</div>}
                  </td>
                  <td className="p-4 font-bold text-slate-800 line-clamp-1 max-w-xs">
                    {e.property?.title || e.project?.name || 'General Inquiry'}
                  </td>
                  <td className="p-4 text-slate-600 font-semibold">{e.type}</td>
                  <td className="p-4 text-slate-600 max-w-xs truncate">{e.message}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        e.status === 'CONTACTED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {e.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-1.5">
                    <button
                      onClick={() => handleStatusUpdate(e._id, 'CONTACTED')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[11px]"
                    >
                      Contacted
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(e._id, 'RESOLVED')}
                      className="px-2.5 py-1 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 font-bold text-[11px]"
                    >
                      Resolved
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

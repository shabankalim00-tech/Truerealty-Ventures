import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Phone, MapPin, CheckCircle2, XCircle } from 'lucide-react';
import api from '../../services/api';
import { formatDate } from '../../utils/formatters';

export default function AdminSiteVisitsPage() {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVisits = async () => {
    try {
      setLoading(true);
      const res = await api.get('/site-visits?limit=50');
      if (res.success) {
        setVisits(res.data.visits || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, []);

  const handleStatusChange = async (visitId, newStatus) => {
    try {
      const res = await api.patch(`/site-visits/${visitId}/status`, { status: newStatus });
      if (res.success) {
        fetchVisits();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
          Site Visits Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review visit schedules, confirm buyer appointments, and assign consultants.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold text-[10px]">
              <tr>
                <th className="p-4">Visitor</th>
                <th className="p-4">Property / Project</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Assigned Agent</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {visits.map((v) => (
                <tr key={v._id} className="hover:bg-slate-50 transition">
                  <td className="p-4">
                    <div className="font-bold text-slate-900 text-sm">{v.name}</div>
                    <div className="text-slate-500 font-mono text-[11px] mt-0.5">{v.phone}</div>
                    {v.email && <div className="text-slate-400 text-[10px]">{v.email}</div>}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-slate-800 line-clamp-1 max-w-xs">
                      {v.property?.title || v.project?.name || 'Prime Property'}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{formatDate(v.visitDate)}</div>
                    <div className="text-slate-500 text-[11px]">{v.visitTime}</div>
                  </td>
                  <td className="p-4 text-slate-600">
                    {v.assignedAgent?.name || 'Advisory Team'}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      v.status === 'CONFIRMED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : v.status === 'COMPLETED'
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-1.5">
                    <button
                      onClick={() => handleStatusChange(v._id, 'CONFIRMED')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[11px]"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleStatusChange(v._id, 'COMPLETED')}
                      className="px-2.5 py-1 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 font-bold text-[11px]"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => handleStatusChange(v._id, 'CANCELLED')}
                      className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-[11px]"
                    >
                      Cancel
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

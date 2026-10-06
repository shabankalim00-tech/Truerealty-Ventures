import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  UserCheck,
  ChevronRight,
  X,
} from 'lucide-react';
import api from '../../services/api';
import { formatDate } from '../../utils/formatters';

const LEAD_STATUSES = [
  'ALL',
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'INTERESTED',
  'SITE_VISIT',
  'NEGOTIATION',
  'BOOKED',
  'CLOSED',
  'LOST',
];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [newStatus, setNewStatus] = useState('');

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const query = statusFilter !== 'ALL' ? `status=${statusFilter}&` : '';
      const res = await api.get(`/leads?${query}search=${encodeURIComponent(search)}`);
      if (res.success) {
        setLeads(res.data.leads || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, search]);

  const handleSelectLead = async (leadId) => {
    try {
      const res = await api.get(`/leads/${leadId}`);
      if (res.success) {
        setSelectedLead(res.data.lead);
        setNewStatus(res.data.lead.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedLead || !newStatus) return;
    try {
      const res = await api.put(`/leads/${selectedLead._id}`, { status: newStatus });
      if (res.success) {
        setSelectedLead(res.data.lead);
        fetchLeads();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!selectedLead || !newNote.trim()) return;
    try {
      const res = await api.post(`/leads/${selectedLead._id}/notes`, { text: newNote.trim() });
      if (res.success) {
        setSelectedLead(res.data.lead);
        setNewNote('');
        fetchLeads();
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
            Leads & Pipeline CRM
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Automated lead scoring, follow-ups, agent assignments, and customer conversion.
          </p>
        </div>

        <div className="w-full sm:w-72 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search lead name, phone, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs bg-white shadow-sm focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Filter Status Tabs */}
      <div className="flex items-center space-x-1 overflow-x-auto pb-2">
        {LEAD_STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              statusFilter === status
                ? 'bg-primary-700 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Main Grid: Leads List on Left, Active Lead Drawer on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table / List */}
        <div className={`${selectedLead ? 'lg:col-span-7' : 'lg:col-span-12'} bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold text-[10px]">
                <tr>
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Lead Score</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Assigned Consultant</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {leads.map((lead) => (
                  <tr
                    key={lead._id}
                    onClick={() => handleSelectLead(lead._id)}
                    className={`cursor-pointer transition hover:bg-slate-50 ${
                      selectedLead?._id === lead._id ? 'bg-primary-50/60' : ''
                    }`}
                  >
                    <td className="p-4">
                      <div className="font-bold text-slate-900 text-sm">{lead.name}</div>
                      <div className="text-slate-500 font-mono text-[11px] mt-0.5">
                        {lead.phone} {lead.email && `• ${lead.email}`}
                      </div>
                      <div className="text-slate-400 text-[10px] mt-0.5">
                        Source: {lead.source || 'Website'}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                        ⭐ +{lead.score || 20}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800">
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">
                      {lead.assignedAgent?.name || 'Unassigned'}
                    </td>
                    <td className="p-4 text-right">
                      <ChevronRight className="w-4 h-4 text-slate-400 inline-block" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Lead Details Drawer */}
        {selectedLead && (
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-xl p-6 space-y-6 relative animate-in fade-in">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider text-primary-700 mb-1">
                <span>Lead Profile</span>
                <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                  Score: +{selectedLead.score}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-serif">{selectedLead.name}</h2>
              <div className="flex items-center space-x-4 text-xs text-slate-500 mt-2">
                <a href={`tel:${selectedLead.phone}`} className="flex items-center text-primary-700 font-bold hover:underline">
                  <Phone className="w-3.5 h-3.5 mr-1" /> {selectedLead.phone}
                </a>
                {selectedLead.email && (
                  <span className="flex items-center">
                    <Mail className="w-3.5 h-3.5 mr-1" /> {selectedLead.email}
                  </span>
                )}
              </div>
            </div>

            {/* Status Change Control */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                Update Pipeline Status
              </label>
              <div className="flex gap-2">
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="flex-1 text-xs bg-white border border-slate-300 rounded-xl px-3 py-2 font-semibold"
                >
                  {LEAD_STATUSES.filter((s) => s !== 'ALL').map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleUpdateStatus}
                  className="px-4 py-2 bg-primary-700 text-white font-bold text-xs rounded-xl shadow-sm hover:bg-primary-800"
                >
                  Save Status
                </button>
              </div>
            </div>

            {/* Message / Requirement */}
            {selectedLead.message && (
              <div className="text-xs p-3 bg-slate-50 rounded-xl text-slate-700">
                <strong className="block text-slate-900 mb-1">Client Note:</strong>
                "{selectedLead.message}"
              </div>
            )}

            {/* Notes Section */}
            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-600">
                Internal Notes & Follow-ups
              </h3>
              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type note or call feedback..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800"
                >
                  Add Note
                </button>
              </form>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedLead.notes?.map((n, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <p className="text-slate-800">{n.text}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {formatDate(n.createdAt)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity History Audit */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-600">
                Activity Audit Trail
              </h3>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {selectedLead.activities?.map((act, i) => (
                  <div key={i} className="text-[11px] text-slate-600 flex justify-between">
                    <span>{act.action}</span>
                    <span className="text-slate-400 font-mono">{formatDate(act.timestamp)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

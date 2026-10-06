import React, { useState, useEffect } from 'react';
import { Users, Calendar, Building2, Phone, CheckCircle2 } from 'lucide-react';
import api from '../../services/api';
import { formatDate } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';

export default function AgentDashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/agents/dashboard').then((res) => {
      if (res.success) setData(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const stats = data?.stats || {};
  const recentLeads = data?.recentLeads || [];
  const siteVisits = data?.upcomingSiteVisits || [];
  const properties = data?.myProperties || [];

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-serif">
            Welcome, {user?.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Agent Advisory Console • Active License: {user?.agentDetails?.licenseNumber || 'RERA-AGT-2026-8800'}
          </p>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs text-slate-400 font-semibold uppercase">Assigned Leads</span>
            <div className="text-2xl font-black text-slate-900 font-serif">{stats.total || 0}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs text-slate-400 font-semibold uppercase">New Enquiries</span>
            <div className="text-2xl font-black text-amber-600 font-serif">{stats.new || 0}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs text-slate-400 font-semibold uppercase">Scheduled Visits</span>
            <div className="text-2xl font-black text-indigo-600 font-serif">{stats.siteVisits || 0}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs text-slate-400 font-semibold uppercase">Units Booked</span>
            <div className="text-2xl font-black text-emerald-600 font-serif">{stats.booked || 0}</div>
          </div>
        </div>

        {/* Leads & Visits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Assigned Leads */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-serif">My Active Leads</h2>
            <div className="divide-y divide-slate-100">
              {recentLeads.map((l) => (
                <div key={l._id} className="py-3 flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{l.name}</div>
                    <div className="text-slate-500 font-mono text-[11px]">{l.phone}</div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">
                      {l.status}
                    </span>
                    <div className="text-slate-400 text-[10px] mt-0.5">Score: +{l.score}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Site Visits */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-serif">Upcoming Site Visits</h2>
            <div className="divide-y divide-slate-100">
              {siteVisits.map((v) => (
                <div key={v._id} className="py-3 flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{v.name}</div>
                    <div className="text-slate-500 text-[11px] font-mono">{v.phone}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900">{formatDate(v.visitDate)}</div>
                    <div className="text-slate-500 text-[11px]">{v.visitTime}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

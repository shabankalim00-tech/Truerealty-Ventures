import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Building2,
  Calendar,
  Award,
  TrendingUp,
  Percent,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import api from '../../services/api';
import { formatPrice } from '../../utils/formatters';

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/dashboard').then((res) => {
      if (res.success) {
        setData(res.data);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const summary = data?.summary || {};
  const statusBreakdown = data?.statusBreakdown || [];
  const sourceBreakdown = data?.sourceBreakdown || [];
  const recentLeads = data?.recentLeads || [];
  const recentVisits = data?.recentSiteVisits || [];
  const monthlyTrends = data?.monthlyTrends || [];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
          Executive Real Estate CRM Overview
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Performance metrics, lead qualification funnels, and real-time site visits.
        </p>
      </div>

      {/* KPI Cards Row (Requirement #21) */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Total Leads */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Leads</span>
            <Users className="w-4 h-4 text-primary-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-serif">
            {summary.totalLeads || 0}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">+18% this month</span>
        </div>

        {/* New Leads */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">New Leads</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-serif">
            {summary.newLeads || 0}
          </div>
          <span className="text-[10px] text-slate-400">Needs contact</span>
        </div>

        {/* Qualified Leads */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Qualified</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-serif">
            {summary.qualifiedLeads || 0}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">High purchase intent</span>
        </div>

        {/* Site Visits */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Site Visits</span>
            <Calendar className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-serif">
            {summary.siteVisits || 0}
          </div>
          <span className="text-[10px] text-slate-400">Scheduled / Done</span>
        </div>

        {/* Booked Units */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Booked Units</span>
            <Award className="w-4 h-4 text-gold-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-serif">
            {summary.bookedProperties || 0}
          </div>
          <span className="text-[10px] text-gold-600 font-semibold">Deals closed</span>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Conversion</span>
            <Percent className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-serif">
            {summary.conversionRate || '0%'}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">Lead to close</span>
        </div>
      </div>

      {/* Visual Funnels & Monthly Trends Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Lead & Visit Trends */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-slate-900 font-serif">
                Monthly Performance & Enquiries (H2 2026)
              </h3>
              <p className="text-xs text-slate-400">Volume trajectory across leads, visits, and bookings</p>
            </div>
            <span className="text-xs font-semibold text-primary-700 bg-primary-50 px-2.5 py-1 rounded-full">
              Growth: +34%
            </span>
          </div>

          <div className="grid grid-cols-6 gap-2 pt-6 h-48 items-end">
            {monthlyTrends.map((m) => (
              <div key={m.month} className="flex flex-col items-center h-full justify-end group">
                <div className="flex items-end space-x-1 w-full justify-center">
                  {/* Leads Bar */}
                  <div
                    style={{ height: `${m.leads * 1.3}px` }}
                    className="w-4 bg-primary-600 rounded-t group-hover:bg-primary-500 transition"
                    title={`Leads: ${m.leads}`}
                  ></div>
                  {/* Visits Bar */}
                  <div
                    style={{ height: `${m.visits * 2.2}px` }}
                    className="w-4 bg-gold-400 rounded-t group-hover:bg-gold-300 transition"
                    title={`Visits: ${m.visits}`}
                  ></div>
                </div>
                <span className="text-xs font-bold text-slate-600 mt-2">{m.month}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center space-x-6 pt-4 border-t border-slate-100 text-xs text-slate-600 font-medium">
            <span className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-primary-600 mr-2"></span> Total Leads Captured
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-gold-400 mr-2"></span> Site Visits Scheduled
            </span>
          </div>
        </div>

        {/* Lead Status Breakdown */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900 font-serif">Lead Pipeline Status</h3>
          <div className="space-y-3 pt-2">
            {statusBreakdown.map((item) => (
              <div key={item.status} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{item.status}</span>
                  <span className="text-slate-900 font-bold">{item.count}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${Math.min(100, item.count * 15)}%` }}
                    className="bg-primary-600 h-full rounded-full"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Leads & Site Visits Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent CRM Leads */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-base text-slate-900 font-serif">Recent CRM Inquiries</h3>
            <Link to="/admin/leads" className="text-xs font-bold text-primary-700 hover:underline">
              View All Leads &rarr;
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentLeads.map((lead) => (
              <div key={lead._id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{lead.name}</div>
                  <div className="text-slate-500 font-mono text-[11px]">{lead.phone}</div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">
                    {lead.status}
                  </span>
                  <div className="text-slate-400 text-[10px] mt-0.5">Score: {lead.score}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Site Visits */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-base text-slate-900 font-serif">Upcoming Site Visits</h3>
            <Link to="/admin/site-visits" className="text-xs font-bold text-primary-700 hover:underline">
              Manage All &rarr;
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentVisits.map((visit) => (
              <div key={visit._id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{visit.name}</div>
                  <div className="text-slate-500 text-[11px] truncate max-w-[200px]">
                    {visit.property?.title || 'Selected Project'}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800">
                    {visit.status}
                  </span>
                  <div className="text-slate-500 font-semibold text-[11px] mt-0.5">
                    {visit.visitTime}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

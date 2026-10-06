import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, CheckCircle2, ShieldCheck, Car } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function SiteVisitPage() {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    property: '',
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    visitDate: '',
    visitTime: '11:00 AM',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/properties?limit=20').then((res) => {
      if (res.success) setProperties(res.data.properties || []);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post('/site-visits', formData);
      setSubmitted(true);
    } catch (err) {
      alert(err.message || 'Error booking site visit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider">
            <Car className="w-3.5 h-3.5" />
            <span>Complimentary Chauffeur Guided Visit</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
            Schedule a Free Site Visit
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Inspect mock apartments, construction progress, and luxury clubhouses accompanied by our senior property consultant.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-serif">Site Visit Scheduled!</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you, {formData.name}. Your dedicated property advisor will contact you to confirm the pickup timing and gate entry pass.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Select Project / Property *
                </label>
                <select
                  required
                  value={formData.property}
                  onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                >
                  <option value="">-- Choose a Property to Visit --</option>
                  {properties.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.title} - {p.locality?.name}, {p.city?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.visitDate}
                    onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Preferred Time Slot *
                  </label>
                  <select
                    value={formData.visitTime}
                    onChange={(e) => setFormData({ ...formData, visitTime: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  >
                    <option value="10:00 AM">10:00 AM - 11:30 AM</option>
                    <option value="11:30 AM">11:30 AM - 01:00 PM</option>
                    <option value="02:30 PM">02:30 PM - 04:00 PM</option>
                    <option value="04:30 PM">04:30 PM - 06:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9220805059"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  rows="3"
                  placeholder="Need cab pickup from metro station, interested in sample 3 BHK flat..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:outline-none resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gold-400 hover:bg-gold-500 text-slate-950 font-bold text-sm uppercase tracking-wider transition shadow-md disabled:opacity-60"
              >
                {loading ? 'Submitting...' : 'Confirm Free Site Visit'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

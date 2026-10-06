import React, { useState } from 'react';
import { X, Send, ShieldCheck, CheckCircle2, Phone, Mail, User } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function LeadModal({
  isOpen,
  onClose,
  title = 'Enquire About Property',
  subtitle = 'Get instant callback, official brochure & verified price sheet.',
  propertyId = null,
  projectId = null,
  source = 'Website CTA',
}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    budget: '',
    preferredLocation: '',
    message: 'Please share verified project floor plans, payment schedule and schedule a site visit.',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      await api.post('/leads', {
        ...formData,
        property: propertyId,
        project: projectId,
        source,
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-serif">Enquiry Received!</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Thank you. Our dedicated real estate advisor has received your request and will call you with verified information within 15 minutes.
            </p>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-primary-700 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Direct Consultation</span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 font-serif tracking-tight">
              {title}
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">{subtitle}</p>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  >
                    <option value="">Select Range</option>
                    <option value="Under ₹ 1 Cr">Under ₹ 1 Cr</option>
                    <option value="₹ 1 Cr - 2.5 Cr">₹ 1 Cr - 2.5 Cr</option>
                    <option value="₹ 2.5 Cr - 5 Cr">₹ 2.5 Cr - 5 Cr</option>
                    <option value="₹ 5 Cr+ (Ultra Luxury)">₹ 5 Cr+ (Ultra Luxury)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Preferred City / Area
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Golf Course Extn"
                    value={formData.preferredLocation}
                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Message / Requirements
                </label>
                <textarea
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-xl font-bold text-sm text-slate-900 bg-gold-400 hover:bg-gold-500 transition shadow-md flex items-center justify-center space-x-2 disabled:opacity-70"
              >
                {loading ? (
                  <span>Submitting request...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Request Callback & Price Sheet</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-slate-400 mt-2">
                🔒 Your privacy is strictly protected. Zero spam guarantee.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

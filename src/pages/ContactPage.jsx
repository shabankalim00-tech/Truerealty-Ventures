import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Clock, Navigation, ExternalLink } from 'lucide-react';
import api from '../services/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post('/enquiries', {
        ...formData,
        type: 'GENERAL',
      });
      setSubmitted(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
            Contact True Realty Venture Advisory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Have questions about a property or need specialized institutional advisory? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 bg-slate-900 text-white p-8 rounded-3xl space-y-6 shadow-xl">
            <h3 className="text-xl font-bold font-serif">Corporate Headquarters</h3>
            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>10/502 Vipul Lavanya Sector 81 Gurugram 122004</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a href="tel:+919220805059" className="hover:text-gold-300 transition">
                  Mobile: +91 9220805059
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href="mailto:truerealtyventures@gmail.com" className="hover:text-gold-300 transition">
                  truerealtyventures@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-gold-400 shrink-0" />
                <span>WhatsApp: +91 8796869292 (24x7 Available)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">RERA Registered Consultancy</span>
              <a
                href="#office-map"
                className="text-gold-400 hover:text-gold-300 font-semibold flex items-center"
              >
                <span>View on map</span>
                <Navigation className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>

          <div className="md:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="py-10 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
                <p className="text-xs text-slate-500">Our advisory desk will get in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the property or project you are looking for..."
                    className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-primary-500 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gold-400 hover:bg-gold-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-sm"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Office Location Interactive Map Section */}
        <div id="office-map" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-gold-500" />
                <h3 className="text-xl font-bold font-serif text-slate-900">
                  Locate Our Advisory Office
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                10/502 Vipul Lavanya Sector 81 Gurugram 122004
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Vipul+Lavanya+Sector+81+Gurugram+122004"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition self-start sm:self-auto"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1 text-gold-400" />
            </a>
          </div>

          {/* Interactive Map Embed */}
          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative">
            <iframe
              title="True Realty Venture Office Location"
              src="https://maps.google.com/maps?q=Vipul+Lavanya,+Sector+81,+Gurugram,+Haryana+122004&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            ></iframe>

            {/* Verified Address Floating Badge Overlay */}
            <div className="absolute top-3 left-3 z-10 max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200 shadow-lg text-xs pointer-events-auto">
              <div className="flex items-center space-x-1.5 text-primary-800 font-bold mb-1">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
                <span>Head Office: Vipul Lavanya</span>
              </div>
              <p className="text-slate-700 font-medium leading-relaxed">
                10/502 Vipul Lavanya, Sector 81, Gurugram, Haryana - <strong className="text-slate-900 font-bold">122004</strong>
              </p>
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Direct Navigation</span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=10%2F502+Vipul+Lavanya+Sector+81+Gurugram+122004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-700 hover:underline font-bold flex items-center"
                >
                  Open in Google Maps &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  PhoneCall,
  Home as HomeIcon,
  Briefcase,
  Compass,
  Layers,
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [propertiesDropdownOpen, setPropertiesDropdownOpen] = useState(false);
  const [mobilePropertiesOpen, setMobilePropertiesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setPropertiesDropdownOpen(false);
    setMobilePropertiesOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:block border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-gold-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" /> 100% RERA Verified Properties
            </span>
            <span className="text-slate-500">|</span>
            <span>Zero Brokerage on Verified New Projects</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:+919220805059" className="hover:text-white flex items-center transition">
              <PhoneCall className="w-3 h-3 mr-1 text-primary-400" /> Helpline: +91 9220805059
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-1.5'
            : 'bg-white border-b border-slate-200/80 py-2'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center group py-0.5">
              <img
                src="/logo.jpg"
                alt="True Realty Venture"
                className="h-16 sm:h-20 w-auto object-contain rounded-xl shadow-sm hover:opacity-95 transition"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 font-semibold text-sm text-slate-700">
              <Link
                to="/"
                className={`px-3.5 py-2 rounded-lg transition ${
                  location.pathname === '/'
                    ? 'text-primary-700 bg-primary-50/80 font-bold'
                    : 'hover:text-primary-700 hover:bg-slate-50'
                }`}
              >
                Home
              </Link>

              {/* Properties Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setPropertiesDropdownOpen(true)}
                onMouseLeave={() => setPropertiesDropdownOpen(false)}
              >
                <Link
                  to="/properties"
                  onClick={() => setPropertiesDropdownOpen(false)}
                  className={`flex items-center space-x-1 px-3.5 py-2 rounded-lg transition ${
                    location.pathname.startsWith('/properties')
                      ? 'text-primary-700 bg-primary-50/80 font-bold'
                      : 'hover:text-primary-700 hover:bg-slate-50'
                  }`}
                >
                  <span>Properties</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      propertiesDropdownOpen ? 'rotate-180 text-primary-700' : 'text-slate-400'
                    }`}
                  />
                </Link>

                {propertiesDropdownOpen && (
                  <div className="absolute left-0 mt-0.5 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <Link
                      to="/properties"
                      onClick={() => setPropertiesDropdownOpen(false)}
                      className="flex items-center px-4 py-2.5 text-sm text-slate-900 hover:text-primary-700 hover:bg-primary-50 font-bold transition border-b border-slate-100"
                    >
                      <Layers className="w-4 h-4 mr-3 text-primary-600" />
                      <span>All Properties</span>
                    </Link>
                    <Link
                      to="/properties?propertyType=Commercial+Office,Retail Shop"
                      onClick={() => setPropertiesDropdownOpen(false)}
                      className="flex items-center px-4 py-2.5 text-sm text-slate-700 hover:text-primary-700 hover:bg-primary-50 font-medium transition"
                    >
                      <Briefcase className="w-4 h-4 mr-3 text-primary-600" />
                      <span>Commercial</span>
                    </Link>
                    <Link
                      to="/properties?propertyType=Apartment,Villa,Builder Floor,Penthouse"
                      onClick={() => setPropertiesDropdownOpen(false)}
                      className="flex items-center px-4 py-2.5 text-sm text-slate-700 hover:text-primary-700 hover:bg-primary-50 font-medium transition"
                    >
                      <HomeIcon className="w-4 h-4 mr-3 text-gold-600" />
                      <span>Residential</span>
                    </Link>
                    <Link
                      to="/properties?propertyType=Plot"
                      onClick={() => setPropertiesDropdownOpen(false)}
                      className="flex items-center px-4 py-2.5 text-sm text-slate-700 hover:text-primary-700 hover:bg-primary-50 font-medium transition"
                    >
                      <Compass className="w-4 h-4 mr-3 text-emerald-600" />
                      <span>Plots</span>
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/blog"
                className={`px-3.5 py-2 rounded-lg transition ${
                  location.pathname.startsWith('/blog')
                    ? 'text-primary-700 bg-primary-50/80 font-bold'
                    : 'hover:text-primary-700 hover:bg-slate-50'
                }`}
              >
                Blogs
              </Link>

              <Link
                to="/about"
                className={`px-3.5 py-2 rounded-lg transition ${
                  location.pathname === '/about'
                    ? 'text-primary-700 bg-primary-50/80 font-bold'
                    : 'hover:text-primary-700 hover:bg-slate-50'
                }`}
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className={`px-3.5 py-2 rounded-lg transition ${
                  location.pathname === '/contact'
                    ? 'text-primary-700 bg-primary-50/80 font-bold'
                    : 'hover:text-primary-700 hover:bg-slate-50'
                }`}
              >
                Contact Page
              </Link>
            </nav>

            {/* Right Side Utility Actions */}
            <div className="flex items-center space-x-2">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 text-slate-600 hover:text-primary-600 hover:bg-slate-100 rounded-xl transition"
                title="Search Properties"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Quick Search Bar */}
        {searchOpen && (
          <div className="border-t border-slate-200 bg-slate-50 py-3 px-4 transition-all">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by city, project, builder, or property keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-primary-700 hover:bg-primary-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
            <Link
              to="/"
              className="block p-2.5 rounded-lg bg-slate-50 hover:bg-primary-50 text-slate-800 font-semibold text-sm"
            >
              Home
            </Link>

            {/* Properties Accordion for Mobile */}
            <div className="rounded-lg bg-slate-50 overflow-hidden">
              <button
                type="button"
                onClick={() => setMobilePropertiesOpen(!mobilePropertiesOpen)}
                className="w-full flex items-center justify-between p-2.5 text-slate-800 font-semibold text-sm"
              >
                <span>Properties</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mobilePropertiesOpen ? 'rotate-180 text-primary-700' : ''
                  }`}
                />
              </button>
              {mobilePropertiesOpen && (
                <div className="bg-slate-100/70 px-4 py-2 space-y-1.5 text-sm border-t border-slate-200/60">
                  <Link
                    to="/properties"
                    className="flex items-center py-2 text-slate-900 hover:text-primary-700 font-bold border-b border-slate-200/50"
                  >
                    <Layers className="w-4 h-4 mr-2.5 text-primary-600" /> All Properties
                  </Link>
                  <Link
                    to="/properties?propertyType=Commercial+Office,Retail Shop"
                    className="flex items-center py-2 text-slate-700 hover:text-primary-700 font-medium"
                  >
                    <Briefcase className="w-4 h-4 mr-2.5 text-primary-600" /> Commercial
                  </Link>
                  <Link
                    to="/properties?propertyType=Apartment,Villa,Builder Floor,Penthouse"
                    className="flex items-center py-2 text-slate-700 hover:text-primary-700 font-medium"
                  >
                    <HomeIcon className="w-4 h-4 mr-2.5 text-gold-600" /> Residential
                  </Link>
                  <Link
                    to="/properties?propertyType=Plot"
                    className="flex items-center py-2 text-slate-700 hover:text-primary-700 font-medium"
                  >
                    <Compass className="w-4 h-4 mr-2.5 text-emerald-600" /> Plots
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/blog"
              className="block p-2.5 rounded-lg bg-slate-50 hover:bg-primary-50 text-slate-800 font-semibold text-sm"
            >
              Blogs
            </Link>

            <Link
              to="/about"
              className="block p-2.5 rounded-lg bg-slate-50 hover:bg-primary-50 text-slate-800 font-semibold text-sm"
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className="block p-2.5 rounded-lg bg-slate-50 hover:bg-primary-50 text-slate-800 font-semibold text-sm"
            >
              Contact Page
            </Link>
          </div>
        )}
      </header>
    </>
  );
}

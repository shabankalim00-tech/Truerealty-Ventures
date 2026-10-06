import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Building,
  Users,
  Compass,
  FileText,
  Calendar,
  Layers,
  Settings,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  UserCheck,
  MessageSquare,
  BarChart3,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Leads & CRM', path: '/admin/leads', icon: Users },
  { label: 'Site Visits', path: '/admin/site-visits', icon: Calendar },
  { label: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare },
  { label: 'Properties', path: '/admin/properties', icon: Building2 },
  { label: 'Projects', path: '/admin/projects', icon: Building },
  { label: 'Developers', path: '/admin/developers', icon: ShieldCheck },
  { label: 'Users & Roles', path: '/admin/users', icon: UserCheck },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-slate-950 text-white p-3 flex justify-between items-center z-50">
        <Link to="/" className="flex items-center">
          <img src="/logo.jpg" alt="True Realty Venture" className="h-10 w-auto rounded-lg object-contain" />
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-300 hover:text-white"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Admin Sidebar */}
      <aside
        className={`fixed md:sticky top-0 inset-y-0 left-0 w-64 bg-slate-950 text-slate-300 z-40 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Logo Header */}
          <div className="p-5 border-b border-slate-800 flex justify-center">
            <Link to="/" className="inline-block">
              <img
                src="/logo.jpg"
                alt="True Realty Venture"
                className="h-16 w-auto object-contain rounded-xl ring-1 ring-slate-700 shadow-md hover:opacity-95 transition"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 text-xs font-semibold">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3.5 py-3 rounded-xl transition ${
                    isActive
                      ? 'bg-primary-700 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg bg-slate-900"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center space-x-3 p-2">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">{user?.name}</div>
              <div className="text-[10px] text-slate-500 font-semibold">{user?.role}</div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-900"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin View Container */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}

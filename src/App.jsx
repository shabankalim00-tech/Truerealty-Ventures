import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CompareProvider } from './context/CompareContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public & Main Layouts
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import PropertyListingPage from './pages/PropertyListingPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import ProjectListingPage from './pages/ProjectListingPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import DeveloperListingPage from './pages/DeveloperListingPage';
import DeveloperDetailPage from './pages/DeveloperDetailPage';
import CityListingPage from './pages/CityListingPage';
import CityDetailPage from './pages/CityDetailPage';
import LocalityDetailPage from './pages/LocalityDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import ComparePage from './pages/ComparePage';
import SiteVisitPage from './pages/SiteVisitPage';
import BlogListingPage from './pages/BlogListingPage';
import BlogDetailPage from './pages/BlogDetailPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LegalPage from './pages/LegalPage';

// Admin CRM Layout & Views
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminLeadsPage from './pages/admin/AdminLeadsPage';
import AdminPropertiesPage from './pages/admin/AdminPropertiesPage';
import AdminProjectsPage from './pages/admin/AdminProjectsPage';
import AdminDevelopersPage from './pages/admin/AdminDevelopersPage';
import AdminSiteVisitsPage from './pages/admin/AdminSiteVisitsPage';
import AdminEnquiriesPage from './pages/admin/AdminEnquiriesPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';

// Agent Console
import AgentDashboardPage from './pages/agent/AgentDashboardPage';

export default function App() {
  return (
    <AuthProvider>
      <CompareProvider>
        <Routes>
          {/* Main Website Route Tree */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="properties" element={<PropertyListingPage />} />
            <Route path="properties/:slug" element={<PropertyDetailPage />} />
            <Route path="projects" element={<ProjectListingPage />} />
            <Route path="project/:slug" element={<ProjectDetailPage />} />
            <Route path="developers" element={<DeveloperListingPage />} />
            <Route path="developer/:slug" element={<DeveloperDetailPage />} />
            <Route path="cities" element={<CityListingPage />} />
            <Route path="city/:citySlug" element={<CityDetailPage />} />
            <Route path="location/:citySlug/:localitySlug" element={<LocalityDetailPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="compare" element={<ComparePage />} />
            <Route path="site-visits" element={<SiteVisitPage />} />
            <Route path="blog" element={<BlogListingPage />} />
            <Route path="blog/:slug" element={<BlogDetailPage />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacy-policy" element={<LegalPage type="privacy" />} />
            <Route path="terms-of-service" element={<LegalPage type="terms" />} />
            <Route path="disclaimer" element={<LegalPage type="disclaimer" />} />
          </Route>

          {/* Admin CRM Portal (Secured for ADMIN & SUPER_ADMIN) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="leads" element={<AdminLeadsPage />} />
            <Route path="properties" element={<AdminPropertiesPage />} />
            <Route path="projects" element={<AdminProjectsPage />} />
            <Route path="developers" element={<AdminDevelopersPage />} />
            <Route path="site-visits" element={<AdminSiteVisitsPage />} />
            <Route path="enquiries" element={<AdminEnquiriesPage />} />
            <Route path="users" element={<AdminUsersPage />} />
          </Route>

          {/* Dedicated Agent Portal (Secured for AGENT role) */}
          <Route
            path="/agent/dashboard"
            element={
              <ProtectedRoute allowedRoles={['AGENT', 'ADMIN', 'SUPER_ADMIN']}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AgentDashboardPage />} />
          </Route>

          {/* Catch-all Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CompareProvider>
    </AuthProvider>
  );
}

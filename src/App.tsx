import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { PortfolioProvider } from '@/context/PortfolioContext';

// Public Portfolio View
import { PublicPortfolio } from '@/pages/public/PublicPortfolio';

// Admin CMS
import { AdminRoute } from '@/components/admin/AdminRoute';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminLogin } from '@/pages/admin/AdminLogin';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { ProjectsList } from '@/pages/admin/ProjectsList';
import { ProjectEdit } from '@/pages/admin/ProjectEdit';
import { MediaLibrary } from '@/pages/admin/MediaLibrary';
import { ProfileEdit } from '@/pages/admin/ProfileEdit';
import { ServicesEdit } from '@/pages/admin/ServicesEdit';
import { ProcessEdit } from '@/pages/admin/ProcessEdit';
import { ToolsEdit } from '@/pages/admin/ToolsEdit';
import { ExperienceEdit } from '@/pages/admin/ExperienceEdit';
import { SettingsEdit } from '@/pages/admin/SettingsEdit';

function AdminShortcutHandler() {
  const navigate = useNavigate();
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shortcut: Ctrl+Shift+A or Cmd+Shift+A jumps straight to admin
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        navigate('/admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AdminShortcutHandler />
      <AuthProvider>
        <PortfolioProvider>
          <Routes>
            {/* Public Portfolio (100% Unaltered Visual Design & Flow) */}
            <Route path="/" element={<PublicPortfolio />} />

            {/* Admin Authentication */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Private Admin Dashboard / CMS Panel */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="projects" element={<ProjectsList />} />
              <Route path="projects/new" element={<ProjectEdit />} />
              <Route path="projects/:id" element={<ProjectEdit />} />
              <Route path="media" element={<MediaLibrary />} />
              <Route path="profile" element={<ProfileEdit />} />
              <Route path="services" element={<ServicesEdit />} />
              <Route path="process" element={<ProcessEdit />} />
              <Route path="tools" element={<ToolsEdit />} />
              <Route path="experience" element={<ExperienceEdit />} />
              <Route path="settings" element={<SettingsEdit />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PortfolioProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

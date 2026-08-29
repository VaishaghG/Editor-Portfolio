import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface AdminRouteProps {
  children?: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, loading, isConfigured } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center font-mono-code text-xs text-[#9E9B93]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-[#E50914] border-t-transparent rounded-full animate-spin" />
          <span>AUTHENTICATING // VAISHAGH G. CMS</span>
        </div>
      </div>
    );
  }

  // If Supabase is not configured yet, allow the user to view the admin UI in demo/preview mode with a helpful banner
  if (!isConfigured) {
    return children ? <>{children}</> : <Outlet />;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

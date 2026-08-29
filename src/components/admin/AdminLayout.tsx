import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Film,
  Image as ImageIcon,
  User,
  Layers,
  Workflow,
  Wrench,
  GraduationCap,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const AdminLayout: React.FC = () => {
  const { user, signOut, isConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Projects', path: '/admin/projects', icon: Film },
    { label: 'Media Library', path: '/admin/media', icon: ImageIcon },
    { label: 'Profile & About', path: '/admin/profile', icon: User },
    { label: 'Services', path: '/admin/services', icon: Layers },
    { label: 'Process Workflow', path: '/admin/process', icon: Workflow },
    { label: 'Tools & Stack', path: '/admin/tools', icon: Wrench },
    { label: 'Experience', path: '/admin/experience', icon: GraduationCap },
    { label: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const getPageTitle = () => {
    const current = navItems.find((item) =>
      item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path)
    );
    return current ? current.label : 'Control Panel';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#F2F0EC] flex flex-col md:flex-row font-sans">
      
      {/* ===================================================================== */}
      {/* DESKTOP SIDEBAR */}
      {/* ===================================================================== */}
      <aside className="hidden md:flex flex-col justify-between w-64 lg:w-72 bg-[#0e0e0e] border-r border-white/10 shrink-0 select-none min-h-screen sticky top-0 h-screen overflow-y-auto">
        <div>
          {/* Admin Brand Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#E50914] rounded-sm shadow-[0_0_10px_rgba(229,9,20,0.8)]" />
              <div>
                <span className="font-bebas text-2xl tracking-wider text-[#F2F0EC] block leading-none">
                  VAISHAGH G.
                </span>
                <span className="font-mono-code text-[9px] tracking-widest text-[#E50914] block uppercase font-bold mt-1">
                  ADMIN CONTROL PANEL
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 font-mono-code text-xs">
            <div className="px-3 py-2 text-[10px] uppercase text-[#6B6862] tracking-wider font-bold">
              CONTENT MANAGEMENT
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#E50914] text-white font-bold shadow-[0_0_20px_rgba(229,9,20,0.3)]'
                      : 'text-[#9E9B93] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions & User Profile */}
        <div className="p-4 border-t border-white/10 space-y-3 font-mono-code text-xs">
          {/* Configuration status tag */}
          <div className="px-3 py-2 rounded bg-black/60 border border-white/10 flex items-center justify-between text-[10px]">
            <span className="text-[#6B6862]">STATUS:</span>
            {isConfigured ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> SUPABASE LIVE
              </span>
            ) : (
              <span className="text-amber-400 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> LOCAL PREVIEW
              </span>
            )}
          </div>

          {user && (
            <div className="px-3 py-1 text-[11px] text-[#9E9B93] truncate">
              <span className="text-[#6B6862] block text-[9px]">LOGGED IN AS:</span>
              <span className="text-white truncate font-medium">{user.email}</span>
            </div>
          )}

          <div className="space-y-1 pt-1">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#F2F0EC] transition-colors"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-[#E50914]" />
                <span>View Website</span>
              </span>
              <span className="text-[#6B6862] text-[10px]">↗</span>
            </a>

            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg text-[#9E9B93] hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ===================================================================== */}
      {/* MOBILE TOP BAR & COLLAPSIBLE DRAWER */}
      {/* ===================================================================== */}
      <header className="md:hidden flex items-center justify-between p-4 bg-[#0e0e0e] border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 bg-[#E50914] rounded-sm" />
          <span className="font-bebas text-xl tracking-wider text-white">
            VAISHAGH G. <span className="text-[#E50914] text-xs font-mono-code">CMS</span>
          </span>
        </div>

        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 rounded bg-white/5 border border-white/10 text-white"
          aria-label="Toggle Navigation"
        >
          {mobileNavOpen ? <X className="w-5 h-5 text-[#E50914]" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {mobileNavOpen && (
        <div className="md:hidden fixed inset-0 top-[57px] bg-[#0a0a0a]/95 backdrop-blur-xl z-40 p-4 flex flex-col justify-between overflow-y-auto font-mono-code text-xs">
          <div className="space-y-1">
            <div className="px-3 py-2 text-[10px] uppercase text-[#6B6862] font-bold">
              NAVIGATION
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-lg ${
                    isActive ? 'bg-[#E50914] text-white font-bold' : 'text-[#9E9B93]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          <div className="border-t border-white/10 pt-4 space-y-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded bg-white/5 text-white"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-4 h-4 text-[#E50914]" />
            </a>

            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 p-3 rounded bg-red-500/20 text-red-400 font-bold"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MAIN ADMIN WORKSPACE CONTENT */}
      {/* ===================================================================== */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#080808]">
        
        {/* Top Breadcrumb Bar */}
        <div className="hidden md:flex items-center justify-between px-8 py-4 bg-[#0d0d0d] border-b border-white/10 font-mono-code text-xs">
          <div className="flex items-center gap-2 text-[#9E9B93]">
            <span>VAISHAGH G.</span>
            <span>/</span>
            <span className="text-[#E50914] font-bold">{getPageTitle()}</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 hover:bg-[#E50914] text-[#F2F0EC] hover:text-white transition-all text-[11px]"
            >
              <span>VIEW LIVE SITE</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

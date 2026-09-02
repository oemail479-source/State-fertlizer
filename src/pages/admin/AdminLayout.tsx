import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileEdit, ShoppingCart, Calendar, FileText, 
  HelpCircle, Users, BarChart3, Network,
  LogOut, Shield, ChevronDown, Bell, Lock, Activity 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout: React.FC = () => {
  const { user, role, loginAs, logout, demoUsers, hasPermission } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const menuGroups = [
    {
      title: 'Overview',
      items: [
        { label: 'Executive Dashboard', path: '/admin', icon: LayoutDashboard, module: 'public' },
      ]
    },
    {
      title: 'Core Operations',
      items: [
        { label: 'Orders & Sales', path: '/admin/orders', icon: ShoppingCart, module: 'orders' },
        { label: 'Circuit Bungalows', path: '/admin/bookings', icon: Calendar, module: 'bungalows' },
        { label: 'Procurement Tenders', path: '/admin/tenders', icon: FileText, module: 'procurement' },
        { label: 'Inquiries & Support', path: '/admin/inquiries', icon: HelpCircle, module: 'public' },
      ]
    },
    {
      title: 'Integrations & System',
      items: [
        { label: 'ERP & Architecture', path: '/admin/integrations', icon: Network, module: 'erp' },
        { label: 'Reports & Audit Logs', path: '/admin/reports', icon: BarChart3, module: 'reports' },
        { label: 'User RBAC & Security', path: '/admin/users', icon: Users, module: 'users' },
      ]
    }
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <>
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Admin Navigation Header */}
      <header className="bg-gov-navy text-white h-16 border-b border-gov-gold/30 px-6 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logo.svg" alt="SFCL Logo" className="h-10 w-auto rounded-lg shadow-sm" />
            <div>
              <span className="font-extrabold text-sm tracking-tight text-white block leading-none">
                ADMINISTRATION PORTAL
              </span>
              <span className="text-[10px] text-gov-gold font-mono">State Fertilizer Company Limited</span>
            </div>
          </Link>
          <span className="px-2.5 py-0.5 bg-emerald-600/30 text-emerald-300 text-[10px] font-bold rounded-full border border-emerald-500/30">
            SECURE INTRA-NET SESSION
          </span>
        </div>

        {/* User Role Switcher for Live Demo Evaluation */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-xs font-bold transition border border-gov-gold/40"
            >
              <Shield className="w-4 h-4 text-gov-gold" />
              <span>Role: {user ? user.role : 'Public User'}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 z-50 py-1">
                <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b">
                  Switch Admin Demo Role
                </div>
                {demoUsers.map(u => (
                  <button
                    key={u.id}
                    onClick={() => {
                      if (u.role === 'Super Administrator') {
                        navigate('/admin/login');
                      } else {
                        loginAs(u.id);
                        setRoleDropdownOpen(false);
                      }
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex flex-col hover:bg-slate-50 transition ${
                      user?.id === u.id ? 'bg-emerald-50 border-l-4 border-gov-green font-bold text-gov-navy' : ''
                    }`}
                  >
                    <span className="font-semibold text-slate-900">{u.name}</span>
                    <span className="text-[11px] text-slate-500">{u.role}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link to="/" className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-lg transition">
            Exit to Website
          </Link>
        </div>
      </header>

      {/* Main Admin Sidebar + Content Body */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 p-4 space-y-6 shrink-0 hidden md:block">
          {/* User Profile Card */}
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gov-green font-bold text-white flex items-center justify-center text-sm border border-gov-gold">
              {user ? user.name.slice(0, 2).toUpperCase() : 'AD'}
            </div>
            <div className="overflow-hidden">
              <h4 className="font-bold text-xs text-white truncate">{user ? user.name : 'Guest User'}</h4>
              <p className="text-[10px] text-gov-gold truncate">{role}</p>
            </div>
          </div>

          <div className="px-3 text-[11px] leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300">Operations workspace</p>
            <p>Orders, reservations, tenders, and public service requests.</p>
          </div>

          {/* Navigation Menu Groups */}
          <div className="space-y-4 text-xs">
            {menuGroups.map((group, idx) => (
              <div key={idx} className="space-y-1">
                <span className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  {group.title}
                </span>
                {group.items.map(item => {
                  const allowed = hasPermission(item.module);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={allowed ? item.path : '#'}
                      className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl font-semibold transition ${
                        isActive(item.path)
                          ? 'bg-gov-green text-white shadow-md font-bold'
                          : allowed
                          ? 'hover:bg-slate-800 text-slate-300'
                          : 'opacity-40 cursor-not-allowed text-slate-600'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                      {!allowed && <Lock className="w-3 h-3 ml-auto text-amber-500" />}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Security/compliance badge removed per accessibility/UX update */}
        </aside>

        {/* Main Workspace Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
    {/* Super admin login moved to /admin/login */}
    </>
  );
};
